export type TableVariants = "default" | "striped" | "bordered";

export type TableSize = "sm" | "md" | "lg";

export const variantStyles: Record<TableVariants, string> = {
  default: "",
  striped: "",
  bordered: "border border-gray-200",
};

export const sizeStyles: Record<TableSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-lg",
};

/**
 * Cell padding / row-height preset for tables. Independent of `TableSize`
 * (which only controls font-size, and shifts the row height via the line box).
 */
export type TableDensity = "compact" | "normal" | "comfortable";

/**
 * Padding classes and target row height per density. `normal` MUST stay
 * byte-identical to the historical hard-coded `px-4 py-4` / `px-4 py-3`.
 *
 * The `rowHeight` values are the `size="md"` baseline:
 * rowHeight = cell vertical padding + text-sm line box (20px) + 1px divide-y border.
 * compact: py-1.5 (12) + 20 + 1 = 33 · normal: py-3 (24) + 20 + 1 = 45 · comfortable: py-4 (32) + 20 + 1 = 53
 *
 * `size` shifts that baseline via the font-size line box; use
 * `getRowHeight(size, density)` for the real rendered row height.
 */
export const densityStyles: Record<
  TableDensity,
  { header: string; cell: string; rowHeight: number }
> = {
  compact: { header: "px-3 py-2", cell: "px-3 py-1.5", rowHeight: 33 },
  normal: { header: "px-4 py-4", cell: "px-4 py-3", rowHeight: 45 },
  comfortable: { header: "px-4 py-5", cell: "px-4 py-4", rowHeight: 53 },
};

/** Line box (px) contributed by the `size` prop's font-size class (`text-xs|sm|lg`). */
export const sizeLineHeights: Record<TableSize, number> = { sm: 16, md: 20, lg: 28 };

/**
 * Row height (px) for a given `size` + `density`, matching the real rendered
 * row: cell vertical padding + the size line box + 1px divide-y border.
 * `densityStyles[density].rowHeight` is the `md` baseline.
 */
export function getRowHeight(size: TableSize, density: TableDensity): number {
  return densityStyles[density].rowHeight - sizeLineHeights.md + sizeLineHeights[size];
}

/**
 * Static horizontal alignment classes for columns. Kept as full literal
 * strings so Tailwind's scanner can see them (never build them dynamically).
 */
export const tableAlignClasses: Record<"left" | "center" | "right", string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};
