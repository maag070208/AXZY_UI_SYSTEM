import { ColorsTypes } from "@/types/colors.types";
import { SizesTypes } from "@/types/sizes.types";
import { ReactNode } from "react";

export interface ITMaskedInputProps {
  /** Unique name attribute for the underlying input element. */
  name: string;
  /**
   * Mask pattern. Tokens are filled by the user and everything else is an
   * auto-inserted literal.
   * - `9` — digit
   * - `A` — letter (stored uppercase)
   * - `a` — letter
   * - `x` — alphanumeric
   * - `*` — any character
   * - any other character ( `-`, `/`, `(`, `)`, ` `, `.` ) is a literal separator
   * @example "xxxx-xxxx-xxxx"
   * @example "(999) 999-9999"
   * @example "9999-9999-9999-9999"
   */
  mask: string;
  /** Clean value containing only the useful characters (no separators, no placeholders). */
  value?: string;
  /** Called when the masked value changes. `event.target.value` is the raw value without separators. */
  onChange: (event: { target: { name: string; value: string } }) => void;
  /** Called when the input loses focus. */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Fired when all token slots are filled with valid characters. */
  onComplete?: (value: string) => void;
  /** Optional regex full-matched against the raw value to validate the field (e.g. `/^\\d{16}$/`). */
  pattern?: RegExp;
  /** Character shown for empty token slots. @default "_" */
  placeholderChar?: string;
  /** Color variant matching the design system (ColorsTypes). @default "primary" */
  variant?: ColorsTypes;
  /** Size preset: "sm" | "md" | "lg". @default "md" */
  size?: SizesTypes;
  /** Label displayed above the input. */
  label?: string;
  /** Disables the input. @default false */
  disabled?: boolean;
  /** Marks the field as required. */
  required?: boolean;
  /** Visually indicates the field has been interacted with. */
  touched?: boolean;
  /** Error state — pass a string message or `true` for default styling. */
  error?: string | boolean;
  /** Additional CSS classes for the outer wrapper element. */
  className?: string;
  /** Additional CSS classes for the underlying input container. */
  containerClassName?: string;
  /** Icon element rendered on the left side of the input. */
  iconLeft?: ReactNode;
  /** Icon element rendered on the right side of the input. */
  iconRight?: ReactNode;
  /** Auto-focus the input on mount. @default false */
  autoFocus?: boolean;
}