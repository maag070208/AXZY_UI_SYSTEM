import { SearchColumn } from '../searchTable.props';
import * as yup from "yup";
interface TableRowProps<T> {
    row: T;
    rowIndex: number;
    columns: SearchColumn<T>[];
    getNestedValue: (obj: unknown, path: string) => unknown;
    onSave?: (row: T) => void;
    onCancel?: () => void;
    validationSchema?: yup.ObjectSchema<any>;
    isEditing?: boolean;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
}
export default function TableRow<T>({ row, rowIndex, columns, getNestedValue, onSave, onCancel, validationSchema, isEditing, onEdit, }: TableRowProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
