/**
 * Contrato de rutas declarativas: un `routes.json` describe qué pantalla pinta cada
 * dirección, con qué parámetros y query, y qué entradas aparecen en la navegación.
 *
 * Como el resto del motor, es entrada no confiable: no hay código ni URLs externas,
 * solo nombres de pantalla (`page`) que el host resuelve. Las rutas con `children`
 * son grupos (agrupan entradas de menú); solo las hojas se pueden pintar.
 */

import { issue, type JsonEngineIssue } from "../shared/errors";
import type { SchemaValue } from "../kernel/types";

/** Entrada de menú asociada a una ruta. Sin `nav`, la ruta existe pero no se muestra. */
export interface RouteNavSchema {
  /** Texto de la entrada; admite `{ i18n }`. */
  label: SchemaValue;
  /** Nombre de icono del registro del host. */
  icon?: string;
  /** Contador visible junto a la entrada. */
  badge?: number | string;
}

/** Ruta tal como la escribe el JSON. */
export interface RouteSchema {
  /** Identificador estable: lo usa la navegación para marcar la entrada activa. */
  id: string;
  /**
   * Segmentos de la ruta, relativos al padre (`usuarios`, `:id`). Los hijos sin `path`
   * heredan el del padre. Las rutas raíz empiezan por `/`.
   */
  path?: string;
  /** Pantalla JSON que pinta la ruta. Obligatoria en las hojas; prohibida en los grupos. */
  page?: string;
  /** Query que exige la ruta (`{ estado: "Activo" }`). Más claves = más específica. */
  query?: Record<string, string>;
  /** Entrada de menú. */
  nav?: RouteNavSchema;
  /** Rutas hijas. Si existen, la ruta es un grupo. */
  children?: RouteSchema[];
}

/** Documento de rutas completo. */
export interface RoutesSchema {
  /** Identificador del formato. */
  $schema?: "axzy/routes";
  /** Versión del formato. */
  version: number;
  /** Rutas raíz. */
  routes: RouteSchema[];
}

/** Ruta aplanada y lista para casarla: solo hojas, con su path completo. */
export interface FlatRoute {
  /** Identificador de la ruta. */
  id: string;
  /** Segmentos completos, sin barras (`["usuarios", ":id"]`). Vacío para la raíz. */
  segments: string[];
  /** Pantalla que pinta. */
  page: string;
  /** Query que exige la ruta. */
  query: Record<string, string>;
  /** Entrada de menú, si la tiene. */
  nav?: RouteNavSchema;
  /** Ids de los grupos a los que pertenece, de fuera a dentro. */
  groups: string[];
}

/** Une un path de padre con el propio y normaliza las barras. */
export function joinRoutePath(parent: string, own: unknown): string {
  return [parent, typeof own === "string" ? own : ""]
    .flatMap((part) => part.split("/"))
    .filter((segment) => segment !== "")
    .join("/");
}

/** Segmentos válidos: letras, dígitos, guiones, puntos o `:param`. */
const SEGMENT = /^(:[A-Za-z][A-Za-z0-9_]*|[A-Za-z0-9_.-]+)$/;

/**
 * Valida un documento de rutas. Nunca lanza: devuelve los avisos con su código y su ruta.
 *
 * @example
 * validateRoutes({ version: 1, routes: [{ id: "inicio", path: "/inicio", page: "inicio" }] }); // []
 */
export function validateRoutes(input: unknown): JsonEngineIssue[] {
  const errors: JsonEngineIssue[] = [];
  const document = input as Partial<RoutesSchema> | null | undefined;

  if (!document || typeof document !== "object" || Array.isArray(document)) {
    return [issue("JR020", "El documento de rutas debe ser un objeto.", "", { severity: "error" })];
  }
  if (typeof document.version !== "number") {
    errors.push(issue("JR020", "El documento de rutas no declara `version`.", "version", { severity: "error" }));
  }
  if (!Array.isArray(document.routes)) {
    errors.push(issue("JR020", "`routes` debe ser una lista.", "routes", { severity: "error" }));
    return errors;
  }

  const seen = new Map<string, string>();

  const visit = (route: RouteSchema, path: string, parentPath: string, isRoot: boolean) => {
    if (!route || typeof route !== "object") {
      errors.push(issue("JR021", "La ruta no es un objeto.", path, { severity: "error" }));
      return;
    }
    if (typeof route.id !== "string" || route.id === "") {
      errors.push(issue("JR021", "La ruta no declara `id`.", path, { severity: "error" }));
    }
    if (route.path !== undefined && route.path !== "") {
      const parts = typeof route.path === "string" ? route.path.split("/").filter(Boolean) : [];
      if (typeof route.path !== "string" || parts.some((segment) => !SEGMENT.test(segment))) {
        errors.push(issue("JR021", `El path "${String(route.path)}" no es válido.`, `${path}.path`, { severity: "error", hint: "Usa segmentos con letras, dígitos, guiones o `:param`." }));
      }
    }

    const full = joinRoutePath(parentPath, route.path);
    if (isRoot && full === "") {
      errors.push(issue("JR021", "Una ruta raíz necesita `path`.", `${path}.path`, { severity: "error" }));
    }

    if (route.children !== undefined) {
      if (route.page !== undefined) {
        errors.push(issue("JR020", "Un grupo no lleva `page`: la pantalla va en sus hijos.", path, { severity: "error" }));
      }
      if (!Array.isArray(route.children)) {
        errors.push(issue("JR020", "`children` debe ser una lista.", `${path}.children`, { severity: "error" }));
      } else {
        route.children.forEach((child, index) => visit(child, `${path}.children[${index}]`, full, false));
      }
    } else {
      if (typeof route.page !== "string" || route.page === "") {
        errors.push(issue("JR020", "La ruta no declara `page`.", path, { severity: "error" }));
      }
      const key = `${full}?${JSON.stringify(Object.entries(route.query ?? {}).sort())}`;
      if (seen.has(key)) {
        errors.push(issue("JR020", `La ruta "${full || "/"}" se repite con la misma query (ya está en ${seen.get(key)}).`, path, { severity: "error" }));
      } else {
        seen.set(key, path);
      }
    }

    const nav = route.nav as Partial<RouteNavSchema> | null | undefined;
    if (nav !== undefined && (typeof nav !== "object" || nav === null || nav.label === undefined || nav.label === null)) {
      errors.push(issue("JR021", "La entrada de menú no declara `label`.", `${path}.nav`, { severity: "error" }));
    }
  };

  document.routes.forEach((route, index) => visit(route, `routes[${index}]`, "", true));
  return errors;
}

/**
 * Aplana las rutas en hojas con su path completo. Asume un documento válido
 * (ver `validateRoutes`); las ramas sin `page` se descartan.
 */
export function flattenRoutes(routes: RouteSchema[]): FlatRoute[] {
  const flat: FlatRoute[] = [];

  const visit = (route: RouteSchema, parentPath: string, groups: string[]) => {
    const full = joinRoutePath(parentPath, route.path);
    if (route.children) {
      route.children.forEach((child) => visit(child, full, [...groups, route.id]));
      return;
    }
    if (typeof route.page !== "string") return;
    flat.push({
      id: route.id,
      segments: full === "" ? [] : full.split("/"),
      page: route.page,
      query: route.query ?? {},
      nav: route.nav,
      groups,
    });
  };

  routes.forEach((route) => visit(route, "", []));
  return flat;
}
