import { CSSProperties } from "react";
import { ColorsTypes } from "@/types/colors.types";

export interface ITProgressProps {
  value?: number;
  max?: number;
  variant?: "determinate" | "indeterminate";
  color?: ColorsTypes;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
}
