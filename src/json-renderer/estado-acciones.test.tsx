import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen as testingScreen, waitFor } from "@testing-library/react";
import { ITSchemaRenderer } from "./kernel/SchemaRenderer";
import type { JsonEngineIssue } from "./shared/errors";
import type { NodeSchema, ScreenSchema } from "./kernel/types";

/** Esquema mínimo con el contenido indicado y un estado inicial opcional. */
const pantalla = (content: unknown, state?: Record<string, unknown>): ScreenSchema =>
  ({ version: 1, id: "estado", content, ...(state ? { state } : {}) }) as ScreenSchema;

/** Acumula los avisos del renderizador. */
function avisos() {
  const lista: JsonEngineIssue[] = [];
  return { lista, onIssue: (aviso: JsonEngineIssue) => lista.push(aviso) };
}

describe("efecto set: escribir en el estado de la pantalla", () => {
  it("un botón escribe un valor y el texto que lo lee se actualiza", () => {
    render(
      <ITSchemaRenderer
        schema={pantalla(
          [
            { type: "ITText", text: { $state: "titulo" } },
            {
              type: "ITButton",
              props: { label: "Cambiar", onClick: { action: "cambiar", then: [{ set: { titulo: "Nuevo" } }] } },
            } as NodeSchema,
          ],
          { titulo: "Inicial" }
        )}
        resolveAction={() => () => undefined}
      />
    );
    expect(testingScreen.getByText("Inicial")).toBeTruthy();

    fireEvent.click(testingScreen.getByRole("button", { name: "Cambiar" }));

    expect(testingScreen.getByText("Nuevo")).toBeTruthy();
    expect(testingScreen.queryByText("Inicial")).toBeNull();
  });

  it("set puede tomar un dato del resultado del handler con $result", () => {
    render(
      <ITSchemaRenderer
        schema={pantalla([
          { type: "ITText", text: { $state: "folio" } },
          {
            type: "ITButton",
            props: { label: "Crear", onClick: { action: "crear", then: [{ set: { folio: { $result: "id" } } }] } },
          } as NodeSchema,
        ])}
        resolveAction={() => () => ({ id: "PED-7" })}
      />
    );
    fireEvent.click(testingScreen.getByRole("button", { name: "Crear" }));
    expect(testingScreen.getByText("PED-7")).toBeTruthy();
  });

  it("al cambiar de esquema, el estado vuelve al inicial del nuevo esquema", () => {
    const primera = pantalla([{ type: "ITText", text: { $state: "titulo" } }], { titulo: "A" });
    const { rerender } = render(<ITSchemaRenderer schema={primera} />);
    expect(testingScreen.getByText("A")).toBeTruthy();

    rerender(<ITSchemaRenderer schema={pantalla([{ type: "ITText", text: { $state: "titulo" } }], { titulo: "B" })} />);
    expect(testingScreen.getByText("B")).toBeTruthy();
  });
});

describe("JR061: permisos por acción", () => {
  it("una acción que exige una capacidad no concedida no se ejecuta y avisa con JR061", () => {
    const handler = vi.fn();
    const { lista, onIssue } = avisos();
    render(
      <ITSchemaRenderer
        schema={pantalla({
          type: "ITButton",
          props: { label: "Borrar", onClick: { action: "borrar", requires: "usuarios.eliminar" } },
        })}
        resolveAction={() => handler}
        onIssue={onIssue}
      />
    );
    fireEvent.click(testingScreen.getByRole("button", { name: "Borrar" }));
    expect(handler).not.toHaveBeenCalled();
    expect(lista.some((aviso) => aviso.code === "JR061")).toBe(true);
  });

  it("con la capacidad concedida, la acción sí se ejecuta", () => {
    const handler = vi.fn();
    render(
      <ITSchemaRenderer
        schema={pantalla({
          type: "ITButton",
          props: { label: "Borrar", onClick: { action: "borrar", requires: "usuarios.eliminar" } },
        })}
        resolveAction={() => handler}
        capabilities={["usuarios.eliminar"]}
      />
    );
    fireEvent.click(testingScreen.getByRole("button", { name: "Borrar" }));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

describe("botones de fila en tablas", () => {
  const tabla = (rowActions: unknown[]) =>
    pantalla({
      type: "ITDataTable",
      props: {
        columns: [
          { key: "nombre", label: "Nombre", type: "string" },
          { key: "acciones", label: "Acciones", type: "actions", rowActions },
        ],
        fetchData: { $source: "personas" },
      },
    }, undefined) as ScreenSchema;

  const conFuente = (esquema: ScreenSchema) => ({
    ...esquema,
    data: { personas: { handler: "personas" } },
  }) as ScreenSchema;

  const filas = { personas: async () => ({ data: [{ id: 1, nombre: "Ana" }], total: 1 }) };

  it("cada fila muestra el botón declarado y pulsarlo llama a la acción con la fila", async () => {
    const ver = vi.fn();
    render(
      <ITSchemaRenderer
        schema={conFuente(tabla([{ label: "Ver", action: "ver" }]))}
        dataHandlers={filas}
        resolveAction={(_node, _prop, accion) => ((accion as { action?: string }).action === "ver" ? ver : undefined)}
      />
    );
    const boton = await testingScreen.findByRole("button", { name: "Ver" });
    fireEvent.click(boton);
    expect(ver).toHaveBeenCalledWith(expect.objectContaining({ id: 1, nombre: "Ana" }));
  });

  it("un botón de fila sin handler no se pinta y avisa con JR040", async () => {
    const { lista, onIssue } = avisos();
    render(
      <ITSchemaRenderer
        schema={conFuente(tabla([{ label: "Borrar", action: "no-existe" }]))}
        dataHandlers={filas}
        resolveAction={() => undefined}
        onIssue={onIssue}
      />
    );
    await waitFor(() => expect(lista.some((aviso) => aviso.code === "JR040")).toBe(true));
    expect(testingScreen.queryByRole("button", { name: "Borrar" })).toBeNull();
  });

  it("un botón de fila sin action avisa con JR021", async () => {
    const { lista, onIssue } = avisos();
    render(
      <ITSchemaRenderer
        schema={conFuente(tabla([{ label: "Roto" }]))}
        dataHandlers={filas}
        resolveAction={() => () => undefined}
        onIssue={onIssue}
      />
    );
    await waitFor(() => expect(lista.some((aviso) => aviso.code === "JR021")).toBe(true));
  });
});
