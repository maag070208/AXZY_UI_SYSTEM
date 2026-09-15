import { ColorsTypes } from "@/types/colors.types";
import { SizesTypes } from "@/types/sizes.types";

export interface ITDatePickerProps {
  /** Unique name attribute for the underlying input element. */
  name: string;
  /** Selected date. Accepts a single Date or a tuple `[startDate, endDate]` when `range` is true. */
  value?: Date | [Date | null, Date | null];
  /** Called when the selected date changes. The event object carries `name` and `value` in its target. */
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: Date | [Date | null, Date | null] } }
  ) => void;
  /** Called when the input loses focus. */
  onBlur?: (
    event:
      | React.FocusEvent<HTMLInputElement>
      | { target: { name: string; value: Date | [Date | null, Date | null] } }
  ) => void;
  /** Enables date-range selection mode. When true, `value` is treated as a start-end tuple. @default false */
  range?: boolean;
  /** Color variant matching the design system (ColorsTypes). @default "primary" */
  variant?: ColorsTypes;
  /** Size variant matching the design system (SizesTypes). @default "medium" */
  size?: SizesTypes;
  /** Additional CSS classes for the wrapper element. */
  className?: string;
  /** Additional CSS classes for the calendar popover. */
  calendarClassName?: string;
  /** Disables the date picker. @default false */
  disabled?: boolean;
  /** Placeholder text shown when no date is selected. */
  placeholder?: string;
  /** Accessible label rendered above the input. */
  label?: string;
  /** Marks the field as required. */
  required?: boolean;
  /** Visually indicates the field has been interacted with. */
  touched?: boolean;
  /** Error state — pass a string message or `true` for default styling. */
  error?: string | boolean;
  /** Earliest selectable date. */
  minDate?: Date;
  /** Latest selectable date. */
  maxDate?: Date;
}
