import clsx from "clsx";
import type { CSSProperties } from "react";
import { inputSizeTokens } from "@/theme/theme";
import { densityStyles, type TableDensity } from "@/types/table.types";

/** Theme shape expected from `theme.input` (used by input-like components). */
export type InputThemeLike = {
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  disabled?: { backgroundColor?: string; borderColor?: string };
  error?: { borderColor?: string; ring?: string };
  focus?: { ring?: string };
};

/**
 * Estilo base compartido por componentes de tipo campo (ITInput, ITSelect,
 * ITSearchSelect…). Aplica los tokens del theme + la medida estándar de `size`.
 * `extra` permite sobreescribir propiedades específicas del componente.
 */
export function inputFieldStyle(
  inputTheme: InputThemeLike,
  size: "sm" | "md" | "lg" = "md",
  extra?: CSSProperties
): CSSProperties {
  const sizeConfig = inputSizeTokens[size] ?? inputSizeTokens.md;
  return {
    backgroundColor: inputTheme.backgroundColor,
    borderColor: inputTheme.borderColor,
    borderRadius: inputTheme.borderRadius,
    padding: sizeConfig.padding,
    fontSize: sizeConfig.fontSize,
    borderWidth: "1px",
    borderStyle: "solid",
    transition: "all 0.2s",
    color: "var(--it-input-text-color, var(--color-secondary-900))",
    ...extra,
  };
}

// ──────────────────────────────────────────────
//   INPUT-LIKE COMPONENTS
// ──────────────────────────────────────────────

export function inputContainer(hasError?: boolean, disabled?: boolean) {
  return clsx(
    "w-full border border-solid transition-all duration-200 rounded-lg px-3 py-2 text-sm",
    "focus:outline-none focus:ring-2",
    hasError
      ? "border-danger-500 ring-danger-100"
      : "border-secondary-300 focus:border-primary-500 focus:ring-primary-100",
    disabled && "opacity-50 cursor-not-allowed bg-secondary-100"
  );
}

export function inputLabel(error?: boolean) {
  return clsx(
    "text-sm font-medium",
    error ? "text-danger-500" : "text-secondary-700 dark:text-secondary-300"
  );
}

export const inputError = "text-danger-500 text-xs mt-1";

export function inputWrapper(className?: string) {
  return clsx("flex flex-col gap-1.5", className);
}

export const iconAbsoluteLeft = "absolute inset-y-0 left-0 flex items-center pl-3 z-10";
export const iconAbsoluteRight = "absolute inset-y-0 right-0 flex items-center pr-3 z-10";

// ──────────────────────────────────────────────
//   TABLE COMPONENTS
// ──────────────────────────────────────────────

export const tableContainer = "rounded-xl shadow-sm border border-secondary-200 overflow-hidden";

export const tableHeaderRow = "bg-secondary-50 border-b border-secondary-200 text-xs uppercase tracking-wider font-semibold text-secondary-500";

export function tableHeaderCell(className?: string, density: TableDensity = "normal") {
  return clsx(densityStyles[density].header, "align-top", className);
}

export const tableSortButtonActive = "bg-secondary-200 text-secondary-900";
export const tableSortButtonInactive = "hover:bg-secondary-200 text-secondary-400 hover:text-secondary-700";

export const tableBody = "divide-y divide-secondary-100";

export const tableRow = "hover:bg-secondary-50/50 transition-colors duration-150 group";

export const tableRowClickable = "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset";

export const tableCardClickable = "cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500";

export function tableCell(className?: string, density: TableDensity = "normal") {
  return clsx(densityStyles[density].cell, "align-middle", className);
}

export const tableActionsCell = "flex items-center justify-center gap-2";
export const tableCellText = "text-secondary-700 font-medium";

export function tableEmptyState(colSpan: number) {
  return { colSpan, className: "px-6 py-20 text-center" };
}

export const tableEmptyContent = "flex flex-col items-center justify-center text-secondary-400";

// ──────────────────────────────────────────────
//   CARD / CONTAINER
// ──────────────────────────────────────────────

export const cardContainer = "overflow-hidden";

// ──────────────────────────────────────────────
//   FORM GRID
// ──────────────────────────────────────────────

export const gridColsClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  8: "grid-cols-8",
  12: "grid-cols-12",
};

export function getGridColsClass(columns: number) {
  return gridColsClasses[columns] || "grid-cols-12";
}

export function getColSpanClass(
  span: number | number[] | { sm?: number; md?: number; lg?: number; xl?: number } | undefined | null,
  maxCols: number
) {
  if (span == null) return `col-span-${maxCols}`;
  if (typeof span === "number") {
    return `col-span-${Math.min(span, maxCols)}`;
  }
  if (Array.isArray(span)) {
    const [sm, md, lg] = span;
    return clsx(
      `col-span-${Math.min(sm, maxCols)}`,
      md !== undefined && `md:col-span-${Math.min(md, maxCols)}`,
      lg !== undefined && `lg:col-span-${Math.min(lg, maxCols)}`
    );
  }
  const classes: string[] = [];
  if (span.sm) classes.push(`col-span-${Math.min(span.sm, maxCols)}`);
  if (span.md) classes.push(`md:col-span-${Math.min(span.md, maxCols)}`);
  if (span.lg) classes.push(`lg:col-span-${Math.min(span.lg, maxCols)}`);
  if (span.xl) classes.push(`xl:col-span-${Math.min(span.xl, maxCols)}`);
  return classes.length ? clsx(classes) : `col-span-${maxCols}`;
}

export const formGrid = (columns: number) =>
  clsx("grid gap-y-6 gap-x-5", getGridColsClass(columns));

// ──────────────────────────────────────────────
//   DISABLED OVERLAY
// ──────────────────────────────────────────────

export const disabledOverlay = "opacity-50 cursor-not-allowed";
