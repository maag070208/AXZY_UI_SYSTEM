import { ReactNode, CSSProperties, ElementType } from "react";

export type StackDirection = "row" | "column" | "row-reverse" | "column-reverse";
export type StackAlignment = "start" | "end" | "center" | "stretch" | "baseline";
export type StackJustify = "start" | "end" | "center" | "between" | "around" | "evenly";
export type StackWrap = "nowrap" | "wrap" | "wrap-reverse";

export interface ITStackProps {
  children?: ReactNode;
  direction?: StackDirection;
  spacing?: number;
  alignItems?: StackAlignment;
  justifyContent?: StackJustify;
  flexWrap?: StackWrap;
  divider?: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}
