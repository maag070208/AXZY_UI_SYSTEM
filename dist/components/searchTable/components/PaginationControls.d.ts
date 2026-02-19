interface PaginationControlsProps {
    pageIndex: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    onPageChange: (page: number) => void;
    itemsPerPage: number;
    itemsPerPageOptions: number[];
    onItemsPerPageChange: (value: number) => void;
    currentCount: number;
    totalCount: number;
}
export default function PaginationControls({ pageIndex, totalPages, hasPreviousPage, hasNextPage, onPageChange, itemsPerPage, itemsPerPageOptions, onItemsPerPageChange, currentCount, totalCount, }: PaginationControlsProps): import("react/jsx-runtime").JSX.Element;
export {};
