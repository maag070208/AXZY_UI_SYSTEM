import React, { createContext, useContext, useEffect, useState } from 'react';
import { FieldConfigV2, FieldContextV2 } from '@/types/field.types';
import * as Yup from 'yup';

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

const ITFormBuilderContext = createContext<ITFormBuilderContextType | undefined>(undefined);

export const ITFormBuilderProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: Omit<ITFormBuilderContextType, 'registerField' | 'unregisterField' | 'getFieldConfig'>;
}) => {
  const [fieldRegistry, setFieldRegistry] = useState<Record<string, FieldConfigV2>>({});

  const registerField = React.useCallback((name: string, config: FieldConfigV2) => {
    setFieldRegistry((prev) => ({ ...prev, [name]: config }));
  }, []);

  const unregisterField = React.useCallback((name: string) => {
    setFieldRegistry((prev) => {
      const newRegistry = { ...prev };
      delete newRegistry[name];
      return newRegistry;
    });
  }, []);

  const getFieldConfig = React.useCallback((name: string) => {
    return fieldRegistry[name];
  }, [fieldRegistry]);

  const contextValue = React.useMemo(
    () => ({
      ...value,
      registerField,
      unregisterField,
      getFieldConfig,
    }),
    [value, registerField, unregisterField, getFieldConfig]
  );

  return (
    <ITFormBuilderContext.Provider value={contextValue}>
      {children}
    </ITFormBuilderContext.Provider>
  );
};

export const useITFormBuilderContext = () => {
  const context = useContext(ITFormBuilderContext);
  if (!context) {
    throw new Error('useITFormBuilderContext must be used within an ITFormBuilderProvider');
  }
  return context;
};
