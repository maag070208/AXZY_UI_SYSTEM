import { useCallback, useMemo, useRef, useState } from "react";
import * as yup from "yup";
import type { SearchColumn } from "../components/searchTable/searchTable.props";

interface UseEditableRowOptions<T> {
  row: T;
  columns: SearchColumn<T>[];
  getNestedValue: (obj: unknown, path: string) => unknown;
  validationSchema?: yup.ObjectSchema<any>;
}

interface UseEditableRowResult<T> {
  editedRow: T;
  errors: Record<string, string>;
  isHovered: boolean;
  setIsHovered: (v: boolean) => void;
  hasErrors: boolean;
  handleEdit: (onEdit?: (row: T) => void) => Promise<void>;
  handleSave: (onSave?: (row: T) => void) => Promise<void>;
  handleCancel: (onCancel?: () => void) => void;
  handleChange: (key: string, value: any) => Promise<void>;
  reset: () => void;
}

export function useEditableRow<T>({
  row,
  columns,
  getNestedValue,
  validationSchema,
}: UseEditableRowOptions<T>): UseEditableRowResult<T> {
  const [isHovered, setIsHovered] = useState(false);
  const [editedRow, setEditedRow] = useState<T>({ ...row });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const rowRef = useRef(row);
  rowRef.current = row;

  const validateAll = useCallback(
    async (rowData: T): Promise<Record<string, string>> => {
      const newErrors: Record<string, string> = {};

      if (validationSchema) {
        try {
          await validationSchema.validate(rowData, { abortEarly: false });
        } catch (yupError) {
          if (yupError instanceof yup.ValidationError) {
            yupError.inner.forEach((error) => {
              if (error.path) newErrors[error.path] = error.message;
            });
          }
        }
      }

      columns.forEach((col) => {
        if (col.editable && col.validation && !newErrors[col.key]) {
          const value = getNestedValue(rowData, col.key);
          const error = col.validation(value, rowData);
          if (error) newErrors[col.key] = error;
        }
      });

      return newErrors;
    },
    [columns, getNestedValue, validationSchema]
  );

  const handleEdit = useCallback(
    async (onEdit?: (row: T) => void) => {
      if (onEdit) {
        onEdit(rowRef.current);
        const clone = { ...rowRef.current };
        setEditedRow(clone);
        const initialErrors = await validateAll(clone);
        setErrors(initialErrors);
      }
    },
    [validateAll]
  );

  const handleSave = useCallback(
    async (onSave?: (row: T) => void) => {
      const finalErrors = await validateAll(editedRow);
      if (Object.keys(finalErrors).length > 0) {
        setErrors(finalErrors);
        return;
      }
      if (onSave) onSave(editedRow);
    },
    [editedRow, validateAll]
  );

  const handleCancel = useCallback((onCancel?: () => void) => {
    if (onCancel) onCancel();
    setEditedRow({ ...rowRef.current });
    setErrors({});
  }, []);

  const handleChange = useCallback(
    async (key: string, value: any) => {
      const column = columns.find((col) => col.key === key);
      let processedValue = value;

      if (column) {
        switch (column.type) {
          case "number":
            processedValue =
              value === "" || value === null ? null : Number(value);
            break;
          case "boolean":
            if (value === "" || value === null || value === undefined) {
              processedValue = false;
            } else if (typeof value === "string") {
              processedValue = value === "true" || value === "1";
            } else {
              processedValue = Boolean(value);
            }
            break;
          case "date":
            processedValue = value ? new Date(value).toISOString() : null;
            break;
          case "catalog":
            processedValue = value ?? null;
            break;
          default:
            processedValue = value ?? "";
            break;
        }
      }

      setEditedRow((prev) => {
        const updated = { ...prev, [key]: processedValue };
        validateAll(updated).then(setErrors);
        return updated;
      });
    },
    [columns, validateAll]
  );

  const reset = useCallback(() => {
    setEditedRow({ ...rowRef.current });
    setErrors({});
  }, []);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  return {
    editedRow,
    errors,
    isHovered,
    setIsHovered,
    hasErrors,
    handleEdit,
    handleSave,
    handleCancel,
    handleChange,
    reset,
  };
}
