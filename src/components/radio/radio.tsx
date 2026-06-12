import clsx from "clsx";
import { ITRadioGroupProps } from "./radio.props";

export default function ITRadioGroup({
  name,
  value,
  onChange,
  options,
  disabled = false,
  direction = "column",
  className,
}: ITRadioGroupProps) {
  return (
    <div
      className={clsx(
        "flex gap-3",
        direction === "row" ? "flex-row flex-wrap" : "flex-col",
        className
      )}
    >
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <label
            key={opt.value}
            className={clsx(
              "inline-flex items-center gap-2 cursor-pointer select-none",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={isSelected}
              onChange={() => onChange(opt.value)}
              disabled={disabled}
              className="peer sr-only"
            />
            <div
              className={clsx(
                "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
                isSelected
                  ? "border-primary-500"
                  : "border-slate-300 dark:border-slate-600",
                !disabled && "peer-focus:ring-2 peer-focus:ring-primary-200",
              )}
            >
              {isSelected && <div className="w-2 h-2 rounded-full bg-primary-500" />}
            </div>
            <span className="text-sm text-slate-700 dark:text-slate-300">{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}
