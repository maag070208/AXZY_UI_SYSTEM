import React, { useState, useEffect, useRef, useMemo } from "react";
import clsx from "clsx";
import { FaAngleDown, FaSearch, FaTimes } from "react-icons/fa";
import { ITSearchSelectProps, ITSearchSelectOption } from "./search-select.props";
import { theme } from "@/theme/theme";
import ITText from "@/components/text/text";

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
}: ITSearchSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [localTouched, setLocalTouched] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtrado local de opciones (Modo 1)
  const filteredOptions = useMemo(() => {
    if (onSearch) return options; // Modo API
    if (!searchTerm || !isFocused) return options;
    return options.filter((opt) =>
      String(opt[labelField]).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm, onSearch, labelField, isFocused]);

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
  
  const getInputStyle = () => {
    const style: React.CSSProperties = {
      backgroundColor: inputTheme.backgroundColor || "#ffffff",
      borderColor: inputTheme.borderColor || "#e2e8f0",
      borderRadius: inputTheme.borderRadius || "0.5rem",
      padding: inputTheme.padding || "0.5rem 0.75rem",
      fontSize: inputTheme.fontSize || "0.875rem",
      borderWidth: '1px',
      borderStyle: 'solid',
      transition: 'all 0.2s',
      color: 'var(--input-text-color, var(--color-secondary-900))',
      width: '100%',
    };

    if (disabled) {
      style.backgroundColor = inputTheme.disabled?.backgroundColor || "#f1f5f9";
      style.borderColor = inputTheme.disabled?.borderColor || "#e2e8f0";
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
          className={clsx("text-sm font-medium text-gray-700 dark:text-slate-300", {
            "text-red-500": hasError,
          })}
        >
          <ITText as="span">{label}</ITText>
          {required && <ITText as="span" className="text-red-500 ml-1">*</ITText>}
        </ITText>
      )}

      <div className="relative">
        <div className="relative flex items-center">
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
          <div className="absolute right-3 flex items-center gap-2 text-gray-400 pointer-events-none">
             {isLoading && <div className="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full" />}
             {!isLoading && <FaSearch size={14} className={clsx({ "text-primary-500": isFocused })} />}
          </div>
        </div>

        {/* Dropdown Panel */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 origin-top">
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <ITText
                    as="div"
                    key={option[valueField]}
                    onClick={() => handleSelect(option)}
                    className={clsx(
                      "px-4 py-2 text-sm cursor-pointer transition-colors",
                      value === option[valueField]
                        ? "bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 font-medium"
                        : "hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300"
                    )}
                  >
                    <ITText as="span">{option[labelField]}</ITText>
                  </ITText>
                ))
              ) : (
                <ITText as="div" className="px-4 py-6 text-sm text-center text-gray-500 italic">
                  {isLoading ? "Cargando..." : noResultsMessage}
                </ITText>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {hasError && (
        <ITText as="p" className="text-red-500 text-xs mt-1">{errorMessage}</ITText>
      )}
    </div>
  );
}
