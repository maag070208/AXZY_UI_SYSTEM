/**
 * Contrato de vocabulario para el emisor.
 *
 * Para que un modelo (o un backend) acierte con el esquema, necesita saber qué
 * `type` existen, qué props acepta cada uno, qué valores admiten los enums y cuál
 * es el nodo mínimo que funciona. Ese contrato **se genera desde el catálogo**,
 * no se escribe a mano: así el prompt nunca se desincroniza del motor.
 *
 * Se publica como artefacto versionado (`pnpm docs:json-renderer`) y se puede
 * entregar tal cual en el prompt del sistema.
 */

import type { Catalog, CatalogEntry, PropKind, PropSpec } from "../catalog/catalog.props";
import { axzyCatalog } from "../catalog/axzyCatalog";
import { CURRENT_SCHEMA_VERSION } from "../validation/validate";

/** Descripción de una prop en el contrato. */
export interface PropContract {
  /** Nombre de la prop. */
  name: string;
  /** Tipo admitido. */
  kind: PropKind;
  /** `true` si el componente no funciona sin ella. */
  required: boolean;
  /** Valores admitidos en los enums. */
  values?: string[];
  /** Valor por defecto que aplica el motor. */
  default?: unknown;
  /** Nota para el emisor. */
  doc?: string;
}

/** Descripción de un componente en el contrato. */
export interface ComponentContract {
  /** Tipo a emitir (`ITCard`). */
  type: string;
  /** Para qué sirve, en una línea. */
  summary?: string;
  /** `true` si admite `children`. */
  children: boolean;
  /** `true` si admite el atajo `text`. */
  text: boolean;
  /** Props permitidas. */
  props: PropContract[];
  /** Props prohibidas (los nodos React no viajan en JSON). */
  forbidden: string[];
  /** Nodo mínimo que se puede emitir y funciona. */
  minimal: Record<string, unknown>;
}

/** Contrato completo, listo para serializar. */
export interface VocabularyContract {
  /** Identificador del formato. */
  $schema: "axzy/vocabulary";
  /** Versión del formato de pantalla al que corresponde. */
  schemaVersion: number;
  /** Reglas que el emisor debe respetar. */
  rules: string[];
  /** Componentes disponibles, ordenados por nombre. */
  components: ComponentContract[];
  /** Tipos excluidos y su motivo (el emisor no debe usarlos). */
  excluded: Record<string, string>;
}

/** Reglas fijas que acompañan al contrato. */
const RULES: string[] = [
  "Emite SOLO JSON válido con la forma: { $schema: \"axzy/screen\", version, id, content }.",
  "`content` es un nodo o un array de nodos; cada nodo necesita `type` del catálogo.",
  "Usa solo props declaradas para ese `type`; el resto se ignora y se avisa.",
  "Los hijos se expresan con `children` (nodos) y los textos con `text`, nunca con props de nodo React.",
  "Las acciones se declaran por nombre: `\"onClick\": { \"action\": \"nombre.registrado\" }`. No hay código en el JSON.",
  "Prohibido: HTML crudo, URLs, fetch, expresiones JS y props como icon/actions/render.",
  "Los textos visibles deben ser claves de i18n: { \"i18n\": \"namespace.clave\" }.",
];

/** Construye el nodo mínimo que funciona para una entrada del catálogo. */
function buildMinimal(entry: CatalogEntry): Record<string, unknown> {
  const props: Record<string, unknown> = {};
  for (const [name, spec] of Object.entries(entry.props ?? {})) {
    if (!spec.required) continue;
    props[name] = sampleValue(name, spec);
  }
  const node: Record<string, unknown> = { type: entry.type };
  if (Object.keys(props).length > 0) node.props = props;
  if (entry.text) node.text = "Texto";
  return node;
}

/** Genera un valor de ejemplo para una prop obligatoria. */
function sampleValue(name: string, spec: PropSpec): unknown {
  if (spec.values?.length) return spec.values[0];
  if (spec.kind === "number" || spec.kind === "integer") return 1;
  if (spec.kind === "boolean") return false;
  if (spec.kind === "i18n") return { i18n: `ejemplo.${name}` };
  return name === "src" ? "/imagen.png" : `${name}`;
}

/** Deriva el contrato de vocabulario de un catálogo. */
export function buildVocabularyContract(
  catalog: Catalog = axzyCatalog,
  schemaVersion: number = CURRENT_SCHEMA_VERSION
): VocabularyContract {
  const components = Object.values(catalog.entries)
    .map<ComponentContract>((entry) => ({
      type: entry.type,
      summary: entry.summary,
      children: Boolean(entry.children),
      text: Boolean(entry.text),
      props: Object.entries(entry.props ?? {}).map(([name, spec]) => ({
        name,
        kind: spec.kind,
        required: Boolean(spec.required),
        values: spec.values ? [...spec.values] : undefined,
        default: spec.default,
        doc: spec.doc,
      })),
      forbidden: [...(entry.forbidden ?? [])],
      minimal: buildMinimal(entry),
    }))
    .sort((a, b) => a.type.localeCompare(b.type));

  return {
    $schema: "axzy/vocabulary",
    schemaVersion,
    rules: RULES,
    components,
    excluded: catalog.excluded ?? {},
  };
}

/** Serializa el contrato como texto compacto para el prompt. */
export function formatVocabularyForPrompt(contract: VocabularyContract): string {
  const lines: string[] = [
    `# Contrato de vocabulario AXZY (formato v${contract.schemaVersion})`,
    "",
    "Reglas:",
    ...contract.rules.map((rule) => `- ${rule}`),
    "",
    "Componentes:",
  ];

  for (const component of contract.components) {
    const props = component.props
      .map((prop) => {
        const parts = [`${prop.name}:${prop.kind}${prop.required ? "*" : ""}`];
        if (prop.values?.length) parts.push(`(${prop.values.join("|")})`);
        return parts.join(" ");
      })
      .join(", ");
    lines.push(`- ${component.type}${component.summary ? ` — ${component.summary}` : ""}`);
    if (props) lines.push(`  props: ${props}`);
    if (component.children) lines.push("  children: sí");
    if (component.text) lines.push("  text: sí");
    lines.push(`  mínimo: ${JSON.stringify(component.minimal)}`);
  }

  return lines.join("\n");
}
