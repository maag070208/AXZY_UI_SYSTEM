import clsx from "clsx";
import { ITEmptyStateProps } from "./empty-state.props";
import { FaInbox } from "react-icons/fa";
import ITText from "@/components/text/text";

/**
 * Placeholder display for empty data sets.
 *
 * Shows a large icon, a title, an optional description, and an optional
 * call-to-action element (usually a button). Centered vertically and
 * horizontally within its container.
 *
 * @example
 * ```tsx
 * <ITEmptyState
 *   title="No results found"
 *   description="Try adjusting your search or filters."
 *   action={<ITButton label="Clear filters" variant="outlined" onClick={clearFilters} />}
 * />
 * ```
 */
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
      <ITText as="h3" className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-1">{title}</ITText>
      {description && <ITText as="p" className="text-sm text-slate-400 dark:text-slate-500 max-w-sm mb-4">{description}</ITText>}
      {action && <div>{action}</div>}
    </div>
  );
}
