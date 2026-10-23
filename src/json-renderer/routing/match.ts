/**
 * Casa una dirección (path + query) con una ruta declarada.
 *
 * Reglas, de más a menos específica:
 * 1. Más segmentos estáticos gana a un `:param` en la misma posición
 *    (`/usuarios/nuevo` antes que `/usuarios/:id`).
 * 2. Con el mismo path, gana la ruta que exige más claves de query
 *    (`?estado=Activo` antes que la ruta sin query).
 * 3. Empate: la primera declarada.
 *
 * Nunca lanza: una dirección que no casa devuelve `null`.
 */

import type { FlatRoute } from "./routes";

/** Resultado de casar una dirección. */
export interface RouteMatch {
  /** Ruta que casa. */
  route: FlatRoute;
  /** Valores de los `:param` de la ruta, por nombre (sin los dos puntos). */
  params: Record<string, string>;
}

/**
 * Busca la ruta que corresponde a una dirección.
 *
 * @example
 * matchRoute(flattenRoutes(routes), ["usuarios"], { estado: "Activo" })?.route.id; // "u-activos"
 */
export function matchRoute(
  routes: FlatRoute[],
  segments: string[],
  query: Record<string, string> = {}
): RouteMatch | null {
  let best: RouteMatch | null = null;
  let bestStatics = -1;
  let bestConstraints = -1;

  for (const route of routes) {
    if (route.segments.length !== segments.length) continue;

    const params: Record<string, string> = {};
    let statics = 0;
    let samePath = true;
    route.segments.forEach((expected, index) => {
      if (!samePath) return;
      if (expected.startsWith(":")) {
        params[expected.slice(1)] = segments[index];
        return;
      }
      statics += 1;
      samePath = expected === segments[index];
    });
    if (!samePath) continue;

    const constraints = Object.entries(route.query);
    if (!constraints.every(([key, value]) => query[key] === value)) continue;

    // Un empate en estáticos y query conserva la ruta declarada antes (no se reemplaza).
    if (statics > bestStatics || (statics === bestStatics && constraints.length > bestConstraints)) {
      best = { route, params };
      bestStatics = statics;
      bestConstraints = constraints.length;
    }
  }

  return best;
}

/**
 * Dirección (`/usuarios/42?estado=Activo`) de una ruta, con sus `:param` rellenos.
 * Los `:param` sin valor se dejan tal cual para que se vean en el menú.
 */
export function routeHref(route: FlatRoute, params: Record<string, string> = {}): string {
  const path = route.segments
    .map((segment) => (segment.startsWith(":") ? (params[segment.slice(1)] ?? segment) : segment))
    .join("/");
  const queryString = Object.entries(route.query)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
  return `/${path}${queryString ? `?${queryString}` : ""}`;
}
