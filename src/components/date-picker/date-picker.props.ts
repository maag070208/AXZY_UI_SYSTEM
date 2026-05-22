import { ColorsTypes } from "@/types/colors.types";
import { SizesTypes } from "@/types/sizes.types";

export interface ITDatePickerProps {
  name: string;
  value?: Date | [Date | null, Date | null];
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: Date | [Date | null, Date | null] } }
  ) => void;
  onBlur?: (
    event:
      | React.FocusEvent<HTMLInputElement>
      | { target: { name: string; value: Date | [Date | null, Date | null] } }
  ) => void;
  range?: boolean;
  variant?: ColorsTypes;
  size?: SizesTypes;
  className?: string;
  calendarClassName?: string;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  required?: boolean;
  touched?: boolean;
  error?: string | boolean;
  minDate?: Date;
  maxDate?: Date;
}
