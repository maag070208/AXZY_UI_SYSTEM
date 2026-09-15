import { ReactNode, CSSProperties } from "react";

/** Screen edge from which the drawer slides in: "left" | "right". */
export type DrawerPosition = "left" | "right";

export interface ITDrawerProps {
  /** Controls whether the drawer is visible. */
  isOpen: boolean;
  /** Callback fired when the overlay is clicked or the close button is pressed. */
  onClose: () => void;
  /** Edge the drawer attaches to. @default "right" */
  position?: DrawerPosition;
  /** Tailwind width class (e.g. "w-80", "w-96"). @default "w-80" */
  size?: string;
  /** Optional heading rendered in the drawer header. */
  title?: ReactNode;
  /** Content displayed in the drawer body. */
  children?: ReactNode;
  /** Additional CSS classes for the drawer panel. */
  className?: string;
  /** Inline styles for the drawer panel. */
  style?: CSSProperties;
}
