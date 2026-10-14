import type { CSSProperties } from "react";

export type TableVariants = "default" | "striped" | "bordered";

/**
 * A single, optional style slot for one region of a table. Both fields are
 * merged *after* the component's built-in values.
 */
export interface TableDesignSlot {
  /**
   * Extra CSS classes merged after the built-in ones. Note that Tailwind
   * resolves conflicts by utility order (not class order), so use inline
   * `style` (or `!` modifiers) when a value must always win.
   */
  className?: string;
  /** Inline CSS merged after the built-in values; wins over classes unless the global theme forces a value with `!important`. */
  style?: CSSProperties;
}

/**
 * Per-instance visual overrides for a table. Every region is optional and, when
 * present, is applied on top of the built-in styles. The global
 * `ITThemeProvider` colors (`--color-table-*`) still apply underneath, so use
 * `TableColors` for this-instance color changes instead of `style`.
 */
export interface TableDesign {
  /** Outermost wrapper (`space-y-4 w-full`). Prefer `containerClassName` for width/spacing. */
  container?: TableDesignSlot;
  /** The rounded card surface that wraps the toolbar, table and footer (border, radius, shadow, background). */
  card?: TableDesignSlot;
  /** Toolbar strip holding the title and/or the Table|Cards toggle. */
  toolbar?: TableDesignSlot;
  /** The `<thead>` row that carries the column titles. */
  header?: TableDesignSlot;
  /** Every `<th>` header cell. */
  headerCell?: TableDesignSlot;
  /** Every body `<tr>`. */
  row?: TableDesignSlot;
  /** Every body `<td>`. */
  cell?: TableDesignSlot;
  /** Scroll wrapper of the cards view (the responsive card list). */
  cards?: TableDesignSlot;
  /** Pagination footer strip. */
  footer?: TableDesignSlot;
}

/**
 * Per-instance color overrides. They are written as local `--color-table-*`
 * variables on the table wrapper, so they beat the global theme for this
 * instance only, without touching `ITThemeProvider`.
 */
export interface TableColors {
  /** Header row background. Overrides the theme's `table.headerBg` for this instance. */
  headerBg?: string;
  /** Header text color. Overrides the theme's `table.headerText` for this instance. */
  headerText?: string;
  /** Body row background. Overrides the theme's `table.rowBg` for this instance. */
  rowBg?: string;
  /** Body text color. Overrides the theme's `table.rowText` for this instance. */
  rowText?: string;
  /** Body row hover background. Overrides the theme's `table.rowHover` for this instance. */
  rowHover?: string;
}

/**
 * Shared design props for ITTable and ITDataTable. `design` exposes every
 * region as an object; the flat `*ClassName` / `*Style` shortcuts are merged
 * after it, so the flat prop wins when both are provided.
 */
export interface TableDesignProps {
  /** Whether to render the Table|Cards view switcher in the toolbar. Hiding it still honors `defaultView` and `autoCardBreakpoint`. @default true */
  showViewToggle?: boolean;
  /** Per-region visual overrides (classes + inline styles). */
  design?: TableDesign;
  /** Per-instance color overrides for header and rows, beating the global theme. */
  colors?: TableColors;
  /** Inline styles for the outermost wrapper. */
  containerStyle?: CSSProperties;
  /** Extra classes for the card surface (the rounded container). */
  cardClassName?: string;
  /** Inline styles for the card surface. */
  cardStyle?: CSSProperties;
  /** Extra classes for the toolbar strip (title + view toggle). */
  toolbarClassName?: string;
  /** Inline styles for the toolbar strip. */
  toolbarStyle?: CSSProperties;
  /** Extra classes for the header row. */
  headerClassName?: string;
  /** Inline styles for the header row. */
  headerStyle?: CSSProperties;
  /** Extra classes for every header cell. */
  headerCellClassName?: string;
  /** Inline styles for every header cell. */
  headerCellStyle?: CSSProperties;
  /** Extra classes for every body row. */
  rowClassName?: string;
  /** Inline styles for every body row. */
  rowStyle?: CSSProperties;
  /** Extra classes for every body cell. */
  cellClassName?: string;
  /** Inline styles for every body cell. */
  cellStyle?: CSSProperties;
  /** Extra classes for the cards-view scroll wrapper. */
  cardsClassName?: string;
  /** Inline styles for the cards-view scroll wrapper. */
  cardsStyle?: CSSProperties;
  /** Extra classes for the pagination footer strip. */
  footerClassName?: string;
  /** Inline styles for the pagination footer strip. */
  footerStyle?: CSSProperties;
}

/**
 * Value stored for a single column filter.
 *
 * - `string | number | boolean` — text/number/boolean filters and catalog ids.
 * - `Date` — a single-date filter (`Column.filter: "date"`).
 * - `[Date | null, Date | null]` — a date-range filter (`Column.filter: "date-range"`).
 */
export type ColumnFilterValue =
  | string
  | number
  | boolean
  | Date
  | [Date | null, Date | null];

/** Map of column `key` to its active filter value. */
export type ColumnFilters = Record<string, ColumnFilterValue>;

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
