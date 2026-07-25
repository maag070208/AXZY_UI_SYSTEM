import { ReactNode } from "react";
import { Column } from "../table/table.props";

export interface ITDataTableFetchParams {
  page: number;
  limit: number;
  filters: Record<string, string | number | boolean | Date>;
  sort?: {
    key: string;
    direction: "asc" | "desc";
  };
}

export interface ITDataTableResponse<T> {
  data: T[];
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
  externalFilters?: Record<string, string | number | boolean | Date>;

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
}
