import React from "react";
import TableHeaderCell from "./TableHeaderCell";
import { SearchColumn } from "../searchTable.props";

interface TableHeaderProps<T> {
  columns: SearchColumn<T>[];
  onSort: (key: string) => void;
  sortConfig?: {
    key: string;
    direction: "asc" | "desc";
  };
}

export default function TableHeader<T>({
  columns,
  onSort,
  sortConfig,
}: TableHeaderProps<T>) {
  return (
    <thead>
      <tr className="bg-white border-b border-gray-200">
        {columns.map((col) => (
          <TableHeaderCell
            key={col.key}
            label={col.label}
            sortable={col.sortable && col.type !== "actions"}
            onSort={() => onSort(col.key)}
            sortConfig={sortConfig?.key === col.key ? sortConfig : undefined}
            className="px-3 py-3 text-center align-middle"
          />
        ))}
      </tr>
    </thead>
  );
}
