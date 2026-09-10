import { TableSize, TableVariants } from "@/types/table.types";

/** Data type of a table column, controls default rendering, filter UI, and sort comparison. */
export type ColumnType = "string" | "date" | "number" | "boolean" | "actions" | "catalog";

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
  /** Enables per-column filtering. Pass `true` for a text/number/boolean filter matching `type`, or `"catalog"` to filter against `catalogOptions`. @default false */
  filter?: boolean | "catalog";
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
  };
}

export interface ITTableProps<T> {
  /** Column definitions: key, label, type, sortable behavior, filters, and custom rendering. */
  columns: Column<T>[];
  /** Additional CSS classes for the outermost container. */
  containerClassName?: string;
  /** The data array to render in the table body. */
  data: T[];
  /** Visual variant: "default", "striped", "bordered", "borderless". */
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
}
