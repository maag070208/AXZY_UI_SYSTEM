import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen as testingScreen } from "@testing-library/react";
import { validateSchema } from "../validation/validate";
import type { JsonEngineIssue } from "../shared/errors";
import { ITSchemaRenderer } from "./SchemaRenderer";
import type { SlotRegistry } from "./slots";
import type { NodeSchema, ScreenSchema } from "./types";

/** Esquema mínimo con el contenido indicado. */
const screen = (content: NodeSchema | NodeSchema[], extra: Partial<ScreenSchema> = {}): ScreenSchema => ({
  version: 1,
  id: "slots",
  content,
  ...extra,
});

/** Acumula los avisos del renderizador. */
function collectIssues() {
  const issues: JsonEngineIssue[] = [];
  return { issues, onIssue: (issue: JsonEngineIssue) => issues.push(issue) };
}

describe("slots", () => {
  it("monta el componente registrado con los props del nodo ya resueltos, sin el nombre", () => {
    const Resumen = vi.fn((props: Record<string, unknown>) => <p>{`Resumen ${String(props.titulo)}`}</p>);
    const slots: SlotRegistry = { resumen: Resumen };

    render(
      <ITSchemaRenderer
        schema={screen(
          { type: "slot", props: { name: "resumen", titulo: { $state: "titulo" } } },
          { state: { titulo: "Pedidos" } }
        )}
        slots={slots}
      />
    );

    expect(testingScreen.getByText("Resumen Pedidos")).toBeTruthy();
    const props = Resumen.mock.calls[0][0];
    expect(props).toMatchObject({ titulo: "Pedidos" });
    expect(props).not.toHaveProperty("name");
  });

  it("un nombre que el host no registró avisa con JR010 y no pinta nada", () => {
    const { issues, onIssue } = collectIssues();
    const { container } = render(
      <ITSchemaRenderer
        schema={screen([
          { type: "slot", props: { name: "inexistente" } },
          { type: "ITText", text: "resto" },
        ])}
        slots={{}}
        onIssue={onIssue}
      />
    );

    expect(issues.some((issue) => issue.code === "JR010" && issue.message.includes("inexistente"))).toBe(true);
    expect(testingScreen.getByText("resto")).toBeTruthy();
    expect(container.textContent).toBe("resto");
  });

  it("un slot sin `props.name` avisa con JR011", () => {
    const { issues, onIssue } = collectIssues();
    render(<ITSchemaRenderer schema={screen({ type: "slot", props: {} })} slots={{}} onIssue={onIssue} />);
    expect(issues.some((issue) => issue.code === "JR011")).toBe(true);
  });

  it("un slot que lanza se aísla: el resto de la pantalla sigue pintándose", () => {
    const { issues, onIssue } = collectIssues();
    const Roto = () => {
      throw new Error("fallo del slot");
    };
    const errorConsola = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ITSchemaRenderer
        schema={screen([
          { type: "slot", props: { name: "roto" } },
          { type: "ITText", text: "sigue viva" },
        ])}
        slots={{ roto: Roto }}
        onIssue={onIssue}
      />
    );

    expect(testingScreen.getByText("sigue viva")).toBeTruthy();
    expect(issues.some((issue) => issue.code === "JR012")).toBe(true);
    errorConsola.mockRestore();
  });
});

describe("validación de slots", () => {
  it("un slot con nombre es válido aunque el host lo registre después", () => {
    const informe = validateSchema(screen({ type: "slot", props: { name: "resumen" } }));
    expect(informe.verdict).toBe("valid");
  });

  it("un slot sin nombre es un error de validación (JR011)", () => {
    const informe = validateSchema(screen({ type: "slot", props: { titulo: "x" } }));
    expect(informe.verdict).toBe("invalid");
    expect(informe.errors[0]).toMatchObject({ code: "JR011" });
  });
});
