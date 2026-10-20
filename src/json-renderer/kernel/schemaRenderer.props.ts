import type { ReactNode } from "react";
import type { Catalog } from "../catalog/catalog.props";
import type { JsonEngineIssue } from "../shared/errors";
import type { EngineLimits } from "../shared/limits";
import type { SchemaPath } from "../shared/paths";
import type { NodeSchema, ScreenSchema } from "./types";

/**
 * Props de `ITSchemaRenderer`.
 *
 * El renderizador es el núcleo del motor: pinta un esquema contra un catálogo y
 * entrega los avisos sin lanzar nunca por culpa del esquema.
 */
export interface ITJsonRenderEngineProps {
  /** Esquema de pantalla a pintar. Admite un árbol parcial (streaming). */
  schema: ScreenSchema | null | undefined;
  /** Catálogo de componentes permitidos. Por defecto, el de AXZY. */
  catalog?: Catalog;
  /** Presupuesto de nodos, profundidad y tiempos. */
  limits?: Partial<EngineLimits>;
  /**
   * Resuelve un valor declarativo del esquema (`$state`, `$param`, `$source`…) al
   * valor real. Sin esta prop, los valores se pasan tal cual (útil para pruebas).
   */
  resolveValue?: (value: unknown, path: SchemaPath) => unknown;
  /**
   * Traduce una acción declarada a un handler ejecutable. Sin esta prop, las
   * acciones se ignoran y se avisa una sola vez por nodo.
   */
  resolveAction?: (
    node: NodeSchema,
    prop: string,
    action: unknown,
    path: SchemaPath
  ) => ((...args: unknown[]) => void) | undefined;
  /** Qué pintar mientras un nodo está pendiente (streaming). */
  pendingFallback?: ReactNode;
  /** Se llama por cada aviso del motor, con código y ruta. */
  onIssue?: (issue: JsonEngineIssue) => void;
  /** Clases del contenedor raíz. */
  className?: string;
}
