import { positionStyles } from "@/types/toast.types";
import { theme } from "@/theme/theme";
import clsx from "clsx";
import { useEffect, useState } from "react";
import "./toast.css";
import { ITToastProps } from "./toast.props";
import { FaTimesCircle, FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from "react-icons/fa";

export default function ITToast({
  message,
  type = "info",
  duration = 1500,
  position = "top-right",
  onClose,
}: ITToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, 300); // Wait for transition to finish
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  // Resolve dynamic theme colors for background
  const isThemeColor = type in theme.colors;
  const backgroundColor = isThemeColor
    ? theme.colors[type as keyof typeof theme.colors][500]
    : theme.colors.primary[500];

  // Determine Icon based on type
  const TypeIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="w-5 h-5 flex-shrink-0" />;
      case "error":
      case "danger":
        return <FaTimesCircle className="w-5 h-5 flex-shrink-0" />;
      case "warning":
        return <FaExclamationTriangle className="w-5 h-5 flex-shrink-0" />;
      case "info":
      default:
        return <FaInfoCircle className="w-5 h-5 flex-shrink-0" />;
    }
  };

  return (
    <div
      className={clsx(
        "fixed z-50 p-4 rounded-xl shadow-xl flex items-center justify-between gap-4 transition-all duration-300 text-white min-w-[300px]",
        positionStyles[position],
        {
          "opacity-100 translate-y-0 scale-100": isVisible,
          "opacity-0 scale-95": !isVisible,
          "-translate-y-4": !isVisible && position.startsWith("top"),
          "translate-y-4": !isVisible && position.startsWith("bottom"),
        }
      )}
      style={{ backgroundColor }}
      role="alert"
    >
      <div className="flex items-center gap-3">
        <TypeIcon />
        <span className="font-medium text-sm sm:text-base leading-snug">{message}</span>
      </div>
      <button
        onClick={handleClose}
        className="p-1.5 rounded-full hover:bg-black/15 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Close notification"
      >
        <FaTimes className="w-4 h-4" />
      </button>
    </div>
  );
}
