import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen as testingScreen } from "@testing-library/react";
import { ITSchemaRenderer } from "../kernel/SchemaRenderer";
import type { JsonEngineIssue } from "../shared/errors";
import type { NodeSchema, ScreenSchema } from "../kernel/types";
import { wrapAction, type EffectContext, type EffectRegistry } from "./effects";

/** Contexto de pruebas: traducción literal y avisos acumulados. */
function contexto(effects?: EffectRegistry) {
  const avisos: JsonEngineIssue[] = [];
  const context: EffectContext = {
    effects,
    path: ["content", 0],
    resolveText: (value) => (typeof value === "string" ? value : ""),
    report: (aviso) => avisos.push(aviso),
  };
  return { context, avisos };
}

describe("wrapAction", () => {
  it("sin then ni onError devuelve el handler tal cual", () => {
    const handler = () => "ok";
    const { context } = contexto({});
    expect(wrapAction(handler, { action: "x" }, context)).toBe(handler);
    expect(wrapAction(handler, undefined, context)).toBe(handler);
  });

  it("then se ejecuta después de un handler que termina bien", () => {
    const orden: string[] = [];
    const toast = vi.fn(() => orden.push("toast"));
    const handler = vi.fn(() => orden.push("handler"));
    const { context } = contexto({ toast });

    const envuelto = wrapAction(handler, { action: "x", then: [{ toast: { variant: "success", message: "Hecho" } }] }, context);
    envuelto("args");

    expect(orden).toEqual(["handler", "toast"]);
    expect(toast).toHaveBeenCalledWith({ variant: "success", message: "Hecho" });
  });

  it("los efectos sueltos de la acción cuentan como un then más", () => {
    const navigate = vi.fn();
    const { context } = contexto({ navigate });
    wrapAction(() => undefined, { action: "x", navigate: "/inicio" }, context)();
    expect(navigate).toHaveBeenCalledWith("/inicio");
  });

  it("onError se ejecuta, y then no, cuando el handler lanza", () => {
    const toast = vi.fn();
    const { context } = contexto({ toast });
    const envuelto = wrapAction(
      () => {
        throw new Error("fallo");
      },
      { action: "x", then: [{ toast: { message: "Bien" } }], onError: { toast: { variant: "error", message: "Mal" } } },
      context
    );
    envuelto();
    expect(toast).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalledWith({ variant: "error", message: "Mal" });
  });

  it("con un handler asíncrono espera la promesa: then si resuelve, onError si rechaza", async () => {
    const toast = vi.fn();
    const { context } = contexto({ toast });
    const acciones = { action: "x", then: [{ toast: { message: "Bien" } }], onError: { toast: { variant: "error", message: "Mal" } } };

    await wrapAction(() => Promise.resolve("ok"), acciones, context)();
    expect(toast).toHaveBeenLastCalledWith({ variant: "info", message: "Bien" });

    await (wrapAction(() => Promise.reject(new Error("x")), acciones, context)() as Promise<unknown>).catch(() => undefined);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(toast).toHaveBeenLastCalledWith({ variant: "error", message: "Mal" });
  });

  it("un efecto que el host no implementa avisa con JR040 al pintar, y no rompe al ejecutar", () => {
    const { context, avisos } = contexto({});
    const envuelto = wrapAction(() => undefined, { action: "x", then: [{ toast: { message: "Hola" } }] }, context);
    expect(avisos[0]).toMatchObject({ code: "JR040", severity: "warning" });
    expect(() => envuelto()).not.toThrow();
  });
});

describe("efectos en pantalla", () => {
  const pantalla = (action: Record<string, unknown>): ScreenSchema =>
    ({
      version: 1,
      id: "efectos",
      content: { type: "ITButton", props: { label: "Enviar", onClick: action } } as NodeSchema,
    }) as ScreenSchema;

  it("al pulsar, el host recibe la acción y después se ejecuta el toast del JSON", () => {
    const orden: string[] = [];
    const host = vi.fn(() => orden.push("host"));
    const toast = vi.fn(() => orden.push("toast"));

    render(
      <ITSchemaRenderer
        schema={pantalla({ action: "guardar", then: [{ toast: { variant: "success", message: { i18n: "k" } } }] })}
        resolveAction={(_node, _prop, action) => {
          const nombre = (action as { action?: string }).action;
          return nombre === "guardar" ? host : undefined;
        }}
        resolveValue={(value) => (value && typeof value === "object" && "i18n" in value ? "Guardado" : value)}
        effects={{ toast }}
      />
    );

    fireEvent.click(testingScreen.getByRole("button", { name: "Enviar" }));

    expect(orden).toEqual(["host", "toast"]);
    expect(toast).toHaveBeenCalledWith({ variant: "success", message: "Guardado" });
  });
});
