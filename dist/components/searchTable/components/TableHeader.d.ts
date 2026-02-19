import { SearchColumn } from '../searchTable.props';
interface TableHeaderProps<T> {
    columns: SearchColumn<T>[];
    onSort: (key: string) => void;
    sortConfig?: {
        key: string;
        direction: "asc" | "desc";
    };
}
export default function TableHeader<T>({ columns, onSort, sortConfig, }: TableHeaderProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
