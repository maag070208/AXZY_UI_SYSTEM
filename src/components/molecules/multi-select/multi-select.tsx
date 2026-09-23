import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaCheck, FaChevronDown, FaSearch, FaTimes } from "react-icons/fa";
import { ITMultiSelectOption, ITMultiSelectProps } from "./multi-select.props";
import { theme } from "@/theme/theme";
import { useFloatingPanel } from "@/hooks/useFloatingPanel";
import { inputFieldStyle } from "@/utils/styles";
import ITChip from "@/components/atoms/chip/chip";
import ITText from "@/components/atoms/text/text";

/**
 * Multi-value select with searchable dropdown, removable chips, and keyboard navigation.
 *
 * Supports local filtering and remote search (`onSearch`), a collapsed chip
 * summary (`maxVisibleChips`), and custom option templates (`renderOption`).
 * The dropdown is portaled so it is never clipped by cards or overflow ancestors.
 *
 * @example
 * <ITMultiSelect
 *   label="Skills"
 *   options={skills}
 *   value={selected}
 *   onChange={(values) => setSelected(values)}
 * />
 *
 * @example
 * <ITMultiSelect
 *   label="Etiquetas"
 *   options={tags}
 *   value={selected}
 *   onChange={(values) => setSelected(values)}
 *   maxVisibleChips={2}
 *   renderOption={(option, { isSelected }) => (
 *     <span className={isSelected ? "font-bold" : ""}>{option.label}</span>
 *   )}
 * />
 */
export default function ITMultiSelect({
  name,
  label,
  placeholder = "Selecciona opciones",
  options,
  value,
  onChange,
  onBlur,
  valueField = "value",
  labelField = "label",
  disabled = false,
  readOnly = false,
  required = false,
  touched,
  error,
  size = "md",
  maxVisibleChips = 3,
  clearable = true,
  searchable = true,
  onSearch,
  isLoading = false,
  noResultsMessage = "No se encontraron resultados",
  renderOption,
  className,
}: ITMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [localTouched, setLocalTouched] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { panelRef, style: panelStyle } = useFloatingPanel(controlRef, isOpen, {
    estimatedHeight: 260,
    matchWidth: true,
  });

  const selectedOptions = useMemo(
    () => options.filter((opt) => value.includes(opt[valueField])),
    [options, value, valueField]
  );

  const filteredOptions = useMemo(() => {
    if (onSearch) return options;
    if (!searchTerm) return options;
    return options.filter((opt) =>
      String(opt[labelField]).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm, onSearch, labelField]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (!containerRef.current?.contains(target) && !panelRef.current?.contains(target)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [panelRef]);

  const inputTheme = (theme as any).input || {};

  const isTouched = touched !== undefined ? touched : localTouched;
  const isEmpty = value.length === 0;
  const effectiveError =
    error !== undefined && error !== false
      ? error === true
        ? "Este campo es requerido"
        : error
      : required && isEmpty
      ? "Este campo es requerido"
      : undefined;
  const hasError = isTouched && !!effectiveError;
  const errorMessage = typeof effectiveError === "string" ? effectiveError : "Este campo es requerido";

  const getControlStyle = (): React.CSSProperties => {
    const style = inputFieldStyle(inputTheme, size, { width: "100%", cursor: "text" });
    style.display = "flex";
    style.flexWrap = "wrap";
    style.alignItems = "center";
    style.gap = "0.375rem";
    style.minHeight = "2.5rem";

    if (disabled) {
      style.backgroundColor = inputTheme.disabled?.backgroundColor || style.backgroundColor;
      style.borderColor = inputTheme.disabled?.borderColor || style.borderColor;
      style.opacity = 0.7;
      style.cursor = "not-allowed";
    }
    if (hasError) {
      style.borderColor = inputTheme.error?.borderColor || "red";
    } else if (isFocused && !readOnly) {
      style.boxShadow = inputTheme.focus?.ring;
      style.borderColor = inputTheme.focus?.borderColor;
    }
    return style;
  };

  const open = () => {
    if (disabled || readOnly) return;
    setIsOpen(true);
  };

  const handleControlClick = () => {
    if (disabled || readOnly) return;
    inputRef.current?.focus();
    open();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    open();
    if (onSearch) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => onSearch(query), 500);
    }
  };

  const toggleOption = (option: ITMultiSelectOption) => {
    if (disabled || readOnly) return;
    const optValue = option[valueField];
    const isSelected = value.includes(optValue);
    const nextValues = isSelected
      ? value.filter((v) => v !== optValue)
      : [...value, optValue];
    const nextOptions = options.filter((opt) => nextValues.includes(opt[valueField]));
    onChange?.(nextValues, nextOptions);
  };

  const handleClear = () => {
    if (disabled || readOnly) return;
    onChange?.([], []);
    setSearchTerm("");
    if (onSearch) onSearch("");
    inputRef.current?.focus();
  };

  const moveActive = (dir: 1 | -1) => {
    if (!filteredOptions.length) return;
    const next =
      activeIndex === -1
        ? dir === 1
          ? 0
          : filteredOptions.length - 1
        : (activeIndex + dir + filteredOptions.length) % filteredOptions.length;
    setActiveIndex(next);
    optionRefs.current[next]?.scrollIntoView({ block: "nearest" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled || readOnly) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) open();
      else moveActive(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) open();
      else moveActive(-1);
    } else if (e.key === "Enter") {
      if (isOpen && activeIndex >= 0 && filteredOptions[activeIndex]) {
        e.preventDefault();
        toggleOption(filteredOptions[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Backspace" && searchTerm === "" && value.length > 0) {
      e.preventDefault();
      const nextValues = value.slice(0, -1);
      const nextOptions = options.filter((opt) => nextValues.includes(opt[valueField]));
      onChange?.(nextValues, nextOptions);
    }
  };

  const handleFocus = () => {
    if (disabled || readOnly) return;
    setIsFocused(true);
    open();
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setLocalTouched(true);
    setIsFocused(false);
    onBlur?.(e);
  };

  const visibleChips = selectedOptions.slice(0, maxVisibleChips);
  const hiddenCount = selectedOptions.length - visibleChips.length;
  const showClear = clearable && !disabled && !readOnly && value.length > 0;

  return (
    <div className={clsx("w-full flex flex-col gap-1.5", className)} ref={containerRef}>
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
        <div
          ref={controlRef}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
          onClick={handleControlClick}
          className="flex items-center"
          style={getControlStyle()}
        >
          {visibleChips.map((opt) => (
            <ITChip
              key={String(opt[valueField])}
              label={String(opt[labelField])}
              color="primary"
              size="sm"
              removable={!disabled && !readOnly}
              onRemove={() => toggleOption(opt)}
            />
          ))}
          {hiddenCount > 0 && (
            <ITChip label={`+${hiddenCount}`} color="secondary" size="sm" />
          )}

          <input
            ref={inputRef}
            name={name}
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            readOnly={readOnly || !searchable}
            placeholder={selectedOptions.length === 0 ? placeholder : ""}
            autoComplete="off"
            aria-autocomplete="list"
            aria-activedescendant={activeIndex >= 0 ? `it-multiselect-opt-${activeIndex}` : undefined}
            className="flex-1 min-w-[60px] bg-transparent outline-none border-none text-sm text-secondary-900 dark:text-slate-100"
            style={{ padding: 0, fontSize: inputFieldStyle(inputTheme, size).fontSize }}
          />

          <div className="ml-auto flex items-center gap-2 pl-1 text-secondary-400 shrink-0">
            {isLoading ? (
              <div className="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full" />
            ) : showClear ? (
              <button
                type="button"
                aria-label="Limpiar selección"
                title="Limpiar selección"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClear();
                }}
                className="flex items-center justify-center hover:text-secondary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-full"
              >
                <FaTimes size={12} />
              </button>
            ) : (
              <FaSearch size={13} className="pointer-events-none" />
            )}
            <FaChevronDown
              size={12}
              className={clsx("pointer-events-none transition-transform", isOpen && "rotate-180")}
            />
          </div>
        </div>

        {isOpen &&
          createPortal(
            <div
              ref={panelRef}
              role="listbox"
              aria-multiselectable="true"
              style={panelStyle}
              className="bg-white dark:bg-slate-900 border border-secondary-200 dark:border-slate-800 rounded-lg shadow-xl overflow-hidden"
            >
              <div className="max-h-60 overflow-y-auto">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => {
                    const isSelected = value.includes(option[valueField]);
                    return (
                      <div
                        id={`it-multiselect-opt-${index}`}
                        key={String(option[valueField])}
                        ref={(el) => { optionRefs.current[index] = el; }}
                        role="option"
                        aria-selected={isSelected}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => toggleOption(option)}
                        className={clsx(
                          "flex items-center gap-2 px-4 py-2 text-sm cursor-pointer transition-colors",
                          activeIndex === index && "bg-secondary-50 dark:bg-slate-800",
                          isSelected
                            ? "text-primary-700 dark:text-primary-300 font-medium"
                            : "text-secondary-700 dark:text-slate-300"
                        )}
                      >
                        <span
                          className={clsx(
                            "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                            isSelected
                              ? "bg-primary-500 border-primary-500 text-white"
                              : "border-secondary-300 dark:border-slate-600"
                          )}
                        >
                          {isSelected && <FaCheck size={9} />}
                        </span>
                        <span className="flex-1 truncate">
                          {renderOption
                            ? renderOption(option, { isSelected, searchTerm })
                            : option[labelField]}
                        </span>
                      </div>
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

      {hasError && (
        <ITText as="p" className="text-danger-500 text-xs mt-1">{errorMessage}</ITText>
      )}
    </div>
  );
}
