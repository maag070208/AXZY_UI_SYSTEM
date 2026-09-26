import { useTableState } from "@/hooks/useTableState";
import { useElementSize } from "@/hooks/useElementSize";
import { useVirtualRows } from "@/hooks/useVirtualRows";
import { getRowHeight, sizeStyles, tableAlignClasses, variantStyles } from "@/types/table.types";
import clsx from "clsx";
import React, { useState } from "react";
import {
  FaCheck,
  FaSpinner,
  FaTimes,
  FaTable,
  FaThLarge
} from "react-icons/fa";
import { MdOutlineSwapVert } from "react-icons/md";
import ITInput from "@/components/atoms/input/input";
import ITPagination from "@/components/molecules/pagination/pagination";
import ITSelect from "@/components/molecules/select/select";
import { Column, ITTableProps } from "./table.props";
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
import { formatCurrencyMX, getNestedValue, isInteractiveTarget } from "@/utils/table.utils";

/**
 * A feature-rich data table with per-column filtering, sortable columns,
 * pagination, boolean/catalog type support, and currency formatting.
 *
 * @example
 * <ITTable
 *   columns={[
 *     { key: "name", label: "Name", type: "string", sortable: true },
 *     { key: "active", label: "Active", type: "boolean", filter: true },
 *     { key: "actions", label: "", type: "actions", actions: (row) => <ITButton>Edit</ITButton> },
 *   ]}
 *   data={users}
 *   title="User List"
 *   size="sm"
 * />
 */
export default function ITTable<T extends Record<string, unknown>>({
  columns,
  data = [],
  containerClassName,
  variant = "default",
  size = "md",
  itemsPerPageOptions = [5, 10, 20],
  defaultItemsPerPage = 10,
  title,
  renderCard,
  defaultView = "table",
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
}: ITTableProps<T>) {
  const [viewMode, setViewMode] = useState<"table" | "cards">(defaultView);
  const { ref: rootRef, width: containerWidth } = useElementSize<HTMLDivElement>();

  const isFixed = layout === "fixed";
  const forcedCards =
    autoCardBreakpoint > 0 && containerWidth > 0 && containerWidth < autoCardBreakpoint;
  const effectiveView: "table" | "cards" = forcedCards ? "cards" : viewMode;
  const hasColumnWidths = columns.some((col) => col.width != null);
  const tableLayoutClass = isFixed
    ? "w-full text-sm text-left text-secondary-600"
    : "min-w-max w-full text-sm text-left text-secondary-600";

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

  const sortedData = React.useMemo(() => {
    const safeData = Array.isArray(data) ? data : [];
    if (!sortConfig) return safeData;

    return [...safeData].sort((a, b) => {
      const aValue = getNestedValue(a, sortConfig.key);
      const bValue = getNestedValue(b, sortConfig.key);

      if (aValue == null || bValue == null) return 0;

      let comparison = 0;

      const column = columns.find((col) => col.key === sortConfig.key);
      if (!column || !column.sortable) return 0;

      switch (column.type) {
        case "number":
          comparison = (aValue as number) - (bValue as number);
          break;
        case "date":
          comparison =
            new Date(aValue as string).getTime() -
            new Date(bValue as string).getTime();
          break;
        case "boolean":
          comparison = aValue === bValue ? 0 : aValue ? 1 : -1;
          break;
        case "catalog": {
          const catalogItemA = column.catalogOptions?.data.find(
            (item) => item.id === aValue
          );
          const catalogItemB = column.catalogOptions?.data.find(
            (item) => item.id === bValue
          );
          comparison = String(catalogItemA?.name || aValue).localeCompare(
            String(catalogItemB?.name || bValue)
          );
          break;
        }
        case "string":
        default:
          comparison = (aValue as string).localeCompare(bValue as string);
          break;
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [data, sortConfig, columns]);

  const filteredData = sortedData.filter((row) =>
    columns.every((col) => {
      if (
        !col.filter ||
        filters[col.key] === undefined ||
        filters[col.key] === ""
      )
        return true;

      const value = getNestedValue(row, col.key);
      const filterValue = String(filters[col.key]).toLowerCase();

      switch (col.type) {
        case "number":
          return String(value).includes(filterValue);
        case "boolean":
          return value === filters[col.key];
        case "catalog": {
          if (!col.catalogOptions) return true;
          const catalogItem = col.catalogOptions.data.find(
            (item) =>
              String(item.id).toLowerCase().includes(filterValue) ||
              item.name.toLowerCase().includes(filterValue)
          );
          return catalogItem ? value === catalogItem.id : false;
        }
        case "string":
        default:
          return String(value).toLowerCase().includes(filterValue);
      }
    })
  );

  const computedTotalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const isTableVirtual = virtualized && effectiveView === "table";
  const isStickyHeader = stickyHeader && isTableVirtual;
  const resolvedRowHeight = rowHeight ?? getRowHeight(size, density);
  const columnCount = columns.length;

  const {
    scrollRef,
    startIndex,
    endIndex,
    topSpacerHeight,
    bottomSpacerHeight,
  } = useVirtualRows({
    count: currentData.length,
    rowHeight: resolvedRowHeight,
    overscan,
    enabled: isTableVirtual,
    resetKey: `${currentPage}-${itemsPerPage}`,
  });

  const windowData = isTableVirtual
    ? currentData.slice(startIndex, endIndex + 1)
    : currentData;

  const renderFilterInput = (col: Column<T>) => {
    if (!col.filter) return null;

    if (col.type === "boolean") {
      const currentValue = filters[col.key];
      const nextValue =
        currentValue === undefined
          ? true
          : currentValue === true
            ? false
            : undefined;

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
        return (
          <FaSpinner
            className="animate-spin"
            aria-label="Cargando opciones"
            title="Cargando opciones"
          />
        );
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
          onBlur={() => { }}
          className="w-full text-xs"
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
        onBlur={() => { }}
      />
    );
  };

  const renderCellContent = (col: Column<T>, row: T) => {
    const value = getNestedValue(row, col.key);

    if (col.render) {
      return col.render(row);
    }

    switch (col.type) {
      case "number":
        return (typeof value === "number") && col.currencyMX ? formatCurrencyMX(value) : value;
      case "boolean":
        return value ? (
          <FaCheck
            className="text-success-500"
            aria-label="Verdadero"
            title="Verdadero"
          />
        ) : (
          <FaTimes
            className="text-danger-500"
            aria-label="Falso"
            title="Falso"
          />
        );
      case "actions":
        return col.actions ? col.actions(row) : null;
      case "catalog":
        if (col.catalogOptions) {
          const catalogItem = col.catalogOptions.data.find(
            (item) => item.id === value
          );
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

  const handleRowClick = (row: T) => (event: React.MouseEvent<HTMLElement>) => {
    if (!onRowClick || isInteractiveTarget(event.target, event.currentTarget)) return;
    onRowClick(row, event);
  };

  const handleRowKeyDown = (row: T) => (event: React.KeyboardEvent<HTMLElement>) => {
    if (!onRowClick) return;
    if (event.target !== event.currentTarget) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onRowClick(row, event);
  };

  return (
    <div ref={rootRef} className={clsx("space-y-4 w-full", containerClassName)}>
      <div className={tableContainer} style={{ backgroundColor: 'var(--color-table-rowBg, #ffffff)' }}>
        {/* Header outside overflow */}
        {title && (
          <div className="px-6 py-5 flex items-center justify-between" style={{ backgroundColor: 'var(--color-table-rowBg, #ffffff)' }}>
            <ITText as="h2" className="text-xl font-bold text-secondary-900 leading-tight">{title}</ITText>
            <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700/50">
              <button
                onClick={() => setViewMode("table")}
                disabled={forcedCards}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  effectiveView === "table"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/50 dark:border-slate-700"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                <FaTable size={11} />
                Table
              </button>
              <button
                onClick={() => setViewMode("cards")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  effectiveView === "cards"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/50 dark:border-slate-700"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                <FaThLarge size={11} />
                Cards
              </button>
            </div>
          </div>
        )}

        {!title && (
          <div className="flex justify-end px-4 pt-3">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700/50">
              <button
                onClick={() => setViewMode("table")}
                disabled={forcedCards}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  effectiveView === "table"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/50 dark:border-slate-700"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                <FaTable size={11} />
                Table
              </button>
              <button
                onClick={() => setViewMode("cards")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  effectiveView === "cards"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/50 dark:border-slate-700"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                <FaThLarge size={11} />
                Cards
              </button>
            </div>
          </div>
        )}

        {effectiveView === "cards" ? (
          <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
            {currentData.length > 0 ? (
              currentData.map((row, i) => (
                <div
                  key={i}
                  className={clsx(tableCardHover, onRowClick && tableCardClickable)}
                  role={onRowClick ? "button" : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                  onClick={onRowClick ? handleRowClick(row) : undefined}
                  onKeyDown={onRowClick ? handleRowKeyDown(row) : undefined}
                >
                  {renderCard ? renderCard(row) : renderDefaultCard(row)}
                </div>
              ))
            ) : (
              <div className={clsx(tableEmptyContent, "py-12")}>
                <ITText as="span" className="text-lg">No se encontraron resultados</ITText>
                <ITText as="span" className="text-sm mt-1">Intenta ajustar los filtros</ITText>
              </div>
            )}
          </div>
        ) : (
          <div
            ref={isTableVirtual ? scrollRef : undefined}
            className={isTableVirtual ? "overflow-x-auto overflow-y-auto" : "overflow-x-auto"}
            style={isTableVirtual ? { maxHeight: virtualizedMaxHeight } : undefined}
          >
            <table
              className={clsx(
                tableLayoutClass,
                showVerticalBorder && "[&_th]:border-r [&_th:last-child]:border-r-0 [&_td]:border-r [&_td:last-child]:border-r-0",
                showVerticalBorder && (verticalBorderClassname || "[&_th]:border-slate-100 dark:[&_th]:border-slate-700/30 [&_td]:border-slate-100 dark:[&_td]:border-slate-700/30"),
                variantStyles[variant],
                sizeStyles[size]
              )}
              style={isFixed ? { tableLayout: "fixed" } : undefined}
              aria-rowcount={isTableVirtual ? currentData.length + 1 : undefined}
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
                              className={`p-1 rounded-md transition-colors ${sortConfig?.key === col.key
                                  ? "bg-secondary-200 text-secondary-900"
                                  : "hover:bg-secondary-200 text-secondary-400 hover:text-secondary-700"
                                }`}
                              title={`Ordenar por ${col.label}`}
                            >
                              <MdOutlineSwapVert className="w-4 h-4" aria-hidden="true" />
                            </button>
                          )}
                        </div>
                        <div className="w-full">
                          {col.filter ? renderFilterInput(col) : null}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={clsx(tableBody, "dark:divide-slate-700/30")}>
                {currentData.length > 0 ? (
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
                            onRowClick && tableRowClickable
                          )}
                          tabIndex={onRowClick ? 0 : undefined}
                          onClick={onRowClick ? handleRowClick(row) : undefined}
                          onKeyDown={onRowClick ? handleRowKeyDown(row) : undefined}
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
                      <div className={tableEmptyContent}>
                        <ITText as="span" className="text-lg">No se encontraron resultados</ITText>
                        <ITText as="span" className="text-sm mt-1">Intenta ajustar los filtros</ITText>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="rounded-b-xl px-6 py-4" style={{ backgroundColor: 'var(--color-table-rowBg, #ffffff)' }}>
          <ITPagination
            currentPage={currentPage}
            totalPages={computedTotalPages}
            onPageChange={goToPage}
            color="primary"
            itemsPerPageOptions={itemsPerPageOptions}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            totalItems={filteredData.length}
          />
        </div>
      </div>
    </div>
  );
}