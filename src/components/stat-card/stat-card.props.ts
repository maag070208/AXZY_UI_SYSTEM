import { ReactNode, CSSProperties } from "react";

export interface ITStatCardProps {
  /** The metric label displayed above the value. */
  label: string;
  /** The primary numeric or string value shown in the card. */
  value: string | number;
  /** Optional trend indicator text (e.g. "+12%", "-3"). */
  trend?: string;
  /** Direction of the trend, used to color the trend badge. */
  trendDirection?: "up" | "down" | "neutral";
  /** Icon element rendered next to the label in the top-right corner. */
  icon?: ReactNode;
  /** Background color class for the card (e.g. "bg-primary-50 dark:bg-primary-950/20"). */
  color?: string;
  /** Additional CSS classes for the outermost wrapper. */
  className?: string;
  /** Inline styles applied to the card container. */
  style?: CSSProperties;
  /** Click handler — when provided the card gains button semantics. */
  onClick?: () => void;
}
