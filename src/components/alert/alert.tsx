import clsx from "clsx";
import { ITAlertProps, AlertVariant } from "./alert.props";
import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaTimes } from "react-icons/fa";
import { theme } from "@/theme/theme";

const config: Record<AlertVariant, { icon: React.ReactNode; classes: string }> = {
  info: {
    icon: <FaInfoCircle size={16} />,
    classes: "bg-info-50 border-info-200 text-info-800 dark:bg-info-950/20 dark:border-info-800 dark:text-info-300",
  },
  success: {
    icon: <FaCheckCircle size={16} />,
    classes: "bg-success-50 border-success-200 text-success-800 dark:bg-success-950/20 dark:border-success-800 dark:text-success-300",
  },
  warning: {
    icon: <FaExclamationTriangle size={16} />,
    classes: "bg-warning-50 border-warning-200 text-warning-800 dark:bg-warning-950/20 dark:border-warning-800 dark:text-warning-300",
  },
  error: {
    icon: <FaTimesCircle size={16} />,
    classes: "bg-danger-50 border-danger-200 text-danger-800 dark:bg-danger-950/20 dark:border-danger-800 dark:text-danger-300",
  },
};

export default function ITAlert({
  variant = "info",
  title,
  children,
  dismissible,
  onDismiss,
  icon,
  className,
}: ITAlertProps) {
  const cfg = config[variant];
  return (
    <div
      className={clsx("flex items-start gap-3 rounded-xl border p-4", cfg.classes, className)}
      role="alert"
    >
      <span className="mt-0.5 flex-shrink-0">{icon || cfg.icon}</span>
      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-bold mb-0.5">{title}</p>}
        {children && <div className="text-sm opacity-90">{children}</div>}
      </div>
      {dismissible && onDismiss && (
        <button onClick={onDismiss} className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity">
          <FaTimes size={12} />
        </button>
      )}
    </div>
  );
}
