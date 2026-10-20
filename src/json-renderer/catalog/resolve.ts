/**
 * Resolución de un nodo contra el catálogo.
 *
 * Aquí es donde el esquema deja de ser texto libre y se convierte en props
 * seguras: se comprueba el tipo, se filtran las props permitidas, se aplican los
 * valores por defecto, se coaccionan los tipos y se acumulan los avisos con su
 * ruta exacta. Nada de esto lanza: un nodo mal formado produce avisos y se pinta
 * lo que se pueda.
 */

import { JsonEngineError, issue, type JsonEngineIssue } from "../shared/errors";
import { formatPath, propPath, type SchemaPath } from "../shared/paths";
import type { NodeSchema } from "../kernel/types";
import { GLOBALLY_FORBIDDEN_PROPS, isExcludedType, getExclusionReason, type Catalog, type CatalogEntry, type PropSpec } from "./catalog.props";

/** Resultado de resolver un nodo: props listas para el componente + avisos. */
export interface ResolvedNode {
  /** Discriminante: el nodo se pudo resolver. */
  ok: true;
  /** Entrada del catálogo que se va a montar. */
  entry: CatalogEntry;
  /** Props ya filtradas, con defaults aplicados y tipos coaccionados. */
  props: Record<string, unknown>;
  /** Acciones declaradas en el nodo, por nombre de prop (`onClick` → esquema). */
  actions: Record<string, unknown>;
  /** Avisos acumulados (tipo desconocido, prop ignorada, valor inválido…). */
  issues: JsonEngineIssue[];
}

/** Resultado cuando el nodo no se puede resolver. */
export interface UnresolvedNode {
  /** Discriminante: el nodo no se pudo resolver. */
  ok: false;
  /** Avisos que explican por qué. */
  issues: JsonEngineIssue[];
}

/**
 * `true` cuando el valor es una **referencia** del esquema (`{ i18n }`,
 * `{ $state }`, `{ $source }`…).
 *
 * Las referencias no se coaccionan: se entregan tal cual para que el host las
 * resuelva (`resolveValue`). Coaccionarlas aquí las convertiría en `undefined` y
 * el valor desaparecería antes de poder traducirlo.
 */
export function isSchemaReference(value: unknown): boolean {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const keys = Object.keys(value as Record<string, unknown>);
  if (keys.length === 0) return false;
  return keys.some((key) => key === "i18n" || key.startsWith("$"));
}

/** Coacciona un valor al tipo declarado. Devuelve `undefined` si no es válido. */
function coerce(value: unknown, spec: PropSpec): unknown {
  switch (spec.kind) {
    case "string":
      if (typeof value === "string") return value;
      if (typeof value === "number" || typeof value === "boolean") return String(value);
      return undefined;
    case "number":
    case "integer": {
      if (typeof value === "number" && Number.isFinite(value)) {
        return spec.kind === "integer" ? Math.trunc(value) : value;
      }
      if (typeof value === "string" && value.trim() !== "" && Number.isFinite(Number(value))) {
        const parsed = Number(value);
        return spec.kind === "integer" ? Math.trunc(parsed) : parsed;
      }
      return undefined;
    }
    case "boolean":
      if (typeof value === "boolean") return value;
      if (value === "true") return true;
      if (value === "false") return false;
      return undefined;
    case "enum":
      if (typeof value !== "string") return undefined;
      return spec.values?.includes(value) ? value : undefined;
    case "array":
      return Array.isArray(value) ? value : undefined;
    case "object":
      return value && typeof value === "object" ? value : undefined;
    default:
      // `action`, `i18n`, `data`, `columns`, `node`, `nodes`: el valor se
      // resuelve más tarde (acciones, binding, hijos). Aquí solo se filtra.
      return value;
  }
}

/**
 * Resuelve un nodo contra el catálogo.
 *
 * @example
 * const resolved = resolveNode({ type: "ITButton", props: { label: "Ir" } }, axzyCatalog, ["content", 0]);
 * resolved.props.label; // "Ir"
 */
export function resolveNode(
  node: NodeSchema,
  catalog: Catalog,
  path: SchemaPath
): ResolvedNode | UnresolvedNode {
  const issues: JsonEngineIssue[] = [];
  const type = node.type;

  if (typeof type !== "string" || type === "") {
    issues.push(issue("JR021", "El nodo no declara `type`.", formatPath(path), { severity: "error" }));
    return { ok: false, issues };
  }

  if (isExcludedType(catalog, type)) {
    const reason = getExclusionReason(catalog, type);
    issues.push(
      issue("JR010", `El tipo \`${type}\` está excluido del catálogo.`, formatPath(path), {
        severity: "error",
        hint: reason,
      })
    );
    return { ok: false, issues };
  }

  const entry = catalog.entries[type];
  if (!entry) {
    const known = Object.keys(catalog.entries).slice(0, 8).join(", ");
    issues.push(
      issue("JR010", `El tipo \`${type}\` no está en el catálogo.`, formatPath(path), {
        severity: "error",
        hint: `Tipos disponibles (primeros 8): ${known}…`,
      })
    );
    return { ok: false, issues };
  }

  const specs = entry.props ?? {};
  const props: Record<string, unknown> = {};
  const actions: Record<string, unknown> = {};
  const input = node.props ?? {};

  // 1. Valores por defecto declarados en el catálogo.
  for (const [name, spec] of Object.entries(specs)) {
    if (spec.default !== undefined) props[name] = spec.default;
  }

  // 2. Props aportadas por el esquema, filtradas por la lista blanca.
  for (const [name, raw] of Object.entries(input)) {
    const forbiddenByEntry = entry.forbidden?.includes(name);
    const forbiddenGlobally = GLOBALLY_FORBIDDEN_PROPS.includes(name);

    if (forbiddenByEntry || forbiddenGlobally) {
      issues.push(
        issue("JR011", `La prop \`${name}\` está prohibida en \`${type}\`.`, formatPath(propPath(path, name)), {
          severity: "warning",
          hint: "Los nodos React se declaran como hijos del esquema, no como props.",
        })
      );
      continue;
    }

    const spec = specs[name];
    if (!spec) {
      issues.push(
        issue("JR011", `La prop \`${name}\` no está declarada para \`${type}\`.`, formatPath(propPath(path, name)), {
          severity: "warning",
          hint: "Se ignora. Si es necesaria, añádela al catálogo con su tipo.",
        })
      );
      continue;
    }

    if (spec.kind === "action") {
      actions[name] = raw;
      continue;
    }

    // Una referencia (`{ i18n: "clave" }`, `{ $state: "x" }`) se pasa tal cual:
    // el host decide su valor final y el catálogo no debe coaccionarla.
    if (isSchemaReference(raw)) {
      props[name] = raw;
      continue;
    }

    const value = coerce(raw, spec);
    if (value === undefined) {
      issues.push(
        issue(
          "JR011",
          `Valor inválido para \`${name}\` en \`${type}\`.`,
          formatPath(propPath(path, name)),
          { severity: "warning", hint: spec.values ? `Admitidos: ${spec.values.join(", ")}` : `Se esperaba ${spec.kind}.` }
        )
      );
      continue;
    }
    props[name] = value;
  }

  // 3. Props obligatorias que faltan.
  for (const [name, spec] of Object.entries(specs)) {
    if (spec.required && props[name] === undefined) {
      issues.push(
        issue("JR011", `Falta la prop obligatoria \`${name}\` en \`${type}\`.`, formatPath(propPath(path, name)), {
          severity: "error",
        })
      );
    }
  }

  // 4. Hijos declarados sin que el componente los acepte.
  if (node.children !== undefined && !entry.children) {
    issues.push(
      issue("JR011", `\`${type}\` no acepta \`children\`.`, formatPath([...path, "children"]), {
        severity: "warning",
        hint: "Los hijos se ignoran.",
      })
    );
  }

  return { ok: true, entry, props, actions, issues };
}

/** Convierte un error del motor en aviso para el informe. */
export function toIssue(error: unknown, path: SchemaPath, fallback = "Fallo del motor"): JsonEngineIssue {
  if (error instanceof JsonEngineError) return error.toIssue();
  const message = error instanceof Error ? error.message : String(error);
  return issue("JR012", message || fallback, formatPath(path), { severity: "error" });
}
