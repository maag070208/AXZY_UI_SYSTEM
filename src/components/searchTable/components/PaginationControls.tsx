import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PaginationInfo from "./PaginationInfo";
import ITSelect from "@/components/select/select";
import ITButton from "@/components/button/button";
import ITText from "@/components/text/text";

interface PaginationControlsProps {
  pageIndex: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  itemsPerPageOptions: number[];
  onItemsPerPageChange: (value: number) => void;
  currentCount: number;
  totalCount: number;
}

export default function PaginationControls({
  pageIndex,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
  itemsPerPage,
  itemsPerPageOptions,
  onItemsPerPageChange,
  currentCount,
  totalCount,
}: PaginationControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center space-x-4">
        <PaginationInfo currentCount={currentCount} totalCount={totalCount} />

        <div className="flex items-center space-x-2">
          <ITText as="span" className="text-sm text-gray-700">Mostrar:</ITText>
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
            className="w-20"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <ITButton
          color="secondary"
          size="small"
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={!hasPreviousPage}
          className="min-w-[32px]"
          ariaLabel="Página anterior"
          title="Ir a la página anterior"
        >
          <FaArrowLeft aria-hidden="true" />
        </ITButton>

        <ITText as="span" className="px-4 py-2 text-sm text-gray-700" aria-live="polite">
          Página {pageIndex} de {totalPages}
        </ITText>

        <ITButton
          size="small"
          color="secondary"
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={!hasNextPage}
          className="min-w-[32px]"
          ariaLabel="Página siguiente"
          title="Ir a la página siguiente"
        >
          <FaArrowRight aria-hidden="true" />
        </ITButton>
      </div>
    </div>
  );
}
