import React from "react";

interface TableEmptyStateProps {
  colSpan: number;
  searchTerm: string;
}

export default function TableEmptyState({
  colSpan,
  searchTerm,
}: TableEmptyStateProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-6 py-4 text-center">
        {searchTerm
          ? "No se encontraron resultados para tu búsqueda"
          : "No se encontraron resultados"}
      </td>
    </tr>
  );
}
