import { ReactNode } from "react";

/** Available placement positions relative to the trigger element. */
export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface ITTooltipProps {
  /** The tooltip content to display on hover / focus. Accepts text or any ReactNode. */
  content: ReactNode;
  /** The trigger element that reveals the tooltip on interaction. */
  children: ReactNode;
  /** Placement relative to children. One of "top", "bottom", "left", "right". @default "top" */
  position?: TooltipPosition;
  /** Delay in milliseconds before the tooltip becomes visible. @default 200 */
  delay?: number;
  /** Additional CSS classes applied to the wrapper element. */
  className?: string;
}
