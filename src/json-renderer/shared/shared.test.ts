import { describe, expect, it } from "vitest";
import { formatPath, hasPath, parsePath, propPath, pushPath, readPath } from "./paths";
import { createLimitTracker, DEFAULT_LIMITS, resolveLimits } from "./limits";
import { JsonEngineError, issue } from "./errors";

describe("paths", () => {
  it("renderiza rutas en la forma legible del contrato", () => {
    expect(formatPath(["content", 0, "children", 2, "props"])).toBe("content[0].children[2].props");
    expect(formatPath([])).toBe("");
    expect(formatPath([0])).toBe("[0]");
  });

  it("parsea de vuelta a segmentos", () => {
    expect(parsePath("content[0].children[2].props")).toEqual(["content", 0, "children", 2, "props"]);
    expect(parsePath("")).toEqual([]);
    expect(parsePath("version")).toEqual(["version"]);
    expect(parsePath("a[0][1].b")).toEqual(["a", 0, 1, "b"]);
  });

  it("ida y vuelta estable", () => {
    const segments = ["content", 1, "children", 0, "props", "onClick"] as const;
    expect(parsePath(formatPath([...segments]))).toEqual([...segments]);
  });

  it("lee y comprueba existencia", () => {
    const schema = { content: [{ type: "ITCard" }] };
    expect(readPath(schema, ["content", 0, "type"])).toBe("ITCard");
    expect(readPath(schema, ["content", 5])).toBeUndefined();
    expect(readPath(schema, ["content", 0, "type", "x"])).toBeUndefined();
    expect(hasPath(schema, ["content", 0, "type"])).toBe(true);
    expect(hasPath(schema, ["content", 0, "missing"])).toBe(false);
    expect(hasPath(schema, [])).toBe(true);
  });

  it("no muta la ruta original", () => {
    const base = ["content"] as const;
    expect(pushPath(base, 0)).toEqual(["content", 0]);
    expect(base).toEqual(["content"]);
  });

  it("compone la ruta de una prop", () => {
    expect(propPath(["content", 0], "title")).toEqual(["content", 0, "props", "title"]);
  });
});

describe("limits", () => {
  it("trae presupuestos por defecto razonables", () => {
    expect(DEFAULT_LIMITS.maxNodes).toBeGreaterThan(100);
    expect(DEFAULT_LIMITS.maxDepth).toBeGreaterThan(5);
    expect(DEFAULT_LIMITS.maxEffectChain).toBeLessThanOrEqual(10);
  });

  it("resuelve overrides", () => {
    expect(resolveLimits({ maxNodes: 10 }).maxNodes).toBe(10);
    expect(resolveLimits({}).maxNodes).toBe(DEFAULT_LIMITS.maxNodes);
  });

  it("rechaza límites inválidos", () => {
    expect(() => resolveLimits({ maxNodes: -1 })).toThrow(RangeError);
    expect(() => resolveLimits({ maxDepth: Number.NaN })).toThrow(RangeError);
  });

  it("corta al llegar al techo de nodos", () => {
    const tracker = createLimitTracker(resolveLimits({ maxNodes: 3 }));
    expect(tracker.visit(0)).toBe(true);
    expect(tracker.visit(1)).toBe(true);
    expect(tracker.visit(1)).toBe(true);
    expect(tracker.visit(1)).toBe(false);
    expect(tracker.exceeded).toBe(true);
    expect(tracker.nodes).toBe(3);
  });

  it("corta al pasar la profundidad máxima", () => {
    const tracker = createLimitTracker(resolveLimits({ maxDepth: 2 }));
    expect(tracker.visit(0)).toBe(true);
    expect(tracker.visit(2)).toBe(true);
    expect(tracker.visit(3)).toBe(false);
    expect(tracker.exceeded).toBe(true);
    expect(tracker.deepest).toBe(3);
  });
});

describe("errors", () => {
  it("el error lleva código, ruta y sugerencia", () => {
    const error = new JsonEngineError("JR010", "tipo desconocido", "content[0]", "Revisa el catálogo");
    expect(error.code).toBe("JR010");
    expect(error.path).toBe("content[0]");
    expect(error.hint).toBe("Revisa el catálogo");
    expect(error.message).toContain("content[0]");
    expect(error.message).toContain("tipo desconocido");
  });

  it("se convierte en aviso sin duplicar el prefijo", () => {
    const aviso = new JsonEngineError("JR011", "prop prohibida", "content[1].props.children").toIssue("warning");
    expect(aviso).toEqual({
      code: "JR011",
      severity: "warning",
      message: "prop prohibida",
      path: "content[1].props.children",
      hint: undefined,
    });
  });

  it("crea avisos sueltos con gravedad por defecto", () => {
    expect(issue("JR080", "stream cortado").severity).toBe("error");
    expect(issue("JR080", "stream cortado", "content", { severity: "warning" }).severity).toBe("warning");
  });
});
