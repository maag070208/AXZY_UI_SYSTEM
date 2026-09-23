import { ReactNode } from "react";

/** Props for the ITField form-field wrapper. */
export interface ITFieldProps {
  /** Label rendered above the control. */
  label?: string;
  /** `id` of the control the label points to (`htmlFor`). */
  htmlFor?: string;
  /** Shows a red asterisk next to the label. @default false */
  required?: boolean;
  /** Validation error. Pass `true` for the generic message or a string for a custom one. */
  error?: string | boolean;
  /** Helper text shown below the control when there is no error. */
  helpText?: string;
  /** The form control (ITInput, ITSelect, ITTextarea, …). */
  children: ReactNode;
  /** Additional CSS classes for the wrapper. */
  className?: string;
  /** Additional CSS classes for the label. */
  labelClassName?: string;
  /** Additional CSS classes for the control container. */
  contentClassName?: string;
}
