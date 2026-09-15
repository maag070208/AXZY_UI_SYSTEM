import clsx from "clsx";
import { Children, cloneElement, isValidElement, Fragment } from "react";
import { ITStackProps, StackDirection, StackAlignment, StackJustify, StackWrap } from "./stack.props";

const directionMap: Record<StackDirection, string> = {
  row: "flex-row",
  column: "flex-col",
  "row-reverse": "flex-row-reverse",
  "column-reverse": "flex-col-reverse",
};

const alignMap: Record<StackAlignment, string> = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyMap: Record<StackJustify, string> = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const wrapMap: Record<StackWrap, string> = {
  nowrap: "flex-nowrap",
  wrap: "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse",
};

/**
 * Simplified flex stack with consistent spacing (gap) for arranging children in a row or column.
 * Supports an optional divider element between children.
 *
 * @example
 * ```tsx
 * <ITStack direction="row" spacing={4} alignItems="center">
 *   <ITButton>Cancel</ITButton>
 *   <ITButton variant="primary">Save</ITButton>
 * </ITStack>
 * ```
 *
 * @example
 * ```tsx
 * <ITStack direction="column" spacing={2} divider={<hr />}>
 *   <p>Item 1</p>
 *   <p>Item 2</p>
 *   <p>Item 3</p>
 * </ITStack>
 * ```
 */
export default function ITStack({
  children,
  direction = "column",
  spacing = 0,
  alignItems,
  justifyContent,
  flexWrap,
  divider,
  className,
  style,
  as: Component = "div",
}: ITStackProps) {
  const hasDivider = divider !== undefined;
  const items = Children.toArray(children);

  const resolvedStyle: React.CSSProperties = {
    gap: spacing > 0 ? `${spacing * 0.25}rem` : undefined,
    ...style,
  };

  return (
    <Component
      className={clsx(
        "flex",
        directionMap[direction],
        alignItems && alignMap[alignItems],
        justifyContent && justifyMap[justifyContent],
        flexWrap && wrapMap[flexWrap],
        className
      )}
      style={resolvedStyle}
    >
      {hasDivider
        ? items.map((child, index) => (
            <Fragment key={index}>
              {child}
              {index < items.length - 1 && isValidElement(divider)
                ? cloneElement(divider, { key: `divider-${index}` })
                : null}
            </Fragment>
          ))
        : children}
    </Component>
  );
}
