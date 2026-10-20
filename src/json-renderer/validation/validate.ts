/**
 * Validación de esquemas con **tres veredictos**.
 *
 * Un esquema a medio llegar no es un esquema roto: `partial` significa "válido
 * hasta donde ha llegado", y es el estado normal mientras un emisor (una IA, por
 * ejemplo) sigue escribiendo. `invalid` es lo que no se puede pintar ni esperar.
 */

import { issue, type JsonEngineIssue } from "../shared/errors";
import { formatPath } from "../shared/paths";
import type { Catalog } from "../catalog/catalog.props";
import { axzyCatalog } from "../catalog/axzyCatalog";
import { resolveNode } from "../catalog/resolve";
import type { NodeSchema, ScreenSchema } from "../kernel/types";
import { isNodePending } from "../stream/tolerantParse";

/** Veredicto de la validación. */
export type ValidationVerdict = "valid" | "partial" | "invalid";

/** Informe de validación. */
export interface ValidationReport {
  /** Veredicto global. */
  verdict: ValidationVerdict;
  /** Errores que impiden pintar. */
  errors: JsonEngineIssue[];
  /** Avisos que no impiden pintar. */
  warnings: JsonEngineIssue[];
  /** Nodos que aún no están cerrados. */
  pendingNodes: number;
  /** Versión del esquema, si la declara. */
  version?: number;
}

/** Opciones de validación. */
export interface ValidateOptions {
  /** Catálogo contra el que se validan tipos y props. @default axzyCatalog */
  catalog?: Catalog;
  /** Versión máxima admitida del formato. @default 1 */
  maxVersion?: number;
}

/** Versión actual del formato de pantalla. */
export const CURRENT_SCHEMA_VERSION = 1;

/** Recorre el árbol y valida cada nodo contra el catálogo. */
function validateNodes(
  node: NodeSchema,
  path: (string | number)[],
  catalog: Catalog,
  errors: JsonEngineIssue[],
  warnings: JsonEngineIssue[]
): number {
  if (!node || typeof node !== "object") {
    errors.push(issue("JR021", "El nodo no es un objeto.", formatPath(path), { severity: "error" }));
    return 0;
  }

  // Un nodo pendiente no es un error: aún no ha llegado.
  if (isNodePending(node)) return 1;

  const resolved = resolveNode(node, catalog, path);
  for (const item of resolved.issues) {
    (item.severity === "error" ? errors : warnings).push(item);
  }

  let pending = 0;
  const children = node.children === undefined ? [] : Array.isArray(node.children) ? node.children : [node.children];
  children.forEach((child, index) => {
    pending += validateNodes(child, [...path, "children", index], catalog, errors, warnings);
  });
  return pending;
}

/**
 * Valida un esquema de pantalla.
 *
 * No lanza nunca: devuelve un informe con el veredicto y los avisos, cada uno con
 * su código y su ruta.
 *
 * @example
 * validateSchema({ version: 1, id: "x", content: { type: "ITText", text: "ok" } }).verdict; // "valid"
 *
 * @example
 * validateSchema(parsePartialSchema(tokens).tree).verdict; // "partial" mientras llega
 */
export function validateSchema(schema: unknown, options: ValidateOptions = {}): ValidationReport {
  const catalog = options.catalog ?? axzyCatalog;
  const maxVersion = options.maxVersion ?? CURRENT_SCHEMA_VERSION;
  const errors: JsonEngineIssue[] = [];
  const warnings: JsonEngineIssue[] = [];

  if (schema === null || schema === undefined) {
    return { verdict: "invalid", errors: [issue("JR020", "No hay esquema que validar.", "")], warnings, pendingNodes: 0 };
  }

  if (typeof schema !== "object" || Array.isArray(schema)) {
    return {
      verdict: "invalid",
      errors: [issue("JR020", "El esquema debe ser un objeto.", "", { severity: "error" })],
      warnings,
      pendingNodes: 0,
    };
  }

  const candidate = schema as ScreenSchema;

  // 1. Formato y versión.
  if (candidate.$schema !== undefined && candidate.$schema !== "axzy/screen") {
    errors.push(
      issue("JR020", `El formato declarado no es \`axzy/screen\`.`, "$schema", {
        severity: "error",
        hint: "Usa `$schema: \"axzy/screen\"` o quita la propiedad.",
      })
    );
  }

  if (candidate.version === undefined) {
    errors.push(issue("JR020", "Falta `version` en el esquema.", "version", { severity: "error" }));
  } else if (typeof candidate.version !== "number" || !Number.isInteger(candidate.version)) {
    errors.push(issue("JR020", "`version` debe ser un entero.", "version", { severity: "error" }));
  } else if (candidate.version > maxVersion) {
    errors.push(
      issue("JR020", `La versión ${candidate.version} es más nueva que la soportada (${maxVersion}).`, "version", {
        severity: "error",
        hint: "Actualiza el motor o migra el esquema.",
      })
    );
  }

  // 2. Identidad del esquema.
  if (typeof candidate.id !== "string" || candidate.id.trim() === "") {
    errors.push(issue("JR020", "Falta `id` en el esquema.", "id", { severity: "error" }));
  }

  // 3. Contenido.
  if (candidate.content === undefined) {
    errors.push(issue("JR020", "El esquema no declara `content`.", "content", { severity: "error" }));
    return { verdict: "invalid", errors, warnings, pendingNodes: 0, version: candidate.version };
  }

  const content = Array.isArray(candidate.content) ? candidate.content : [candidate.content];
  if (content.length === 0) {
    warnings.push(
      issue("JR021", "`content` está vacío: la pantalla se pinta sin nodos.", "content", { severity: "warning" })
    );
  }

  let pendingNodes = 0;
  content
    .map((node, index) => ({ node, index }))
    // Un árbol parcial puede traer huecos: se ignoran, no se reportan.
    .filter(({ node }) => node !== undefined && node !== null)
    .forEach(({ node, index }) => {
      pendingNodes += validateNodes(node, ["content", index], catalog, errors, warnings);
    });

  // 4. Veredicto: un error real invalida; nodos pendientes solo lo hacen parcial.
  const verdict: ValidationVerdict = errors.length > 0 ? "invalid" : pendingNodes > 0 ? "partial" : "valid";

  return { verdict, errors, warnings, pendingNodes, version: candidate.version };
}
