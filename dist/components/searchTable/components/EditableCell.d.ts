import { SearchColumn } from '../searchTable.props';
interface EditableCellProps<T> {
    column: SearchColumn<T>;
    value: any;
    onChange: (value: any, error?: string) => void;
    error?: string;
    row: T;
}
export default function EditableCell<T>({ column, value, onChange, error, row, }: EditableCellProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
