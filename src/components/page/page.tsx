import clsx from "clsx";
import { ITPageProps } from "./page.props";
import ITPageHeader from "../page-header/page-header";
import ITSkeleton from "../skeleton/skeleton";
import ITEmptyState from "../empty-state/empty-state";
import ITButton from "../button/button";
import ITStack from "../stack/stack";

const hasHeader = (props: ITPageProps) =>
  !!(props.title || props.description || props.breadcrumbs || props.actions || props.backAction);

const renderHeader = (props: ITPageProps) => {
  if (!hasHeader(props)) return null;
  return (
    <ITPageHeader
      title={props.title || ""}
      description={props.description}
      breadcrumbs={props.breadcrumbs}
      actions={props.actions}
      backAction={props.backAction}
    />
  );
};

export default function ITPage(props: ITPageProps) {
  const {
    loading = false,
    error = null,
    errorTitle,
    errorActionLabel,
    onRetry,
    empty = false,
    emptyTitle,
    emptyDescription,
    emptyAction,
    className,
    children,
  } = props;

  const wrapperClass = clsx("space-y-6", className);

  if (loading) {
    return (
      <div className={wrapperClass}>
        {renderHeader(props)}
        <ITStack spacing={4}>
          <ITSkeleton variant="rectangular" height={40} width="40%" />
          <ITSkeleton variant="rectangular" height={200} />
          <ITSkeleton variant="rectangular" height={200} />
        </ITStack>
      </div>
    );
  }

  if (error) {
    return (
      <div className={wrapperClass}>
        {renderHeader(props)}
        <ITEmptyState
          title={errorTitle || "Error"}
          description={error}
          action={
            onRetry ? (
              <ITButton
                label={errorActionLabel || "Reintentar"}
                onClick={onRetry}
                size="small"
              />
            ) : undefined
          }
        />
      </div>
    );
  }

  if (empty) {
    return (
      <div className={wrapperClass}>
        {renderHeader(props)}
        <ITEmptyState
          title={emptyTitle || "Sin datos"}
          description={emptyDescription || "No hay información para mostrar"}
          action={emptyAction}
        />
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      {renderHeader(props)}
      {children}
    </div>
  );
}
