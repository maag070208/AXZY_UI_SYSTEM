import { useCallback, useMemo, useState } from "react";

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
  filters: Record<string, string | boolean | number>;
  sortConfig: SortConfig | null;
  totalPages: number;
  setTotalPages: (pages: number) => void;
  goToPage: (page: number) => void;
  handleItemsPerPageChange: (value: number) => void;
  handleFilterChange: (
    key: string,
    value: string | boolean | number | undefined
  ) => void;
  handleSort: (key: string, sortable?: boolean) => void;
  resetPage: () => void;
  clearFilters: () => void;
}

export function useTableState({
  defaultItemsPerPage = 10,
  initialSort = null,
}: UseTableStateOptions = {}): UseTableStateResult {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [filters, setFilters] = useState<
    Record<string, string | boolean | number>
  >({});
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(initialSort);
  const [totalPages, setTotalPages] = useState(1);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const handleItemsPerPageChange = useCallback((value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  }, []);

  const handleFilterChange = useCallback(
    (key: string, value: string | boolean | number | undefined) => {
      setFilters((prev) => {
        if (value === undefined || value === null || value === "") {
          const next = { ...prev };
          delete next[key];
          return next;
        }
        return { ...prev, [key]: value };
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
