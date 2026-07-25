import { ReactNode } from "react";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface ITAlertProps {
  /** Alert visual style. Valid values: `"info"`, `"success"`, `"warning"`, `"error"`. @default "info" */
  variant?: AlertVariant;
  /** Optional bold title text displayed above the message. */
  title?: string;
  /** Alert message content. */
  children?: ReactNode;
  /** Whether the alert can be dismissed by the user. @default false */
  dismissible?: boolean;
  /** Callback fired when the dismiss button is clicked. */
  onDismiss?: () => void;
  /** Custom icon element. Overrides the default variant icon. */
  icon?: ReactNode;
  /** Additional CSS class names for the alert container. */
  className?: string;
}
