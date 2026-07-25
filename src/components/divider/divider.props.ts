/** Direction the divider flows: "horizontal" | "vertical". */
export type DividerOrientation = "horizontal" | "vertical";

export interface ITDividerProps {
  /** Layout direction. @default "horizontal" */
  orientation?: DividerOrientation;
  /** Additional CSS classes for the divider element. */
  className?: string;
  /** Tailwind background color class(es). @default "bg-slate-200 dark:bg-slate-700" */
  color?: string;
  /** Tailwind width/height utility (e.g. "h-px", "h-1", "w-px"). Auto-set based on orientation if omitted. */
  thickness?: string;
}
