import { FieldConfig, FieldConfigV2 } from "@/types/field.types";

export interface ITFormBuilderProps {
  /** Legacy field definitions (V1). Use `config` for the V2 architecture instead */
  fields?: FieldConfig[];
  
  /** V2 field configuration array. Preferred over the legacy `fields` prop */
  config?: FieldConfigV2[];
  
  /** Number of grid columns (1-12) */
  columns?: number;
  /** Current form values keyed by field name */
  values: any;
  /** Change handler for input, select, and textarea elements */
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | { target: { name: string; value: any } }
  ) => void;
  /** Blur handler for input, select, and textarea elements */
  handleBlur: (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLSelectElement, Element>
      | React.FocusEvent<HTMLTextAreaElement, Element>
      | { target: { name: string; value: any } }
  ) => void;
  /** Touch state keyed by field name */
  touched: any;
  /** Validation errors keyed by field name */
  errors: any;
  /** Programmatically set a field value */
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | any>;
  /** Programmatically mark a field as touched */
  setFieldTouched?: (
    field: string,
    touched?: boolean,
    shouldValidate?: boolean
  ) => Promise<void | any>;
  /** Programmatically set a field-level error message */
  setFieldError?: (
    field: string,
    message: string | undefined
  ) => void;
  /** Whether the form is currently submitting */
  isSubmitting?: boolean;
}
