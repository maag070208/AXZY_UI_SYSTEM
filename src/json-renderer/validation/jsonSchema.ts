/**
 * JSON Schema (draft 2020-12) de los documentos del motor: pantallas y rutas.
 *
 * Se **deriva del catálogo** (vía el contrato de vocabulario), igual que el resto de
 * artefactos del motor, así que no se desincroniza. Sirve para dos cosas:
 *
 * - **Autocompletado y avisos en el editor**: el JSON Schema lo lee VS Code (ver
 *   `.vscode/settings.json`), que sugiere `type`, props y valores de enum.
 * - **Tester de documentos**: `pnpm schema:check` valida los JSON con ajv.
 *
 * Es una vista estructural. Las reglas que dependen de datos del host (que una
 * fuente o una acción exista) no están aquí: esas las avisa el motor al pintar.
 */

import { axzyCatalog } from "../catalog/axzyCatalog";
import type { Catalog } from "../catalog/catalog.props";
import { buildVocabularyContract, type PropContract } from "../vocabulary/buildContract";
import { CURRENT_SCHEMA_VERSION } from "./validate";
import { FORM_FIELD_KINDS } from "../form/rules";

/** Un objeto JSON Schema, tal cual se serializa. */
export type JsonSchema = Record<string, unknown>;

/** Dialecto de JSON Schema que usa el generador. */
const DIALECT = "https://json-schema.org/draft/2020-12/schema";

/** Tipos de nodo que el motor compila él mismo, fuera del catálogo. */
const ENGINE_NODE_TYPES = ["slot", "form"] as const;

/** Referencia declarativa: fuente, estado, parámetro o texto traducible. */
const REFERENCE: JsonSchema = {
  type: "object",
  description: "Referencia a un dato del host: fuente (`$source`), estado (`$state`), parámetro de ruta (`$param`) o texto traducible (`i18n`).",
  properties: {
    $source: { type: "string", description: "Fuente declarada en `data` del esquema." },
    $state: { type: "string", description: "Clave del `state` de la pantalla." },
    $param: { type: "string", description: "Parámetro de la dirección (`:id`)." },
    i18n: { type: "string", description: "Clave de traducción." },
    params: { type: "object", description: "Valores para los marcadores `{nombre}` del texto." },
  },
  additionalProperties: false,
  anyOf: [{ required: ["$source"] }, { required: ["$state"] }, { required: ["$param"] }, { required: ["i18n"] }],
};

/** Acción declarada en una prop de tipo `action`. */
const ACTION: JsonSchema = {
  type: "object",
  description: "Acción que resuelve el host por nombre.",
  required: ["action"],
  properties: {
    action: { type: "string", description: "Nombre de la acción registrada por el host." },
    args: { type: "object", description: "Argumentos que recibe el host." },
    confirm: { type: "object", description: "Confirmación previa: `{ title, message }`." },
    then: { type: "array", description: "Efectos tras un resultado correcto.", items: { type: "object" } },
    onError: { type: "object", description: "Efecto si la acción falla." },
    toast: { type: "object", description: "Aviso al usuario: `{ variant, message }`." },
    navigate: { type: "string", description: "Dirección a la que navegar." },
    openOverlay: { type: "string", description: "Overlay a abrir." },
    closeOverlay: { type: "string", description: "Overlay a cerrar." },
    refresh: { type: "string", description: "Fuente de datos a refrescar." },
    set: { type: "object", description: "Escribe en el estado de la pantalla: `{ clave: valor }`. Admite referencias." },
    requires: {
      anyOf: [{ type: "string" }, { type: "array", items: { type: "string" } }],
      description: "Capacidad que exige la acción. Sin concesión, no se ejecuta (JR061).",
    },
  },
  additionalProperties: false,
};

/** Valor de una prop según su tipo del catálogo. Las referencias se admiten en casi todas. */
function kindSchema(prop: PropContract): JsonSchema {
  switch (prop.kind) {
    case "string":
      return { type: "string" };
    case "number":
      return { type: "number" };
    case "integer":
      return { type: "integer" };
    case "boolean":
      return { type: "boolean" };
    case "enum":
      return { type: "string", enum: prop.values ?? [] };
    case "node":
      return { $ref: "#/$defs/node" };
    case "nodes":
      return { type: "array", items: { $ref: "#/$defs/node" } };
    case "columns":
      return { type: "array", items: { type: "object" } };
    case "array":
      return { type: "array" };
    case "object":
      return { type: "object" };
    default:
      // `data`, `i18n`: cualquier valor; el host decide.
      return {};
  }
}

/** Schema de una prop: su tipo o una referencia. Las acciones solo admiten `action`. */
function propSchema(prop: PropContract): JsonSchema {
  if (prop.kind === "action") {
    return { ...ACTION, ...(prop.doc ? { description: prop.doc } : {}) };
  }
  const base = kindSchema(prop);
  const schema: JsonSchema = { anyOf: [base, { $ref: "#/$defs/reference" }] };
  if (prop.doc) schema.description = prop.doc;
  return schema;
}

/** Props de un componente: objeto cerrado, con las obligatorias marcadas. */
function propsObjectSchema(props: PropContract[]): JsonSchema {
  const properties: Record<string, JsonSchema> = {};
  for (const prop of props) properties[prop.name] = propSchema(prop);
  const required = props.filter((prop) => prop.required).map((prop) => prop.name);
  return {
    type: "object",
    properties,
    additionalProperties: false,
    ...(required.length > 0 ? { required } : {}),
  };
}

/** Reglas de cada tipo de nodo: props, hijos y texto. Se aplican con `if`/`then`. */
function typeRules(catalog: Catalog): JsonSchema[] {
  const contract = buildVocabularyContract(catalog);
  const rules: JsonSchema[] = contract.components.map((component) => ({
    if: { properties: { type: { const: component.type } }, required: ["type"] },
    then: {
      properties: {
        props: propsObjectSchema(component.props),
        ...(component.children ? {} : { children: false }),
        ...(component.text ? {} : { text: false }),
      },
    },
  }));

  // Slot: el host define sus props, así que solo se exige el nombre.
  rules.push({
    if: { properties: { type: { const: "slot" } }, required: ["type"] },
    then: {
      properties: {
        props: { type: "object", required: ["name"], properties: { name: { type: "string", minLength: 1 } } },
        children: false,
        text: false,
      },
    },
  });

  // Form: campos declarados en JSON, validados por el motor.
  rules.push({
    if: { properties: { type: { const: "form" } }, required: ["type"] },
    then: {
      properties: {
        props: {
          type: "object",
          required: ["fields"],
          additionalProperties: false,
          properties: {
            fields: {
              type: "array",
              items: {
                type: "object",
                required: ["name"],
                additionalProperties: false,
                properties: {
                  name: { type: "string", minLength: 1, description: "Clave del valor enviado." },
                  kind: { type: "string", enum: [...FORM_FIELD_KINDS], description: "Tipo de campo." },
                  label: { $ref: "#/$defs/valueOrReference" },
                  required: { type: "boolean", description: "Si el campo es obligatorio." },
                  minLength: { type: "integer", minimum: 0, description: "Mínimo de caracteres." },
                  maxLength: { type: "integer", minimum: 0, description: "Máximo de caracteres." },
                },
              },
            },
            submitLabel: { $ref: "#/$defs/valueOrReference" },
            onSubmit: { $ref: "#/$defs/action" },
          },
        },
        children: false,
        text: false,
      },
    },
  });

  return rules;
}

/**
 * Genera el JSON Schema de una pantalla (`axzy/screen`).
 *
 * @example
 * JSON.stringify(buildScreenSchema()); // lo que escribe `docs/json-renderer/screen.schema.json`
 */
export function buildScreenSchema(catalog: Catalog = axzyCatalog): JsonSchema {
  const contract = buildVocabularyContract(catalog);
  const types = [...contract.components.map((component) => component.type), ...ENGINE_NODE_TYPES];

  return {
    $schema: DIALECT,
    title: "AXZY · pantalla (axzy/screen)",
    description: "Documento de pantalla del motor declarativo. Lo que no figura aquí no se pinta.",
    type: "object",
    required: ["version", "id", "content"],
    additionalProperties: false,
    properties: {
      $schema: { const: "axzy/screen", description: "Identificador del formato." },
      version: { type: "integer", minimum: 1, maximum: CURRENT_SCHEMA_VERSION, description: "Versión del formato." },
      id: { type: "string", minLength: 1, description: "Identificador de la pantalla." },
      title: { $ref: "#/$defs/valueOrReference", description: "Título, normalmente `{ i18n }`." },
      description: { $ref: "#/$defs/valueOrReference", description: "Descripción corta para la cabecera." },
      requires: { $ref: "#/$defs/requires" },
      data: {
        type: "object",
        description: "Fuentes de datos: cada una nombra un handler que registra el host.",
        additionalProperties: { $ref: "#/$defs/dataSource" },
      },
      state: { type: "object", description: "Estado inicial de la pantalla (lo lee `$state`)." },
      content: {
        description: "Nodo raíz o lista de nodos.",
        anyOf: [{ $ref: "#/$defs/node" }, { type: "array", items: { $ref: "#/$defs/node" } }],
      },
    },
    $defs: {
      reference: REFERENCE,
      action: ACTION,
      valueOrReference: { anyOf: [{ type: "string" }, { $ref: "#/$defs/reference" }] },
      requires: { anyOf: [{ type: "string" }, { type: "array", items: { type: "string" } }] },
      dataSource: {
        type: "object",
        required: ["handler"],
        additionalProperties: false,
        properties: {
          handler: { type: "string", description: "Nombre del handler que registra el host. Nunca una URL." },
          params: { type: "object", description: "Parámetros; admiten referencias." },
          refreshOn: { type: "array", items: { type: "string" }, description: "Fuentes o acciones que la invalidan." },
        },
      },
      node: {
        type: "object",
        required: ["type"],
        additionalProperties: false,
        properties: {
          type: { type: "string", enum: types, description: "Componente del catálogo o nodo del motor." },
          id: { type: "string", description: "Ancla y referencia para depurar." },
          props: { type: "object", description: "Props del componente (se validan según `type`)." },
          children: {
            description: "Hijos del nodo.",
            anyOf: [{ $ref: "#/$defs/node" }, { type: "array", items: { $ref: "#/$defs/node" } }],
          },
          text: { $ref: "#/$defs/valueOrReference", description: "Atajo de contenido para componentes textuales." },
          requires: { $ref: "#/$defs/requires" },
          fallback: { $ref: "#/$defs/node", description: "Qué pintar si el nodo falla o no tiene permiso." },
          when: { type: "object", description: "Condición para pintar el nodo." },
          $status: { type: "string", enum: ["complete", "pending"], description: "Lo rellena el parser de streaming." },
        },
        allOf: typeRules(catalog),
      },
    },
  };
}

/**
 * Genera el JSON Schema de un documento de rutas (`axzy/routes`).
 *
 * Un grupo lleva `children` y no `page`; una hoja lleva `page` y no `children`.
 */
export function buildRoutesSchema(): JsonSchema {
  const route: JsonSchema = {
    type: "object",
    required: ["id"],
    additionalProperties: false,
    properties: {
      id: { type: "string", minLength: 1, description: "Identificador estable de la ruta." },
      path: { type: "string", description: "Segmentos relativos al padre (`usuarios`, `:id`). Vacío hereda el del padre." },
      page: { type: "string", minLength: 1, description: "Pantalla que pinta la ruta. Solo en hojas." },
      query: {
        type: "object",
        description: "Query que exige la ruta.",
        additionalProperties: { type: "string" },
      },
      nav: {
        type: "object",
        required: ["label"],
        additionalProperties: false,
        description: "Entrada de menú. Sin ella, la ruta no aparece.",
        properties: {
          label: { $ref: "#/$defs/valueOrReference" },
          icon: { type: "string", description: "Icono del registro del host." },
          badge: { type: ["integer", "string"], description: "Contador visible." },
        },
      },
      children: { type: "array", items: { $ref: "#/$defs/route" }, description: "Rutas hijas. Si existen, es un grupo." },
    },
    if: { required: ["children"] },
    then: { not: { required: ["page"] }, description: "Un grupo no lleva page." },
    else: { required: ["page"], description: "Una hoja necesita page." },
  };

  return {
    $schema: DIALECT,
    title: "AXZY · rutas (axzy/routes)",
    description: "Rutas declarativas: qué pantalla pinta cada dirección y qué entradas aparecen en el menú.",
    type: "object",
    required: ["version", "routes"],
    additionalProperties: false,
    properties: {
      $schema: { const: "axzy/routes" },
      version: { type: "integer", minimum: 1 },
      routes: { type: "array", items: { $ref: "#/$defs/route" } },
    },
    $defs: {
      route,
      reference: REFERENCE,
      valueOrReference: { anyOf: [{ type: "string" }, { $ref: "#/$defs/reference" }] },
    },
  };
}
