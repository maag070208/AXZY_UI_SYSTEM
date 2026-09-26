import { useTableState } from "@/hooks/useTableState";
import { useElementSize } from "@/hooks/useElementSize";
import { useVirtualRows } from "@/hooks/useVirtualRows";
import { getRowHeight, sizeStyles, tableAlignClasses, variantStyles } from "@/types/table.types";
import clsx from "clsx";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaCheck, FaSpinner, FaTimes, FaTable, FaThLarge } from "react-icons/fa";
import { MdOutlineSwapVert } from "react-icons/md";
import ITInput from "@/components/atoms/input/input";
import ITPagination from "@/components/molecules/pagination/pagination";
import ITSelect from "@/components/molecules/select/select";
import ITSearchSelect from "@/components/molecules/search-select/search-select";
import ITDatePicker from "@/components/molecules/date-picker/datePicker";
import { Column } from "@/components/molecules/table/table.props";
import { formatCurrencyMX, isInteractiveTarget } from "@/utils/table.utils";
import { ITDataTableProps } from "./dataTable.props";
import ITText from "@/components/atoms/text/text";
import {
  tableActionsCell,
  tableBody,
  tableCardClickable,
  tableCardHover,
  tableCell,
  tableCellText,
  tableContainer,
  tableEmptyContent,
  tableHeaderCell,
  tableHeaderRow,
  tableRow,
  tableRowClickable,
} from "@/utils/styles";

const getNestedValue = (obj: unknown, path: string) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const EMPTY_OBJECT = {};

/**
 * Async server-side data table with sorting, filtering, and pagination.
 *
 * Fetches data via the `fetchData` callback whenever pagination, sorting, or
 * filters change. Supports column-level text/catalog/boolean filters, sortable
 * columns, and a loading overlay. Built on-top of internal table hooks for
 * automatic state coordination.
 *
 * @example
 * ```tsx
 * <ITDataTable
 *   columns={[
 *     { key: "name", label: "Name", sortable: true, filter: true },
 *     { key: "status", label: "Status", type: "boolean", filter: true },
 *   ]}
 *   fetchData={async (params) => api.fetchItems(params)}
 *   title="Users"
 *   variant="bordered"
 * />
 * ```
 */
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
  renderCard,
  defaultView,
  showVerticalBorder = true,
  verticalBorderClassname,
  onRowClick,
  layout = "auto",
  density = "normal",
  autoCardBreakpoint = 0,
  virtualized = false,
  virtualizedMaxHeight = 400,
  rowHeight,
  overscan = 5,
  stickyHeader = false,
}: ITDataTableProps<T>) {
  const [viewMode, setViewMode] = useState<"table" | "cards">(defaultView || "table");
  const { ref: rootRef, width: containerWidth } = useElementSize<HTMLDivElement>();
  const [data, setData] = useState<T[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(fetchOnMount);

  const isFixed = layout === "fixed";
  const forcedCards =
    autoCardBreakpoint > 0 && containerWidth > 0 && containerWidth < autoCardBreakpoint;
  const effectiveView: "table" | "cards" = forcedCards ? "cards" : viewMode;
  const hasColumnWidths = columns.some((col) => col.width != null);
  const tableLayoutClass = isFixed
    ? "w-full text-sm text-left text-secondary-600 transition-opacity duration-300"
    : "min-w-max w-full text-sm text-left text-secondary-600 transition-opacity duration-300";

  const isTableVirtual = virtualized && effectiveView === "table";
  const isStickyHeader = stickyHeader && isTableVirtual;
  const resolvedRowHeight = rowHeight ?? getRowHeight(size, density);
  const columnCount = columns.length;
  const scrollOuterClass = isTableVirtual
    ? "relative min-h-[200px]"
    : "overflow-x-auto relative min-h-[200px]";

  const {
    currentPage,
    itemsPerPage,
    filters,
    sortConfig,
    goToPage,
    handleFilterChange,
    handleSort,
    handleItemsPerPageChange,
  } = useTableState({ defaultItemsPerPage });

  const {
    scrollRef,
    startIndex,
    endIndex,
    topSpacerHeight,
    bottomSpacerHeight,
  } = useVirtualRows({
    count: data.length,
    rowHeight: resolvedRowHeight,
    overscan,
    enabled: isTableVirtual,
    resetKey: `${currentPage}-${itemsPerPage}`,
  });

  const windowData = isTableVirtual ? data.slice(startIndex, endIndex + 1) : data;

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasFetchedRef = useRef(false);
  const fetchDataRef = useRef(fetchData);
  fetchDataRef.current = fetchData;
  const externalFiltersRef = useRef(externalFilters);
  externalFiltersRef.current = externalFilters;

  // Snapshot JSON para re-fetch solo cuando los valores cambian (no por nueva
  // identidad del objeto que el padre pase en cada render).
  const externalKey = JSON.stringify(externalFilters);

  const computedTotalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const performFetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchDataRef.current({
        page: currentPage,
        limit: itemsPerPage,
        filters: { ...filters, ...externalFiltersRef.current },
        sort: sortConfig || undefined,
      });
      setData(response.data || []);
      setTotalItems(response.total || 0);
      hasFetchedRef.current = true;
    } catch (error) {
      console.error("ITDataTable: Error fetching data", error);
      setData([]);
      setTotalItems(0);
      hasFetchedRef.current = true;
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, filters, sortConfig]);

  const performFetchRef = useRef(performFetch);
  performFetchRef.current = performFetch;

  useEffect(() => {
    if (!fetchOnMount && !hasFetchedRef.current) return;

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(() => {
      performFetchRef.current();
    }, debounceMs);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [currentPage, itemsPerPage, sortConfig, filters, externalKey, reloadTrigger, fetchOnMount, debounceMs]);

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
          <div className="relative w-10 h-5 bg-secondary-300 rounded-full">
            <div
              className={clsx(
                "absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 shadow-sm",
                {
                  "left-0.5 bg-secondary-400": currentValue === undefined,
                  "left-5 bg-slate-500": currentValue === true,
                  "left-0.5 bg-secondary-500": currentValue === false,
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
        return <ITText as="span" className="text-danger-500 text-xs">Error cargando</ITText>;
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

    if (col.filter === "search" && col.catalogOptions) {
      if (col.catalogOptions.loading) {
        return <FaSpinner className="animate-spin" aria-label="Cargando opciones" title="Cargando opciones" />;
      }
      if (col.catalogOptions.error) {
        return <ITText as="span" className="text-danger-500 text-xs">Error cargando</ITText>;
      }
      const searchValue = filters[col.key];
      return (
        <ITSearchSelect
          name={`filter-${col.key}`}
          options={col.catalogOptions.data.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          value={
            typeof searchValue === "string" || typeof searchValue === "number"
              ? searchValue
              : ""
          }
          onChange={(value) => handleFilterChange(col.key, value === "" ? undefined : value)}
          onSearch={col.catalogOptions.onSearch}
          isLoading={col.catalogOptions.loading}
          size="sm"
          placeholder="Buscar..."
          clearable
          className="w-full"
          onBlur={() => {}}
          disabled={isLoading}
        />
      );
    }

    if (col.filter === "date") {
      const dateValue = filters[col.key];
      return (
        <ITDatePicker
          name={`filter-${col.key}`}
          value={dateValue instanceof Date ? dateValue : undefined}
          onChange={(e) => handleFilterChange(col.key, e.target.value as Date)}
          minDate={col.dateFilterOptions?.minDate}
          maxDate={col.dateFilterOptions?.maxDate}
          size="sm"
          placeholder="dd/mm/aaaa"
          className="w-full"
          disabled={isLoading}
        />
      );
    }

    if (col.filter === "date-range") {
      const rangeValue = filters[col.key];
      return (
        <ITDatePicker
          name={`filter-${col.key}`}
          range
          value={Array.isArray(rangeValue) ? rangeValue : undefined}
          onChange={(e) =>
            handleFilterChange(col.key, e.target.value as [Date | null, Date | null])
          }
          minDate={col.dateFilterOptions?.minDate}
          maxDate={col.dateFilterOptions?.maxDate}
          size="sm"
          placeholder="dd/mm/aaaa - dd/mm/aaaa"
          className="w-full"
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
          <FaCheck className="text-success-500" aria-label="Verdadero" title="Verdadero" />
        ) : (
          <FaTimes className="text-danger-500" aria-label="Falso" title="Falso" />
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

  const renderDefaultCard = (row: T) => {
    const dataCols = columns.filter((c) => c.type !== "actions");
    const actionCol = columns.find((c) => c.type === "actions");
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 space-y-2 shadow-sm">
        {dataCols.map((col) => (
          <div key={col.key} className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap flex-shrink-0 min-w-[70px]">
              {col.label}
            </span>
            <span className="text-sm font-medium text-slate-800 dark:text-white text-right truncate">
              {renderCellContent(col, row) as React.ReactNode}
            </span>
          </div>
        ))}
        {actionCol?.actions && (
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
            {actionCol.actions(row)}
          </div>
        )}
      </div>
    );
  };

  const segCtrlClass = (mode: "table" | "cards") =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
      effectiveView === mode
        ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/50 dark:border-slate-700"
        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
    }`;

  const handleRowClick = (row: T) => (event: React.MouseEvent<HTMLElement>) => {
    if (!onRowClick || isLoading || isInteractiveTarget(event.target, event.currentTarget)) return;
    onRowClick(row, event);
  };

  const handleRowKeyDown = (row: T) => (event: React.KeyboardEvent<HTMLElement>) => {
    if (!onRowClick || isLoading) return;
    if (event.target !== event.currentTarget) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onRowClick(row, event);
  };

  const tableEl = (
    <table
      className={clsx(
        tableLayoutClass,
        showVerticalBorder && "[&_th]:border-r [&_th:last-child]:border-r-0 [&_td]:border-r [&_td:last-child]:border-r-0",
        showVerticalBorder && (verticalBorderClassname || "[&_th]:border-slate-100 dark:[&_th]:border-slate-700/30 [&_td]:border-slate-100 dark:[&_td]:border-slate-700/30"),
        isLoading ? "opacity-50" : "opacity-100",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      style={isFixed ? { tableLayout: "fixed" } : undefined}
      aria-rowcount={isTableVirtual ? data.length + 1 : undefined}
    >
      {hasColumnWidths && (
        <colgroup>
          {columns.map((col) => (
            <col
              key={col.key}
              style={
                col.width != null
                  ? { width: typeof col.width === "number" ? `${col.width}px` : col.width }
                  : undefined
              }
            />
          ))}
        </colgroup>
      )}
      <thead>
        <tr
          className={clsx(tableHeaderRow, "dark:text-slate-200")}
          aria-rowindex={isTableVirtual ? 1 : undefined}
        >
          {columns.map((col) => (
            <th
              key={col.key}
              scope="col"
              className={clsx(
                tableHeaderCell(col.className, density),
                col.align && tableAlignClasses[col.align],
                isStickyHeader && "sticky top-0 z-10 bg-secondary-50"
              )}
              style={
                col.minWidth != null || isStickyHeader
                  ? {
                      ...(col.minWidth != null ? { minWidth: `${col.minWidth}px` } : {}),
                      ...(isStickyHeader
                        ? { backgroundColor: "var(--color-table-headerBg, #f8fafc)" }
                        : {}),
                    }
                  : undefined
              }
            >
              <div className={isFixed ? "flex flex-col gap-3" : "flex flex-col gap-3 min-w-[150px]"}>
                <div className="flex items-center justify-between gap-2">
                   <ITText as="span" className="text-slate-900 dark:text-white font-bold">{col.label}</ITText>
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
      <tbody className={clsx(tableBody, "dark:divide-slate-700/30")}>
        {data.length > 0 ? (
          <>
            {isTableVirtual && topSpacerHeight > 0 && (
              <tr aria-hidden="true" style={{ height: topSpacerHeight }}>
                <td colSpan={columnCount} style={{ padding: 0, border: 0 }} />
              </tr>
            )}
            {windowData.map((row, windowIndex) => {
              const absoluteIndex = isTableVirtual ? startIndex + windowIndex : windowIndex;
              return (
                <tr
                  key={absoluteIndex}
                  aria-rowindex={isTableVirtual ? absoluteIndex + 2 : undefined}
                  className={clsx(
                    tableRow,
                    variant === "striped" && absoluteIndex % 2 === 0 && "bg-secondary-50/40 dark:bg-slate-800/20",
                    onRowClick && !isLoading && tableRowClickable
                  )}
                  tabIndex={onRowClick && !isLoading ? 0 : undefined}
                  onClick={onRowClick && !isLoading ? handleRowClick(row) : undefined}
                  onKeyDown={onRowClick && !isLoading ? handleRowKeyDown(row) : undefined}
                >
                  {columns.map((col) => {
                    const rawValue = getNestedValue(row, col.key);
                    const truncateTitle =
                      col.truncate &&
                      (typeof rawValue === "string" || typeof rawValue === "number")
                        ? String(rawValue)
                        : undefined;
                    return (
                      <td
                        key={`${absoluteIndex}-${col.key}`}
                        className={clsx(
                          tableCell(col.className, density),
                          col.align && tableAlignClasses[col.align]
                        )}
                        style={col.minWidth != null ? { minWidth: `${col.minWidth}px` } : undefined}
                        title={truncateTitle}
                      >
                        {col.type === "actions" ? (
                          <div className={tableActionsCell}>
                            {renderCellContent(col, row) as React.ReactNode}
                          </div>
                        ) : (
                          <div className={clsx(tableCellText, col.truncate && "truncate")}>
                            {renderCellContent(col, row) as React.ReactNode}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {isTableVirtual && bottomSpacerHeight > 0 && (
              <tr aria-hidden="true" style={{ height: bottomSpacerHeight }}>
                <td colSpan={columnCount} style={{ padding: 0, border: 0 }} />
              </tr>
            )}
          </>
        ) : (
          <tr>
            <td colSpan={columns.length} className="px-6 py-12 text-center">
              {!isLoading && (
                <div className={tableEmptyContent}>
                  <ITText as="span" className="text-lg">No se encontraron resultados</ITText>
                  <ITText as="span" className="text-sm mt-1">Intenta ajustar los filtros</ITText>
                </div>
              )}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div ref={rootRef} className={clsx("space-y-4 w-full relative", containerClassName)}>
      <div className={tableContainer} style={{ backgroundColor: 'var(--color-table-rowBg, #ffffff)' }}>
        {title && (
          <div className="px-6 py-5 flex items-center justify-between" style={{ backgroundColor: 'var(--color-table-rowBg, #ffffff)' }}>
            <ITText as="h2" className="text-xl font-bold text-secondary-900 leading-tight">{title}</ITText>
            <div className="flex items-center gap-3">
              {isLoading && (
                <div className="text-secondary-400">
                  {loadingIndicator || <FaSpinner className="animate-spin text-primary-500 text-xl" />}
                </div>
              )}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700/50">
                <button onClick={() => setViewMode("table")} disabled={forcedCards} className={segCtrlClass("table")}>
                  <FaTable size={11} />
                  Table
                </button>
                <button onClick={() => setViewMode("cards")} className={segCtrlClass("cards")}>
                  <FaThLarge size={11} />
                  Cards
                </button>
              </div>
            </div>
          </div>
        )}

        {!title && (
          <div className="flex justify-end px-4 pt-3">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700/50">
              <button onClick={() => setViewMode("table")} disabled={forcedCards} className={segCtrlClass("table")}>
                <FaTable size={11} />
                Table
              </button>
              <button onClick={() => setViewMode("cards")} className={segCtrlClass("cards")}>
                <FaThLarge size={11} />
                Cards
              </button>
            </div>
          </div>
        )}

        <div className={scrollOuterClass}>
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

          {effectiveView === "cards" ? (
            <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
              {data.length > 0 ? (
                data.map((row, i) => (
                  <div
                    key={i}
                    className={clsx(tableCardHover, onRowClick && !isLoading && tableCardClickable)}
                    role={onRowClick && !isLoading ? "button" : undefined}
                    tabIndex={onRowClick && !isLoading ? 0 : undefined}
                    onClick={onRowClick && !isLoading ? handleRowClick(row) : undefined}
                    onKeyDown={onRowClick && !isLoading ? handleRowKeyDown(row) : undefined}
                  >
                    {renderCard ? renderCard(row) : renderDefaultCard(row)}
                  </div>
                ))
              ) : (
                !isLoading && (
                  <div className={clsx(tableEmptyContent, "py-12")}>
                    <ITText as="span" className="text-lg">No se encontraron resultados</ITText>
                    <ITText as="span" className="text-sm mt-1">Intenta ajustar los filtros</ITText>
                  </div>
                )
              )}
            </div>
          ) : isTableVirtual ? (
            <div
              ref={scrollRef}
              className="overflow-x-auto overflow-y-auto"
              style={{ maxHeight: virtualizedMaxHeight }}
            >
              {tableEl}
            </div>
          ) : (
            tableEl
          )}
        </div>
      </div>

      <div className="rounded-b-xl px-6 py-4" style={{ backgroundColor: 'var(--color-table-rowBg, #ffffff)' }}>
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
