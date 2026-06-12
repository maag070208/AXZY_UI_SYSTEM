import clsx from "clsx";
import { ITProgressProps } from "./progress.props";
import { ColorsTypes } from "@/types/colors.types";

const colorMap: Record<ColorsTypes, string> = {
  primary: "bg-primary-500",
  secondary: "bg-secondary-500",
  success: "bg-success-500",
  danger: "bg-danger-500",
  warning: "bg-warning-500",
  info: "bg-info-500",
  purple: "bg-purple-500",
  error: "bg-danger-500",
  gray: "bg-secondary-500",
};

const sizeMap = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

export default function ITProgress({
  value = 0,
  max = 100,
  variant = "determinate",
  color = "primary",
  size = "md",
  className,
  style,
}: ITProgressProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      className={clsx("w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden", sizeMap[size], className)}
      style={style}
      role="progressbar"
      aria-valuenow={variant === "determinate" ? value : undefined}
      aria-valuemax={max}
    >
      <div
        className={clsx(
          "h-full rounded-full transition-all duration-500",
          colorMap[color],
          variant === "indeterminate" && "animate-pulse w-1/2"
        )}
        style={variant === "determinate" ? { width: `${pct}%` } : undefined}
      />
    </div>
  );
}
