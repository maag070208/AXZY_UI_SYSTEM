import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildNavigationTree, flattenRoutes, matchRoute, routeHref, validateRoutes, type NavNode, type RoutesSchema } from "../../json-renderer";
import { sandboxMessages } from "../../sandbox/i18n";

const DIR = join(process.cwd(), "public/demo/app");
const rutas = JSON.parse(readFileSync(join(DIR, "routes.json"), "utf8")) as RoutesSchema;
const planas = flattenRoutes(rutas.routes);

/** Todas las claves `{ i18n }` de un árbol de navegación. */
function claves(nodos: NavNode[]): string[] {
  return nodos.flatMap((nodo) => [
    ...(typeof nodo.label === "object" && nodo.label !== null && "i18n" in nodo.label ? [String(nodo.label.i18n)] : []),
    ...(nodo.children ? claves(nodo.children) : []),
  ]);
}

describe("routes.json del demo", () => {
  it("es un documento de rutas válido", () => {
    expect(validateRoutes(rutas)).toEqual([]);
  });

  it("cada página de una hoja tiene su JSON (docs es la página TSX)", () => {
    for (const ruta of planas) {
      if (ruta.page === "docs") continue;
      expect(existsSync(join(DIR, `${ruta.page}.json`)), `${ruta.id} → ${ruta.page}.json`).toBe(true);
    }
  });

  it("todas las etiquetas del menú tienen traducción en el catálogo del sandbox", () => {
    for (const clave of claves(buildNavigationTree(rutas.routes))) {
      expect(sandboxMessages.es[clave], clave).toBeTruthy();
    }
  });

  it("el menú sale de las rutas: grupos con sus sub-items y la marca de pedidos", () => {
    const arbol = buildNavigationTree(rutas.routes);
    expect(arbol.map((entrada) => entrada.id)).toEqual(["inicio", "usuarios", "pedidos", "productos", "reportes", "docs"]);
    expect(arbol.find((entrada) => entrada.id === "pedidos")?.badge).toBe(11);
    expect(arbol.find((entrada) => entrada.id === "usuarios")?.children?.map((hijo) => hijo.href)).toEqual([
      "/usuarios",
      "/usuarios?estado=Activo",
      "/usuarios?estado=Inactivo",
    ]);
  });

  it("cada dirección del menú casa con la ruta que la declara", () => {
    for (const ruta of planas) {
      const casada = matchRoute(planas, ruta.segments, ruta.query);
      expect(casada?.route.id, routeHref(ruta)).toBe(ruta.id);
    }
  });

  it("la ruta de detalle recibe el id como :param y no compite con /usuarios", () => {
    expect(matchRoute(planas, ["usuarios", "7"])).toMatchObject({ route: { id: "usuario-detalle" }, params: { id: "7" } });
    expect(matchRoute(planas, ["usuarios"])?.route.id).toBe("u-todos");
  });

  it("una query sin ruta específica cae en la ruta base del mismo path", () => {
    expect(matchRoute(planas, ["pedidos"], { estado: "Cancelado" })?.route.id).toBe("p-todos");
  });
});
