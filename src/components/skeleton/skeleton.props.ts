import { CSSProperties } from "react";

/** Skeleton shape variant: "text" (line) | "circular" (avatar/icon) | "rectangular" (card/image). */
export type SkeletonVariant = "text" | "circular" | "rectangular";

/** Props for the ITSkeleton content placeholder loader component. */
export interface ITSkeletonProps {
  /** Skeleton shape: "text" | "circular" | "rectangular". Default: "text". */
  variant?: SkeletonVariant;
  /** Explicit width (CSS value or number in px). Text variant defaults to random 60%-90%. */
  width?: string | number;
  /** Explicit height (CSS value or number in px). */
  height?: string | number;
  /** Number of skeleton items to render. Default: 1. */
  count?: number;
  /** Additional CSS classes on each skeleton item. */
  className?: string;
  /** Inline style object applied to each skeleton item. */
  style?: CSSProperties;
}
