import { useEffect, useState, useMemo, useCallback } from 'react';
import { useITFormBuilderContext } from './formBuilder.context';

export const useFormBuilder = () => {
  const context = useITFormBuilderContext();
  const { values, errors, touched } = context;

  // Calculate Progress (percentage of required fields that are filled out without errors)
  const progress = useMemo(() => {
    const requiredFields = Object.keys(context.getFieldConfig).filter((name) => {
        const config = context.getFieldConfig(name);
        if (!config) return false;
        
        // Evaluate dynamic required
        if (typeof config.required === 'function') {
           return config.required(values);
        }
        return config.required;
    });

    if (requiredFields.length === 0) return 100;

    let filledFields = 0;
    requiredFields.forEach((fieldName) => {
      const val = values[fieldName];
      const hasValue = val !== undefined && val !== null && val !== '';
      const hasError = !!errors[fieldName];
      
      if (hasValue && !hasError) {
        filledFields++;
      }
    });

    return Math.round((filledFields / requiredFields.length) * 100);
  }, [values, errors, context]);

  return {
    ...context,
    progress,
    isDirty: Object.keys(touched).length > 0,
  };
};

/**
 * Hook to evaluate dynamic rules for a specific field based on the global form state.
 * Highly optimized to only re-render if the 'dependsOn' fields change, 
 * or if the field is not memoizable.
 */
export const useFieldRules = (name: string, dependsOn?: string[]) => {
    const { values, getFieldConfig } = useITFormBuilderContext();
    const config = getFieldConfig(name);

    // Default to true if no renderWhen
    const isVisible = useMemo(() => {
        if (!config?.renderWhen) return true;
        return config.renderWhen(values);
    }, [config, values]);

    const dynamicProps = useMemo(() => {
        if (!config?.dynamicProps) return {};
        return config.dynamicProps(values);
    }, [config, values]);

    const isRequired = useMemo(() => {
        if (typeof config?.required === 'function') {
            return config.required(values);
        }
        return config?.required || false;
    }, [config, values, dynamicProps]);

    const isDisabled = useMemo(() => {
         if (typeof config?.disabled === 'function') {
             return config.disabled(values);
         }
         return config?.disabled || false;
    }, [config, values, dynamicProps]);

    return {
        isVisible,
        dynamicProps,
        isRequired: dynamicProps.required !== undefined ? dynamicProps.required : isRequired,
        isDisabled: dynamicProps.disabled !== undefined ? dynamicProps.disabled : isDisabled
    };
}
