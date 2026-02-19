import { ColorsTypes } from "@/types/colors.types";
import { SizesTypes } from "@/types/sizes.types";
export interface OptionType {
  [key: string]: string;
}
export interface ITSelectProps {
  name: string;
  options: OptionType[];
  valueField?: string;
  labelField?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  variant?: ColorsTypes;
  size?: SizesTypes;
  disabled?: boolean;
  className?: string;
  touched?: boolean;
  error?: string;
  required?: boolean;
  autoFocus?: boolean;
  readOnly?: boolean;
}
