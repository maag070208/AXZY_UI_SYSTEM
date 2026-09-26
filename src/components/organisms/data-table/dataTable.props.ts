import { ReactNode } from "react";
import { Column } from "@/components/molecules/table/table.props";
import { ColumnFilters, TableDensity } from "@/types/table.types";

/** Parameters passed to `fetchData` every time pagination, filters, or sorting change. */
export interface ITDataTableFetchParams {
  /** 1-indexed current page number. */
  page: number;
  /** Number of rows requested per page. */
  limit: number;
  /**
   * Active per-column filter values (from `Column.filter`), keyed by column
   * `key`. Scalars for text/number/boolean/date filters, a `Date` for
   * `filter: "date"`, and a `[start, end]` tuple for `filter: "date-range"`.
   */
  filters: ColumnFilters;
  /** Active sort, present only when the user has clicked a sortable column header. */
  sort?: {
    /** Column `key` currently sorted by. */
    key: string;
    /** Sort direction. */
    direction: "asc" | "desc";
  };
}

/** Expected shape of the Promise returned by `fetchData`. */
export interface ITDataTableResponse<T> {
  /** Rows for the requested page. */
  data: T[];
  /** Total row count across all pages (used to compute the paginator's total pages). */
  total: number;
}

export interface ITDataTableProps<T extends Record<string, unknown>> {
  /**
   * The column configuration array matching ITTable but adapted for Server-Side processing
   */
  columns: Column<T>[];

  /**
   * Async callback that the component will trigger whenever pagination, filtering or sorting changes.
   * It must return a Promise with `data` array and the `total` items matching the query.
   */
  fetchData: (params: ITDataTableFetchParams) => Promise<ITDataTableResponse<T>>;

  /**
   * The amount of milliseconds to wait after internal `filters` state changes
   * before triggering `fetchData`. Helpful to avoid spamming the backend while typing.
   * @default 400
   */
  debounceMs?: number;

  /**
   * Filters managed outside of the ITDataTable (e.g. a date range picker).
   * These will be merged with the internal column filters before calling fetchData.
   */
  externalFilters?: ColumnFilters;

  /**
   * Custom element to display instead of the default spinner while `isLoading` is true.
   */
  loadingIndicator?: ReactNode;

  /**
   * Re-fetches the table automatically upon mounting.
   * @default true
   */
  fetchOnMount?: boolean;

  /**
   * External hook to force the component to re-fetch the current page.
   * Example: trigger after a successful modal form submission.
   */
  reloadTrigger?: number | string | boolean;

  // Visual Inherited Props from ITTable
  /** Additional CSS classes for the outer wrapper element. */
  containerClassName?: string;
  /** Additional CSS classes applied directly to the `<table>` element. */
  className?: string;
  /** Visual style variant: "default" | "striped" | "bordered" | "minimal". @default "default" */
  variant?: "default" | "striped" | "bordered" | "minimal";
  /** Row density preset: "sm" | "md" | "lg". @default "md" */
  size?: "sm" | "md" | "lg";
  /** Selectable page-size options for the paginator. @default [5, 10, 20] */
  itemsPerPageOptions?: number[];
  /** Initial number of rows per page. @default 10 */
  defaultItemsPerPage?: number;
  /** Optional heading displayed above the table. */
  title?: string | ReactNode;
  /** Custom card renderer for mobile/tablet responsive view. Receives the row data. */
  renderCard?: (row: T) => React.ReactNode;
  /** Initial view mode. Defaults to "table". */
  defaultView?: "table" | "cards";
  /** Whether to show vertical borders between columns. Defaults to true. */
  showVerticalBorder?: boolean;
  /** Custom class for vertical borders (overrides the default subtle gray). */
  verticalBorderClassname?: string;
  /**
   * Callback fired when a row (table view) or card (cards view) is activated,
   * receiving the row item and the originating event. The event is a
   * `MouseEvent` for pointer interaction and a `KeyboardEvent` for Enter/Space
   * activation. Not fired when the interaction starts inside an interactive
   * child (button, link, input, or any `[data-row-click-ignore]` element).
   */
  onRowClick?: (
    row: T,
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
  /**
   * Table layout algorithm. `"fixed"` respects column `width` values and drops
   * the `min-w-max` / `min-w-[150px]` floors so content no longer forces
   * horizontal scrolling; `"auto"` keeps the content-driven layout.
   * @default "auto"
   */
  layout?: "auto" | "fixed";
  /**
   * Cell padding and row-height preset. Independent of `size`, which only
   * controls font-size: `"compact"` | `"normal"` | `"comfortable"`.
   * @default "normal"
   */
  density?: TableDensity;
  /**
   * Container width (in px) below which the table automatically falls back to
   * the cards view. `0` disables the fallback.
   * @default 0
   */
  autoCardBreakpoint?: number;
  /**
   * Enables row virtualization for the table view: only the visible window of
   * rows is rendered, with spacer rows preserving the full scroll height.
   * The cards view is never virtualized.
   * @default false
   */
  virtualized?: boolean;
  /**
   * Max height (px) of the virtualized table's scroll container.
   * Only used when `virtualized` is true.
   * @default 400
   */
  virtualizedMaxHeight?: number;
  /**
   * Assumed uniform row height (px) used by the virtualizer. Defaults to
   * `getRowHeight(size, density)`, which is size-aware: the `size="md"`
   * baseline is 33 / 45 / 53 (compact / normal / comfortable) and `size`
   * shifts it by the font-size line box (sm 16px / md 20px / lg 28px).
   * Only used when `virtualized` is true.
   */
  rowHeight?: number;
  /**
   * Number of extra rows rendered above and below the viewport to avoid blank
   * gaps while scrolling. Only used when `virtualized` is true.
   * @default 5
   */
  overscan?: number;
  /**
   * Makes the header cells sticky while the virtualized body scrolls. Only
   * effective when `virtualized` is true.
   * @default false
   */
  stickyHeader?: boolean;
}
