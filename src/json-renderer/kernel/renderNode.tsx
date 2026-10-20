/**
 * Renderizado de un nodo del esquema.
 *
 * Toma un `NodeSchema`, lo resuelve contra el catálogo y devuelve el elemento
 * React. Todo lo que no puede resolverse se convierte en avisos, nunca en una
 * excepción: el motor tiene que poder pintar un esquema a medias sin caerse.
 */

import React from "react";
import type { Catalog } from "../catalog/catalog.props";
import { resolveNode } from "../catalog/resolve";
import type { JsonEngineIssue } from "../shared/errors";
import type { SchemaPath } from "../shared/paths";
import { isNodePending } from "../stream/tolerantParse";
import type { NodeSchema } from "./types";

/** Opciones de render de un nodo. */
export interface RenderNodeOptions {
  /** Catálogo contra el que se resuelve el tipo. */
  catalog: Catalog;
  /** Ruta del nodo dentro del esquema (para avisos). */
  path: SchemaPath;
  /** Acumulador de avisos del render en curso. */
  issues: JsonEngineIssue[];
  /** Resuelve un valor del esquema (binding). Por defecto, identidad. */
  resolveValue?: (value: unknown, path: SchemaPath) => unknown;
  /** Resuelve el handler de una acción declarada. */
  resolveAction?: (
    node: NodeSchema,
    prop: string,
    action: unknown,
    path: SchemaPath
  ) => ((...args: unknown[]) => void) | undefined;
  /** Renderiza los hijos de un nodo (lo aporta el recorrido del árbol). */
  renderChildren?: (node: NodeSchema, path: SchemaPath) => React.ReactNode;
  /** Qué pintar mientras un nodo está pendiente (streaming). */
  pendingFallback?: React.ReactNode;
  /** Componente para envolver cada nodo. Por defecto, `NodeBoundary`. */
  wrap?: (node: NodeSchema, path: SchemaPath, content: React.ReactNode) => React.ReactNode;
}

/** `true` cuando el nodo tiene `children` declarados. */
export function hasChildren(node: NodeSchema | null | undefined): boolean {
  return Boolean(node) && node!.children !== undefined && node!.children !== null;
}

/**
 * Convierte los hijos declarados en una lista, sin importar su forma.
 *
 * Tolera un nodo ausente a propósito: un esquema parcial puede no tener todavía
 * `content`, y el kernel no debe caerse por eso.
 */
export function childList(node: NodeSchema | null | undefined): NodeSchema[] {
  if (!node || node.children === undefined || node.children === null) return [];
  return Array.isArray(node.children) ? node.children : [node.children];
}

/**
 * Pinta un nodo del esquema.
 *
 * @example
 * renderNode({ type: "ITText", text: "Hola" }, { catalog: axzyCatalog, path: ["content", 0], issues: [] });
 */
export function renderNode(node: NodeSchema, options: RenderNodeOptions): React.ReactNode {
  const { catalog, path, issues, renderChildren } = options;

  if (!node || typeof node !== "object") {
    return null;
  }

  // Un nodo que aún no ha llegado por el stream no se pinta a medias.
  if (isNodePending(node)) {
    return options.pendingFallback ?? null;
  }

  const resolved = resolveNode(node, catalog, path);
  issues.push(...resolved.issues);

  if (!resolved.ok) {
    return null;
  }

  const { entry, props, actions } = resolved;

  // Props declarativas que necesitan resolución (binding, i18n, acciones).
  const finalProps: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(props)) {
    finalProps[name] = options.resolveValue ? options.resolveValue(value, path) : value;
  }

  // Las acciones se traducen a handlers del host; las no registradas se avisan.
  for (const [name, action] of Object.entries(actions)) {
    const handler = options.resolveAction?.(node, name, action, path);
    if (typeof handler === "function") finalProps[name] = handler;
  }

  // Contenido: `children` declarados y, si el componente acepta texto, el atajo.
  // El atajo también pasa por `resolveValue` para poder ser una clave i18n.
  const content = renderChildren ? renderChildren(node, path) : null;
  const rawText = entry.text && node.text !== undefined ? node.text : undefined;
  const text = rawText === undefined ? undefined : options.resolveValue ? options.resolveValue(rawText, path) : rawText;
  const children = (content ?? text) as React.ReactNode;

  // El `id` del nodo se refleja en el DOM: sirve de ancla para `ir-seccion`,
  // para enlazar a una parte de la pantalla y para localizarla en pruebas.
  const element = React.createElement(
    entry.component,
    { ...finalProps, key: node.id ?? path.join("-"), id: node.id },
    children
  );

  return options.wrap ? options.wrap(node, path, element) : element;
}
