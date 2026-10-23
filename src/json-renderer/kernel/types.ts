/**
 * Contrato de datos del motor de pantallas.
 *
 * Un esquema describe **qué** pintar; nunca **cómo** comportarse: no hay código,
 * ni expresiones, ni URLs. Todo lo que exige autoridad (componentes, props,
 * datos, acciones, permisos) se resuelve contra registros del host.
 */

/** Estado de un nodo respecto al stream. */
export type NodeStatus = "complete" | "pending";

/** Valor de una prop: literal, referencia a datos o texto traducible. */
export type SchemaValue =
  | string
  | number
  | boolean
  | null
  | SchemaValue[]
  | { [key: string]: SchemaValue };

/** Referencia declarativa a un dato. Ninguna provoca red por sí misma. */
export interface SchemaReference {
  /** Valor de una fuente de datos declarada en `data`. */
  $source?: string;
  /** Valor del estado de pantalla. */
  $state?: string;
  /** Parámetro de la ruta. */
  $param?: string;
  /** Campo de la fila actual (dentro de una tabla). */
  $row?: string;
  /** Campo del formulario actual (dentro de un `form`). */
  $form?: string;
  /** Concatenación de valores ya resueltos. */
  $concat?: SchemaValue[];
  /** Proyección de un array: se queda con la clave indicada. */
  $map?: { $source?: string; $state?: string; $param?: string; pick: string };
  /** Longitud de un array o número de claves de un objeto. */
  $count?: SchemaValue;
  /** Primer valor definido y no nulo. */
  $coalesce?: SchemaValue[];
}

/** Condicional declarativo, sin lógica libre. */
export interface WhenSchema {
  /** Compara el valor de una fuente o del estado. */
  state?: string;
  /** Compara el estado de una fuente de datos. */
  source?: string;
  /** Igualdad estricta contra este valor. */
  equals?: SchemaValue;
  /** Pertenencia a esta lista. */
  in?: SchemaValue[];
  /** Estado de la fuente (`loading` | `empty` | `error` | `ok`). */
  status?: "loading" | "empty" | "error" | "ok";
  /** Capacidad del host que debe estar presente. */
  capability?: string;
  /** Niega la condición. */
  not?: WhenSchema;
  /** Todas deben cumplirse. */
  all?: WhenSchema[];
  /** Al menos una debe cumplirse. */
  any?: WhenSchema[];
}

/** Efecto declarativo que ejecuta el motor tras una acción. */
export interface EffectSchema {
  /** Acción registrada por el host. */
  action?: string;
  /** Argumentos explícitos del efecto. */
  args?: Record<string, SchemaValue>;
  /** Aviso al usuario. */
  toast?: { variant?: "success" | "error" | "info" | "warning"; message: SchemaValue };
  /** Navegación a otra ruta. */
  navigate?: string;
  /** Abre un overlay declarado en `overlays`. */
  openOverlay?: string;
  /** Cierra el overlay indicado, o el que esté abierto si se omite. */
  closeOverlay?: string;
  /** Escribe en el estado de la pantalla: `{ "clave": valor }`. Los valores admiten referencias. */
  set?: Record<string, SchemaValue>;
  /** Capacidad que exige la acción. Sin concesión, la acción no se ejecuta (`JR061`). */
  requires?: string | string[];
  /** Refresca una fuente de datos. */
  refresh?: string;
}

/** Acción declarada en un nodo: nombre registrado + argumentos + reacciones. */
export interface ActionSchema extends EffectSchema {
  /** Confirmación previa obligatoria. */
  confirm?: { title: SchemaValue; message?: SchemaValue };
  /** Efectos que se ejecutan si la acción termina bien. */
  then?: EffectSchema[];
  /** Efectos que se ejecutan si la acción falla. */
  onError?: EffectSchema;
}

/** Nodo del esquema. */
export interface NodeSchema {
  /** Tipo de componente del catálogo (`ITCard`, `ITButton`…) o nodo del motor (`form`, `table`). */
  type: string;
  /** Identificador opcional, para depuración y binding. */
  id?: string;
  /** Props del componente, ya filtradas por el catálogo. */
  props?: Record<string, SchemaValue>;
  /** Hijos: nodo, lista de nodos o nada. */
  children?: NodeSchema | NodeSchema[];
  /**
   * Atajo de contenido para componentes textuales (`ITText`, `ITButton`…).
   * Admite una referencia (`{ i18n: "clave" }`), que el host resuelve.
   */
  text?: SchemaValue;
  /** Capacidad o capacidades que exige el nodo. */
  requires?: string | string[];
  /** Qué pintar cuando falla o no hay permiso. */
  fallback?: NodeSchema;
  /** Condición para pintar el nodo. */
  when?: WhenSchema;
  /**
   * Estado respecto al stream. Lo rellena el parser tolerante; el autor no lo
   * escribe.
   */
  $status?: NodeStatus;
}

/** Definición de una fuente de datos. El host aporta el `handler`. */
export interface DataSourceSchema {
  /** Nombre de un handler registrado por el host. Nunca una URL. */
  handler: string;
  /** Parámetros, normalmente con referencias. */
  params?: Record<string, SchemaValue>;
  /** Fuentes o acciones que invalidan esta fuente. */
  refreshOn?: string[];
}

/** Esquema de pantalla completo. */
export interface ScreenSchema {
  /** Identificador del formato. */
  $schema?: "axzy/screen";
  /** Versión del formato; obligatoria para poder migrar. */
  version: number;
  /** Identificador de la pantalla. */
  id: string;
  /** Título, normalmente traducible. */
  title?: SchemaValue;
  /** Descripción corta de la pantalla, para la cabecera que ponga el host. */
  description?: SchemaValue;
  /** Capacidades que exige la pantalla completa. */
  requires?: string | string[];
  /** Fuentes de datos que el host resolverá. */
  data?: Record<string, DataSourceSchema>;
  /** Estado local de la pantalla. */
  state?: Record<string, SchemaValue>;
  /** Contenido raíz. */
  content: NodeSchema | NodeSchema[];
}

/** Resultado de un intento de pintar un nodo. */
export interface NodeOutcome {
  /** Si el nodo se pudo resolver. */
  ok: boolean;
  /** Motivo cuando no se pudo. */
  reason?: string;
}
