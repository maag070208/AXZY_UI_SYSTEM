import clsx from "clsx";
import { ITDividerProps } from "./divider.props";

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
