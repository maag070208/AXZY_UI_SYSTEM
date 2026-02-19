import React from "react";
import { SearchColumn } from "../searchTable.props";
import ITInput from "@/components/input/input";
import ITSelect from "@/components/select/select";
import ITDatePicker from "@/components/date-picker/datePicker";

interface EditableCellProps<T> {
  column: SearchColumn<T>;
  value: any;
  onChange: (value: any, error?: string) => void;
  error?: string;
  row: T;
}

export default function EditableCell<T>({
  column,
  value,
  onChange,
  error,
  row,
}: EditableCellProps<T>) {
  const validate = (val: any) => {
    if (column.validation) return column.validation(val);
    return undefined;
  };

  const normalizeAndNotify = (input: any) => {
    let newValue = input;

    if (input && typeof input === "object" && "target" in input) {
      const t = input.target as HTMLInputElement;
      if (column.inputType === "checkbox") newValue = t.checked;
      else newValue = t.value;
    }

    if (column.inputType === "number") {
      newValue = newValue === "" || newValue === null ? "" : Number(newValue);
    }

    const errorMsg = validate(newValue);
    onChange(newValue, errorMsg);
  };

  const handleBlur = () => {
    const errorMsg = validate(value);
    onChange(value, errorMsg);
  };

  // Funciones de renderizado centralizadas
  const renderITInput = (type: "text" | "number") => {
    return (
      <ITInput
        type={type}
        name={column.key}
        value={type === "number" ? value ?? "" : value || ""}
        onChange={normalizeAndNotify}
        onBlur={handleBlur}
        className="w-full"
        error={error}
      />
    );
  };

  const renderITDatePicker = () => {
    return (
      <ITDatePicker
        name={column.key}
        value={value || null}
        onChange={normalizeAndNotify}
        onBlur={handleBlur}
        className="w-full"
        error={error}
      />
    );
  };

  const renderITSelect = (
    options: { value: any; label: string | number }[]
  ) => {
    return (
      <ITSelect
        name={column.key}
        options={options as any}
        value={value}
        onChange={normalizeAndNotify}
        onBlur={handleBlur as any}
        className="w-full"
        error={error}
      />
    );
  };

  const renderBooleanInput = () => {
    return (
      <ITInput
        type="checkbox"
        name={column.key}
        checked={!!value}
        onChange={(e) => {
          normalizeAndNotify(e.target.checked);
        }}
        onBlur={handleBlur}
        className="w-full"
        error={error}
      />
    );
  };

  // Función principal que decide qué componente renderizar
  const renderInput = () => {
    const inputType = column.inputType || column.type;

    switch (inputType) {
      case "number":
        return renderITInput("number");

      case "select":
        return renderITSelect(column.options || []);

      case "checkbox":
      case "boolean":
        return renderBooleanInput();

      case "date":
        return renderITDatePicker();

      case "catalog":
        if (column.catalogOptions) {
          const options = column.catalogOptions.data.map((item) => ({
            value: item[column.catalogOptions.key || "id"],
            label: item[column.catalogOptions.label || "name"],
          }));
          return renderITSelect(options);
        }
        return renderITInput("text"); // fallback si no hay catalogOptions

      default:
        return renderITInput("text");
    }
  };

  return (
    <div className="w-full">
      {renderInput()}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
}
