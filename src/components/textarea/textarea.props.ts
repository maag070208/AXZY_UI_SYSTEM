import { InputHTMLAttributes } from "react";

export interface ITTextareaProps {
  /** Controlled value of the textarea. */
  value?: string;
  /** Callback fired when the value changes, receiving the new string. */
  onChange?: (value: string) => void;
  /** Label text rendered above the textarea. */
  label?: string;
  /** Placeholder text shown when the textarea is empty. */
  placeholder?: string;
  /** Number of visible text rows (default 4). */
  rows?: number;
  /** Disables the textarea when true. */
  disabled?: boolean;
  /** Validation error message displayed below the textarea. */
  error?: string;
  /** Additional CSS classes for the wrapper. */
  className?: string;
  /** Name attribute for form submission and label association via `htmlFor`. */
  name?: string;
  /** Maximum number of characters allowed. */
  maxLength?: number;
  /** Resize behavior of the textarea: "none" | "vertical" | "horizontal" | "both". */
  resize?: "none" | "vertical" | "horizontal" | "both";
}
