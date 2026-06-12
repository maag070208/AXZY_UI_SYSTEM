import { useTableState } from "@/hooks/useTableState";
import { sizeStyles, variantStyles } from "@/types/table.types";
import clsx from "clsx";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaCheck, FaSpinner, FaTimes } from "react-icons/fa";
import { MdOutlineSwapVert } from "react-icons/md";
import ITInput from "../input/input";
import ITPagination from "../pagination/pagination";
import ITSelect from "../select/select";
import { Column } from "../table/table.props";
import { formatCurrencyMX } from "../table/table";
import { ITDataTableProps } from "./dataTable.props";
import ITText from "@/components/text/text";

const getNestedValue = (obj: unknown, path: string) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const EMPTY_OBJECT = {};

export default function ITDataTable<T extends Record<string, unknown>>({
  columns,
  fetchData,
  debounceMs = 500,
  externalFilters = EMPTY_OBJECT,
  loadingIndicator,
  fetchOnMount = true,
  reloadTrigger,
  containerClassName,
  className,
  variant = "default",
  size = "md",
  itemsPerPageOptions = [5, 10, 20],
  defaultItemsPerPage = 10,
  title,
}: ITDataTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(fetchOnMount);

  const {
    currentPage,
    itemsPerPage,
    filters,
    sortConfig,
    totalPages,
    goToPage,
    handleFilterChange,
    handleSort,
    handleItemsPerPageChange,
  } = useTableState({ defaultItemsPerPage });

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const computedTotalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const performFetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchData({
        page: currentPage,
        limit: itemsPerPage,
        filters: { ...filters, ...externalFilters },
        sort: sortConfig || undefined,
      });
      setData(response.data || []);
      setTotalItems(response.total || 0);
    } catch (error) {
      console.error("ITDataTable: Error fetching data", error);
      setData([]);
      setTotalItems(0);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, filters, sortConfig, fetchData, externalFilters]);

  useEffect(() => {
    if (!fetchOnMount && data.length === 0 && !isLoading) return;

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(() => {
      performFetch();
    }, debounceMs);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [currentPage, itemsPerPage, sortConfig, filters, externalFilters, reloadTrigger, fetchOnMount, performFetch]);

  const renderFilterInput = (col: Column<T>) => {
    if (!col.filter) return null;

    if (col.type === "boolean") {
      const currentValue = filters[col.key];
      const nextValue =
        currentValue === undefined ? true : currentValue === true ? false : undefined;

      const getToggleLabel = () => {
        if (currentValue === undefined) return "Mostrar todos";
        if (currentValue === true) return "Filtrar solo verdaderos";
        return "Filtrar solo falsos";
      };

      return (
        <button
          className="flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-full p-1 transition-all duration-200"
          onClick={() => handleFilterChange(col.key, nextValue)}
          aria-label={`${getToggleLabel()} para ${col.label}`}
          title={`${getToggleLabel()} para ${col.label}`}
          disabled={isLoading}
        >
          <div className="relative w-10 h-5 bg-gray-300 rounded-full">
            <div
              className={clsx(
                "absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 shadow-sm",
                {
                  "left-0.5 bg-gray-400": currentValue === undefined,
                  "left-5 bg-slate-500": currentValue === true,
                  "left-0.5 bg-gray-500": currentValue === false,
                }
              )}
            />
          </div>
        </button>
      );
    }

    if (col.filter === "catalog" && col.catalogOptions) {
      if (col.catalogOptions.loading) {
        return <FaSpinner className="animate-spin" aria-label="Cargando opciones" title="Cargando opciones" />;
      }
      if (col.catalogOptions.error) {
        return <ITText as="span" className="text-red-500 text-xs">Error cargando</ITText>;
      }
      return (
        <ITSelect
          name={`filter-${col.key}`}
          options={[
            { value: "", label: "Todos" },
            ...col.catalogOptions.data.map((item) => ({
              value: String(item.id),
              label: item.name,
            })),
          ]}
          value={String(filters[col.key] || "")}
          onChange={(e) => {
            const value = e.target.value === "" ? undefined : e.target.value;
            handleFilterChange(col.key, value);
          }}
          onBlur={() => {}}
          className="w-full text-xs"
          disabled={isLoading}
        />
      );
    }

    return (
      <ITInput
        name={`filter-${col.key}`}
        className="w-full text-xs"
        placeholder="Buscar..."
        value={String(filters[col.key] || "")}
        onChange={(e) => handleFilterChange(col.key, e.target.value)}
        onBlur={() => {}}
        disabled={isLoading}
      />
    );
  };

  const renderCellContent = (col: Column<T>, row: T) => {
    const value = getNestedValue(row, col.key);
    if (col.render) return col.render(row);

    switch (col.type) {
      case "number":
        return typeof value === "number" && col.currencyMX ? formatCurrencyMX(value) : value;
      case "boolean":
        return value ? (
          <FaCheck className="text-green-500" aria-label="Verdadero" title="Verdadero" />
        ) : (
          <FaTimes className="text-red-500" aria-label="Falso" title="Falso" />
        );
      case "actions":
        return col.actions ? col.actions(row) : null;
      case "catalog":
        if (col.catalogOptions) {
          const catalogItem = col.catalogOptions.data.find((item) => item.id === value);
          return catalogItem?.name || value;
        }
        return value as React.ReactNode;
      default:
        return value as React.ReactNode;
    }
  };

  return (
    <div className={clsx("space-y-4 w-full relative", containerClassName)}>
      <div className="rounded-xl shadow-sm border border-secondary-200 overflow-hidden" style={{ backgroundColor: 'var(--color-table-rowBg, #ffffff)' }}>
        {title && (
          <div className="px-6 py-5 border-b border-secondary-100 flex justify-between items-center" style={{ backgroundColor: 'var(--color-table-rowBg, #ffffff)' }}>
            <ITText as="h2" className="text-xl font-bold text-secondary-900 leading-tight">{title}</ITText>
            {isLoading && (
              <div className="text-secondary-400">
                {loadingIndicator || <FaSpinner className="animate-spin text-primary-500 text-xl" />}
              </div>
            )}
          </div>
        )}

        <div className="overflow-x-auto relative min-h-[200px]">
          {isLoading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-[2px] transition-all duration-300">
             <div className="flex flex-col items-center gap-3 p-6 rounded-2xl shadow-xl border border-secondary-100 animate-in fade-in zoom-in duration-300" style={{ backgroundColor: 'var(--color-table-rowBg, #ffffff)' }}>
                  {loadingIndicator || (
                    <>
                      <FaSpinner className="animate-spin text-primary-500 text-4xl" />
                      <ITText as="span" className="text-sm font-semibold text-secondary-600 animate-pulse">Cargando datos...</ITText>
                    </>
                  )}
               </div>
            </div>
          )}

          <table
            className={clsx(
              "min-w-max w-full text-sm text-left text-secondary-600 transition-opacity duration-300",
              isLoading ? "opacity-50" : "opacity-100",
              variantStyles[variant],
              sizeStyles[size],
              className
            )}
          >
            <thead>
              <tr className="bg-secondary-50 border-b border-secondary-200 text-xs uppercase tracking-wider font-semibold text-secondary-500">
                {columns.map((col) => (
                  <th key={col.key} scope="col" className={clsx("px-4 py-4 align-top", col.className)}>
                    <div className="flex flex-col gap-3 min-w-[150px]">
                      <div className="flex items-center justify-between gap-2">
                        <ITText as="span" className="text-secondary-700 font-bold">{col.label}</ITText>
                        {col.sortable && col.type !== "actions" && (
                          <button
                            onClick={() => handleSort(col.key)}
                            disabled={isLoading}
                            className={`p-1 rounded-md transition-colors ${
                              sortConfig?.key === col.key
                                ? "bg-secondary-200 text-secondary-900"
                                : "hover:bg-secondary-200 text-secondary-400 hover:text-secondary-700"
                            } disabled:opacity-50`}
                            title={`Ordenar por ${col.label}`}
                          >
                            <MdOutlineSwapVert className="w-4 h-4" aria-hidden="true" />
                          </button>
                        )}
                      </div>

                      <div className="w-full">{col.filter ? renderFilterInput(col) : null}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100">
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-secondary-50/50 transition-colors duration-150 group">
                    {columns.map((col) => (
                      <td key={`${rowIndex}-${col.key}`} className={clsx("px-4 py-3 align-middle", col.className)}>
                        {col.type === "actions" ? (
                          <div className="flex items-center justify-center gap-2">
                            {renderCellContent(col, row) as React.ReactNode}
                          </div>
                        ) : (
                          <div className="text-secondary-700 font-medium">
                            {renderCellContent(col, row) as React.ReactNode}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-20 text-center">
                    {!isLoading && (
                      <div className="flex flex-col items-center justify-center text-secondary-400">
                        <ITText as="span" className="text-lg">No se encontraron resultados</ITText>
                        <ITText as="span" className="text-sm mt-1">Intenta ajustar los filtros</ITText>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-b-xl border-t border-secondary-200 px-6 py-4" style={{ backgroundColor: 'var(--color-table-rowBg, #ffffff)' }}>
        <ITPagination
          currentPage={currentPage}
          totalPages={computedTotalPages}
          onPageChange={goToPage}
          color="primary"
          itemsPerPageOptions={itemsPerPageOptions}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalItems={totalItems}
        />
      </div>
    </div>
  );
}
