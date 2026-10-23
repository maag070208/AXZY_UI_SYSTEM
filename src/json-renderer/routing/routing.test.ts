import { describe, expect, it } from "vitest";
import { validateRoutes, flattenRoutes, type RouteSchema } from "./routes";
import { matchRoute, routeHref } from "./match";
import { buildNavigationTree, navContainsRoute } from "./navigation";

/** Documento de ejemplo con la forma del demo: grupos con sub-items y una ruta con parámetro. */
const rutas: RouteSchema[] = [
  { id: "inicio", path: "/inicio", page: "inicio", nav: { label: { i18n: "nav.inicio" }, icon: "home" } },
  {
    id: "usuarios",
    path: "/usuarios",
    nav: { label: { i18n: "nav.usuarios" }, icon: "users" },
    children: [
      { id: "u-todos", page: "usuarios", nav: { label: { i18n: "sub.todos" } } },
      { id: "u-activos", page: "usuarios", query: { estado: "Activo" }, nav: { label: { i18n: "sub.activos" } } },
    ],
  },
  { id: "usuario-nuevo", path: "/usuarios/nuevo", page: "usuario-form" },
  { id: "usuario-detalle", path: "/usuarios/:id", page: "usuario-detalle" },
  {
    id: "pedidos",
    path: "/pedidos",
    nav: { label: { i18n: "nav.pedidos" }, icon: "cart", badge: 11 },
    children: [{ id: "p-todos", page: "pedidos", nav: { label: { i18n: "sub.todos" } } }],
  },
];

describe("validateRoutes", () => {
  it("un documento correcto no tiene avisos", () => {
    expect(validateRoutes({ version: 1, routes: rutas })).toEqual([]);
  });

  it("no lanza con entradas malformadas y devuelve avisos con código", () => {
    expect(validateRoutes(null)[0]).toMatchObject({ code: "JR020" });
    expect(validateRoutes({ routes: [] })[0]).toMatchObject({ code: "JR020", path: "version" });
    expect(validateRoutes({ version: 1, routes: "x" })[0]).toMatchObject({ code: "JR020", path: "routes" });
    expect(() => validateRoutes({ version: 1, routes: [null, { id: "x", path: 5, page: "p" }] })).not.toThrow();
  });

  it("avisa de una hoja sin page y de un grupo con page", () => {
    const errores = validateRoutes({
      version: 1,
      routes: [
        { id: "a", path: "/a" },
        { id: "b", path: "/b", page: "b", children: [{ id: "b1", page: "b1" }] },
      ],
    });
    expect(errores.map((e) => e.code)).toEqual(["JR020", "JR020"]);
  });

  it("avisa de rutas duplicadas con la misma query y permite la misma ruta con query distinta", () => {
    const duplicadas = validateRoutes({
      version: 1,
      routes: [
        { id: "a", path: "/a", page: "a" },
        { id: "a2", path: "/a", page: "a" },
      ],
    });
    expect(duplicadas[0]).toMatchObject({ code: "JR020" });

    const distintas = validateRoutes({
      version: 1,
      routes: [
        { id: "a", path: "/a", page: "a" },
        { id: "a-activo", path: "/a", page: "a", query: { estado: "Activo" } },
      ],
    });
    expect(distintas).toEqual([]);
  });

  it("valida segmentos, la raíz y las etiquetas de menú", () => {
    expect(validateRoutes({ version: 1, routes: [{ id: "x", page: "x" }] })[0]).toMatchObject({ code: "JR021" });
    expect(validateRoutes({ version: 1, routes: [{ id: "x", path: "/a b", page: "x" }] })[0]).toMatchObject({ code: "JR021" });
    expect(validateRoutes({ version: 1, routes: [{ id: "x", path: "/x", page: "x", nav: {} }] })[0]).toMatchObject({ code: "JR021" });
  });
});

describe("flattenRoutes", () => {
  it("aplana solo las hojas con su path completo y su query", () => {
    const planas = flattenRoutes(rutas);
    const activos = planas.find((ruta) => ruta.id === "u-activos");
    expect(planas.some((ruta) => ruta.id === "usuarios")).toBe(false);
    expect(activos).toMatchObject({ segments: ["usuarios"], page: "usuarios", query: { estado: "Activo" }, groups: ["usuarios"] });
  });
});

describe("matchRoute", () => {
  const planas = flattenRoutes(rutas);

  it("un segmento estático gana a un :param en la misma posición", () => {
    expect(matchRoute(planas, ["usuarios", "nuevo"])?.route.id).toBe("usuario-nuevo");
    expect(matchRoute(planas, ["usuarios", "42"])).toMatchObject({ route: { id: "usuario-detalle" }, params: { id: "42" } });
  });

  it("la query elige la ruta más específica y la ruta base sirve para el resto", () => {
    expect(matchRoute(planas, ["usuarios"], { estado: "Activo" })?.route.id).toBe("u-activos");
    expect(matchRoute(planas, ["usuarios"], { estado: "Inactivo" })?.route.id).toBe("u-todos");
    expect(matchRoute(planas, ["usuarios"])?.route.id).toBe("u-todos");
  });

  it("devuelve null cuando nada casa", () => {
    expect(matchRoute(planas, ["no-existe"])).toBeNull();
    expect(matchRoute(planas, ["usuarios", "1", "extra"])).toBeNull();
  });

  it("la raíz casa con la ruta vacía", () => {
    const raiz = flattenRoutes([{ id: "raiz", path: "/", page: "inicio" }]);
    expect(matchRoute(raiz, [])?.route.id).toBe("raiz");
  });
});

describe("routeHref", () => {
  it("rellena los :param y codifica la query", () => {
    const detalle = flattenRoutes(rutas).find((ruta) => ruta.id === "usuario-detalle")!;
    expect(routeHref(detalle, { id: "42" })).toBe("/usuarios/42");
    const activos = flattenRoutes(rutas).find((ruta) => ruta.id === "u-activos")!;
    expect(routeHref(activos)).toBe("/usuarios?estado=Activo");
  });
});

describe("buildNavigationTree", () => {
  const arbol = buildNavigationTree(rutas);

  it("solo entran las rutas con nav, y los grupos llevan a su primera hija", () => {
    expect(arbol.map((entrada) => entrada.id)).toEqual(["inicio", "usuarios", "pedidos"]);
    const usuarios = arbol[1];
    expect(usuarios.href).toBe("/usuarios");
    expect(usuarios.children?.map((hijo) => hijo.href)).toEqual(["/usuarios", "/usuarios?estado=Activo"]);
  });

  it("conserva etiqueta, icono y contador tal como los declara el JSON", () => {
    expect(arbol[0]).toMatchObject({ label: { i18n: "nav.inicio" }, icon: "home", href: "/inicio" });
    expect(arbol[2]).toMatchObject({ badge: 11 });
  });

  it("un grupo sin nav no aparece: sus hijos suben de nivel", () => {
    const sinGrupo = buildNavigationTree([
      { id: "seccion", children: [{ id: "a", path: "/a", page: "a", nav: { label: "A" } }] },
    ]);
    expect(sinGrupo.map((entrada) => entrada.id)).toEqual(["a"]);
  });

  it("navContainsRoute encuentra la ruta activa dentro de un grupo", () => {
    expect(navContainsRoute(arbol[1], "u-activos")).toBe(true);
    expect(navContainsRoute(arbol[1], "pedidos")).toBe(false);
  });
});
