import { default as React } from 'react';
import { FieldConfigV2, FieldContextV2 } from '../../types/field.types';
interface ITFormBuilderContextType extends FieldContextV2 {
    config: FieldConfigV2[];
    isSubmitting: boolean;
    isValidating: boolean;
    submitCount: number;
    initialValues: Record<string, any>;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    handleBlur: (e: any) => void;
    handleChange: (e: any) => void;
    registerField: (name: string, config: FieldConfigV2) => void;
    unregisterField: (name: string) => void;
    getFieldConfig: (name: string) => FieldConfigV2 | undefined;
}
export declare const ITFormBuilderProvider: ({ children, value, }: {
    children: React.ReactNode;
    value: Omit<ITFormBuilderContextType, "registerField" | "unregisterField" | "getFieldConfig">;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useITFormBuilderContext: () => ITFormBuilderContextType;
export {};
