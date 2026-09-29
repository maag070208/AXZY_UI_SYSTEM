import { ChangeEvent, FocusEvent, KeyboardEvent, ReactNode } from "react";
import { SizesTypes } from "@/types/sizes.types";

/**
 * Props for the ITInputNumber component.
 *
 * Same surface as `ITInput` for numeric entry, but the value is always
 * formatted as currency (thousand separators + decimals) and emitted as a
 * real `number` instead of a string.
 */
export interface ITInputNumberProps {
  /** Field name used for form identification. */
  name: string;
  /** Current numeric value. Pass `null`/`undefined` for "empty". */
  value?: number | null;
  /**
   * Called with the parsed value on every change.
   * Receives `undefined` when the field is empty, plus the original input event.
   */
  onChange: (value: number | undefined, event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Called on blur with the parsed (and min/max clamped) value, plus the
   * original focus event.
   */
  onBlur?: (value: number | undefined, event: FocusEvent<HTMLInputElement>) => void;
  /** Number of decimal places allowed. `0` restricts to integers. @default 2 */
  decimals?: number;
  /** Text prefix rendered inside the field, e.g. `"$"`. Ignored when `iconLeft` is set. */
  prefix?: string;
  /** Label displayed above the input. */
  label?: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Minimum numeric value. Values below are clamped on blur. */
  min?: number;
  /** Maximum numeric value. Values above are clamped on blur. */
  max?: number;
  /** Size preset: "sm" | "md" | "lg". @default "md" */
  size?: SizesTypes;
  /** Disable the input. @default false */
  disabled?: boolean;
  /** Render the input in read-only mode. @default false */
  readOnly?: boolean;
  /** Mark the field as required. @default false */
  required?: boolean;
  /** Whether the field has been touched by the user. */
  touched?: boolean;
  /** Validation error. Pass `true` for a generic message, or a string for a custom one. */
  error?: string | boolean;
  /** Icon element rendered on the left side of the input. Takes precedence over `prefix`. */
  iconLeft?: ReactNode;
  /** Icon element rendered on the right side of the input. */
  iconRight?: ReactNode;
  /** Additional CSS classes for the outer container. */
  containerClassName?: string;
  /** Additional CSS classes for the label. */
  labelClassName?: string;
  /** Additional CSS classes for the input element. */
  className?: string;
  /** Auto-focus the input on mount. @default false */
  autoFocus?: boolean;
  /** Select all content on click. @default false */
  focusContent?: boolean;
  /** Keydown handler for the underlying input. */
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}
