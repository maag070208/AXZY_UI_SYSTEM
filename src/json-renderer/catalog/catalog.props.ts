import type React from "react";

/**
 * Catálogo del motor: qué componentes y qué props están permitidos.
 *
 * Es una **lista blanca**. Todo lo que no esté aquí declarado se ignora y se
 * avisa (`JR010` / `JR011`), porque el esquema se trata siempre como entrada no
 * confiable: puede venir de un backend con un bug o de un modelo que alucina.
 *
 * Cada prop declara su tipo, si es obligatoria, sus valores admitidos y si su
 * valor es una acción registrada por el host (`kind: "action"`).
 */

/** Tipo de un valor admitido en una prop. */
export type PropKind =
  | "string"
  | "number"
  | "integer"
  | "boolean"
  | "enum"
  | "node"
  | "nodes"
  | "data"
  | "columns"
  | "action"
  | "i18n"
  | "object"
  | "array";

/** Especificación de una prop dentro del catálogo. */
export interface PropSpec {
  /** Tipo admitido. */
  kind: PropKind;
  /** `true` cuando el componente no funciona sin ella. */
  required?: boolean;
  /** Valores admitidos cuando `kind: "enum"`. */
  values?: readonly string[];
  /** Valor por defecto que aplica el motor. */
  default?: unknown;
  /** Descripción para el autor del esquema y para el contrato del emisor. */
  doc?: string;
}

/** Entrada de un componente en el catálogo. */
export interface CatalogEntry {
  /** Nombre del componente tal cual (`ITCard`). */
  type: string;
  /**
   * Componente React que se monta.
   *
   * El tipo es deliberadamente laxo (`any`): las props se validan y coaccionan
   * en runtime contra `props`, así que exigir el tipo exacto de cada componente
   * solo serviría para obligar a un cast por entrada.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  /** Props permitidas. Todo lo demás se descarta con aviso. */
  props?: Record<string, PropSpec>;
  /** `true` cuando el nodo admite `children`. @default false */
  children?: boolean;
  /** `true` cuando el nodo admite el atajo `text`. @default false */
  text?: boolean;
  /** Props prohibidas explícitamente (para mensajes más claros). */
  forbidden?: readonly string[];
  /** Descripción breve para el contrato de vocabulario. */
  summary?: string;
}

/** Catálogo completo. */
export interface Catalog {
  /** Entradas indexadas por `type`. */
  entries: Record<string, CatalogEntry>;
  /** Tipos excluidos a propósito, con su motivo (se avisa distinto). */
  excluded?: Record<string, string>;
}

/**
 * Props prohibidas en **cualquier** componente, por seguridad.
 *
 * Solo entran las que inyectan nodos React, HTML o comportamiento: los valores
 * enumerados y seguros (`as`, `className`…) se declaran componente a componente.
 */
export const GLOBALLY_FORBIDDEN_PROPS: readonly string[] = [
  "dangerouslySetInnerHTML",
  "render",
  "component",
  "children", // los hijos se declaran como nodos, nunca como prop
  "ref",
  "key",
  "style", // se permite solo si el catálogo lo declara explícitamente
  "icon",
  "actions",
  "action",
  "emptyAction",
  "fallback",
  "logo",
  "badge",
];

/** Crea un catálogo a partir de una lista de entradas. */
export function createCatalog(
  entries: CatalogEntry[],
  excluded: Record<string, string> = {}
): Catalog {
  const index: Record<string, CatalogEntry> = {};
  for (const entry of entries) {
    if (index[entry.type]) {
      throw new Error(`Catálogo duplicado: ${entry.type}`);
    }
    index[entry.type] = entry;
  }
  return { entries: index, excluded };
}

/** Devuelve la entrada de un tipo, o `undefined` si no está en el catálogo. */
export function getCatalogEntry(catalog: Catalog, type: string): CatalogEntry | undefined {
  return catalog.entries[type];
}

/** `true` cuando el tipo está excluido a propósito (recursión, ejecución de entrada…). */
export function isExcludedType(catalog: Catalog, type: string): boolean {
  return Boolean(catalog.excluded && type in catalog.excluded);
}

/** Motivo por el que un tipo está excluido. */
export function getExclusionReason(catalog: Catalog, type: string): string | undefined {
  return catalog.excluded?.[type];
}
