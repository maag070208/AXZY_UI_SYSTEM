export declare const useFormBuilder: () => {
    progress: number;
    isDirty: boolean;
    config: import('../..').FieldConfigV2[];
    isSubmitting: boolean;
    isValidating: boolean;
    submitCount: number;
    initialValues: Record<string, any>;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    handleBlur: (e: any) => void;
    handleChange: (e: any) => void;
    registerField: (name: string, config: import('../..').FieldConfigV2) => void;
    unregisterField: (name: string) => void;
    getFieldConfig: (name: string) => import('../..').FieldConfigV2 | undefined;
    values: Record<string, any>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    setFieldError: (field: string, error: string) => void;
    setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean) => void;
};
/**
 * Hook to evaluate dynamic rules for a specific field based on the global form state.
 * Highly optimized to only re-render if the 'dependsOn' fields change,
 * or if the field is not memoizable.
 */
export declare const useFieldRules: (name: string, dependsOn?: string[]) => {
    isVisible: boolean;
    dynamicProps: Partial<import('../..').FieldConfigV2>;
    isRequired: boolean | ((values: Record<string, any>) => boolean);
    isDisabled: boolean | ((values: Record<string, any>) => boolean);
};
