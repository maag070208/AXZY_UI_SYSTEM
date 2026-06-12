import clsx from "clsx";
import { ITCheckboxProps } from "./checkbox.props";

export default function ITCheckbox({
  checked = false,
  onChange,
  label,
  disabled = false,
  indeterminate = false,
  className,
  name,
}: ITCheckboxProps) {
  return (
    <label
      className={clsx(
        "inline-flex items-center gap-2 cursor-pointer select-none",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
        ref={(el) => { if (el) el.indeterminate = indeterminate; }}
        className="peer sr-only"
      />
      <div
        className={clsx(
          "w-4 h-4 rounded border-2 flex items-center justify-center transition-all",
          checked
            ? "bg-primary-500 border-primary-500"
            : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800",
          !disabled && "peer-focus:ring-2 peer-focus:ring-primary-200",
        )}
      >
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
            <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {indeterminate && !checked && (
          <div className="w-2 h-0.5 bg-slate-500 rounded" />
        )}
      </div>
      {label && <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>}
    </label>
  );
}
