import { ReactNode, CSSProperties, ElementType } from "react";

export type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
export type FlexAlign = "start" | "end" | "center" | "stretch" | "baseline";
export type FlexJustify = "start" | "end" | "center" | "between" | "around" | "evenly";
export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

export interface ITFlexProps {
  children?: ReactNode;
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: FlexWrap;
  gap?: number;
  grow?: boolean | number;
  shrink?: boolean | number;
  basis?: string | number;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  onClick?: (e: React.MouseEvent) => void;
}
