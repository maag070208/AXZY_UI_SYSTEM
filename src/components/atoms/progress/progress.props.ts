import { CSSProperties } from "react";
import { ColorsTypes } from "@/types/colors.types";

/** Props for the ITProgress component. */
export interface ITProgressProps {
  /** Current progress value. Default: 0. */
  value?: number;
  /** Maximum progress value. Default: 100. */
  max?: number;
  /** Progress variant. "determinate" shows a fixed-width fill, "indeterminate" shows an animated pulsing bar. Default: "determinate". */
  variant?: "determinate" | "indeterminate";
  /** Semantic color from the theme. Options: primary, secondary, success, danger, warning, info, purple, error, gray. Default: "primary". */
  color?: ColorsTypes;
  /** Size of the progress bar. Options: "sm", "md", "lg". Default: "md". */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes for the container. */
  className?: string;
  /** Inline styles applied to the container. */
  style?: CSSProperties;
}
