import { FieldConfig, FieldConfigV2 } from "@/types/field.types";

export interface ITFormBuilderProps {
  // Legacy
  fields?: FieldConfig[];
  
  // V2 Architecture
  config?: FieldConfigV2[];
  
  columns?: number;
  values: any;
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | { target: { name: string; value: any } }
  ) => void;
  handleBlur: (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLSelectElement, Element>
      | React.FocusEvent<HTMLTextAreaElement, Element>
      | { target: { name: string; value: any } }
  ) => void;
  touched: any;
  errors: any;
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | any>;
  setFieldTouched?: (
    field: string,
    touched?: boolean,
    shouldValidate?: boolean
  ) => Promise<void | any>;
  setFieldError?: (
    field: string,
    message: string | undefined
  ) => void;
  isSubmitting?: boolean;
}
