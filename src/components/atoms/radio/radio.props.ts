import { ReactNode } from "react";

/** Represents a single radio option within a group. */
export interface ITRadioOption {
  /** Value of the radio option. */
  value: string;
  /** Display label for the radio option. */
  label: ReactNode;
}

/** Props for the ITRadioGroup component. */
export interface ITRadioGroupProps {
  /** Name attribute for the radio input group. Used for form accessibility. */
  name: string;
  /** Currently selected value. */
  value: string;
  /** Callback fired when a radio option is selected. Receives the selected value. */
  onChange: (value: string) => void;
  /** Array of radio options to render. */
  options: ITRadioOption[];
  /** Whether the entire radio group is disabled. */
  disabled?: boolean;
  /** Layout direction of the radio options. Options: "row", "column". Default: "column". */
  direction?: "row" | "column";
  /** Additional CSS classes for the container. */
  className?: string;
}
