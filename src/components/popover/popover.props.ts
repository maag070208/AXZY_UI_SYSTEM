import { ReactNode } from "react";

/** Available positions for the popover relative to the trigger element. */
export type PopoverPosition = "top" | "bottom" | "left" | "right";

/** Props for the ITPopover component. */
export interface ITPopoverProps {
  /** Element that triggers the popover when clicked. */
  trigger: ReactNode;
  /** Content rendered inside the popover panel. */
  children: ReactNode;
  /** Position of the popover relative to the trigger. Options: "top", "bottom", "left", "right". Default: "bottom". */
  position?: PopoverPosition;
  /** Controlled open state. When provided, the component acts in controlled mode. */
  isOpen?: boolean;
  /** Callback fired when the popover is closed in controlled mode. */
  onClose?: () => void;
  /** Additional CSS classes for the container. */
  className?: string;
}
