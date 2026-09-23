import React, { createContext, useContext, useState } from 'react';
import { FieldConfigV2, FieldContextV2 } from '@/types/field.types';

/**
 * Internal context shared between {@link ITFormBuilder} and any descendant
 * (e.g. a custom submit button, a sidebar showing form progress). The shape
 * extends the public {@link FieldContextV2} with bookkeeping for the V2
 * architecture: a per-field config registry plus lifecycle flags mirroring
 * Formik.
 */
export interface ITFormBuilderContextType extends FieldContextV2 {
  /** The full V2 config array passed to `<ITFormBuilder config={...} />`. */
  config: FieldConfigV2[];
  /** True while a Formik `submitForm` is in flight. */
  isSubmitting: boolean;
  /** True while async validation is running for any field. */
  isValidating: boolean;
  /** Number of times the parent form has been submitted. */
  submitCount: number;
  /** Values present at `initialValues` time (reserved for future resets). */
  initialValues: Record<string, any>;
  /** Validation errors keyed by field `name`. */
  errors: Record<string, string>;
  /** Touch state keyed by field `name`. */
  touched: Record<string, boolean>;
  /** Generic change handler (Formik-style `(e) => void`). */
  handleChange: (e: any) => void;
  /** Generic blur handler (Formik-style `(e) => void`). */
  handleBlur: (e: any) => void;
  /**
   * Registers a field's config in the live registry. Called automatically by
   * every `ITFieldRenderer` on mount; use `getFieldConfig` to read it back.
   */
  registerField: (name: string, config: FieldConfigV2) => void;
  /** Removes a field from the registry. Called on unmount. */
  unregisterField: (name: string) => void;
  /** Returns the registered config for a given field name, or `undefined`. */
  getFieldConfig: (name: string) => FieldConfigV2 | undefined;
  /** Returns the full list of registered field configs (snapshot). */
  getAllFieldConfigs: () => FieldConfigV2[];
}

const ITFormBuilderContext = createContext<ITFormBuilderContextType | undefined>(undefined);

export interface ITFormBuilderProviderProps {
  /** The children rendered inside the provider (typically the grid of fields). */
  children: React.ReactNode;
  /**
   * Pre-built value object containing everything except the per-field registry
   * helpers (`registerField` / `unregisterField` / `getFieldConfig` /
   * `getAllFieldConfigs`), which the provider injects itself.
   */
  value: Omit<
    ITFormBuilderContextType,
    'registerField' | 'unregisterField' | 'getFieldConfig' | 'getAllFieldConfigs'
  >;
}

/**
 * Wraps the V2 grid of fields with the shared context. You normally don't need
 * to mount this manually — {@link ITFormBuilder} does it for you when the V2
 * `config` prop is supplied. Mounting it yourself is useful for advanced
 * compositions (e.g. embedding an `<ITFormBuilder />` inside another component
 * that needs to read `useFormBuilder`).
 *
 * @example
 * ```tsx
 * <ITFormBuilderProvider value={{ values, errors, touched, ... }}>
 *   <MyGrid />
 * </ITFormBuilderProvider>
 * ```
 */
export const ITFormBuilderProvider = ({
  children,
  value,
}: ITFormBuilderProviderProps) => {
  const [fieldRegistry, setFieldRegistry] = useState<Record<string, FieldConfigV2>>({});

  const registerField = React.useCallback((name: string, config: FieldConfigV2) => {
    setFieldRegistry((prev) => ({ ...prev, [name]: config }));
  }, []);

  const unregisterField = React.useCallback((name: string) => {
    setFieldRegistry((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const getFieldConfig = React.useCallback(
    (name: string) => fieldRegistry[name],
    [fieldRegistry]
  );

  const getAllFieldConfigs = React.useCallback(
    () => Object.values(fieldRegistry),
    [fieldRegistry]
  );

  const contextValue = React.useMemo(
    () => ({
      ...value,
      registerField,
      unregisterField,
      getFieldConfig,
      getAllFieldConfigs,
    }),
    [value, registerField, unregisterField, getFieldConfig, getAllFieldConfigs]
  );

  return (
    <ITFormBuilderContext.Provider value={contextValue}>
      {children}
    </ITFormBuilderContext.Provider>
  );
};

/**
 * Reads the live form context. Throws when called outside an
 * `ITFormBuilderProvider` so misuse fails loudly in development.
 *
 * Prefer the higher-level {@link useFormBuilder} hook for typical use cases
 * (progress, dirty state); this hook returns the un-augmented context shape.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useITFormBuilderContext = () => {
  const context = useContext(ITFormBuilderContext);
  if (!context) {
    throw new Error('useITFormBuilderContext must be used within an ITFormBuilderProvider');
  }
  return context;
};