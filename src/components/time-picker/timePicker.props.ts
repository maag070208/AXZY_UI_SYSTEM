export interface ITTimePickerProps {
  /** Form field name attribute and key for the change event. */
  name: string;
  /** Controlled time value in "HH:MM" format. */
  value?: string;
  /** Label text displayed above the input. */
  label?: string;
  /** Placeholder text when no value is set (default "HH:MM"). */
  placeholder?: string;
  /** Callback fired on valid time selection, receives event-like object with `target.name` and `target.value`. */
  onChange: (e: any) => void;
  /** Callback fired when the input loses focus. */
  onBlur?: (e: any) => void;
  /** Marks the field as required. */
  required?: boolean;
  /** Whether the input has been touched (interacted with). */
  touched?: boolean;
  /** Validation error message or boolean to show error state. */
  error?: string | boolean;
  /** Disables the time picker when true. */
  disabled?: boolean;
  /** Additional CSS classes for the wrapper. */
  className?: string;
  /** Size preset: "small" | "medium" | "large". */
  size?: "small" | "medium" | "large";
  /** Style variant for the input: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "purple". */
  variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "purple";
  /** Theme color used for the dropdown highlight and confirm button. Accepts semantic keys or raw hex. */
  color?: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "purple" | string;
}
