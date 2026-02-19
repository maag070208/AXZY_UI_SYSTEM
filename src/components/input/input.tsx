
import clsx from "clsx";
import { ITInputProps } from "./input.props";
import { KeyboardEvent, useState, useEffect, useRef, useCallback } from "react";
import { theme } from "@/theme/theme";

export default function ITInput({
  name,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  disabled = false,
  className,
  containerClassName,
  labelClassName,
  touched,
  error,
  formatNumber = true,
  required = false,
  autoFocus = false,
  onClick,
  iconLeft,
  iconRight,
  maxLength,
  minLength,
  checked,
  showHintLength = false,
  currencyFormat = false,
  rows = 4,
  min,
  max,
  readOnly = false,
  focusContent
}: ITInputProps) {
  const isCheckboxOrRadio = type === "checkbox" || type === "radio";
  const isNumberType = type === "number";
  const isTextArea = type === "textarea";

  const [displayValue, setDisplayValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [hasSelectedAll, setHasSelectedAll] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Theme logic
  const inputTheme = (theme as any).input || {};

  const getStyle = () => {
    const style: React.CSSProperties = {
      backgroundColor: inputTheme.backgroundColor,
      borderColor: inputTheme.borderColor,
      borderRadius: inputTheme.borderRadius,
      padding: inputTheme.padding,
      fontSize: inputTheme.fontSize,
      borderWidth: '1px',
      borderStyle: 'solid',
      transition: 'all 0.2s',
      color: theme.colors.gray[900], // Default text color
    };

    if (disabled) {
      style.backgroundColor = inputTheme.disabled?.backgroundColor || style.backgroundColor;
      style.borderColor = inputTheme.disabled?.borderColor || style.borderColor;
      style.opacity = 0.7; // Visual cue
    }

    if (hasError) {
       style.borderColor = inputTheme.error?.borderColor || 'red';
       if (isFocused) {
           style.boxShadow = inputTheme.error?.ring;
       }
    } else if (isFocused && !readOnly) {
       style.boxShadow = inputTheme.focus?.ring;
    }

    if (iconLeft) {
      style.paddingLeft = '2.5rem';
    }
    if (iconRight) {
      style.paddingRight = '2.5rem';
    }

    return style;
  };
  
  const hasError = touched && error;


   const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (onClick) {
      onClick();
    }
    
    if (!readOnly && !hasSelectedAll) {
      e.currentTarget.select();
      setHasSelectedAll(true);
    }
  };

  const formatValue = useCallback(
    (val: number | string | undefined | null): string => {
      const num =
        typeof val === "string" ? parseFloat(val.replace(/,/g, "")) : val;

      if (num == null || isNaN(num)) {
        return "";
      }

      if (currencyFormat) {
        return num.toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 10,
        });
      }

      return num.toString();
    },
    [currencyFormat]
  );

  const unformatValue = useCallback(
    (val: number | string | undefined | null): string => {
      if (val == null) return "";

      return String(val).replace(/,/g, "");
    },
    []
  );

useEffect(() => {
  if (!isFocused) {
    if (isNumberType) {
      if (formatNumber) {
        setDisplayValue(formatValue(value));
      } else {
        setDisplayValue(String(value ?? ""));
      }
    } else {
      setDisplayValue(String(value ?? ""));
    }
  }
}, [value, isFocused, isNumberType, formatValue, formatNumber]);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (readOnly || !isNumberType) return;

    const { key, ctrlKey, metaKey } = e;
    const {
      value: currentValue,
      selectionStart,
      selectionEnd,
    } = e.currentTarget;

    const allowedKeys = [
      "Backspace",
      "Tab",
      "Escape",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Home",
      "End",
    ];
    if (allowedKeys.includes(key) || ctrlKey || metaKey) {
      return;
    }

    if (!currencyFormat && (key === "." || key === ",")) {
      e.preventDefault();
      return;
    }

    if (
      currencyFormat &&
      (key === "." || key === ",") &&
      currentValue.includes(".")
    ) {
      e.preventDefault();
      return;
    }

    const allowedCharsRegex = currencyFormat ? /^[0-9.,]$/ : /^[0-9]$/;
    if (!allowedCharsRegex.test(key)) {
      e.preventDefault();
      return;
    }

    if (
      max !== undefined &&
      /^[0-9]$/.test(key) &&
      selectionStart !== null &&
      selectionEnd !== null
    ) {
      const currentUnformatted = unformatValue(currentValue);
      const nextValueStr =
        currentUnformatted.slice(0, selectionStart) +
        key +
        currentUnformatted.slice(selectionEnd);

      const numericValue = parseFloat(nextValueStr);

      if (!isNaN(numericValue) && numericValue > max) {
        e.preventDefault();
      }
    }
  };

const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (readOnly) return;

  let rawValue = e.target.value;
  let cleanedValue = "";

  if (currencyFormat) {
    rawValue = rawValue.replace(/,/g, "");
    cleanedValue = rawValue.replace(/[^0-9.]/g, "");
    const parts = cleanedValue.split(".");
    if (parts.length > 2) {
      cleanedValue = parts[0] + "." + parts.slice(1).join("");
    }
  } else {
    cleanedValue = rawValue.replace(/[^0-9]/g, "");
  }

  setDisplayValue(cleanedValue);

  if (onChange) {
    let valueToSend: number | string = cleanedValue;

    // Cambio importante aquí: evitar parsing cuando formatNumber es false
    if (!formatNumber) {
      valueToSend = cleanedValue; // Mantener como string
    } else if (cleanedValue !== "") {
      if (currencyFormat) {
        const numericValue = parseFloat(cleanedValue);
        if (!isNaN(numericValue)) {
          valueToSend = numericValue;
        }
      } else {
        const numericValue = parseInt(cleanedValue, 10);
        if (!isNaN(numericValue)) {
          valueToSend = numericValue;
        }
      }
    }

    const newEvent = {
      ...e,
      target: {
        ...e.target,
        name,
        value: valueToSend.toString(),
      },
    };
    onChange(newEvent);
  }
};

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;

    const value = e.target.value;

    if(maxLength){
      if(value.length > maxLength) return;
    }
     if (onChange) {

      const newEvent = {
        ...e,
        target: {
          ...e.target,
          name,
          value: value,
        },
      };
      onChange(newEvent);
    }

  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    setHasSelectedAll(false);
    if (readOnly || !isNumberType) return;

    setDisplayValue(unformatValue(value));
    e.currentTarget.select();
  };

const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  setHasSelectedAll(false);
  setIsFocused(false);
  if (readOnly) {
    onBlur?.(e);
    return;
  }

  if (isNumberType) {
    const currentValue = displayValue;
    
    // Caso cuando formatNumber es false - mantener el valor como string sin parsing
    if (!formatNumber) {
      if (onChange && String(value) !== currentValue) {
        const newEvent = {
          ...e,
          target: {
            ...e.target,
            name,
            value: currentValue, // Mantener como string
          },
        };
        onChange(newEvent);
      }
      onBlur?.(e);
      return;
    }

    // Lógica original para cuando formatNumber es true
    let numericValue: number | undefined = undefined;
    let valueToSend: number | string | undefined = undefined;

    let cleanedValue = "";
    if (currencyFormat) {
      cleanedValue = currentValue.replace(/[^0-9.]/g, "");
      const parts = cleanedValue.split(".");
      if (parts.length > 2) {
        cleanedValue = parts[0] + "." + parts.slice(1).join("");
      }
      if (cleanedValue === ".") cleanedValue = "";
    } else {
      cleanedValue = currentValue.replace(/[^0-9]/g, "");
    }

    const parsed = currencyFormat
      ? parseFloat(cleanedValue)
      : parseInt(cleanedValue, 10);

    if (!isNaN(parsed)) {
      numericValue = parsed;

      if (min !== undefined && numericValue < min) {
        numericValue = min;
      }
      if (max !== undefined && numericValue > max) {
        numericValue = max;
      }
      valueToSend = numericValue;

      setDisplayValue(formatValue(numericValue));
    } else {
      setDisplayValue("");
      valueToSend = undefined;
    }

    if (onChange && String(value) !== String(valueToSend)) {
      const newEvent = {
        ...e,
        target: {
          ...e.target,
          name,
          value: valueToSend,
        },
      };
      onChange(newEvent);
    } else if (
      String(value) === String(valueToSend) &&
      displayValue !== formatValue(value) &&
      !isNaN(parsed)
    ) {
      setDisplayValue(formatValue(value));
    } else if (isNaN(parsed)) {
      setDisplayValue("");
    }
  }
  onBlur?.(e);
};

  const currentLength = isNumberType
    ? (currencyFormat ? displayValue.replace(/[.,]/g, "") : displayValue).length
    : typeof value === "string"
    ? value.length
    : String(value ?? "").length;

     return (
     <div className={clsx("w-full", containerClassName)}>
         {isCheckboxOrRadio ? (
           // CHECKBOX / RADIO LAYOUT (Row)
           <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                name={name}
                id={name}
                type={type}
                checked={checked}
                onChange={handleTextChange} // Checkbox uses text change handler in original code? Or just onChange? Code at 410 uses handleTextChange for non-number.
                disabled={disabled}
                required={required}
                className={clsx(
                  "peer",
                  "form-radio h-4 w-4 text-slate-600 focus:ring-slate-500 transition-all duration-200",
                   type === "checkbox" && "form-checkbox rounded",
                   className,
                   { "opacity-50 cursor-not-allowed": disabled },
                   { "border-red-500": touched && error }
                )}
              />
              {label && (
                <label htmlFor={name} className="text-sm text-gray-700 select-none">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
              )}
           </div>
         ) : (
           // TEXT / NUMBER / TEXTAREA LAYOUT (Column)
           <div className="flex flex-col gap-1.5">
             {label && (
                <label
                  htmlFor={name}
                  className={clsx(
                    "text-sm font-medium text-gray-700",
                    { "text-red-500": touched && error },
                    labelClassName
                  )}
                >
                  {label}
                  {required && <span className="text-red-500 ml-1">*</span>}
                </label>
             )}
             
             <div className="relative w-full">
                {iconLeft && (
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 z-10">
                    {iconLeft}
                  </div>
                )}

                {isTextArea ? (
                  <textarea
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    value={value ?? ""}
                    onChange={readOnly ? undefined : onChange}
                    onBlur={readOnly ? undefined : onBlur}
                    readOnly={readOnly}
                    maxLength={maxLength}
                    minLength={minLength}
                    disabled={disabled}
                    required={required}
                    autoFocus={autoFocus}
                    onClick={onClick}
                    rows={rows}
                    className={clsx(
                      "peer",
                      "focus:outline-none w-full resize-none",
                      className,
                      { "cursor-not-allowed": disabled }
                    )}
                    style={getStyle()}
                  />
                ) : (
                  <input
                    ref={inputRef}
                    name={name}
                    id={name}
                    type={isNumberType ? "text" : type}
                    inputMode={
                      isNumberType
                        ? currencyFormat
                          ? "decimal"
                          : "numeric"
                        : undefined
                    }
                    placeholder={placeholder}
                    value={isNumberType ? displayValue : String(value ?? "")}
                    // checked not needed here
                    onChange={isNumberType ? handleNumberChange : handleTextChange}
                    onFocus={isNumberType ? handleFocus : () => setIsFocused(true)}
                    onBlur={
                      isNumberType
                        ? handleBlur
                        : (e) => {
                            setIsFocused(false);
                            onBlur?.(e);
                          }
                    }
                    onKeyDown={isNumberType ? handleKeyDown : undefined}
                    readOnly={readOnly}
                    maxLength={isNumberType && !currencyFormat ? maxLength : undefined}
                    minLength={minLength}
                    min={min}
                    max={max}
                    disabled={disabled}
                    required={required}
                    autoFocus={autoFocus}
                    onClick={focusContent ? handleClick : onClick}
                    className={clsx(
                      "peer",
                      "focus:outline-none w-full",
                      className,
                      { "cursor-not-allowed": disabled },
                      { "pl-10": iconLeft },
                      { "pr-10": iconRight }
                    )}
                    style={getStyle()}
                  />
                )}

                {iconRight && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 z-10">
                    {iconRight}
                  </div>
                )}
             </div>
           </div>
         )}

             {/* Validation message aligned with input */}
       {touched && error && !isCheckboxOrRadio && (
         <div className="flex-shrink-0 min-w-[140px] flex items-center pt-3">
           <p className="text-red-500 text-xs">{error}</p>
         </div>
       )}
       
       {/* Length hint below if needed */}
       {showHintLength && (minLength || maxLength) && !isCheckboxOrRadio && (
         <div className="mt-1 text-xs">
           <p className="text-gray-500">
             {currentLength}{maxLength && `/${maxLength}`}
           </p>
         </div>
       )}
       
       {/* Validation for checkbox/radio - keep below */}
       {isCheckboxOrRadio && touched && error && (
         <div className="mt-1 text-xs">
           <p className="text-red-500">{error}</p>
         </div>
       )}
    </div>
  );
}
