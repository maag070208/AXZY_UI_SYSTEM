import React, { memo, useEffect } from "react";
import clsx from "clsx";
import { FieldConfigV2 } from "@/types/field.types";
import { useITFormBuilderContext } from "./formBuilder.context";
import ITInput from "../input/input";
import ITSelect from "../select/select";
import ITDatePicker from "../date-picker/datePicker";
import ITTimePicker from "../time-picker/timePicker";
import { useFieldRules } from "./useFormBuilder";

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

const getColSpanClass = (
  span: number | { sm?: number; md?: number; lg?: number; xl?: number } = 12,
  maxCols: number
) => {
  if (typeof span === "object") {
    const classes = [];
    if (span.sm) classes.push(`col-span-${Math.min(span.sm, maxCols)}`);
    if (span.md) classes.push(`md:col-span-${Math.min(span.md, maxCols)}`);
    if (span.lg) classes.push(`lg:col-span-${Math.min(span.lg, maxCols)}`);
    if (span.xl) classes.push(`xl:col-span-${Math.min(span.xl, maxCols)}`);
    return classes.join(" ") || `col-span-${maxCols}`;
  }

  return `col-span-${Math.min(span, maxCols)}`;
};

interface ITFieldRendererProps {
  config: FieldConfigV2;
  columns?: number;
}

const ITFieldRenderer = ({ config, columns = 12 }: ITFieldRendererProps) => {
  const context = useITFormBuilderContext();
  const { isVisible, isRequired, isDisabled, dynamicProps } = useFieldRules(
    config.name,
    config.dependsOn
  );

  /* ============================
     ✅ REGISTER FIELD (ONLY ONCE)
  ============================ */

  useEffect(() => {
    context.registerField(config.name, config);

    return () => {
      context.unregisterField(config.name);
    };
  }, [config.name]); // 🔥 SOLO NAME

  /* ============================
     ✅ UPDATE CONFIG IF CHANGES
  ============================ */

  // useEffect(() => {
  //   if (context.updateFieldConfig) {
  //     context.updateFieldConfig(config.name, config);
  //   }
  // }, [config]); // solo actualiza config, no registra/desregistra

  if (!isVisible) return null;

  const activeConfig = {
    ...config,
    ...dynamicProps,
    required: isRequired,
    disabled: isDisabled,
  };

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

  const value = context.values[name];
  const error = context.errors[name];
  const touched = context.touched[name];

  const handleChangeWrapper = async (val: any) => {
    const finalValue = val?.target ? val.target.value : val;

    await context.setFieldValue(name, finalValue);

    if (activeConfig.onChangeAction) {
      await activeConfig.onChangeAction(finalValue, context);
    }
  };

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
            value={
              value !== undefined
                ? value
                : activeConfig.defaultValue || ""
            }
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
        return (
          <ITSelect
            options={(Array.isArray(options) ? options : []) as any}
            name={name}
            disabled={isDisabled as boolean}
            label={label || ""}
            placeholder={placeholder}
            value={
              value !== undefined
                ? value
                : activeConfig.defaultValue || ""
            }
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
          return (
            <CustomComponent
              {...activeConfig}
              value={value}
              onChange={handleChangeWrapper}
              onBlur={context.handleBlur}
              error={error}
              touched={touched}
              context={context}
            />
          );
        }
        return null;

      case "section":
        return (
          <div
            className={clsx(
              "w-full col-span-full",
              activeConfig.className
            )}
          >
            {label && (
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                {label}
              </h4>
            )}
            <div
              className={clsx(
                "grid gap-y-6 gap-x-5",
                getGridColsClass(columns as any)
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
          <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl">
            <p className="text-sm text-gray-500 text-center">
              Array Field: {label}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={clsx(
        getColSpanClass(activeConfig.column, columns),
        activeConfig.className
      )}
    >
      {renderField()}
    </div>
  );
};

/* =====================================
   ✅ MEMO SEGURO
===================================== */

export default memo(ITFieldRenderer);