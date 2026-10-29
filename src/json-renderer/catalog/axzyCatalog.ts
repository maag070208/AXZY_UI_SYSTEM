/**
 * Catálogo AXZY por defecto del motor de pantallas.
 *
 * Cubre los componentes que tienen sentido en un esquema (25 en esta fase). Los
 * que ejecutan entrada del usuario, provocan recursión o deciden el tema quedan
 * **excluidos a propósito** y se documentan con su motivo.
 *
 * Regla del catálogo: una prop solo entra si su valor puede describirse en JSON
 * sin código. Por eso `onClick` es `kind: "action"` (nombre de una acción
 * registrada) y los nodos React (`icon`, `actions`, `badge`…) están prohibidos.
 */

import ITText from "@/components/atoms/text/text";
import ITButton from "@/components/atoms/button/button";
import ITChip from "@/components/atoms/chip/chip";
import ITBadget from "@/components/atoms/badget/badget";
import ITAvatar from "@/components/atoms/avatar/avatar";
import ITDivider from "@/components/atoms/divider/divider";
import ITStack from "@/components/atoms/stack/stack";
import ITFlex from "@/components/atoms/flex/flex";
import ITGrid from "@/components/atoms/grid/grid";
import ITLoader from "@/components/atoms/loader/loader";
import ITSkeleton from "@/components/atoms/skeleton/skeleton";
import ITProgress from "@/components/atoms/progress/progress";
import ITImage from "@/components/atoms/image/image";
import ITCard from "@/components/molecules/card/card";
import ITAlert from "@/components/molecules/alert/alert";
import ITEmptyState from "@/components/molecules/empty-state/empty-state";
import ITStatCard from "@/components/molecules/stat-card/stat-card";
import ITDataTable from "@/components/organisms/data-table/dataTable";
import { createCatalog, type CatalogEntry } from "./catalog.props";

/** Colores semánticos que acepta el sistema. */
const COLORS = ["primary", "secondary", "success", "danger", "warning", "info", "purple", "error", "gray"] as const;
/** Tamaños del sistema. */
const SIZES = ["sm", "md", "lg"] as const;
/** Direcciones de layout. */
const DIRECTIONS = ["row", "column"] as const;
/** Alineaciones flexibles. */
const ALIGNS = ["start", "center", "end", "stretch", "baseline"] as const;
const JUSTIFIES = ["start", "center", "end", "between", "around", "evenly"] as const;
const WRAPS = ["nowrap", "wrap", "wrap-reverse"] as const;

/** Props comunes de texto que casi todos los componentes aceptan. */
const TEXT_PROPS = {
  className: { kind: "string" as const, doc: "Clases extra del componente." },
};

/** Entradas del catálogo por defecto. */
export const AXZY_CATALOG_ENTRIES: CatalogEntry[] = [
  {
    type: "ITText",
    component: ITText,
    children: true,
    text: true,
    summary: "Texto semántico. Usa `text` o `children` para el contenido.",
    props: {
      as: { kind: "enum", values: ["span", "p", "h1", "h2", "h3", "h4", "label", "div", "strong", "em"], default: "span", doc: "Etiqueta HTML semántica." },
      muted: { kind: "boolean", default: false, doc: "Atenúa el color del texto." },
      ...TEXT_PROPS,
    },
  },
  {
    type: "ITButton",
    component: ITButton,
    children: true,
    text: true,
    summary: "Botón. `onClick` es una acción registrada por el host.",
    props: {
      label: { kind: "string", doc: "Texto del botón (alternativa a `text`)." },
      color: { kind: "enum", values: COLORS, default: "primary" },
      size: { kind: "enum", values: SIZES, default: "md" },
      variant: {
        kind: "enum",
        values: ["filled", "outlined", "raised", "rounded", "text", "raised-text", "icon-only", "link"],
        default: "filled",
      },
      disabled: { kind: "boolean", default: false },
      type: { kind: "enum", values: ["button", "submit", "reset"], default: "button" },
      ariaLabel: { kind: "string", doc: "Etiqueta accesible cuando el botón no lleva texto." },
      title: { kind: "string" },
      onClick: { kind: "action", doc: "Nombre de una acción registrada." },
      ...TEXT_PROPS,
    },
    forbidden: ["icon"],
  },
  {
    type: "ITCard",
    component: ITCard,
    children: true,
    summary: "Tarjeta con título, imagen y contenido.",
    props: {
      title: { kind: "string" },
      tone: {
        kind: "enum",
        values: ["primary", "secondary", "ternary", "success", "info", "warning", "danger"],
        doc: "Tinte pastel de la tarjeta (token --color-<tone>-soft).",
      },
      image: { kind: "string", doc: "URL de la imagen de cabecera." },
      alt: { kind: "string" },
      onClick: { kind: "action" },
      imageClassName: { kind: "string" },
      titleClassName: { kind: "string" },
      contentClassName: { kind: "string" },
      actionClassName: { kind: "string" },
      ...TEXT_PROPS,
    },
    forbidden: ["actions"],
  },
  {
    type: "ITAlert",
    component: ITAlert,
    children: true,
    text: true,
    summary: "Aviso con variante semántica.",
    props: {
      variant: { kind: "enum", values: ["info", "success", "warning", "error"], default: "info" },
      title: { kind: "string" },
      dismissible: { kind: "boolean", default: false },
      onDismiss: { kind: "action" },
      ...TEXT_PROPS,
    },
    forbidden: ["icon"],
  },
  {
    type: "ITEmptyState",
    component: ITEmptyState,
    text: true,
    summary: "Estado vacío con título, descripción y acción.",
    props: {
      title: { kind: "string", required: true },
      description: { kind: "string" },
      ...TEXT_PROPS,
    },
    forbidden: ["icon", "action"],
  },
  {
    type: "ITStatCard",
    component: ITStatCard,
    summary: "Métrica con valor y tendencia.",
    props: {
      label: { kind: "string", required: true },
      value: { kind: "string", required: true, doc: "Valor ya formateado o número." },
      trend: { kind: "string" },
      trendDirection: { kind: "enum", values: ["up", "down", "neutral"] },
      color: { kind: "string", doc: "Color CSS del icono." },
      onClick: { kind: "action" },
      ...TEXT_PROPS,
    },
    forbidden: ["icon"],
  },
  {
    type: "ITChip",
    component: ITChip,
    children: true,
    text: true,
    summary: "Etiqueta compacta, opcionalmente removible o seleccionable.",
    props: {
      label: { kind: "string" },
      color: { kind: "enum", values: COLORS, default: "gray" },
      size: { kind: "enum", values: SIZES, default: "md" },
      variant: { kind: "enum", values: ["soft", "filled", "outlined"], default: "soft" },
      removable: { kind: "boolean", default: false },
      selected: { kind: "boolean", default: false },
      disabled: { kind: "boolean", default: false },
      onRemove: { kind: "action" },
      onClick: { kind: "action" },
      ...TEXT_PROPS,
    },
    forbidden: ["icon"],
  },
  {
    type: "ITBadget",
    component: ITBadget,
    children: true,
    text: true,
    summary: "Insignia de estado.",
    props: {
      label: { kind: "string" },
      color: { kind: "enum", values: COLORS, default: "primary" },
      size: { kind: "enum", values: SIZES, default: "md" },
      variant: { kind: "enum", values: ["soft", "filled", "outlined"], default: "soft" },
      ...TEXT_PROPS,
    },
  },
  {
    type: "ITAvatar",
    component: ITAvatar,
    summary: "Avatar con imagen o iniciales.",
    props: {
      src: { kind: "string" },
      alt: { kind: "string" },
      initials: { kind: "string", doc: "Se usa cuando no hay imagen." },
      size: { kind: "enum", values: ["xs", "sm", "md", "lg", "xl"] },
      color: { kind: "string" },
      onClick: { kind: "action" },
      ...TEXT_PROPS,
    },
    forbidden: ["badge"],
  },
  {
    type: "ITDivider",
    component: ITDivider,
    summary: "Separador horizontal o vertical.",
    props: {
      orientation: { kind: "enum", values: ["horizontal", "vertical"], default: "horizontal" },
      color: { kind: "string" },
      thickness: { kind: "string" },
      ...TEXT_PROPS,
    },
  },
  {
    type: "ITStack",
    component: ITStack,
    children: true,
    summary: "Pila con dirección y separación uniforme.",
    props: {
      direction: { kind: "enum", values: DIRECTIONS, default: "column" },
      spacing: { kind: "number", default: 0 },
      alignItems: { kind: "enum", values: ALIGNS },
      justifyContent: { kind: "enum", values: JUSTIFIES },
      flexWrap: { kind: "enum", values: WRAPS },
      ...TEXT_PROPS,
    },
    forbidden: ["divider", "style"],
  },
  {
    type: "ITFlex",
    component: ITFlex,
    children: true,
    summary: "Contenedor flex completo.",
    props: {
      direction: { kind: "enum", values: DIRECTIONS, default: "row" },
      align: { kind: "enum", values: ALIGNS },
      justify: { kind: "enum", values: JUSTIFIES },
      wrap: { kind: "enum", values: WRAPS },
      gap: { kind: "number", default: 0 },
      grow: { kind: "boolean" },
      shrink: { kind: "boolean" },
      basis: { kind: "string" },
      ...TEXT_PROPS,
    },
    forbidden: ["style", "onClick"],
  },
  {
    type: "ITGrid",
    component: ITGrid,
    children: true,
    summary: "Rejilla de 12 columnas; `item` para una celda.",
    props: {
      container: { kind: "boolean", default: false },
      item: { kind: "boolean", default: false },
      spacing: { kind: "number", default: 0 },
      columns: { kind: "integer", default: 12, doc: "Columnas del contenedor." },
      xs: { kind: "integer" },
      sm: { kind: "integer" },
      md: { kind: "integer" },
      lg: { kind: "integer" },
      xl: { kind: "integer" },
      ...TEXT_PROPS,
    },
    forbidden: ["style"],
  },
  {
    type: "ITLoader",
    component: ITLoader,
    summary: "Indicador de carga.",
    props: {
      variant: { kind: "enum", values: ["spinner", "dots", "bar", "pulse"], default: "spinner" },
      size: { kind: "enum", values: ["xs", "sm", "md", "lg", "xl"], default: "md" },
      color: { kind: "string" },
      ...TEXT_PROPS,
    },
  },
  {
    type: "ITSkeleton",
    component: ITSkeleton,
    summary: "Marcador de carga con forma.",
    props: {
      variant: { kind: "enum", values: ["text", "rect", "circle"], default: "text" },
      width: { kind: "string" },
      height: { kind: "string" },
      count: { kind: "integer", default: 1 },
      ...TEXT_PROPS,
    },
    forbidden: ["style"],
  },
  {
    type: "ITProgress",
    component: ITProgress,
    summary: "Barra de progreso.",
    props: {
      value: { kind: "number", default: 0 },
      max: { kind: "number", default: 100 },
      variant: { kind: "enum", values: ["determinate", "indeterminate"], default: "determinate" },
      color: { kind: "enum", values: COLORS, default: "primary" },
      size: { kind: "enum", values: SIZES, default: "md" },
      ...TEXT_PROPS,
    },
    forbidden: ["style"],
  },
  {
    type: "ITDataTable",
    component: ITDataTable,
    summary:
      "Tabla con paginación, orden y filtros. Los datos llegan de una fuente que el host resuelve (`$source`).",
    props: {
      columns: {
        kind: "columns",
        required: true,
        doc: "Columnas: { key, label, type, sortable, filter, currencyMX }.",
      },
      fetchData: {
        kind: "data",
        required: true,
        doc: "Referencia a una fuente: { \"$source\": \"usuarios\" }. El host la convierte en un fetcher.",
      },
      title: { kind: "string", doc: "Título opcional sobre la tabla." },
      defaultItemsPerPage: { kind: "integer", default: 5, doc: "Filas por página al abrir." },
      itemsPerPageOptions: { kind: "array", doc: "Opciones del paginador, p. ej. [5, 10, 20]." },
      debounceMs: { kind: "integer", default: 400, doc: "Espera antes de refiltrar al teclear." },
      variant: { kind: "enum", values: ["default", "striped", "bordered", "minimal"], default: "default" },
      size: { kind: "enum", values: SIZES, default: "md" },
      density: { kind: "enum", values: ["compact", "normal", "comfortable"], default: "normal" },
      layout: { kind: "enum", values: ["auto", "fixed"], default: "auto" },
      showVerticalBorder: { kind: "boolean", default: true },
      autoCardBreakpoint: { kind: "integer", default: 0, doc: "Ancho (px) por debajo del cual cae a tarjetas." },
      onRowClick: { kind: "action", doc: "Nombre de una acción registrada; recibe la fila." },
      className: { kind: "string" },
      containerClassName: { kind: "string" },
    },
    forbidden: ["renderCard", "loadingIndicator"],
  },
  {
    type: "ITImage",
    component: ITImage,
    summary: "Imagen con respaldo si falla la carga.",
    props: {
      src: { kind: "string", required: true },
      alt: { kind: "string" },
      fallback: { kind: "string", doc: "URL de respaldo." },
      onClick: { kind: "action" },
      ...TEXT_PROPS,
    },
  },
];

/** Tipos excluidos a propósito, con el motivo que se muestra en el aviso. */
export const AXZY_EXCLUDED_TYPES: Record<string, string> = {
  ITJsonRenderer: "Recursión: un esquema no puede pedir otro renderer.",
  ITSchemaRenderer: "Recursión: un esquema no puede pedir otro renderer.",
  ITJSONEditor: "Ejecuta entrada del usuario como código.",
  ITFormBuilder: "Se sustituye por el nodo `form` del motor.",
  ITWysiwyg: "Produce HTML, que se salta la lista blanca.",
  ITI18nProvider: "Lo monta el host, no el esquema.",
  ITThemeProvider: "Lo monta el host, no el esquema.",
  ITLayout: "El shell lo declara el router, no un nodo suelto.",
  ITNavbar: "El shell lo declara el router, no un nodo suelto.",
  ITSidebar: "El shell lo declara el router, no un nodo suelto.",
  ITTopBar: "El shell lo declara el router, no un nodo suelto.",
};

/** Catálogo AXZY por defecto. */
export const axzyCatalog = createCatalog(AXZY_CATALOG_ENTRIES, AXZY_EXCLUDED_TYPES);

/** Tipos disponibles en esta fase. */
export const axzyCatalogTypes = Object.keys(axzyCatalog.entries);
