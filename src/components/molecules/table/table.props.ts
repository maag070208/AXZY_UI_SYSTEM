import { TableDensity, TableSize, TableVariants } from "@/types/table.types";

/** Data type of a table column, controls default rendering, filter UI, and sort comparison. */
export type ColumnType = "string" | "date" | "number" | "boolean" | "actions" | "catalog";

/**
 * Per-column filter mode, set through `Column.filter`.
 *
 * - `true` — text/number input (or boolean toggle when `type: "boolean"`).
 * - `"catalog"` — `ITSelect` dropdown populated from `catalogOptions`.
 * - `"search"` — `ITSearchSelect` typeahead populated from `catalogOptions`
 *   (respects `catalogOptions.onSearch` for server-side search).
 * - `"date"` — `ITDatePicker` single-date filter.
 * - `"date-range"` — `ITDatePicker` in range mode.
 */
export type ColumnFilterMode = boolean | "catalog" | "search" | "date" | "date-range";

/** A single selectable entry for a `"catalog"`-type column's filter/value lookup. */
export interface CatalogOption {
  /** Unique identifier matched against the row's field value. */
  id: string | number;
  /** Human-readable label shown in the filter dropdown and resolved cell display. */
  name: string;
}

/** Definition of a single column for ITTable. */
export interface Column<T = any> {
  /** Field key on the row object this column reads from (supports dot-notation for nested values, e.g. `"address.city"`). */
  key: string;
  /** Column header text. */
  label: string;
  /** Additional CSS classes applied to both the header (`<th>`) and body (`<td>`) cells of this column. */
  className?: string;
  /** Formats numeric values as Mexican pesos (MXN) via `Intl`-based currency formatting. Only applies when `type` is `"number"`. @default false */
  currencyMX?: boolean;
  /** Custom action buttons/content rendered for a `"actions"`-type column. Receives the full row object. */
  actions?: (row: T) => React.ReactNode;
  /** Enables per-column filtering. Pass `true` for a text/number/boolean filter matching `type`, `"catalog"` for an `ITSelect` fed by `catalogOptions`, `"search"` for an `ITSearchSelect` typeahead, or `"date"` / `"date-range"` for an `ITDatePicker`. @default false */
  filter?: ColumnFilterMode;
  /** Column data type. Drives default cell rendering, filter UI, and sort comparison. */
  type: ColumnType;
  /** Whether clicking the header sorts by this column. Ignored for `type: "actions"`. @default false */
  sortable?: boolean;
  /** Custom cell renderer, takes precedence over the default type-based rendering. Receives the full row object. */
  render?: (row: T) => React.ReactNode;
  /** Custom inline-edit input renderer (used by table variants that support inline editing). */
  editComponent?: (props: {
    value: any;
    onChange: (value: any) => void;
    rowData: T;
  }) => React.ReactNode;
  /** Configuration for `type: "catalog"` columns: the lookup options plus loading/error state for async catalogs. */
  catalogOptions?: {
    /** Available catalog entries used to resolve/filter the raw id stored on the row. */
    data: CatalogOption[];
    /** Shows a loading spinner in the filter UI while the catalog is being fetched. @default false */
    loading?: boolean;
    /** Shows an error state in the filter UI when the catalog failed to load. @default false */
    error?: boolean;
    /**
     * Server-side search handler for a `filter: "search"` column. When provided,
     * `ITSearchSelect` delegates filtering to this callback (debounced) instead
     * of filtering `data` locally; the parent is expected to update `data`.
     */
    onSearch?: (query: string) => void;
  };
  /**
   * Date bounds applied by the `"date"` and `"date-range"` filters, forwarded to
   * the underlying `ITDatePicker`. Ignored by every other filter mode.
   */
  dateFilterOptions?: {
    /** Earliest selectable date. */
    minDate?: Date;
    /** Latest selectable date. */
    maxDate?: Date;
  };
  /**
   * Fixed column width. A `number` is treated as pixels (`width: 120` → `120px`);
   * a `string` is passed through as any CSS length (`"20%"`, `"12rem"`).
   * A `<colgroup>` is only rendered when at least one column defines a width.
   */
  width?: number | string;
  /** Minimum column width in pixels, applied to the header and body cells via inline style. */
  minWidth?: number;
  /** Horizontal alignment of this column's header and body cells. @default "left" */
  align?: "left" | "center" | "right";
  /**
   * Truncates overflowing cell content with an ellipsis and exposes the raw
   * string/number value through the native `title` attribute.
   * @default false
   */
  truncate?: boolean;
}

export interface ITTableProps<T> {
  /** Column definitions: key, label, type, sortable behavior, filters, and custom rendering. */
  columns: Column<T>[];
  /** Additional CSS classes for the outermost container. */
  containerClassName?: string;
  /** The data array to render in the table body. */
  data: T[];
  /** Visual variant: "default", "striped", "bordered". */
  variant?: TableVariants;
  /** Additional CSS classes for the root table wrapper. */
  className?: string;
  /** Row size preset: "sm" | "md" | "lg". */
  size?: TableSize;
  /** Available options for the per-page selector (e.g. [5, 10, 20]). */
  itemsPerPageOptions?: Array<number>;
  /** Default number of rows shown per page. */
  defaultItemsPerPage?: number;
  /** Optional title rendered above the table in the header section. */
  title?: string;
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
