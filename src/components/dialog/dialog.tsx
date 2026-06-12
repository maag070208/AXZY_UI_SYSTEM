import { createPortal } from "react-dom";
import { theme } from "@/theme/theme";
import { useEffect, useRef } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { ITDialogProps } from "./dialog.props";
import useClickOutside from "@/hooks/useClickOutside";
import ITFormHeader from "../form-header/form-header";

export default function ITDialog({
  isOpen,
  onClose,
  children,
  className,
  title,
  useFormHeader = false,
  fullScreen = false,
}: ITDialogProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, onClose);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  if (typeof document === "undefined") return null;

  const content = (
    <div
      className={`fixed inset-0 flex ${
        fullScreen ? "items-stretch" : "items-center justify-center"
      } bg-black bg-opacity-50 z-[9999]`}
    >
      <div
        ref={modalRef}
        className={`overflow-hidden relative ${
          fullScreen
            ? "w-screen h-screen max-w-none rounded-none m-0 flex flex-col"
            : `${className || ""} ${useFormHeader ? "p-0" : "p-6"}`
        }`}
        style={{
             backgroundColor: theme.card.backgroundColor,
             borderRadius: fullScreen ? "0" : theme.card.borderRadius,
             boxShadow: fullScreen ? "none" : theme.card.shadow,
             borderWidth: fullScreen ? "0" : theme.card.borderWidth,
             borderColor: theme.card.borderColor,
             borderStyle: 'solid',
        }}
      >
        {useFormHeader && title ? (
          <>
            <ITFormHeader title={title} onClose={onClose} />
            <div className={fullScreen ? "flex-1 overflow-auto p-6" : "p-6"}>
              {children}
            </div>
          </>
        ) : (
          <>
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={onClose}
            >
              <FaRegTimesCircle />
            </button>
            {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
            <div>{children}</div>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
