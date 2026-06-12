import clsx from "clsx";
import ITInput from "../input/input";
import ITSelect from "../select/select";
import { ITFormBuilderProps } from "./formBuilder.props";
import ITDatePicker from "../date-picker/datePicker";
import { useEffect, useState, useMemo } from "react";
import { ITFormBuilderProvider } from "./formBuilder.context";
import ITFieldRenderer from "./fieldRenderer";
import { formGrid, getColSpanClass } from "@/utils/styles";

function buildDependentValues(
  dependsOn: string[] | undefined,
  values: Record<string, any>,
) {
  if (!dependsOn || dependsOn.length === 0) return {};
  const deps: Record<string, any> = {};
  for (const key of dependsOn) {
    if (key in values) deps[key] = values[key];
  }
  return deps;
}

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
}: ITFormBuilderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const providerValue = useMemo(() => ({
    config: config || [],
    values: values || {},
    errors: errors || {},
    touched: touched || {},
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    initialValues: {},
    isSubmitting,
    isValidating: false,
    submitCount: 0,
  }), [config, values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldTouched, setFieldError, isSubmitting]);

  if (config) {
    return (
      <ITFormBuilderProvider value={providerValue}>
        <div className={formGrid(columns)}>
          {config.map((fieldConfig) => (
            <ITFieldRenderer
              key={fieldConfig.name}
              config={fieldConfig}
              columns={columns}
              value={values[fieldConfig.name]}
              error={errors[fieldConfig.name]}
              touched={touched[fieldConfig.name]}
              dependentValues={buildDependentValues(fieldConfig.dependsOn, values)}
            />
          ))}
        </div>
      </ITFormBuilderProvider>
    );
  }

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
                    value={values[name]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      if (onChangeAction && setFieldValue) {
                        onChangeAction(e.target.value, setFieldValue);
                      }
                    }}
                    onBlur={handleBlur}
                    currencyFormat={props.currencyFormat}
                    touched={touched[name]}
                    error={errors[name]}
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
                    value={values[name]}
                    valueField={valueField}
                    labelField={labelField}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      handleChange(e);
                      if (onChangeAction && setFieldValue) {
                        onChangeAction(e.target.value, setFieldValue);
                      }
                    }}
                    onBlur={handleBlur}
                    touched={touched[name]}
                    error={errors[name]}
                    required={required}
                  />
                );
              case "date":
                return (
                  <ITDatePicker
                    name={name}
                    disabled={disabled}
                    label={label}
                    value={values[name]}
                    onChange={(
                      e:
                        | React.ChangeEvent<HTMLInputElement>
                        | { target: { name: string; value: Date } }
                    ) => {
                      handleChange(e);
                      if (onChangeAction && setFieldValue) {
                        onChangeAction(e.target.value, setFieldValue);
                      }
                    }}
                    placeholder={placeholder}
                    onBlur={handleBlur}
                    touched={touched[name]}
                    error={errors[name]}
                    required={required}
                  />
                );
              default:
                return null;
            }
          })()}
        </div>
      ))}
    </div>
  );
}
