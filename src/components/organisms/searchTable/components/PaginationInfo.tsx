import React from "react";
import ITText from "@/components/atoms/text/text";
import { useITTranslation } from "@/i18n";

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
  const { t } = useITTranslation();
  return (
    <ITText as="span" className={`text-sm text-secondary-700 ${className}`}>
      {t("searchTable.showingCount", { from: currentCount, total: totalCount })}
    </ITText>
  );
}
