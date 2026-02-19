import React from "react";

interface PaginationInfoProps {
  currentCount: number;
  totalCount: number;
  className?: string;
}

export default function PaginationInfo({
  currentCount,
  totalCount,
  className = "",
}: PaginationInfoProps) {
  return (
    <span className={`text-sm text-gray-700 ${className}`}>
      Mostrando {currentCount} de {totalCount} resultados
    </span>
  );
}
