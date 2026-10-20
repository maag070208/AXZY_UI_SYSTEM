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
import { issue, type JsonEngineIssue } from "../shared/errors";
import { formatPath, propPath, type SchemaPath } from "../shared/paths";
import { isNodePending } from "../stream/tolerantParse";
import { isSlotNode, slotName, type SlotRegistry } from "./slots";
import type { NodeSchema } from "./types";
import { FormNode } from "../form/FormNode";
import { readFormFields, type FormField } from "../form/rules";
import { wrapAction, type EffectContext, type EffectRegistry } from "../actions/effects";

/** Contexto de efectos de un nodo: el registro del host, la traducción y los avisos. */
function effectContext(options: RenderNodeOptions, path: SchemaPath, node: NodeSchema): EffectContext {
  return {
    effects: options.effects,
    path,
    resolveText: (value, valuePath) => textoDe(options.resolveValue ? options.resolveValue(value, valuePath) : value),
    report: (aviso) => options.issues.push(aviso),
    // Una acción encadenada desde un efecto se resuelve con el mismo `resolveAction` del host.
    resolveChained: (name) => options.resolveAction?.(node, "chain", { action: name }, path),
  };
}

/** `true` cuando el nodo es un formulario del motor. */
function isFormNode(node: NodeSchema): boolean {
  return node.type === "form";
}

/** Texto de un valor ya resuelto: solo los primitivos se muestran. */
function textoDe(value: unknown): string {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean" ? String(value) : "";
}

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
  /** Slots que registra el host. Un nodo `slot` monta el componente con su nombre. */
  slots?: SlotRegistry;
  /** Efectos que cumple el host (`toast`, `navigate`…) tras una acción. */
  effects?: EffectRegistry;
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
 * Monta un slot: el componente que el host registró con el nombre del nodo.
 *
 * Se monta como componente (no se llama como función) para que pueda usar hooks.
 * Los props del nodo pasan por `resolveValue`, igual que los del resto de nodos.
 */
function renderSlot(node: NodeSchema, options: RenderNodeOptions): React.ReactNode {
  const { path, issues, slots, resolveValue } = options;
  const name = slotName(node);

  if (!name) {
    issues.push(
      issue("JR011", "El slot no declara `props.name`.", formatPath(propPath(path, "name")), {
        severity: "error",
        hint: 'Declara el nombre que el host registró, por ejemplo { "type": "slot", "props": { "name": "resumen" } }.',
      })
    );
    return null;
  }

  const Component = slots && Object.prototype.hasOwnProperty.call(slots, name) ? slots[name] : undefined;
  if (!Component) {
    issues.push(
      issue("JR010", `El slot \`${name}\` no está registrado por el host.`, formatPath(path), {
        severity: "error",
        hint: "El host debe registrarlo en `slots` del renderizador.",
      })
    );
    return null;
  }

  const props: Record<string, unknown> = {};
  for (const [key, raw] of Object.entries(node.props ?? {})) {
    if (key === "name") continue;
    props[key] = resolveValue ? resolveValue(raw, path) : raw;
  }

  return React.createElement(Component, { key: node.id ?? path.join("-"), ...props });
}

/**
 * Pinta un nodo `form`: campos declarados en JSON, validación y envío por la acción del host.
 *
 * Los campos se leen con las mismas reglas que el validador (`readFormFields`). Los
 * textos (etiquetas, botón) pasan por `resolveValue`, así que pueden ser `{ i18n }`.
 */
function renderForm(node: NodeSchema, options: RenderNodeOptions): React.ReactNode {
  const { path, issues, resolveValue, resolveAction } = options;
  const { fields: declarados, issues: avisos } = readFormFields(node.props?.fields, [...path, "props", "fields"]);
  issues.push(...avisos);

  const campos: FormField[] = declarados.map((campo, index) => {
    const etiqueta = resolveValue ? resolveValue(campo.label, [...path, "props", "fields", index]) : campo.label;
    return {
      name: campo.name,
      kind: campo.kind,
      required: campo.required,
      minLength: campo.minLength,
      maxLength: campo.maxLength,
      label: textoDe(etiqueta) || campo.name,
    };
  });

  const textoEnvio = node.props?.submitLabel;
  // Sin texto declarado, el nodo usa `jsonRenderer.form.submit` (lo resuelve FormNode).
  const submitLabel = textoDe(resolveValue ? resolveValue(textoEnvio, path) : textoEnvio) || undefined;
  const accion = resolveAction?.(node, "onSubmit", node.props?.onSubmit, path);
  const conEfectos = accion ? wrapAction(accion, node.props?.onSubmit, effectContext(options, path, node)) : undefined;

  return React.createElement(FormNode, {
    key: node.id ?? path.join("-"),
    id: node.id,
    fields: campos,
    submitLabel,
    onSubmit: conEfectos ? (valores: Record<string, string>) => conEfectos(valores) : undefined,
  });
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

  // Los slots no están en el catálogo: los registra el host.
  if (isSlotNode(node)) {
    return renderSlot(node, options);
  }

  // El formulario lo compila el motor: campos, validación y envío por acción.
  if (isFormNode(node)) {
    return renderForm(node, options);
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
    if (typeof handler === "function") finalProps[name] = wrapAction(handler, action, effectContext(options, path, node));
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
