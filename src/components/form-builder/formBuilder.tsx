import clsx from "clsx";
import ITInput from "../input/input";
import ITSelect from "../select/select";
import { ITFormBuilderProps } from "./formBuilder.props";
import ITDatePicker from "../date-picker/datePicker";
import { useEffect, useState, useMemo } from "react";
import { ITFormBuilderProvider } from "./formBuilder.context";
import ITFieldRenderer from "./fieldRenderer";

const gridColsClasses = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  8: "grid-cols-8",
  12: "grid-cols-12",
};

const getGridColsClass = (columns: keyof typeof gridColsClasses) =>
  gridColsClasses[columns] || "grid-cols-12";

const getColSpanClass = (span: number | number[], maxCols: number) => {
  if (Array.isArray(span)) {
    const [sm, md, lg] = span;
    return `col-span-${Math.min(sm, maxCols)} md:col-span-${Math.min(
      md,
      maxCols
    )} lg:col-span-${Math.min(lg, maxCols)}`;
  } else {
    return `col-span-${Math.min(span, maxCols)}`;
  }
};

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
    initialValues: {}, // Can be expanded later if Formik exposes it
    isSubmitting,
    isValidating: false,
    submitCount: 0,
  }), [config, values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldTouched, setFieldError, isSubmitting]);

  // V2 ENTERPRISE RENDERING
  if (config) {
     return (
        <ITFormBuilderProvider value={providerValue}>
           <div className={clsx("grid gap-y-6 gap-x-5", getGridColsClass(columns as keyof typeof gridColsClasses))}>
              {config.map((fieldConfig) => (
                 <ITFieldRenderer key={fieldConfig.name} config={fieldConfig} columns={columns} />
              ))}
           </div>
        </ITFormBuilderProvider>
     );
  }

  // V1 LEGACY RENDERING
  return (
    <div
      className={clsx(
        "grid gap-y-6 gap-x-5",
        getGridColsClass(columns as keyof typeof gridColsClasses)
      )}
    >
      {fields?.map(
        ({
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
        }, index) => (
          <div 
            key={name} 
            className={getColSpanClass(column, columns)}
          >
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
        )
      )}
    </div>
  );
}
