/**
 * Núcleo del `ITJSONEditor`: tokenizador y ayudantes de JSON.
 *
 * Todo aquí es puro (sin React) para que sea testeable y barato de memoizar.
 * El tokenizador no usa `JSON.parse`: recorre el texto con una regex anclada
 * (`y`) para poder colorear **también** mientras el JSON está a medias.
 */

/** Categoría léxica de un fragmento de código, usada para colorearlo. */
export type ITCodeTokenType =
  | "punctuation"
  | "key"
  | "string"
  | "number"
  | "keyword"
  | "whitespace"
  | "plain";

/** Fragmento de código con su categoría léxica. */
export interface ITCodeToken {
  /** Texto literal del fragmento (nunca contiene saltos de línea). */
  text: string;
  /** Categoría léxica para el coloreado. */
  type: ITCodeTokenType;
}

/** Una línea física del documento, ya troceada para pintar. */
export interface ITCodeLine {
  /** Número de línea, empezando en 1. */
  number: number;
  /** Texto completo de la línea, sin el salto final. */
  text: string;
  /** Fragmentos a pintar, en orden. */
  tokens: ITCodeToken[];
  /** Profundidad de anidación al empezar la línea. */
  depth: number;
  /** `true` cuando la línea arranca con `}` o `]`. */
  closesBlock: boolean;
}

/** Nodo localizado dentro del documento (para el árbol y el salto a línea). */
export interface ITCodeNodeEntry {
  /** Ruta desde la raíz, con la clave de cada nivel y el índice de cada array. */
  path: (string | number)[];
  /** Número de línea (1-based) donde vive la clave o el valor. */
  line: number;
  /** Tipo del valor apuntado. */
  kind: "object" | "array" | "string" | "number" | "boolean" | "null";
}

/** Resultado del análisis léxico de un documento. */
export interface ITCodeAnalysis {
  /** Líneas del documento, ya listas para pintar. */
  lines: ITCodeLine[];
  /** Nodos localizados por ruta (`"a.0.b"`), para el árbol y el salto a línea. */
  nodeLines: Map<string, ITCodeNodeEntry>;
  /** Número total de líneas. */
  lineCount: number;
  /** Offset de inicio de cada línea (`lineStarts[i]` → línea `i + 1`). */
  lineStarts: number[];
}

/** Documento vacío (una línea en blanco), usado como valor por defecto. */
export const EMPTY_ANALYSIS: ITCodeAnalysis = {
  lines: [{ number: 1, text: "", tokens: [], depth: 0, closesBlock: false }],
  nodeLines: new Map(),
  lineCount: 1,
  lineStarts: [0],
};

/* ------------------------------------------------------------------ regexes */

/**
 * Tokenizador JSON anclado. Se compila **una vez** y se reutiliza moviendo
 * `lastIndex`, que es la forma segura de usar `y` sin recompilar por token.
 *
 * El orden de alternativas es la prioridad: una cadena no puede partirse por la
 * mitad y `true|false|null` no puede capturarse como número.
 *
 * El grupo `whitespace` no es cosmético: con una regex anclada, un carácter que
 * no case con ninguna alternativa **corta el bucle** (`exec` devuelve `null`).
 * Al cubrir también el espacio y el salto de línea, el recorrido es continuo.
 * Ojo con `[^"\\\n]`: una cadena JSON nunca contiene un salto real, y si no se
 * excluye, una comilla sin cerrar se traga el resto del documento.
 */
const JSON_TOKEN_RE =
  /(?<string>"(?:\\[\s\S]|[^"\\\n])*")|(?<number>-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|(?<keyword>true|false|null)|(?<punctuation>[{}[\],:])|(?<whitespace>[ \t\r\n]+)/y;

/**
 * Paracaídas de un carácter. Con una regex anclada, un carácter que no case con
 * **ninguna** alternativa devuelve `null` y corta el bucle: sin esto, una comilla
 * sin cerrar dejaría el resto del documento sin colorear. Aquí ese carácter se
 * emite como `plain` y el recorrido continúa.
 */
const JSON_CHAR_RE = /[\s\S]/y;

const OPENERS = "{[";
const CLOSERS = "}]";

/* -------------------------------------------------------------- line helpers */

/** Busca la línea (1-based) y la columna (1-based) de un offset del documento. */
export function offsetToPosition(
  text: string,
  offset: number,
  lineStarts: number[]
): { line: number; column: number } {
  const safe = Math.max(0, Math.min(offset, text.length));
  let low = 0;
  let high = Math.max(0, lineStarts.length - 1);
  while (low < high) {
    const mid = (low + high + 1) >> 1;
    if (lineStarts[mid] <= safe) low = mid;
    else high = mid - 1;
  }
  return { line: low + 1, column: safe - lineStarts[low] + 1 };
}

/** Calcula los offsets donde empieza cada línea del documento. */
export function computeLineStarts(lines: string[]): number[] {
  const starts: number[] = [];
  let offset = 0;
  for (const line of lines) {
    starts.push(offset);
    offset += line.length + 1; // + "\n"
  }
  return starts.length ? starts : [0];
}

/* ------------------------------------------------------------- tokenizador */

/** Acumula texto + tipo, fusionando con el fragmento anterior si coincide. */
function pushToken(chunks: ITCodeToken[], text: string, type: ITCodeTokenType) {
  if (!text) return;
  const last = chunks[chunks.length - 1];
  if (last && last.type === type) last.text += text;
  else chunks.push({ text, type });
}

/**
 * Marca como `key` las cadenas que preceden a un `:`.
 *
 * En el recorrido lineal una clave y un valor de cadena son idénticos hasta que
 * aparece el `:` (que puede caer en la línea siguiente), así que se resuelve en
 * esta pasada sobre las líneas ya construidas.
 */
function classifyKeys(lines: ITCodeLine[]): void {
  for (let i = 0; i < lines.length; i++) {
    const tokens = lines[i].tokens;
    for (let j = 0; j < tokens.length; j++) {
      if (tokens[j].type !== "string") continue;
      let found = false;
      // Se ignora el espacio en blanco, incluso entre líneas: `"a"  :` y una
      // clave con el `:` en la línea siguiente también son claves.
      scan: for (let lineCursor = i; lineCursor < lines.length; lineCursor++) {
        const active = lines[lineCursor].tokens;
        for (let m = lineCursor === i ? j + 1 : 0; m < active.length; m++) {
          const token = active[m];
          if (token.type === "whitespace") continue;
          found = token.type === "punctuation" && token.text.startsWith(":");
          break scan;
        }
      }
      if (found) tokens[j] = { text: tokens[j].text, type: "key" };
    }
  }
}

/**
 * Analiza un documento JSON (válido o a medias) y devuelve sus líneas
 * coloreables, la profundidad de cada una y la línea de cada nodo por ruta.
 *
 * @example
 * const { lines } = analyzeCode('{\n  "a": 1\n}');
 * lines[1].tokens; // [{ text: '  ', type: "plain" }, { text: '"a"', type: "key" }, …]
 */
export function analyzeCode(text: string): ITCodeAnalysis {
  const rawLines = text.split("\n");
  const lineStarts = computeLineStarts(rawLines);
  const lines: ITCodeLine[] = [];
  const nodeLines = new Map<string, ITCodeNodeEntry>();

  /** Línea que se está construyendo ahora mismo. */
  let lineIndex = 0;
  let currentChunks: ITCodeToken[] = [];

  /**
   * Pila de contenedores abiertos. `key` es la clave del objeto al que pertenece
   * el contenedor (o `undefined` si cuelga de un array o es la raíz), y
   * `index` el último índice visto dentro de un array.
   */
  const stack: { kind: "object" | "array"; key?: string; index: number }[] = [];
  /** Clave leída cuyo `:` todavía no ha llegado (aún no se sabe si es clave). */
  let pendingColon: string | null = null;
  /** `true` justo después de un `:`: el próximo valor es el de esa clave. */
  let awaitingValue = false;

  const flushLine = () => {
    lines.push({
      number: lineIndex + 1,
      text: rawLines[lineIndex] ?? "",
      tokens: currentChunks,
      depth: 0, // se calcula al final, en una segunda pasada
      closesBlock: false,
    });
  };

  /** Avanza a la línea siguiente, cerrando la actual. */
  const breakLine = () => {
    flushLine();
    lineIndex += 1;
    currentChunks = [];
  };

  /**
   * Ruta del contenedor abierto más su clave o índice vigente: la que están
   * esperando el próximo valor o el próximo bloque.
   */
  const buildPath = (): (string | number)[] => {
    const result: (string | number)[] = [];
    for (const frame of stack) {
      if (frame.kind === "array") result.push(frame.index);
      else if (frame.key !== undefined) result.push(frame.key);
    }
    return result;
  };

  const recordNode = (path: (string | number)[], kind: ITCodeNodeEntry["kind"]) => {
    if (!path.length) return;
    nodeLines.set(pathKey(path), { path: [...path], line: lineIndex + 1, kind });
  };

  JSON_TOKEN_RE.lastIndex = 0;
  JSON_CHAR_RE.lastIndex = 0;
  let consumed = 0;
  let match: RegExpExecArray | null;

  for (;;) {
    JSON_TOKEN_RE.lastIndex = consumed;
    match = JSON_TOKEN_RE.exec(text);
    if (!match) {
      if (consumed >= text.length) break;
      // Carácter sin alternativa (por ejemplo una comilla sin cerrar): se pinta
      // como texto plano y se sigue, en lugar de abortar el análisis.
      JSON_CHAR_RE.lastIndex = consumed;
      const fallback = JSON_CHAR_RE.exec(text);
      if (!fallback) break;
      const char = fallback[0];
      if (char === "\n") breakLine();
      else pushToken(currentChunks, char, "plain");
      consumed += 1;
      continue;
    }
    // Hueco entre el token anterior y este: comillas sin cerrar, comentarios o
    // basura. Se pinta tal cual; sin esto el coloreado dejaría agujeros.
    if (match.index > consumed) {
      const gapLines = text.slice(consumed, match.index).split("\n");
      gapLines.forEach((piece, i) => {
        if (i > 0) breakLine();
        pushToken(currentChunks, piece, "plain");
      });
    }

    const [full] = match;
    const groups = match.groups ?? {};
    let type: ITCodeTokenType = "punctuation";
    if (groups.string !== undefined) type = "string";
    else if (groups.number !== undefined) type = "number";
    else if (groups.keyword !== undefined) type = "keyword";
    else if (groups.whitespace !== undefined) type = "whitespace";

    if (type === "punctuation" && OPENERS.includes(full)) {
      // La ruta esperada (clave del objeto o índice del array, que ya está
      // posicionado por la apertura o la última coma) es la del bloque.
      const path = buildPath();
      pendingColon = null;
      awaitingValue = false;
      const isArray = full === "[";
      stack.push({
        kind: isArray ? "array" : "object",
        key: isArray ? undefined : (path[path.length - 1] as string),
        index: 0,
      });
      recordNode(path, isArray ? "array" : "object");
    } else if (type === "punctuation" && CLOSERS.includes(full)) {
      stack.pop();
      pendingColon = null;
      awaitingValue = false;
    } else if (type === "punctuation" && full === ",") {
      const parent = stack[stack.length - 1];
      if (parent?.kind === "array") parent.index += 1;
      awaitingValue = false;
    } else if (type === "punctuation" && full === ":") {
      if (pendingColon !== null) {
        const open = stack[stack.length - 1];
        if (open?.kind === "object") open.key = pendingColon;
        awaitingValue = true;
        pendingColon = null;
      }
    } else if (type === "string") {
      const decoded = safeDecodeString(full);
      const parent = stack[stack.length - 1];
      if (parent?.kind === "object" && !awaitingValue) {
        // Todavía no se sabe si es clave: lo confirma el `:`.
        pendingColon = decoded;
      } else {
        // Es el valor de la clave anterior (o un elemento de array, o la raíz).
        if (parent?.kind === "object" && awaitingValue) parent.key = pendingColon ?? parent.key;
        awaitingValue = false;
        recordNode(buildPath(), "string");
      }
    } else if (type === "number" || type === "keyword") {
      const parent = stack[stack.length - 1];
      if (parent?.kind === "object" && awaitingValue) parent.key = pendingColon ?? parent.key;
      awaitingValue = false;
      recordNode(buildPath(), type === "number" ? "number" : full === "null" ? "null" : "boolean");
    }

    // Reparte el token por las líneas del documento.
    const segments = full.split("\n");
    segments.forEach((segment, i) => {
      if (i > 0) breakLine();
      pushToken(currentChunks, segment, type);
    });

    consumed = match.index + full.length;
    JSON_TOKEN_RE.lastIndex = consumed;
  }

  // Resto no reconocido al final del documento.
  if (consumed < text.length) {
    text
      .slice(consumed)
      .split("\n")
      .forEach((piece, i) => {
        if (i > 0) breakLine();
        pushToken(currentChunks, piece, "plain");
      });
  }

  flushLine();

  // Pasada final: claves (`"a":`) y, por línea, profundidad y "cierra bloque".
  // Ambas cosas se derivan de la estructura, no de cómo se troceó el texto.
  classifyKeys(lines);

  let depthCursor = 0;
  for (const line of lines) {
    const trimmed = line.text.trimStart();
    line.closesBlock = trimmed.startsWith("}") || trimmed.startsWith("]");
    line.depth = line.closesBlock ? Math.max(0, depthCursor - 1) : depthCursor;
    for (const char of line.text) {
      if (char === "{" || char === "[") depthCursor += 1;
      else if (char === "}" || char === "]") depthCursor = Math.max(0, depthCursor - 1);
    }
  }

  return { lines, nodeLines, lineCount: lines.length, lineStarts };
}

/** Serializa una ruta a clave estable (`a.0.b`). */
export function pathKey(path: (string | number)[]): string {
  return path.map((part) => String(part)).join(".");
}

/** Decodifica una cadena JSON; si está a medias, devuelve el texto sin comillas. */
export function safeDecodeString(raw: string): string {
  if (raw.length >= 2 && raw.startsWith('"') && raw.endsWith('"')) {
    try {
      return JSON.parse(raw) as string;
    } catch {
      return raw.slice(1, -1);
    }
  }
  return raw.replace(/^"|"$/g, "");
}

/* ------------------------------------------------------------------ plegado */

/** Región plegable detectada en el documento. */
export interface ITFoldRegion {
  /** Línea (1-based) donde abre el bloque. */
  startLine: number;
  /** Línea (1-based) donde cierra el bloque. */
  endLine: number;
  /** Profundidad del bloque (0 = raíz), usada para el tamaño del control. */
  depth: number;
}

/**
 * Detecta los bloques `{…}` / `[…]` que ocupan más de una línea, es decir, los
 * candidatos a plegar desde el gutter. Ignora los que están dentro de cadenas.
 */
export function findFoldRegions(text: string): ITFoldRegion[] {
  const regions: ITFoldRegion[] = [];
  const stack: { line: number; depth: number }[] = [];
  const lineStarts = computeLineStarts(text.split("\n"));

  let inString = false;
  let escaped = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
      continue;
    }
    if (char === '"') {
      inString = true;
      continue;
    }
    if (OPENERS.includes(char)) {
      stack.push({ line: offsetToPosition(text, i, lineStarts).line, depth: stack.length });
    } else if (CLOSERS.includes(char)) {
      const open = stack.pop();
      const closeLine = offsetToPosition(text, i, lineStarts).line;
      if (open && closeLine > open.line) {
        regions.push({ startLine: open.line, endLine: closeLine, depth: open.depth });
      }
    }
  }

  return regions;
}

/* ---------------------------------------------------------------- errores */

/** Error de parseo con la posición exacta dentro del documento. */
export interface ITJsonParseError {
  /** Mensaje del motor, limpio de la coletilla «at position N». */
  message: string;
  /** Línea (1-based) del fallo. */
  line: number;
  /** Columna (1-based) del fallo. */
  column: number;
  /** Offset absoluto del fallo. */
  offset: number;
}

/**
 * Recorredor JSON que **siempre** sabe en qué offset se rompió el documento.
 *
 * Hace falta porque el mensaje de `JSON.parse` depende del motor: V8 a veces
 * informa de la posición y a veces no (en Node 20, `{"a":1,` produce
 * «Unexpected token... is not valid JSON», sin offset). Sin esto, el editor no
 * podría señalar la línea y la columna del error.
 */
class JsonScanner {
  private index = 0;

  constructor(
    private readonly text: string,
    private readonly lineStarts: number[]
  ) {}

  /** Valida el documento completo. `null` cuando es correcto. */
  validate(): ITJsonParseError | null {
    const text = this.text;
    if (!text.trim()) return null;

    this.skipWhitespace();
    const failure = this.readValue("");
    if (failure) return failure;

    this.skipWhitespace();
    if (this.index < text.length) return this.fail("There is trailing content after the JSON value");
    return null;
  }

  /** Avanza mientras haya espacio en blanco JSON. */
  private skipWhitespace() {
    while (this.index < this.text.length && " \t\n\r".includes(this.text[this.index])) this.index += 1;
  }

  /** Construye el error apuntando al offset actual. */
  private fail(message: string, offset = this.index): ITJsonParseError {
    const position = offsetToPosition(this.text, offset, this.lineStarts);
    return {
      message,
      line: position.line,
      column: position.column,
      offset: Math.max(0, Math.min(offset, this.text.length)),
    };
  }

  /** Consume un trozo literal; si no coincide, explica qué se esperaba. */
  private expect(literal: string, context: string): ITJsonParseError | null {
    if (this.text.startsWith(literal, this.index)) {
      this.index += literal.length;
      return null;
    }
    return this.fail(`Expected ${JSON.stringify(literal)}${context}`);
  }

  /** Lee cualquier valor JSON: objeto, array, cadena, número, booleano o null. */
  private readValue(context: string): ITJsonParseError | null {
    this.skipWhitespace();
    const char = this.text[this.index];

    if (char === undefined) return this.fail(`Unexpected end of input${context}`);
    if (char === "{") return this.readObject();
    if (char === "[") return this.readArray();
    if (char === '"') return this.readString();
    if (char === "t") return this.expect("true", context);
    if (char === "f") return this.expect("false", context);
    if (char === "n") return this.expect("null", context);
    if (char === "-" || (char >= "0" && char <= "9")) return this.readNumber();
    return this.fail(`Unexpected character ${JSON.stringify(char)}${context}`);
  }

  /** Objeto: `{ "clave": valor, … }`. */
  private readObject(): ITJsonParseError | null {
    this.index += 1; // "{"
    this.skipWhitespace();
    if (this.text[this.index] === "}") {
      this.index += 1;
      return null;
    }
    for (;;) {
      this.skipWhitespace();
      if (this.text[this.index] !== '"') {
        return this.fail('Expected a double-quoted property name (keys must be strings in JSON)');
      }
      const stringFailure = this.readString();
      if (stringFailure) return stringFailure;

      this.skipWhitespace();
      const colonFailure = this.expect(":", " after the property name");
      if (colonFailure) return colonFailure;

      const valueFailure = this.readValue(" as the property value");
      if (valueFailure) return valueFailure;

      this.skipWhitespace();
      const separator = this.text[this.index];
      if (separator === ",") {
        this.index += 1;
        continue;
      }
      if (separator === "}") {
        this.index += 1;
        return null;
      }
      if (separator === undefined) return this.fail("Unexpected end of input inside the object (missing })");
      return this.fail('Expected "," or "}" after the property value');
    }
  }

  /** Array: `[valor, …]`. */
  private readArray(): ITJsonParseError | null {
    this.index += 1; // "["
    this.skipWhitespace();
    if (this.text[this.index] === "]") {
      this.index += 1;
      return null;
    }
    for (;;) {
      const valueFailure = this.readValue(" as an array element");
      if (valueFailure) return valueFailure;

      this.skipWhitespace();
      const separator = this.text[this.index];
      if (separator === ",") {
        this.index += 1;
        continue;
      }
      if (separator === "]") {
        this.index += 1;
        return null;
      }
      if (separator === undefined) return this.fail("Unexpected end of input inside the array (missing ])");
      return this.fail('Expected "," or "]" after the array element');
    }
  }

  /** Cadena entre comillas dobles, sin saltos de línea reales. */
  private readString(): ITJsonParseError | null {
    const start = this.index;
    this.index += 1; // comilla de apertura
    while (this.index < this.text.length) {
      const char = this.text[this.index];
      if (char === "\\") {
        this.index += 2; // escape: se salta el carácter siguiente
        continue;
      }
      if (char === '"') {
        this.index += 1;
        return null;
      }
      if (char === "\n") return this.fail("Unterminated string: JSON strings cannot span lines", start);
      this.index += 1;
    }
    return this.fail("Unterminated string (missing closing quote)", start);
  }

  /** Número JSON: `-?d+(.d+)?([eE][+-]?d+)?`. */
  private readNumber(): ITJsonParseError | null {
    const start = this.index;
    const match = /-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/y;
    match.lastIndex = this.index;
    const found = match.exec(this.text);
    if (!found || found.index !== this.index || found[0].length === 0) {
      return this.fail("Invalid number");
    }
    this.index = start + found[0].length;
    return null;
  }
}

/**
 * Traduce el error de `JSON.parse` a línea/columna.
 *
 * Se usa el validador propio, que siempre conoce el offset exacto: el mensaje
 * del motor solo entra como respaldo cuando el validador no encuentra el fallo.
 * Los mensajes de V8 («Unexpected token ',', ...fragmento... is not valid
 * JSON») arrastran un trozo del documento y son peores para mostrar en la barra.
 */
export function parseJsonError(
  error: unknown,
  text: string,
  lineStarts: number[]
): ITJsonParseError {
  const scanner = new JsonScanner(text, lineStarts).validate();
  if (scanner) return scanner;

  const raw = error instanceof Error ? error.message : String(error);
  const positionMatch = raw.match(/at position (\d+)/);
  const lineColumnMatch = raw.match(/\(line (\d+) column (\d+)\)/);
  const offset = Math.min(
    text.length,
    positionMatch ? Number(positionMatch[1]) : text.trimEnd().length
  );
  const computed = offsetToPosition(text, offset, lineStarts);
  const message = raw
    .replace(/\s*in JSON at position \d+/, "")
    .replace(/\s*\(line \d+ column \d+\)/, "")
    .replace(/^Unexpected token.*?is not valid JSON/, "Invalid JSON syntax")
    .trim();

  return {
    message: message || raw,
    line: lineColumnMatch ? Number(lineColumnMatch[1]) : computed.line,
    column: lineColumnMatch ? Number(lineColumnMatch[2]) : computed.column,
    offset,
  };
}

/* --------------------------------------------------------- transformaciones */

/** Transformaciones aplicables al documento desde la barra de acciones. */
export type ITJsonTransform = "format" | "minify" | "sortAsc" | "sortDesc" | "escape" | "unescape";

/** Recorre un valor y reordena alfabéticamente las claves de todos los objetos. */
function sortKeysDeep(value: unknown, direction: "asc" | "desc"): unknown {
  if (Array.isArray(value)) return value.map((item) => sortKeysDeep(item, direction));
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    entries.sort(([a], [b]) => (direction === "asc" ? a.localeCompare(b) : b.localeCompare(a)));
    const result: Record<string, unknown> = {};
    for (const [key, nested] of entries) result[key] = sortKeysDeep(nested, direction);
    return result;
  }
  return value;
}

/**
 * Aplica una transformación sobre un valor ya parseado y devuelve el texto.
 *
 * @throws Si la transformación no aplica al valor (por ejemplo, `unescape`
 * sobre un valor que no es una cadena).
 */
export function transformValue(value: unknown, transform: ITJsonTransform, indent: number): string {
  switch (transform) {
    case "format":
      return JSON.stringify(value, null, indent);
    case "minify":
      return JSON.stringify(value);
    case "sortAsc":
      return JSON.stringify(sortKeysDeep(value, "asc"), null, indent);
    case "sortDesc":
      return JSON.stringify(sortKeysDeep(value, "desc"), null, indent);
    case "escape":
      return JSON.stringify(JSON.stringify(value, null, indent));
    case "unescape": {
      if (typeof value !== "string") {
        throw new Error("unescape expects a string value");
      }
      // La cadena contiene JSON serializado; se reindenta al gusto actual.
      const inner: unknown = JSON.parse(value);
      return typeof inner === "string" ? JSON.stringify(inner) : JSON.stringify(inner, null, indent);
    }
    default:
      return JSON.stringify(value, null, indent);
  }
}

/** Clasifica un valor para el árbol y las insignias. */
export function valueKind(value: unknown): ITCodeNodeEntry["kind"] {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  const type = typeof value;
  if (type === "object") return "object";
  if (type === "number") return "number";
  if (type === "boolean") return "boolean";
  return "string";
}

/** Resumen corto de un valor primitivo, para pintarlo en el árbol. */
export function previewValue(value: unknown): string {
  const kind = valueKind(value);
  if (kind === "string") return JSON.stringify(value);
  if (kind === "null") return "null";
  if (kind === "number" || kind === "boolean") return String(value);
  return "";
}
