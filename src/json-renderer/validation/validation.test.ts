import { describe, expect, it } from "vitest";
import { axzyCatalog } from "../catalog/axzyCatalog";
import { parsePartialSchema } from "../stream/tolerantParse";
import type { ScreenSchema } from "../kernel/types";
import { CURRENT_SCHEMA_VERSION, validateSchema } from "./validate";
import { migrateSchema, type MigrationRegistry } from "./migrate";
import { buildVocabularyContract, formatVocabularyForPrompt } from "../vocabulary/buildContract";

const screen = (content: ScreenSchema["content"]): ScreenSchema => ({ version: 1, id: "test", content });

describe("validateSchema", () => {
  it("da por válido un esquema correcto", () => {
    const report = validateSchema(screen({ type: "ITText", text: "Hola" }));
    expect(report.verdict).toBe("valid");
    expect(report.errors).toHaveLength(0);
    expect(report.warnings).toHaveLength(0);
  });

  it("declara partial un esquema a medias y sin errores", () => {
    const full = JSON.stringify(screen([{ type: "ITText", text: "uno" }, { type: "ITCard", props: { title: "dos" } }]));
    const cut = full.indexOf('"title"') + 4;
    const partial = parsePartialSchema(full.slice(0, cut));
    const report = validateSchema(partial.tree);

    expect(report.verdict).toBe("partial");
    expect(report.errors).toHaveLength(0);
    expect(report.pendingNodes).toBeGreaterThan(0);
  });

  it("invalida un esquema sin versión", () => {
    const report = validateSchema({ id: "x", content: { type: "ITText", text: "x" } });
    expect(report.verdict).toBe("invalid");
    expect(report.errors.some((e) => e.code === "JR020" && e.path === "version")).toBe(true);
  });

  it("invalida una versión futura", () => {
    const report = validateSchema({ version: 99, id: "x", content: { type: "ITText", text: "x" } });
    expect(report.verdict).toBe("invalid");
    expect(report.errors[0]?.message).toContain("99");
  });

  it("invalida un esquema sin id o sin content", () => {
    expect(validateSchema({ version: 1, content: { type: "ITText" } }).verdict).toBe("invalid");
    expect(validateSchema({ version: 1, id: "x" }).verdict).toBe("invalid");
  });

  it("separa errores de avisos: prop desconocida es aviso, tipo desconocido es error", () => {
    const report = validateSchema(
      screen([
        { type: "ITText", text: "ok", props: { inventada: 1 } },
        { type: "ITNope" },
      ] as ScreenSchema["content"])
    );
    expect(report.verdict).toBe("invalid");
    expect(report.errors.some((e) => e.code === "JR010")).toBe(true);
    expect(report.warnings.some((w) => w.code === "JR011")).toBe(true);
  });

  it("no se cae con un esquema parcial sin content", () => {
    const { tree } = parsePartialSchema('{"version":1,"id":"x"');
    const report = validateSchema(tree);
    expect(() => validateSchema(tree)).not.toThrow();
    // Sin content todavía: no es un error del esquema, es un stream a medias.
    expect(report.errors.some((e) => e.path === "content")).toBe(true);
  });

  it("no lanza con entradas absurdas", () => {
    for (const value of [null, undefined, 42, "texto", [], [1, 2]]) {
      expect(() => validateSchema(value)).not.toThrow();
      expect(validateSchema(value).verdict).toBe("invalid");
    }
  });

  it("acepta el formato completo con $schema", () => {
    const report = validateSchema({
      $schema: "axzy/screen",
      version: CURRENT_SCHEMA_VERSION,
      id: "demo",
      content: { type: "ITCard", props: { title: "ok" }, children: [{ type: "ITText", text: "x" }] },
    });
    expect(report.verdict).toBe("valid");
  });
});

describe("migrateSchema", () => {
  it("no migra si ya está en la versión objetivo", () => {
    const result = migrateSchema(screen({ type: "ITText", text: "x" }), 1);
    expect(result.migrated).toBe(false);
    expect(result.issues).toHaveLength(0);
  });

  it("avisa cuando falta la migración (JR070)", () => {
    const result = migrateSchema({ ...screen({ type: "ITText", text: "x" }), version: 1 }, 2, {});
    expect(result.migrated).toBe(false);
    expect(result.issues[0]?.code).toBe("JR070");
  });

  it("aplica migraciones en cadena", () => {
    const migrations: MigrationRegistry = {
      1: (schema) => ({ ...schema, id: `${schema.id}-v2` }),
      2: (schema) => ({ ...schema, id: `${schema.id}-v3` }),
    };
    const result = migrateSchema({ ...screen({ type: "ITText", text: "x" }), version: 1 }, 3, migrations);
    expect(result.migrated).toBe(true);
    expect(result.to).toBe(3);
    expect(result.schema.version).toBe(3);
    expect(result.schema.id).toBe("test-v2-v3");
  });

  it("no permite degradar un esquema", () => {
    const result = migrateSchema({ ...screen({ type: "ITText", text: "x" }), version: 3 }, 1);
    expect(result.migrated).toBe(false);
    expect(result.issues[0]?.code).toBe("JR020");
  });
});

describe("contrato de vocabulario", () => {
  const contract = buildVocabularyContract();

  it("cubre todos los tipos del catálogo", () => {
    expect(contract.components).toHaveLength(Object.keys(axzyCatalog.entries).length);
    expect(contract.components.map((c) => c.type)).toContain("ITCard");
  });

  it("publica props con tipo y obligatoriedad", () => {
    const card = contract.components.find((c) => c.type === "ITCard");
    expect(card?.props.some((p) => p.name === "title" && p.kind === "string")).toBe(true);
    expect(card?.props.find((p) => p.name === "title")?.required).toBe(false);

    const image = contract.components.find((c) => c.type === "ITImage");
    expect(image?.props.find((p) => p.name === "src")?.required).toBe(true);
  });

  it("incluye enums y valores admitidos", () => {
    const alert = contract.components.find((c) => c.type === "ITAlert");
    const variant = alert?.props.find((p) => p.name === "variant");
    expect(variant?.values).toEqual(["info", "success", "warning", "error"]);
  });

  it("da un nodo mínimo que funciona para cada componente", () => {
    for (const component of contract.components) {
      const report = validateSchema(screen(component.minimal as never));
      expect(report.errors, `mínimo inválido para ${component.type}`).toHaveLength(0);
    }
  });

  it("publica las exclusiones con su motivo", () => {
    expect(contract.excluded.ITWysiwyg).toContain("HTML");
    expect(contract.excluded.ITJsonRenderer).toContain("Recursión");
  });

  it("las reglas mencionan las prohibiciones clave", () => {
    const rules = contract.rules.join(" ");
    expect(rules).toContain("i18n");
    expect(rules).toContain("HTML");
    expect(rules).toContain("action");
  });

  it("se serializa para el prompt con todos los componentes", () => {
    const text = formatVocabularyForPrompt(contract);
    expect(text).toContain("ITCard");
    expect(text).toContain("props:");
    expect(text.split("\n").length).toBeGreaterThan(contract.components.length);
  });
});
