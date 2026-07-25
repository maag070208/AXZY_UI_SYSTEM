import React, { memo, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { FieldConfigV2 } from "@/types/field.types";
import { useITFormBuilderContext } from "./formBuilder.context";
import ITInput from "../input/input";
import ITSelect from "../select/select";
import ITDatePicker from "../date-picker/datePicker";
import ITTimePicker from "../time-picker/timePicker";
import ITSearchSelect from "../search-select/search-select";
import { useFieldRules } from "./useFormBuilder";
import { getColSpanClass, getGridColsClass } from "@/utils/styles";
import ITText from "@/components/text/text";
import { FaSpinner } from "react-icons/fa";

function useAsyncOptions(options: FieldConfigV2["options"], depends: any[]) {
  const [resolved, setResolved] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof options === "function") {
      setLoading(true);
      options().then((result) => {
        setResolved(result.map(o => ({ value: String(o.value), label: o.label })));
        setLoading(false);
      });
    } else if (Array.isArray(options)) {
      setResolved(options.map(o => ({ value: String(o.value), label: o.label })));
    }
  }, depends);

  return { options: resolved, loading };
}



interface ITFieldRendererProps {
  config: FieldConfigV2;
  columns?: number;
  value?: any;
  error?: string;
  touched?: boolean;
  dependentValues?: Record<string, any>;
}

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
  }, [config.name]);

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

  const { options: resolvedOptions, loading: optionsLoading } = useAsyncOptions(options, [options, dependentValues]);

  const handleChangeWrapper = useCallback(
    async (val: any) => {
      const finalValue = val?.target ? val.target.value : val;
      await context.setFieldValue(name, finalValue);
      if (activeConfig.onChangeAction) {
        await activeConfig.onChangeAction(finalValue, context);
      }
    },
    [name, context]
  );

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
        if (optionsLoading) {
          return (
            <div className="flex items-center gap-2 py-3">
              <FaSpinner className="animate-spin text-primary-500" />
              <ITText as="span" className="text-sm text-slate-500">Cargando opciones...</ITText>
            </div>
          );
        }
        if (typeof options === "function") {
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
              onChange={(val: any) => handleChangeWrapper(val)}
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
          <div className={clsx("w-full col-span-full", activeConfig.className)}>
            {label && (
              <ITText as="h4" className="text-lg font-semibold text-gray-800 mb-4">
                {label}
              </ITText>
            )}
            <div className={clsx("grid gap-y-6 gap-x-5", getGridColsClass(columns as any))}>
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
            <ITText as="p" className="text-sm text-gray-500 text-center">
              Array Field: {label}
            </ITText>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={clsx(getColSpanClass(activeConfig.column, columns), activeConfig.className)}>
      {renderField()}
    </div>
  );
};

export default memo(ITFieldRenderer);