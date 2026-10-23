import React from "react";
import { describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useSchemaStream, type StreamSource } from "./useSchemaStream";

/** Documento de ejemplo que llega en trozos. */
const DOCUMENTO = JSON.stringify({
  version: 1,
  id: "stream",
  content: [
    { type: "ITText", text: "Hola" },
    { type: "ITText", text: "Mundo" },
  ],
});

/** Parte un texto en trozos de tamaño fijo, con una pausa entre ellos. */
async function* trozos(texto: string, tamano: number, pausaMs = 1): AsyncGenerator<string> {
  for (let indice = 0; indice < texto.length; indice += tamano) {
    await new Promise((resolve) => setTimeout(resolve, pausaMs));
    yield texto.slice(indice, indice + tamano);
  }
}

/** Espera a que la fuente termine de emitir. */
const hastaTerminar = (result: { current: { streaming: boolean } }) => waitFor(() => expect(result.current.streaming).toBe(false));

describe("useSchemaStream: fuentes", () => {
  it("una cadena completa se pinta de una vez, sin estar en streaming", async () => {
    const { result } = renderHook(() => useSchemaStream(DOCUMENTO));
    await hastaTerminar(result);
    expect(result.current.tree?.id).toBe("stream");
    expect(result.current.status).toBe("complete");
    expect(result.current.issues).toEqual([]);
    expect(result.current.text).toBe(DOCUMENTO);
  });

  it("una cadena sin cerrar avisa con JR080 y conserva lo que sí es válido", async () => {
    const { result } = renderHook(() => useSchemaStream('{"version":1,"id":"x","content":{"type":"ITText","text":"ho'));
    await hastaTerminar(result);
    expect(result.current.status).not.toBe("complete");
    expect(result.current.issues.map((aviso) => aviso.code)).toContain("JR080");
    expect(result.current.tree).not.toBeNull();
  });

  it("un iterable asíncrono muestra árboles parciales y termina con el documento entero", async () => {
    const vistos: (string | null)[] = [];
    // La fuente se crea fuera del render: una fuente nueva en cada render relanzaría el stream.
    const fuente = trozos(DOCUMENTO, 9);
    const { result } = renderHook(() => {
      const estado = useSchemaStream(fuente);
      vistos.push(estado.tree?.id ?? null);
      return estado;
    });
    await hastaTerminar(result);
    expect(result.current.text).toBe(DOCUMENTO);
    expect(result.current.status).toBe("complete");
    expect(result.current.issues).toEqual([]);
    // Hubo renders intermedios con árbol: el documento se fue pintando.
    expect(vistos.filter((id) => id === "stream").length).toBeGreaterThan(1);
  });

  it("un ReadableStream de texto funciona igual que un iterable", async () => {
    const readable = new ReadableStream<string>({
      start(controller) {
        for (let indice = 0; indice < DOCUMENTO.length; indice += 12) controller.enqueue(DOCUMENTO.slice(indice, indice + 12));
        controller.close();
      },
    });
    const { result } = renderHook(() => useSchemaStream(readable));
    await hastaTerminar(result);
    expect(result.current.text).toBe(DOCUMENTO);
    expect(result.current.status).toBe("complete");
  });

  it("si la fuente falla a mitad, se conserva el último árbol válido y se avisa con JR080", async () => {
    async function* fallando(): AsyncGenerator<string> {
      yield DOCUMENTO.slice(0, 60);
      await new Promise((resolve) => setTimeout(resolve, 1));
      throw new Error("red caída");
    }
    const fuente = fallando();
    const { result } = renderHook(() => useSchemaStream(fuente));
    await hastaTerminar(result);
    const aviso = result.current.issues.find((item) => item.code === "JR080");
    expect(aviso?.severity).toBe("error");
    expect(aviso?.message).toContain("red caída");
  });

  it("si el texto deja de ser recuperable, el árbol no se rompe: se queda el último válido", async () => {
    const fuente = trozos(DOCUMENTO.slice(0, 40) + "@@@", 8);
    const { result } = renderHook(() => useSchemaStream(fuente));
    await hastaTerminar(result);
    expect(result.current.tree?.id).toBe("stream");
  });

  it("sin fuente el estado está vacío", () => {
    const { result } = renderHook(() => useSchemaStream(null));
    expect(result.current.tree).toBeNull();
    expect(result.current.streaming).toBe(false);
  });
});

describe("useSchemaStream: montajes y cancelación", () => {
  it("con StrictMode (doble montaje) no se pierde ni se duplica ningún trozo", async () => {
    const fuente = trozos(DOCUMENTO, 7, 2);
    const { result } = renderHook(() => useSchemaStream(fuente), {
      wrapper: ({ children }) => <React.StrictMode>{children}</React.StrictMode>,
    });
    await hastaTerminar(result);
    expect(result.current.text).toBe(DOCUMENTO);
    expect(result.current.issues).toEqual([]);
  });

  it("al desmontar, la fuente recibe return() y deja de emitir", async () => {
    let cerrada = false;
    async function* larga(): AsyncGenerator<string> {
      try {
        for (let indice = 0; indice < 1000; indice += 1) {
          await new Promise((resolve) => setTimeout(resolve, 1));
          yield "x";
        }
      } finally {
        cerrada = true;
      }
    }
    const fuente = larga();
    const { unmount } = renderHook(() => useSchemaStream(fuente));
    await new Promise((resolve) => setTimeout(resolve, 15));
    unmount();
    await waitFor(() => expect(cerrada).toBe(true));
  });

  it("cambiar de fuente reinicia el estado con la nueva", async () => {
    const { result, rerender } = renderHook(({ fuente }: { fuente: StreamSource }) => useSchemaStream(fuente), {
      initialProps: { fuente: '{"version":1,"id":"primera","content":{"type":"ITText","text":"a"}}' },
    });
    await hastaTerminar(result);
    expect(result.current.tree?.id).toBe("primera");

    rerender({ fuente: '{"version":1,"id":"segunda","content":{"type":"ITText","text":"b"}}' });
    await waitFor(() => expect(result.current.tree?.id).toBe("segunda"));
  });
});
