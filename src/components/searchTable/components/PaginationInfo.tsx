import React from "react";
import ITText from "@/components/text/text";

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
    <ITText as="span" className={`text-sm text-gray-700 ${className}`}>
      Mostrando {currentCount} de {totalCount} resultados
    </ITText>
  );
}
