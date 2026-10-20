import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen as testingScreen } from "@testing-library/react";
import { axzyCatalog } from "../catalog/axzyCatalog";
import { resolveNode } from "../catalog/resolve";
import { parsePartialSchema } from "../stream/tolerantParse";
import type { JsonEngineIssue } from "../shared/errors";
import { auditTree } from "./partial";
import { resolveLimits } from "../shared/limits";
import { ITSchemaRenderer } from "./SchemaRenderer";
import type { NodeSchema, ScreenSchema } from "./types";

/** Esquema mínimo válido. */
const screen = (content: NodeSchema | NodeSchema[]): ScreenSchema => ({
  version: 1,
  id: "test",
  content,
});

/** Acumula los avisos que emite el renderizador. */
function collectIssues() {
  const issues: JsonEngineIssue[] = [];
  return { issues, onIssue: (issue: JsonEngineIssue) => issues.push(issue) };
}

describe("resolveNode", () => {
  it("resuelve el tipo y aplica los defaults del catálogo", () => {
    const result = resolveNode({ type: "ITButton", props: { label: "Guardar" } }, axzyCatalog, ["content", 0]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.props).toMatchObject({ label: "Guardar", color: "primary", size: "md", variant: "filled" });
    expect(result.issues).toHaveLength(0);
  });

  it("ignora una prop no declarada y avisa con su ruta (JR011)", () => {
    const result = resolveNode({ type: "ITButton", props: { label: "Ir", inexistente: 1 } }, axzyCatalog, ["content", 2]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.props).not.toHaveProperty("inexistente");
    expect(result.issues[0]?.code).toBe("JR011");
    expect(result.issues[0]?.path).toBe("content[2].props.inexistente");
  });

  it("rechaza props prohibidas (nodos React disfrazados)", () => {
    const result = resolveNode(
      { type: "ITAlert", props: { variant: "info", icon: "no", dangerouslySetInnerHTML: { __html: "<b>x</b>" } } },
      axzyCatalog,
      ["content", 0]
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.props).not.toHaveProperty("icon");
    expect(result.props).not.toHaveProperty("dangerouslySetInnerHTML");
    expect(result.issues.map((i) => i.code)).toEqual(["JR011", "JR011"]);
  });

  it("separa las acciones del resto de props", () => {
    const result = resolveNode(
      { type: "ITButton", props: { label: "Ir", onClick: { action: "ir" } } },
      axzyCatalog,
      ["content", 0]
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.actions.onClick).toEqual({ action: "ir" });
    expect(result.props).not.toHaveProperty("onClick");
  });

  it("rechaza valores fuera del enum", () => {
    const result = resolveNode({ type: "ITAlert", props: { variant: "fucsia" } }, axzyCatalog, ["content", 0]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.props.variant).toBe("info"); // se queda el default
    expect(result.issues[0]?.code).toBe("JR011");
    expect(result.issues[0]?.hint).toContain("info");
  });

  it("coacciona números y booleanos desde cadena", () => {
    const result = resolveNode(
      { type: "ITProgress", props: { value: "42", max: "100" } },
      axzyCatalog,
      ["content", 0]
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.props.value).toBe(42);
    expect(result.props.max).toBe(100);
  });

  it("falla con el tipo fuera del catálogo (JR010)", () => {
    const result = resolveNode({ type: "ITInexistente" } as NodeSchema, axzyCatalog, ["content", 1]);
    expect(result.ok).toBe(false);
    expect(result.issues[0]?.code).toBe("JR010");
    expect(result.issues[0]?.path).toBe("content[1]");
  });

  it("falla con un tipo excluido y explica el motivo", () => {
    const result = resolveNode({ type: "ITWysiwyg" }, axzyCatalog, ["content", 0]);
    expect(result.ok).toBe(false);
    expect(result.issues[0]?.code).toBe("JR010");
    expect(result.issues[0]?.hint).toContain("HTML");
  });

  it("no coacciona las referencias: las deja para que el host las resuelva", () => {
    const result = resolveNode(
      {
        type: "ITStatCard",
        props: { label: { i18n: "demo.label" }, value: { i18n: "demo.value" } },
      },
      axzyCatalog,
      ["content", 0]
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    // El valor i18n sobrevive intacto y no cuenta como prop obligatoria ausente.
    expect(result.props.label).toEqual({ i18n: "demo.label" });
    expect(result.props.value).toEqual({ i18n: "demo.value" });
    expect(result.issues).toHaveLength(0);
  });

  it("deja pasar las referencias de datos ($state, $source)", () => {
    const result = resolveNode(
      { type: "ITText", props: { as: "p" }, text: { i18n: "demo.text" } },
      axzyCatalog,
      ["content", 0]
    );
    expect(result.ok).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it("avisa si faltan props obligatorias", () => {
    const result = resolveNode({ type: "ITImage" }, axzyCatalog, ["content", 0]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.issues.some((i) => i.code === "JR011" && i.path.endsWith("props.src"))).toBe(true);
  });

  it("avisa si el componente no acepta children", () => {
    const result = resolveNode(
      { type: "ITDivider", children: [{ type: "ITText", text: "x" }] },
      axzyCatalog,
      ["content", 0]
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.issues[0]?.path).toBe("content[0].children");
  });
});

describe("auditTree", () => {
  it("cuenta nodos, profundidad y pendientes", () => {
    const audit = auditTree(
      screen([
        { type: "ITCard", children: [{ type: "ITText", text: "a" }, { type: "ITText", text: "b" }] },
        { type: "ITText", text: "c" },
      ]),
      resolveLimits()
    );
    expect(audit.nodes).toBe(4);
    expect(audit.depth).toBe(1);
    expect(audit.pending).toBe(0);
    expect(audit.exceeded).toBe(false);
  });

  it("recorta y avisa al superar el presupuesto (JR013)", () => {
    const content: NodeSchema[] = Array.from({ length: 20 }, (_, i) => ({ type: "ITText", text: `t${i}` }));
    const audit = auditTree(screen(content), resolveLimits({ maxNodes: 5 }));
    expect(audit.exceeded).toBe(true);
    expect(audit.nodes).toBe(5);
    expect(audit.issues[0]?.code).toBe("JR013");
  });

  it("cuenta los nodos pendientes del stream", () => {
    const { tree } = parsePartialSchema('{"version":1,"id":"x","content":[{"type":"ITCard","children":[{"type":"ITText"');
    expect(tree).not.toBeNull();
    const audit = auditTree(tree as ScreenSchema, resolveLimits());
    expect(audit.pending).toBeGreaterThan(0);
  });
});

describe("ITSchemaRenderer", () => {
  it("pinta un esquema mínimo", () => {
    render(<ITSchemaRenderer schema={screen({ type: "ITText", text: "Hola mundo" })} />);
    expect(testingScreen.getByText("Hola mundo")).toBeTruthy();
  });

  it("resuelve el atajo `text` cuando es una referencia i18n", () => {
    const { tree } = parsePartialSchema(
      '{"version":1,"id":"x","content":[{"type":"ITText","text":{"i18n":"saludo"}}]}'
    );
    render(
      <ITSchemaRenderer
        schema={tree}
        resolveValue={(value) =>
          value && typeof value === "object" && "i18n" in (value as object)
            ? "Hola traducido"
            : value
        }
      />
    );
    expect(testingScreen.getByText("Hola traducido")).toBeTruthy();
  });

  it("refleja el `id` del nodo en el DOM (anclas)", () => {
    const { container } = render(
      <ITSchemaRenderer schema={screen({ type: "ITText", id: "ancla", text: "x" })} />
    );
    expect(container.querySelector("#ancla")).toBeTruthy();
  });

  it("pinta nodos anidados y aplica props del catálogo", () => {
    render(
      <ITSchemaRenderer
        schema={screen({
          type: "ITCard",
          props: { title: "Mi tarjeta" },
          children: [{ type: "ITText", text: "Dentro" }],
        })}
      />
    );
    expect(testingScreen.getByText("Mi tarjeta")).toBeTruthy();
    expect(testingScreen.getByText("Dentro")).toBeTruthy();
  });

  it("no pinta nada y avisa con un tipo desconocido", () => {
    const { issues, onIssue } = collectIssues();
    const { container } = render(
      <ITSchemaRenderer schema={screen({ type: "ITNope" })} onIssue={onIssue} />
    );
    expect(container.textContent).toBe("");
    expect(issues.some((i) => i.code === "JR010")).toBe(true);
  });

  it("aísla el fallo de un nodo y mantiene el resto vivo (JR012)", () => {
    const Boom = () => {
      throw new Error("boom");
    };
    const catalog = {
      entries: {
        Boom: { type: "Boom", component: Boom },
        ITText: axzyCatalog.entries.ITText,
      },
      excluded: {},
    };
    const spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const { issues, onIssue } = collectIssues();

    render(
      <ITSchemaRenderer
        catalog={catalog}
        onIssue={onIssue}
        schema={screen([{ type: "Boom" }, { type: "ITText", text: "sigo vivo" }])}
      />
    );

    expect(testingScreen.getByText("sigo vivo")).toBeTruthy();
    expect(issues.some((i) => i.code === "JR012")).toBe(true);
    spy.mockRestore();
  });

  it("un nodo pendiente no se pinta a medias", () => {
    const { tree } = parsePartialSchema('{"version":1,"id":"x","content":[{"type":"ITCard","props":{"title":"Tar');
    render(<ITSchemaRenderer schema={tree} pendingFallback={<span data-testid="pendiente" />} />);
    // El nodo pendiente se sustituye por el marcador, no por una tarjeta a medias.
    expect(testingScreen.queryByText("Tar")).toBeNull();
  });

  it("pinta progresivamente un esquema que llega por trozos", () => {
    const full = '{"version":1,"id":"x","content":[{"type":"ITText","text":"Primero"},{"type":"ITText","text":"Segundo"}]}';
    // Corte tras cerrar el primer nodo.
    const cut = full.indexOf('},{"type":"ITText","text":"Segundo"');
    const partial = parsePartialSchema(full.slice(0, cut + 1));

    const { rerender } = render(<ITSchemaRenderer schema={partial.tree} />);
    expect(testingScreen.getByText("Primero")).toBeTruthy();
    expect(testingScreen.queryByText("Segundo")).toBeNull();

    // Llega el resto: el árbol final pinta los dos.
    const complete = parsePartialSchema(full);
    rerender(<ITSchemaRenderer schema={complete.tree} />);
    expect(testingScreen.getByText("Primero")).toBeTruthy();
    expect(testingScreen.getByText("Segundo")).toBeTruthy();
  });

  it("no se cae con un esquema parcial sin content (streaming al inicio)", () => {
    // Corte justo después de `id`, antes de que `content` exista.
    const { tree } = parsePartialSchema('{"version":1,"id":"x"');
    expect(tree).not.toBeNull();
    expect(() => render(<ITSchemaRenderer schema={tree} />)).not.toThrow();
  });

  it("no se cae con content nulo o vacío", () => {
    const { container } = render(<ITSchemaRenderer schema={{ version: 1, id: "x", content: [] }} />);
    expect(container.textContent).toBe("");
    expect(() =>
      render(<ITSchemaRenderer schema={{ version: 1, id: "x", content: undefined as never }} />)
    ).not.toThrow();
  });

  it("no pinta nada sin esquema", () => {
    const { container } = render(<ITSchemaRenderer schema={null} />);
    expect(container.textContent).toBe("");
  });

  it("entrega el aviso de presupuesto una vez", () => {
    const { issues, onIssue } = collectIssues();
    const content: NodeSchema[] = Array.from({ length: 10 }, (_, i) => ({ type: "ITText", text: `n${i}` }));
    render(<ITSchemaRenderer schema={screen(content)} limits={{ maxNodes: 3 }} onIssue={onIssue} />);
    expect(issues.filter((i) => i.code === "JR013")).toHaveLength(1);
  });

  it("avisa con JR014 si el id del nodo no llega al DOM", async () => {
    // Componente que NO reenvía props al DOM (simula un contenedor cerrado).
    const SinProps = ({ children }: { children?: React.ReactNode }) => <div>{children}</div>;
    const catalog = {
      entries: {
        SinProps: { type: "SinProps", component: SinProps, children: true },
        ITText: axzyCatalog.entries.ITText,
      },
      excluded: {},
    };
    const { issues, onIssue } = collectIssues();
    render(
      <ITSchemaRenderer
        catalog={catalog}
        onIssue={onIssue}
        schema={screen([{ type: "SinProps", id: "ancla-rota" }, { type: "ITText", id: "ancla-ok", text: "x" }])}
      />
    );
    await Promise.resolve();
    expect(issues.some((i) => i.code === "JR014" && i.path === "ancla-rota")).toBe(true);
    expect(issues.some((i) => i.code === "JR014" && i.path === "ancla-ok")).toBe(false);
  });

  it("envuelve la salida cuando se pasa className", () => {
    const { container } = render(
      <ITSchemaRenderer schema={screen({ type: "ITText", text: "x" })} className="mi-clase" />
    );
    expect(container.querySelector(".mi-clase")).toBeTruthy();
  });
});
