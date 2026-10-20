/**
 * Presupuesto y nodos pendientes.
 *
 * Dos responsabilidades que van juntas porque las dos protegen el render:
 * contar lo que se va a pintar (para no colgar el hilo con un esquema enorme) y
 * saber cuánto falta por llegar (para no pintar nodos a medias).
 */

import type { JsonEngineIssue } from "../shared/errors";
import { issue } from "../shared/errors";
import { createLimitTracker, type EngineLimits } from "../shared/limits";
import { isNodePending } from "../stream/tolerantParse";
import { childList } from "./renderNode";
import type { NodeSchema, ScreenSchema } from "./types";

/** Recuento de un esquema antes de pintarlo. */
export interface TreeAudit {
  /** Nodos con `type` contados. */
  nodes: number;
  /** Profundidad máxima alcanzada. */
  depth: number;
  /** Nodos marcados como pendientes por el stream. */
  pending: number;
  /** `true` cuando se recortó por presupuesto. */
  exceeded: boolean;
  /** Avisos derivados del recuento. */
  issues: JsonEngineIssue[];
}

/**
 * Recorre el esquema sin pintarlo para saber su tamaño.
 *
 * Se hace antes del render a propósito: así el motor puede decidir recortar y
 * avisar sin que React haya empezado a montar nada.
 *
 * @example
 * auditTree({ version: 1, id: "x", content: [] }, resolveLimits()).nodes; // 0
 */
export function auditTree(schema: ScreenSchema, limits: EngineLimits): TreeAudit {
  const tracker = createLimitTracker(limits);
  const issues: JsonEngineIssue[] = [];
  let pending = 0;
  let depth = 0;

  const walk = (node: NodeSchema, path: string, level: number): void => {
    if (!node || typeof node !== "object") return;
    if (!tracker.visit(level)) return;
    if (level > depth) depth = level;
    if (isNodePending(node)) pending += 1;

    const children = childList(node);
    children.forEach((child, index) => {
      walk(child, `${path}[${index}]`, level + 1);
    });

    // Un nodo con `fallback` añade un subárbol más al presupuesto.
    if (node.fallback) walk(node.fallback, `${path}.fallback`, level + 1);
  };

  const content = Array.isArray(schema.content) ? schema.content : [schema.content];
  content.forEach((node, index) => walk(node, `content[${index}]`, 0));

  if (tracker.exceeded) {
    issues.push(
      issue(
        "JR013",
        `El esquema supera el presupuesto (${tracker.nodes} nodos, profundidad ${tracker.deepest}).`,
        "content",
        {
          severity: "warning",
          hint: `Máximo configurado: ${limits.maxNodes} nodos y profundidad ${limits.maxDepth}. La parte que sobra no se pinta.`,
        }
      )
    );
  }

  return { nodes: tracker.nodes, depth: tracker.deepest, pending, exceeded: tracker.exceeded, issues };
}

/** Cuenta los nodos pendientes de un esquema ya parseado. */
export function countPendingNodes(schema: ScreenSchema | null): number {
  if (!schema) return 0;
  let total = 0;
  const walk = (node: NodeSchema): void => {
    if (!node || typeof node !== "object") return;
    if (isNodePending(node)) total += 1;
    for (const child of childList(node)) walk(child);
  };
  const content = Array.isArray(schema.content) ? schema.content : [schema.content];
  for (const node of content) walk(node);
  return total;
}
