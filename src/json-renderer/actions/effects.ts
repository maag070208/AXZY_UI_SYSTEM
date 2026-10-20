/**
 * Efectos de acción: lo que el esquema pide que pase después de una acción.
 *
 * Una acción declara su efecto en el JSON; el host decide cómo se cumple. El motor:
 *
 * - ejecuta el handler del host (la acción en sí);
 * - si termina bien, aplica `then` (y los efectos sueltos de la acción);
 * - si falla o rechaza, aplica `onError`.
 *
 * Los efectos (`toast`, `navigate`, `refresh`, `openOverlay`, `closeOverlay`) los
 * cumple el registro `effects` que pasa el host. Un efecto también puede ser otra
 * acción (`{ action, args, then, onError }`): el motor la resuelve con el handler del
 * host y aplica sus propios efectos. Como el JSON es finito, el encadenado termina;
 * `MAX_EFFECT_DEPTH` lo limita de todos modos (`JR042`).
 *
 * Los textos y rutas pueden leer el resultado del handler con `{ "$result": "campo" }`
 * o `{campo}` dentro de una dirección.
 *
 * Si el esquema pide un efecto que el host no implementa, o una acción encadenada que
 * no existe, el motor avisa al pintar (`JR040`), nunca al ejecutar.
 *
 * Sin `then`, `onError` ni efectos, el handler se devuelve tal cual: no cambia nada.
 */

import { issue, type JsonEngineIssue } from "../shared/errors";
import { formatPath, type SchemaPath } from "../shared/paths";
import type { EffectSchema } from "../kernel/types";

/** Profundidad máxima de acciones encadenadas desde efectos. */
export const MAX_EFFECT_DEPTH = 5;

/** Variante de un aviso (`toast`). */
export type ToastVariant = "success" | "error" | "info" | "warning";

/** Lo que el host implementa. Cada efecto es opcional: el motor avisa si falta uno que se usa. */
export interface EffectRegistry {
  /** Muestra un aviso al usuario. */
  toast?: (aviso: { variant: ToastVariant; message: string }) => void;
  /** Navega a una dirección. */
  navigate?: (href: string) => void;
  /** Refresca una fuente de datos. */
  refresh?: (source: string) => void;
  /** Abre un overlay declarado. */
  openOverlay?: (name: string) => void;
  /** Cierra un overlay; sin nombre, el que esté abierto. */
  closeOverlay?: (name?: string) => void;
}

/** Contexto que necesita un efecto para ejecutarse en un nodo concreto. */
export interface EffectContext {
  /** Registro que implementa el host. */
  effects?: EffectRegistry;
  /** Traduce un valor del esquema (por ejemplo, `{ i18n }`) a texto. */
  resolveText: (value: unknown, path: SchemaPath) => string;
  /** Recibe los avisos del render (`JR040`, `JR042`). */
  report: (aviso: JsonEngineIssue) => void;
  /** Ruta del nodo, para los avisos. */
  path: SchemaPath;
  /** Handler del host para una acción encadenada por nombre, o `undefined` si no existe. */
  resolveChained?: (name: string) => ((...args: unknown[]) => unknown) | undefined;
  /** Profundidad de encadenado. La acción del nodo es 0. */
  depth?: number;
}

/** Un paso que se ejecuta cuando la acción termina, con el resultado del handler. */
type Paso = (resultado: unknown) => void;

/** Nombres de efecto que el motor conoce. */
const EFFECT_KEYS = ["toast", "navigate", "refresh", "openOverlay", "closeOverlay"] as const;

/** Forma de una acción con efectos, tal como la escribe el JSON. */
interface ActionWithEffects extends EffectSchema {
  /** Efectos que se ejecutan si la acción termina bien. */
  then?: EffectSchema[];
  /** Efecto que se ejecuta si la acción falla. */
  onError?: EffectSchema;
}

/** Lee un campo del resultado por ruta (`"usuario.id"`). Sin resultado o sin campo, `undefined`. */
function leerResultado(ruta: string, resultado: unknown): unknown {
  return ruta.split(".").reduce<unknown>(
    (actual, clave) => (actual && typeof actual === "object" ? (actual as Record<string, unknown>)[clave] : undefined),
    resultado
  );
}

/** Sustituye las referencias `{ $result }` de un valor por el dato real del handler. */
function resolverResultado(valor: unknown, resultado: unknown): unknown {
  if (!valor || typeof valor !== "object" || Array.isArray(valor)) return valor;
  const objeto = valor as Record<string, unknown>;
  if (typeof objeto.$result === "string") return leerResultado(objeto.$result, resultado) ?? "";
  if (objeto.params && typeof objeto.params === "object") {
    const params = Object.fromEntries(
      Object.entries(objeto.params as Record<string, unknown>).map(([clave, valorParam]) => [
        clave,
        resolverResultado(valorParam, resultado),
      ])
    );
    return { ...objeto, params };
  }
  return valor;
}

/** Sustituye `{campo}` en una dirección por el campo del resultado. */
function plantilla(texto: string, resultado: unknown): string {
  return texto.replace(/\{([\w.]+)\}/g, (_, ruta: string) => {
    const valor = leerResultado(ruta, resultado);
    return valor === undefined ? "" : String(valor);
  });
}

/** Efectos sueltos de una acción (sin `action`, `args`, `then` ni `onError`), o `null` si no tiene. */
function efectosSueltos(declarada: ActionWithEffects): EffectSchema | null {
  const sueltos: Record<string, unknown> = {};
  for (const clave of EFFECT_KEYS) {
    if (declarada[clave] !== undefined) sueltos[clave] = declarada[clave];
  }
  return Object.keys(sueltos).length > 0 ? (sueltos as EffectSchema) : null;
}

/** Avisa de los efectos de registro que el esquema pide y el host no implementa. Se llama al pintar. */
function comprobarRegistro(efecto: EffectSchema, context: EffectContext): void {
  for (const clave of EFFECT_KEYS) {
    if (efecto[clave] === undefined) continue;
    if (typeof context.effects?.[clave] !== "function") {
      context.report(
        issue("JR040", `El host no implementa el efecto \`${clave}\`.`, formatPath(context.path), {
          severity: "warning",
          hint: "Regístralo en `effects` del renderizador o quita el efecto del esquema.",
        })
      );
    }
  }
}

/** Cumple un efecto de registro con el resultado del handler. */
function cumplirEfecto(efecto: EffectSchema, context: EffectContext, resultado: unknown): void {
  const registro = context.effects;
  if (!registro) return;

  if (efecto.toast && registro.toast) {
    registro.toast({
      variant: efecto.toast.variant ?? "info",
      message: context.resolveText(resolverResultado(efecto.toast.message, resultado), context.path),
    });
  }
  if (typeof efecto.navigate === "string" && registro.navigate) {
    registro.navigate(plantilla(efecto.navigate, resultado));
  }
  if (typeof efecto.refresh === "string" && registro.refresh) registro.refresh(efecto.refresh);
  if (typeof efecto.openOverlay === "string" && registro.openOverlay) registro.openOverlay(efecto.openOverlay);
  if (efecto.closeOverlay !== undefined && registro.closeOverlay) {
    registro.closeOverlay(typeof efecto.closeOverlay === "string" ? efecto.closeOverlay : undefined);
  }
}

/**
 * Convierte cada efecto en un paso. Los efectos de registro se comprueban aquí; una
 * acción encadenada se resuelve aquí y se envuelve con sus propios efectos.
 */
function pasosDe(efectos: EffectSchema[], context: EffectContext): Paso[] {
  const profundidad = context.depth ?? 0;

  return efectos.map((efecto): Paso => {
    if (typeof efecto.action !== "string") {
      comprobarRegistro(efecto, context);
      return (resultado) => cumplirEfecto(efecto, context, resultado);
    }

    if (profundidad + 1 > MAX_EFFECT_DEPTH) {
      context.report(
        issue("JR042", `El encadenado de acciones supera ${MAX_EFFECT_DEPTH} niveles.`, formatPath(context.path), {
          severity: "error",
          hint: "Reduce los `then` anidados.",
        })
      );
      return () => undefined;
    }

    const handler = context.resolveChained?.(efecto.action);
    if (!handler) {
      context.report(
        issue("JR040", `La acción encadenada \`${efecto.action}\` no está registrada por el host.`, formatPath(context.path), {
          severity: "error",
          hint: "Regístrala en las acciones del renderizador o cambia el nombre en el esquema.",
        })
      );
      return () => undefined;
    }

    const encadenada = wrapAction(handler, efecto, { ...context, depth: profundidad + 1 });
    return () => encadenada(efecto.args);
  });
}

/**
 * Envuelve el handler de una acción para que cumpla sus efectos.
 *
 * Los efectos sueltos de la acción cuentan como un `then` más, delante de la lista.
 *
 * @example
 * const handler = wrapAction(hostHandler, { action: "enviar", then: [{ toast: { message: "Hecho" } }] }, context);
 */
export function wrapAction(
  handler: (...args: unknown[]) => unknown,
  action: unknown,
  context: EffectContext
): (...args: unknown[]) => unknown {
  if (!action || typeof action !== "object") return handler;
  const declarada = action as ActionWithEffects;
  const sueltos = efectosSueltos(declarada);
  const alTerminar: EffectSchema[] = [...(sueltos ? [sueltos] : []), ...(Array.isArray(declarada.then) ? declarada.then : [])];
  const alFallar = declarada.onError;

  if (alTerminar.length === 0 && !alFallar) return handler;

  const pasosOk = pasosDe(alTerminar, context);
  const pasoError = alFallar ? pasosDe([alFallar], context)[0] : undefined;
  const aplicar = (resultado: unknown) => pasosOk.forEach((paso) => paso(resultado));

  return (...args: unknown[]) => {
    let resultado: unknown;
    try {
      resultado = handler(...args);
    } catch {
      pasoError?.(undefined);
      return undefined;
    }

    if (resultado && typeof (resultado as PromiseLike<unknown>).then === "function") {
      (resultado as Promise<unknown>).then(
        (valor) => aplicar(valor),
        () => pasoError?.(undefined)
      );
      return resultado;
    }

    aplicar(resultado);
    return resultado;
  };
}
