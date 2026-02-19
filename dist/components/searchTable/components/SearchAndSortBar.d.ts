interface SearchAndSortBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onClearSearch: () => void;
    onGlobalSort: () => void;
    sortConfig?: {
        key: string;
        direction: "asc" | "desc";
    };
    searchInputPlaceholder?: string;
}
export default function SearchAndSortBar({ searchTerm, onSearchChange, onClearSearch, onGlobalSort, sortConfig, searchInputPlaceholder, }: SearchAndSortBarProps): import("react/jsx-runtime").JSX.Element;
export {};
