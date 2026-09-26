import { useCallback, useMemo, useState } from "react";
import type { ColumnFilters, ColumnFilterValue } from "@/types/table.types";

interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

export interface UseTableStateOptions {
  defaultItemsPerPage?: number;
  initialSort?: SortConfig | null;
}

export interface UseTableStateResult {
  currentPage: number;
  itemsPerPage: number;
  filters: ColumnFilters;
  sortConfig: SortConfig | null;
  totalPages: number;
  setTotalPages: (pages: number) => void;
  goToPage: (page: number) => void;
  handleItemsPerPageChange: (value: number) => void;
  handleFilterChange: (key: string, value: ColumnFilterValue | undefined) => void;
  handleSort: (key: string, sortable?: boolean) => void;
  resetPage: () => void;
  clearFilters: () => void;
}

/**
 * A filter value is considered empty when it should be removed from the filter
 * map: `undefined`/`null`/`""`, or a date range whose both ends are null.
 */
const isEmptyFilterValue = (value: ColumnFilterValue | undefined): boolean => {
  if (value === undefined || value === null || value === "") return true;
  if (Array.isArray(value)) return value[0] == null && value[1] == null;
  return false;
};

export function useTableState({
  defaultItemsPerPage = 10,
  initialSort = null,
}: UseTableStateOptions = {}): UseTableStateResult {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [filters, setFilters] = useState<ColumnFilters>({});
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(initialSort);
  const [totalPages, setTotalPages] = useState(1);

  const goToPage = useCallback(
    (page: number) => {
      // No limitar contra `totalPages`: ese estado vive en useTableState y
      // nunca se sincroniza con el total real (ITDataTable calcula el suyo).
      // ITPagination ya deshabilita la navegación más allá de la última página.
      if (page >= 1) {
        setCurrentPage(page);
      }
    },
    []
  );

  const handleItemsPerPageChange = useCallback((value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  }, []);

  const handleFilterChange = useCallback(
    (key: string, value: ColumnFilterValue | undefined) => {
      setFilters((prev) => {
        if (isEmptyFilterValue(value)) {
          const next = { ...prev };
          delete next[key];
          return next;
        }
        return { ...prev, [key]: value as ColumnFilterValue };
      });
      setCurrentPage(1);
    },
    []
  );

  const handleSort = useCallback((key: string, sortable?: boolean) => {
    if (sortable === false) return;
    setSortConfig((prev) => {
      let direction: "asc" | "desc" = "asc";
      if (prev?.key === key && prev.direction === "asc") {
        direction = "desc";
      }
      return { key, direction };
    });
    setCurrentPage(1);
  }, []);

  const resetPage = useCallback(() => setCurrentPage(1), []);
  const clearFilters = useCallback(() => {
    setFilters({});
    setCurrentPage(1);
  }, []);

  const stable = useMemo(
    () => ({
      currentPage,
      itemsPerPage,
      filters,
      sortConfig,
      totalPages,
      setTotalPages,
      goToPage,
      handleItemsPerPageChange,
      handleFilterChange,
      handleSort,
      resetPage,
      clearFilters,
    }),
    [
      currentPage,
      itemsPerPage,
      filters,
      sortConfig,
      totalPages,
      setTotalPages,
      goToPage,
      handleItemsPerPageChange,
      handleFilterChange,
      handleSort,
      resetPage,
      clearFilters,
    ]
  );

  return stable;
}
