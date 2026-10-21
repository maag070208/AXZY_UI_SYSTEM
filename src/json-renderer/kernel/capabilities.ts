/**
 * Capacidades: lo que el host concede y lo que un nodo o una pantalla exige (`requires`).
 *
 * Denegado por defecto: si un nodo exige una capacidad y el host no la concede (o no
 * pasa ninguna), el nodo no se pinta. Si tiene `fallback`, se pinta el fallback.
 * El esquema nunca decide permisos: solo los nombra.
 */

/**
 * Normaliza `requires` (texto o lista de textos) a una lista de capacidades.
 * Sin `requires`, la lista es vacía. Un valor que no se entiende devuelve `null`: el
 * motor lo trata como denegado (falla cerrado), nunca como «no hay requisito».
 */
export function capacidadesRequeridas(requires: unknown): string[] | null {
  if (requires === undefined || requires === null) return [];
  if (typeof requires === "string") return requires === "" ? null : [requires];
  if (Array.isArray(requires) && requires.every((item) => typeof item === "string" && item !== "")) {
    return requires as string[];
  }
  return null;
}

/** Capacidades que exige `requires` y que el host no concede. Lista vacía = todo concedido. */
export function faltanCapacidades(requires: unknown, concedidas: readonly string[] | undefined): string[] {
  const requeridas = capacidadesRequeridas(requires);
  if (requeridas === null) return ["(requires no válido)"];
  if (requeridas.length === 0) return [];
  const conjunto = new Set(concedidas ?? []);
  return requeridas.filter((capacidad) => !conjunto.has(capacidad));
}
