import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { validateSchema } from "../../json-renderer/validation/validate";

const DIR = join(process.cwd(), "public/demo/app");

/** Lee y parsea un archivo del demo. */
function leerJson(nombre: string): unknown {
  return JSON.parse(readFileSync(join(DIR, nombre), "utf8"));
}

// layout.json (marca) y routes.json (rutas) no son pantallas: se prueban aparte.
const NO_SON_PAGINAS = ["layout.json", "routes.json"];
const paginas = readdirSync(DIR).filter((archivo) => archivo.endsWith(".json") && !NO_SON_PAGINAS.includes(archivo));

describe("JSON del demo", () => {
  it("hay páginas y un layout", () => {
    expect(paginas.length).toBeGreaterThanOrEqual(5);
    expect(() => leerJson("layout.json")).not.toThrow();
  });

  it.each(paginas)("%s es un esquema válido", (archivo) => {
    const informe = validateSchema(leerJson(archivo));
    expect(informe.errors, JSON.stringify(informe.errors)).toHaveLength(0);
    expect(informe.verdict).toBe("valid");
    expect(informe.pendingNodes).toBe(0);
  });

  it("el layout declara la marca; el menú vive en routes.json", () => {
    const layout = leerJson("layout.json") as { layout: { brand?: { text?: string }; modules?: unknown } };
    expect(layout.layout.brand?.text).toBeTruthy();
    expect(layout.layout.modules, "los módulos ya no van en layout.json").toBeUndefined();
  });

  it("las páginas declaran título y descripción traducibles", () => {
    for (const archivo of paginas) {
      const esquema = leerJson(archivo) as { title?: { i18n?: string }; description?: { i18n?: string } };
      expect(esquema.title?.i18n, `${archivo} sin title.i18n`).toBeTruthy();
      expect(esquema.description?.i18n, `${archivo} sin description.i18n`).toBeTruthy();
    }
  });
});
