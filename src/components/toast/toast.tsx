import { positionStyles, toastStyles } from "@/types/toast.types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import "./toast.css";
import { ITToastProps } from "./toast.props";
import { FaTimesCircle } from "react-icons/fa";

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
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={clsx(
        "fixed z-50 p-4 rounded-lg shadow-lg flex items-center justify-between transition-opacity duration-300",
        toastStyles[type],
        positionStyles[position],
        {
          "opacity-100": isVisible,
          "opacity-0": !isVisible,
        }
      )}
    >
      <span>{message}</span>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-4 p-1 rounded-full hover:bg-black/10"
      >
        <FaTimesCircle />
      </button>
    </div>
  );
}
