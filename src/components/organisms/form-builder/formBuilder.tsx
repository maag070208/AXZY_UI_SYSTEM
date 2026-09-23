import { useMemo } from "react";
import ITInput from "@/components/atoms/input/input";
import ITSelect from "@/components/molecules/select/select";
import { ITFormBuilderProps } from "./formBuilder.props";
import ITDatePicker from "@/components/molecules/date-picker/datePicker";
import { ITFormBuilderProvider } from "./formBuilder.context";
import ITFieldRenderer from "./fieldRenderer";
import { formGrid, getColSpanClass } from "@/utils/styles";

/**
 * Builds the `dependentValues` slice that drives a field's `renderWhen` and
 * `dynamicProps` rules. Only the keys listed in `dependsOn` are forwarded, so
 * the field re-renders only when one of its declared dependencies actually
 * changes (memo-friendly).
 *
 * @param dependsOn - Sibling field names declared in {@link FieldConfigV2.dependsOn}.
 * @param values - The full form values object.
 * @returns A filtered object; empty when `dependsOn` is missing or empty.
 */
function buildDependentValues(
  dependsOn: string[] | undefined,
  values: Record<string, any>,
): Record<string, any> {
  if (!dependsOn || dependsOn.length === 0) return {};
  const deps: Record<string, any> = {};
  for (const key of dependsOn) {
    if (key in values) deps[key] = values[key];
  }
  return deps;
}

/**
 * Reads the new value out of either a native React change event (`e.target.value`)
 * or an already-extracted payload (Formik's `setFieldValue` call sites do this
 * for custom components).
 *
 * @param arg - Either a React change event or a raw value.
 * @returns The unwrapped string value.
 */
function unwrapChangeValue(arg: any): string {
  return arg && typeof arg === "object" && "target" in arg ? arg.target.value : arg;
}

/**
 * `ITFormBuilder` is a declarative form generator. It renders a responsive
 * grid of inputs from either a legacy V1 `fields` array or the richer V2
 * `config` array and wires every rendered input/select/date to the supplied
 * Formik-style `handleChange`/`handleBlur`/`setFieldValue` callbacks.
 *
 * **V2 features (recommended):**
 * - Rules engine: `renderWhen`, `dynamicProps`, `dependsOn`.
 * - Section grouping with `type: "section"`.
 * - Custom renderers with `type: "custom"`.
 * - Async option loaders via `options: () => Promise<...>`.
 * - Per-field `onChangeAction` for derived fields and side effects.
 * - Nested sections and grids via `fields?: FieldConfigV2[]`.
 *
 * **V1 (legacy):**
 * The `fields` prop accepts a simpler shape (`text` / `number` / `password` /
 * `select` / `date`) without rules, sections, or async options. Kept for
 * backward compatibility.
 *
 * The component is fully controlled: it does not own form state. Wrap it in a
 * Formik `<Formik>` (or any state holder of your choice) and forward its
 * `values`, `handleChange`, `handleBlur`, `touched`, `errors`, and
 * `setFieldValue` props.
 *
 * @example Minimal login form (V1)
 * ```tsx
 * <ITFormBuilder
 *   fields={[
 *     { name: "email", label: "Email", type: "text", required: true, column: 12 },
 *     { name: "password", label: "Password", type: "password", required: true, column: 12 },
 *   ]}
 *   values={formik.values}
 *   handleChange={formik.handleChange}
 *   handleBlur={formik.handleBlur}
 *   touched={formik.touched}
 *   errors={formik.errors}
 * />
 * ```
 *
 * @example Conditional RFC field with derived total (V2)
 * ```tsx
 * const config: FieldConfigV2[] = [
 *   { name: "country", label: "País", type: "select", required: true,
 *     options: [{ value: "MX", label: "México" }, { value: "US", label: "USA" }] },
 *   { name: "rfc", label: "RFC", type: "text", required: true,
 *     dependsOn: ["country"], renderWhen: (v) => v.country === "MX" },
 *   { name: "subtotal", label: "Subtotal", type: "number", currencyFormat: true,
 *     onChangeAction: (val, ctx) => ctx.setFieldValue("total", (Number(val) * 1.16).toFixed(2)) },
 *   { name: "total", label: "Total", type: "number", currencyFormat: true, disabled: true },
 * ];
 *
 * <ITFormBuilder
 *   config={config}
 *   values={formik.values}
 *   handleChange={formik.handleChange}
 *   handleBlur={formik.handleBlur}
 *   touched={formik.touched}
 *   errors={formik.errors}
 *   setFieldValue={formik.setFieldValue}
 * />
 * ```
 *
 * @example Reading form progress from a custom submit button
 * ```tsx
 * const SubmitButton = () => {
 *   const { progress } = useFormBuilder();
 *   return <button disabled={progress < 100}>Submit ({progress}%)</button>;
 * };
 *
 * <ITFormBuilder config={config} values={...} ... />
 * <SubmitButton />
 * ```
 */
export default function ITFormBuilder({
  fields,
  config,
  columns = 12,
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  setFieldValue = () => Promise.resolve(),
  setFieldTouched = () => Promise.resolve(),
  setFieldError = () => {},
  isSubmitting = false,
  children,
}: ITFormBuilderProps) {
  const providerValue = useMemo(
    () => ({
      config: config || [],
      values: (values as Record<string, any>) || {},
      errors: (errors as Record<string, string>) || {},
      touched: (touched as Record<string, boolean>) || {},
      handleChange,
      handleBlur,
      setFieldValue,
      setFieldTouched,
      setFieldError,
      initialValues: {} as Record<string, any>,
      isSubmitting,
      isValidating: false,
      submitCount: 0,
    }),
    [
      config,
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      setFieldValue,
      setFieldTouched,
      setFieldError,
      isSubmitting,
    ],
  );

  // V2 path: render inside the context provider so custom children (sections,
  // custom renderers, useFormBuilder() consumers) can read the registry.
  if (config) {
    return (
      <ITFormBuilderProvider value={providerValue}>
        <div className={formGrid(columns)}>
          {config.map((fieldConfig) => (
            <ITFieldRenderer
              key={fieldConfig.name}
              config={fieldConfig}
              columns={columns}
              value={(values as Record<string, any>)[fieldConfig.name]}
              error={(errors as Record<string, string>)[fieldConfig.name]}
              touched={(touched as Record<string, boolean>)[fieldConfig.name]}
              dependentValues={buildDependentValues(fieldConfig.dependsOn, values as Record<string, any>)}
            />
          ))}
        </div>
        {children}
      </ITFormBuilderProvider>
    );
  }

  // V1 path: legacy inline renderer. Kept for backward compatibility with the
  // original `fields` API. No context is provided.
  return (
    <div className={formGrid(columns)}>
      {fields?.map(({
        name,
        label,
        type = "text",
        placeholder,
        required,
        column = 12,
        options,
        valueField,
        disabled = false,
        labelField,
        showHintLength,
        formatNumber = true,
        onChangeAction,
        ...props
      }) => (
        <div key={name} className={getColSpanClass(column, columns)}>
          {(() => {
            switch (type) {
              case "text":
              case "number":
              case "password":
                return (
                  <ITInput
                    type={type}
                    name={name}
                    label={label}
                    placeholder={placeholder}
                    disabled={disabled}
                    value={(values as Record<string, any>)[name]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      if (onChangeAction) {
                        onChangeAction(unwrapChangeValue(e), setFieldValue);
                      }
                    }}
                    onBlur={handleBlur}
                    currencyFormat={props.currencyFormat}
                    touched={(touched as Record<string, boolean>)[name]}
                    error={(errors as Record<string, string>)[name]}
                    required={required}
                    iconRight={props.rightIcon}
                    iconLeft={props.leftIcon}
                    showHintLength={showHintLength}
                    maxLength={props.maxLength}
                    minLength={props.minLength}
                    rows={props.rows}
                    formatNumber={formatNumber}
                  />
                );
              case "select":
                return (
                  <ITSelect
                    options={options || []}
                    name={name}
                    disabled={disabled}
                    label={label}
                    placeholder={placeholder}
                    value={(values as Record<string, any>)[name]}
                    valueField={valueField}
                    labelField={labelField}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      handleChange(e);
                      if (onChangeAction) {
                        onChangeAction(unwrapChangeValue(e), setFieldValue);
                      }
                    }}
                    onBlur={handleBlur}
                    touched={(touched as Record<string, boolean>)[name]}
                    error={(errors as Record<string, string>)[name]}
                    required={required}
                  />
                );
              case "date":
                return (
                  <ITDatePicker
                    name={name}
                    disabled={disabled}
                    label={label}
                    value={(values as Record<string, any>)[name]}
                    onChange={(e: any) => {
                      handleChange(e);
                      if (onChangeAction) {
                        onChangeAction(unwrapChangeValue(e), setFieldValue);
                      }
                    }}
                    placeholder={placeholder}
                    onBlur={handleBlur}
                    touched={(touched as Record<string, boolean>)[name]}
                    error={(errors as Record<string, string>)[name]}
                    required={required}
                  />
                );
              default:
                // V1 has no implicit fallback: unknown types are skipped so a
                // typo or unsupported `type` does not render a broken input.
                if (typeof console !== "undefined" && process.env.NODE_ENV !== "production") {
                  console.warn(
                    `[ITFormBuilder] Unknown legacy V1 field type "${type}" for field "${name}". ` +
                      `Supported V1 types: text, number, password, select, date. ` +
                      `For richer features switch to the V2 \`config\` prop.`,
                  );
                }
                return null;
            }
          })()}
        </div>
      ))}
    </div>
  );
}