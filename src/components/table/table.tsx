import { sizeStyles, variantStyles } from "@/types/table.types";
import clsx from "clsx";
import React, { useState } from "react";
import {
  FaCheck,
  FaSpinner,
  FaTimes
} from "react-icons/fa";
import { MdOutlineSwapVert } from "react-icons/md";
import ITInput from "../input/input";
import ITPagination from "../pagination/pagination";
import ITSelect from "../select/select";
import { Column, ITTableProps } from "./table.props";

const getNestedValue = (obj: unknown, path: string) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};
export const formatCurrencyMX = (value: number) => {
  return value.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });
};
export default function ITTable<T extends Record<string, unknown>>({
  columns,
  data,
  containerClassName,
  className,
  variant = "default",
  size = "md",
  itemsPerPageOptions = [5, 10, 20],
  defaultItemsPerPage = 10,
  title,
}: ITTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [filters, setFilters] = useState<
    Record<string, string | boolean | number>
  >({});
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
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

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const handleFilterChange = (
    key: string,
    value: string | boolean | number
  ) => {
    setFilters((prev) => {
      if (value === undefined || value === null || value === "") {
        const newFilters = { ...prev };
        delete newFilters[key];
        return newFilters;
      }
      return { ...prev, [key]: value };
    });
    setCurrentPage(1);
  };

  const handleSort = (key: string) => {
    const column = columns.find((col) => col.key === key);
    if (!column || !column.sortable) return;

    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

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
         return (
           <FaSpinner 
             className="animate-spin" 
             aria-label="Cargando opciones"
             title="Cargando opciones"
           />
         );
       }

      if (col.catalogOptions.error) {
        return <span className="text-red-500 text-xs">Error cargando</span>;
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
        return (typeof value === "number") && col.currencyMX ?formatCurrencyMX(value)  : value;
             case "boolean":
         return value ? (
           <FaCheck 
             className="text-green-500" 
             aria-label="Verdadero"
             title="Verdadero"
           />
         ) : (
           <FaTimes 
             className="text-red-500"
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

     return (
<div className={clsx("space-y-4 w-full", containerClassName)}>
  <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
    {/* Header outside overflow */}
    {title && (
      <div className="bg-white px-6 py-5 border-b border-secondary-100">
        <h2 className="text-xl font-bold text-secondary-900 leading-tight">{title}</h2>
      </div>
    )}

    {/* Scrollable Table */}
    <div className="overflow-x-auto">
      <table
        className={clsx(
          "min-w-max w-full text-sm text-left text-secondary-600",
          variantStyles[variant],
          sizeStyles[size]
        )}
      >

           <thead>
             <tr className="bg-secondary-50 border-b border-secondary-200 text-xs uppercase tracking-wider font-semibold text-secondary-500">
               {columns.map((col) => (
                 <th
                   key={col.key}
                   scope="col"
                   className={clsx("px-4 py-4 align-top", col.className)}
                 >
                   <div className="flex flex-col gap-3 min-w-[150px]">
                     {/* Column header */}
                     <div className="flex items-center justify-between gap-2">
                       <span className="text-secondary-700 font-bold">{col.label}</span>
                       {col.sortable && col.type !== "actions" && (
                         <button
                           onClick={() => handleSort(col.key)}
                           className={`p-1 rounded-md transition-colors ${
                             sortConfig?.key === col.key
                               ? "bg-secondary-200 text-secondary-900" 
                               : "hover:bg-secondary-200 text-secondary-400 hover:text-secondary-700"
                           }`}
                           title={`Ordenar por ${col.label}`}
                         >
                           <MdOutlineSwapVert className="w-4 h-4" aria-hidden="true" />
                         </button>
                       )}
                     </div>
                     
                     {/* Filter section */}
                     <div className="w-full">
                       {col.filter ? renderFilterInput(col) : null}
                     </div>
                   </div>
                 </th>
               ))}
             </tr>
           </thead>
          <tbody className="divide-y divide-secondary-100">
            {currentData.length > 0 ? (
                             currentData.map((row, rowIndex) => (
                 <tr
                   key={rowIndex}
                   className="hover:bg-secondary-50/50 transition-colors duration-150 group"
                 >
                                     {columns.map((col) => (
                     <td
                       key={`${rowIndex}-${col.key}`}
                       className={clsx("px-4 py-3 align-middle", col.className)}
                     >
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
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-secondary-400">
                    <span className="text-lg">No se encontraron resultados</span>
                    <span className="text-sm mt-1">Intenta ajustar los filtros</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>


      {/* Pagination */}
      <div className="bg-white rounded-b-xl border-t border-secondary-200 px-6 py-4">
        <ITPagination
          currentPage={currentPage}
          totalPages={totalPages || 1}
          onPageChange={goToPage}
          color="primary"
          itemsPerPageOptions={itemsPerPageOptions}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalItems={filteredData.length}
        />
      </div>
    </div>
  );
}