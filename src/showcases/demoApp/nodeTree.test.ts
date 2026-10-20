import { describe, expect, it } from "vitest";
import { leerNodo, listarNodos } from "./nodeTree";

const esquema = {
  version: 1,
  id: "demo",
  content: [
    { type: "ITStack", id: "raiz", children: [
      { type: "ITText", text: "hola" },
      { type: "ITButton", id: "cta", props: { label: "Ir" } },
      { type: "ITCard", children: [{ type: "ITChip", props: { label: "x" } }] },
    ] },
  ],
};

describe("inspector de nodos", () => {
  it("lista los nodos con su ruta numérica", () => {
    const nodos = listarNodos(esquema);
    expect(nodos.map((n) => n.tipo)).toEqual(["ITStack", "ITText", "ITButton", "ITCard", "ITChip"]);
    expect(nodos[2].ruta).toEqual([0, 1]);
    expect(nodos[2].etiqueta).toContain("#cta");
  });

  it("devuelve el subárbol de una ruta", () => {
    expect(leerNodo(esquema, [0, 2])).toMatchObject({ type: "ITCard" });
    expect(leerNodo(esquema, [0, 1])).toMatchObject({ type: "ITButton", id: "cta" });
  });

  it("la ruta vacía es el esquema completo", () => {
    expect(leerNodo(esquema, [])).toBe(esquema);
  });

  it("corta la lista a 40 nodos y sobrevive a basura", () => {
    const grande = { content: Array.from({ length: 60 }, () => ({ type: "ITText", text: "x" })) };
    expect(listarNodos(grande)).toHaveLength(40);
    expect(listarNodos(null)).toEqual([]);
    expect(leerNodo(esquema, [9, 9])).toBeUndefined();
  });
});
