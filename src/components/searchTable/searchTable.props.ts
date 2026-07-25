import { TableSize, TableVariants } from "@/types/table.types";
import * as yup from "yup";

/** Allowed column data types: "string" | "date" | "number" | "boolean" | "actions" | "catalog" */
export type ColumnType = "string" | "date" | "number" | "boolean" | "actions" | "catalog";

/** Minimal catalog option with id and display name. */
export interface CatalogOption {
  /** Unique identifier, can be string or number. */
  id: string | number;
  /** Display name for the catalog option. */
  name: string;
}

/** Definition of a single searchable, sortable, editable table column. */
export interface SearchColumn<T = any> {
  /** Unique key used for data access and sorting/filtering. */
  key: string;
  /** Column header label displayed to the user. */
  label: string;
  /** Data type of the column: "string" | "number" | "boolean" | "date" | "actions" | "catalog". */
  type: "string" | "number" | "boolean" | "date" | "actions" | "catalog";
  /** Enables filtering on this column. Can be boolean or "catalog" for catalog-based filters. */
  filter?: boolean | 'catalog'; 
  /** Whether the column is sortable by clicking its header. */
  sortable?: boolean;
  /** Whether inline editing is allowed on this column. */
  editable?: boolean;
  /** Inline edit input type: "text" | "number" | "select" | "checkbox" | "date". */
  inputType?: "text" | "number" | "select" | "checkbox" | "date";
  /** Predefined select options when inputType is "select". */
  options?: { value: string | number; label: string }[];
  /** Custom inline-edit validation. Return error string or undefined if valid. */
  validation?: (value: any, row?:any) => string | undefined;
  /** Additional CSS class on the column cells. */
  className?: string;
  /** Formats numeric values as Mexican pesos (MXN). */
  currencyMX?: boolean; 
  /** Configuration for catalog-type columns: data array and optional key/label field names. */
  catalogOptions?: {
    data: Array<{ id: string | number; name: string }> | any[];
    key?: string;
    label?: string;
  };
  /** Custom render function for the cell. Receives the full row object. */
  render?: (row: T) => React.ReactNode;
  /** Custom action buttons rendered in the cell. Receives row and helper with onEdit. */
  actions?: (row: T, helpers: { onEdit: (row: T) => void }) => React.ReactNode;
  /** Custom save/cancel action buttons in edit mode. Receives row and helpers. */
  saveActions?: (row: T, helpers: { onSave: (row: T) => void, onCancel: () => void, hasErrors: any}) => React.ReactNode;
}

/** Props for the ITSearchTable server-side data table component. */
export interface ITSearchTableProps<T> {
  /** Column definitions: key, label, type, filter, sortable, editable, etc. */
  columns: SearchColumn<T>[];
  /** Additional CSS class for the outer container wrapper. */
  containerClassName?: string;
  /** Placeholder text for the global search input field. */
  searchInputPlaceholder?: string;
  /** Array of row data objects (server-side paginated). */
  data: T[];
  /** Table visual variant: "default" | "striped" | "bordered". */
  variant?: TableVariants;
  /** Additional CSS class applied to the `<table>` element. */
  className?: string;
  /** Table row size: "sm" | "md" | "lg". */
  size?: TableSize;
  /** Available page-size options (e.g. [10, 20, 50, 100]). */
  itemsPerPageOptions?: Array<number>;
  /** Initial/default number of rows per page. */
  defaultItemsPerPage?: number;
  /** Yup validation schema for inline editing. */
  validationSchema?:  yup.ObjectSchema<any>
  /** Title displayed in the table header bar (teal background). */
  title?: string;
  /** Current page index (0-based, server-side). */
  pageIndex: number;
  /** Total number of rows across all pages (server-side). */
  totalCount: number;
  /** Total number of available pages. */
  totalPages: number;
  /** Whether there is a previous page available. */
  hasPreviousPage: boolean;
  /** Whether there is a next page available. */
  hasNextPage: boolean;
  /** Callback when the user navigates to a different page. Receives the new page index. */
  onPageChange?: (page: number) => void;
  /** Callback when the user changes the page-size. Receives the new items-per-page value. */
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  /** Callback when sorting changes. Receives { key, direction: "asc" | "desc" }. */
  onSortChange?: (sortConfig: { key: string, direction: "asc" | "desc" }) => void;
  /** Callback when global search/filter text changes. Receives a key-value filters record. */
  onFilterChange?: (filters: Record<string, string | boolean | number>) => void;
}
