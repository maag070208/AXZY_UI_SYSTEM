import { default as React } from 'react';
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
export type FieldTypeV2 = "text" | "number" | "password" | "email" | "select" | "date" | "time" | "checkbox" | "radio" | "array" | "section" | "custom";
export interface FieldContextV2 {
    values: Record<string, any>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    setFieldError: (field: string, error: string) => void;
    setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean) => void;
}
export interface FieldConfigV2 {
    name: string;
    label?: string;
    type: FieldTypeV2;
    column?: number | {
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
    };
    fields?: FieldConfigV2[];
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    dependsOn?: string[];
    renderWhen?: (values: Record<string, any>) => boolean;
    dynamicProps?: (values: Record<string, any>) => Partial<FieldConfigV2>;
    validation?: Yup.AnySchema;
    asyncValidation?: (value: any, values: Record<string, any>) => Promise<string | null | undefined>;
    defaultValue?: any;
    placeholder?: string;
    disabled?: boolean | ((values: Record<string, any>) => boolean);
    readOnly?: boolean;
    required?: boolean | ((values: Record<string, any>) => boolean);
    options?: {
        value: string | number;
        label: string;
    }[] | (() => Promise<{
        value: string | number;
        label: string;
    }[]>);
    valueField?: string;
    labelField?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    component?: React.ComponentType<any>;
    className?: string;
    currencyFormat?: boolean;
    showHintLength?: boolean;
    maxLength?: number;
    minLength?: number;
    rows?: number;
    formatNumber?: boolean;
    onChangeAction?: (val: any, context: FieldContextV2) => void | Promise<void>;
}
