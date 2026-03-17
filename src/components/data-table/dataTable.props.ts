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
  containerClassName?: string;
  className?: string;
  variant?: "default" | "striped" | "bordered" | "minimal";
  size?: "sm" | "md" | "lg";
  itemsPerPageOptions?: number[];
  defaultItemsPerPage?: number;
  title?: string | ReactNode;
}
