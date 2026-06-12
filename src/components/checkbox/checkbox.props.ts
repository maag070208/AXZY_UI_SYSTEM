import { ReactNode } from "react";

export interface ITCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
  name?: string;
}
