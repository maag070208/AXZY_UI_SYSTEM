import clsx from "clsx";
import { ITGridProps } from "./grid.props";

function colSpanClass(span: number | undefined, cols: number) {
  if (span === undefined) return undefined;
  const clamped = Math.min(Math.max(Math.round(span), 1), cols);
  return `col-span-${clamped}`;
}

function breakpointSpan(span: number | undefined, bp: string, cols: number) {
  if (span === undefined) return undefined;
  const clamped = Math.min(Math.max(Math.round(span), 1), cols);
  return `${bp}:col-span-${clamped}`;
}

export default function ITGrid({
  children,
  container,
  item,
  spacing = 0,
  columns = 12,
  xs,
  sm,
  md,
  lg,
  xl,
  className,
  style,
  as: Component = "div",
}: ITGridProps) {
  if (container) {
    return (
      <Component
        className={clsx("grid", className)}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: spacing > 0 ? `${spacing * 0.25}rem` : undefined,
          ...style,
        }}
      >
        {children}
      </Component>
    );
  }

  if (item) {
    return (
      <Component
        className={clsx(
          colSpanClass(xs ?? sm, columns),
          sm !== undefined && breakpointSpan(sm, "sm", columns),
          md !== undefined && breakpointSpan(md, "md", columns),
          lg !== undefined && breakpointSpan(lg, "lg", columns),
          xl !== undefined && breakpointSpan(xl, "xl", columns),
          className
        )}
        style={style}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component className={className} style={style}>
      {children}
    </Component>
  );
}
