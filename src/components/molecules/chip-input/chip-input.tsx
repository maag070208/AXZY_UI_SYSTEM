import clsx from "clsx";
import { useRef, useState } from "react";
import { ITChipInputProps } from "./chip-input.props";
import { theme } from "@/theme/theme";
import { inputFieldStyle } from "@/utils/styles";
import ITChip from "@/components/atoms/chip/chip";
import ITText from "@/components/atoms/text/text";

/**
 * Free-text input that turns entered values into removable tags (chips).
 *
 * Commits a tag on `Enter`/`,` (configurable via `delimiters`), on blur, or on
 * paste of delimited text. Supports `maxTags`, dedupe control, and per-tag
 * validation.
 *
 * @example
 * <ITChipInput
 *   label="Etiquetas"
 *   value={tags}
 *   onChange={setTags}
 *   placeholder="Agrega una etiqueta..."
 * />
 */
export default function ITChipInput({
  name,
  label,
  placeholder = "Escribe y presiona Enter",
  value,
  onChange,
  onBlur,
  delimiters = ["Enter", ","],
  maxTags,
  allowDuplicates = false,
  validate,
  color = "primary",
  size = "md",
  disabled = false,
  required = false,
  touched,
  error,
  helpText,
  className,
}: ITChipInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [localTouched, setLocalTouched] = useState(false);
  const [localError, setLocalError] = useState<string | undefined>(undefined);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputTheme = (theme as any).input || {};

  const isTouched = touched !== undefined ? touched : localTouched;
  const externalError =
    error !== undefined && error !== false
      ? error === true
        ? "Este campo es requerido"
        : error
      : required && value.length === 0
      ? "Este campo es requerido"
      : undefined;
  const effectiveError = localError || externalError;
  const hasError = isTouched && !!effectiveError;

  const getControlStyle = (): React.CSSProperties => {
    const style = inputFieldStyle(inputTheme, size, { width: "100%", cursor: "text" });
    style.display = "flex";
    style.flexWrap = "wrap";
    style.alignItems = "center";
    style.gap = "0.375rem";
    style.minHeight = "2.5rem";

    if (disabled) {
      style.backgroundColor = inputTheme.disabled?.backgroundColor || style.backgroundColor;
      style.borderColor = inputTheme.disabled?.borderColor || style.borderColor;
      style.opacity = 0.7;
      style.cursor = "not-allowed";
    }
    if (hasError) {
      style.borderColor = inputTheme.error?.borderColor || "red";
    } else if (isFocused) {
      style.boxShadow = inputTheme.focus?.ring;
      style.borderColor = inputTheme.focus?.borderColor;
    }
    return style;
  };

  const commitTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag) return;
    if (maxTags !== undefined && value.length >= maxTags) {
      setLocalError(`Máximo ${maxTags} etiquetas`);
      return;
    }
    if (!allowDuplicates && value.includes(tag)) {
      setLocalError("Etiqueta duplicada");
      return;
    }
    const validationError = validate?.(tag);
    if (validationError) {
      setLocalError(validationError);
      return;
    }
    setLocalError(undefined);
    onChange?.([...value, tag]);
    setInputValue("");
  };

  const removeTag = (tag: string) => {
    if (disabled) return;
    onChange?.(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (delimiters.includes(e.key)) {
      if (e.key !== "Enter") e.preventDefault();
      commitTag(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      removeTag(value[value.length - 1]);
    } else if (localError) {
      setLocalError(undefined);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text");
    const separators = delimiters.filter((d) => d.length === 1);
    if (separators.length && separators.some((s) => text.includes(s))) {
      e.preventDefault();
      const parts = text
        .split(new RegExp(`[${separators.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("")}]`))
        .map((p) => p.trim())
        .filter(Boolean);
      parts.forEach((p) => commitTag(p));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputValue.trim()) commitTag(inputValue);
    setIsFocused(false);
    setLocalTouched(true);
    onBlur?.(e);
  };

  const handleContainerClick = () => {
    if (disabled) return;
    inputRef.current?.focus();
  };

  return (
    <div className={clsx("w-full flex flex-col gap-1.5", className)}>
      {label && (
        <ITText
          as="label"
          className={clsx("text-sm font-medium text-secondary-700 dark:text-slate-300", {
            "text-danger-500": hasError,
          })}
        >
          <ITText as="span">{label}</ITText>
          {required && <ITText as="span" className="text-danger-500 ml-1">*</ITText>}
        </ITText>
      )}

      <div
        onClick={handleContainerClick}
        className={clsx(disabled && "cursor-not-allowed")}
        style={getControlStyle()}
      >
        {value.map((tag) => (
          <ITChip
            key={tag}
            label={tag}
            color={color}
            size="sm"
            removable={!disabled}
            onRemove={() => removeTag(tag)}
          />
        ))}

        <input
          ref={inputRef}
          name={name}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={value.length === 0 ? placeholder : ""}
          autoComplete="off"
          className="flex-1 min-w-[100px] bg-transparent outline-none border-none text-sm text-secondary-900 dark:text-slate-100"
          style={{ padding: 0, fontSize: inputFieldStyle(inputTheme, size).fontSize }}
        />
      </div>

      {hasError ? (
        <ITText as="p" className="text-danger-500 text-xs mt-1">{effectiveError}</ITText>
      ) : helpText ? (
        <ITText as="p" className="text-xs text-secondary-500 dark:text-secondary-400">{helpText}</ITText>
      ) : null}
    </div>
  );
}
