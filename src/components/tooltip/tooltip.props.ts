import { ReactNode } from "react";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface ITTooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: TooltipPosition;
  delay?: number;
  className?: string;
}
