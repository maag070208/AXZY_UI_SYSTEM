import { ColorsTypes } from "@/types/colors.types";
import { SizesTypes } from "@/types/sizes.types";

/** Props for the ITChipInput component. */
export interface ITChipInputProps {
  /** Name attribute for form integrations. */
  name?: string;
  /** Label displayed above the control. */
  label?: string;
  /** Placeholder for the text input. @default "Escribe y presiona Enter" */
  placeholder?: string;
  /** Current list of tags (controlled). */
  value: string[];
  /** Fired with the next list of tags. */
  onChange?: (values: string[]) => void;
  /** Fired when the control loses focus. */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Keys that commit the current text as a tag. @default ["Enter", ","] */
  delimiters?: string[];
  /** Maximum number of tags allowed. */
  maxTags?: number;
  /** Allows duplicated tags. @default false */
  allowDuplicates?: boolean;
  /** Returns an error string to reject the tag, or undefined if valid. */
  validate?: (value: string) => string | undefined;
  /** Color applied to the tag chips. @default "primary" */
  color?: ColorsTypes;
  /** Control size. Valid values: `"sm"`, `"md"`, `"lg"`. @default "md" */
  size?: SizesTypes;
  /** Disables the control. @default false */
  disabled?: boolean;
  /** Marks the field as required (red asterisk). @default false */
  required?: boolean;
  /** Whether the field has been touched (form validation). */
  touched?: boolean;
  /** Error message or boolean indicating an error state. */
  error?: string | boolean;
  /** Helper text shown below the control when there is no error. */
  helpText?: string;
  /** Additional CSS classes for the container. */
  className?: string;
}
