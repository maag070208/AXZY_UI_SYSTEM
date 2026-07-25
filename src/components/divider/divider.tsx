import clsx from "clsx";
import { ITDividerProps } from "./divider.props";

/**
 * Horizontal or vertical separator line.
 *
 * Renders a thin full-width (horizontal) or full-height (vertical) bar using
 * Tailwind utility classes. Supports custom color and thickness overrides.
 *
 * @example
 * ```tsx
 * <ITDivider />
 * ```
 *
 * @example
 * ```tsx
 * <ITDivider orientation="vertical" color="bg-red-500" thickness="w-1" />
 * ```
 */
export default function ITDivider({
  orientation = "horizontal",
  className,
  color = "bg-slate-200 dark:bg-slate-700",
  thickness = orientation === "horizontal" ? "h-px" : "w-px",
}: ITDividerProps) {
  return (
    <div
      className={clsx(
        "flex-shrink-0",
        orientation === "horizontal" ? "w-full" : "self-stretch",
        thickness,
        color,
        className
      )}
    />
  );
}
