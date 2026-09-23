import React, { memo, useCallback, useEffect, useMemo, useState, useRef } from "react";
import clsx from "clsx";
import { FieldConfigV2 } from "@/types/field.types";
import { useITFormBuilderContext } from "./formBuilder.context";
import ITInput from "@/components/atoms/input/input";
import ITSelect from "@/components/molecules/select/select";
import ITDatePicker from "@/components/molecules/date-picker/datePicker";
import ITTimePicker from "@/components/molecules/time-picker/timePicker";
import ITSearchSelect from "@/components/molecules/search-select/search-select";
import { useFieldRules } from "./useFormBuilder";
import { getColSpanClass, getGridColsClass } from "@/utils/styles";
import ITText from "@/components/atoms/text/text";
import { FaSpinner } from "react-icons/fa";

/**
 * Resolves `FieldConfigV2["options"]` to a stable `{ value, label }[]` array,
 * calling the function form once per dependency change. Returns a loading flag
 * while an async loader is in flight so the caller can render a placeholder.
 *
 * Sync arrays are returned synchronously; async functions are awaited and the
 * resolved array is memoized until one of the supplied `deps` changes.
 *
 * The `deps` argument is intentionally a dynamic array — callers pass in the
 * values of `dependsOn` siblings so option lists re-fetch when a parent field
 * changes (e.g. cascading country -> city).
 */
function useAsyncOptions(
  options: FieldConfigV2["options"],
  deps: ReadonlyArray<unknown>,
): { options: { value: string; label: string }[]; loading: boolean } {
  const [resolved, setResolved] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(false);

  // Keep a ref so the async loader closure always reads the freshest options
  // function without re-running the effect on identity changes.
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const opts = optionsRef.current;
    let cancelled = false;

    if (typeof opts === "function") {
      setLoading(true);
      Promise.resolve()
        .then(() => opts())
        .then((result) => {
          if (cancelled) return;
          setResolved(result.map((o) => ({ value: String(o.value), label: o.label })));
        })
        .catch((err) => {
          if (cancelled) return;
          if (typeof console !== "undefined") {
            console.error("[ITFormBuilder] Failed to load async options:", err);
          }
          setResolved([]);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    } else if (Array.isArray(opts)) {
      setResolved(opts.map((o) => ({ value: String(o.value), label: o.label })));
      setLoading(false);
    } else {
      setResolved([]);
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
    // `deps` is intentionally a dynamic array of dependent-values; the ESLint
    // rule cannot statically verify the dependency surface here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { options: resolved, loading };
}

interface ITFieldRendererProps {
  /** The V2 field definition driving the render. */
  config: FieldConfigV2;
  /** Grid column count used for `column` spans and nested `section` grids. */
  columns?: number;
  /** Current value of this field (controlled). */
  value?: any;
  /** Validation error message for this field. */
  error?: string;
  /** Whether this field has been touched. */
  touched?: boolean;
  /**
   * Pre-filtered `values` slice containing only the keys listed in
   * `config.dependsOn`. Computed by {@link ITFormBuilder}.
   */
  dependentValues?: Record<string, any>;
}

/**
 * Renders a single V2 {@link FieldConfigV2}. Mounts/unmounts the field in the
 * shared registry, evaluates `renderWhen` / `dynamicProps` via
 * {@link useFieldRules}, and dispatches to the correct input component for the
 * field's `type`.
 *
 * Field kinds supported by `type`:
 * - `"text" | "password" | "number" | "email"` -> `<ITInput>`
 * - `"select"` (sync options) -> `<ITSelect>`
 * - `"select"` (async options) -> `<ITSearchSelect>` with a spinner fallback
 * - `"date"` -> `<ITDatePicker>`
 * - `"time"` -> `<ITTimePicker>`
 * - `"custom"` -> the `config.component` renderer
 * - `"section"` -> nested grid of `config.fields`
 * - `"array"` -> placeholder (reserved for future dynamic lists)
 *
 * Memoised with `React.memo`; equality is shallow on props so passing fresh
 * `value`/`error`/`touched` per render is expected.
 */
const ITFieldRenderer = ({
  config,
  columns = 12,
  value,
  error,
  touched,
  dependentValues = {},
}: ITFieldRendererProps) => {
  const context = useITFormBuilderContext();
  const { isVisible, isRequired, isDisabled, dynamicProps } = useFieldRules(
    config,
    dependentValues,
  );

  useEffect(() => {
    context.registerField(config.name, config);
    return () => {
      context.unregisterField(config.name);
    };
    // `config`/`context` are stable in the provider; only `name` defines the
    // registration key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.name]);

  const activeConfig = useMemo(
    () => ({
      ...config,
      ...dynamicProps,
      required: isRequired,
      disabled: isDisabled,
    }),
    [config, dynamicProps, isRequired, isDisabled],
  );

  const {
    name,
    label,
    type,
    placeholder,
    options,
    valueField,
    labelField,
    formatNumber,
    showHintLength,
    leftIcon,
    rightIcon,
  } = activeConfig;

  const { options: resolvedOptions, loading: optionsLoading } = useAsyncOptions(
    options,
    [options, dependentValues],
  );

  const handleChangeWrapper = useCallback(
    async (val: any) => {
      const finalValue = val && typeof val === "object" && "target" in val ? val.target.value : val;
      await context.setFieldValue(name, finalValue);
      if (activeConfig.onChangeAction) {
        await activeConfig.onChangeAction(finalValue, context);
      }
    },
    [name, context, activeConfig],
  );

  if (!isVisible) return null;

  const renderField = () => {
    switch (type) {
      case "text":
      case "password":
      case "number":
      case "email":
        return (
          <ITInput
            type={type === "email" ? "text" : type}
            name={name}
            label={label || ""}
            placeholder={placeholder}
            disabled={isDisabled as boolean}
            value={value !== undefined ? value : activeConfig.defaultValue || ""}
            onChange={handleChangeWrapper}
            onBlur={context.handleBlur}
            currencyFormat={activeConfig.currencyFormat}
            touched={touched}
            error={error}
            required={isRequired as boolean}
            iconRight={rightIcon}
            iconLeft={leftIcon}
            showHintLength={showHintLength}
            maxLength={activeConfig.maxLength}
            minLength={activeConfig.minLength}
            rows={activeConfig.rows}
            formatNumber={formatNumber}
          />
        );

      case "select":
        if (typeof options === "function") {
          if (optionsLoading) {
            return (
              <div
                className="flex items-center gap-2 py-3"
                data-testid={`field-loading-${name}`}
              >
                <FaSpinner className="animate-spin text-primary-500" />
                <ITText as="span" className="text-sm text-slate-500">
                  Cargando opciones...
                </ITText>
              </div>
            );
          }
          return (
            <ITSearchSelect
              options={resolvedOptions}
              name={name}
              disabled={isDisabled as boolean}
              label={label || ""}
              placeholder={placeholder}
              value={value !== undefined ? value : activeConfig.defaultValue || ""}
              valueField={valueField || "value"}
              labelField={labelField || "label"}
              onChange={handleChangeWrapper}
              onBlur={context.handleBlur}
              touched={touched}
              error={error}
              required={isRequired as boolean}
            />
          );
        }
        return (
          <ITSelect
            options={resolvedOptions}
            name={name}
            disabled={isDisabled as boolean}
            label={label || ""}
            placeholder={placeholder}
            value={value !== undefined ? value : activeConfig.defaultValue || ""}
            valueField={valueField}
            labelField={labelField}
            onChange={handleChangeWrapper}
            onBlur={context.handleBlur}
            touched={touched}
            error={error}
            required={isRequired as boolean}
          />
        );

      case "date":
        return (
          <ITDatePicker
            name={name}
            disabled={isDisabled as boolean}
            label={label || ""}
            value={value}
            onChange={handleChangeWrapper}
            placeholder={placeholder}
            onBlur={context.handleBlur}
            touched={touched}
            error={error}
            required={isRequired as boolean}
          />
        );

      case "time":
        return (
          <ITTimePicker
            name={name}
            disabled={isDisabled as boolean}
            label={label || ""}
            value={value}
            onChange={handleChangeWrapper}
            placeholder={placeholder}
            onBlur={context.handleBlur}
            touched={touched}
            error={error}
            required={isRequired as boolean}
          />
        );

      case "custom":
        if (activeConfig.component) {
          const CustomComponent = activeConfig.component;
          // Strip the builder-only keys before forwarding so the custom
          // component receives a clean prop bag (no leaks of `component`,
          // `fields`, `dynamicProps`, `renderWhen`, etc.).
          const customProps: Record<string, unknown> = { ...activeConfig };
          const BUILDER_ONLY_KEYS = [
            "component",
            "type",
            "fields",
            "renderWhen",
            "dynamicProps",
            "dependsOn",
            "validation",
            "asyncValidation",
            "options",
            "defaultValue",
            "className",
          ];
          for (const key of BUILDER_ONLY_KEYS) delete customProps[key];
          return (
            <CustomComponent
              {...(customProps as any)}
              name={name}
              value={value}
              onChange={handleChangeWrapper}
              onBlur={context.handleBlur}
              error={error}
              touched={touched}
              context={context}
            />
          );
        }
        if (typeof console !== "undefined" && process.env.NODE_ENV !== "production") {
          console.warn(
            `[ITFormBuilder] Field "${name}" has type "custom" but no \`component\` was provided.`,
          );
        }
        return null;

      case "section":
        return (
          <div className={clsx("w-full col-span-full", activeConfig.className)}>
            {label && (
              <ITText
                as="h4"
                className="text-lg font-semibold text-secondary-800 mb-4"
              >
                {label}
              </ITText>
            )}
            <div
              className={clsx(
                "grid gap-y-6 gap-x-5",
                getGridColsClass(columns as any),
              )}
            >
              {activeConfig.fields?.map((childConfig) => (
                <ITFieldRenderer
                  key={childConfig.name}
                  config={childConfig}
                  columns={columns}
                />
              ))}
            </div>
          </div>
        );

      case "array":
        return (
          <div className="p-4 border-2 border-dashed border-secondary-200 rounded-xl">
            <ITText as="p" className="text-sm text-secondary-500 text-center">
              Array Field: {label}
            </ITText>
          </div>
        );

      default:
        if (typeof console !== "undefined" && process.env.NODE_ENV !== "production") {
          console.warn(
            `[ITFormBuilder] Unknown V2 field type "${type}" for field "${name}". ` +
              `Supported: text, number, password, email, select, date, time, custom, section, array.`,
          );
        }
        return null;
    }
  };

  return (
    <div
      className={clsx(getColSpanClass(activeConfig.column, columns), activeConfig.className)}
      data-field-name={name}
    >
      {renderField()}
    </div>
  );
};

export default memo(ITFieldRenderer);