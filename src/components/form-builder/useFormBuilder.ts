import { useMemo } from 'react';
import { useITFormBuilderContext } from './formBuilder.context';
import type { FieldConfigV2 } from '@/types/field.types';

export const useFormBuilder = () => {
  const context = useITFormBuilderContext();
  const { values, errors, touched } = context;

  const progress = useMemo(() => {
    const requiredFields = Object.keys(context.getFieldConfig).filter((name) => {
        const config = context.getFieldConfig(name);
        if (!config) return false;
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
      if (hasValue && !hasError) filledFields++;
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
 * Hook to evaluate dynamic rules using only the dependent values passed as props.
 * This avoids subscribing to the entire `values` context, enabling true React.memo isolation.
 *
 * `dependentValues` should be a filtered object containing only the fields this
 * field depends on (derived from `dependsOn` in FieldConfigV2).
 */
export const useFieldRules = (
  config: FieldConfigV2,
  dependentValues: Record<string, any>,
) => {
  const { getFieldConfig } = useITFormBuilderContext();
  const fieldConfig = getFieldConfig(config.name) || config;

  const isVisible = useMemo(() => {
    if (!fieldConfig.renderWhen) return true;
    return fieldConfig.renderWhen(dependentValues);
  }, [fieldConfig.renderWhen, dependentValues]);

  const dynamicProps = useMemo(() => {
    if (!fieldConfig.dynamicProps) return {};
    return fieldConfig.dynamicProps(dependentValues);
  }, [fieldConfig.dynamicProps, dependentValues]);

  const isRequired = useMemo(() => {
    if (typeof dynamicProps.required !== 'undefined') return dynamicProps.required;
    if (typeof fieldConfig.required === 'function') {
      return fieldConfig.required(dependentValues);
    }
    return fieldConfig.required || false;
  }, [fieldConfig.required, dynamicProps.required, dependentValues]);

  const isDisabled = useMemo(() => {
    if (typeof dynamicProps.disabled !== 'undefined') return dynamicProps.disabled;
    if (typeof fieldConfig.disabled === 'function') {
      return fieldConfig.disabled(dependentValues);
    }
    return fieldConfig.disabled || false;
  }, [fieldConfig.disabled, dynamicProps.disabled, dependentValues]);

  return { isVisible, dynamicProps, isRequired, isDisabled };
};
