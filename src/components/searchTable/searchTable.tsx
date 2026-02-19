import clsx from "clsx";
import React, { useCallback, useRef, useState } from "react";

import { sizeStyles, variantStyles } from "@/types/table.types";
import { ITSearchTableProps } from "./searchTable.props";
import SearchAndSortBar from "./components/SearchAndSortBar";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";
import { getNestedValue } from "@/utils/table.utils";
import TableEmptyState from "./components/TableEmptyState";
import PaginationControls from "./components/PaginationControls";

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

export default function ITSearchTable<T extends Record<string, unknown>>({
  columns,
  data,
  containerClassName,
  searchTermInitial = "",
  searchInputPlaceholder = "Buscar en todos los campos...",
  className,
  variant = "default",
  size = "md",
  itemsPerPageOptions = [10, 20, 50, 100],
  defaultItemsPerPage = 10,
  title,
  pageIndex,
  totalCount,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
  onItemsPerPageChange,
  onSortChange,
  onFilterChange,
  sortConfig,
  editingRow = null,
  validationSchema,
  onClearSearch,
  onEdit,
  onSave,
  onCancel,
}: CustomITSearchTableProps<T>) {
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [searchTerm, setSearchTerm] = useState<string>(searchTermInitial);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    if (onItemsPerPageChange) {
      onItemsPerPageChange(value);
    }
  };

  const goToPage = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const debouncedSearch = useCallback(
    (value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        if (onFilterChange) {
          onFilterChange(value ? { query: value } : {});
        }
      }, 500);
    },
    [onFilterChange]
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    debouncedSearch(value);
  };

const handleClearSearch = () => {
  setSearchTerm("");
  if (onClearSearch) {
    onClearSearch();
  }
  if (onFilterChange) {
    onFilterChange({});
  }
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }
};

  const handleGlobalSort = () => {
    const newDirection = sortConfig?.direction === "asc" ? "desc" : "asc";
    if (onSortChange) {
      onSortChange({ key: "id", direction: newDirection });
    }
  };

  const handleSort = (key: string) => {
    const column = columns.find((col) => col.key === key);
    if (!column || !column.sortable) return;

    let newDirection: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key) {
      newDirection = sortConfig.direction === "asc" ? "desc" : "asc";
    }

    if (onSortChange) {
      onSortChange({ key, direction: newDirection });
    }
  };

  const handleEdit = (row: T, index: number) => {
    if (onEdit) {
      onEdit(row, index);
    }
  };

  const handleSave = (updatedRow: T, index: number) => {
    if (onSave) {
      onSave(updatedRow, index);
    }
  };

  const handleCancelEdit = () => {
    if (onCancel) {
      onCancel();
    }
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

return (
  <div className={clsx("space-y-4 w-full", containerClassName)}>
    {/* Card principal con sombra */}
    <div className="shadow-md sm:rounded-lg overflow-hidden">
      {/* Header fijo */}
      {title && (
        <div className="bg-teal-500 text-white px-6 py-4">
          <h2 className="text-xl font-bold text-center whitespace-nowrap">
            {title}
          </h2>
        </div>
      )}

      {/* Contenido con scroll */}
      <div className="bg-white">
        {/* Barra de búsqueda y ordenamiento */}
        <div className="p-4 border-b border-gray-200">
          <SearchAndSortBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onClearSearch={handleClearSearch}
            onGlobalSort={handleGlobalSort}
            sortConfig={sortConfig}
            searchInputPlaceholder={searchInputPlaceholder}
          />
        </div>

        {/* Tabla con scroll horizontal */}
        <div className="overflow-x-auto">
          <table
            className={clsx(
              "min-w-full text-sm text-left bg-white text-gray-900 table-auto",
              variantStyles[variant],
              sizeStyles[size]
            )}
          >
            <TableHeader
              columns={columns}
              onSort={handleSort}
              sortConfig={sortConfig}
            />
            <tbody>
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    row={row}
                    rowIndex={rowIndex}
                    columns={columns}
                    validationSchema={validationSchema}
                    getNestedValue={getNestedValue}
                    isEditing={editingRow === rowIndex}
                    onEdit={() => handleEdit(row, rowIndex)}
                    onSave={(updatedRow) => handleSave(updatedRow, rowIndex)}
                    onCancel={handleCancelEdit}
                  />
                ))
              ) : (
                <TableEmptyState
                  colSpan={columns.length + 1}
                  searchTerm={searchTerm}
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* Paginación */}
    <PaginationControls
      pageIndex={pageIndex}
      totalPages={totalPages}
      hasPreviousPage={hasPreviousPage}
      hasNextPage={hasNextPage}
      onPageChange={goToPage}
      itemsPerPage={itemsPerPage}
      itemsPerPageOptions={itemsPerPageOptions}
      onItemsPerPageChange={handleItemsPerPageChange}
      currentCount={data.length}
      totalCount={totalCount}
    />
  </div>
);
}