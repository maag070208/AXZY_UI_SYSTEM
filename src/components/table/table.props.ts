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
  columns: Column<T>[];
  containerClassName?: string;
  data: T[];
  variant?: TableVariants;
  className?: string;
  size?: TableSize;
  itemsPerPageOptions?: Array<number>;
  defaultItemsPerPage?: number;
  title?: string;
}