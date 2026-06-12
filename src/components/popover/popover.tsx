import { useState, useRef } from "react";
import clsx from "clsx";
import { ITPopoverProps, PopoverPosition } from "./popover.props";
import useClickOutside from "@/hooks/useClickOutside";

const positionClasses: Record<PopoverPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export default function ITPopover({
  trigger,
  children,
  position = "bottom",
  isOpen: controlledOpen,
  onClose,
  className,
}: ITPopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    if (isControlled) onClose?.();
    else setInternalOpen(false);
  });

  return (
    <div ref={ref} className={clsx("relative inline-flex", className)}>
      <div onClick={() => (isControlled ? onClose?.() : setInternalOpen((p) => !p))} className="cursor-pointer">
        {trigger}
      </div>
      {open && (
        <div className={clsx("absolute z-[200]", positionClasses[position])}>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-3 min-w-[160px]">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
