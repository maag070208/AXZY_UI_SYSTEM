import React, { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { FaSearch, FaTimes } from "react-icons/fa";
import { ITSearchSelectProps, ITSearchSelectOption } from "./search-select.props";
import { theme, inputSizeTokens } from "@/theme/theme";
import { useFloatingPanel } from "@/hooks/useFloatingPanel";
import ITText from "@/components/atoms/text/text";

/**
 * Searchable dropdown select with local client-side filtering and server-side search via API.
 *
 * @example
 * ```tsx
 * // Static options (Mode 1)
 * <ITSearchSelect
 *   label="Country"
 *   placeholder="Select a country"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'mx', label: 'Mexico' },
 *   ]}
 *   value={selectedCountry}
 *   onChange={(value) => setSelectedCountry(value)}
 * />
 *
 * // API search (Mode 2)
 * <ITSearchSelect
 *   label="User"
 *   placeholder="Search users..."
 *   onSearch={(query) => searchUsers(query)}
 *   options={apiResults}
 *   isLoading={isSearching}
 *   value={selectedUser}
 *   onChange={(value) => setSelectedUser(value)}
 * />
 *
 * // Custom option template + clear button
 * <ITSearchSelect
 *   label="User"
 *   options={users}
 *   value={selectedUser}
 *   onChange={(value) => setSelectedUser(value)}
 *   onClear={() => console.log("cleared")}
 *   renderOption={(option, { isSelected }) => (
 *     <span className={isSelected ? "font-bold" : ""}>{option.label}</span>
 *   )}
 * />
 * ```
 */
export default function ITSearchSelect({
  name,
  options = [],
  label,
  placeholder = "Selecciona una opción",
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
  onSearch,
  isLoading = false,
  noResultsMessage = "No se encontraron resultados",
  size = "md",
  renderOption,
  clearable = true,
  onClear,
}: ITSearchSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [localTouched, setLocalTouched] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Panel position (rendered in a portal so it escapes overflow/transform ancestors).
  const { panelRef, style: panelStyle } = useFloatingPanel(inputWrapperRef, isOpen, {
    estimatedHeight: 260,
    matchWidth: true,
  });

  // Encontrar la opción seleccionada inicialmente
  const selectedOption = useMemo(() => {
    return options.find((opt) => opt[valueField] === value);
  }, [options, value, valueField]);

  // Sincronizar el searchTerm con el label de la opción seleccionada si no se está editando
  useEffect(() => {
    if (!isFocused) {
      setSearchTerm(selectedOption ? String(selectedOption[labelField]) : "");
    }
  }, [selectedOption, isFocused, labelField]);

  // Cerrar el dropdown al hacer click afuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const inContainer = containerRef.current?.contains(target);
      const inPanel = panelRef.current?.contains(target);
      if (!inContainer && !inPanel) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtrado local de opciones (Modo 1)
  const selectedLabel = selectedOption ? String(selectedOption[labelField]) : "";
  const filteredOptions = useMemo(() => {
    if (onSearch) return options; // Modo API
    // Show every option while the input still displays the selected label;
    // filter only once the user actually types a different query.
    if (!searchTerm || !isFocused || searchTerm === selectedLabel) return options;
    return options.filter((opt) =>
      String(opt[labelField]).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm, selectedLabel, onSearch, labelField, isFocused]);

  // Manejar cambio en el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    setIsOpen(true);

    if (onSearch) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onSearch(query);
      }, 500);
    }
  };

  const handleSelect = (option: ITSearchSelectOption) => {
    if (onChange) {
      onChange(option[valueField], option);
    }
    setSearchTerm(String(option[labelField]));
    setIsOpen(false);
  };

  const handleClear = () => {
    setSearchTerm("");
    setIsOpen(true);
    if (onSearch) onSearch("");
    if (value !== undefined && value !== null && value !== "") {
      onChange?.("", undefined);
    }
    onClear?.();
  };

  const handleFocus = () => {
    if (disabled || readOnly) return;
    setIsFocused(true);
    setIsOpen(true);
    // Opcional: borrar el texto al entrar para facilitar la búsqueda
    // setSearchTerm(""); 
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Retrasar el cierre para permitir el click en la opción
    setTimeout(() => {
      setIsFocused(false);
      setLocalTouched(true);
      onBlur?.(e);
    }, 200);
  };

  // Theme logic
  const inputTheme = (theme as any).input || {};

  const isTouched = touched !== undefined ? touched : localTouched;
  const isEmpty = value === undefined || value === null || String(value).trim() === "";

  const effectiveError = error !== undefined && error !== false
    ? (error === true ? "Este campo es requerido" : error)
    : (required && isEmpty ? "Este campo es requerido" : undefined);

  const hasError = isTouched && !!effectiveError;
  const errorMessage = typeof effectiveError === "string" ? effectiveError : "Este campo es requerido";

  const showClearButton =
    clearable && !disabled && !readOnly && (searchTerm.length > 0 || !isEmpty);
  
  const getInputStyle = () => {
    const sizeConfig = inputSizeTokens[size] ?? inputSizeTokens.md;
    const style: React.CSSProperties = {
      backgroundColor: inputTheme.backgroundColor || "#ffffff",
      borderColor: inputTheme.borderColor || "var(--color-secondary-300)",
      borderRadius: inputTheme.borderRadius || "0.5rem",
      padding: sizeConfig.padding,
      fontSize: sizeConfig.fontSize,
      borderWidth: '1px',
      borderStyle: 'solid',
      transition: 'all 0.2s',
      color: 'var(--it-input-text-color, var(--color-secondary-900))',
      width: '100%',
    };

    if (disabled) {
      style.backgroundColor = inputTheme.disabled?.backgroundColor || "var(--color-secondary-100)";
      style.borderColor = inputTheme.disabled?.borderColor || "var(--color-secondary-200)";
      style.opacity = 0.7;
      style.cursor = "not-allowed";
    }

    if (hasError) {
      style.borderColor = inputTheme.error?.borderColor || 'red';
      if (isFocused) {
        style.boxShadow = inputTheme.error?.ring;
      }
    } else if (isFocused && !readOnly) {
      style.boxShadow = inputTheme.focus?.ring;
      style.borderColor = inputTheme.focus?.borderColor;
    }

    return style;
  };

  return (
    <div className={clsx("w-full flex flex-col gap-1.5", className, isOpen && "relative z-30")} ref={containerRef}>
      {label && (
        <ITText
          as="label"
          className={clsx("text-sm font-medium text-secondary-700 dark:text-slate-300", {
            "text-danger-500": hasError,
          })}
        >
          <ITText as="span">{label}</ITText>
          {required && <ITText as="span" className="text-danger-500 ml-1">*</ITText>}
        </ITText>
      )}

      <div className="relative">
        <div ref={inputWrapperRef} className="relative flex items-center">
          <input
            type="text"
            name={name}
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleInputBlur}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            className="outline-none pr-10"
            style={getInputStyle()}
            autoComplete="off"
          />
          <div className="absolute right-3 flex items-center gap-2 text-secondary-400">
             {isLoading && (
               <div className="pointer-events-none animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full" />
             )}
             {!isLoading && showClearButton && (
               <button
                 type="button"
                 aria-label="Limpiar"
                 title="Limpiar"
                 onMouseDown={(e) => {
                   e.preventDefault();
                   handleClear();
                 }}
                 className="flex items-center justify-center text-secondary-400 hover:text-secondary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-full"
               >
                 <FaTimes size={14} />
               </button>
             )}
             {!isLoading && !showClearButton && (
               <FaSearch size={14} className={clsx("pointer-events-none", { "text-primary-500": isFocused })} />
             )}
          </div>
        </div>

        {/* Dropdown Panel (portal: escapes overflow-hidden / transform ancestors) */}
        {isOpen &&
          createPortal(
            <div
              ref={panelRef}
              style={panelStyle}
              className="bg-white dark:bg-slate-900 border border-secondary-200 dark:border-slate-800 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 origin-top"
            >
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected = value === option[valueField];
                  return (
                    <ITText
                      as="div"
                      key={option[valueField]}
                      onClick={() => handleSelect(option)}
                      className={clsx(
                        "px-4 py-2 text-sm cursor-pointer transition-colors",
                        isSelected
                          ? "bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 font-medium"
                          : "hover:bg-secondary-50 dark:hover:bg-slate-800 text-secondary-700 dark:text-slate-300"
                      )}
                    >
                      {renderOption ? (
                        renderOption(option, { isSelected, searchTerm })
                      ) : (
                        <ITText as="span">{option[labelField]}</ITText>
                      )}
                    </ITText>
                  );
                })
              ) : (
                <ITText as="div" className="px-4 py-6 text-sm text-center text-secondary-500 italic">
                  {isLoading ? "Cargando..." : noResultsMessage}
                </ITText>
              )}
            </div>
            </div>,
            document.body
          )}
      </div>

      {/* Error Message */}
      {hasError && (
        <ITText as="p" className="text-danger-500 text-xs mt-1">{errorMessage}</ITText>
      )}
    </div>
  );
}
