/**
 * Árbol de navegación derivado de `routes.json`.
 *
 * Solo entran las rutas con `nav`. Un grupo con `nav` se convierte en una entrada con
 * hijos y, como enlace, apunta a su primera hija con dirección. Un grupo sin `nav` no
 * aparece: sus hijos suben de nivel. El host decide cómo pintar el árbol (sidebar, top
 * bar…); el motor solo entrega la forma y las direcciones.
 */

import type { SchemaValue } from "../kernel/types";
import { routeHref } from "./match";
import { flattenRoutes, joinRoutePath, type RouteNavSchema, type RouteSchema } from "./routes";

/** Entrada del árbol de navegación. */
export interface NavNode {
  /** Id de la ruta (o del grupo) de origen. */
  id: string;
  /** Texto de la entrada; puede ser una referencia `{ i18n }` que resuelve el host. */
  label: SchemaValue;
  /** Icono, tal como lo declara el JSON. */
  icon?: string;
  /** Contador de la entrada. */
  badge?: number | string;
  /** Dirección a la que lleva la entrada. Los grupos apuntan a su primera hija con dirección. */
  href?: string;
  /** Entradas hijas. Presentes solo en los grupos. */
  children?: NavNode[];
}

/**
 * Construye el árbol de navegación a partir de las rutas declaradas.
 *
 * @example
 * buildNavigationTree(routes.routes)[0]; // { id: "inicio", label: {...}, href: "/inicio" }
 */
export function buildNavigationTree(routes: RouteSchema[]): NavNode[] {
  // Las direcciones de las hojas se calculan una vez; un grupo usa las de sus hijas.
  const hrefs = new Map(flattenRoutes(routes).map((route) => [route.id, routeHref(route)]));

  const visit = (route: RouteSchema, parentPath: string): NavNode[] => {
    const full = joinRoutePath(parentPath, route.path);

    if (route.children) {
      const children = route.children.flatMap((child) => visit(child, full));
      if (!route.nav) return children;
      return [toNode(route.id, route.nav, children, children.find((child) => child.href)?.href)];
    }

    if (!route.nav) return [];
    return [toNode(route.id, route.nav, undefined, hrefs.get(route.id))];
  };

  return routes.flatMap((route) => visit(route, ""));
}

/** Crea una entrada a partir de su `nav` declarado. */
function toNode(id: string, nav: RouteNavSchema, children: NavNode[] | undefined, href: string | undefined): NavNode {
  return {
    id,
    label: nav.label,
    icon: nav.icon,
    badge: nav.badge,
    href,
    ...(children ? { children } : {}),
  };
}

/** `true` cuando la entrada, o alguno de sus hijos, es la ruta indicada. */
export function navContainsRoute(entry: NavNode, routeId: string): boolean {
  return entry.id === routeId || (entry.children?.some((child) => navContainsRoute(child, routeId)) ?? false);
}
