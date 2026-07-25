import { FocusEvent } from "react";

/** Represents an option in the search-select dropdown. */
export interface ITSearchSelectOption {
  /** Display label for the option. */
  label: string;
  /** Value associated with the option. */
  value: string | number;
  /** Additional custom fields can be attached. */
  [key: string]: any;
}

/** Props for the ITSearchSelect component. */
export interface ITSearchSelectProps {
  /** Name attribute for form integrations. */
  name?: string;
  /** Label displayed above the select input. */
  label?: string;
  /** Placeholder text shown when no value is selected. */
  placeholder?: string;
  /** Currently selected value. */
  value?: string | number;
  /** Array of options for static mode (Mode 1: local client-side filtering). */
  options?: ITSearchSelectOption[];
  /** Field used as the option value. Default: "value". */
  valueField?: string;
  /** Field used as the option display label. Default: "label". */
  labelField?: string;
  /** Callback fired when the selected value changes. Receives the value and the full option object. */
  onChange?: (value: string | number, option?: ITSearchSelectOption) => void;
  /** Callback fired when the input loses focus. */
  onBlur?: (e: FocusEvent<any>) => void;
  /** Whether the component is disabled. */
  disabled?: boolean;
  /** Additional CSS classes for the container. */
  className?: string;
  /** Whether the field has been touched (for form validation). */
  touched?: boolean;
  /** Whether the field is required. Shows a red asterisk on the label. */
  required?: boolean;
  /** Error message or boolean indicating an error state. */
  error?: string | boolean;
  /** Whether the field is read-only. */
  readOnly?: boolean;
  /** Callback for server-side search (Mode 2: API connection). Receives the search query string. */
  onSearch?: (query: string) => void;
  /** Whether options are being loaded from an external API. */
  isLoading?: boolean;
  /** Message displayed when no results are found. Default: "No se encontraron resultados". */
  noResultsMessage?: string;
}
