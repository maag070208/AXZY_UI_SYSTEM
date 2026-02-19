import { ColorsTypes } from "@app/types/colors.types";
import { SizesTypes } from "@app/types/sizes.types";
import { ReactNode } from "react";

export interface ITInputProps {
  name: string;
  type?:
    | "text"
    | "password"
    | "number"
    | "email"
    | "checkbox"
    | "radio"
    | "textarea";
  label?: string;
  currencyFormat?: boolean;
  placeholder?: string;
  value?: any;
  onChange: (event: any) => void;
  onBlur: (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement, Element>
  ) => void;
  showHintLength?: boolean;
  maxLength?: number;
  minLength?: number;
  variant?: ColorsTypes;
  size?: SizesTypes;
  disabled?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  className?: string;
  touched?: boolean;
  error?: string;
  required?: boolean;
  formatNumber?:boolean;
  autoFocus?: boolean;
  focusContent?:boolean;
  onClick?: () => void;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  checked?: boolean;
  rows?: number;
  min?: number;
  max?: number;
  readOnly?: boolean;
}
