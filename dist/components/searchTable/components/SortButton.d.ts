interface SortButtonProps {
    sortConfig?: {
        key: string;
        direction: "asc" | "desc";
    };
    onClick: () => void;
    className?: string;
}
export default function SortButton({ sortConfig, onClick, className, }: SortButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
