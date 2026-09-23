import { ReactNode } from "react";

/** A single action inside {@link ITDropdownMenuProps}. */
export interface ITDropdownMenuItem {
  /** Unique identifier for the item. */
  id: string;
  /** Item content (usually text). */
  label: ReactNode;
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Optional shortcut hint rendered on the right (e.g. `"⌘K"`). */
  shortcut?: string;
  /** Click handler for the item. */
  onClick?: () => void;
  /** Disables the item. @default false */
  disabled?: boolean;
  /** Renders the item in the danger color (destructive actions). @default false */
  danger?: boolean;
  /** Draws a separator above this item. @default false */
  divider?: boolean;
}

/** Props for the ITDropdownMenu component. */
export interface ITDropdownMenuProps {
  /** Menu actions. */
  items: ITDropdownMenuItem[];
  /** Custom trigger content. Defaults to a vertical ellipsis icon. */
  trigger?: ReactNode;
  /** Accessible label for the trigger button. @default "Abrir menú" */
  triggerLabel?: string;
  /** Placement of the menu relative to the trigger. Valid values: `"bottom-start"`, `"bottom-end"`, `"top-start"`, `"top-end"`. @default "bottom-end" */
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
  /** Fired after an item is activated, with its id and definition. */
  onSelect?: (id: string, item: ITDropdownMenuItem) => void;
  /** Disables the trigger. @default false */
  disabled?: boolean;
  /** Additional CSS classes for the trigger button. */
  className?: string;
  /** Additional CSS classes for the menu panel. */
  menuClassName?: string;
}
