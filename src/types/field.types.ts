import React from "react";
import * as Yup from "yup";

// Legacy FieldConfig (kept for backward compatibility during migration)
/** @deprecated Legacy (V1) field definition consumed by `ITFormBuilder`'s `fields` prop. Prefer `FieldConfigV2` via the `config` prop for new forms. */
export interface FieldConfig {
  /** Field name, matches the key in Formik's `values`/`errors`/`touched` objects. */
  name: string;
  /** Label text rendered above the field. */
  label: string;
  /** Input type. @default "text" */
  type?: "text" | "select" | "date" | "password" | "number";
  /** Formats a numeric field with thousands separators/currency styling as the user types. @default false */
  currencyFormat?: boolean;
  /** Placeholder text shown when the field is empty. */
  placeholder?: string;
  /** Disables the field. @default false */
  disabled?: boolean;
  /** Marks the field as required (shows an asterisk and enables the built-in required message). @default false */
  required?: boolean;
  /** Yup schema used to validate this field. */
  validation?: Yup.AnySchema;
  /** Grid column span (1-12), or `[sm, md, lg]` breakpoint-specific spans. */
  column?: number | number[];
  /** Options for `type: "select"`. */
  options?: { value: string; label: string }[];
  /** Icon element rendered on the right side of the field. */
  rightIcon?: React.ReactNode;
  /** Icon element rendered on the left side of the field. */
  leftIcon?: React.ReactNode;
  /** Key read from each option object as its value. @default "value" */
  valueField?: string;
  /** Shows a live character-count hint below the field. @default false */
  showHintLength?: boolean;
  /** Key read from each option object as its display label. @default "label" */
  labelField?: string;
  /** Maximum character length allowed. */
  maxLength?: number;
  /** Minimum character length required. */
  minLength?: number;
  /** Number of visible text rows for a multi-line field. */
  rows?: number;
  /** Applies number formatting (thousand separators) as the user types. @default false */
  formatNumber?: boolean;
  /** Custom side-effect fired on change, in addition to the normal Formik update. Receives the new value and Formik's `setFieldValue`. */
  onChangeAction?: (value: any, setFieldValue: any) => void;
}

// -------------------------------------------------------------
// V2: ENTERPRISE FORM BUILDER ARCHITECTURE
// -------------------------------------------------------------

/** Supported field kinds for `FieldConfigV2`. */
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

/** Form state/helpers passed into `dynamicProps`, `renderWhen`, and `onChangeAction` callbacks for `FieldConfigV2`. */
export interface FieldContextV2 {
  /** Current values for every field in the form, keyed by field `name`. */
  values: Record<string, any>;
  /** Programmatically sets a field's value (mirrors Formik's `setFieldValue`). */
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  /** Programmatically sets a field-level error message. */
  setFieldError: (field: string, error: string) => void;
  /** Programmatically marks a field as touched, e.g. to surface its validation error. */
  setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean) => void;
}

/**
 * V2 field definition consumed by `ITFormBuilder`'s `config` prop. Supports
 * conditional rendering/props, nested sections and repeatable arrays, async
 * options, and custom-component injection.
 */
export interface FieldConfigV2 {
  /** Field name, matches the key in Formik's `values`/`errors`/`touched` objects. For `type: "array"`/`"section"`, this is the key under which the nested `fields` values are grouped. */
  name: string;
  /** Label text rendered above the field (or as the section/array heading). */
  label?: string;
  /** Field kind. Determines which input is rendered and which of the props below apply. */
  type: FieldTypeV2;

  // 1. Layout & Structure
  /** Grid column span (1-12), or an object with per-breakpoint spans (`sm`/`md`/`lg`/`xl`). */
  column?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  /** Nested field definitions. Required when `type` is `"array"` (the repeatable item shape) or `"section"` (the grouped fields). */
  fields?: FieldConfigV2[]; // REQUIRED if type is "array" or "section"
  /** For `type: "section"`, allows the section to be collapsed/expanded by the user. @default false */
  collapsible?: boolean;    // Optional for "section", default false
  /** For a `collapsible` section, whether it starts collapsed. @default false */
  defaultCollapsed?: boolean;

  // 2. Rules Engine & Dynamic Behavior
  /** Sibling field names this field depends on; changes to any of them re-evaluate `renderWhen`/`dynamicProps`. */
  dependsOn?: string[]; // Array of sibling field names to listen to for re-evaluation
  /** Determines whether this field is rendered (and included in submission) based on current form values. Re-evaluated when any field in `dependsOn` changes. Field is shown when omitted. */
  renderWhen?: (values: Record<string, any>) => boolean; // If false, field isn't rendered or submitted
  /** Computes a partial override of this field's own config from current form values (e.g. make it `required` once another field exceeds a threshold). Re-evaluated when any field in `dependsOn` changes. */
  dynamicProps?: (values: Record<string, any>) => Partial<FieldConfigV2>; // E.g: if A > 100, make this required

  // 3. Advanced Validations
  /** Yup schema used to validate this field. */
  validation?: Yup.AnySchema; 
  /** Async validator (e.g. a uniqueness check against an API). Return an error string when invalid, or `null`/`undefined` when valid. */
  asyncValidation?: (value: any, values: Record<string, any>) => Promise<string | null | undefined>; // Returns error string if invalid

  // 4. Base Props
  /** Initial value used when the form is first initialized/reset. */
  defaultValue?: any;
  /** Placeholder text shown when the field is empty. */
  placeholder?: string;
  /** Disables the field, either statically or computed from current form values. @default false */
  disabled?: boolean | ((values: Record<string, any>) => boolean);
  /** Renders the field as read-only (visible but not editable). @default false */
  readOnly?: boolean;
  /** Marks the field as required, either statically or computed from current form values. @default false */
  required?: boolean | ((values: Record<string, any>) => boolean);

  // 5. Data Support (Sync & Async)
  /** Options for `"select"`/`"radio"` fields: a static array, or an async loader function called once the field mounts. */
  options?: 
    | { value: string | number; label: string }[] 
    | (() => Promise<{ value: string | number; label: string }[]>);
  /** Key read from each option object as its value. @default "value" */
  valueField?: string;
  /** Key read from each option object as its display label. @default "label" */
  labelField?: string;

  // 6. Extensibility & UI
  /** Icon element rendered on the left side of the field. */
  leftIcon?: React.ReactNode;
  /** Icon element rendered on the right side of the field. */
  rightIcon?: React.ReactNode;
  /** Custom component rendered instead of a built-in input when `type` is `"custom"`. */
  component?: React.ComponentType<any>; // Custom component for type === "custom"
  /** Additional CSS class applied to the field's container. */
  className?: string; // Custom container class

  // Legacy specific overrides
  /** Formats a numeric field with thousands separators/currency styling as the user types. @default false */
  currencyFormat?: boolean;
  /** Shows a live character-count hint below the field. @default false */
  showHintLength?: boolean;
  /** Maximum character length allowed. */
  maxLength?: number;
  /** Minimum character length required. */
  minLength?: number;
  /** Number of visible text rows for a multi-line field. */
  rows?: number;
  /** Applies number formatting (thousand separators) as the user types. @default false */
  formatNumber?: boolean;

  // Lifecycle hook
  /** Custom side-effect fired whenever this field's value changes. Receives the new value and the shared `FieldContextV2` helpers. */
  onChangeAction?: (val: any, context: FieldContextV2) => void | Promise<void>;
}
