import clsx from "clsx";
import { ITEmptyStateProps } from "./empty-state.props";
import { FaInbox } from "react-icons/fa";

export default function ITEmptyState({
  icon = <FaInbox size={40} />,
  title,
  description,
  action,
  className,
}: ITEmptyStateProps) {
  return (
    <div className={clsx("flex flex-col items-center justify-center py-16 px-6 text-center", className)}>
      <div className="text-slate-300 dark:text-slate-600 mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-1">{title}</h3>
      {description && <p className="text-sm text-slate-400 dark:text-slate-500 max-w-sm mb-4">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
