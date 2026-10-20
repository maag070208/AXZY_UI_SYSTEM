/**
 * Binding mínimo del motor: resuelve las referencias declarativas del esquema
 * (`$source`, `$state`, `$param`) antes de pintar cada prop.
 *
 * Solo lee y nunca hace red. Una fuente es un **loader**: el componente lo invoca
 * cuando necesita datos (una tabla, al paginar o filtrar) y la función que lo
 * atiende es un `handler` que registra el host por nombre. El esquema no puede
 * nombrar una URL ni un endpoint.
 *
 * Escribir estado llega con las acciones (fase 5); `$row` y `$form` llegan con las
 * tablas y los formularios (fase 8). Hasta entonces avisan con `JR032`.
 */

import { issue, type JsonEngineIssue } from "../shared/errors";
import { formatPath, type SchemaPath } from "../shared/paths";
import type { DataSourceSchema, SchemaValue } from "../kernel/types";

/**
 * Handler que registra el host. Recibe la query que pide el componente (por ejemplo,
 * página y filtros de una tabla) y los parámetros declarados en la fuente.
 */
export type DataHandler = (query: unknown, params: Record<string, SchemaValue>) => unknown;

/** Función de carga que recibe el componente. Siempre devuelve una promesa. */
export type DataLoader = (query?: unknown) => Promise<unknown>;

/** Lo que el binding necesita del esquema, del host y del render en curso. */
export interface BindingScope {
  /** Fuentes declaradas por la pantalla (`ScreenSchema.data`). */
  data?: Record<string, DataSourceSchema>;
  /** Estado inicial de la pantalla (`ScreenSchema.state`). */
  state?: Record<string, SchemaValue>;
  /** Parámetros de la ruta, aportados por el host (`$param`). */
  params?: Record<string, SchemaValue>;
  /** Handlers que registra el host, por nombre. */
  handlers?: Record<string, DataHandler>;
  /** Recibe los avisos del binding (`JR030`, `JR032`). */
  report: (aviso: JsonEngineIssue) => void;
  /** Resuelve el resto de valores (por ejemplo, textos `{ i18n }`). Lo aporta el host. */
  host?: (value: unknown, path: SchemaPath) => unknown;
}

/** Resolutor de valores que consume el kernel al pintar cada prop. */
export type BindingResolver = (value: unknown, path: SchemaPath) => unknown;

/** Operadores que el binding mínimo sabe resolver. */
const SUPPORTED_REFERENCES = ["$source", "$state", "$param"] as const;

/** `true` cuando la clave existe en el objeto (sin heredar de la cadena de prototipos). */
function own(record: object | undefined, key: string): boolean {
  return record !== undefined && Object.prototype.hasOwnProperty.call(record, key);
}

/** `true` cuando el valor es un objeto con alguna clave que empieza por `$`. */
function isDollarReference(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.keys(value).some((key) => key.startsWith("$"));
}

/** Aviso de referencia sin valor o no soportada. */
function referenceIssue(message: string, path: SchemaPath, hint: string): JsonEngineIssue {
  return issue("JR032", message, formatPath(path), { severity: "warning", hint });
}

/**
 * Crea el resolutor de valores de una pantalla.
 *
 * Las referencias se resuelven aquí; el resto de valores pasa al `host`. Los
 * loaders de fuente no llaman a ningún handler hasta que el componente los invoca.
 *
 * @example
 * const resolve = createBindingResolver({
 *   data: { usuarios: { handler: "usuarios" } },
 *   handlers: { usuarios: (query) => fetchUsuarios(query) },
 *   report: (aviso) => issues.push(aviso),
 * });
 * resolve({ $source: "usuarios" }, ["content", 0]); // loader (no se llama aún)
 */
export function createBindingResolver(scope: BindingScope): BindingResolver {
  /** Lee `$state` o `$param`. Si no hay valor, avisa y devuelve `undefined`. */
  const readValue = (
    table: Record<string, SchemaValue> | undefined,
    kind: "$state" | "$param",
    key: string,
    path: SchemaPath
  ): SchemaValue | undefined => {
    if (own(table, key)) return table![key];
    scope.report(
      referenceIssue(
        `La referencia \`${kind}: "${key}"\` no tiene valor.`,
        path,
        kind === "$state" ? "Declara el valor en `state` del esquema." : "El host debe pasar el parámetro en `params`."
      )
    );
    return undefined;
  };

  /** Resuelve los parámetros de una fuente. Solo admite valores y `$state`/`$param`. */
  const resolveParams = (declared: Record<string, SchemaValue> | undefined, path: SchemaPath) => {
    const resolved: Record<string, SchemaValue> = {};
    for (const [name, raw] of Object.entries(declared ?? {})) {
      if (!isDollarReference(raw)) {
        resolved[name] = raw;
        continue;
      }
      const [key] = Object.keys(raw).filter((candidate) => candidate.startsWith("$"));
      if (key === "$state" && typeof raw[key] === "string") {
        const value = readValue(scope.state, "$state", raw[key] as string, path);
        if (value !== undefined) resolved[name] = value;
      } else if (key === "$param" && typeof raw[key] === "string") {
        const value = readValue(scope.params, "$param", raw[key] as string, path);
        if (value !== undefined) resolved[name] = value;
      } else {
        scope.report(
          referenceIssue(
            "Un parámetro de fuente solo admite valores, `$state` o `$param`.",
            path,
            "Las fuentes no se encadenan: declara la fuente sin referencias a otras fuentes."
          )
        );
      }
    }
    return resolved;
  };

  /** Loader que falla de forma controlada: avisa con `JR030` y rechaza la carga. */
  const failingLoader = (message: string, path: SchemaPath, hint: string): DataLoader => {
    scope.report(issue("JR030", message, formatPath(path), { severity: "error", hint }));
    return () => Promise.reject(new Error(message));
  };

  /** Crea el loader de una fuente declarada. No invoca el handler todavía. */
  const sourceLoader = (name: string, path: SchemaPath): DataLoader => {
    if (!own(scope.data, name)) {
      return failingLoader(
        `La fuente \`${name}\` no está declarada en \`data\`.`,
        path,
        "Declárala en `data` del esquema con el `handler` que registra el host."
      );
    }
    const declared = scope.data![name];
    const handler = own(scope.handlers, declared.handler) ? scope.handlers![declared.handler] : undefined;
    if (typeof handler !== "function") {
      return failingLoader(
        `El handler \`${declared.handler}\` no está registrado por el host.`,
        path,
        "El host debe registrarlo en `dataHandlers` del renderizador."
      );
    }
    const params = resolveParams(declared.params, path);
    // Dentro de la promesa: un handler que lanza se convierte en rechazo, no en error del render.
    return (query) => new Promise((resolve) => resolve(handler(query, params)));
  };

  /** Resuelve una referencia `$…` de una prop. Operadores no soportados avisan. */
  const resolveReference = (ref: Record<string, unknown>, path: SchemaPath): unknown => {
    const keys = Object.keys(ref).filter((key) => key.startsWith("$"));
    const [key] = keys;
    if (keys.length !== 1 || !(SUPPORTED_REFERENCES as readonly string[]).includes(key) || typeof ref[key] !== "string") {
      scope.report(
        referenceIssue(
          `Referencia no soportada: ${keys.join(", ") || "sin operador"}.`,
          path,
          "Soportadas: `$source`, `$state` y `$param`. Los demás operadores llegan con las acciones y las tablas."
        )
      );
      return undefined;
    }
    const name = ref[key] as string;
    if (key === "$source") return sourceLoader(name, path);
    if (key === "$state") return readValue(scope.state, "$state", name, path);
    return readValue(scope.params, "$param", name, path);
  };

  return (value, path) => {
    if (isDollarReference(value)) return resolveReference(value, path);
    return scope.host ? scope.host(value, path) : value;
  };
}
