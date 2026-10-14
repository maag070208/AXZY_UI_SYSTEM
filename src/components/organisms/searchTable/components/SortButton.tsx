import React from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import ITText from "@/components/atoms/text/text";
import { useITTranslation } from "@/i18n";

interface SortButtonProps {
  sortConfig?: {
    key: string;
    direction: "asc" | "desc";
  };
  onClick: () => void;
  className?: string;
}

export default function SortButton({
  sortConfig,
  onClick,
  className = "",
}: SortButtonProps) {
  const { t } = useITTranslation();
  const directionLabel = sortConfig
    ? sortConfig.direction === "asc"
      ? t("searchTable.sortDescending")
      : t("searchTable.sortAscending")
    : t("searchTable.sortAscending");

  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-lg bg-white border border-secondary-300 hover:bg-secondary-50 transition-colors duration-200 flex items-center gap-2 min-w-[120px] ${className}`}
      aria-label={t("searchTable.sortAria", { direction: directionLabel })}
      title={t("searchTable.sortTable")}
    >
      {sortConfig ? (
        sortConfig.direction === "asc" ? (
          <FaSortUp className="w-4 h-4 text-slate-500" />
        ) : (
          <FaSortDown className="w-4 h-4 text-slate-500" />
        )
      ) : (
        <FaSort className="w-4 h-4 text-secondary-500" />
      )}
      <ITText as="span" className="text-sm font-medium text-secondary-700">
        {sortConfig
          ? sortConfig.direction === "asc"
            ? t("searchTable.sortAsc")
            : t("searchTable.sortDesc")
          : t("searchTable.sort")}
      </ITText>
    </button>
  );
}
