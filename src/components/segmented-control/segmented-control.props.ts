import { ReactNode } from "react";

/** Available sizes for the segmented control: "sm" | "md". */
export type SegmentedControlSize = "sm" | "md";

/** A single option within the segmented control. */
export interface ISegmentedOption {
  /** Unique value for the option. */
  value: string;
  /** Display label for the option. */
  label: string;
  /** Optional icon rendered alongside the label. */
  icon?: ReactNode;
}

/** Props for the ITSegmentedControl component. */
export interface ITSegmentedControlProps {
  /** Array of mutually exclusive options: { label, value, icon? }. */
  options: ISegmentedOption[];
  /** Currently selected value (controlled). */
  value: string;
  /** Callback fired when the user selects a different option. Receives the new value. */
  onChange: (value: string) => void;
  /** Control size: "sm" | "md". Default: "md". */
  size?: SegmentedControlSize;
  /** Additional CSS classes on the container. */
  className?: string;
  /** Whether the entire control is disabled. */
  disabled?: boolean;
}
