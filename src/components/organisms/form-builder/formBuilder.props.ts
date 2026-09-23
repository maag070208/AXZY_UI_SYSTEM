import { FieldConfig, FieldConfigV2 } from "@/types/field.types";

/**
 * A single field change event, mirroring the Formik public API surface so any
 * standard Formik binding (`formik.handleChange`) can be passed through.
 */
export type ITFormBuilderChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.FocusEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>
  | { target: { name: string; value: any } };

/**
 * A single field blur event, mirroring the Formik public API surface so any
 * standard Formik binding (`formik.handleBlur`) can be passed through.
 */
export type ITFormBuilderBlurEvent =
  | React.FocusEvent<HTMLInputElement>
  | React.FocusEvent<HTMLSelectElement, Element>
  | React.FocusEvent<HTMLTextAreaElement, Element>
  | { target: { name: string; value: any } };

/**
 * Form-level values keyed by field `name`. Kept as `Record<string, unknown>` so
 * the builder does not impose a concrete domain shape on consumers.
 */
export type ITFormBuilderValues = Record<string, unknown>;

/**
 * Validation errors keyed by field `name`.
 */
export type ITFormBuilderErrors = Record<string, string | undefined>;

/**
 * Touch state keyed by field `name`.
 */
export type ITFormBuilderTouched = Record<string, boolean>;

/**
 * Props for {@link ITFormBuilder}. The component accepts either a legacy V1
 * `fields` array (kept for backward compatibility with projects that adopted
 * the original API) or the richer V2 `config` array. If both are supplied the
 * V2 `config` takes precedence; if neither is supplied the component renders
 * nothing.
 */
export interface ITFormBuilderProps {
  /**
   * Legacy V1 field definitions.
   *
   * @deprecated Prefer the `config` prop (V2). V1 is preserved for backward
   * compatibility and supports a reduced subset of features (no rules engine,
   * no `section`, no `custom`, no async options).
   */
  fields?: FieldConfig[];

  /**
   * V2 field configuration array. The recommended entry point. Supports the
   * rules engine (`renderWhen` / `dynamicProps` / `dependsOn`), nested
   * `sections`, custom renderers via `type: "custom"`, async option loaders, and
   * per-field `validation` / `asyncValidation`.
   *
   * When this prop is supplied it shadows any `fields` prop.
   */
  config?: FieldConfigV2[];

  /**
   * Number of grid columns used by the responsive layout. Allowed range is
   * 1..12; values outside the supported grid map fall back to a 12-column
   * layout. @default 12
   */
  columns?: number;

  /** Current form values keyed by field `name`. */
  values: ITFormBuilderValues;

  /**
   * Change handler invoked by every rendered input/select/textarea. Designed
   * to receive the native `event` from a controlled child, so a Formik
   * `handleChange` can be passed directly.
   */
  handleChange: (event: ITFormBuilderChangeEvent) => void;

  /**
   * Blur handler invoked by every rendered input/select/textarea. Designed
   * to receive the native `event` from a controlled child, so a Formik
   * `handleBlur` can be passed directly.
   */
  handleBlur: (event: ITFormBuilderBlurEvent) => void;

  /** Touch state keyed by field `name`. */
  touched: ITFormBuilderTouched;

  /** Validation errors keyed by field `name`. */
  errors: ITFormBuilderErrors;

  /**
   * Programmatically sets a field value. Mirrors Formik's
   * `setFieldValue(field, value, shouldValidate?)` so it can be passed through.
   * Required to enable V2 features such as `onChangeAction` and
   * `dynamicProps` side effects. Defaults to a no-op.
   */
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | any>;

  /**
   * Programmatically marks a field as touched. Mirrors Formik's
   * `setFieldTouched(field, touched?, shouldValidate?)`. Defaults to a no-op.
   */
  setFieldTouched?: (
    field: string,
    touched?: boolean,
    shouldValidate?: boolean
  ) => Promise<void | any>;

  /**
   * Programmatically sets a field-level error message (Formik parity). Defaults
   * to a no-op.
   */
  setFieldError?: (field: string, message: string | undefined) => void;

  /** True while the parent form is submitting. Surfaced via the form context. */
  isSubmitting?: boolean;

  /**
   * Optional children rendered **inside** the V2 `ITFormBuilderProvider`,
   * after the field grid. Useful for custom submit buttons or progress
   * badges that read live state via {@link useFormBuilder} /
   * `useITFormBuilderContext`. Ignored in the V1 (legacy) path because
   * no provider is mounted there.
   */
  children?: React.ReactNode;
}