export interface ITTimePickerProps {
  name: string;
  value?: string;
  label?: string;
  placeholder?: string;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  required?: boolean;
  touched?: boolean;
  error?: string | boolean;
  disabled?: boolean;
  className?: string;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "purple";
  color?: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "purple" | string;
}
