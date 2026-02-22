import React from "react";
import * as Yup from "yup";

// Legacy FieldConfig (kept for backward compatibility during migration)
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
  options?: { value: string; label: string }[];
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

// -------------------------------------------------------------
// V2: ENTERPRISE FORM BUILDER ARCHITECTURE
// -------------------------------------------------------------

export type FieldTypeV2 = 
  | "text" 
  | "number" 
  | "password" 
  | "email" 
  | "select" 
  | "date" 
  | "time"
  | "checkbox" 
  | "radio"
  | "array"     // For dynamic lists
  | "section"   // For grouping fields or wizard steps
  | "custom";   // For inversion of control (injecting external components)

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
  
  // 1. Layout & Structure
  column?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  fields?: FieldConfigV2[]; // REQUIRED if type is "array" or "section"
  collapsible?: boolean;    // Optional for "section", default false
  defaultCollapsed?: boolean;
  
  // 2. Rules Engine & Dynamic Behavior
  dependsOn?: string[]; // Array of sibling field names to listen to for re-evaluation
  renderWhen?: (values: Record<string, any>) => boolean; // If false, field isn't rendered or submitted
  dynamicProps?: (values: Record<string, any>) => Partial<FieldConfigV2>; // E.g: if A > 100, make this required
  
  // 3. Advanced Validations
  validation?: Yup.AnySchema; 
  asyncValidation?: (value: any, values: Record<string, any>) => Promise<string | null | undefined>; // Returns error string if invalid
  
  // 4. Base Props
  defaultValue?: any;
  placeholder?: string;
  disabled?: boolean | ((values: Record<string, any>) => boolean);
  readOnly?: boolean;
  required?: boolean | ((values: Record<string, any>) => boolean);
  
  // 5. Data Support (Sync & Async)
  options?: 
    | { value: string | number; label: string }[] 
    | (() => Promise<{ value: string | number; label: string }[]>);
  valueField?: string;
  labelField?: string;
  
  // 6. Extensibility & UI
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  component?: React.ComponentType<any>; // Custom component for type === "custom"
  className?: string; // Custom container class
  
  // Legacy specific overrides
  currencyFormat?: boolean;
  showHintLength?: boolean;
  maxLength?: number;
  minLength?: number;
  rows?: number;
  formatNumber?: boolean;

  // Lifecycle hook
  onChangeAction?: (val: any, context: FieldContextV2) => void | Promise<void>;
}
