import { ITTableProps } from './table.props';
export declare const formatCurrencyMX: (value: number) => string;
export default function ITTable<T extends Record<string, unknown>>({ columns, data, containerClassName, className, variant, size, itemsPerPageOptions, defaultItemsPerPage, title, }: ITTableProps<T>): import("react/jsx-runtime").JSX.Element;
