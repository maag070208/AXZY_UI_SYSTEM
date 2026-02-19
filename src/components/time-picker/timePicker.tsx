import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { FaClock } from "react-icons/fa";
import ITInput from "../input/input";

export interface ITTimePickerProps {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  touched?: boolean;
  error?: string;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary";
}

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
}: ITTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const [isValidTime, setIsValidTime] = useState(true);

  const wrapperRef = useRef<HTMLDivElement>(null);

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

  const timeOptions = Array.from({ length: 24 }, (_, hour) =>
    Array.from({ length: 60 / 15 }, (_, step) => {
      const minute = step * 15;
      const hh = hour.toString().padStart(2, "0");
      const mm = minute.toString().padStart(2, "0");
      return `${hh}:${mm}`;
    })
  ).flat();

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
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-900 cursor-pointer"
          />
        }
      />

      {isOpen && (
        <div
          className="absolute z-[9999] bg-white border border-gray-200 shadow-lg rounded-lg mt-1 w-full max-h-60 overflow-y-auto"
        >
          {timeOptions.map((t, idx) => (
            <div
              key={idx}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setInputValue(t);
                onChange({ target: { name, value: t } });
                setIsValidTime(true);
                setIsOpen(false);
              }}
            >
              {t}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
