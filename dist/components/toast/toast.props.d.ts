export interface ITToastProps {
    message: string;
    type?: "success" | "error" | "warning" | "info";
    duration?: number;
    position?: "top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left";
    onClose?: () => void;
}
