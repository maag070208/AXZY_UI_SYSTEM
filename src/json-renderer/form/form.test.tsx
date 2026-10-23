import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen as testingScreen } from "@testing-library/react";
import { ITSchemaRenderer } from "../kernel/SchemaRenderer";
import type { JsonEngineIssue } from "../shared/errors";
import type { NodeSchema, ScreenSchema } from "../kernel/types";
import { validateSchema } from "../validation/validate";
import { readFormFields, validateField, validateForm, type FormField } from "./rules";

/** Esquema mínimo con un formulario de contacto. */
const pantalla = (fields: unknown, extra: Record<string, unknown> = {}): ScreenSchema =>
  ({
    version: 1,
    id: "formulario",
    content: {
      type: "form",
      id: "contacto",
      props: { fields, onSubmit: { action: "enviar" }, ...extra },
    } as NodeSchema,
  }) as ScreenSchema;

const CAMPOS: FormField[] = [
  { name: "nombre", kind: "text", label: "Nombre", required: true },
  { name: "correo", kind: "email", label: "Correo", required: true },
];

describe("readFormFields", () => {
  const ruta = ["content", 0, "props", "fields"];

  it("lee los campos con su tipo y obligatoriedad", () => {
    const { fields, issues } = readFormFields([{ name: "correo", kind: "email", label: "Correo", required: true }], ruta);
    expect(issues).toEqual([]);
    expect(fields).toEqual([{ name: "correo", kind: "email", required: true, label: "Correo" }]);
  });

  it("un campo sin name se descarta con JR021 y el resto sigue", () => {
    const { fields, issues } = readFormFields([{ kind: "text" }, { name: "ok" }], ruta);
    expect(fields.map((campo) => campo.name)).toEqual(["ok"]);
    expect(issues[0]).toMatchObject({ code: "JR021", severity: "error" });
  });

  it("un name repetido se descarta con JR021", () => {
    const { fields, issues } = readFormFields([{ name: "a" }, { name: "a" }], ruta);
    expect(fields).toHaveLength(1);
    expect(issues[0]).toMatchObject({ code: "JR021" });
  });

  it("un tipo no admitido cae a text con aviso JR011", () => {
    const { fields, issues } = readFormFields([{ name: "edad", kind: "number" }], ruta);
    expect(fields[0].kind).toBe("text");
    expect(issues[0]).toMatchObject({ code: "JR011", severity: "warning" });
  });

  it("si fields no es una lista, avisa con JR021 y no hay campos", () => {
    const { fields, issues } = readFormFields("no-es-lista", ruta);
    expect(fields).toEqual([]);
    expect(issues[0]).toMatchObject({ code: "JR021" });
  });
});

describe("reglas de valor", () => {
  it("required rechaza vacío y solo espacios", () => {
    expect(validateField({ kind: "text", required: true }, "")).toBe("required");
    expect(validateField({ kind: "text", required: true }, "   ")).toBe("required");
    expect(validateField({ kind: "text", required: true }, "Ana")).toBeUndefined();
  });

  it("un campo opcional vacío no falla", () => {
    expect(validateField({ kind: "email", required: false }, "")).toBeUndefined();
  });

  it("email acepta una dirección y rechaza formas incompletas", () => {
    expect(validateField({ kind: "email", required: true }, "ana@axzy.dev")).toBeUndefined();
    expect(validateField({ kind: "email", required: true }, "ana@axzy")).toBe("email");
    expect(validateField({ kind: "email", required: true }, "ana axzy@dev.com")).toBe("email");
    expect(validateField({ kind: "email", required: true }, "sin-arroba")).toBe("email");
  });

  it("validateForm devuelve solo los campos con error", () => {
    expect(validateForm(CAMPOS, { nombre: "Ana", correo: "mal" })).toEqual({ correo: "email" });
    expect(validateForm(CAMPOS, { nombre: "Ana", correo: "ana@axzy.dev" })).toEqual({});
  });
});

describe("validación del esquema con nodos form", () => {
  it("un formulario bien declarado es válido", () => {
    expect(validateSchema(pantalla([{ name: "nombre" }])).verdict).toBe("valid");
  });

  it("un formulario sin fields es inválido con JR021", () => {
    const informe = validateSchema(pantalla(undefined));
    expect(informe.verdict).toBe("invalid");
    expect(informe.errors[0]).toMatchObject({ code: "JR021" });
  });
});

describe("nodo form en pantalla", () => {
  it("pinta un input por campo con su name", () => {
    const { container } = render(<ITSchemaRenderer schema={pantalla(CAMPOS)} />);
    expect(container.querySelector('input[name="nombre"]')).not.toBeNull();
    expect(container.querySelector('input[name="correo"]')).not.toBeNull();
  });

  it("enviar vacío muestra el error traducido y no llama a la acción", () => {
    const onSubmit = vi.fn();
    render(<ITSchemaRenderer schema={pantalla(CAMPOS)} resolveAction={() => onSubmit} />);

    fireEvent.click(testingScreen.getByRole("button", { name: "Enviar" }));

    expect(testingScreen.getAllByText("Campo obligatorio.").length).toBeGreaterThan(0);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("con datos válidos llama a la acción con los valores de los campos", () => {
    const onSubmit = vi.fn();
    const { container } = render(<ITSchemaRenderer schema={pantalla(CAMPOS)} resolveAction={() => onSubmit} />);

    fireEvent.change(container.querySelector('input[name="nombre"]')!, { target: { value: "Ana" } });
    fireEvent.change(container.querySelector('input[name="correo"]')!, { target: { value: "ana@axzy.dev" } });
    fireEvent.click(testingScreen.getByRole("button", { name: "Enviar" }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({ nombre: "Ana", correo: "ana@axzy.dev" });
  });

  it("el error de un campo desaparece al volver a escribir en él", () => {
    const { container } = render(<ITSchemaRenderer schema={pantalla(CAMPOS)} />);
    fireEvent.click(testingScreen.getByRole("button", { name: "Enviar" }));
    expect(testingScreen.getAllByText("Campo obligatorio.").length).toBeGreaterThan(0);

    fireEvent.change(container.querySelector('input[name="nombre"]')!, { target: { value: "A" } });

    // El campo "nombre" ya no tiene error; "correo" sigue en error.
    expect(testingScreen.getAllByText("Campo obligatorio.")).toHaveLength(1);
  });

  it("un campo con un nombre inválido no tumba el formulario y avisa", () => {
    const issues: JsonEngineIssue[] = [];
    const { container } = render(
      <ITSchemaRenderer
        schema={pantalla([{ name: "ok", label: "OK" }, { label: "sin nombre" }])}
        onIssue={(issue) => issues.push(issue)}
      />
    );
    expect(container.querySelector('input[name="ok"]')).not.toBeNull();
    expect(issues.some((issue) => issue.code === "JR021")).toBe(true);
  });
});
