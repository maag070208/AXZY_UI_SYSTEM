import type { ReactNode } from "react";

/**
 * Modo de presentación del documento.
 *
 * - `"text"`: editor de código con resaltado, gutter y plegado.
 * - `"tree"`: árbol navegable de solo lectura sobre el mismo JSON.
 */
export type ITJSONEditorMode = "text" | "tree";

/** Paleta del lienzo de código. */
export type ITJSONEditorTheme = "ink" | "light";

/**
 * Props de `ITJSONEditor`.
 *
 * @example
 * ```tsx
 * <ITJSONEditor value={json} onChange={setJson} height={420} mode="text" />
 * ```
 */
export interface ITJSONEditorProps {
  /** Documento JSON como cadena. Si es `undefined`, el editor arranca vacío. @default "" */
  value?: string;
  /** Se dispara con el texto completo cada vez que cambia (teclado, pegado o barra de acciones). */
  onChange?: (value: string) => void;
  /** Se dispara tras cada validación con el valor parseado y su estado. */
  onParse?: (parsed: unknown, isValid: boolean, error?: string) => void;
  /** Texto de ayuda que se muestra cuando el documento está vacío. */
  placeholder?: string;
  /** Bloquea la edición: desaparecen las acciones que modifican el texto. @default false */
  readOnly?: boolean;
  /** Modo inicial: `"text"` (código) o `"tree"` (árbol navegable). @default "text" */
  mode?: ITJSONEditorMode;
  /** Permite alternar entre texto y árbol desde la barra. @default true */
  showModeSwitch?: boolean;
  /** Muestra la barra superior de acciones. @default true */
  showToolbar?: boolean;
  /** Muestra el indicador de válido/ inválido con línea y columna del error. @default true */
  showValidation?: boolean;
  /** Estadísticas del pie: líneas, nodos, profundidad y tamaño. @default true */
  showStatusBar?: boolean;
  /** Muestra los números de línea del gutter. @default true */
  showLineNumbers?: boolean;
  /** Muestra el gutter de plegado de bloques `{…}` / `[…]`. @default true */
  showFoldGutter?: boolean;
  /** Habilita las acciones de la barra (formatear, minificar, ordenar, escapar). @default true */
  showTransformActions?: boolean;
  /** Habilita el botón de copiar el documento completo. @default true */
  showCopyButton?: boolean;
  /** Habilita la carga de un `.json` desde disco. @default true */
  showImportButton?: boolean;
  /** Habilita la descarga del documento como `.json`. @default true */
  showDownloadButton?: boolean;
  /** Muestra la fila de ajustes de vista (ajuste de línea, números, plegado, indentación). @default true */
  showViewSettings?: boolean;
  /** Espacios por nivel de indentación, entre 0 y 8. @default 2 */
  indentSize?: number;
  /** Ajusta las líneas largas al ancho del editor. Desactivado mantiene el scroll horizontal y el gutter sincronizado. @default false */
  wrapLines?: boolean;
  /** Ofrece números de línea y plegado también en la vista de árbol. @default false */
  treeShowLines?: boolean;
  /** Paleta del lienzo: `"ink"` (tinta oscura, por defecto) o `"light"`. @default "ink" */
  canvasTheme?: ITJSONEditorTheme;
  /** Altura del área de edición: número en píxeles o cualquier medida CSS. @default 340 */
  height?: number | string;
  /** Ancho mínimo del editor. Útil dentro de layouts que comprimen. */
  minWidth?: number | string;
  /** Acciones extra que se añaden al final de la barra, antes de copiar/descargar. */
  actions?: ReactNode;
  /** Clases para el contenedor raíz. */
  className?: string;
  /** Identificador HTML del contenedor raíz, para anclarlo desde fuera o en pruebas. */
  id?: string;
  /** Clases para el `<textarea>`, por si hay que afinar la tipografía. */
  textareaClassName?: string;
  /**
   * Línea (1-based) que hay que marcar como errónea cuando el fallo lo detecta
   * la aplicación y no el propio editor.
   */
  errorLine?: number;
}
