import { useMemo } from 'react';
import { useITFormBuilderContext } from './formBuilder.context';
import type { FieldConfigV2 } from '@/types/field.types';

/**
 * Public hook for accessing the live form state from inside (or alongside) an
 * {@link ITFormBuilder}. Must be used by a descendant of `ITFormBuilderProvider`
 * (which is mounted automatically when `ITFormBuilder` receives the V2 `config`
 * prop).
 *
 * Returns the full form context plus two derived values:
 * - `progress`: 0..100 percentage of required fields that are filled and have
 *   no error. Returns `100` when no required fields are registered or when the
 *   registry is empty.
 * - `isDirty`: `true` when at least one field has been touched.
 *
 * @example Reading progress and triggering a submit
 * ```tsx
 * const SubmitButton = () => {
 *   const { progress, isSubmitting } = useFormBuilder();
 *   return (
 *     <button disabled={progress < 100 || isSubmitting}>
 *       {isSubmitting ? "Saving..." : `Submit (${progress}%)`}
 *     </button>
 *   );
 * };
 * ```
 */
export const useFormBuilder = () => {
  const context = useITFormBuilderContext();
  const { values, errors, touched, getAllFieldConfigs } = context;

  const progress = useMemo(() => {
    const allConfigs = getAllFieldConfigs();

    const requiredFields = allConfigs.filter((cfg) => {
      if (typeof cfg.required === 'function') {
        return cfg.required(values);
      }
      return !!cfg.required;
    });

    if (requiredFields.length === 0) return 100;

    let filledFields = 0;
    for (const cfg of requiredFields) {
      const val = values[cfg.name];
      const hasValue = val !== undefined && val !== null && val !== '';
      const hasError = !!errors[cfg.name];
      if (hasValue && !hasError) filledFields++;
    }

    return Math.round((filledFields / requiredFields.length) * 100);
  }, [values, errors, getAllFieldConfigs]);

  const isDirty = useMemo(
    () => Object.values(touched).some(Boolean),
    [touched]
  );

  return {
    ...context,
    progress,
    isDirty,
  };
};

/**
 * Hook that evaluates the dynamic rules of a single field given the values of
 * its declared `dependsOn` siblings. Designed to be cheap: it does NOT subscribe
 * to the entire `values` map, only to the subset passed as `dependentValues`,
 * which enables `React.memo` isolation across siblings.
 *
 * `dependentValues` should be the filtered slice of `values` containing only
 * the keys listed in {@link FieldConfigV2.dependsOn}. The {@link ITFormBuilder}
 * computes this slice per-field automatically.
 *
 * Returned shape:
 * - `isVisible`: whether the field should render at all (controls `renderWhen`).
 * - `dynamicProps`: partial override produced by `dynamicProps(dependentValues)`.
 * - `isRequired`: resolved `required` (dynamic > function > boolean).
 * - `isDisabled`: resolved `disabled` (dynamic > function > boolean).
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
  }, [fieldConfig, dependentValues]);

  const dynamicProps = useMemo(() => {
    if (!fieldConfig.dynamicProps) return {};
    return fieldConfig.dynamicProps(dependentValues);
  }, [fieldConfig, dependentValues]);

  const isRequired = useMemo(() => {
    if (typeof dynamicProps.required !== 'undefined') return dynamicProps.required;
    if (typeof fieldConfig.required === 'function') {
      return fieldConfig.required(dependentValues);
    }
    return !!fieldConfig.required;
  }, [fieldConfig, dynamicProps.required, dependentValues]);

  const isDisabled = useMemo(() => {
    if (typeof dynamicProps.disabled !== 'undefined') return dynamicProps.disabled;
    if (typeof fieldConfig.disabled === 'function') {
      return fieldConfig.disabled(dependentValues);
    }
    return !!fieldConfig.disabled;
  }, [fieldConfig, dynamicProps.disabled, dependentValues]);

  return { isVisible, dynamicProps, isRequired, isDisabled };
};