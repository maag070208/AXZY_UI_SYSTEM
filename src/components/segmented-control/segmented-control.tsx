import clsx from "clsx";
import { ITSegmentedControlProps } from "./segmented-control.props";

const sizeMap = {
  sm: { button: "px-2.5 py-1.5 text-[11px]", container: "p-0.5" },
  md: { button: "px-3 py-2 text-xs", container: "p-1" },
};

export default function ITSegmentedControl({
  options,
  value,
  onChange,
  size = "md",
  className,
  disabled = false,
}: ITSegmentedControlProps) {
  const { button, container } = sizeMap[size];

  return (
    <div
      className={clsx(
        "inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700",
        container,
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            onClick={() => !disabled && onChange(opt.value)}
            disabled={disabled}
            className={clsx(
              button,
              "rounded-lg font-semibold transition-all flex items-center gap-1.5",
              isActive
                ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm border border-slate-200 dark:border-slate-600"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 border border-transparent",
              disabled && "pointer-events-none"
            )}
          >
            {opt.icon && <span>{opt.icon}</span>}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
