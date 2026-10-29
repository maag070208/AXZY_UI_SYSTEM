import clsx from "clsx";
import { ITSegmentedControlProps } from "./segmented-control.props";
import ITText from "@/components/atoms/text/text";
import { useITAppearance } from "@/theme/theme-context";

const sizeMap = {
  sm: { button: "px-2.5 py-1.5 text-[11px]", container: "p-0.5" },
  md: { button: "px-3 py-2 text-xs", container: "p-1" },
};

/**
 * iOS-style segmented toggle for switching between mutually exclusive options.
 *
 * @example
 * ```tsx
 * <ITSegmentedControl
 *   options={[
 *     { value: "day", label: "Day" },
 *     { value: "week", label: "Week", icon: <FaCalendar /> },
 *   ]}
 *   value={view}
 *   onChange={setView}
 * />
 * ```
 */
export default function ITSegmentedControl({
  options,
  value,
  onChange,
  size = "md",
  className,
  disabled = false,
}: ITSegmentedControlProps) {
  const { button, container } = sizeMap[size];
  // Bento: borderless pill track with an ink pill for the selected option.
  const bento = useITAppearance() === "bento";

  return (
    <div
      role="group"
      className={clsx(
        "inline-flex",
        bento
          ? "rounded-full"
          : "rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700",
        container,
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={bento ? { backgroundColor: "var(--it-bento-control-bg, #f1f5f9)" } : undefined}
    >
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => !disabled && onChange(opt.value)}
            disabled={disabled}
            className={clsx(
              button,
              "font-semibold transition-all flex items-center gap-1.5",
              bento
                ? "rounded-full border border-transparent"
                : isActive
                ? "rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm border border-slate-200 dark:border-slate-600"
                : "rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 border border-transparent",
              disabled && "pointer-events-none"
            )}
            style={
              bento
                ? {
                    backgroundColor: isActive ? "var(--it-bento-ink-bg, #0f172a)" : "transparent",
                    color: isActive ? "var(--it-bento-ink-text, #ffffff)" : "var(--it-bento-control-text, #475569)",
                  }
                : undefined
            }
          >
            {opt.icon && <span>{opt.icon}</span>}
            <ITText as="span">{opt.label}</ITText>
          </button>
        );
      })}
    </div>
  );
}
