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

function gridColsClass(cols: number) {
  const clamped = Math.min(Math.max(cols, 1), 12);
  return `grid-cols-${clamped}`;
}

/**
 * Responsive 12-column CSS grid layout system.
 * Renders as a grid container when `container` is true, as a column-spanning
 * item when `item` is true. Supports breakpoint-aware column spans and
 * configurable spacing between items.
 *
 * @example
 * <ITGrid container columns={12} spacing={4}>
 *   <ITGrid item xs={12} md={6}>Sidebar</ITGrid>
 *   <ITGrid item xs={12} md={6}>Content</ITGrid>
 * </ITGrid>
 *
 * @example
 * <ITGrid container columns={3} spacing={2} as="section">
 *   <ITGrid item>Card 1</ITGrid>
 *   <ITGrid item>Card 2</ITGrid>
 *   <ITGrid item>Card 3</ITGrid>
 * </ITGrid>
 */
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
        className={clsx("grid", gridColsClass(columns), className)}
        style={{
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
          "col-span-full",
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
