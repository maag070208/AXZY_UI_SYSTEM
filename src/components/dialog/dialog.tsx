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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className={`overflow-hidden relative ${className} ${
          useFormHeader ? 'p-0' : 'p-6'
        }`}
        style={{
             backgroundColor: theme.card.backgroundColor,
             borderRadius: theme.card.borderRadius,
             boxShadow: theme.card.shadow,
             // Border? theme.card.borderWidth?
             borderWidth: theme.card.borderWidth,
             borderColor: theme.card.borderColor,
             borderStyle: 'solid',
        }}
      >
        {useFormHeader && title ? (
          <>
            <ITFormHeader title={title} onClose={onClose} />
            <div className="p-6">{children}</div>
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
}
