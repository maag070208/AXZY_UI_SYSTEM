/**
 * Errores y avisos del motor de pantallas declarativas.
 *
 * Todo lo que el motor detecta (nodo desconocido, prop prohibida, acción no
 * registrada, permiso insuficiente…) se expresa con un **código estable** y el
 * `path` exacto dentro del esquema. Los códigos son contrato público: están
 * documentados en `docs/json-renderer/PLAN-IMPLEMENTACION.md` §11 y no cambian
 * sin migración.
 */

/** Gravedad de un aviso del motor. */
export type JsonEngineSeverity = "error" | "warning" | "info";

/** Códigos de aviso del motor. Contrato estable. */
export type JsonEngineCode =
  | "JR010" // type fuera del catálogo
  | "JR011" // prop prohibida o no declarada
  | "JR012" // el componente lanzó durante el render (aislado)
  | "JR013" // presupuesto de nodos/profundidad excedido
  | "JR014" // el `id` del nodo no llegó al DOM (el componente no reenvía props)
  | "JR020" // esquema inválido (estructura o versión)
  | "JR021" // nodo inválido (forma o `type` ausente)
  | "JR030" // fuente de datos sin handler registrado
  | "JR031" // el esquema intenta provocar red (prohibido)
  | "JR032" // referencia sin valor o operador de binding no soportado todavía
  | "JR040" // acción no registrada
  | "JR041" // acción excedió su timeout
  | "JR042" // encadenado de efectos demasiado profundo
  | "JR050" // guard de ruta inválido o que lanzó
  | "JR060" // capacidad insuficiente para un nodo
  | "JR061" // capacidad insuficiente para una acción
  | "JR070" // migración de versión ausente
  | "JR080" // stream cortado sin cerrar
  | "JR081"; // trabajo por fragmento excedido

/** Aviso del motor: lo que pasó, dónde y qué hacer. */
export interface JsonEngineIssue {
  /** Código estable (`JR010`…). */
  code: JsonEngineCode;
  /** Gravedad: `error` impide pintar el nodo, `warning` lo pinta con reservas. */
  severity: JsonEngineSeverity;
  /** Mensaje legible, ya traducido por el motor. */
  message: string;
  /** Ruta exacta dentro del esquema (`content[0].children[2].props.onClick`). */
  path: string;
  /** Sugerencia accionable, cuando la hay. */
  hint?: string;
}

/** Error interno del motor: siempre lleva código y ruta. */
export class JsonEngineError extends Error {
  /** Código estable del catálogo de avisos. */
  readonly code: JsonEngineCode;
  /** Ruta del esquema donde se produjo. */
  readonly path: string;
  /** Sugerencia accionable. */
  readonly hint?: string;

  constructor(code: JsonEngineCode, message: string, path: string, hint?: string) {
    super(`${code} ${path ? `en ${path}: ` : ""}${message}`);
    this.name = "JsonEngineError";
    this.code = code;
    this.path = path;
    this.hint = hint;
  }

  /** Convierte el error en el aviso que consume la interfaz y el informe. */
  toIssue(severity: JsonEngineSeverity = "error"): JsonEngineIssue {
    return {
      code: this.code,
      severity,
      message: this.message.replace(/^JR\d{3}\s?(en .*?: )?/, ""),
      path: this.path,
      hint: this.hint,
    };
  }
}

/** Crea un aviso sin lanzar excepción (para flujos tolerantes). */
export function issue(
  code: JsonEngineCode,
  message: string,
  path = "",
  options: { severity?: JsonEngineSeverity; hint?: string } = {}
): JsonEngineIssue {
  return {
    code,
    severity: options.severity ?? "error",
    message,
    path,
    hint: options.hint,
  };
}
