import { ReactNode } from "react";

export interface ITTabItem {
  /** Unique identifier for the tab. */
  id: string;
  /** Display label shown on the tab button. */
  label: string;
  /** Content rendered when this tab is active. */
  content: ReactNode;
  /** Optional icon rendered beside the label. */
  icon?: ReactNode;
  /** Whether the tab is disabled and non-interactive. */
  disabled?: boolean;
}

export interface ITTabsProps {
  /** Array of tab definitions: id, label, content, icon, and disabled state. */
  items: ITTabItem[];
  /** The id of the tab active by default (first item if omitted). */
  defaultActiveId?: string;
  /** Callback fired when the active tab changes, receiving the new tab id. */
  onChange?: (id: string) => void;
  /** Visual variant: "line" (underline indicator) or "pill" (rounded background). */
  variant?: 'line' | 'pill';
  /** Additional CSS classes for the tab header row. */
  className?: string;
  /** Additional CSS classes for the outermost wrapper. */
  containerClassName?: string;
}
