import clsx from "clsx";
import { ITStatCardProps } from "./stat-card.props";
import ITText from "@/components/text/text";

const trendColors = {
  up: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30",
  down: "text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/30",
  neutral: "text-slate-500 bg-slate-100 dark:text-slate-400 dark:bg-slate-800",
};

export default function ITStatCard({
  label,
  value,
  trend,
  trendDirection = trend && trend.startsWith("-") ? "down" : "neutral",
  icon,
  color = "bg-primary-50 dark:bg-primary-950/20",
  className,
  style,
  onClick,
}: ITStatCardProps) {
  return (
    <div
      className={clsx("rounded-xl p-4 border border-slate-100 dark:border-slate-800", color, className)}
      style={style}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex items-start justify-between mb-1">
        <ITText as="span" className="text-xs font-medium text-slate-400 dark:text-slate-500">{label}</ITText>
        {icon && <span className="text-slate-400">{icon}</span>}
      </div>
      <div className="flex items-baseline gap-2">
        <ITText as="span" className="text-2xl font-bold text-slate-800 dark:text-white">{value}</ITText>
        {trend && (
          <ITText as="span" className={clsx("text-[11px] font-semibold px-1.5 py-0.5 rounded-md", trendColors[trendDirection])}>
            {trend}
          </ITText>
        )}
      </div>
    </div>
  );
}
