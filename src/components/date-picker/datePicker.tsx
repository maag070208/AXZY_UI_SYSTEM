import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import ITCalendar from "../calendar/calendar";
import ITInput from "../input/input";
import { ITDatePickerProps } from "./date-picker.props";
import { theme } from "@/theme/theme";

export default function ITDatePicker({
  name,
  value,
  onChange,
  onBlur,
  variant = "primary",
  size = "medium",
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
}: ITDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isValidDate, setIsValidDate] = useState(true);
  const [lastValidDate, setLastValidDate] = useState<Date>(new Date(value));

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });

  const dateValue = React.useMemo(
    () => (typeof value === "string" ? new Date(value) : value),
    [value]
  );

  useEffect(() => {
    if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
      setInputValue(formatDate(dateValue));
      setLastValidDate(dateValue);
    } else {
      setInputValue("");
    }
  }, [dateValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const calculateCalendarPosition = () => {
    if (wrapperRef.current) {
      const inputRect = wrapperRef.current.getBoundingClientRect();
      const calendarHeight = 300;
      const viewportHeight = window.innerHeight;

      let top = inputRect.bottom + 4;
      if (inputRect.bottom + calendarHeight > viewportHeight) {
        top = inputRect.top - calendarHeight - 4;
      }

      setCalendarPosition({
        top,
        left: inputRect.left,
      });
    }
  };

  const handleDateChange = (date: Date) => {
    const event = {
      target: {
        name,
        value: date,
      },
    };
    onChange(event);
    setLastValidDate(date);
    setInputValue(formatDate(date));
    setIsOpen(false);
  };

  const handleIconClick = () => {
    if (!disabled) {
      calculateCalendarPosition();
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
      setLastValidDate(date);
      setIsValidDate(true);
    } else {
      setIsValidDate(false);
    }
  };

  const handleInputBlur = () => {
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
        onBlur({ target: { name, value: date } });
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
              className="text-slate-900 cursor-pointer"
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

      {isOpen && (
        <div
          className={clsx(
            "fixed z-[9999]",
            calendarClassName
          )}
          style={{
            top: `${calendarPosition.top}px`,
            left: `${calendarPosition.left}px`,
             backgroundColor: theme.card.backgroundColor,
             borderColor: theme.card.borderColor,
             borderWidth: '1px',
             borderStyle: 'solid',
             borderRadius: theme.card.borderRadius,
             boxShadow: theme.card.shadow,
             padding: '0.5rem', // Added a bit of padding for the calendar inside
          }}
        >
          <ITCalendar
            value={dateValue}
            onChange={handleDateChange}
            minDate={minDate}
            maxDate={maxDate}
            className="h-auto border-none shadow-none w-full"
          />
        </div>
      )}
    </div>
  );
}
