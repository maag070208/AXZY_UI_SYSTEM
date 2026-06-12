import { ReactNode, CSSProperties } from "react";

export interface ITStatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  icon?: ReactNode;
  color?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}
