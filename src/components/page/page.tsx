import clsx from "clsx";
import { ITPageProps } from "./page.props";
import ITPageHeader from "../page-header/page-header";
import ITSkeleton from "../skeleton/skeleton";
import ITEmptyState from "../empty-state/empty-state";
import ITButton from "../button/button";
import ITStack from "../stack/stack";

export default function ITPage({
  title,
  description,
  breadcrumbs,
  actions,
  backAction,
  loading = false,
  error = null,
  onRetry,
  empty = false,
  emptyTitle,
  emptyDescription,
  emptyAction,
  className,
  children,
}: ITPageProps) {
  if (loading) {
    return (
      <div className={className}>
        {title && (
          <ITPageHeader title={title} />
        )}
        <div className="mt-6">
          <ITStack spacing={4}>
            <ITSkeleton variant="rectangular" height={40} width="40%" />
            <ITSkeleton variant="rectangular" height={200} />
            <ITSkeleton variant="rectangular" height={200} />
          </ITStack>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        {title && (
          <ITPageHeader title={title} />
        )}
        <ITEmptyState
          title="Error"
          description={error}
          action={
            onRetry ? (
              <ITButton label="Reintentar" onClick={onRetry} size="small" />
            ) : undefined
          }
        />
      </div>
    );
  }

  if (empty) {
    return (
      <div className={className}>
        {title && (
          <ITPageHeader title={title} />
        )}
        <ITEmptyState
          title={emptyTitle || "Sin datos"}
          description={emptyDescription || "No hay información para mostrar"}
          action={emptyAction}
        />
      </div>
    );
  }

  return (
    <div className={clsx("space-y-6", className)}>
      {(title || breadcrumbs || actions || backAction) && (
        <ITPageHeader
          title={title || ""}
          description={description}
          breadcrumbs={breadcrumbs}
          actions={actions}
          backAction={backAction}
        />
      )}
      {children}
    </div>
  );
}
