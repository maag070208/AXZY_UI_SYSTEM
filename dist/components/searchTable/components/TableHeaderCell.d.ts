interface TableHeaderCellProps {
    label: string;
    sortable?: boolean;
    onSort: () => void;
    sortConfig?: {
        key: string;
        direction: "asc" | "desc";
    };
    className?: string;
}
export default function TableHeaderCell({ label, sortable, onSort, sortConfig, className, }: TableHeaderCellProps): import("react/jsx-runtime").JSX.Element;
export {};
