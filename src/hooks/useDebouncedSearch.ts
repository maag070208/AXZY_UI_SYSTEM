import { useCallback, useEffect, useRef, useState } from "react";

interface UseDebouncedSearchOptions {
  initialValue?: string;
  debounceMs?: number;
  onSearch: (value: string) => void;
}

interface UseDebouncedSearchResult {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleSearchChange: (value: string) => void;
  handleClearSearch: () => void;
}

export function useDebouncedSearch({
  initialValue = "",
  debounceMs = 500,
  onSearch,
}: UseDebouncedSearchOptions): UseDebouncedSearchResult {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedSearch = useCallback(
    (value: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onSearch(value);
      }, debounceMs);
    },
    [onSearch, debounceMs]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
    onSearch("");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [onSearch]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { searchTerm, setSearchTerm, handleSearchChange, handleClearSearch };
}
