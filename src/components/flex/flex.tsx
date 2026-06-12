import clsx from "clsx";
import {
  ITFlexProps,
  FlexDirection,
  FlexAlign,
  FlexJustify,
  FlexWrap,
} from "./flex.props";

const directionMap: Record<FlexDirection, string> = {
  row: "flex-row",
  column: "flex-col",
  "row-reverse": "flex-row-reverse",
  "column-reverse": "flex-col-reverse",
};

const alignMap: Record<FlexAlign, string> = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyMap: Record<FlexJustify, string> = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const wrapMap: Record<FlexWrap, string> = {
  nowrap: "flex-nowrap",
  wrap: "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse",
};

export default function ITFlex({
  children,
  direction = "row",
  align,
  justify,
  wrap,
  gap = 0,
  grow,
  shrink,
  basis,
  className,
  style,
  as: Component = "div",
  onClick,
}: ITFlexProps) {
  const resolvedStyle: React.CSSProperties = {
    gap: gap > 0 ? `${gap * 0.25}rem` : undefined,
    flexGrow: typeof grow === "boolean" ? (grow ? 1 : 0) : grow,
    flexShrink: typeof shrink === "boolean" ? (shrink ? 1 : 0) : shrink,
    flexBasis: typeof basis === "number" ? `${basis * 0.25}rem` : basis,
    ...style,
  };

  return (
    <Component
      className={clsx(
        "flex",
        directionMap[direction],
        align && alignMap[align],
        justify && justifyMap[justify],
        wrap && wrapMap[wrap],
        className
      )}
      style={resolvedStyle}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}
