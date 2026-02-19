import { FieldConfig } from '../../types/field.types';
export interface ITFormBuilderProps {
    fields: FieldConfig[];
    columns?: number;
    values: any;
    handleChange: (event: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | {
        target: {
            name: string;
            value: any;
        };
    }) => void;
    handleBlur: (event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement, Element> | React.FocusEvent<HTMLTextAreaElement, Element> | {
        target: {
            name: string;
            value: any;
        };
    }) => void;
    touched: any;
    errors: any;
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => Promise<void | any>;
}
