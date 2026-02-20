import React from "react";
import clsx from "clsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ITPaginationProps } from "./pagination.props";
import { theme } from "@/theme/theme";
import ITSelect from "../select/select";

const DOTS = "...";

// Helper hook to calculate page ranges
const usePagination = ({
  totalPages,
  currentPage,
  siblingCount = 1,
}: {
  totalPages: number;
  currentPage: number;
  siblingCount?: number;
}) => {
  return React.useMemo(() => {
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    /*
      Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, DOTS, totalPages];
    }

    /*
      Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
      Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalPages, currentPage, siblingCount]);
};

export default function ITPagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  color = "primary",
  className = "",
  itemsPerPageOptions,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
}: ITPaginationProps) {
  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingCount,
  });

  // If there are less than 2 pages in pagination range we shall not render the component
  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  // Resolve color
  const isSemantic = color in theme.colors;
  const resolvedBgColor = isSemantic
    ? theme.colors[color as keyof typeof theme.colors][500]
    : color;
  const resolvedHoverBgColor = isSemantic
    ? theme.colors[color as keyof typeof theme.colors][50]
    : "#f3f4f6"; // fallback generic gray hover

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Base styles for list items
  const baseItemClass =
    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors cursor-pointer select-none";

  const renderPaginationControls = () => (
    <div className="flex items-center gap-1">
      {/* Previous Button */}
      <div
        className={clsx(
          baseItemClass,
          currentPage === 1
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:bg-gray-100"
        )}
        onClick={handlePrevious}
        aria-disabled={currentPage === 1}
      >
        <FaChevronLeft size={12} />
      </div>

      {/* Pages */}
      {paginationRange?.map((pageNumber, idx) => {
        if (pageNumber === DOTS) {
          return (
            <div
              key={`dots-${idx}`}
              className="flex items-center justify-center w-8 h-8 select-none text-gray-400"
            >
              &#8230;
            </div>
          );
        }

        const isActive = pageNumber === currentPage;

        return (
          <div
            key={pageNumber}
            className={clsx(
              baseItemClass,
              isActive ? "text-white" : "text-gray-600 hover:bg-gray-100"
            )}
            style={{
              backgroundColor: isActive ? resolvedBgColor : undefined,
              ...(isActive ? {} : { "--hover-bg": resolvedHoverBgColor } as React.CSSProperties),
            }}
            onClick={() => onPageChange(pageNumber as number)}
            title={`Page ${pageNumber}`}
          >
            {pageNumber}
          </div>
        );
      })}

      {/* Next Button */}
      <div
        className={clsx(
          baseItemClass,
          currentPage === totalPages
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:bg-gray-100"
        )}
        onClick={handleNext}
        aria-disabled={currentPage === totalPages}
      >
        <FaChevronRight size={12} />
      </div>
    </div>
  );

  // If itemsPerPageOptions is provided, wrap in a wider container with the select
  if (itemsPerPageOptions && itemsPerPage && onItemsPerPageChange) {
    const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems || 0);
    const endItem = Math.min(currentPage * itemsPerPage, totalItems || 0);

    return (
      <div className={clsx("flex flex-col sm:flex-row justify-between items-center gap-4 w-full", className)}>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200">
            <span className="text-xs font-medium">Mostrar</span>
            <ITSelect
              name="itemsPerPage"
              options={itemsPerPageOptions.map((option) => ({
                value: String(option),
                label: String(option),
              }))}
              value={String(itemsPerPage)}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              onBlur={() => {}}
              size="small"
              className="!w-14 !h-6 !text-xs !py-0 !px-1! !border-none !bg-transparent !ring-0 focus:!ring-0 cursor-pointer font-bold text-gray-700"
              placeholder=""
            />
          </div>
          
          {totalItems !== undefined && (
            <>
              <span className="text-gray-300">|</span>
              <span className="text-xs">
                <span className="font-semibold text-gray-700">{startItem}</span> - <span className="font-semibold text-gray-700">{endItem}</span> de <span className="font-semibold text-gray-900">{totalItems}</span>
              </span>
            </>
          )}
        </div>
        
        <nav aria-label="Pagination">
          {renderPaginationControls()}
        </nav>
      </div>
    );
  }

  // Otherwise, render just the standard pagination component
  return (
    <nav aria-label="Pagination" className={clsx("inline-flex", className)}>
      {renderPaginationControls()}
    </nav>
  );
}
