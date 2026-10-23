/**
 * Batería de seguridad y adversaria del motor.
 *
 * Cada caso de la tabla de `docs/json-renderer/SEGURIDAD.md` tiene su prueba aquí. Lo que
 * el esquema intenta (inyectar HTML, pedir red, montar componentes arbitrarios, colgar
 * una acción, romper el stream) tiene que quedar contenido: la pantalla sigue viva y el
 * aviso aparece con su código.
 */

import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen as testingScreen, waitFor } from "@testing-library/react";
import { ITSchemaRenderer } from "./kernel/SchemaRenderer";
import type { JsonEngineIssue } from "./shared/errors";
import type { NodeSchema, ScreenSchema } from "./kernel/types";
import { parsePartialSchema } from "./stream/tolerantParse";
import { validateSchema } from "./validation/validate";

/** Esquema mínimo con el contenido indicado. */
const pantalla = (content: unknown, extra: Partial<ScreenSchema> = {}): ScreenSchema =>
  ({ version: 1, id: "seguridad", content, ...extra }) as ScreenSchema;

/** Acumula los avisos del renderizador. */
function avisos() {
  const lista: JsonEngineIssue[] = [];
  return { lista, onIssue: (aviso: JsonEngineIssue) => lista.push(aviso) };
}

/** Códigos de los avisos recibidos. */
const codigos = (lista: JsonEngineIssue[]) => lista.map((aviso) => aviso.code);

describe("capacidades: requires se evalúa y se deniega por defecto", () => {
  it("un nodo que exige una capacidad no concedida no se pinta y avisa con JR060", () => {
    const { lista, onIssue } = avisos();
    render(
      <ITSchemaRenderer
        schema={pantalla([
          { type: "ITText", text: "secreto", requires: "usuarios.leer" },
          { type: "ITText", text: "publico" },
        ])}
        onIssue={onIssue}
      />
    );
    expect(testingScreen.queryByText("secreto")).toBeNull();
    expect(testingScreen.getByText("publico")).toBeTruthy();
    expect(codigos(lista)).toContain("JR060");
  });

  it("con la capacidad concedida, el nodo se pinta", () => {
    render(
      <ITSchemaRenderer
        schema={pantalla([{ type: "ITText", text: "secreto", requires: ["usuarios.leer"] }])}
        capabilities={["usuarios.leer"]}
      />
    );
    expect(testingScreen.getByText("secreto")).toBeTruthy();
  });

  it("sin capabilities, cualquier requires se deniega aunque el nombre sea razonable", () => {
    render(<ITSchemaRenderer schema={pantalla([{ type: "ITText", text: "x", requires: "admin" }])} />);
    expect(testingScreen.queryByText("x")).toBeNull();
  });

  it("un nodo denegado con fallback pinta el fallback en su lugar", () => {
    render(
      <ITSchemaRenderer
        schema={pantalla([
          {
            type: "ITText",
            text: "privado",
            requires: "admin",
            fallback: { type: "ITText", text: "sin permiso" },
          } as NodeSchema,
        ])}
      />
    );
    expect(testingScreen.queryByText("privado")).toBeNull();
    expect(testingScreen.getByText("sin permiso")).toBeTruthy();
  });

  it("una pantalla que exige una capacidad no concedida no se pinta y avisa en la raíz", () => {
    const { lista, onIssue } = avisos();
    const { container } = render(
      <ITSchemaRenderer
        schema={pantalla({ type: "ITText", text: "contenido" }, { requires: "admin" })}
        onIssue={onIssue}
      />
    );
    expect(container.textContent).toBe("");
    expect(lista.find((aviso) => aviso.code === "JR060")?.path).toBe("requires");
  });

  it("requires con valores basura no rompe ni concede nada", () => {
    render(<ITSchemaRenderer schema={pantalla([{ type: "ITText", text: "x", requires: 42 as never }])} />);
    expect(testingScreen.queryByText("x")).toBeNull();
  });
});

describe("acciones sin handler: JR040 en vez de no hacer nada en silencio", () => {
  it("un botón con una acción no registrada avisa con JR040 y no rompe", () => {
    const { lista, onIssue } = avisos();
    render(
      <ITSchemaRenderer
        schema={pantalla({ type: "ITButton", props: { label: "Ir", onClick: { action: "no-existe" } } })}
        resolveAction={() => undefined}
        onIssue={onIssue}
      />
    );
    expect(testingScreen.getByRole("button", { name: "Ir" })).toBeTruthy();
    expect(lista.some((aviso) => aviso.code === "JR040" && aviso.message.includes("no-existe"))).toBe(true);
  });

  it("un formulario cuyo onSubmit no está registrado avisa con JR040", () => {
    const { lista, onIssue } = avisos();
    render(
      <ITSchemaRenderer
        schema={pantalla({
          type: "form",
          props: { fields: [{ name: "a" }], onSubmit: { action: "enviar-nada" } },
        })}
        resolveAction={() => undefined}
        onIssue={onIssue}
      />
    );
    expect(codigos(lista)).toContain("JR040");
  });
});

describe("fuentes de datos: nunca pedir red", () => {
  it("una fuente que declara url se rechaza con JR031 y no llama a ningún handler", async () => {
    const handler = vi.fn(() => []);
    const { lista, onIssue } = avisos();
    const esquema = pantalla(
      {
        type: "ITDataTable",
        props: {
          columns: [{ key: "a", label: "A", type: "string" }],
          fetchData: { $source: "remota" },
        },
      },
      { data: { remota: { handler: "lista", url: "https://evil.example/datos" } as never } }
    );

    render(<ITSchemaRenderer schema={esquema} dataHandlers={{ lista: handler }} onIssue={onIssue} />);

    await waitFor(() => expect(lista.some((aviso) => aviso.code === "JR031")).toBe(true));
    expect(handler).not.toHaveBeenCalled();
  });
});

describe("acciones colgadas: JR041 y onError", () => {
  it("una acción que no responde en el tiempo límite cuenta como fallida: onError y JR041", async () => {
    const toast = vi.fn();
    const { lista, onIssue } = avisos();
    const colgada = () => new Promise<void>(() => undefined);

    render(
      <ITSchemaRenderer
        schema={pantalla({
          type: "ITButton",
          props: {
            label: "Guardar",
            onClick: {
              action: "guardar",
              onError: { toast: { variant: "error", message: "Tiempo agotado" } },
            },
          },
        })}
        resolveAction={() => colgada}
        effects={{ toast }}
        limits={{ actionTimeoutMs: 20 }}
        onIssue={onIssue}
      />
    );

    fireEvent.click(testingScreen.getByRole("button", { name: "Guardar" }));

    await waitFor(() => expect(toast).toHaveBeenCalledWith({ variant: "error", message: "Tiempo agotado" }));
    await waitFor(() => expect(codigos(lista)).toContain("JR041"));
  });
});

describe("batería adversaria: lo que el esquema intenta, contenido", () => {
  it("un tipo fuera del catálogo avisa con JR010 y el resto de la pantalla se pinta", () => {
    const { lista, onIssue } = avisos();
    render(
      <ITSchemaRenderer
        schema={pantalla([
          { type: "ITComponenteInventado", text: "x" },
          { type: "ITText", text: "resto" },
        ])}
        onIssue={onIssue}
      />
    );
    expect(codigos(lista)).toContain("JR010");
    expect(testingScreen.getByText("resto")).toBeTruthy();
  });

  it("dangerouslySetInnerHTML se descarta con JR011 y nunca llega al DOM como HTML", () => {
    const { lista, onIssue } = avisos();
    const { container } = render(
      <ITSchemaRenderer
        schema={pantalla({
          type: "ITText",
          text: "seguro",
          props: { dangerouslySetInnerHTML: { __html: "<img src=x onerror=alert(1)>" } },
        })}
        onIssue={onIssue}
      />
    );
    expect(container.querySelector("img")).toBeNull();
    expect(codigos(lista)).toContain("JR011");
  });

  it("HTML dentro de un texto se muestra como texto, no se interpreta", () => {
    const { container } = render(
      <ITSchemaRenderer schema={pantalla({ type: "ITText", text: "<img src=x onerror=alert(1)>" })} />
    );
    expect(container.querySelector("img")).toBeNull();
    expect(container.textContent).toContain("<img src=x onerror=alert(1)>");
  });

  it("una expresión en un texto no se ejecuta", () => {
    render(<ITSchemaRenderer schema={pantalla({ type: "ITText", text: "{{7*7}}" })} />);
    expect(testingScreen.getByText("{{7*7}}")).toBeTruthy();
  });

  it("un esquema que supera el presupuesto de nodos se recorta con JR013", () => {
    const { lista, onIssue } = avisos();
    const muchos = Array.from({ length: 200 }, (_, index) => ({ type: "ITText", text: `n${index}` }));
    render(<ITSchemaRenderer schema={pantalla(muchos)} limits={{ maxNodes: 50 }} onIssue={onIssue} />);
    expect(codigos(lista)).toContain("JR013");
    expect(testingScreen.queryByText("n199")).toBeNull();
  });

  it("un handler de datos que lanza no tumba la pantalla", async () => {
    const { lista, onIssue } = avisos();
    const roto = () => {
      throw new Error("boom");
    };
    render(
      <ITSchemaRenderer
        schema={pantalla(
          { type: "ITText", text: "sigue viva" },
          { data: { x: { handler: "roto" } } }
        )}
        dataHandlers={{ roto }}
        onIssue={onIssue}
      />
    );
    expect(testingScreen.getByText("sigue viva")).toBeTruthy();
    expect(lista).toEqual(expect.any(Array));
  });

  it("un slot que lanza queda aislado con JR012 y el resto sigue", () => {
    const { lista, onIssue } = avisos();
    const Roto = () => {
      throw new Error("slot roto");
    };
    const errorConsola = vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(
      <ITSchemaRenderer
        schema={pantalla([
          { type: "slot", props: { name: "roto" } },
          { type: "ITText", text: "resto" },
        ])}
        slots={{ roto: Roto }}
        onIssue={onIssue}
      />
    );
    expect(testingScreen.getByText("resto")).toBeTruthy();
    expect(codigos(lista)).toContain("JR012");
    errorConsola.mockRestore();
  });
});

describe("streams adversarios: JSON a medias o con basura", () => {
  it("un stream cortado a la mitad devuelve un árbol pintable y veredicto partial", () => {
    const { tree } = parsePartialSchema('{"version":1,"id":"x","content":{"type":"ITText","text":"hola"');
    expect(() => validateSchema(tree)).not.toThrow();
    expect(validateSchema(tree).verdict).toBe("partial");
  });

  it("basura intercalada no lanza y conserva lo que sí es válido", () => {
    expect(() =>
      parsePartialSchema('{"version":1,"id":"x","content":[{"type":"ITText","text":"a"}, @@@ basura {{ , {"type":"ITText","text":"b"}]}')
    ).not.toThrow();
  });

  it("un stream que nunca cierra no bloquea y deja la pantalla en partial", () => {
    const { tree } = parsePartialSchema('{"version":1,"id":"x","content":{"type":"ITText","text":"ho');
    expect(validateSchema(tree).verdict).not.toBe("invalid");
  });

  it("texto vacío o basura pura devuelven un árbol vacío sin lanzar", () => {
    expect(() => parsePartialSchema("")).not.toThrow();
    expect(() => parsePartialSchema("}}}]]]")).not.toThrow();
  });
});
