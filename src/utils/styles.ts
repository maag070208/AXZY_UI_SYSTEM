import clsx from "clsx";

// ──────────────────────────────────────────────
//   INPUT-LIKE COMPONENTS
// ──────────────────────────────────────────────

export function inputContainer(hasError?: boolean, disabled?: boolean) {
  return clsx(
    "w-full border border-solid transition-all duration-200 rounded-lg px-3 py-2 text-sm",
    "focus:outline-none focus:ring-2",
    hasError
      ? "border-red-500 ring-red-100"
      : "border-gray-300 focus:border-primary-500 focus:ring-primary-100",
    disabled && "opacity-50 cursor-not-allowed bg-gray-100"
  );
}

export function inputLabel(error?: boolean) {
  return clsx(
    "text-sm font-medium",
    error ? "text-red-500" : "text-gray-700 dark:text-slate-300"
  );
}

export const inputError = "text-red-500 text-xs mt-1";

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

export function tableHeaderCell(className?: string) {
  return clsx("px-4 py-4 align-top", className);
}

export const tableSortButtonActive = "bg-secondary-200 text-secondary-900";
export const tableSortButtonInactive = "hover:bg-secondary-200 text-secondary-400 hover:text-secondary-700";

export const tableBody = "divide-y divide-secondary-100";

export const tableRow = "hover:bg-secondary-50/50 transition-colors duration-150 group";

export function tableCell(className?: string) {
  return clsx("px-4 py-3 align-middle", className);
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
  span: number | number[] | { sm?: number; md?: number; lg?: number; xl?: number },
  maxCols: number
) {
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
