import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen as testingScreen } from "@testing-library/react";
import { ITSchemaRenderer } from "../kernel/SchemaRenderer";
import type { ScreenSchema } from "../kernel/types";
import type { JsonEngineIssue } from "../shared/errors";
import { createBindingResolver, type BindingScope, type DataLoader } from "./resolveValue";

/** Resolutor con avisos acumulados, para leerlos en cada prueba. */
function setup(scope: Partial<BindingScope> = {}) {
  const avisos: JsonEngineIssue[] = [];
  const resolve = createBindingResolver({ report: (aviso) => avisos.push(aviso), ...scope });
  return { resolve, avisos };
}

describe("$source", () => {
  it("devuelve un loader que no llama al handler hasta que el componente lo invoca", async () => {
    const handler = vi.fn(async (query: unknown) => ({ data: [], total: 0, query }));
    const { resolve, avisos } = setup({
      data: { usuarios: { handler: "usuarios" } },
      handlers: { usuarios: handler },
    });

    const loader = resolve({ $source: "usuarios" }, ["content", 0]) as DataLoader;
    expect(typeof loader).toBe("function");
    expect(handler).not.toHaveBeenCalled();

    const respuesta = await loader({ page: 2 });
    expect(handler).toHaveBeenCalledWith({ page: 2 }, {});
    expect(respuesta).toMatchObject({ total: 0, query: { page: 2 } });
    expect(avisos).toHaveLength(0);
  });

  it("resuelve los parámetros declarados con $state y $param antes de llamar al handler", async () => {
    const handler = vi.fn(() => []);
    const { resolve } = setup({
      data: { pedidos: { handler: "pedidos", params: { estado: { $state: "estado" }, empresa: { $param: "empresa" }, limite: 5 } } },
      state: { estado: "Pendiente" },
      params: { empresa: "CheckApp" },
      handlers: { pedidos: handler },
    });

    await (resolve({ $source: "pedidos" }, ["content", 0]) as DataLoader)();
    expect(handler).toHaveBeenCalledWith(undefined, { estado: "Pendiente", empresa: "CheckApp", limite: 5 });
  });

  it("una fuente no declarada avisa con JR030 y su carga rechaza sin lanzar al resolver", async () => {
    const { resolve, avisos } = setup({ data: {}, handlers: {} });

    const loader = resolve({ $source: "pedidos" }, ["content", 1]) as DataLoader;
    expect(avisos).toHaveLength(1);
    expect(avisos[0]).toMatchObject({ code: "JR030", severity: "error" });
    await expect(loader()).rejects.toThrow(/no está declarada en `data`/);
  });

  it("un handler que el host no registró avisa con JR030 y rechaza la carga", async () => {
    const { resolve, avisos } = setup({ data: { usuarios: { handler: "usuarios" } }, handlers: {} });

    const loader = resolve({ $source: "usuarios" }, ["content", 0]) as DataLoader;
    expect(avisos[0]).toMatchObject({ code: "JR030" });
    await expect(loader()).rejects.toThrow(/no está registrado por el host/);
  });

  it("un handler que lanza se convierte en rechazo de la carga, no en error del render", async () => {
    const { resolve, avisos } = setup({
      data: { usuarios: { handler: "usuarios" } },
      handlers: {
        usuarios: () => {
          throw new Error("fallo del host");
        },
      },
    });

    const loader = resolve({ $source: "usuarios" }, ["content", 0]) as DataLoader;
    await expect(loader()).rejects.toThrow("fallo del host");
    expect(avisos).toHaveLength(0);
  });

  it("un $source usado como parámetro avisa con JR032 y no se resuelve", async () => {
    const handler = vi.fn(() => []);
    const { resolve, avisos } = setup({
      data: { usuarios: { handler: "usuarios", params: { origen: { $source: "pedidos" } } } },
      handlers: { usuarios: handler },
    });

    await (resolve({ $source: "usuarios" }, ["content", 0]) as DataLoader)();
    expect(handler).toHaveBeenCalledWith(undefined, {});
    expect(avisos[0]).toMatchObject({ code: "JR032" });
  });
});

describe("$state y $param", () => {
  it("$state lee el estado inicial de la pantalla", () => {
    const { resolve, avisos } = setup({ state: { titulo: "Hola" } });
    expect(resolve({ $state: "titulo" }, ["content", 0])).toBe("Hola");
    expect(avisos).toHaveLength(0);
  });

  it("$state sin valor avisa con JR032 y devuelve undefined", () => {
    const { resolve, avisos } = setup({ state: {} });
    expect(resolve({ $state: "titulo" }, ["content", 0])).toBeUndefined();
    expect(avisos[0]).toMatchObject({ code: "JR032", severity: "warning" });
  });

  it("$param lee el valor que pone el host, no el esquema", () => {
    const { resolve } = setup({ params: { id: "42" } });
    expect(resolve({ $param: "id" }, ["content", 0])).toBe("42");
  });

  it("$param sin valor avisa con JR032", () => {
    const { resolve, avisos } = setup({ params: {} });
    expect(resolve({ $param: "id" }, ["content", 0])).toBeUndefined();
    expect(avisos[0]).toMatchObject({ code: "JR032" });
  });

  it("no hereda claves de la cadena de prototipos", () => {
    const { resolve, avisos } = setup({ state: {} });
    expect(resolve({ $state: "toString" }, ["content", 0])).toBeUndefined();
    expect(avisos[0]).toMatchObject({ code: "JR032" });
  });
});

describe("operadores no soportados y valores del host", () => {
  it("un operador de otra fase (`$row`) avisa con JR032 y no llega a la prop", () => {
    const { resolve, avisos } = setup();
    expect(resolve({ $row: "nombre" }, ["content", 0])).toBeUndefined();
    expect(avisos[0]).toMatchObject({ code: "JR032", severity: "warning" });
  });

  it("los textos `{ i18n }` y los literales pasan al host", () => {
    const host = vi.fn((value: unknown) => ({ host: value }));
    const { resolve, avisos } = setup({ host });

    expect(resolve({ i18n: "sandbox.app.back" }, ["content", 0])).toEqual({ host: { i18n: "sandbox.app.back" } });
    expect(resolve("Hola", ["content", 0])).toEqual({ host: "Hola" });
    expect(host).toHaveBeenCalledTimes(2);
    expect(avisos).toHaveLength(0);
  });

  it("sin host, los valores que no son referencias se devuelven tal cual", () => {
    const { resolve } = setup();
    expect(resolve(3, ["content", 0])).toBe(3);
  });
});

describe("ITSchemaRenderer con binding", () => {
  const pantalla = (estado: Partial<ScreenSchema>, content: unknown): ScreenSchema =>
    ({ version: 1, id: "binding", content, ...estado }) as ScreenSchema;

  it("pinta un $state declarado en la pantalla", () => {
    render(
      <ITSchemaRenderer
        schema={pantalla({ state: { titulo: "Estado de pantalla" } }, { type: "ITText", text: { $state: "titulo" } })}
      />
    );
    expect(testingScreen.getByText("Estado de pantalla")).toBeTruthy();
  });

  it("pinta un $param que llega por la prop `params`", () => {
    render(
      <ITSchemaRenderer
        schema={pantalla({}, { type: "ITText", text: { $param: "nombre" } })}
        params={{ nombre: "Ruta con parámetro" }}
      />
    );
    expect(testingScreen.getByText("Ruta con parámetro")).toBeTruthy();
  });
});
