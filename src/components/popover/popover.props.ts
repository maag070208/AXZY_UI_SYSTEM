import { ReactNode } from "react";

export type PopoverPosition = "top" | "bottom" | "left" | "right";

export interface ITPopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  position?: PopoverPosition;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}
