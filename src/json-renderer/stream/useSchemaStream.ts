/**
 * `useSchemaStream`: pinta un esquema mientras llega por trozos.
 *
 * Acepta una fuente completa (`string`), un iterable asíncrono o un `ReadableStream` de
 * texto. Acumula el texto, lo parsea en modo tolerante con cada trozo y devuelve el último
 * árbol válido. Lo que aún no está cerrado no se pinta a medias (ver `pendingFallback`).
 *
 * Garantías:
 *
 * - **Sin pérdida con StrictMode:** el texto acumulado vive en un registro asociado a la
 *   fuente, no en el efecto. Si React monta dos veces, el segundo montaje continúa donde
 *   quedó el primero; ningún fragmento se pierde ni se duplica.
 * - **Cancelación:** si el componente deja de usar la fuente, el registro se cierra y se
 *   devuelve el control a la fuente (`return()` del iterable, `cancel()` del stream).
 * - **Sin árbol roto:** si el texto deja de ser recuperable, se conserva el último árbol
 *   válido. Un stream que falla o termina sin cerrar avisa con `JR080`.
 *
 * **La fuente debe ser estable entre renders.** Crea el iterable o el stream una vez
 * (en un estado, o fuera del componente) y pásalo tal cual. Crearlo dentro del render
 * arranca un stream nuevo en cada render.
 *
 * @example
 * const { tree, streaming, issues } = useSchemaStream(respuestaDelModelo);
 * <ITSchemaRenderer schema={tree} onIssue={registrar} pendingFallback={<ITSkeleton />} />
 */

import { useEffect, useState } from "react";
import type { ScreenSchema } from "../kernel/types";
import { issue, type JsonEngineIssue } from "../shared/errors";
import { parsePartialSchema, type StreamState } from "./tolerantParse";

/** Fuente de un esquema que llega por trozos. */
export type StreamSource = string | AsyncIterable<string> | ReadableStream<string>;

/** Estado inicial: nada recibido todavía. */
const VACIO: StreamState = {
  tree: null,
  status: "complete",
  broken: false,
  pendingNodes: 0,
  streaming: false,
  text: "",
  issues: [],
};

/** Registro compartido de una fuente: texto acumulado, iterador y avisos. */
interface Grabacion {
  texto: string;
  iterador: AsyncIterator<string> | null;
  terminado: boolean;
  error: string | null;
  avisos: JsonEngineIssue[];
  /** Montajes que la están usando ahora. Si llega a cero, la fuente se cancela. */
  activos: number;
  /** Último árbol válido: se conserva cuando el texto deja de ser recuperable. */
  ultimoValido: ScreenSchema | null;
  /** `true` cuando los avisos de cierre ya se añadieron (para no duplicarlos). */
  cerrada: boolean;
  /** `true` cuando la fuente se cortó desde fuera: no es un fin de stream. */
  cancelada: boolean;
}

/** Un registro por fuente. Al soltarse la fuente, el registro se libera solo. */
const grabaciones = new WeakMap<object, Grabacion>();

/** `true` cuando el valor es un iterable asíncrono. */
function esAsyncIterable(value: unknown): value is AsyncIterable<string> {
  return value !== null && typeof value === "object" && typeof (value as AsyncIterable<string>)[Symbol.asyncIterator] === "function";
}

/** Convierte un `ReadableStream` de texto en un generador asíncrono. Cancelar el generador cancela el stream. */
async function* desdeReadable(readable: ReadableStream<string>): AsyncGenerator<string> {
  const reader = readable.getReader();
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) return;
      yield value;
    }
  } finally {
    await reader.cancel().catch(() => undefined);
  }
}

/** Mensaje legible de un error de la fuente. */
function mensajeDe(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/** Crea el registro de una fuente nueva. */
function crearGrabacion(source: StreamSource): Grabacion {
  const iterador: AsyncIterator<string> | null =
    typeof source === "string" ? null : esAsyncIterable(source) ? source[Symbol.asyncIterator]() : desdeReadable(source)[Symbol.asyncIterator]();
  return {
    texto: typeof source === "string" ? source : "",
    iterador,
    terminado: typeof source === "string",
    error: null,
    avisos: [],
    activos: 0,
    ultimoValido: null,
    cerrada: false,
    cancelada: false,
  };
}

/** Estado que ve el componente a partir del texto acumulado. */
function estadoDe(grab: Grabacion, streaming: boolean): StreamState {
  const parcial = parsePartialSchema(grab.texto);
  if (!parcial.broken && parcial.tree) grab.ultimoValido = parcial.tree;
  return {
    tree: parcial.broken ? grab.ultimoValido : parcial.tree,
    status: parcial.status,
    broken: parcial.broken,
    pendingNodes: parcial.pendingNodes,
    streaming,
    text: grab.texto,
    issues: [...grab.avisos],
  };
}

/** Al terminar la fuente: avisa si el stream falló o si el JSON quedó sin cerrar. */
function cerrarGrabacion(grab: Grabacion): void {
  if (grab.cerrada || grab.cancelada) return;
  grab.cerrada = true;
  if (grab.error !== null) {
    grab.avisos.push(issue("JR080", `El stream falló: ${grab.error}. Se conserva el último árbol válido.`, "", { severity: "error" }));
    return;
  }
  const parcial = parsePartialSchema(grab.texto);
  if (parcial.broken || parcial.status !== "complete") {
    grab.avisos.push(
      issue("JR080", "El stream terminó con el JSON sin cerrar. Se conserva el último árbol válido.", "", {
        severity: "warning",
        hint: "Revisa que el emisor cierre todas las llaves y corchetes.",
      })
    );
  }
}

/**
 * Consume la fuente sin perder fragmentos y avisa a cada trozo (`onTrozo`) y al terminar.
 *
 * Un trozo que ya se pidió se guarda aunque este montaje se haya soltado: el siguiente
 * montaje lo encuentra en el registro. Así StrictMode no pierde nada.
 */
async function consumir(grab: Grabacion, cancelado: () => boolean, onTrozo: () => void): Promise<void> {
  while (!grab.terminado && grab.iterador) {
    let paso: IteratorResult<string>;
    try {
      paso = await grab.iterador.next();
    } catch (error) {
      grab.error = mensajeDe(error);
      grab.terminado = true;
      break;
    }
    if (paso.done) {
      grab.terminado = true;
      break;
    }
    grab.texto += String(paso.value);
    if (!cancelado()) onTrozo();
    if (cancelado()) return;
  }
  if (grab.terminado) cerrarGrabacion(grab);
}

/**
 * Devuelve el estado de un esquema que llega por trozos.
 *
 * @example
 * const estado = useSchemaStream(stream);
 * estado.tree;      // árbol pintable, o null si aún no hay nada válido
 * estado.streaming; // true mientras la fuente sigue emitiendo
 */
export function useSchemaStream(source: StreamSource | null | undefined): StreamState {
  const [estado, setEstado] = useState<StreamState>(VACIO);

  useEffect(() => {
    if (source === null || source === undefined) {
      setEstado(VACIO);
      return;
    }

    // Una cadena no puede ser clave de WeakMap, y ya está entera: basta un registro efímero.
    // Los iterables y los streams se registran para sobrevivir a StrictMode.
    let registro: Grabacion;
    if (typeof source === "string") {
      registro = crearGrabacion(source);
    } else {
      const existente = grabaciones.get(source);
      registro = existente ?? crearGrabacion(source);
      if (!existente) grabaciones.set(source, registro);
    }
    registro.activos += 1;

    let cancelado = false;
    // Primero se arranca el proceso: una cadena se cierra de forma síncrona (y sus avisos
    // quedan ya en el registro), así que el estado inicial los incluye.
    const proceso = consumir(
      registro,
      () => cancelado,
      () => setEstado(estadoDe(registro, true))
    );
    setEstado(estadoDe(registro, !registro.terminado));

    void proceso.then(() => {
      if (!cancelado) setEstado(estadoDe(registro, false));
    });

    return () => {
      cancelado = true;
      registro.activos -= 1;
      // Si nadie más usa la fuente tras el ciclo de montaje (StrictMode monta dos veces de
      // forma síncrona), se devuelve el control a la fuente.
      setTimeout(() => {
        if (registro.activos === 0 && !registro.terminado && registro.iterador) {
          registro.terminado = true;
          registro.cancelada = true;
          void registro.iterador.return?.(undefined);
        }
      }, 0);
    };
  }, [source]);

  return estado;
}
