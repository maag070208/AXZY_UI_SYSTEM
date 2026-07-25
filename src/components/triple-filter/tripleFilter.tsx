import clsx from "clsx";
import { ITTripleFilterProps } from "./tripleFilter.props";
import { ColorsTypes } from "@/types/colors.types";
import ITText from "@/components/text/text";

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
 * ITTripleFilter — generic segmented toggle filter bar for quick data filtering.
 *
 * Renders a row of pill-shaped buttons where exactly one is active at a time.
 * Supports any string or boolean value type and configurable color theming.
 * Commonly used for "All / Active / Inactive" or similar tri-state filters.
 *
 * @example
 * // Boolean triple filter
 * <ITTripleFilter<boolean>
 *   value={showActive}
 *   onChange={setShowActive}
 *   options={[
 *     { label: "All", value: false },
 *     { label: "Active", value: true },
 *   ]}
 * />
 *
 * @example
 * // String triple filter with danger color
 * <ITTripleFilter<string>
 *   value={status}
 *   onChange={setStatus}
 *   options={[
 *     { label: "Pending", value: "pending" },
 *     { label: "Approved", value: "approved" },
 *     { label: "Rejected", value: "rejected" },
 *   ]}
 *   color="danger"
 *   className="my-4"
 * />
 */
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
          <ITText as="span">{option.label}</ITText>
        </button>
      ))}
    </div>
  );
};

export default ITTripleFilter;
