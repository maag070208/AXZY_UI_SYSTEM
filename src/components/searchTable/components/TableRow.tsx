import { formatCurrencyMX } from "@/utils/table.utils";
import clsx from "clsx";
import React, { useMemo, useState } from "react";
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
  const [isHovered, setIsHovered] = useState(false);
  const [editedRow, setEditedRow] = useState<T>({ ...row });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAll = async (rowData: T): Promise<Record<string, string>> => {
    const newErrors: Record<string, string> = {};

    // Primero validación con Yup schema si está disponible
    if (validationSchema) {
      try {
        await validationSchema.validate(rowData, { abortEarly: false });
      } catch (yupError) {
        if (yupError instanceof yup.ValidationError) {
          yupError.inner.forEach((error) => {
            if (error.path) {
              newErrors[error.path] = error.message;
            }
          });
        }
      }
    }

    // Luego validación individual de columnas (solo si no hay error de Yup para esa columna)
    columns.forEach((col) => {
      if (col.editable && col.validation && !newErrors[col.key]) {
        const value = getNestedValue(rowData, col.key);
        const error = col.validation(value, rowData);
        if (error) newErrors[col.key] = error;
      }
    });

    return newErrors;
  };

  // Al entrar a modo edición, validar el estado inicial
  const handleEdit = async () => {
    if (onEdit) {
      onEdit(row);
      const clone = { ...row };
      setEditedRow(clone);
      const initialErrors = await validateAll(clone);
      setErrors(initialErrors);
    }
  };

  const handleSave = async () => {
    // Validación final
    const finalErrors = await validateAll(editedRow);

    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      return;
    }

    if (onSave) onSave(editedRow);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    setEditedRow({ ...row });
    setErrors({});
  };

  const handleChange = async (key: string, value: any, error?: string) => {
    const column = columns.find((col) => col.key === key);
    let processedValue = value;

    if (column) {
      switch (column.type) {
        case "number":
          // vacío = null, si no convierte a número
          processedValue =
            value === "" || value === null ? null : Number(value);
          break;

        case "boolean":
          // forzamos siempre a true/false
          if (value === "" || value === null || value === undefined) {
            processedValue = false;
          } else if (typeof value === "string") {
            processedValue = value === "true" || value === "1";
          } else {
            processedValue = Boolean(value);
          }
          break;

        case "date":
          // puedes normalizar fechas a string ISO o null
          processedValue = value ? new Date(value).toISOString() : null;
          break;

        case "catalog":
          // por lo general será un id, se mantiene tal cual
          processedValue = value ?? null;
          break;

        default:
          // string o cualquier otro tipo
          processedValue = value ?? "";
          break;
      }
    }

    const updatedRow = {
      ...editedRow,
      [key]: processedValue,
    };

    setEditedRow(updatedRow);

    // Validar el nuevo estado completo después del cambio
    const newErrors = await validateAll(updatedRow);
    setErrors(newErrors);
  };

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

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
            onSave: handleSave,
            onCancel: handleCancel,
            hasErrors,
          });
        } else if (col.actions) {
          return col.actions(rowData, { onEdit: handleEdit });
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
              onChange={(value, error) => handleChange(col.key, value, error)}
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
