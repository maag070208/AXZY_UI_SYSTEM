/**
 * Slots: bloques que registra el **host** y el esquema solo nombra.
 *
 * Un nodo `{ "type": "slot", "props": { "name": "…", … } }` monta el componente que
 * el host registró con ese nombre en `slots`. El esquema no puede elegir el
 * componente ni inyectar código: solo pasa valores (ya resueltos por el binding)
 * como props. Es la vía para reutilizar pantallas JSX existentes dentro de un JSON.
 *
 * Los slots no están en el catálogo: son autoridad del host, igual que los handlers
 * de datos. Un nombre que el host no registró avisa con `JR010` y no se pinta nada.
 */

import type { ComponentType } from "react";
import type { NodeSchema } from "./types";

/** Tipo de nodo reservado para los slots. Minúscula: lo compila el motor, no es un componente. */
export const SLOT_TYPE = "slot";

/** Componente que el host registra como slot. Recibe los props del nodo ya resueltos. */
export type SlotComponent = ComponentType<Record<string, unknown>>;

/** Slots que registra el host, por nombre. */
export type SlotRegistry = Record<string, SlotComponent>;

/** `true` cuando el nodo es un slot. */
export function isSlotNode(node: NodeSchema): boolean {
  return node.type === SLOT_TYPE;
}

/** Nombre del slot (`props.name`), o `undefined` si falta o no es texto. */
export function slotName(node: NodeSchema): string | undefined {
  const name = node.props?.name;
  return typeof name === "string" && name !== "" ? name : undefined;
}
