import { ReactNode } from "react";
import { SizesTypes } from "@/types/sizes.types";

/** Represents an option in the multi-select dropdown. */
export interface ITMultiSelectOption {
  /** Display label for the option. */
  label: string;
  /** Value associated with the option. */
  value: string | number;
  /** Additional custom fields can be attached. */
  [key: string]: any;
}

/** Props for the ITMultiSelect component. */
export interface ITMultiSelectProps {
  /** Name attribute for form integrations. */
  name?: string;
  /** Label displayed above the control. */
  label?: string;
  /** Placeholder shown when no value is selected. @default "Selecciona opciones" */
  placeholder?: string;
  /** Available options. */
  options: ITMultiSelectOption[];
  /** Selected values (controlled). */
  value: (string | number)[];
  /** Fired with the next selected values and their option objects. */
  onChange?: (values: (string | number)[], options: ITMultiSelectOption[]) => void;
  /** Fired when the control loses focus. */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Field used as the option value. @default "value" */
  valueField?: string;
  /** Field used as the option display label. @default "label" */
  labelField?: string;
  /** Disables the control. @default false */
  disabled?: boolean;
  /** Read-only mode: chips shown, no editing. @default false */
  readOnly?: boolean;
  /** Marks the field as required (red asterisk). @default false */
  required?: boolean;
  /** Whether the field has been touched (form validation). */
  touched?: boolean;
  /** Error message or boolean indicating an error state. */
  error?: string | boolean;
  /** Control size. Valid values: `"sm"`, `"md"`, `"lg"`. @default "md" */
  size?: SizesTypes;
  /** Maximum number of chips shown before collapsing into "+N". @default 3 */
  maxVisibleChips?: number;
  /** Shows a clear-all (X) button. @default true */
  clearable?: boolean;
  /** Enables the search input inside the control. @default true */
  searchable?: boolean;
  /** Callback for server-side search. Receives the query string. */
  onSearch?: (query: string) => void;
  /** Whether options are loading from an external source. @default false */
  isLoading?: boolean;
  /** Message shown when no options match. @default "No se encontraron resultados" */
  noResultsMessage?: string;
  /** Custom template for each dropdown option. */
  renderOption?: (
    option: ITMultiSelectOption,
    state: { isSelected: boolean; searchTerm: string }
  ) => ReactNode;
  /** Additional CSS classes for the container. */
  className?: string;
}
