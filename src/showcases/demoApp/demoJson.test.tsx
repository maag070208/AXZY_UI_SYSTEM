/**
 * Pruebas de los JSON del demo (`public/demo/app/*.json`).
 *
 * Los JSON son contrato con el host: cada acción, slot, fuente, parámetro y clave de
 * traducción que nombran tiene que existir del lado del host. Estas pruebas lo
 * comprueban para todas las páginas y para `routes.json`, y renderizan cada página
 * con el motor exigiendo cero avisos.
 */

import React from "react";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ITSchemaRenderer } from "../../json-renderer/kernel/SchemaRenderer";
import type { JsonEngineIssue } from "../../json-renderer/shared/errors";
import type { SlotRegistry } from "../../json-renderer/kernel/slots";
import { validateSchema, validateRoutes, flattenRoutes, matchRoute, type RoutesSchema } from "../../json-renderer";
import { sandboxMessages } from "../../sandbox/i18n";
import { DEMO_ACTIONS, DEMO_SLOT_NAMES } from "../DemoJsonDashboard";
import { isDemoSource } from "./demoData";

const DIR = join(process.cwd(), "public/demo/app");
const NO_SON_PAGINAS = ["layout.json", "routes.json"];

/** Lee un JSON del demo. */
function leer<T = unknown>(nombre: string): T {
  return JSON.parse(readFileSync(join(DIR, nombre), "utf8")) as T;
}

/** Recorre todos los objetos de un JSON y llama a `visita` con cada uno. */
function recorrer(valor: unknown, visita: (objeto: Record<string, unknown>) => void): void {
  if (Array.isArray(valor)) {
    valor.forEach((item) => recorrer(item, visita));
    return;
  }
  if (valor && typeof valor === "object") {
    visita(valor as Record<string, unknown>);
    Object.values(valor).forEach((item) => recorrer(item, visita));
  }
}

/** Todas las claves `{ i18n }` de un JSON. */
function clavesI18n(json: unknown): string[] {
  const claves: string[] = [];
  recorrer(json, (objeto) => {
    if (typeof objeto.i18n === "string") claves.push(objeto.i18n);
  });
  return claves;
}

/** Todos los nombres de acción (`{ action: "…" }`) de un JSON. */
function nombresDeAccion(json: unknown): string[] {
  const nombres: string[] = [];
  recorrer(json, (objeto) => {
    if (typeof objeto.action === "string") nombres.push(objeto.action);
  });
  return nombres;
}

/** Todos los `{ $param: "…" }` de un JSON. */
function parametrosUsados(json: unknown): string[] {
  const nombres: string[] = [];
  recorrer(json, (objeto) => {
    if (typeof objeto.$param === "string") nombres.push(objeto.$param);
  });
  return nombres;
}

/** Nodos `slot` de un JSON, por nombre de slot. */
function slotsUsados(json: unknown): string[] {
  const nombres: string[] = [];
  recorrer(json, (objeto) => {
    if (objeto.type === "slot" && typeof (objeto.props as { name?: unknown } | undefined)?.name === "string") {
      nombres.push((objeto.props as { name: string }).name);
    }
  });
  return nombres;
}

/** Todos los `{ $source: "…" }` de un JSON. */
function fuentesUsadas(json: unknown): string[] {
  const nombres: string[] = [];
  recorrer(json, (objeto) => {
    if (typeof objeto.$source === "string") nombres.push(objeto.$source);
  });
  return nombres;
}

/** Páginas de pantalla: todos los JSON salvo el shell y las rutas. */
const PAGINAS = readdirSync(DIR).filter((archivo) => archivo.endsWith(".json") && !NO_SON_PAGINAS.includes(archivo));

const rutas = leer<RoutesSchema>("routes.json");
const planas = flattenRoutes(rutas.routes);

/** Pantalla que pinta una página, según la ruta que la declara (params a "1"). */
function ejemploDePagina(pagina: string) {
  const ruta = planas.find((item) => item.page === pagina);
  if (!ruta) return null;
  const segmentos = ruta.segments.map((segmento) => (segmento.startsWith(":") ? "1" : segmento));
  return matchRoute(planas, segmentos, ruta.query);
}

/** Diccionario de traducción en español para resolver `{ i18n }` al renderizar. */
const es = sandboxMessages.es as Record<string, string>;
const en = sandboxMessages.en as Record<string, string>;

describe("routes.json", () => {
  it("es un documento de rutas válido", () => {
    expect(validateRoutes(rutas)).toEqual([]);
  });

  it("cada ruta hoja pinta una página que existe (docs es la página TSX)", () => {
    for (const ruta of planas) {
      if (ruta.page === "docs") continue;
      expect(existsSync(join(DIR, `${ruta.page}.json`)), `${ruta.id} → ${ruta.page}.json`).toBe(true);
    }
  });

  it("no hay páginas huérfanas: cada JSON de pantalla tiene una ruta que lo pinta", () => {
    const paginasConRuta = new Set(planas.map((ruta) => ruta.page));
    for (const archivo of PAGINAS) {
      expect(paginasConRuta.has(archivo.replace(/\.json$/, "")), `${archivo} sin ruta`).toBe(true);
    }
  });

  it("los ids de ruta son únicos", () => {
    const ids = planas.map((ruta) => ruta.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("cada clave de traducción existe en español e inglés", () => {
    for (const clave of clavesI18n(rutas)) {
      expect(es[clave], `es: ${clave}`).toBeTruthy();
      expect(en[clave], `en: ${clave}`).toBeTruthy();
    }
  });

  it("cada ruta con :param declara un parámetro que su página usa, y viceversa", () => {
    for (const ruta of planas) {
      const declarados = ruta.segments.filter((segmento) => segmento.startsWith(":")).map((segmento) => segmento.slice(1));
      if (declarados.length === 0 || ruta.page === "docs") continue;
      const pagina = leer(`${ruta.page}.json`);
      for (const usado of parametrosUsados(pagina)) {
        expect(declarados, `${ruta.page} usa $param "${usado}"`).toContain(usado);
      }
    }
  });
});

describe.each(PAGINAS)("%s", (archivo) => {
  const pagina = leer(archivo);
  const nombre = archivo.replace(/\.json$/, "");

  it("es un esquema válido, sin nodos pendientes", () => {
    const informe = validateSchema(pagina);
    expect(informe.errors, JSON.stringify(informe.errors)).toHaveLength(0);
    expect(informe.verdict).toBe("valid");
    expect(informe.pendingNodes).toBe(0);
  });

  it("solo usa acciones que el host resuelve", () => {
    for (const accion of nombresDeAccion(pagina)) {
      expect(DEMO_ACTIONS as readonly string[], `acción "${accion}"`).toContain(accion);
    }
  });

  it("cada clave de traducción existe en español e inglés", () => {
    for (const clave of clavesI18n(pagina)) {
      expect(es[clave], `es: ${clave}`).toBeTruthy();
      expect(en[clave], `en: ${clave}`).toBeTruthy();
    }
  });

  it("cada slot nombra un bloque que el host registra", () => {
    for (const slot of slotsUsados(pagina)) {
      expect(DEMO_SLOT_NAMES, `slot "${slot}"`).toContain(slot);
    }
  });

  it("cada $source usa una fuente declarada en `data`, con un handler que existe", () => {
    const data = ((pagina as { data?: Record<string, { handler: string }> }).data ?? {}) as Record<string, { handler: string }>;
    for (const fuente of fuentesUsadas(pagina)) {
      expect(data[fuente], `fuente "${fuente}" sin declarar en data`).toBeTruthy();
      expect(isDemoSource(data[fuente].handler), `handler "${data[fuente].handler}"`).toBe(true);
    }
  });

  it("cada $param tiene una ruta que lo proporciona", () => {
    const ejemplo = ejemploDePagina(nombre);
    if (parametrosUsados(pagina).length === 0) return;
    expect(ejemplo, `${nombre} necesita una ruta con :param`).not.toBeNull();
    for (const usado of parametrosUsados(pagina)) {
      expect(ejemplo?.params, `$param "${usado}"`).toHaveProperty(usado);
    }
  });

  it("se pinta con el motor sin avisos (ni errores ni advertencias)", () => {
    const issues: JsonEngineIssue[] = [];
    const ejemplo = ejemploDePagina(nombre);
    const slots: SlotRegistry = Object.fromEntries(
      DEMO_SLOT_NAMES.map((nombreSlot) => [nombreSlot, () => <div data-slot={nombreSlot} />])
    );

    render(
      <ITSchemaRenderer
        schema={pagina as never}
        params={ejemplo?.params ?? {}}
        // Como el host real: todos los efectos del demo están implementados.
        effects={{ toast: () => undefined, navigate: () => undefined, refresh: () => undefined, openOverlay: () => undefined, closeOverlay: () => undefined }}
        // Como el host real: solo las acciones de DEMO_ACTIONS tienen handler.
        resolveAction={(_node, _prop, accion) => {
          const nombre = (accion as { action?: unknown } | null)?.action;
          return typeof nombre === "string" && (DEMO_ACTIONS as readonly string[]).includes(nombre) ? () => undefined : undefined;
        }}
        slots={slots}
        dataHandlers={{
          usuarios: async () => ({ data: [], total: 0 }),
          pedidos: async () => ({ data: [], total: 0 }),
          productos: async () => ({ data: [], total: 0 }),
        }}
        resolveValue={(valor) =>
          valor && typeof valor === "object" && typeof (valor as { i18n?: unknown }).i18n === "string"
            ? es[(valor as { i18n: string }).i18n]
            : valor
        }
        onIssue={(issue) => issues.push(issue)}
      />
    );

    expect(issues.map((issue) => `${issue.code} ${issue.path}: ${issue.message}`)).toEqual([]);
  });
});

describe("layout.json", () => {
  it("declara la marca y nada más: el menú sale de routes.json", () => {
    const layout = leer<{ layout: { brand?: { text?: string }; modules?: unknown } }>("layout.json");
    expect(layout.layout.brand?.text).toBeTruthy();
    expect(layout.layout.modules).toBeUndefined();
  });
});
