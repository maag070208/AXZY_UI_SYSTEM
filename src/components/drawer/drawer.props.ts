import { ReactNode, CSSProperties } from "react";

export type DrawerPosition = "left" | "right";

export interface ITDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: DrawerPosition;
  size?: string;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
