import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen as testingScreen } from "@testing-library/react";
import { ITSchemaRenderer } from "../kernel/SchemaRenderer";
import type { JsonEngineIssue } from "../shared/errors";
import type { NodeSchema, ScreenSchema } from "../kernel/types";
import { validateSchema } from "../validation/validate";
import { readFormFields, validateField } from "./rules";

const RUTA = ["content", 0, "props", "fields"];

/** Esquema con un formulario de un único campo. */
const pantalla = (campo: Record<string, unknown>): ScreenSchema =>
  ({
    version: 1,
    id: "longitud",
    content: { type: "form", id: "f", props: { fields: [campo], onSubmit: { action: "enviar" } } } as NodeSchema,
  }) as ScreenSchema;

describe("lectura de longitudes", () => {
  it("lee minLength y maxLength como enteros no negativos", () => {
    const { fields, issues } = readFormFields([{ name: "n", minLength: 2, maxLength: 10 }], RUTA);
    expect(issues).toEqual([]);
    expect(fields[0]).toMatchObject({ minLength: 2, maxLength: 10 });
  });

  it("una longitud que no es entero no negativo se ignora con JR011", () => {
    for (const malo of [-1, 2.5, "3"]) {
      const { fields, issues } = readFormFields([{ name: "n", minLength: malo }], RUTA);
      expect(fields[0].minLength, String(malo)).toBeUndefined();
      expect(issues[0], String(malo)).toMatchObject({ code: "JR011", severity: "warning" });
    }
  });

  it("minLength mayor que maxLength descarta el campo con JR021", () => {
    const { fields, issues } = readFormFields([{ name: "n", minLength: 5, maxLength: 2 }], RUTA);
    expect(fields).toEqual([]);
    expect(issues[0]).toMatchObject({ code: "JR021", severity: "error" });
  });

  it("un esquema con longitudes válidas no tiene errores de validación", () => {
    expect(validateSchema(pantalla({ name: "n", minLength: 2, maxLength: 10 })).verdict).toBe("valid");
  });
});

describe("reglas de longitud", () => {
  it("minLength rechaza un valor más corto, contando sin espacios de los extremos", () => {
    expect(validateField({ kind: "text", required: true, minLength: 3 }, "ab")).toBe("minLength");
    expect(validateField({ kind: "text", required: true, minLength: 3 }, "  ab  ")).toBe("minLength");
    expect(validateField({ kind: "text", required: true, minLength: 3 }, "abc")).toBeUndefined();
  });

  it("maxLength rechaza un valor más largo", () => {
    expect(validateField({ kind: "text", required: false, maxLength: 3 }, "abcd")).toBe("maxLength");
    expect(validateField({ kind: "text", required: false, maxLength: 3 }, "abc")).toBeUndefined();
  });

  it("un campo opcional vacío no se valida por longitud", () => {
    expect(validateField({ kind: "text", required: false, minLength: 3 }, "")).toBeUndefined();
  });

  it("obligatorio gana a longitud: vacío sigue siendo required", () => {
    expect(validateField({ kind: "text", required: true, minLength: 3 }, "")).toBe("required");
  });
});

describe("mensajes de longitud en pantalla", () => {
  it("muestra el mínimo con su número", () => {
    const { container } = render(<ITSchemaRenderer schema={pantalla({ name: "nombre", label: "Nombre", required: true, minLength: 2 })} />);
    fireEvent.change(container.querySelector('input[name="nombre"]')!, { target: { value: "A" } });
    fireEvent.click(testingScreen.getByRole("button", { name: "Enviar" }));
    expect(testingScreen.getByText("Escribe al menos 2 caracteres.")).toBeTruthy();
  });

  it("muestra el máximo con su número y no llama a la acción", () => {
    const onSubmit = { called: false };
    const { container } = render(
      <ITSchemaRenderer
        schema={pantalla({ name: "codigo", label: "Código", required: true, maxLength: 4 })}
        resolveAction={() => () => {
          onSubmit.called = true;
        }}
      />
    );
    fireEvent.change(container.querySelector('input[name="codigo"]')!, { target: { value: "abcdef" } });
    fireEvent.click(testingScreen.getByRole("button", { name: "Enviar" }));
    expect(testingScreen.getByText("Escribe como máximo 4 caracteres.")).toBeTruthy();
    expect(onSubmit.called).toBe(false);
  });

  it("una longitud inválida no tumba el formulario y avisa", () => {
    const issues: JsonEngineIssue[] = [];
    const { container } = render(
      <ITSchemaRenderer schema={pantalla({ name: "n", label: "N", minLength: -1 })} onIssue={(issue) => issues.push(issue)} />
    );
    expect(container.querySelector('input[name="n"]')).not.toBeNull();
    expect(issues.some((issue) => issue.code === "JR011")).toBe(true);
  });
});
