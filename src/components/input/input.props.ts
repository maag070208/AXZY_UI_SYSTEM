import { ColorsTypes } from "@app/types/colors.types";
import { SizesTypes } from "@app/types/sizes.types";
import { ReactNode } from "react";

export interface ITInputProps {
  /** Field name used for form identification */
  name: string;
  /** Input type: "text" | "password" | "number" | "email" | "checkbox" | "radio" | "textarea" */
  type?:
    | "text"
    | "password"
    | "number"
    | "email"
    | "checkbox"
    | "radio"
    | "textarea";
  /** Label displayed above the input */
  label?: string;
  /** Enable currency formatting for number inputs (MX locale) */
  currencyFormat?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Current input value */
  value?: any;
  /** Change event handler */
  onChange: (event: any) => void;
  /** Blur event handler */
  onBlur?: (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement, Element>
  ) => void;
  /** Keydown event handler */
  onKeyDown?: (event: React.KeyboardEvent) => void;
  /** Show character count hint below the input */
  showHintLength?: boolean;
  /** Maximum allowed character length */
  maxLength?: number;
  /** Minimum allowed character length */
  minLength?: number;
  /** Color variant from the theme palette */
  variant?: ColorsTypes;
  /** Size preset: "xs" | "sm" | "md" | "lg" | "xl" */
  size?: SizesTypes;
  /** Disable the input */
  disabled?: boolean;
  /** Additional CSS classes for the outer container */
  containerClassName?: string;
  /** Additional CSS classes for the label */
  labelClassName?: string;
  /** Additional CSS classes for the input element */
  className?: string;
  /** Whether the field has been touched by the user */
  touched?: boolean;
  /** Validation error message. Pass `true` for a generic error, or a string for a custom message */
  error?: string | boolean;
  /** Mark the field as required */
  required?: boolean;
  /** Enable number formatting on blur */
  formatNumber?: boolean;
  /** Auto-focus the input on mount */
  autoFocus?: boolean;
  /** Select all content on click */
  focusContent?: boolean;
  /** Click handler for the input */
  onClick?: () => void;
  /** Icon element rendered on the left side of the input */
  iconLeft?: ReactNode;
  /** Icon element rendered on the right side of the input */
  iconRight?: ReactNode;
  /** Checked state for checkbox and radio types */
  checked?: boolean;
  /** Number of visible rows for textarea type */
  rows?: number;
  /** Minimum numeric value for number inputs */
  min?: number;
  /** Maximum numeric value for number inputs */
  max?: number;
  /** Render the input in read-only mode */
  readOnly?: boolean;
}
