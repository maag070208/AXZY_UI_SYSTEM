import { SizesTypes } from "@/types/sizes.types";

/** Toolbar actions supported by ITWysiwyg. */
export type ToolbarAction =
  | "bold"
  | "italic"
  | "underline"
  | "highlight"
  | "ul"
  | "ol"
  | "clear";

/** Available formatting tools. Every action maps to a toolbar button with an icon and tooltip. */
export const toolbarActions: ToolbarAction[] = [
  "bold",
  "italic",
  "underline",
  "highlight",
  "ul",
  "ol",
  "clear",
];

export interface ITWysiwygProps {
  /** Controlled HTML value rendered inside the editor. Overrides the visible content only while the editor is not focused (avoids caret jumps). */
  value?: string;
  /** Callback fired with the editor's HTML whenever the content changes. */
  onChange?: (html: string) => void;
  /** Label text rendered above the editor. */
  label?: string;
  /** Placeholder text shown when the editor is empty. */
  placeholder?: string;
  /** Validation error message displayed below the editor. */
  error?: string;
  /** Disables the editor and toolbar when true. @default false */
  disabled?: boolean;
  /** Renders content in read-only mode (not editable, toolbar disabled). @default false */
  readOnly?: boolean;
  /** Name attribute for form submission and label association via `htmlFor`. */
  name?: string;
  /** Editor size: controls padding and font size. Valid values: `"sm"`, `"md"`, `"lg"`. @default "md" */
  size?: SizesTypes;
  /** Minimum height in pixels of the editable area. @default 128 */
  minHeight?: number;
  /** Background color used by the marker tool (yellow highlight). @default "#fde68a" */
  highlightColor?: string;
  /** Subset of toolbar actions to render. @default all actions */
  toolbar?: ToolbarAction[];
  /** Additional CSS classes for the wrapper. */
  className?: string;
}