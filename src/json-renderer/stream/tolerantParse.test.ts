import { describe, expect, it } from "vitest";
import { parsePartialSchema } from "./tolerantParse";
import type { NodeSchema, ScreenSchema } from "../kernel/types";

/** Esquema de ejemplo con nodos anidados: cubre objetos, arrays y literales. */
const SCHEMA_TEXT = `{
  "$schema": "axzy/screen",
  "version": 1,
  "id": "usuarios.lista",
  "requires": "usuarios.leer",
  "state": { "page": 1, "q": "" },
  "data": {
    "usuarios": { "handler": "usuarios.listar", "params": { "page": { "$state": "page" } } }
  },
  "content": [
    { "type": "ITPageHeader", "props": { "title": { "i18n": "usuarios.titulo" } } },
    {
      "type": "ITDataTable",
      "id": "tabla",
      "props": {
        "columns": [
          { "field": "nombre", "header": { "i18n": "usuarios.nombre" }, "sortable": true },
          { "field": "correo", "header": { "i18n": "usuarios.correo" } }
        ],
        "loading": false,
        "emptyTitle": { "i18n": "usuarios.vacio" }
      }
    }
  ]
}`;

/** Cuenta nodos con `$status: "pending"` en un árbol. */
function countPending(value: unknown): number {
  if (Array.isArray(value)) return value.reduce<number>((total, item) => total + countPending(item), 0);
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const own = record.$status === "pending" ? 1 : 0;
    return Object.values(record).reduce<number>((total, nested) => total + countPending(nested), own);
  }
  return 0;
}

/** Cuenta nodos con `type` en un árbol (nodos de esquema reales). */
function countTypedNodes(value: unknown): number {
  if (Array.isArray(value)) return value.reduce<number>((total, item) => total + countTypedNodes(item), 0);
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const own = typeof record.type === "string" ? 1 : 0;
    return Object.values(record).reduce<number>((total, nested) => total + countTypedNodes(nested), own);
  }
  return 0;
}

describe("parsePartialSchema", () => {
  it("parsea el esquema completo y lo marca como cerrado", () => {
    const result = parsePartialSchema(SCHEMA_TEXT);
    expect(result.status).toBe("complete");
    expect(result.broken).toBe(false);
    expect(result.pendingNodes).toBe(0);

    const tree = result.tree as ScreenSchema;
    expect(tree.id).toBe("usuarios.lista");
    expect(tree.version).toBe(1);
    expect(Array.isArray(tree.content)).toBe(true);
    expect((tree.content as NodeSchema[])[1].type).toBe("ITDataTable");
  });

  it("no se rompe ni lanza con texto vacío", () => {
    const result = parsePartialSchema("");
    expect(result.tree).toBeNull();
    expect(result.status).toBe("pending");
    expect(result.broken).toBe(false);
  });

  it("marca como no recuperable la basura al principio", () => {
    const result = parsePartialSchema("@@@ no es json");
    expect(result.broken).toBe(true);
  });

  it("trata como pendiente una cadena sin cerrar", () => {
    const result = parsePartialSchema('{"id": "usuarios');
    expect(result.status).toBe("pending");
  });

  it("trata como pendiente un número al final (puede seguir creciendo)", () => {
    const result = parsePartialSchema('{"version": 1');
    expect(result.status).toBe("pending");
  });

  it("acepta un documento completo con espacio final", () => {
    expect(parsePartialSchema('{"version": 1}  \n').status).toBe("complete");
  });

  it("marca pendiente el nodo cuyo valor está a medias", () => {
    const result = parsePartialSchema('{"content": [{"type": "ITCard", "props": {"title": "Ho');
    const content = (result.tree as ScreenSchema | null)?.content as NodeSchema[] | undefined;
    expect(result.status).toBe("pending");
    // El nodo existe (tiene `type` cerrado) pero su prop quedó a medias.
    expect(content?.[0]?.type).toBe("ITCard");
  });

  // ── El criterio de aceptación de la fase 0: truncar en CADA posición ──────────
  describe("truncado exhaustivo", () => {
    const truncations = Array.from({ length: SCHEMA_TEXT.length + 1 }, (_, index) => index);

    it(`no lanza y siempre avanza en las ${truncations.length} truncaciones`, () => {
      let previousTyped = 0;

      for (const cut of truncations) {
        const text = SCHEMA_TEXT.slice(0, cut);
        const result = parsePartialSchema(text);

        // 1. Nunca lanza y siempre devuelve un resultado coherente.
        expect(result.offset).toBeGreaterThanOrEqual(0);
        expect(["complete", "pending"]).toContain(result.status);

        // 2. Solo el texto completo puede darse por cerrado.
        if (cut < SCHEMA_TEXT.length) {
          expect(result.status).toBe("pending");
        }

        // 3. El árbol no retrocede: al cortar más tarde nunca hay menos nodos.
        const typed = result.tree ? countTypedNodes(result.tree) : 0;
        expect(typed).toBeGreaterThanOrEqual(previousTyped);
        previousTyped = typed;

        // 4. Si hay árbol, es un objeto con la forma de un esquema.
        if (result.tree) {
          expect(typeof result.tree).toBe("object");
        }
      }
    });

    it("termina con los dos nodos de contenido y sin pendientes", () => {
      const result = parsePartialSchema(SCHEMA_TEXT);
      expect(countTypedNodes(result.tree)).toBe(2);
      expect(countPending(result.tree)).toBe(0);
    });

    it("a mitad de la tabla ya ha pintado la cabecera de página", () => {
      // Corte justo antes de cerrar el segundo nodo de `content`.
      const cut = SCHEMA_TEXT.indexOf('"loading": false');
      const result = parsePartialSchema(SCHEMA_TEXT.slice(0, cut));
      const content = (result.tree as ScreenSchema | null)?.content as NodeSchema[] | undefined;

      expect(result.status).toBe("pending");
      expect(content?.[0]?.type).toBe("ITPageHeader");
      // El segundo nodo está a medias: existe pero marcado como pendiente.
      expect(content?.[1]?.type).toBe("ITDataTable");
    });
  });
});
