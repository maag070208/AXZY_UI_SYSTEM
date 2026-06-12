import { ReactNode, CSSProperties, ElementType } from "react";

export interface ITGridProps {
  children?: ReactNode;
  container?: boolean;
  item?: boolean;
  spacing?: number;
  columns?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}
