/**
 * Rutas dentro de un esquema.
 *
 * Un aviso del motor tiene que poder señalar **exactamente** dónde está el
 * problema: `content[2].children[0].props.onClick`. Estas utilidades construyen,
 * leen y renderizan esas rutas sin depender de nada externo.
 */

/** Un segmento de ruta: clave de objeto o índice de array. */
export type PathSegment = string | number;

/** Ruta de un nodo o valor dentro del esquema. */
export type SchemaPath = readonly PathSegment[];

/** Añade un segmento a una ruta sin mutarla. */
export function pushPath(path: SchemaPath, segment: PathSegment): SchemaPath {
  return [...path, segment];
}

/** Renderiza una ruta en la forma legible `content[0].children[2].props`. */
export function formatPath(path: SchemaPath): string {
  let out = "";
  for (const segment of path) {
    if (typeof segment === "number") out += `[${segment}]`;
    else out += out ? `.${segment}` : segment;
  }
  return out;
}

/** Parsea una ruta renderizada (`content[0].children`) de vuelta a segmentos. */
export function parsePath(rendered: string): PathSegment[] {
  if (!rendered) return [];
  return rendered
    .split(/\.(?![^[]*])/)
    .flatMap((part) => {
      const match = part.match(/^([^[\]]*)((?:\[\d+\])*)$/);
      if (!match) return [part];
      const [, key, indexes] = match;
      const segments: PathSegment[] = key ? [key] : [];
      for (const index of indexes.match(/\d+/g) ?? []) segments.push(Number(index));
      return segments;
    });
}

/** Lee un valor del esquema siguiendo una ruta. Devuelve `undefined` si no existe. */
export function readPath(source: unknown, path: SchemaPath): unknown {
  let cursor: unknown = source;
  for (const segment of path) {
    if (cursor === null || typeof cursor !== "object") return undefined;
    cursor = (cursor as Record<PathSegment, unknown>)[segment];
  }
  return cursor;
}

/** `true` cuando la ruta apunta a un valor que existe (aunque sea `null`). */
export function hasPath(source: unknown, path: SchemaPath): boolean {
  if (path.length === 0) return true;
  const parent = readPath(source, path.slice(0, -1));
  if (parent === null || typeof parent !== "object") return false;
  return Object.prototype.hasOwnProperty.call(parent, path[path.length - 1]);
}

/** Añade el sufijo de una prop a la ruta de un nodo. */
export function propPath(nodePath: SchemaPath, prop: string): SchemaPath {
  return pushPath(pushPath(nodePath, "props"), prop);
}
