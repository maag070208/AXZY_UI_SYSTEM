/**
 * Parser tolerante de esquemas a medio llegar.
 *
 * Es la pieza que hace posible el streaming: en vez de esperar a que el JSON esté
 * completo (y fallar mientras tanto), se construye el árbol **hasta donde es
 * válido** y se marcan como `pending` los nodos que aún no están cerrados.
 *
 * No pretende ser un parser JSON general: entiende la gramática de un esquema
 * (objetos, arrays, cadenas, números, booleanos y `null`) y, cuando algo no
 * cierra, devuelve el punto exacto donde se quedó para poder seguir desde ahí.
 *
 * @example
 * const { tree, status } = parsePartialSchema('{"version":1,"content":[{"type":"ITCard"');
 * // tree.content[0].$status === "pending"
 */

import type { NodeSchema, NodeStatus, ScreenSchema } from "../kernel/types";
import type { JsonEngineIssue } from "../shared/errors";

/** Resultado de parsear un texto posiblemente incompleto. */
export interface PartialParseResult {
  /** Árbol resuelto hasta donde el texto es válido. `null` si aún no hay nada. */
  tree: ScreenSchema | null;
  /** `complete` si el documento está entero; `pending` si falta cerrar algo. */
  status: NodeStatus;
  /** Offset donde terminó el consumo (punto de continuación). */
  offset: number;
  /** `true` cuando el texto no es recuperable (basura al principio). */
  broken: boolean;
  /** Cuántos nodos quedaron pendientes. */
  pendingNodes: number;
}

/** Valor intermedio durante el parseo, con la marca de pendiente. */
type Pending = { $pending: true };

/** Comprueba si un valor intermedio es un nodo aún sin cerrar. */
function isPending(value: unknown): value is Pending {
  return typeof value === "object" && value !== null && (value as Pending).$pending === true;
}

/**
 * Contenedores que se cerraron por falta de texto y no por su delimitador.
 * Se guardan aparte (WeakSet) para no ensuciar el árbol con claves internas.
 */
const TRUNCATED_CONTAINERS = new WeakSet<object>();

/** Sustituye las marcas de pendiente por `$status: "pending"` en el árbol final. */
function finalize(value: unknown, counter: { pending: number }): unknown {
  if (Array.isArray(value)) {
    // Un elemento pendiente en un array completo no se descarta sin más: se
    // quita del resultado, pero el array conserva los elementos ya cerrados para
    // que el render progresivo no pierda lo que ya había llegado.
    return value
      .map((item) => finalize(item, counter))
      .filter((item) => item !== undefined);
  }
  if (value && typeof value === "object") {
    if (isPending(value)) {
      counter.pending += 1;
      return undefined;
    }
    // Un valor pendiente en un objeto completo NO invalida el objeto: el nodo ya
    // llegó y solo le falta una parte. Se conserva y se marca como incompleto,
    // porque perderlo rompería el render progresivo (un nodo cerrado desaparecía
    // al llegar el siguiente a medias).
    const out: Record<string, unknown> = { ...(value as Record<string, unknown>) };
    let hasPendingChild = false;
    for (const [key, nested] of Object.entries(out)) {
      const resolved = finalize(nested, counter);
      if (resolved === undefined && isPending(nested)) {
        hasPendingChild = true;
        delete out[key];
      } else {
        out[key] = resolved;
      }
    }
    // Un nodo está incompleto si le falta alguna parte **o** si su propio
    // contenedor no llegó a cerrarse (el stream se cortó dentro de él).
    const truncated = TRUNCATED_CONTAINERS.has(value as object);
    if ((hasPendingChild || truncated) && "type" in out) {
      out.$status = "pending" satisfies NodeStatus;
    }
    return out;
  }
  return value;
}

const WHITESPACE = new Set([" ", "\t", "\n", "\r"]);

/**
 * Parser de descenso recursivo que nunca lanza.
 *
 * Devuelve el valor y el offset donde se detuvo; si se detuvo por falta de texto
 * (no por un error), el valor se marca como pendiente.
 */
class TolerantParser {
  private index = 0;
  /** `true` cuando se detuvo porque el texto se acabó (y no por un error). */
  private truncated = false;
  /** `true` cuando encontró algo que no puede interpretar. */
  broken = false;

  constructor(private readonly text: string) {}

  /** Offset actual. */
  get offset(): number {
    return this.index;
  }

  /** `true` si el consumo se detuvo por falta de texto. */
  get isTruncated(): boolean {
    return this.truncated;
  }

  /** Salta el espacio en blanco. */
  private skip(): void {
    while (this.index < this.text.length && WHITESPACE.has(this.text[this.index])) this.index += 1;
  }

  /** Carácter actual, o `undefined` si se acabó. */
  private peek(): string | undefined {
    return this.text[this.index];
  }

  /** Intenta consumir un literal (`true`, `false`, `null`). */
  private tryLiteral(literal: string): boolean | null | Pending {
    if (!this.text.startsWith(literal, this.index)) return undefined as unknown as null;
    const end = this.index + literal.length;
    // Si el literal está a medias (`tru`), se considera pendiente.
    if (end > this.text.length) {
      this.index = this.text.length;
      this.truncated = true;
      return { $pending: true };
    }
    // Un literal a medias al final del texto no es un literal completo.
    if (this.text.slice(this.index, end) !== literal) {
      const prefix = this.text.slice(this.index);
      if (literal.startsWith(prefix)) {
        this.index = this.text.length;
        this.truncated = true;
        return { $pending: true };
      }
      return undefined as unknown as null;
    }
    this.index = end;
    if (literal === "true") return true;
    if (literal === "false") return false;
    return null;
  }

  /** Lee una cadena. Marca pendiente si no encuentra la comilla de cierre. */
  private readString(): string | Pending {
    this.index += 1; // comilla de apertura
    let out = "";
    while (this.index < this.text.length) {
      const char = this.text[this.index];
      if (char === "\\") {
        const next = this.text[this.index + 1];
        if (next === undefined) {
          this.index = this.text.length;
          this.truncated = true;
          return { $pending: true };
        }
        out += unescapeChar(next);
        this.index += 2;
        continue;
      }
      if (char === '"') {
        this.index += 1;
        return out;
      }
      out += char;
      this.index += 1;
    }
    this.truncated = true;
    return { $pending: true };
  }

  /** Lee un número. Devuelve el texto crudo como número, o pendiente. */
  private readNumber(): number | Pending {
    const start = this.index;
    if (this.peek() === "-") this.index += 1;
    while (this.index < this.text.length && /[0-9.eE+-]/.test(this.text[this.index])) this.index += 1;
    const raw = this.text.slice(start, this.index);
    if (raw === "" || raw === "-") {
      this.index = this.text.length;
      this.truncated = true;
      return { $pending: true };
    }
    const value = Number(raw);
    if (Number.isNaN(value)) {
      this.broken = true;
      return { $pending: true };
    }
    return value;
  }

  /** Marca un contenedor como truncado (se cerró por falta de texto). */
  private markTruncated(container: object): void {
    this.truncated = true;
    TRUNCATED_CONTAINERS.add(container);
  }

  /** Lee un array. */
  private readArray(): unknown[] | Pending {
    this.index += 1; // "["
    const items: unknown[] = [];
    this.skip();
    if (this.peek() === "]") {
      this.index += 1;
      return items;
    }
    for (;;) {
      this.skip();
      if (this.peek() === undefined) {
        if (items.length === 0) {
          this.truncated = true;
          return { $pending: true };
        }
        this.markTruncated(items);
        return items;
      }
      const value = this.readValue();
      if (isPending(value)) {
        // El elemento a medias no se descarta si el array ya tiene contenido:
        // se devuelve lo que había y se sigue en el próximo fragmento.
        if (items.length === 0) {
          this.truncated = true;
          return { $pending: true };
        }
        this.markTruncated(items);
        return items;
      }
      items.push(value);
      this.skip();
      const char = this.peek();
      if (char === ",") {
        this.index += 1;
        continue;
      }
      if (char === "]") {
        this.index += 1;
        return items;
      }
      if (char === undefined) {
        this.markTruncated(items);
        return items;
      }
      this.broken = true;
      return items;
    }
  }


  /** Lee un objeto. */
  private readObject(): Record<string, unknown> | Pending {
    this.index += 1; // "{"
    const out: Record<string, unknown> = {};
    this.skip();
    if (this.peek() === "}") {
      this.index += 1;
      return out;
    }
    for (;;) {
      this.skip();
      const char = this.peek();
      if (char === undefined) {
        if (!Object.keys(out).length) {
          this.truncated = true;
          return { $pending: true };
        }
        this.markTruncated(out);
        return out;
      }
      if (char !== '"') {
        this.broken = true;
        if (!Object.keys(out).length) return { $pending: true };
        this.markTruncated(out);
        return out;
      }
      const key = this.readString();
      if (isPending(key)) {
        if (!Object.keys(out).length) {
          this.truncated = true;
          return { $pending: true };
        }
        this.markTruncated(out);
        return out;
      }
      this.skip();
      if (this.peek() !== ":") {
        this.broken = this.peek() !== undefined;
        if (!Object.keys(out).length) {
          this.truncated = true;
          return { $pending: true };
        }
        this.markTruncated(out);
        return out;
      }
      this.index += 1; // ":"
      this.skip();
      const value = this.readValue();
      if (isPending(value)) {
        // Clave conocida con valor a medias: el objeto está incompleto, pero se
        // puede seguir pintando con lo que ya había.
        if (!Object.keys(out).length) {
          this.truncated = true;
          return { $pending: true };
        }
        this.markTruncated(out);
        return out;
      }
      out[key] = value;
      this.skip();
      const separator = this.peek();
      if (separator === ",") {
        this.index += 1;
        continue;
      }
      if (separator === "}") {
        this.index += 1;
        return out;
      }
      if (separator === undefined) {
        this.markTruncated(out);
        return out;
      }
      this.broken = true;
      return out;
    }
  }

  /** Lee cualquier valor. */
  readValue(): unknown {
    this.skip();
    const char = this.peek();
    if (char === undefined) {
      this.truncated = true;
      return { $pending: true };
    }
    if (char === "{") return this.readObject();
    if (char === "[") return this.readArray();
    if (char === '"') {
      const value = this.readString();
      // Una cadena sin cerrar puede seguir creciendo: es un valor pendiente.
      return isPending(value) ? { $pending: true } : value;
    }
    if (char === "t" || char === "f" || char === "n") {
      const literal = char === "t" ? this.tryLiteral("true") : char === "f" ? this.tryLiteral("false") : this.tryLiteral("null");
      return literal === undefined ? ({ $pending: true } as Pending) : literal;
    }
    if (char === "-" || /[0-9]/.test(char)) return this.readNumber();
    this.broken = true;
    this.index = this.text.length;
    return { $pending: true };
  }

  /** Parsea el documento completo (o hasta donde llegue). */
  parse(): { value: unknown; truncated: boolean; broken: boolean } {
    this.skip();
    if (this.peek() === undefined) {
      return { value: undefined, truncated: true, broken: false };
    }
    const value = this.readValue();
    // El documento está completo solo si el valor se cerró y no queda nada por
    // consumir (aparte de espacio en blanco). Es la única fuente de verdad del
    // truncado: marcar y desmarcar por el camino daba falsos positivos.
    this.skip();
    const truncated = this.truncated || this.index < this.text.length;
    return { value, truncated, broken: this.broken };
  }
}

/** Traduce una secuencia de escape a su carácter. */
function unescapeChar(char: string): string {
  switch (char) {
    case "n":
      return "\n";
    case "t":
      return "\t";
    case "r":
      return "\r";
    case "b":
      return "\b";
    case "f":
      return "\f";
    default:
      return char;
  }
}

/**
 * Parsea un esquema que puede estar incompleto.
 *
 * Nunca lanza: si el texto no es recuperable devuelve `broken: true` y un árbol
 * vacío, para que el motor pueda avisar (`JR080`) sin romper la pantalla.
 *
 * @example
 * parsePartialSchema('{"version":1,"content":[]}').status; // "complete"
 */
export function parsePartialSchema(text: string): PartialParseResult {
  const parser = new TolerantParser(text);
  const { value, truncated, broken } = parser.parse();

  if (value === undefined) {
    return { tree: null, status: "pending", offset: parser.offset, broken, pendingNodes: 0 };
  }

  const counter = { pending: 0 };
  const finalized = finalize(value, counter);

  if (finalized === undefined || finalized === null) {
    return { tree: null, status: "pending", offset: parser.offset, broken, pendingNodes: counter.pending };
  }

  const tree = finalized as ScreenSchema;
  return {
    tree,
    status: truncated || counter.pending > 0 ? "pending" : "complete",
    offset: parser.offset,
    broken,
    pendingNodes: counter.pending,
  };
}

/**
 * Estado del stream de un esquema, listo para pintar.
 *
 * @example
 * const state = useSchemaStream(tokens);
 * state.tree; // ScreenSchema | null
 */
export interface StreamState {
  /** Árbol pintable (parcial mientras llega). */
  tree: ScreenSchema | null;
  /** `pending` mientras el emisor sigue escribiendo. */
  status: NodeStatus;
  /** `true` cuando el texto no es recuperable. */
  broken: boolean;
  /** Nodos que aún no están cerrados. */
  pendingNodes: number;
  /** `true` cuando el emisor está activo. */
  streaming: boolean;
  /** Texto acumulado hasta ahora. */
  text: string;
  /** Avisos del stream (`JR080`: falló, o terminó sin cerrar el JSON). */
  issues: JsonEngineIssue[];
}

/** `true` cuando un nodo está pendiente según el parser. */
export function isNodePending(node: NodeSchema | undefined): boolean {
  return node?.$status === "pending";
}
