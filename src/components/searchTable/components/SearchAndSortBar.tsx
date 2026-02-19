import React from "react";
import SearchInput from "./SearchInput";
import SortButton from "./SortButton";
import ITButton from "@/components/button/button";

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

export default function SearchAndSortBar({
  searchTerm,
  onSearchChange,
  onClearSearch,
  onGlobalSort,
  sortConfig,
  searchInputPlaceholder = "Buscar en todos los campos...",
}: SearchAndSortBarProps) {
  return (
    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <SearchInput
          placeholder={searchInputPlaceholder}
          value={searchTerm}
          onChange={onSearchChange}
        />

        <SortButton sortConfig={sortConfig} onClick={onGlobalSort} />

        {searchTerm && (
          <ITButton
            size="small"
            variant="outlined"
            color="danger"
            onClick={onClearSearch}
            ariaLabel="Limpiar búsqueda"
            title="Limpiar búsqueda"
          >
            Limpiar
          </ITButton>
        )}
      </div>
    </div>
  );
}
