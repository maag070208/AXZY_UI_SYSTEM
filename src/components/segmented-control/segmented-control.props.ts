import { ReactNode } from "react";

export type SegmentedControlSize = "sm" | "md";

export interface ISegmentedOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

export interface ITSegmentedControlProps {
  options: ISegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  size?: SegmentedControlSize;
  className?: string;
  disabled?: boolean;
}
