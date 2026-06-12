import clsx from "clsx";
import { ITTextareaProps } from "./textarea.props";
import { inputLabel, inputError } from "@/utils/styles";
import ITText from "@/components/text/text";

const resizeMap = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize",
};

export default function ITTextarea({
  value,
  onChange,
  label,
  placeholder,
  rows = 4,
  disabled = false,
  error,
  className,
  name,
  maxLength,
  resize = "vertical",
}: ITTextareaProps) {
  return (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      {label && (
        <ITText as="label" className={inputLabel(!!error)} htmlFor={name}>
          {label}
        </ITText>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        maxLength={maxLength}
        className={clsx(
          "w-full border border-solid transition-all duration-200 rounded-lg px-3 py-2 text-sm outline-none",
          "focus:ring-2",
          resizeMap[resize],
          error
            ? "border-red-500 ring-red-100 focus:border-red-500 focus:ring-red-100"
            : "border-gray-300 focus:border-primary-500 focus:ring-primary-100",
          disabled && "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-slate-800"
        )}
      />
      {error && <ITText as="span" className={inputError}>{error}</ITText>}
    </div>
  );
}
