import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { validateSchema } from "../../json-renderer/validation/validate";

const DIR = join(process.cwd(), "public/demo/app");

/** Lee y parsea un archivo del demo. */
function leerJson(nombre: string): unknown {
  return JSON.parse(readFileSync(join(DIR, nombre), "utf8"));
}

const paginas = readdirSync(DIR).filter((archivo) => archivo.endsWith(".json") && archivo !== "layout.json");

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

  it("el layout declara marca, módulos y páginas existentes", () => {
    const layout = leerJson("layout.json") as {
      layout: { brand?: { text?: string }; modules: { id: string; page: string; icon?: string }[] };
    };
    expect(layout.layout.brand?.text).toBeTruthy();
    expect(layout.layout.modules.length).toBeGreaterThanOrEqual(6);
    for (const modulo of layout.layout.modules) {
      expect(modulo.id, "cada módulo necesita id").toBeTruthy();
      expect(modulo.page, `${modulo.id} necesita page`).toBeTruthy();
    }
    // Todo módulo apunta a una página que existe (docs no tiene archivo propio).
    const ids = new Set(layout.layout.modules.map((modulo) => modulo.page));
    expect(ids.has("docs")).toBe(true);
    for (const pagina of ids) {
      if (pagina === "docs") continue;
      expect(paginas, `falta ${pagina}.json`).toContain(`${pagina}.json`);
    }
  });

  it("las páginas declaran título y descripción traducibles", () => {
    for (const archivo of paginas) {
      const esquema = leerJson(archivo) as { title?: { i18n?: string }; description?: { i18n?: string } };
      expect(esquema.title?.i18n, `${archivo} sin title.i18n`).toBeTruthy();
      expect(esquema.description?.i18n, `${archivo} sin description.i18n`).toBeTruthy();
    }
  });
});
