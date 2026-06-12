import React from "react";
import SortButton from "./SortButton";
import ITText from "@/components/text/text";

interface TableHeaderCellProps {
  label: string;
  sortable?: boolean;
  onSort: () => void;
  sortConfig?: {
    key: string;
    direction: "asc" | "desc";
  };
  className?: string;
}

export default function TableHeaderCell({
  label,
  sortable = false,
  onSort,
  sortConfig,
  className = "",
}: TableHeaderCellProps) {
  return (
    <th className={className}>
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="flex items-center justify-center gap-2 w-full">
     <ITText as="span"
   className="inline-block w-[96%] text-sm font-medium text-white bg-slate-400 px-3 py-1.5 pb-2 rounded-lg text-center leading-tight"
   style={{
     display: "-webkit-box",
     WebkitBoxOrient: "vertical",
     WebkitLineClamp:4,
     overflow: "hidden",
   }}
>
   {label}
</ITText>
          {sortable && <SortButton sortConfig={sortConfig} onClick={onSort} />}
        </div>
      </div>
    </th>
  );
}
