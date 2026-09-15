import { ReactNode, CSSProperties, ElementType } from "react";

export interface ITGridProps {
  /** Child elements */
  children?: ReactNode;
  /** Render as a grid container (CSS grid parent) */
  container?: boolean;
  /** Render as a grid item (CSS grid child). If neither `container` nor `item` is set, renders a plain div */
  item?: boolean;
  /** Gap between grid children in units of 0.25rem. Only applies when `container` is true */
  spacing?: number;
  /** Number of grid columns (1-12). Only applies when `container` is true */
  columns?: number;
  /** Column span at the base breakpoint (mobile). Falls back to `sm` if not set */
  xs?: number;
  /** Column span at the `sm` breakpoint */
  sm?: number;
  /** Column span at the `md` breakpoint */
  md?: number;
  /** Column span at the `lg` breakpoint */
  lg?: number;
  /** Column span at the `xl` breakpoint */
  xl?: number;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Custom HTML element type to render instead of the default `div` */
  as?: ElementType;
}
