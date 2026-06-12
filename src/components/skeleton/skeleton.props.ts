import { CSSProperties } from "react";

export type SkeletonVariant = "text" | "circular" | "rectangular";

export interface ITSkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
  style?: CSSProperties;
}
