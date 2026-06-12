import clsx from "clsx";
import { ITDrawerProps } from "./drawer.props";
import { FaTimes } from "react-icons/fa";
import useClickOutside from "@/hooks/useClickOutside";
import { useRef } from "react";
import ITText from "@/components/text/text";

export default function ITDrawer({
  isOpen,
  onClose,
  position = "right",
  size = "w-80",
  title,
  children,
  className,
  style,
}: ITDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useClickOutside(panelRef, onClose);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
          <div
            ref={panelRef}
            className={clsx(
              "relative z-10 h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col transition-transform duration-300",
              position === "right" ? "ml-auto" : "mr-auto",
              size,
              className
            )}
            style={style}
          >
            {title && (
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
                <ITText as="h2" className="text-lg font-bold text-slate-800 dark:text-white">{title}</ITText>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-5">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
