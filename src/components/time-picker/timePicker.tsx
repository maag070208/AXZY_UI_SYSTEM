import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { FaClock } from "react-icons/fa";
import ITInput from "../input/input";
import ITButton from "../button/button";
import { ITTimePickerProps } from "./timePicker.props";
import { theme } from "@/theme/theme";

export default function ITTimePicker({
  name,
  value,
  label,
  placeholder = "HH:MM",
  onChange,
  onBlur,
  required,
  touched,
  error,
  disabled,
  className,
  size = "medium",
  variant = "primary",
  color = "primary",
}: ITTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const [isValidTime, setIsValidTime] = useState(true);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);

  // Resolve theme color for the dropdown highlight
  const isThemeColor = color in theme.colors;
  const highlightColor = isThemeColor
    ? theme.colors[color as keyof typeof theme.colors][50]
    : "#f3f4f6"; // fallback to gray-100

  const activeColor = isThemeColor
    ? theme.colors[color as keyof typeof theme.colors][100]
    : "#e5e7eb"; // fallback to gray-200

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

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

  const validateTime = (timeString: string) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(timeString);
  };

  const currentHour = validateTime(inputValue) ? inputValue.split(":")[0] : null;
  const currentMinute = validateTime(inputValue) ? inputValue.split(":")[1] : null;

  // Auto-scroll to selected items when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (hoursRef.current && currentHour) {
          const selectedHourEl = hoursRef.current.querySelector(
            `[data-value="${currentHour}"]`
          ) as HTMLElement;
          if (selectedHourEl) {
            hoursRef.current.scrollTop =
              selectedHourEl.offsetTop -
              hoursRef.current.clientHeight / 2 +
              selectedHourEl.clientHeight / 2;
          }
        }
        if (minutesRef.current && currentMinute) {
          const selectedMinuteEl = minutesRef.current.querySelector(
            `[data-value="${currentMinute}"]`
          ) as HTMLElement;
          if (selectedMinuteEl) {
            minutesRef.current.scrollTop =
              selectedMinuteEl.offsetTop -
              minutesRef.current.clientHeight / 2 +
              selectedMinuteEl.clientHeight / 2;
          }
        }
      }, 50);
    }
  }, [isOpen, currentHour, currentMinute]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");

    if (val.length > 4) val = val.slice(0, 4);

    if (val.length >= 3) {
      val = `${val.slice(0, 2)}:${val.slice(2)}`;
    }

    setInputValue(val);

    if (validateTime(val)) {
      setIsValidTime(true);
      onChange({ target: { name, value: val } });
    } else {
      setIsValidTime(false);
    }
  };

  const handleBlurInput = () => {
    if (!validateTime(inputValue)) {
      setIsValidTime(false);
      onBlur({ target: { name, value } });
      return;
    }

    setIsValidTime(true);
    onBlur({ target: { name, value: inputValue } });
  };

  const handleHourSelect = (h: string) => {
    const min = currentMinute || "00";
    const newVal = `${h}:${min}`;
    setInputValue(newVal);
    onChange({ target: { name, value: newVal } });
    setIsValidTime(true);
  };

  const handleMinuteSelect = (m: string) => {
    const hr = currentHour || "00";
    const newVal = `${hr}:${m}`;
    setInputValue(newVal);
    onChange({ target: { name, value: newVal } });
    setIsValidTime(true);
  };

  const handleConfirm = () => {
    setIsOpen(false);
  };

  const hoursList = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutesList = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  return (
    <div ref={wrapperRef} className={clsx("relative w-full", className)}>
      <ITInput
        name={name}
        label={label}
        placeholder={placeholder}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlurInput}
        maxLength={5}
        required={required}
        disabled={disabled}
        variant={variant}
        size={size}
        touched={touched}
        error={!isValidTime ? "Hora inválida" : error}
        iconRight={
          <FaClock
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={clsx(
              "cursor-pointer transition-colors",
              disabled
                ? "text-slate-400 cursor-not-allowed"
                : "text-slate-900 hover:text-slate-600"
            )}
          />
        }
      />

      {isOpen && !disabled && (
        <div className="absolute z-[9999] bg-white border border-gray-100 shadow-xl rounded-xl mt-2 w-64 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 origin-top">
          <div className="flex bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div className="flex-1 text-center py-2 border-r border-gray-100">
              Horas
            </div>
            <div className="flex-1 text-center py-2">Minutos</div>
          </div>

          <div className="flex h-56 relative bg-white">
            {/* Hours Column */}
            <div
              ref={hoursRef}
              className="flex-1 overflow-y-auto no-scrollbar border-r border-gray-50 scroll-smooth relative"
            >
              <div className="py-2">
                {hoursList.map((h) => {
                  const isSelected = currentHour === h;
                  return (
                    <div
                      key={h}
                      data-value={h}
                      className={clsx(
                        "text-center py-2 cursor-pointer transition-all duration-200 text-sm font-medium mx-2 rounded-lg my-1",
                        isSelected
                          ? "text-slate-900 shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      )}
                      style={{
                        backgroundColor: isSelected ? activeColor : undefined,
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected)
                          e.currentTarget.style.backgroundColor = highlightColor;
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected)
                          e.currentTarget.style.backgroundColor = "transparent";
                      }}
                      onClick={() => handleHourSelect(h)}
                    >
                      {h}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Minutes Column */}
            <div
              ref={minutesRef}
              className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative"
            >
              <div className="py-2">
                {minutesList.map((m) => {
                  const isSelected = currentMinute === m;
                  return (
                    <div
                      key={m}
                      data-value={m}
                      className={clsx(
                        "text-center py-2 cursor-pointer transition-all duration-200 text-sm font-medium mx-2 rounded-lg my-1",
                        isSelected
                          ? "text-slate-900 shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      )}
                      style={{
                        backgroundColor: isSelected ? activeColor : undefined,
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected)
                          e.currentTarget.style.backgroundColor = highlightColor;
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected)
                          e.currentTarget.style.backgroundColor = "transparent";
                      }}
                      onClick={() => handleMinuteSelect(m)}
                    >
                      {m}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Center Selection Overlay */}
            <div className="absolute top-1/2 left-0 right-0 h-10 -mt-5 bg-black/5 pointer-events-none border-y border-black/10 z-10" />
          </div>

          <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end">
            <ITButton
              variant="solid"
              color={color as any}
              size="small"
              onClick={handleConfirm}
            >
              Aceptar
            </ITButton>
          </div>
        </div>
      )}
    </div>
  );
}
