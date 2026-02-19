import clsx from "clsx";
import { FaAngleDown } from "react-icons/fa";
import { ITSelectProps } from "./select.props";
import { theme } from "@/theme/theme";
import { useState } from "react";

/**
 * Componente de selección (select) con soporte para opciones personalizadas, validación y personalización de estilo.
 * Matches styles of ITInput.
 */
export default function ITSelect({
  name,
  options,
  label,
  placeholder,
  valueField = "value",
  labelField = "label",
  value,
  onChange,
  onBlur,
  disabled = false,
  className,
  touched,
  required,
  error,
  readOnly = false,
}: ITSelectProps) {
    const [isFocused, setIsFocused] = useState(false);

    // Theme logic - reuse input theme for consistency
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
            color: theme.colors.gray[900],
            appearance: 'none', // Important for custom styling
        };

        if (disabled) {
            style.backgroundColor = inputTheme.disabled?.backgroundColor || style.backgroundColor;
            style.borderColor = inputTheme.disabled?.borderColor || style.borderColor;
            style.opacity = 0.7;
        }

        if (touched && error) {
            style.borderColor = inputTheme.error?.borderColor || 'red';
            if (isFocused) {
                 style.boxShadow = inputTheme.error?.ring;
            }
        } else if (isFocused && !readOnly) {
             style.boxShadow = inputTheme.focus?.ring;
        }

        return style;
    };

     return (
     <div className="w-full">
       <div className={clsx("relative", {
         "flex flex-col gap-1.5": label,
       })}>
         {label && (
           <label
             htmlFor={name}
             className={clsx(
               "text-sm font-medium text-gray-700 pt-0",
               { "text-red-500": touched && error }
             )}
           >
             {label}
             {required && <span className="text-red-500 ml-1">*</span>}
           </label>
         )}
         <div className="flex flex-col w-full">
           <div className="relative flex-1">
           <select
             name={name}
             id={name}
             value={value}
             onChange={readOnly ? undefined : onChange}
             onBlur={(e) => {
                 setIsFocused(false);
                 readOnly ? undefined : onBlur?.(e);
             }}
             onFocus={() => setIsFocused(true)}
             disabled={disabled}
             className={clsx(
               "w-full focus:outline-none", // Core structure only
               className,
               { "cursor-not-allowed": disabled }
             )}
             style={getStyle()}
           >
             <option value="">{placeholder || "Selecciona una opción"}</option>
             {
               readOnly ? (
                 <option value={value} disabled>
                   {options.find((option) => option[valueField] === value)?.[labelField]}
                 </option>
               ) : (
                 options.map((option) => (
                   <option
                     key={option[valueField]}
                     value={option[valueField]}
                     title={option[labelField]}
                   >
                     {option[labelField]}
                   </option>
                 ))
               )
             }
           </select>
           <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
             <FaAngleDown />
           </div>
         </div>
         {/* Validation message aligned with select */}
         {touched && error && (
           <div className="flex-shrink-0 min-w-[140px] flex items-center pt-3">
             <p className="text-red-500 text-xs">{error}</p>
           </div>
         )}
         </div>
        
       </div>
     </div>
   );
}
