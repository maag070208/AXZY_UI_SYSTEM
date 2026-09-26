import clsx from "clsx";
import { ITPageProps } from "./page.props";
import ITPageHeader from "@/components/organisms/page-header/page-header";
import ITSkeleton from "@/components/atoms/skeleton/skeleton";
import ITEmptyState from "@/components/molecules/empty-state/empty-state";
import ITButton from "@/components/atoms/button/button";
import ITStack from "@/components/atoms/stack/stack";

const hasHeader = (props: ITPageProps) =>
  !!(props.title || props.description || props.breadcrumbs || props.actions || props.backAction || props.icon);

const renderHeader = (props: ITPageProps) => {
  if (!hasHeader(props)) return null;
  return (
    <ITPageHeader
      title={props.title || ""}
      description={props.description}
      breadcrumbs={props.breadcrumbs}
      actions={props.actions}
      backAction={props.backAction}
      icon={props.icon}
      iconColor={props.iconColor}
    />
  );
};

/**
 * Page template combining a page header and content area with built-in states for loading, error, and empty.
 *
 * @example
 * ```tsx
 * <ITPage
 *   title="Dashboard"
 *   description="Overview of your account"
 *   breadcrumbs={[{ label: 'Home' }, { label: 'Dashboard' }]}
 *   actions={<ITButton label="Refresh" />}
 *   loading={isLoading}
 *   error={errorMessage}
 *   onRetry={fetchData}
 * >
 *   <ITCard>Dashboard content</ITCard>
 * </ITPage>
 * ```
 *
 * @example
 * ```tsx
 * // Edge-to-edge content: no horizontal gutter, vertical padding kept.
 * <ITPage title="Reportes" horizontalPadding="px-0">
 *   <ITTable data={rows} columns={columns} />
 * </ITPage>
 * ```
 */
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
    maxWidth = "7xl",
    noPadding = false,
    horizontalPadding = "px-4 sm:px-6 lg:px-8",
  } = props;

  const wrapperClass = clsx(
    "mx-auto w-full",
    !noPadding && horizontalPadding,
    !noPadding && "py-6",
    `max-w-${maxWidth}`,
    "space-y-8",
    className
  );

  if (loading) {
    return (
      <div className={wrapperClass}>
        {renderHeader(props)}
        <ITStack spacing={6}>
          <ITSkeleton variant="rectangular" height={40} width="40%" className="rounded-lg" />
          <ITSkeleton variant="rectangular" height={200} className="rounded-lg" />
          <ITSkeleton variant="rectangular" height={200} className="rounded-lg" />
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
                size="sm"
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