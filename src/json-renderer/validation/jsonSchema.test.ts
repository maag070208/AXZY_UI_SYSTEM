import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import Ajv2020 from "ajv/dist/2020.js";
import { axzyCatalog } from "../catalog/axzyCatalog";
import { buildRoutesSchema, buildScreenSchema } from "./jsonSchema";

const DOCS = join(process.cwd(), "docs/json-renderer");
const DEMO = join(process.cwd(), "public/demo/app");

/** Lee un JSON versionado. */
const leer = (ruta: string) => JSON.parse(readFileSync(ruta, "utf8")) as Record<string, unknown>;

/** Validador compilado con las mismas opciones que el tester de `scripts/json-renderer/check.mjs`. */
function validador(schema: Record<string, unknown>) {
  const ajv = new Ajv2020({ allErrors: true, strict: true, allowUnionTypes: true, strictRequired: false });
  return ajv.compile(schema);
}

const screen = validador(buildScreenSchema());
const routes = validador(buildRoutesSchema());

describe("schemas generados", () => {
  it("los archivos versionados coinciden con el generador (regenera con pnpm docs:json-renderer)", () => {
    expect(leer(join(DOCS, "screen.schema.json"))).toEqual(JSON.parse(JSON.stringify(buildScreenSchema())));
    expect(leer(join(DOCS, "routes.schema.json"))).toEqual(JSON.parse(JSON.stringify(buildRoutesSchema())));
  });

  it("cubre todo el catálogo: cada componente es un tipo válido", () => {
    const schema = buildScreenSchema() as { $defs: { node: { properties: { type: { enum: string[] } } } } };
    const tipos = schema.$defs.node.properties.type.enum;
    for (const tipo of Object.keys(axzyCatalog.entries)) {
      expect(tipos, tipo).toContain(tipo);
    }
    expect(tipos).toEqual(expect.arrayContaining(["slot", "form"]));
  });

  it("cada prop del catálogo aparece en el schema de su tipo (autocompletado completo)", () => {
    const schema = buildScreenSchema() as { $defs: { node: { allOf: { if: { properties: { type: { const: string } } }; then: { properties: { props?: { properties?: Record<string, unknown> } } } }[] } } };
    for (const [tipo, entrada] of Object.entries(axzyCatalog.entries)) {
      const regla = schema.$defs.node.allOf.find((item) => item.if.properties.type.const === tipo);
      expect(regla, tipo).toBeDefined();
      const propiedades = regla?.then.properties.props?.properties ?? {};
      for (const prop of Object.keys(entrada.props ?? {})) {
        expect(propiedades, `${tipo}.${prop}`).toHaveProperty([prop]);
      }
    }
  });
});

describe("documentos del demo cumplen el schema", () => {
  const paginas = readdirSync(DEMO).filter((archivo) => archivo.endsWith(".json") && archivo !== "layout.json" && archivo !== "routes.json");

  it.each(paginas)("%s es una pantalla válida", (archivo) => {
    const ok = screen(leer(join(DEMO, archivo)));
    expect(ok, JSON.stringify(screen.errors)).toBe(true);
  });

  it("routes.json es un documento de rutas válido", () => {
    expect(routes(leer(join(DEMO, "routes.json"))), JSON.stringify(routes.errors)).toBe(true);
  });
});

describe("el schema rechaza lo que el motor no pinta", () => {
  const pantalla = (content: unknown) => ({ version: 1, id: "x", content });

  it("un tipo fuera del catálogo", () => {
    expect(screen(pantalla({ type: "ITInventado" }))).toBe(false);
  });

  it("una prop que el componente no declara", () => {
    expect(screen(pantalla({ type: "ITButton", props: { label: "Hola", colorRaro: "red" } }))).toBe(false);
  });

  it("un valor de enum fuera de su lista", () => {
    expect(screen(pantalla({ type: "ITButton", props: { label: "Hola", size: "gigante" } }))).toBe(false);
  });

  it("un slot sin nombre", () => {
    expect(screen(pantalla({ type: "slot", props: { titulo: "x" } }))).toBe(false);
  });

  it("un campo de formulario con tipo no admitido", () => {
    expect(screen(pantalla({ type: "form", props: { fields: [{ name: "edad", kind: "number" }] } }))).toBe(false);
  });

  it("una referencia que no existe, como `$row` fuera de una tabla", () => {
    expect(screen(pantalla({ type: "ITText", text: { $row: "nombre" } }))).toBe(false);
  });

  it("un hijo en un componente que no admite hijos", () => {
    expect(screen(pantalla({ type: "ITDivider", children: [{ type: "ITText", text: "y" }] }))).toBe(false);
    expect(screen(pantalla({ type: "ITCard", children: [{ type: "ITText", text: "y" }] }))).toBe(true);
  });

  it("una ruta grupo con page, o una hoja sin page", () => {
    expect(routes({ version: 1, routes: [{ id: "g", page: "x", children: [{ id: "h", page: "y" }] }] })).toBe(false);
    expect(routes({ version: 1, routes: [{ id: "hoja" }] })).toBe(false);
  });

  it("acepta lo que sí pinta: referencias y textos traducibles", () => {
    expect(screen(pantalla({ type: "ITText", text: { i18n: "clave" } }))).toBe(true);
    expect(screen(pantalla({ type: "ITButton", props: { label: { $param: "x" }, size: "sm" } }))).toBe(true);
  });
});
