import { ReactNode } from "react";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface ITAlertProps {
  variant?: AlertVariant;
  title?: string;
  children?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode;
  className?: string;
}
