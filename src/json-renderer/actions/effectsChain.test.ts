import { describe, expect, it, vi } from "vitest";
import type { JsonEngineIssue } from "../shared/errors";
import { MAX_EFFECT_DEPTH, wrapAction, type EffectContext, type EffectRegistry } from "./effects";

/** Contexto de pruebas: traduce textos a cadena y acumula avisos. */
function contexto(overrides: Partial<EffectContext> = {}) {
  const avisos: JsonEngineIssue[] = [];
  const context: EffectContext = {
    path: ["content", 0],
    resolveText: (value) => (typeof value === "string" ? value : JSON.stringify(value)),
    report: (aviso) => avisos.push(aviso),
    ...overrides,
  };
  return { context, avisos };
}

describe("acciones encadenadas desde un efecto", () => {
  it("un efecto con action llama al handler del host con sus args", () => {
    const otra = vi.fn();
    const { context } = contexto({ resolveChained: (nombre) => (nombre === "otra" ? otra : undefined) });

    wrapAction(() => undefined, { action: "guardar", then: [{ action: "otra", args: { id: 7 } }] }, context)();

    expect(otra).toHaveBeenCalledWith({ id: 7 });
  });

  it("la acción encadenada aplica sus propios efectos al terminar", () => {
    const toast = vi.fn();
    const otra = vi.fn();
    const registro: EffectRegistry = { toast };
    const { context } = contexto({
      effects: registro,
      resolveChained: (nombre) => (nombre === "otra" ? otra : undefined),
    });

    wrapAction(
      () => undefined,
      { action: "guardar", then: [{ action: "otra", then: [{ toast: { variant: "success", message: "Encadenado" } }] }] },
      context
    )();

    expect(otra).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalledWith({ variant: "success", message: "Encadenado" });
  });

  it("una acción encadenada que el host no registró avisa con JR040 al pintar", () => {
    const { context, avisos } = contexto({ resolveChained: () => undefined });
    wrapAction(() => undefined, { action: "guardar", then: [{ action: "no-existe" }] }, context);
    expect(avisos[0]).toMatchObject({ code: "JR040", severity: "error" });
  });

  it("el encadenado tiene un límite: más de MAX_EFFECT_DEPTH niveles avisa con JR042", () => {
    const { context, avisos } = contexto({ resolveChained: () => () => undefined });

    // Anidamos MAX_EFFECT_DEPTH + 2 acciones: la última supera el límite.
    let efecto: Record<string, unknown> = { action: "hoja" };
    for (let nivel = 0; nivel < MAX_EFFECT_DEPTH + 2; nivel += 1) {
      efecto = { action: "nivel", then: [efecto] };
    }
    wrapAction(() => undefined, { action: "inicio", then: [efecto] }, context);

    expect(avisos.some((aviso) => aviso.code === "JR042")).toBe(true);
  });

  it("un encadenado dentro del límite no avisa", () => {
    const { context, avisos } = contexto({ resolveChained: () => () => undefined });
    wrapAction(() => undefined, { action: "a", then: [{ action: "b", then: [{ action: "c" }] }] }, context);
    expect(avisos.filter((aviso) => aviso.code === "JR042")).toHaveLength(0);
  });
});

describe("datos del resultado en los efectos", () => {
  it("un parámetro { $result } de i18n toma el dato que devolvió el handler", () => {
    const toast = vi.fn();
    const { context } = contexto({ effects: { toast } });

    wrapAction(
      () => ({ folio: "PED-1042" }),
      { action: "crear", then: [{ toast: { message: { i18n: "pedido.creado", params: { folio: { $result: "folio" } } } } }] },
      context
    )();

    expect(toast).toHaveBeenCalledTimes(1);
    expect(toast.mock.calls[0][0].message).toContain("PED-1042");
  });

  it("navigate sustituye {campo} por el dato del resultado", () => {
    const navigate = vi.fn();
    const { context } = contexto({ effects: { navigate } });

    wrapAction(() => ({ id: 7 }), { action: "crear", then: [{ navigate: "/usuarios/{id}" }] }, context)();

    expect(navigate).toHaveBeenCalledWith("/usuarios/7");
  });

  it("con un handler asíncrono, los efectos reciben el valor resuelto", async () => {
    const navigate = vi.fn();
    const { context } = contexto({ effects: { navigate } });

    await wrapAction(
      () => Promise.resolve({ id: 9 }),
      { action: "crear", then: [{ navigate: "/usuarios/{id}" }] },
      context
    )();

    expect(navigate).toHaveBeenCalledWith("/usuarios/9");
  });

  it("un campo que el resultado no trae llega vacío, sin romper", () => {
    const toast = vi.fn();
    const { context } = contexto({ effects: { toast } });

    wrapAction(() => ({}), { action: "crear", then: [{ toast: { message: { $result: "no.existe" } } }] }, context)();

    expect(toast).toHaveBeenCalledWith({ variant: "info", message: "" });
  });
});
