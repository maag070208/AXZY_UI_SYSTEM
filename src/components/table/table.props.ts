import { TableSize, TableVariants } from "@/types/table.types";

export type ColumnType = "string" | "date" | "number" | "boolean" | "actions" | "catalog";

export interface CatalogOption {
  id: string | number;
  name: string;
}

export interface Column<T = any> {
  key: string;
  label: string;
  className?: string;
  currencyMX?: boolean; 
  actions?: (row: T) => React.ReactNode;
  filter?: boolean | "catalog";
  type: ColumnType;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  editComponent?: (props: {
    value: any;
    onChange: (value: any) => void;
    rowData: T;
  }) => React.ReactNode;
  // Nuevas propiedades para catálogo
  catalogOptions?: {
    data: CatalogOption[];
    loading?: boolean;
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