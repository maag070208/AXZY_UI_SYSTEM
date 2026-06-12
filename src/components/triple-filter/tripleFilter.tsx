import clsx from "clsx";
import { ITTripleFilterProps } from "./tripleFilter.props";
import { ColorsTypes } from "@/types/colors.types";

const colorMap: Record<ColorsTypes, string> = {
  primary: "text-primary-600",
  secondary: "text-secondary-600",
  success: "text-success-600",
  danger: "text-danger-600",
  warning: "text-warning-600",
  info: "text-info-600",
  purple: "text-purple-600",
  error: "text-danger-600",
  gray: "text-secondary-600",
};

/**
 * @description Generic triple/segmented filter component with color support.
 */
export const ITTripleFilter = <T extends string | boolean>({
  value,
  onChange,
  options,
  color = "primary",
  className,
}: ITTripleFilterProps<T>) => {
  return (
    <div
      className={clsx("flex bg-slate-100 p-1 rounded-xl gap-1 w-fit", className)}
    >
      {options.map((option) => (
        <button
          key={String(option.value)}
          onClick={() => onChange(option.value)}
          className={clsx(
            "px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap",
            value === option.value
              ? clsx("bg-white shadow-sm", colorMap[color])
              : "text-slate-400 hover:text-slate-600"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ITTripleFilter;
