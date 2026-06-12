import { InputHTMLAttributes } from "react";

export interface ITTextareaProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  error?: string;
  className?: string;
  name?: string;
  maxLength?: number;
  resize?: "none" | "vertical" | "horizontal" | "both";
}
