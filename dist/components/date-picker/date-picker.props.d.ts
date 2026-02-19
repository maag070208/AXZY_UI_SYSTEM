import { ColorsTypes } from '../../types/colors.types';
import { SizesTypes } from '../../types/sizes.types';
export interface ITDatePickerProps {
    name: string;
    value?: Date;
    onChange: (event: React.ChangeEvent<HTMLInputElement> | {
        target: {
            name: string;
            value: Date;
        };
    }) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement> | {
        target: {
            name: string;
            value: Date;
        };
    }) => void;
    variant?: ColorsTypes;
    size?: SizesTypes;
    className?: string;
    calendarClassName?: string;
    disabled?: boolean;
    placeholder?: string;
    label?: string;
    required?: boolean;
    touched?: boolean;
    error?: string;
    minDate?: Date;
    maxDate?: Date;
}
