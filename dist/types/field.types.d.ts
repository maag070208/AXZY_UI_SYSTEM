import { default as React } from '../../node_modules/react';
import * as Yup from "yup";
export interface FieldConfig {
    name: string;
    label: string;
    type?: "text" | "select" | "date" | "password" | "number";
    currencyFormat?: boolean;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    validation?: Yup.AnySchema;
    column?: number | number[];
    options?: {
        value: string;
        label: string;
    }[];
    rightIcon?: React.ReactNode;
    leftIcon?: React.ReactNode;
    valueField?: string;
    showHintLength?: boolean;
    labelField?: string;
    maxLength?: number;
    minLength?: number;
    rows?: number;
    formatNumber?: boolean;
    onChangeAction?: (value: any, setFieldValue: any) => void;
}
