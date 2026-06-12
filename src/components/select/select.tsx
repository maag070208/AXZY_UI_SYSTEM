import { theme } from "@/theme/theme";
import clsx from "clsx";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { ITSelectProps } from "./select.props";
import ITText from "@/components/text/text";

/**
 * Componente de selección (select) con soporte para opciones personalizadas, validación y personalización de estilo.
 * Matches styles of ITInput.
 */
export default function ITSelect({
  name,
  options,
  label,
  placeholder,
  valueField = "value",
  labelField = "label",
  value,
  onChange,
  onBlur,
  disabled = false,
  className,
  touched,
  required,
  error,
  readOnly = false,
}: ITSelectProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [localTouched, setLocalTouched] = useState(false);

  // Theme logic - reuse input theme for consistency
  const inputTheme = (theme as any).input || {};

  const isTouched = touched !== undefined ? touched : localTouched;
  const isEmpty = value === undefined || value === null || String(value).trim() === "";

  const effectiveError = error !== undefined && error !== false
    ? (error === true ? "Este campo es requerido" : error)
    : (required && isEmpty ? "Este campo es requerido" : undefined);

  const hasError = isTouched && !!effectiveError;
  const errorMessage = typeof effectiveError === "string" ? effectiveError : "Este campo es requerido";

  const getStyle = () => {
    const style: React.CSSProperties = {
      backgroundColor: inputTheme.backgroundColor,
      borderColor: inputTheme.borderColor,
      borderRadius: inputTheme.borderRadius,
      padding: inputTheme.padding,
      fontSize: inputTheme.fontSize,
      borderWidth: '1px',
      borderStyle: 'solid',
      transition: 'all 0.2s',
      color: 'var(--input-text-color, var(--color-secondary-900))',
      appearance: 'none', // Important for custom styling
    };

    if (disabled) {
      style.backgroundColor = inputTheme.disabled?.backgroundColor || style.backgroundColor;
      style.borderColor = inputTheme.disabled?.borderColor || style.borderColor;
      style.opacity = 0.7;
    }

    if (hasError) {
      style.borderColor = inputTheme.error?.borderColor || 'red';
      if (isFocused) {
        style.boxShadow = inputTheme.error?.ring;
      }
    } else if (isFocused && !readOnly) {
      style.boxShadow = inputTheme.focus?.ring;
    }

    return style;
  };

  return (
    <div className="w-full">
      <div className={clsx("relative", {
        "flex flex-col gap-1.5": label,
      })}>
        {label && (
          <ITText
            as="label"
            htmlFor={name}
            className={clsx(
              "text-sm font-medium text-gray-700 dark:text-slate-300 pt-0",
              { "text-red-500": hasError }
            )}
          >
            <ITText as="span">{label}</ITText>
            {required && <ITText as="span" className="text-red-500 ml-1">*</ITText>}
          </ITText>
        )}
        <div className="flex flex-col w-full">
          <div className="relative flex-1">
            <select
              name={name}
              id={name}
              value={value}
              onChange={readOnly ? undefined : onChange}
              onBlur={(e) => {
                setIsFocused(false);
                setLocalTouched(true);
                readOnly ? undefined : onBlur?.(e);
              }}
              onFocus={() => setIsFocused(true)}
              disabled={disabled}
              className={clsx(
                "w-full focus:outline-none", // Core structure only
                className,
                { "cursor-not-allowed": disabled }
              )}
              style={getStyle()}
            >
              <option value=""><ITText as="span">{placeholder || "Selecciona una opción"}</ITText></option>
              {
                readOnly ? (
                  <option value={value} disabled>
                    <ITText as="span">{options.find((option) => option[valueField] === value)?.[labelField]}</ITText>
                  </option>
                ) : (
                  options.map((option) => (
                    <option
                      key={option[valueField]}
                      value={option[valueField]}
                      title={option[labelField]}
                    >
                      <ITText as="span">{option[labelField]}</ITText>
                    </option>
                  ))
                )
              }
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              <FaAngleDown />
            </div>
          </div>
          {/* Validation message aligned with select */}
          {hasError && (
            <div className="flex-shrink-0 min-w-[140px] flex items-center pt-3">
              <ITText as="p" className="text-red-500 text-xs">{errorMessage}</ITText>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
