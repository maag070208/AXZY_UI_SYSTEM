import { ReactNode } from "react";

export interface ITRadioOption {
  value: string;
  label: ReactNode;
}

export interface ITRadioGroupProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: ITRadioOption[];
  disabled?: boolean;
  direction?: "row" | "column";
  className?: string;
}
