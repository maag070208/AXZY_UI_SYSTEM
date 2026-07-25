import { FaChevronLeft } from "react-icons/fa";
import { ITPageHeaderProps } from "./page-header.props";
import ITBreadcrumbs from "../breadcrumbs/breadcrumbs";
import ITText from "@/components/text/text";

/**
 * Page title bar with breadcrumbs, description, back button, and action buttons.
 *
 * @example
 * ```tsx
 * <ITPageHeader
 *   title="Users"
 *   description="Manage all system users"
 *   breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Users' }]}
 *   backAction={() => history.back()}
 *   actions={<ITButton label="Add User" />}
 *   icon={<FaUsers />}
 * />
 * ```
 */
export default function ITPageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  backAction,
  icon,
  iconColor,
  className,
}: ITPageHeaderProps) {
  const showTopRow = breadcrumbs?.length || backAction;

  return (
    <div className={`${className} space-y-3`}>
      {/* Fila superior: breadcrumbs + back + acciones */}
      {showTopRow && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            {backAction && (
              <button
                onClick={backAction}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all duration-200 flex-shrink-0"
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
            <div className="flex items-center gap-3 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Fila principal: icono + título + descripción + (acciones si no hay top row) */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-4 min-w-0">
          {icon && (
            <div
              className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 flex-shrink-0 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-500 hover:shadow-sm"
              style={iconColor ? { color: iconColor } : undefined}
            >
              {icon}
            </div>
          )}
          <div className="min-w-0">
            <ITText
              as="h1"
              className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight leading-tight"
            >
              {title}
            </ITText>
            {description && (
              <ITText
                as="p"
                className="text-sm font-light text-slate-500 dark:text-slate-400 mt-1 leading-relaxed"
              >
                {description}
              </ITText>
            )}
          </div>
        </div>
        {!showTopRow && actions && (
          <div className="flex items-center gap-3 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}