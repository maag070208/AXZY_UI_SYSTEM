import { ReactNode } from "react";

export interface ITCheckboxProps {
  /** Controlled checked state. @default false */
  checked?: boolean;
  /** Callback fired when the checkbox value changes. Receives the new checked state. */
  onChange?: (checked: boolean) => void;
  /** Label text or element rendered next to the checkbox. */
  label?: ReactNode;
  /** Disables the checkbox interaction and applies reduced opacity. @default false */
  disabled?: boolean;
  /** Renders the checkbox in an indeterminate (dash) state. Has no effect when `checked` is `true`. @default false */
  indeterminate?: boolean;
  /** Additional CSS class names for the label wrapper. */
  className?: string;
  /** HTML name attribute for the native `<input>` element. */
  name?: string;
}
