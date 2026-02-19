import { ITSearchTableProps } from './searchTable.props';
interface CustomITSearchTableProps<T> extends ITSearchTableProps<T> {
    editingRow?: number | null;
    searchTermInitial?: string;
    onClearSearch?: () => void;
    onEdit?: (row: T, index: number) => void;
    onSave?: (row: T, index: number) => void;
    onCancel?: () => void;
    sortConfig?: {
        key: string;
        direction: "asc" | "desc";
    };
}
export default function ITSearchTable<T extends Record<string, unknown>>({ columns, data, containerClassName, searchTermInitial, searchInputPlaceholder, className, variant, size, itemsPerPageOptions, defaultItemsPerPage, title, pageIndex, totalCount, totalPages, hasPreviousPage, hasNextPage, onPageChange, onItemsPerPageChange, onSortChange, onFilterChange, sortConfig, editingRow, validationSchema, onClearSearch, onEdit, onSave, onCancel, }: CustomITSearchTableProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
