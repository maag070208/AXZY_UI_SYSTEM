import { TableSize, TableVariants } from '../../types/table.types';
import * as yup from "yup";
export type ColumnType = "string" | "date" | "number" | "boolean" | "actions" | "catalog";
export interface CatalogOption {
    id: string | number;
    name: string;
}
export interface SearchColumn<T = any> {
    key: string;
    label: string;
    type: "string" | "number" | "boolean" | "date" | "actions" | "catalog";
    filter?: boolean | 'catalog';
    sortable?: boolean;
    editable?: boolean;
    inputType?: "text" | "number" | "select" | "checkbox" | "date";
    options?: {
        value: string | number;
        label: string;
    }[];
    validation?: (value: any, row?: any) => string | undefined;
    className?: string;
    currencyMX?: boolean;
    catalogOptions?: {
        data: Array<{
            id: string | number;
            name: string;
        }> | any[];
        key?: string;
        label?: string;
    };
    render?: (row: T) => React.ReactNode;
    actions?: (row: T, helpers: {
        onEdit: (row: T) => void;
    }) => React.ReactNode;
    saveActions?: (row: T, helpers: {
        onSave: (row: T) => void;
        onCancel: () => void;
        hasErrors: any;
    }) => React.ReactNode;
}
export interface ITSearchTableProps<T> {
    columns: SearchColumn<T>[];
    containerClassName?: string;
    searchInputPlaceholder?: string;
    data: T[];
    variant?: TableVariants;
    className?: string;
    size?: TableSize;
    itemsPerPageOptions?: Array<number>;
    defaultItemsPerPage?: number;
    validationSchema?: yup.ObjectSchema<any>;
    title?: string;
    pageIndex: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    onPageChange?: (page: number) => void;
    onItemsPerPageChange?: (itemsPerPage: number) => void;
    onSortChange?: (sortConfig: {
        key: string;
        direction: "asc" | "desc";
    }) => void;
    onFilterChange?: (filters: Record<string, string | boolean | number>) => void;
}
