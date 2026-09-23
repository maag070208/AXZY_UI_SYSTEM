import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { isBefore } from "date-fns";
import ITCalendar from "@/components/molecules/calendar/calendar";
import ITInput from "@/components/atoms/input/input";
import { ITDatePickerProps } from "./date-picker.props";
import { useFloatingPanel } from "@/hooks/useFloatingPanel";
import { theme } from "@/theme/theme";

/**
 * Date picker component with single-date and date-range modes.
 *
 * Supports manual text input (DD/MM/YYYY format) and a calendar popover.
 * In range mode the user selects a start date then an end date; the calendar
 * highlights the interval. Position-aware popover flips above the input when
 * near the bottom of the viewport.
 *
 * @example
 * ```tsx
 * <ITDatePicker
 *   name="birthDate"
 *   label="Date of birth"
 *   value={date}
 *   onChange={(e) => setDate(e.target.value)}
 *   maxDate={new Date()}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <ITDatePicker
 *   name="travelRange"
 *   label="Travel dates"
 *   range
 *   value={[startDate, endDate]}
 *   onChange={(e) => setRange(e.target.value)}
 * />
 * ```
 */
export default function ITDatePicker({
  name,
  value,
  onChange,
  onBlur,
  variant = "primary",
  size = "md",
  className,
  calendarClassName,
  disabled = false,
  label,
  touched,
  error,
  required,
  placeholder,
  minDate,
  maxDate,
  range = false,
}: ITDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isValidDate, setIsValidDate] = useState(true);
  
  // For range selection, we'll keep track of the internal state if not provided
  const [internalRange, setInternalRange] = useState<[Date | null, Date | null]>([null, null]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Calendar position (rendered in a portal so it escapes overflow/transform ancestors).
  const { panelRef, style: panelStyle } = useFloatingPanel(wrapperRef, isOpen, {
    estimatedHeight: 360,
    matchWidth: false,
  });

  // Normalize single vs range values
  const dateRange = React.useMemo(() => {
    if (range) {
      if (Array.isArray(value)) return value;
      return internalRange;
    }
    return [value instanceof Date ? value : null, null] as [Date | null, Date | null];
  }, [value, range, internalRange]);

  const [startDate, endDate] = dateRange;

  useEffect(() => {
    if (range) {
      if (startDate && endDate) {
        setInputValue(`${formatDate(startDate)} - ${formatDate(endDate)}`);
      } else if (startDate) {
        setInputValue(`${formatDate(startDate)} - ...`);
      } else {
        setInputValue("");
      }
    } else {
      if (startDate instanceof Date && !isNaN(startDate.getTime())) {
        setInputValue(formatDate(startDate));
      } else {
        setInputValue("");
      }
    }
  }, [startDate, endDate, range]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const inWrapper = wrapperRef.current?.contains(target);
      const inPanel = panelRef.current?.contains(target);
      if (!inWrapper && !inPanel) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateChange = (date: Date) => {
    if (range) {
      let newRange: [Date | null, Date | null];
      
      if (!startDate || (startDate && endDate)) {
        // Start a new range
        newRange = [date, null];
      } else {
        // Closing a range
        if (isBefore(date, startDate)) {
          newRange = [date, startDate];
        } else {
          newRange = [startDate, date];
        }
      }
      
      setInternalRange(newRange);
      
      // If range is complete, notify parent and close
      if (newRange[0] && newRange[1]) {
        onChange({
          target: {
            name,
            value: newRange,
          },
        });
        setIsOpen(false);
      } else {
        // Just notify start (optional, but good for reactivity)
        onChange({
          target: {
            name,
            value: newRange,
          },
        });
      }
    } else {
      const event = {
        target: {
          name,
          value: date,
        },
      };
      onChange(event);
      setInputValue(formatDate(date));
      setIsOpen(false);
    }
  };

  const handleIconClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const formatDate = (date: Date) =>
    date
      .toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "/");

  const validateDate = (dateString: string) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateString.match(regex);
    if (!match) return false;

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 8) val = val.slice(0, 8);

    if (val.length > 4) {
      val = `${val.slice(0, 2)}/${val.slice(2, 4)}/${val.slice(4)}`;
    } else if (val.length > 2) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }

    setInputValue(val);

    if (val.length === 10 && validateDate(val)) {
      const [day, month, year] = val.split("/").map(Number);
      const date = new Date(year, month - 1, day);
      const event = {
        target: {
          name,
          value: date,
        },
      };
      onChange(event);
      onChange(event);
      setIsValidDate(true);
    } else {
      setIsValidDate(false);
    }
  };

  const handleInputBlur = () => {
    if (range) {
      // For range, simple text input is harder to validate without complex logic
      // We'll rely on calendar for now to avoid breaking the UX
      return;
    }
    
    if (!validateDate(inputValue)) {
      // Si la fecha no es válida, usar la fecha de hoy
      const today = new Date();
      setInputValue(formatDate(today));
      const event = {
        target: {
          name,
          value: today,
        },
      };
      onChange(event);
      setIsValidDate(true);
    } else {
      // Solo construimos la fecha si es válida
      const [day, month, year] = inputValue.split("/").map(Number);
      const date = new Date(year, month - 1, day);

      if (!isNaN(date.getTime())) {
        onBlur?.({ target: { name, value: date } });
      } else {
        // fallback a hoy por seguridad
        const today = new Date();
        setInputValue(formatDate(today));
        onChange({ target: { name, value: today } });
      }
    }
  };

  return (
    <div ref={wrapperRef} className={clsx("relative w-full", className)}>
      <ITInput
        name={name}
        type="text"
        label={label}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        maxLength={10}
        iconRight={
          <span>
            <FaCalendarAlt
              onClick={handleIconClick}
              className="text-slate-500 dark:text-slate-400 cursor-pointer"
            />
          </span>
        }
        variant={variant}
        size={size}
        disabled={disabled}
        required={required}
        touched={touched}
        error={!isValidDate ? "Fecha inválida" : error}
        onClick={handleIconClick}
      />

      {isOpen &&
        createPortal(
          <div
            ref={panelRef}
            className={clsx(
              calendarClassName,
              range ? "w-[320px]" : "w-[280px]"
            )}
            style={{
              ...panelStyle,
              backgroundColor: theme.card.backgroundColor,
              borderColor: theme.card.borderColor,
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius: theme.card.borderRadius,
              boxShadow: theme.card.shadow,
              padding: "0.5rem",
            }}
          >
            <ITCalendar
              value={!range ? (startDate as Date) : undefined}
              startDate={startDate as Date}
              endDate={endDate as Date}
              selectionMode={range ? 'range' : 'single'}
              onChange={handleDateChange}
              minDate={minDate}
              maxDate={maxDate}
              variant={variant}
              className="h-auto border-none shadow-none w-full"
            />
          </div>,
          document.body
        )}
    </div>
  );
}
