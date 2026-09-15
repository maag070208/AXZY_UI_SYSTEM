import { ColorsTypes } from "@/types/colors.types";
import { SizesTypes } from "@/types/sizes.types";

/** A generic key-value option: e.g. { value: "mx", label: "Mexico" }. */
export interface OptionType {
  [key: string]: string;
}

/** Props for the ITSelect native-like dropdown component. */
export interface ITSelectProps {
  /** Name attribute for the underlying `<select>` element. */
  name: string;
  /** Array of option objects with value/label key-value pairs. */
  options: OptionType[];
  /** Key in each option object used as the option value. Default: "value". */
  valueField?: string;
  /** Key in each option object used as the display label. Default: "label". */
  labelField?: string;
  /** Label text rendered above the select. */
  label?: string;
  /** Placeholder text for the default empty option. */
  placeholder?: string;
  /** Currently selected value (controlled). */
  value?: string;
  /** Callback fired on selection change. Receives the native change event. */
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Callback fired on blur. Receives the native focus event. */
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  /** Theme color variant (e.g. "primary", "success", "danger"). */
  variant?: ColorsTypes;
  /** Control size: "sm" | "md" | "lg". */
  size?: SizesTypes;
  /** Whether the select is disabled. */
  disabled?: boolean;
  /** Additional CSS classes on the `<select>` element. */
  className?: string;
  /** Marks the field as touched (for validation display). */
  touched?: boolean;
  /** Error message string or true for a default required error. */
  error?: string | boolean;
  /** Whether the field is required. Shows a red asterisk and default error. */
  required?: boolean;
  /** Autofocus the select on mount. */
  autoFocus?: boolean;
  /** Read-only mode: shows the current value as a single disabled option. */
  readOnly?: boolean;
}
