import { useState } from "react";
import clsx from "clsx";
import { ITTooltipProps, TooltipPosition } from "./tooltip.props";
import ITText from "@/components/text/text";

const positionClasses: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowClasses: Record<TooltipPosition, string> = {
  top: "top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-slate-800",
  left: "left-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-slate-800",
  right: "right-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-slate-800",
};

/**
 * ITTooltip — hover / focus info tooltip with position control and optional arrow indicator.
 *
 * Wraps a trigger element and displays a small popup with explanatory text
 * after a configurable delay. Supports "top", "bottom", "left", and "right" placement
 * with a triangular arrow pointing toward the trigger.
 *
 * @example
 * // Basic tooltip
 * <ITTooltip content="Click to save" position="bottom">
 *   <button>Save</button>
 * </ITTooltip>
 *
 * @example
 * // Tooltip with custom delay
 * <ITTooltip content="Delete this item?" position="top" delay={500}>
 *   <IconButton icon={TrashIcon} />
 * </ITTooltip>
 */
export default function ITTooltip({
  content,
  children,
  position = "top",
  delay = 200,
  className,
}: ITTooltipProps) {
  const [visible, setVisible] = useState(false);
  let timeout: ReturnType<typeof setTimeout>;

  const handleMouseEnter = () => {
    timeout = setTimeout(() => setVisible(true), delay);
  };
  const handleMouseLeave = () => {
    clearTimeout(timeout);
    setVisible(false);
  };

  return (
    <div
      className={clsx("relative inline-flex", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {visible && (
        <div className={clsx("absolute z-[200] pointer-events-none", positionClasses[position])}>
          <div className="bg-slate-800 dark:bg-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 whitespace-nowrap shadow-lg">
            <ITText as="span">{content}</ITText>
          </div>
          <div className={clsx("absolute", arrowClasses[position])} />
        </div>
      )}
    </div>
  );
}
