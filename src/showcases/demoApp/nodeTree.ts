/** Helpers del inspector de nodos de la documentación (puros y testeables). */

/** Un nodo seleccionable del árbol, con su ruta numérica. */
interface NodoRuta {
  ruta: number[];
  etiqueta: string;
  tipo: string;
}

/** Recorre el árbol y lista los nodos seleccionables (hasta 40). */
export function listarNodos(nodo: unknown, ruta: number[] = [], salida: NodoRuta[] = []): NodoRuta[] {
  if (!nodo || typeof nodo !== "object" || salida.length >= 40) return salida;
  const objeto = nodo as { type?: string; id?: string; children?: unknown; content?: unknown };
  if (typeof objeto.type === "string") {
    salida.push({
      ruta,
      tipo: objeto.type,
      etiqueta: `${objeto.type}${objeto.id ? ` #${objeto.id}` : ""} · ${ruta.join(".")}`,
    });
  }
  const hijos = objeto.children ?? objeto.content;
  const lista = Array.isArray(hijos) ? hijos : hijos ? [hijos] : [];
  lista.forEach((hijo, indice) => listarNodos(hijo, [...ruta, indice], salida));
  return salida;
}

/** Devuelve el subárbol de una ruta numérica. */
export function leerNodo(nodo: unknown, ruta: number[]): unknown {
  return ruta.reduce((actual: unknown, indice) => {
    const objeto = actual as { children?: unknown; content?: unknown } | null;
    const hijos = objeto?.children ?? objeto?.content;
    const lista = Array.isArray(hijos) ? hijos : hijos ? [hijos] : [];
    return lista[indice];
  }, nodo);
}
