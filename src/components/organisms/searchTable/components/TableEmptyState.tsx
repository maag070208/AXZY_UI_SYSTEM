import React from "react";
import ITText from "@/components/atoms/text/text";
import { useITTranslation } from "@/i18n";

interface TableEmptyStateProps {
  colSpan: number;
  searchTerm: string;
}

export default function TableEmptyState({
  colSpan,
  searchTerm,
}: TableEmptyStateProps) {
  const { t } = useITTranslation();
  return (
    <tr>
      <td colSpan={colSpan} className="px-6 py-4 text-center">
        {searchTerm
          ? <ITText as="span">{t("searchTable.emptySearch")}</ITText>
          : <ITText as="span">{t("searchTable.empty")}</ITText>}
      </td>
    </tr>
  );
}
