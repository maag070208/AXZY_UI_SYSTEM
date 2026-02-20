export interface ITToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info" | "primary" | "danger" | string;
  duration?: number;
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
  onClose?: () => void;
}
