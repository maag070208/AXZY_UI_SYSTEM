import { ReactNode, CSSProperties, ElementType } from "react";

export type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
export type FlexAlign = "start" | "end" | "center" | "stretch" | "baseline";
export type FlexJustify = "start" | "end" | "center" | "between" | "around" | "evenly";
export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

export interface ITFlexProps {
  /** Child elements to render inside the flex container */
  children?: ReactNode;
  /** Main axis direction: "row" | "column" | "row-reverse" | "column-reverse" */
  direction?: FlexDirection;
  /** Cross-axis alignment: "start" | "end" | "center" | "stretch" | "baseline" */
  align?: FlexAlign;
  /** Main-axis justification: "start" | "end" | "center" | "between" | "around" | "evenly" */
  justify?: FlexJustify;
  /** Wrapping behavior: "nowrap" | "wrap" | "wrap-reverse" */
  wrap?: FlexWrap;
  /** Gap between children in units of 0.25rem */
  gap?: number;
  /** Flex grow factor. Pass `true` for 1, `false` for 0, or a number */
  grow?: boolean | number;
  /** Flex shrink factor. Pass `true` for 1, `false` for 0, or a number */
  shrink?: boolean | number;
  /** Flex basis value. Numbers are multiplied by 0.25rem; strings used as-is */
  basis?: string | number;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Custom HTML element type to render instead of the default `div` */
  as?: ElementType;
  /** Click handler */
  onClick?: (e: React.MouseEvent) => void;
}
