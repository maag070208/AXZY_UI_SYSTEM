export interface ITToastProps {
  /** Toast message text to display. */
  message: string;
  /** Severity type determining icon and background color. One of "success", "error", "warning", "info", "primary", or "danger". @default "info" */
  type?: "success" | "error" | "warning" | "info" | "primary" | "danger" | string;
  /** Auto-dismiss duration in milliseconds. @default 1500 */
  duration?: number;
  /** On-screen placement. One of "top-right", "top-center", "top-left", "bottom-right", "bottom-center", "bottom-left". @default "top-right" */
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
  /** Callback invoked after the toast finishes its dismiss transition animation. */
  onClose?: () => void;
}
