import clsx from "clsx";
import { FaChevronLeft } from "react-icons/fa";
import { ITPageHeaderProps } from "./page-header.props";
import ITBreadcrumbs from "../breadcrumbs/breadcrumbs";
import ITText from "@/components/text/text";

export default function ITPageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  backAction,
  className,
}: ITPageHeaderProps) {
  const showTopRow = breadcrumbs?.length || backAction;

  return (
    <div className={clsx(className)}>
      {showTopRow && (
        <div className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-2 min-w-0">
            {backAction && (
              <button
                onClick={backAction}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-500 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
                aria-label="Volver"
              >
                <FaChevronLeft size={14} />
              </button>
            )}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <ITBreadcrumbs items={breadcrumbs} />
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <ITText as="h1" className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            {title}
          </ITText>
          {description && (
            <ITText as="p" className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {description}
            </ITText>
          )}
        </div>
        {!showTopRow && actions && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
