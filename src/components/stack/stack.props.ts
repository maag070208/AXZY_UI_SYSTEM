import { ReactNode, CSSProperties, ElementType } from "react";

/** Flex direction: "row" | "column" | "row-reverse" | "column-reverse". */
export type StackDirection = "row" | "column" | "row-reverse" | "column-reverse";

/** Cross-axis alignment: "start" | "end" | "center" | "stretch" | "baseline". */
export type StackAlignment = "start" | "end" | "center" | "stretch" | "baseline";

/** Main-axis justification: "start" | "end" | "center" | "between" | "around" | "evenly". */
export type StackJustify = "start" | "end" | "center" | "between" | "around" | "evenly";

/** Flex wrap behaviour: "nowrap" | "wrap" | "wrap-reverse". */
export type StackWrap = "nowrap" | "wrap" | "wrap-reverse";

/** Props for the ITStack flex layout component. */
export interface ITStackProps {
  /** Stack children elements. */
  children?: ReactNode;
  /** Flex direction. Default: "column". */
  direction?: StackDirection;
  /** Spacing between children in 0.25rem units (0–12). Default: 0. */
  spacing?: number;
  /** Cross-axis alignment. */
  alignItems?: StackAlignment;
  /** Main-axis justification. */
  justifyContent?: StackJustify;
  /** Whether children should wrap. */
  flexWrap?: StackWrap;
  /** Optional divider element inserted between children. */
  divider?: ReactNode;
  /** Additional CSS classes on the container. */
  className?: string;
  /** Inline styles on the container. */
  style?: CSSProperties;
  /** HTML element type to render as. Default: "div". */
  as?: ElementType;
}
