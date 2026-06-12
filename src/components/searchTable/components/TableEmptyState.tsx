import React from "react";
import ITText from "@/components/text/text";

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
          ? <ITText as="span">No se encontraron resultados para tu búsqueda</ITText>
          : <ITText as="span">No se encontraron resultados</ITText>}
      </td>
    </tr>
  );
}
