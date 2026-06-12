import { useEditableRow } from "@/hooks/useEditableRow";
import { formatCurrencyMX } from "@/utils/table.utils";
import clsx from "clsx";
import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { SearchColumn } from "../searchTable.props";
import EditableCell from "./EditableCell";
import * as yup from "yup";

interface TableRowProps<T> {
  row: T;
  rowIndex: number;
  columns: SearchColumn<T>[];
  getNestedValue: (obj: unknown, path: string) => unknown;
  onSave?: (row: T) => void;
  onCancel?: () => void;
  validationSchema?: yup.ObjectSchema<any>;
  isEditing?: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export default function TableRow<T>({
  row,
  rowIndex,
  columns,
  getNestedValue,
  onSave,
  onCancel,
  validationSchema,
  isEditing = false,
  onEdit,
}: TableRowProps<T>) {
  const {
    editedRow,
    errors,
    isHovered,
    setIsHovered,
    hasErrors,
    handleEdit,
    handleSave,
    handleCancel,
    handleChange,
  } = useEditableRow({ row, columns, getNestedValue, validationSchema });

  const onEditAction = () => handleEdit(onEdit);
  const onSaveAction = () => handleSave(onSave);
  const onCancelAction = () => handleCancel(onCancel);

  const renderCellContent = (col: SearchColumn<T>, rowData: T) => {
    const value = getNestedValue(rowData, col.key);

    if (col.render) return col.render(rowData);

    switch (col.type) {
      case "number":
        return typeof value === "number" && col.currencyMX
          ? formatCurrencyMX(value)
          : (value as React.ReactNode);

      case "boolean":
        return value ? (
          <FaCheck
            className="text-green-500"
            aria-label="Verdadero"
            title="Verdadero"
          />
        ) : (
          <FaTimes className="text-red-500" aria-label="Falso" title="Falso" />
        );

      case "actions":
        if (isEditing && col.saveActions) {
          return col.saveActions(rowData, {
            onSave: onSaveAction,
            onCancel: onCancelAction,
            hasErrors,
          });
        } else if (col.actions) {
          return col.actions(rowData, { onEdit: onEditAction });
        }
        return null;

      case "catalog":
        if (col.catalogOptions) {
          const catalogItem = col.catalogOptions.data.find(
            (item) => item.id === value
          );
          return catalogItem?.name || (value as React.ReactNode);
        }
        return value as React.ReactNode;

      default:
        return value as React.ReactNode;
    }
  };

  return (
    <tr
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`border-b border-gray-200 transition-colors duration-150 ${
        isEditing
          ? "bg-slate-50"
          : rowIndex % 2 === 0
          ? "bg-white"
          : "bg-gray-50"
      } ${isHovered && !isEditing ? "bg-gray-100" : ""}`}
    >
      {columns.map((col) => (
        <td
          key={`${rowIndex}-${col.key}`}
          className={clsx("pl-5 py-2", col.className, {
            "text-center": col.type === "actions" || col.type === "boolean",
          })}
        >
          {isEditing && col.editable ? (
            <EditableCell
              column={col}
              value={getNestedValue(editedRow, col.key)}
              onChange={(value) => handleChange(col.key, value)}
              error={errors[col.key]}
              row={editedRow}
            />
          ) : (
            <div
              className={clsx({
                "flex flex-col items-center justify-center gap-1 ":
                  col.type === "actions",
              })}
            >
              {
                renderCellContent(
                  col,
                  isEditing ? editedRow : row
                ) as React.ReactNode
              }
            </div>
          )}
        </td>
      ))}
    </tr>
  );
}
