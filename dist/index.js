// src/types/button.types.ts
var buttonColors = {
  primary: "text-white  bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 ",
  secondary: "text-secondary-900 bg-white border border-secondary-300 hover:bg-secondary-100 focus:ring-secondary-100   ",
  success: "text-white bg-success-700 hover:bg-success-800 focus:ring-success-300 ",
  danger: "text-white bg-danger-700 hover:bg-danger-800 focus:ring-danger-300 ",
  warning: "text-white bg-warning-400 hover:bg-warning-500 focus:ring-warning-300",
  purple: "text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 "
};
var buttonVariants = {
  filled: "",
  outlined: "border-2  bg-opacity-10 hover:bg-opacity-5 focus:ring-2",
  text: "bg-opacity-10 hover:bg-opacity-5 focus:ring-2 focus:ring-opacity-50",
  link: "bg-transparent hover:underline focus:ring-0"
};
var buttonSizes = {
  small: "text-xs px-3 py-1.5",
  medium: "text-sm px-5 py-2.5",
  large: "text-lg px-6 py-3"
};
var getColorClasses = (color, variant) => {
  const baseColor = color;
  switch (variant) {
    case "filled":
      return "";
    case "outlined":
      return `border-${baseColor}-700 bg-${baseColor}-700 text-${baseColor}-700 ${baseColor}-600  focus:ring-${baseColor}-300 ${baseColor}-700`;
    case "text":
      return `text-${baseColor}-700 bg-${baseColor}-700  hover:bg-${baseColor}-300 ${baseColor}-600  ${baseColor}-700 focus:ring-${baseColor}-300 ${baseColor}-800`;
    case "link":
      return `text-${baseColor}-700 hover:underline ${baseColor}-600`;
    default:
      return "";
  }
};

// src/components/button/button.tsx
import clsx from "clsx";
import { useState } from "react";

// src/theme/theme.ts
import colors from "tailwindcss/colors";
var palette = {
  green: {
    50: "#eefdf0",
    100: "#dcfce1",
    200: "#bbf8c6",
    300: "#8af0a0",
    400: "#54e073",
    500: "#2abd4c",
    600: "#1a9c38",
    700: "#157c2f",
    800: "#166329",
    900: "#065911",
    950: "#023108"
  },
  gray: {
    50: "#f5f7f5",
    100: "#e9ece8",
    200: "#d6dbd4",
    300: "#babcbd",
    400: "#999e98",
    500: "#7b8378",
    600: "#616a5e",
    700: "#54634d",
    800: "#424d3e",
    900: "#384036",
    950: "#1e261c"
  },
  // Reuso directo de Tailwind
  success: colors.green,
  danger: colors.red,
  warning: colors.yellow,
  purple: colors.purple,
  info: colors.sky
};
var semanticColors = {
  primary: palette.green,
  secondary: palette.gray,
  success: palette.success,
  danger: palette.danger,
  warning: palette.warning,
  info: palette.info,
  purple: palette.purple,
  error: palette.danger
};
var components = {
  sidebar: {
    backgroundColor: semanticColors.secondary[950],
    label: {
      color: "#ffffff",
      size: "0.875rem",
      // 14px
      weight: "500"
    },
    icon: {
      color: semanticColors.primary[400],
      size: "1.25rem"
      // 20px
    }
  },
  button: {
    primary: {
      backgroundColor: semanticColors.primary[600],
      color: "#ffffff",
      hover: semanticColors.primary[700],
      active: semanticColors.primary[800]
    },
    secondary: {
      backgroundColor: "#ffffff",
      color: semanticColors.secondary[900],
      borderColor: semanticColors.secondary[300],
      hover: semanticColors.secondary[50]
      // Note: user said hover: '#f5f7f5' which is gray[50]
    },
    success: {
      backgroundColor: semanticColors.success[800],
      color: "#ffffff",
      hover: semanticColors.success[900]
    },
    danger: {
      backgroundColor: semanticColors.danger[700],
      color: "#ffffff",
      hover: semanticColors.danger[800]
    },
    error: {
      backgroundColor: semanticColors.danger[700],
      color: "#ffffff",
      hover: semanticColors.danger[800]
    },
    warning: {
      backgroundColor: semanticColors.warning[700],
      // User provided code said warning[700]
      color: "#ffffff",
      hover: semanticColors.warning[800]
    },
    info: {
      backgroundColor: semanticColors.info[700],
      color: "#ffffff",
      hover: semanticColors.info[800]
    }
  },
  badge: {
    primary: {
      backgroundColor: semanticColors.primary[500],
      color: "#ffffff",
      borderColor: semanticColors.primary[500]
    },
    secondary: {
      backgroundColor: semanticColors.secondary[500],
      color: "#ffffff",
      borderColor: semanticColors.secondary[500]
    },
    success: {
      backgroundColor: semanticColors.success[500],
      color: "#ffffff",
      borderColor: semanticColors.success[500]
    },
    danger: {
      backgroundColor: semanticColors.danger[500],
      color: "#ffffff",
      borderColor: semanticColors.danger[500]
    },
    warning: {
      backgroundColor: semanticColors.warning[500],
      color: "#ffffff",
      // Often black on yellow, but staying white for consistency unless requested. badget.types said text-black for warning.
      borderColor: semanticColors.warning[500]
    },
    info: {
      backgroundColor: semanticColors.info[500],
      color: "#ffffff",
      borderColor: semanticColors.info[500]
    },
    purple: {
      backgroundColor: semanticColors.purple[500],
      color: "#ffffff",
      borderColor: semanticColors.purple[500]
    },
    error: {
      backgroundColor: semanticColors.danger[500],
      color: "#ffffff",
      borderColor: semanticColors.danger[500]
    }
  }
};
var theme = {
  palette,
  // acceso a colores base si lo necesitas
  colors: semanticColors,
  ...components
  // sidebar, button, etc.
};

// src/components/button/button.tsx
import { jsx } from "react/jsx-runtime";
function ITButton({
  children,
  label,
  onClick,
  type = "button",
  color = "primary",
  size = "medium",
  disabled = false,
  className,
  variant = "filled",
  ariaLabel,
  title
}) {
  const [isHovered, setIsHovered] = useState(false);
  const colorClasses = getColorClasses(color, variant);
  const themeConfig = theme.button?.[color];
  const useCustomTheme = !!themeConfig && variant === "filled";
  const getStyle = () => {
    if (!useCustomTheme || disabled) return {};
    const baseStyle = {
      backgroundColor: isHovered ? themeConfig.hover : themeConfig.backgroundColor,
      color: themeConfig.color,
      borderColor: themeConfig.borderColor || "transparent"
    };
    if (themeConfig.borderColor) {
      baseStyle.borderWidth = "1px";
      baseStyle.borderStyle = "solid";
    }
    return baseStyle;
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      type,
      className: clsx(
        "font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200",
        buttonVariants[variant],
        buttonSizes[size],
        // Only apply default helper classes if we are NOT using custom theme styles for background/text
        !useCustomTheme ? variant === "filled" ? buttonColors[color] : colorClasses : "",
        // Always apply layout/other classes
        className,
        { "opacity-50 cursor-not-allowed": disabled }
      ),
      style: getStyle(),
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      onClick,
      disabled,
      "aria-label": ariaLabel || label,
      title: title || ariaLabel || label,
      children: children || /* @__PURE__ */ jsx("span", { className: clsx("font-semibold", { "opacity-50": disabled }), children: label })
    }
  );
}

// src/components/calendar/calendar.tsx
import React, { useMemo, useState as useState2, useEffect } from "react";
import {
  format,
  addDays,
  startOfWeek,
  eachDayOfInterval,
  endOfWeek,
  isSameDay,
  isToday,
  startOfDay,
  parseISO,
  differenceInMinutes,
  addMinutes,
  startOfMonth,
  endOfMonth,
  addMonths,
  isSameMonth,
  isBefore,
  isAfter
} from "date-fns";
import { es } from "date-fns/locale";
import { clsx as clsx2 } from "clsx";
import { twMerge } from "tailwind-merge";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function cn(...inputs) {
  return twMerge(clsx2(inputs));
}
var START_HOUR = 6;
var END_HOUR = 22;
var HOURS_COUNT = END_HOUR - START_HOUR;
var TIME_SLOTS = Array.from({ length: HOURS_COUNT + 1 }, (_, i) => START_HOUR + i);
var Calendar = ({
  events = [],
  mode: modeProp,
  onEventClick,
  onSlotClick,
  onSlotHover,
  onSelectRange,
  value,
  onChange,
  minDate,
  maxDate,
  className
}) => {
  const mode = modeProp || (onChange ? "month" : "week");
  const [currentDate, setCurrentDate] = useState2(value || /* @__PURE__ */ new Date());
  useEffect(() => {
    if (value) setCurrentDate(value);
  }, [value]);
  const handleNext = () => {
    if (mode === "month") {
      setCurrentDate((d) => addMonths(d, 1));
    } else if (mode === "day") {
      setCurrentDate((d) => addDays(d, 1));
    } else {
      setCurrentDate((d) => addDays(d, 7));
    }
  };
  const handlePrev = () => {
    if (mode === "month") {
      setCurrentDate((d) => addMonths(d, -1));
    } else if (mode === "day") {
      setCurrentDate((d) => addDays(d, -1));
    } else {
      setCurrentDate((d) => addDays(d, -7));
    }
  };
  const handleToday = () => setCurrentDate(/* @__PURE__ */ new Date());
  const viewDays = useMemo(() => {
    if (mode === "day") {
      return [currentDate];
    }
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentDate, mode]);
  const getEventStyle = (event) => {
    const start = typeof event.start === "string" ? parseISO(event.start) : event.start;
    const end = typeof event.end === "string" ? parseISO(event.end) : event.end;
    const startMinutes = start.getHours() * 60 + start.getMinutes();
    const dayStartMinutes = START_HOUR * 60;
    const duration = differenceInMinutes(end, start);
    return {
      top: `${(startMinutes - dayStartMinutes) / 60 * 80}px`,
      height: `${duration / 60 * 80}px`
    };
  };
  const weekEvents = useMemo(() => {
    return events.filter((event) => {
      const eventStart = typeof event.start === "string" ? parseISO(event.start) : event.start;
      return viewDays.some((day) => isSameDay(day, eventStart));
    });
  }, [events, viewDays]);
  const monthDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentDate]);
  const isDateDisabled = (date) => {
    if (minDate && isBefore(date, startOfDay(minDate))) return true;
    if (maxDate && isAfter(date, startOfDay(maxDate))) return true;
    return false;
  };
  const [dragStart, setDragStart] = useState2(null);
  const [dragCurrent, setDragCurrent] = useState2(null);
  const isDraggingRef = React.useRef(false);
  const handleMouseDown = (date, e) => {
    if (!onSelectRange) return;
    e.stopPropagation();
    e.preventDefault();
    isDraggingRef.current = false;
    setDragStart(date);
    setDragCurrent(date);
  };
  const handleMouseEnter = (date) => {
    if (onSlotHover) {
      onSlotHover(date);
    }
    if (dragStart) {
      isDraggingRef.current = true;
      setDragCurrent(date);
    }
  };
  const handleMouseUp = () => {
    if (dragStart && dragCurrent && onSelectRange && isDraggingRef.current) {
      let start = dragStart;
      let end = dragCurrent;
      if (isBefore(end, start)) {
        [start, end] = [end, start];
      }
      const finalEnd = addMinutes(end, 30);
      if (!isSameDay(start, finalEnd) && differenceInMinutes(finalEnd, start) > 0) {
        onSelectRange(start, finalEnd);
      } else {
        onSelectRange(start, finalEnd);
      }
    }
    setDragStart(null);
    setDragCurrent(null);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden select-none", className),
      onMouseUp: handleMouseUp,
      onMouseLeave: () => {
        setDragStart(null);
        setDragCurrent(null);
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white", children: [
          /* @__PURE__ */ jsx2("h2", { className: "text-lg font-bold text-gray-800 capitalize", children: format(currentDate, "MMMM yyyy", { locale: es }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx2("button", { onClick: handlePrev, type: "button", className: "p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-600", children: /* @__PURE__ */ jsx2(FaChevronLeft, { size: 14 }) }),
            /* @__PURE__ */ jsx2("button", { onClick: handleToday, type: "button", className: "text-sm font-medium text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors", children: "Hoy" }),
            /* @__PURE__ */ jsx2("button", { onClick: handleNext, type: "button", className: "p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-600", children: /* @__PURE__ */ jsx2(FaChevronRight, { size: 14 }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx2("div", { className: "flex-1 overflow-auto relative bg-white", children: mode === "month" ? /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsx2("div", { className: "grid grid-cols-7 mb-2", children: ["Lun", "Mar", "Mi\xE9", "Jue", "Vie", "S\xE1b", "Dom"].map((day) => /* @__PURE__ */ jsx2("div", { className: "text-center text-xs font-semibold text-gray-400 uppercase py-1", children: day }, day)) }),
          /* @__PURE__ */ jsx2("div", { className: "grid grid-cols-7 gap-1", children: monthDays.map((day) => {
            const isDisabled = isDateDisabled(day);
            const isSelected = value && isSameDay(day, value);
            const isCurrentMonth = isSameMonth(day, currentDate);
            return /* @__PURE__ */ jsx2(
              "button",
              {
                type: "button",
                disabled: isDisabled,
                onClick: () => onChange && onChange(day),
                className: cn(
                  "h-10 w-full flex items-center justify-center rounded-md text-sm transition-colors relative",
                  !isCurrentMonth && "text-gray-300",
                  isDisabled && "opacity-50 cursor-not-allowed",
                  isSelected ? "bg-blue-600 text-white font-medium hover:bg-blue-700" : "hover:bg-gray-100 text-gray-700",
                  isToday(day) && !isSelected && "text-blue-600 font-bold bg-blue-50"
                ),
                children: format(day, "d")
              },
              day.toISOString()
            );
          }) })
        ] }) : (
          /* Week/Day View (Scheduler) */
          /* @__PURE__ */ jsxs("div", { className: cn("flex h-full", mode === "week" ? "min-w-[800px]" : "w-full"), children: [
            /* @__PURE__ */ jsx2("div", { className: "flex-none w-16 border-r border-gray-100 bg-gray-50 pt-10 select-none", children: TIME_SLOTS.map((hour) => hour < END_HOUR && /* @__PURE__ */ jsx2("div", { className: "h-20 relative text-right pr-2", children: /* @__PURE__ */ jsx2("span", { className: "text-xs text-gray-400 -mt-2 inline-block transform -translate-y-1/2", children: format((/* @__PURE__ */ new Date()).setHours(hour, 0), "HH:mm") }) }, hour)) }),
            /* @__PURE__ */ jsx2("div", { className: "flex flex-1", children: viewDays.map((day) => /* @__PURE__ */ jsxs("div", { className: "flex-1 border-r border-gray-100 min-w-[120px] relative", children: [
              /* @__PURE__ */ jsxs("div", { className: cn(
                "h-10 border-b border-gray-200 flex flex-col items-center justify-center sticky top-0 bg-white z-10",
                isToday(day) && "bg-blue-50"
              ), children: [
                /* @__PURE__ */ jsx2("span", { className: cn("text-xs font-semibold uppercase", isToday(day) ? "text-blue-600" : "text-gray-500"), children: format(day, "EEE", { locale: es }) }),
                /* @__PURE__ */ jsx2("span", { className: cn(
                  "text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full mt-0.5",
                  isToday(day) ? "bg-blue-600 text-white" : "text-gray-800"
                ), children: format(day, "d") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                TIME_SLOTS.map((hour) => hour < END_HOUR && /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "h-20 border-b border-gray-100 border-dashed relative group",
                    children: [
                      /* @__PURE__ */ jsx2(
                        "div",
                        {
                          className: "absolute inset-x-0 top-0 h-10 border-b border-transparent hover:border-blue-100 hover:bg-blue-50/30 transition-colors cursor-pointer z-0",
                          onMouseDown: (e) => {
                            const d = new Date(day);
                            d.setHours(hour, 0, 0, 0);
                            handleMouseDown(d, e);
                          },
                          onMouseEnter: () => {
                            const d = new Date(day);
                            d.setHours(hour, 0, 0, 0);
                            handleMouseEnter(d);
                          },
                          onClick: () => {
                            if (!isDraggingRef.current) {
                              const d = new Date(day);
                              d.setHours(hour, 0, 0, 0);
                              onSlotClick && onSlotClick(d);
                            }
                          }
                        }
                      ),
                      /* @__PURE__ */ jsx2(
                        "div",
                        {
                          className: "absolute inset-x-0 bottom-0 h-10 hover:border-blue-100 hover:bg-blue-50/30 transition-colors cursor-pointer z-0",
                          onMouseDown: (e) => {
                            const d = new Date(day);
                            d.setHours(hour, 30, 0, 0);
                            handleMouseDown(d, e);
                          },
                          onMouseEnter: () => {
                            const d = new Date(day);
                            d.setHours(hour, 30, 0, 0);
                            handleMouseEnter(d);
                          },
                          onClick: () => {
                            if (!isDraggingRef.current) {
                              const d = new Date(day);
                              d.setHours(hour, 30, 0, 0);
                              onSlotClick && onSlotClick(d);
                            }
                          }
                        }
                      )
                    ]
                  },
                  hour
                )),
                dragStart && dragCurrent && isSameDay(dragStart, day) && (() => {
                  let start = dragStart;
                  let end = dragCurrent;
                  if (isBefore(end, start)) [start, end] = [end, start];
                  const finalEnd = addMinutes(end, 30);
                  const startMinutes = start.getHours() * 60 + start.getMinutes();
                  const dayStartMinutes = START_HOUR * 60;
                  const duration = differenceInMinutes(finalEnd, start);
                  const top = (startMinutes - dayStartMinutes) / 60 * 80;
                  const height = duration / 60 * 80;
                  return /* @__PURE__ */ jsx2(
                    "div",
                    {
                      className: "absolute left-1 right-1 bg-blue-500/30 border border-blue-500 rounded z-10 pointer-events-none",
                      style: { top: `${top}px`, height: `${height}px` }
                    }
                  );
                })(),
                weekEvents.filter((event) => isSameDay(typeof event.start === "string" ? parseISO(event.start) : event.start, day)).map((event) => {
                  const style = getEventStyle(event);
                  return /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: cn(
                        "absolute left-1 right-1 rounded px-2 py-1 text-xs cursor-pointer hover:brightness-95 transition-all shadow-sm overflow-hidden z-20 border-l-4",
                        !event.color && "bg-blue-100 text-blue-700 border-blue-500"
                      ),
                      style: {
                        top: style.top,
                        height: style.height,
                        backgroundColor: event.color ? `${event.color}20` : void 0,
                        borderColor: event.color,
                        color: event.color ? event.color : void 0
                      },
                      onClick: (e) => {
                        e.stopPropagation();
                        onEventClick && onEventClick(event);
                      },
                      children: [
                        /* @__PURE__ */ jsx2("div", { className: "font-semibold truncate", children: event.title }),
                        /* @__PURE__ */ jsxs("div", { className: "opacity-80 truncate", children: [
                          format(typeof event.start === "string" ? parseISO(event.start) : event.start, "HH:mm"),
                          " -",
                          format(typeof event.end === "string" ? parseISO(event.end) : event.end, "HH:mm")
                        ] })
                      ]
                    },
                    event.id
                  );
                })
              ] }),
              isToday(day) && /* @__PURE__ */ jsx2(
                "div",
                {
                  className: "absolute left-0 right-0 border-t-2 border-red-500 z-30 pointer-events-none",
                  style: {
                    top: `${((/* @__PURE__ */ new Date()).getHours() * 60 + (/* @__PURE__ */ new Date()).getMinutes() - START_HOUR * 60) / 60 * 80}px`
                  },
                  children: /* @__PURE__ */ jsx2("div", { className: "absolute -left-1.5 -top-1.5 w-3 h-3 bg-red-500 rounded-full" })
                }
              )
            ] }, day.toISOString())) })
          ] })
        ) })
      ]
    }
  );
};
var calendar_default = Calendar;

// src/components/card/card.tsx
import clsx3 from "clsx";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function ITCard({
  title,
  image,
  alt = "Card Image",
  children,
  actions,
  className,
  imageClassName,
  titleClassName,
  contentClassName,
  actionClassName,
  onClick
}) {
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      onClick,
      className: clsx3(
        "bg-white rounded-lg shadow-md overflow-hidden border-slate-100 border",
        className
      ),
      children: [
        image && /* @__PURE__ */ jsx3(
          "img",
          {
            src: image,
            alt,
            className: clsx3("w-full h-48 object-cover", imageClassName)
          }
        ),
        /* @__PURE__ */ jsxs2("div", { className: clsx3("p-4", contentClassName), children: [
          title && /* @__PURE__ */ jsx3(
            "h3",
            {
              className: clsx3(
                "text-xl font-semibold mb-2 text-gray-800",
                titleClassName
              ),
              children: title
            }
          ),
          /* @__PURE__ */ jsx3("div", { className: "text-gray-600", children })
        ] }),
        actions && /* @__PURE__ */ jsx3("div", { className: clsx3("p-4 border-t border-gray-100", actionClassName), children: actions })
      ]
    }
  );
}

// src/components/date-picker/datePicker.tsx
import clsx5 from "clsx";
import React2, { useEffect as useEffect3, useRef as useRef2, useState as useState4 } from "react";
import { FaCalendarAlt } from "react-icons/fa";

// src/components/input/input.tsx
import clsx4 from "clsx";
import { useState as useState3, useEffect as useEffect2, useRef, useCallback } from "react";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function ITInput({
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
}) {
  const isCheckboxOrRadio = type === "checkbox" || type === "radio";
  const isNumberType = type === "number";
  const isTextArea = type === "textarea";
  const [displayValue, setDisplayValue] = useState3("");
  const [isFocused, setIsFocused] = useState3(false);
  const [hasSelectedAll, setHasSelectedAll] = useState3(false);
  const inputRef = useRef(null);
  const handleClick = (e) => {
    if (onClick) {
      onClick();
    }
    if (!readOnly && !hasSelectedAll) {
      e.currentTarget.select();
      setHasSelectedAll(true);
    }
  };
  const formatValue = useCallback(
    (val) => {
      const num = typeof val === "string" ? parseFloat(val.replace(/,/g, "")) : val;
      if (num == null || isNaN(num)) {
        return "";
      }
      if (currencyFormat) {
        return num.toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 10
        });
      }
      return num.toString();
    },
    [currencyFormat]
  );
  const unformatValue = useCallback(
    (val) => {
      if (val == null) return "";
      return String(val).replace(/,/g, "");
    },
    []
  );
  useEffect2(() => {
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
  const handleKeyDown = (e) => {
    if (readOnly || !isNumberType) return;
    const { key, ctrlKey, metaKey } = e;
    const {
      value: currentValue,
      selectionStart,
      selectionEnd
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
      "End"
    ];
    if (allowedKeys.includes(key) || ctrlKey || metaKey) {
      return;
    }
    if (!currencyFormat && (key === "." || key === ",")) {
      e.preventDefault();
      return;
    }
    if (currencyFormat && (key === "." || key === ",") && currentValue.includes(".")) {
      e.preventDefault();
      return;
    }
    const allowedCharsRegex = currencyFormat ? /^[0-9.,]$/ : /^[0-9]$/;
    if (!allowedCharsRegex.test(key)) {
      e.preventDefault();
      return;
    }
    if (max !== void 0 && /^[0-9]$/.test(key) && selectionStart !== null && selectionEnd !== null) {
      const currentUnformatted = unformatValue(currentValue);
      const nextValueStr = currentUnformatted.slice(0, selectionStart) + key + currentUnformatted.slice(selectionEnd);
      const numericValue = parseFloat(nextValueStr);
      if (!isNaN(numericValue) && numericValue > max) {
        e.preventDefault();
      }
    }
  };
  const handleNumberChange = (e) => {
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
      let valueToSend = cleanedValue;
      if (!formatNumber) {
        valueToSend = cleanedValue;
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
          value: valueToSend.toString()
        }
      };
      onChange(newEvent);
    }
  };
  const handleTextChange = (e) => {
    if (readOnly) return;
    const value2 = e.target.value;
    if (maxLength) {
      if (value2.length > maxLength) return;
    }
    if (onChange) {
      const newEvent = {
        ...e,
        target: {
          ...e.target,
          name,
          value: value2
        }
      };
      onChange(newEvent);
    }
  };
  const handleFocus = (e) => {
    setIsFocused(true);
    setHasSelectedAll(false);
    if (readOnly || !isNumberType) return;
    setDisplayValue(unformatValue(value));
    e.currentTarget.select();
  };
  const handleBlur = (e) => {
    setHasSelectedAll(false);
    setIsFocused(false);
    if (readOnly) {
      onBlur?.(e);
      return;
    }
    if (isNumberType) {
      const currentValue = displayValue;
      if (!formatNumber) {
        if (onChange && String(value) !== currentValue) {
          const newEvent = {
            ...e,
            target: {
              ...e.target,
              name,
              value: currentValue
              // Mantener como string
            }
          };
          onChange(newEvent);
        }
        onBlur?.(e);
        return;
      }
      let numericValue = void 0;
      let valueToSend = void 0;
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
      const parsed = currencyFormat ? parseFloat(cleanedValue) : parseInt(cleanedValue, 10);
      if (!isNaN(parsed)) {
        numericValue = parsed;
        if (min !== void 0 && numericValue < min) {
          numericValue = min;
        }
        if (max !== void 0 && numericValue > max) {
          numericValue = max;
        }
        valueToSend = numericValue;
        setDisplayValue(formatValue(numericValue));
      } else {
        setDisplayValue("");
        valueToSend = void 0;
      }
      if (onChange && String(value) !== String(valueToSend)) {
        const newEvent = {
          ...e,
          target: {
            ...e.target,
            name,
            value: valueToSend
          }
        };
        onChange(newEvent);
      } else if (String(value) === String(valueToSend) && displayValue !== formatValue(value) && !isNaN(parsed)) {
        setDisplayValue(formatValue(value));
      } else if (isNaN(parsed)) {
        setDisplayValue("");
      }
    }
    onBlur?.(e);
  };
  const currentLength = isNumberType ? (currencyFormat ? displayValue.replace(/[.,]/g, "") : displayValue).length : typeof value === "string" ? value.length : String(value ?? "").length;
  return /* @__PURE__ */ jsxs3("div", { className: clsx4("w-full", containerClassName), children: [
    isCheckboxOrRadio ? (
      // CHECKBOX / RADIO LAYOUT (Row)
      /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx4(
          "input",
          {
            ref: inputRef,
            name,
            id: name,
            type,
            checked,
            onChange: handleTextChange,
            disabled,
            required,
            className: clsx4(
              "peer",
              "form-radio h-4 w-4 text-slate-600 focus:ring-slate-500 transition-all duration-200",
              type === "checkbox" && "form-checkbox rounded",
              className,
              { "opacity-50 cursor-not-allowed": disabled },
              { "border-red-500": touched && error }
            )
          }
        ),
        label && /* @__PURE__ */ jsxs3("label", { htmlFor: name, className: "text-sm text-gray-700 select-none", children: [
          label,
          " ",
          required && /* @__PURE__ */ jsx4("span", { className: "text-red-500", children: "*" })
        ] })
      ] })
    ) : (
      // TEXT / NUMBER / TEXTAREA LAYOUT (Column)
      /* @__PURE__ */ jsxs3("div", { className: "flex flex-col gap-1.5", children: [
        label && /* @__PURE__ */ jsxs3(
          "label",
          {
            htmlFor: name,
            className: clsx4(
              "text-sm font-medium text-gray-700",
              { "text-red-500": touched && error },
              labelClassName
            ),
            children: [
              label,
              required && /* @__PURE__ */ jsx4("span", { className: "text-red-500 ml-1", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs3("div", { className: "relative w-full", children: [
          iconLeft && /* @__PURE__ */ jsx4("div", { className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10", children: iconLeft }),
          isTextArea ? /* @__PURE__ */ jsx4(
            "textarea",
            {
              name,
              id: name,
              placeholder,
              value: value ?? "",
              onChange: readOnly ? void 0 : onChange,
              onBlur: readOnly ? void 0 : onBlur,
              readOnly,
              maxLength,
              minLength,
              disabled,
              required,
              autoFocus,
              onClick,
              rows,
              className: clsx4(
                "peer",
                "bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 w-full px-4 py-3 resize-none",
                className,
                { "opacity-50 cursor-not-allowed": disabled },
                { "border-red-500 focus:border-red-500 focus:ring-red-500": touched && error }
              )
            }
          ) : /* @__PURE__ */ jsx4(
            "input",
            {
              ref: inputRef,
              name,
              id: name,
              type: isNumberType ? "text" : type,
              inputMode: isNumberType ? currencyFormat ? "decimal" : "numeric" : void 0,
              placeholder,
              value: isNumberType ? displayValue : String(value ?? ""),
              onChange: isNumberType ? handleNumberChange : handleTextChange,
              onFocus: isNumberType ? handleFocus : () => setIsFocused(true),
              onBlur: isNumberType ? handleBlur : (e) => {
                setIsFocused(false);
                onBlur?.(e);
              },
              onKeyDown: isNumberType ? handleKeyDown : void 0,
              readOnly,
              maxLength: isNumberType && !currencyFormat ? maxLength : void 0,
              minLength,
              min,
              max,
              disabled,
              required,
              autoFocus,
              onClick: focusContent ? handleClick : onClick,
              className: clsx4(
                "peer",
                "bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 w-full px-4 py-3",
                className,
                { "opacity-50 cursor-not-allowed": disabled },
                { "border-red-500 focus:border-red-500 focus:ring-red-500": touched && error },
                { "pl-10": iconLeft },
                { "pr-10": iconRight }
              )
            }
          ),
          iconRight && /* @__PURE__ */ jsx4("div", { className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none", children: iconRight })
        ] })
      ] })
    ),
    touched && error && !isCheckboxOrRadio && /* @__PURE__ */ jsx4("div", { className: "flex-shrink-0 min-w-[140px] flex items-center pt-3", children: /* @__PURE__ */ jsx4("p", { className: "text-red-500 text-xs", children: error }) }),
    showHintLength && (minLength || maxLength) && !isCheckboxOrRadio && /* @__PURE__ */ jsx4("div", { className: "mt-1 text-xs", children: /* @__PURE__ */ jsxs3("p", { className: "text-gray-500", children: [
      currentLength,
      maxLength && `/${maxLength}`
    ] }) }),
    isCheckboxOrRadio && touched && error && /* @__PURE__ */ jsx4("div", { className: "mt-1 text-xs", children: /* @__PURE__ */ jsx4("p", { className: "text-red-500", children: error }) })
  ] });
}

// src/components/date-picker/datePicker.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function ITDatePicker({
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
  maxDate
}) {
  const [isOpen, setIsOpen] = useState4(false);
  const [inputValue, setInputValue] = useState4("");
  const [isValidDate, setIsValidDate] = useState4(true);
  const [lastValidDate, setLastValidDate] = useState4(new Date(value));
  const wrapperRef = useRef2(null);
  const [calendarPosition, setCalendarPosition] = useState4({ top: 0, left: 0 });
  const dateValue = React2.useMemo(
    () => typeof value === "string" ? new Date(value) : value,
    [value]
  );
  useEffect3(() => {
    if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
      setInputValue(formatDate(dateValue));
      setLastValidDate(dateValue);
    } else {
      setInputValue("");
    }
  }, [dateValue]);
  useEffect3(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
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
        left: inputRect.left
      });
    }
  };
  const handleDateChange = (date) => {
    const event = {
      target: {
        name,
        value: date
      }
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
  const formatDate = (date) => date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).replace(/\//g, "/");
  const validateDate = (dateString) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateString.match(regex);
    if (!match) return false;
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  };
  const handleInputChange = (e) => {
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
          value: date
        }
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
      const today = /* @__PURE__ */ new Date();
      setInputValue(formatDate(today));
      const event = {
        target: {
          name,
          value: today
        }
      };
      onChange(event);
      setIsValidDate(true);
    } else {
      const [day, month, year] = inputValue.split("/").map(Number);
      const date = new Date(year, month - 1, day);
      if (!isNaN(date.getTime())) {
        onBlur({ target: { name, value: date } });
      } else {
        const today = /* @__PURE__ */ new Date();
        setInputValue(formatDate(today));
        onChange({ target: { name, value: today } });
      }
    }
  };
  return /* @__PURE__ */ jsxs4("div", { ref: wrapperRef, className: clsx5("relative w-full", className), children: [
    /* @__PURE__ */ jsx5(
      ITInput,
      {
        name,
        type: "text",
        label,
        placeholder,
        value: inputValue,
        onChange: handleInputChange,
        onBlur: handleInputBlur,
        maxLength: 10,
        iconRight: /* @__PURE__ */ jsx5("span", { children: /* @__PURE__ */ jsx5(
          FaCalendarAlt,
          {
            onClick: handleIconClick,
            className: "text-slate-900 cursor-pointer"
          }
        ) }),
        variant,
        size,
        disabled,
        required,
        touched,
        error: !isValidDate ? "Fecha inv\xE1lida" : error,
        onClick: handleIconClick
      }
    ),
    isOpen && /* @__PURE__ */ jsx5(
      "div",
      {
        className: clsx5(
          "fixed z-[9999] bg-white rounded-lg shadow-lg border border-gray-200",
          calendarClassName
        ),
        style: {
          top: `${calendarPosition.top}px`,
          left: `${calendarPosition.left}px`
        },
        children: /* @__PURE__ */ jsx5(
          calendar_default,
          {
            value: dateValue,
            onChange: handleDateChange,
            minDate,
            maxDate
          }
        )
      }
    )
  ] });
}

// src/components/dialog/dialog.tsx
import { useEffect as useEffect5, useRef as useRef3 } from "react";
import { FaRegTimesCircle } from "react-icons/fa";

// src/hooks/useClickOutside.ts
import { useEffect as useEffect4 } from "react";
var useClickOutside = (ref, callback) => {
  useEffect4(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};
var useClickOutside_default = useClickOutside;

// src/components/form-header/form-header.tsx
import { FaTimes } from "react-icons/fa";
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
function ITFormHeader({
  title,
  onClose,
  className = ""
}) {
  return /* @__PURE__ */ jsxs5("div", { className: `bg-teal-500 text-white px-6 py-4 rounded-t-lg flex justify-center items-center relative ${className}`, children: [
    /* @__PURE__ */ jsx6("h2", { className: "text-lg font-semibold text-center", children: title }),
    onClose && /* @__PURE__ */ jsx6(
      "button",
      {
        onClick: onClose,
        className: "absolute right-4 text-white hover:text-gray-200 transition-colors duration-200 p-1 rounded-full hover:bg-teal-600",
        "aria-label": "Cerrar",
        children: /* @__PURE__ */ jsx6(FaTimes, { className: "w-4 h-4" })
      }
    )
  ] });
}

// src/components/dialog/dialog.tsx
import { Fragment, jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
function ITDialog({
  isOpen,
  onClose,
  children,
  className,
  title,
  useFormHeader = false
}) {
  const modalRef = useRef3(null);
  useClickOutside_default(modalRef, onClose);
  useEffect5(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx7("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50", children: /* @__PURE__ */ jsx7(
    "div",
    {
      ref: modalRef,
      className: `bg-white rounded-lg shadow-lg overflow-hidden relative ${className} ${useFormHeader ? "p-0" : "p-6"}`,
      children: useFormHeader && title ? /* @__PURE__ */ jsxs6(Fragment, { children: [
        /* @__PURE__ */ jsx7(ITFormHeader, { title, onClose }),
        /* @__PURE__ */ jsx7("div", { className: "p-6", children })
      ] }) : /* @__PURE__ */ jsxs6(Fragment, { children: [
        /* @__PURE__ */ jsx7(
          "button",
          {
            className: "absolute top-2 right-2 text-gray-600 hover:text-gray-900",
            onClick: onClose,
            children: /* @__PURE__ */ jsx7(FaRegTimesCircle, {})
          }
        ),
        title && /* @__PURE__ */ jsx7("h2", { className: "text-xl font-semibold mb-4", children: title }),
        /* @__PURE__ */ jsx7("div", { children })
      ] })
    }
  ) });
}

// src/components/form/form.tsx
import clsx7 from "clsx";

// src/components/select/select.tsx
import clsx6 from "clsx";
import { FaAngleDown } from "react-icons/fa";
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
function ITSelect({
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
  readOnly = false
}) {
  return /* @__PURE__ */ jsx8("div", { className: "w-full", children: /* @__PURE__ */ jsxs7("div", { className: clsx6("relative", {
    "flex flex-col gap-1.5": label
  }), children: [
    label && /* @__PURE__ */ jsxs7(
      "label",
      {
        htmlFor: name,
        className: clsx6(
          "text-sm font-medium text-gray-700 pt-0",
          { "text-red-500": touched && error }
        ),
        children: [
          label,
          required && /* @__PURE__ */ jsx8("span", { className: "text-red-500 ml-1", children: "*" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs7("div", { className: "flex flex-col w-full", children: [
      /* @__PURE__ */ jsxs7("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxs7(
          "select",
          {
            name,
            id: name,
            value,
            onChange: readOnly ? void 0 : onChange,
            onBlur: readOnly ? void 0 : onBlur,
            disabled,
            className: clsx6(
              "w-full bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 px-4 py-3",
              "appearance-none",
              className,
              { "opacity-50 cursor-not-allowed": disabled },
              { "border-red-500 focus:border-red-500 focus:ring-red-500": touched && error }
            ),
            style: { textOverflow: "ellipsis" },
            children: [
              /* @__PURE__ */ jsx8("option", { value: "", children: placeholder || "Selecciona una opci\xF3n" }),
              readOnly ? /* @__PURE__ */ jsx8("option", { value, disabled: true, children: options.find((option) => option[valueField] === value)?.[labelField] }) : options.map((option) => /* @__PURE__ */ jsx8(
                "option",
                {
                  value: option[valueField],
                  title: option[labelField],
                  style: { textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" },
                  children: option[labelField]
                },
                option[valueField]
              ))
            ]
          }
        ),
        /* @__PURE__ */ jsx8("div", { className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none", children: /* @__PURE__ */ jsx8(FaAngleDown, {}) })
      ] }),
      touched && error && /* @__PURE__ */ jsx8("div", { className: "flex-shrink-0 min-w-[140px] flex items-center pt-3", children: /* @__PURE__ */ jsx8("p", { className: "text-red-500 text-xs", children: error }) })
    ] })
  ] }) });
}

// src/components/form/form.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
var gridColsClasses = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  8: "grid-cols-8",
  12: "grid-cols-12"
};
var getGridColsClass = (columns) => gridColsClasses[columns] || "grid-cols-12";
var getColSpanClass = (span, maxCols) => {
  if (Array.isArray(span)) {
    const [sm, md, lg] = span;
    return `col-span-${Math.min(sm, maxCols)} md:col-span-${Math.min(
      md,
      maxCols
    )} lg:col-span-${Math.min(lg, maxCols)}`;
  } else {
    return `col-span-${Math.min(span, maxCols)}`;
  }
};
function ITFormBuilder({
  fields,
  columns = 12,
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  setFieldValue
}) {
  return /* @__PURE__ */ jsx9(
    "div",
    {
      className: clsx7(
        "grid gap-4",
        getGridColsClass(columns)
      ),
      children: fields.map(
        ({
          name,
          label,
          type = "text",
          placeholder,
          required,
          column = 12,
          options,
          valueField,
          disabled = false,
          labelField,
          showHintLength,
          formatNumber = true,
          onChangeAction,
          ...props
        }) => /* @__PURE__ */ jsx9("div", { className: clsx7(getColSpanClass(column, columns)), children: (() => {
          switch (type) {
            case "text":
            case "number":
            case "password":
              return /* @__PURE__ */ jsx9(
                ITInput,
                {
                  type,
                  name,
                  label,
                  placeholder,
                  disabled,
                  value: values[name],
                  onChange: (e) => {
                    handleChange(e);
                    if (onChangeAction && setFieldValue) {
                      onChangeAction(e.target.value, setFieldValue);
                    }
                  },
                  onBlur: handleBlur,
                  currencyFormat: props.currencyFormat,
                  touched: touched[name],
                  error: errors[name],
                  required,
                  iconRight: props.rightIcon,
                  iconLeft: props.leftIcon,
                  showHintLength,
                  maxLength: props.maxLength,
                  minLength: props.minLength,
                  rows: props.rows,
                  formatNumber
                }
              );
            case "select":
              return /* @__PURE__ */ jsx9(
                ITSelect,
                {
                  options: options || [],
                  name,
                  disabled,
                  label,
                  placeholder,
                  value: values[name],
                  valueField,
                  labelField,
                  onChange: (e) => {
                    handleChange(e);
                    if (onChangeAction && setFieldValue) {
                      onChangeAction(e.target.value, setFieldValue);
                    }
                  },
                  onBlur: handleBlur,
                  touched: touched[name],
                  error: errors[name],
                  required
                }
              );
            case "date":
              return /* @__PURE__ */ jsx9(
                ITDatePicker,
                {
                  name,
                  disabled,
                  label,
                  value: values[name],
                  onChange: (e) => {
                    handleChange(e);
                    if (onChangeAction && setFieldValue) {
                      onChangeAction(e.target.value, setFieldValue);
                    }
                  },
                  placeholder,
                  onBlur: handleBlur,
                  touched: touched[name],
                  error: errors[name],
                  required
                }
              );
            default:
              return null;
          }
        })() }, name)
      )
    }
  );
}

// src/components/slide/slide.tsx
import { useState as useState5 } from "react";
import { jsx as jsx10 } from "react/jsx-runtime";
function ITSlideToggle({
  onToggle,
  initialState = false,
  activeColor = "bg-green-500",
  inactiveColor = "bg-gray-400"
}) {
  const [isOn, setIsOn] = useState5(initialState);
  const toggleSwitch = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };
  return /* @__PURE__ */ jsx10(
    "div",
    {
      className: `w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isOn ? activeColor : inactiveColor}`,
      onClick: toggleSwitch,
      children: /* @__PURE__ */ jsx10(
        "div",
        {
          className: `w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isOn ? "translate-x-7" : "translate-x-0"}`
        }
      )
    }
  );
}

// src/components/table/table.tsx
import clsx8 from "clsx";
import React3, { useState as useState6 } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaTimes as FaTimes2,
  FaSpinner
} from "react-icons/fa";
import { MdOutlineSwapVert } from "react-icons/md";

// src/types/table.types.ts
var variantStyles = {
  default: "",
  striped: "divide-y divide-gray-200",
  bordered: "border border-gray-200"
};
var sizeStyles = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-lg"
};

// src/components/table/table.tsx
import { jsx as jsx11, jsxs as jsxs8 } from "react/jsx-runtime";
var getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};
var formatCurrencyMX = (value) => {
  return value.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN"
  });
};
function ITTable({
  columns,
  data,
  containerClassName,
  className,
  variant = "default",
  size = "md",
  itemsPerPageOptions = [5, 10, 20],
  defaultItemsPerPage = 10,
  title
}) {
  const [currentPage, setCurrentPage] = useState6(1);
  const [itemsPerPage, setItemsPerPage] = useState6(defaultItemsPerPage);
  const [filters, setFilters] = useState6({});
  const [sortConfig, setSortConfig] = useState6(null);
  const sortedData = React3.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aValue = getNestedValue(a, sortConfig.key);
      const bValue = getNestedValue(b, sortConfig.key);
      if (aValue == null || bValue == null) return 0;
      let comparison = 0;
      const column = columns.find((col) => col.key === sortConfig.key);
      if (!column || !column.sortable) return 0;
      switch (column.type) {
        case "number":
          comparison = aValue - bValue;
          break;
        case "date":
          comparison = new Date(aValue).getTime() - new Date(bValue).getTime();
          break;
        case "boolean":
          comparison = aValue === bValue ? 0 : aValue ? 1 : -1;
          break;
        case "catalog": {
          const catalogItemA = column.catalogOptions?.data.find(
            (item) => item.id === aValue
          );
          const catalogItemB = column.catalogOptions?.data.find(
            (item) => item.id === bValue
          );
          comparison = String(catalogItemA?.name || aValue).localeCompare(
            String(catalogItemB?.name || bValue)
          );
          break;
        }
        case "string":
        default:
          comparison = aValue.localeCompare(bValue);
          break;
      }
      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [data, sortConfig, columns]);
  const filteredData = sortedData.filter(
    (row) => columns.every((col) => {
      if (!col.filter || filters[col.key] === void 0 || filters[col.key] === "")
        return true;
      const value = getNestedValue(row, col.key);
      const filterValue = String(filters[col.key]).toLowerCase();
      switch (col.type) {
        case "number":
          return String(value).includes(filterValue);
        case "boolean":
          return value === filters[col.key];
        case "catalog": {
          if (!col.catalogOptions) return true;
          const catalogItem = col.catalogOptions.data.find(
            (item) => String(item.id).toLowerCase().includes(filterValue) || item.name.toLowerCase().includes(filterValue)
          );
          return catalogItem ? value === catalogItem.id : false;
        }
        case "string":
        default:
          return String(value).toLowerCase().includes(filterValue);
      }
    })
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };
  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      if (value === void 0 || value === null || value === "") {
        const newFilters = { ...prev };
        delete newFilters[key];
        return newFilters;
      }
      return { ...prev, [key]: value };
    });
    setCurrentPage(1);
  };
  const handleSort = (key) => {
    const column = columns.find((col) => col.key === key);
    if (!column || !column.sortable) return;
    let direction = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };
  const renderFilterInput = (col) => {
    if (!col.filter) return null;
    if (col.type === "boolean") {
      const currentValue = filters[col.key];
      const nextValue = currentValue === void 0 ? true : currentValue === true ? false : void 0;
      const getToggleLabel = () => {
        if (currentValue === void 0) return "Mostrar todos";
        if (currentValue === true) return "Filtrar solo verdaderos";
        return "Filtrar solo falsos";
      };
      return /* @__PURE__ */ jsx11(
        "button",
        {
          className: "flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-full p-1 transition-all duration-200",
          onClick: () => handleFilterChange(col.key, nextValue),
          "aria-label": `${getToggleLabel()} para ${col.label}`,
          title: `${getToggleLabel()} para ${col.label}`,
          children: /* @__PURE__ */ jsx11("div", { className: "relative w-10 h-5 bg-gray-300 rounded-full", children: /* @__PURE__ */ jsx11(
            "div",
            {
              className: clsx8(
                "absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 shadow-sm",
                {
                  "left-0.5 bg-gray-400": currentValue === void 0,
                  "left-5 bg-slate-500": currentValue === true,
                  "left-0.5 bg-gray-500": currentValue === false
                }
              )
            }
          ) })
        }
      );
    }
    if (col.filter === "catalog" && col.catalogOptions) {
      if (col.catalogOptions.loading) {
        return /* @__PURE__ */ jsx11(
          FaSpinner,
          {
            className: "animate-spin",
            "aria-label": "Cargando opciones",
            title: "Cargando opciones"
          }
        );
      }
      if (col.catalogOptions.error) {
        return /* @__PURE__ */ jsx11("span", { className: "text-red-500 text-xs", children: "Error cargando" });
      }
      return /* @__PURE__ */ jsx11(
        ITSelect,
        {
          name: `filter-${col.key}`,
          options: [
            { value: "", label: "Todos" },
            ...col.catalogOptions.data.map((item) => ({
              value: String(item.id),
              label: item.name
            }))
          ],
          value: String(filters[col.key] || ""),
          onChange: (e) => {
            const value = e.target.value === "" ? void 0 : e.target.value;
            handleFilterChange(col.key, value);
          },
          onBlur: () => {
          },
          className: "w-full text-xs"
        }
      );
    }
    return /* @__PURE__ */ jsx11(
      ITInput,
      {
        name: `filter-${col.key}`,
        className: "w-full text-xs",
        placeholder: "Buscar...",
        value: String(filters[col.key] || ""),
        onChange: (e) => handleFilterChange(col.key, e.target.value),
        onBlur: () => {
        }
      }
    );
  };
  const renderCellContent = (col, row) => {
    const value = getNestedValue(row, col.key);
    if (col.render) {
      return col.render(row);
    }
    switch (col.type) {
      case "number":
        return typeof value === "number" && col.currencyMX ? formatCurrencyMX(value) : value;
      case "boolean":
        return value ? /* @__PURE__ */ jsx11(
          FaCheck,
          {
            className: "text-green-500",
            "aria-label": "Verdadero",
            title: "Verdadero"
          }
        ) : /* @__PURE__ */ jsx11(
          FaTimes2,
          {
            className: "text-red-500",
            "aria-label": "Falso",
            title: "Falso"
          }
        );
      case "actions":
        return col.actions ? col.actions(row) : null;
      case "catalog":
        if (col.catalogOptions) {
          const catalogItem = col.catalogOptions.data.find(
            (item) => item.id === value
          );
          return catalogItem?.name || value;
        }
        return value;
      default:
        return value;
    }
  };
  return /* @__PURE__ */ jsxs8("div", { className: clsx8("space-y-4 w-full", containerClassName), children: [
    /* @__PURE__ */ jsxs8("div", { className: "bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden", children: [
      title && /* @__PURE__ */ jsx11("div", { className: "bg-white px-6 py-5 border-b border-secondary-100", children: /* @__PURE__ */ jsx11("h2", { className: "text-xl font-bold text-secondary-900 leading-tight", children: title }) }),
      /* @__PURE__ */ jsx11("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs8(
        "table",
        {
          className: clsx8(
            "min-w-max w-full text-sm text-left text-secondary-600",
            variantStyles[variant],
            sizeStyles[size]
          ),
          children: [
            /* @__PURE__ */ jsx11("thead", { children: /* @__PURE__ */ jsx11("tr", { className: "bg-secondary-50 border-b border-secondary-200 text-xs uppercase tracking-wider font-semibold text-secondary-500", children: columns.map((col) => /* @__PURE__ */ jsx11(
              "th",
              {
                scope: "col",
                className: clsx8("px-4 py-4 align-top", col.className),
                children: /* @__PURE__ */ jsxs8("div", { className: "flex flex-col gap-3 min-w-[150px]", children: [
                  /* @__PURE__ */ jsxs8("div", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsx11("span", { className: "text-secondary-700 font-bold", children: col.label }),
                    col.sortable && col.type !== "actions" && /* @__PURE__ */ jsx11(
                      "button",
                      {
                        onClick: () => handleSort(col.key),
                        className: `p-1 rounded-md transition-colors ${sortConfig?.key === col.key ? "bg-secondary-200 text-secondary-900" : "hover:bg-secondary-200 text-secondary-400 hover:text-secondary-700"}`,
                        title: `Ordenar por ${col.label}`,
                        children: /* @__PURE__ */ jsx11(MdOutlineSwapVert, { className: "w-4 h-4", "aria-hidden": "true" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx11("div", { className: "w-full", children: col.filter ? renderFilterInput(col) : null })
                ] })
              },
              col.key
            )) }) }),
            /* @__PURE__ */ jsx11("tbody", { className: "divide-y divide-secondary-100", children: currentData.length > 0 ? currentData.map((row, rowIndex) => /* @__PURE__ */ jsx11(
              "tr",
              {
                className: "hover:bg-secondary-50/50 transition-colors duration-150 group",
                children: columns.map((col) => /* @__PURE__ */ jsx11(
                  "td",
                  {
                    className: clsx8("px-4 py-3 align-middle", col.className),
                    children: col.type === "actions" ? /* @__PURE__ */ jsx11("div", { className: "flex items-center justify-center gap-2", children: renderCellContent(col, row) }) : /* @__PURE__ */ jsx11("div", { className: "text-secondary-700 font-medium", children: renderCellContent(col, row) })
                  },
                  `${rowIndex}-${col.key}`
                ))
              },
              rowIndex
            )) : /* @__PURE__ */ jsx11("tr", { children: /* @__PURE__ */ jsx11("td", { colSpan: columns.length, className: "px-6 py-12 text-center", children: /* @__PURE__ */ jsxs8("div", { className: "flex flex-col items-center justify-center text-secondary-400", children: [
              /* @__PURE__ */ jsx11("span", { className: "text-lg", children: "No se encontraron resultados" }),
              /* @__PURE__ */ jsx11("span", { className: "text-sm mt-1", children: "Intenta ajustar los filtros" })
            ] }) }) }) })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs8("div", { className: "flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-secondary-200", children: [
      /* @__PURE__ */ jsxs8("div", { className: "flex items-center gap-4 text-sm text-secondary-500", children: [
        /* @__PURE__ */ jsxs8("div", { className: "flex items-center gap-2 bg-secondary-50 px-3 py-1 rounded-lg border border-secondary-200", children: [
          /* @__PURE__ */ jsx11("span", { className: "text-xs font-medium", children: "Mostrar" }),
          /* @__PURE__ */ jsx11(
            ITSelect,
            {
              name: "itemsPerPage",
              options: itemsPerPageOptions.map((option) => ({
                value: String(option),
                label: String(option)
              })),
              value: String(itemsPerPage),
              onChange: (e) => handleItemsPerPageChange(Number(e.target.value)),
              onBlur: () => {
              },
              size: "small",
              className: "!w-14 !h-6 !text-xs !py-0 !px-1! !border-none !bg-transparent !ring-0 focus:!ring-0 cursor-pointer font-bold text-secondary-700",
              placeholder: ""
            }
          )
        ] }),
        /* @__PURE__ */ jsx11("span", { className: "text-secondary-400", children: "|" }),
        /* @__PURE__ */ jsxs8("span", { className: "text-xs", children: [
          /* @__PURE__ */ jsx11("span", { className: "font-semibold text-secondary-700", children: Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length) }),
          " - ",
          /* @__PURE__ */ jsx11("span", { className: "font-semibold text-secondary-700", children: Math.min(currentPage * itemsPerPage, filteredData.length) }),
          " de ",
          /* @__PURE__ */ jsx11("span", { className: "font-semibold text-secondary-900", children: filteredData.length })
        ] })
      ] }),
      /* @__PURE__ */ jsxs8("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx11(
          ITButton,
          {
            color: "secondary",
            size: "small",
            variant: "text",
            onClick: () => goToPage(currentPage - 1),
            disabled: currentPage === 1,
            className: "!p-2 hover:bg-secondary-100 rounded-full text-secondary-600 disabled:opacity-30 transition-all",
            ariaLabel: "P\xE1gina anterior",
            children: /* @__PURE__ */ jsx11(FaArrowLeft, { "aria-hidden": "true", className: "w-3.5 h-3.5" })
          }
        ),
        /* @__PURE__ */ jsx11("div", { className: "flex items-center mx-1 text-sm font-medium text-secondary-600 bg-secondary-50 px-3 py-1 rounded-lg border border-secondary-200 min-w-[3rem] justify-center", children: currentPage }),
        /* @__PURE__ */ jsxs8("span", { className: "text-xs text-secondary-400", children: [
          "de ",
          totalPages || 1
        ] }),
        /* @__PURE__ */ jsx11(
          ITButton,
          {
            size: "small",
            color: "secondary",
            variant: "text",
            onClick: () => goToPage(currentPage + 1),
            disabled: currentPage === totalPages || totalPages === 0,
            className: "!p-2 hover:bg-secondary-100 rounded-full text-secondary-600 disabled:opacity-30 transition-all",
            ariaLabel: "P\xE1gina siguiente",
            children: /* @__PURE__ */ jsx11(FaArrowRight, { "aria-hidden": "true", className: "w-3.5 h-3.5" })
          }
        )
      ] })
    ] })
  ] });
}

// src/types/toast.types.ts
var toastStyles = {
  success: "bg-green-500 text-white",
  error: "bg-red-500 text-white",
  warning: "bg-yellow-500 text-black",
  info: "bg-slate-500 text-white"
};
var positionStyles = {
  "top-right": "top-4 right-4",
  "top-center": "top-4 left-1/2 transform -translate-x-1/2",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
  "bottom-left": "bottom-4 left-4"
};

// src/components/toast/toast.tsx
import clsx9 from "clsx";
import { useEffect as useEffect6, useState as useState7 } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { jsx as jsx12, jsxs as jsxs9 } from "react/jsx-runtime";
function ITToast({
  message,
  type = "info",
  duration = 1500,
  position = "top-right",
  onClose
}) {
  const [isVisible, setIsVisible] = useState7(true);
  useEffect6(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  return /* @__PURE__ */ jsxs9(
    "div",
    {
      className: clsx9(
        "fixed z-50 p-4 rounded-lg shadow-lg flex items-center justify-between transition-opacity duration-300",
        toastStyles[type],
        positionStyles[position],
        {
          "opacity-100": isVisible,
          "opacity-0": !isVisible
        }
      ),
      children: [
        /* @__PURE__ */ jsx12("span", { children: message }),
        /* @__PURE__ */ jsx12(
          "button",
          {
            onClick: () => setIsVisible(false),
            className: "ml-4 p-1 rounded-full hover:bg-black/10",
            children: /* @__PURE__ */ jsx12(FaTimesCircle, {})
          }
        )
      ]
    }
  );
}

// src/components/navbar/navbar.tsx
import { useRef as useRef4, useState as useState8 } from "react";
import { FaChevronDown, FaChevronRight as FaChevronRight2, FaUserCircle } from "react-icons/fa";
import { jsx as jsx13, jsxs as jsxs10 } from "react/jsx-runtime";
function ITNavbar({
  logo,
  logoText,
  navigationItems = [],
  userMenu,
  children,
  // Legacy props for backward compatibility
  navItems,
  showSidebar = false,
  showSidebarOnMobile = false,
  sidebarItems
}) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState8(false);
  const [expandedItems, setExpandedItems] = useState8(/* @__PURE__ */ new Set());
  const userMenuRef = useRef4(null);
  useClickOutside_default(userMenuRef, () => setIsUserMenuOpen(false));
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };
  const handleItemClick = (item) => {
    if (item.subitems && item.subitems.length > 0) {
      toggleExpanded(item.id);
    } else if (item.action) {
      item.action();
    }
  };
  const shouldUseLegacy = !navigationItems.length && (navItems || sidebarItems);
  if (shouldUseLegacy) {
    return /* @__PURE__ */ jsxs10("div", { className: "flex flex-col h-screen", children: [
      /* @__PURE__ */ jsx13("nav", { className: "bg-white border-b border-gray-200", children: /* @__PURE__ */ jsxs10("div", { className: "flex items-center justify-between mx-auto p-4", children: [
        /* @__PURE__ */ jsxs10("div", { className: "flex items-center space-x-3 rtl:space-x-reverse", children: [
          logo && /* @__PURE__ */ jsx13("div", { className: "h-8", children: logo }),
          logoText && /* @__PURE__ */ jsx13("span", { className: "self-center text-2xl font-semibold whitespace-nowrap text-gray-900", children: logoText })
        ] }),
        /* @__PURE__ */ jsx13("div", { className: "flex items-center justify-end w-full md:w-auto md:order-2", children: /* @__PURE__ */ jsxs10("div", { className: "flex items-center space-x-4 md:order-2", children: [
          /* @__PURE__ */ jsx13("ul", { className: "hidden md:flex space-x-4", children: navItems }),
          userMenu && /* @__PURE__ */ jsxs10("div", { className: "relative", children: [
            /* @__PURE__ */ jsx13(
              "button",
              {
                type: "button",
                className: "flex text-sm bg-gray-200 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300",
                onClick: toggleUserMenu,
                children: userMenu.userImage ? /* @__PURE__ */ jsx13(
                  "img",
                  {
                    className: "w-8 h-8 rounded-full",
                    src: userMenu.userImage,
                    alt: "user photo"
                  }
                ) : /* @__PURE__ */ jsx13(FaUserCircle, { className: "w-8 h-8 text-gray-500" })
              }
            ),
            isUserMenuOpen && /* @__PURE__ */ jsxs10(
              "div",
              {
                ref: userMenuRef,
                className: "z-50 absolute right-0 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm",
                children: [
                  /* @__PURE__ */ jsxs10("div", { className: "px-4 py-3", children: [
                    /* @__PURE__ */ jsx13("span", { className: "block text-sm text-gray-900", children: userMenu.userName }),
                    /* @__PURE__ */ jsx13("span", { className: "block text-sm text-gray-500 truncate", children: userMenu.userEmail })
                  ] }),
                  /* @__PURE__ */ jsx13("ul", { className: "py-2", children: userMenu.menuItems.map((item, index) => /* @__PURE__ */ jsx13("li", { children: /* @__PURE__ */ jsx13(
                    "button",
                    {
                      onClick: () => {
                        item.onClick();
                        setIsUserMenuOpen(false);
                      },
                      className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left",
                      children: item.label
                    }
                  ) }, index)) })
                ]
              }
            )
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxs10("div", { className: "flex-1 flex overflow-hidden relative", children: [
        (showSidebar || showSidebarOnMobile) && /* @__PURE__ */ jsx13("aside", { className: "fixed inset-y-0 left-0 w-64 bg-gray-50 transform transition-transform duration-300 ease-in-out z-50 shadow-lg md:static md:transform-none md:shadow-none md:border-r md:border-gray-200", children: /* @__PURE__ */ jsx13("div", { className: "h-full overflow-y-auto py-4 px-3", children: /* @__PURE__ */ jsx13("ul", { className: "space-y-2 font-medium", children: sidebarItems }) }) }),
        /* @__PURE__ */ jsx13("main", { className: "flex-1 bg-gray-100 overflow-y-auto", children })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs10("div", { className: "flex h-screen bg-gray-50 font-sans", children: [
    /* @__PURE__ */ jsxs10("aside", { className: "w-72 bg-secondary-900 shadow-xl flex flex-col transition-all duration-300 ease-in-out", children: [
      /* @__PURE__ */ jsxs10("div", { className: "p-6 border-b border-secondary-800/50 flex items-center gap-3", children: [
        logo && /* @__PURE__ */ jsx13("div", { className: "h-8 w-auto object-contain transition-transform hover:scale-105", children: logo }),
        logoText && /* @__PURE__ */ jsx13("span", { className: "text-lg font-bold text-white tracking-wide", children: logoText })
      ] }),
      /* @__PURE__ */ jsx13("nav", { className: "flex-1 px-4 py-6 overflow-y-auto custom-scrollbar", children: /* @__PURE__ */ jsx13("ul", { className: "space-y-1.5", children: navigationItems.map((item) => /* @__PURE__ */ jsxs10("li", { children: [
        /* @__PURE__ */ jsxs10(
          "div",
          {
            className: `group flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 border-l-4 ${item.isActive ? "bg-secondary-800/60 border-primary-500 text-white shadow-sm" : "border-transparent text-secondary-400 hover:bg-secondary-800 hover:text-white"}`,
            onClick: () => handleItemClick(item),
            children: [
              /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-3", children: [
                item.icon && /* @__PURE__ */ jsx13("div", { className: `text-xl transition-colors ${item.isActive ? "text-primary-400" : "text-secondary-500 group-hover:text-white"}`, children: item.icon }),
                /* @__PURE__ */ jsx13("span", { className: `font-medium text-sm ${item.isActive ? "font-semibold" : ""}`, children: item.label })
              ] }),
              item.subitems && item.subitems.length > 0 && /* @__PURE__ */ jsx13("div", { className: "text-secondary-500 group-hover:text-white transition-transform", children: expandedItems.has(item.id) ? /* @__PURE__ */ jsx13(FaChevronDown, { className: "w-3 h-3" }) : /* @__PURE__ */ jsx13(FaChevronRight2, { className: "w-3 h-3" }) })
            ]
          }
        ),
        item.subitems && item.subitems.length > 0 && expandedItems.has(item.id) && /* @__PURE__ */ jsx13("ul", { className: "mt-1 ml-4 pl-4 border-l border-secondary-800 space-y-1", children: item.subitems.map((subitem) => /* @__PURE__ */ jsx13("li", { children: /* @__PURE__ */ jsx13(
          "button",
          {
            onClick: subitem.action,
            className: `block w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${subitem.isActive ? "text-primary-400 font-medium bg-secondary-800/30" : "text-secondary-400 hover:text-white hover:bg-secondary-800/30"}`,
            children: subitem.label
          }
        ) }, subitem.id)) })
      ] }, item.id)) }) }),
      userMenu && /* @__PURE__ */ jsx13("div", { className: "p-4 border-t border-secondary-800", children: /* @__PURE__ */ jsxs10("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs10(
          "button",
          {
            type: "button",
            className: "flex items-center gap-3 w-full p-3 rounded-xl hover:bg-secondary-800 transition-colors duration-200 group",
            onClick: toggleUserMenu,
            children: [
              userMenu.userImage ? /* @__PURE__ */ jsx13(
                "img",
                {
                  className: "w-10 h-10 rounded-full border-2 border-secondary-700 group-hover:border-primary-500 transition-colors",
                  src: userMenu.userImage,
                  alt: "user photo"
                }
              ) : /* @__PURE__ */ jsx13("div", { className: "w-10 h-10 rounded-full bg-secondary-800 flex items-center justify-center text-secondary-400 group-hover:text-white group-hover:bg-secondary-700 transition-colors", children: /* @__PURE__ */ jsx13(FaUserCircle, { className: "w-6 h-6" }) }),
              /* @__PURE__ */ jsxs10("div", { className: "flex-1 text-left overflow-hidden", children: [
                /* @__PURE__ */ jsx13("div", { className: "text-white font-medium text-sm truncate group-hover:text-primary-400 transition-colors", children: userMenu.userName }),
                /* @__PURE__ */ jsx13("div", { className: "text-secondary-500 text-xs truncate", children: userMenu.userEmail })
              ] }),
              /* @__PURE__ */ jsx13(FaChevronRight2, { className: "text-secondary-600 w-3 h-3 group-hover:text-white transition-colors" })
            ]
          }
        ),
        isUserMenuOpen && /* @__PURE__ */ jsxs10(
          "div",
          {
            ref: userMenuRef,
            className: "absolute bottom-full left-0 mb-3 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-200 origin-bottom",
            children: [
              /* @__PURE__ */ jsxs10("div", { className: "bg-gray-50 px-4 py-3 border-b border-gray-100", children: [
                /* @__PURE__ */ jsx13("span", { className: "block text-sm font-semibold text-gray-800", children: userMenu.userName }),
                /* @__PURE__ */ jsx13("span", { className: "block text-xs text-gray-500 truncate", children: userMenu.userEmail })
              ] }),
              /* @__PURE__ */ jsx13("ul", { className: "py-1", children: userMenu.menuItems.map((item, index) => /* @__PURE__ */ jsx13("li", { children: /* @__PURE__ */ jsx13(
                "button",
                {
                  onClick: () => {
                    item.onClick();
                    setIsUserMenuOpen(false);
                  },
                  className: "flex items-center w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary-600 transition-colors",
                  children: item.label
                }
              ) }, index)) })
            ]
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx13("main", { className: "flex-1 overflow-y-auto bg-gray-50/50 relative", children })
  ] });
}

// src/components/text/text.tsx
import { jsx as jsx14 } from "react/jsx-runtime";
function ITText({ children, className = "" }) {
  return /* @__PURE__ */ jsx14("p", { className: `${className} text-gray-900 `, children });
}

// src/components/image/image.tsx
import { useState as useState9 } from "react";
import { jsx as jsx15 } from "react/jsx-runtime";
var ITImage = ({
  src,
  alt,
  className = "",
  fallbackSrc = ""
}) => {
  const [imageError, setImageError] = useState9(false);
  const handleImageError = () => {
    setImageError(true);
  };
  return /* @__PURE__ */ jsx15(
    "div",
    {
      className: `${className} flex items-center justify-center bg-transparent`,
      children: imageError ? /* @__PURE__ */ jsx15(
        "img",
        {
          src: fallbackSrc,
          alt: "Fallback",
          className: "w-full h-full object-cover"
        }
      ) : /* @__PURE__ */ jsx15(
        "img",
        {
          src,
          alt,
          onError: handleImageError,
          className: "w-full h-full object-cover"
        }
      )
    }
  );
};
var image_default = ITImage;

// src/components/badget/badget.tsx
import clsx10 from "clsx";

// src/types/badget.types.ts
var badgeSizes = {
  small: "text-xs px-2 py-1",
  medium: "text-sm px-3 py-1.5",
  large: "text-base px-4 py-2"
};

// src/components/badget/badget.tsx
import { jsx as jsx16 } from "react/jsx-runtime";
function ITBadget({
  children,
  label,
  color = "primary",
  size = "medium",
  variant = "filled",
  className
}) {
  const badgeTheme = theme.badge?.[color] || theme.badge?.primary;
  const dynamicStyle = {};
  if (variant === "filled") {
    dynamicStyle.backgroundColor = badgeTheme.backgroundColor;
    dynamicStyle.color = badgeTheme.color;
  } else if (variant === "outlined") {
    dynamicStyle.backgroundColor = "transparent";
    dynamicStyle.color = badgeTheme.borderColor || badgeTheme.backgroundColor;
    dynamicStyle.borderWidth = "1px";
    dynamicStyle.borderStyle = "solid";
    dynamicStyle.borderColor = badgeTheme.borderColor || badgeTheme.backgroundColor;
  }
  return /* @__PURE__ */ jsx16(
    "span",
    {
      className: clsx10(
        "font-medium rounded-full inline-flex items-center justify-center",
        // Added justify-center for better alignment
        badgeSizes[size],
        className
      ),
      style: dynamicStyle,
      children: children || /* @__PURE__ */ jsx16("span", { className: clsx10("font-semibold"), children: label })
    }
  );
}

// src/types/yup.types.ts
import * as Yup from "yup";
var createValidationSchema = (fields) => Yup.object().shape(
  fields.reduce((acc, field) => {
    if (field.validation) {
      acc[field.name] = field.validation;
    }
    return acc;
  }, {})
);

// src/types/loader.types.ts
var sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
  xl: "h-16 w-16"
};

// src/components/loader/loader.tsx
import { jsx as jsx17 } from "react/jsx-runtime";
function ITLoader({
  size = "md",
  variant = "spinner",
  color = "text-slate-500",
  className = ""
}) {
  if (variant === "spinner") {
    return /* @__PURE__ */ jsx17(
      "div",
      {
        className: `inline-block ${sizeClasses[size]} animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${color} ${className}`,
        role: "status",
        children: /* @__PURE__ */ jsx17("span", { className: "!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]", children: "Loading..." })
      }
    );
  }
  if (variant === "dots") {
    return /* @__PURE__ */ jsx17(
      "div",
      {
        className: `flex items-center justify-center space-x-2 ${className}`,
        children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsx17(
          "div",
          {
            className: `${sizeClasses[size.replace(/l|g/, "")]} animate-bounce rounded-full ${color}`,
            style: { animationDelay: `${i * 0.1}s` }
          },
          i
        ))
      }
    );
  }
  if (variant === "bar") {
    return /* @__PURE__ */ jsx17(
      "div",
      {
        className: `w-full ${size === "sm" ? "h-1" : size === "md" ? "h-1.5" : size === "lg" ? "h-2" : "h-2.5"} bg-gray-200 rounded-full overflow-hidden ${className}`,
        children: /* @__PURE__ */ jsx17(
          "div",
          {
            className: `h-full ${color} animate-progress`,
            style: {
              backgroundImage: `linear-gradient(to right, currentColor, ${color.replace(
                "text",
                "bg"
              )})`,
              animation: "progress 1.5s ease-in-out infinite"
            }
          }
        )
      }
    );
  }
  if (variant === "pulse") {
    return /* @__PURE__ */ jsx17(
      "div",
      {
        className: `rounded-full ${sizeClasses[size]} animate-pulse ${color} ${className}`
      }
    );
  }
  return null;
}

// src/components/layout/layout.tsx
import { useState as useState12 } from "react";

// src/components/topbar/topbar.tsx
import { FaUserCircle as FaUserCircle2, FaBars } from "react-icons/fa";
import { useRef as useRef5, useState as useState10 } from "react";
import { jsx as jsx18, jsxs as jsxs11 } from "react/jsx-runtime";
function ITTopBar({
  logo,
  logoText,
  userMenu,
  showMobileMenuButton,
  onToggleMobileMenu,
  navItems,
  onNavItemClick
}) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState10(false);
  const userMenuRef = useRef5(null);
  useClickOutside_default(userMenuRef, () => setIsUserMenuOpen(false));
  return /* @__PURE__ */ jsx18("header", { className: "bg-white border-b border-gray-200 shadow-sm", children: /* @__PURE__ */ jsxs11("div", { className: "flex items-center justify-between h-16 px-6", children: [
    /* @__PURE__ */ jsxs11("div", { className: "flex items-center gap-4", children: [
      showMobileMenuButton && /* @__PURE__ */ jsx18(
        "button",
        {
          className: "lg:hidden p-2 rounded-lg hover:bg-gray-100",
          onClick: onToggleMobileMenu,
          children: /* @__PURE__ */ jsx18(FaBars, { className: "text-gray-700 w-5 h-5" })
        }
      ),
      logo,
      logoText && /* @__PURE__ */ jsx18("span", { className: "text-xl font-semibold text-gray-900", children: logoText }),
      navItems && navItems.length > 0 && /* @__PURE__ */ jsx18("nav", { className: "hidden md:flex ml-6 space-x-4", children: navItems.map((item) => /* @__PURE__ */ jsx18(
        "button",
        {
          onClick: () => onNavItemClick?.(item.id),
          className: "text-gray-700 hover:text-slate-600 font-medium",
          children: item.label
        },
        item.id
      )) })
    ] }),
    userMenu && /* @__PURE__ */ jsxs11("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs11(
        "button",
        {
          type: "button",
          className: "flex items-center space-x-3 text-sm bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100",
          onClick: () => setIsUserMenuOpen(!isUserMenuOpen),
          children: [
            userMenu.userImage ? /* @__PURE__ */ jsx18(
              "img",
              {
                className: "w-8 h-8 rounded-full",
                src: userMenu.userImage,
                alt: "user photo"
              }
            ) : /* @__PURE__ */ jsx18(FaUserCircle2, { className: "w-8 h-8 text-gray-500" }),
            /* @__PURE__ */ jsxs11("div", { className: "hidden sm:block text-left", children: [
              /* @__PURE__ */ jsx18("div", { className: "font-medium text-gray-900 text-sm", children: userMenu.userName }),
              /* @__PURE__ */ jsx18("div", { className: "text-gray-500 text-xs", children: userMenu.userEmail })
            ] })
          ]
        }
      ),
      isUserMenuOpen && /* @__PURE__ */ jsxs11(
        "div",
        {
          ref: userMenuRef,
          className: "absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50",
          children: [
            /* @__PURE__ */ jsxs11("div", { className: "px-4 py-3 border-b", children: [
              /* @__PURE__ */ jsx18("span", { className: "block font-medium", children: userMenu.userName }),
              /* @__PURE__ */ jsx18("span", { className: "text-gray-500 text-sm truncate", children: userMenu.userEmail })
            ] }),
            /* @__PURE__ */ jsx18("ul", { className: "py-2", children: userMenu.menuItems.map((m, i) => /* @__PURE__ */ jsx18("li", { children: /* @__PURE__ */ jsx18(
              "button",
              {
                onClick: m.onClick,
                className: "block w-full text-left px-4 py-2 hover:bg-gray-100",
                children: m.label
              }
            ) }, i)) })
          ]
        }
      )
    ] })
  ] }) });
}

// src/components/sidebar/sidebar.tsx
import { useEffect as useEffect7, useRef as useRef6, useState as useState11 } from "react";
import { FaBars as FaBars2, FaChevronDown as FaChevronDown2 } from "react-icons/fa";
import { jsx as jsx19, jsxs as jsxs12 } from "react/jsx-runtime";
function ITSidebar({
  navigationItems = [],
  isCollapsed = false,
  onToggleCollapse,
  className = "",
  visibleOnMobile = false
}) {
  const [expandedItems, setExpandedItems] = useState11(/* @__PURE__ */ new Set());
  const [isHovering, setIsHovering] = useState11(false);
  const [autoCollapsed, setAutoCollapsed] = useState11(false);
  const sidebarRef = useRef6(null);
  const hoverTimeoutRef = useRef6(null);
  const leaveTimeoutRef = useRef6(null);
  useEffect7(() => {
    const handleMouseEnter = () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
      setIsHovering(true);
      setAutoCollapsed(false);
    };
    const handleMouseLeave = () => {
      leaveTimeoutRef.current = setTimeout(() => {
        setIsHovering(false);
        if (!isCollapsed) {
          setAutoCollapsed(true);
        }
      }, 300);
    };
    const sidebar = sidebarRef.current;
    if (sidebar) {
      sidebar.addEventListener("mouseenter", handleMouseEnter);
      sidebar.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (sidebar) {
        sidebar.removeEventListener("mouseenter", handleMouseEnter);
        sidebar.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    };
  }, [isCollapsed]);
  const toggleExpanded = (itemId) => {
    if (autoCollapsed) return;
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };
  const handleItemClick = (item) => {
    if (item.subitems && item.subitems.length > 0) {
      if (autoCollapsed || isCollapsed) {
        setIsHovering(true);
        setAutoCollapsed(false);
        onToggleCollapse?.();
        setExpandedItems(/* @__PURE__ */ new Set([item.id]));
      } else {
        toggleExpanded(item.id);
      }
    } else if (item.action) {
      item.action();
    }
  };
  const isSidebarCollapsed = autoCollapsed || isCollapsed;
  const sidebarWidth = isSidebarCollapsed ? "w-20" : "w-72";
  return /* @__PURE__ */ jsxs12(
    "aside",
    {
      ref: sidebarRef,
      className: `
        relative 
        shadow-xl flex flex-col transition-all duration-300 ease-in-out
        ${sidebarWidth}
        ${className}
        ${!visibleOnMobile ? "hidden lg:flex" : "flex"}
        border-none
      `,
      style: {
        zIndex: 50,
        backgroundColor: theme.sidebar?.backgroundColor || "#1e261c"
        // Fallback to safe dark color
      },
      children: [
        /* @__PURE__ */ jsx19("div", { className: "p-6 flex items-center justify-between border-b border-white/10", children: /* @__PURE__ */ jsxs12(
          "button",
          {
            onClick: onToggleCollapse,
            className: `p-2 rounded-lg transition-all duration-200 group relative ${isSidebarCollapsed ? "mx-auto" : ""}`,
            style: { color: theme.sidebar?.icon?.color || "#54e073" },
            title: isSidebarCollapsed ? "Expandir sidebar" : "Colapsar sidebar",
            children: [
              /* @__PURE__ */ jsx19(FaBars2, { className: "w-5 h-5" }),
              isSidebarCollapsed && /* @__PURE__ */ jsx19("div", { className: "absolute left-full top-1/2 transform -translate-y-1/2 ml-3 bg-white text-zinc-900 text-xs font-semibold rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg border border-zinc-100 z-50", children: "Expandir" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx19("nav", { className: "flex-1 py-6 overflow-y-auto overflow-x-hidden custom-scrollbar px-3", children: /* @__PURE__ */ jsx19("ul", { className: "space-y-1.5", children: navigationItems.map((item) => /* @__PURE__ */ jsxs12("li", { className: "relative", children: [
          /* @__PURE__ */ jsxs12(
            "div",
            {
              className: `group relative flex items-center cursor-pointer 
                  transition-all duration-200 rounded-xl overflow-hidden
                  ${isSidebarCollapsed ? "justify-center p-3" : "justify-between px-4 py-3"}
                  ${item.isActive ? "bg-white/10 shadow-sm" : "hover:bg-white/5"}`,
              onClick: () => handleItemClick(item),
              children: [
                item.isActive && !isSidebarCollapsed && /* @__PURE__ */ jsx19(
                  "div",
                  {
                    className: "absolute left-0 top-0 bottom-0 w-1 rounded-l-md",
                    style: { backgroundColor: theme.sidebar?.icon?.color || "#54e073" }
                  }
                ),
                /* @__PURE__ */ jsxs12("div", { className: `flex items-center ${!isSidebarCollapsed ? "gap-3" : ""} relative z-10`, children: [
                  item.icon && /* @__PURE__ */ jsx19(
                    "div",
                    {
                      className: `transition-colors duration-200 flex-shrink-0 flex items-center justify-center`,
                      style: {
                        color: item.isActive ? theme.sidebar?.icon?.color || "#54e073" : theme.sidebar?.icon?.color || "#54e073",
                        // Icon color is usually consistent or dimmed
                        opacity: item.isActive ? 1 : 0.7,
                        fontSize: theme.sidebar?.icon?.size || "1.25rem"
                      },
                      children: item.icon
                    }
                  ),
                  !isSidebarCollapsed && /* @__PURE__ */ jsx19(
                    "span",
                    {
                      className: `transition-colors truncate`,
                      style: {
                        color: theme.sidebar?.label?.color || "#ffffff",
                        fontSize: theme.sidebar?.label?.size || "0.875rem",
                        fontWeight: item.isActive ? "600" : theme.sidebar?.label?.weight || "500"
                      },
                      children: item.label
                    }
                  )
                ] }),
                !isSidebarCollapsed && item.subitems && item.subitems.length > 0 && /* @__PURE__ */ jsx19(
                  "div",
                  {
                    className: `flex-shrink-0 transition-transform duration-200 ${expandedItems.has(item.id) ? "rotate-180" : ""}`,
                    style: { color: theme.sidebar?.label?.color || "#ffffff", opacity: 0.5 },
                    children: /* @__PURE__ */ jsx19(FaChevronDown2, { className: "w-3 h-3" })
                  }
                ),
                item.badge && /* @__PURE__ */ jsx19("span", { className: `
                    absolute bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2
                    ${isSidebarCollapsed ? "top-2 right-2 min-w-[14px] h-[14px]" : "right-3 top-1/2 transform -translate-y-1/2 min-w-[18px] h-[18px] px-1"}
                  `, style: { borderColor: theme.sidebar?.backgroundColor || "#1e261c" }, children: isSidebarCollapsed ? "" : item.badge })
              ]
            }
          ),
          isSidebarCollapsed && /* @__PURE__ */ jsxs12("div", { className: "absolute left-full top-0 ml-3 bg-white text-zinc-800 text-sm rounded-xl p-0 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl border border-zinc-100 min-w-[200px] overflow-hidden", children: [
            /* @__PURE__ */ jsxs12("div", { className: "bg-zinc-50 px-4 py-3 border-b border-zinc-100 flex items-center gap-2 font-semibold text-zinc-900", children: [
              item.icon && /* @__PURE__ */ jsx19("span", { style: { color: theme.sidebar?.icon?.color }, className: "text-lg", children: item.icon }),
              item.label
            ] }),
            item.subitems && item.subitems.length > 0 ? /* @__PURE__ */ jsx19("div", { className: "py-1", children: item.subitems.map((subitem) => /* @__PURE__ */ jsxs12(
              "div",
              {
                className: `px-4 py-2 text-xs flex items-center gap-2`,
                children: [
                  /* @__PURE__ */ jsx19("span", { className: `w-1.5 h-1.5 rounded-full`, style: { backgroundColor: subitem.isActive ? theme.sidebar?.icon?.color : "#cbd5e1" } }),
                  /* @__PURE__ */ jsx19("span", { style: { color: subitem.isActive ? "#000" : "#64748b", fontWeight: subitem.isActive ? 600 : 400 }, children: subitem.label })
                ]
              },
              subitem.id
            )) }) : /* @__PURE__ */ jsx19("div", { className: "px-4 py-2 text-xs text-zinc-500 italic", children: "No hay submen\xFA" })
          ] }),
          !isSidebarCollapsed && item.subitems && item.subitems.length > 0 && expandedItems.has(item.id) && /* @__PURE__ */ jsx19("ul", { className: "mt-1 ml-4 pl-4 border-l border-white/10 space-y-1 animate-fade-in", children: item.subitems.map((subitem) => /* @__PURE__ */ jsx19("li", { children: /* @__PURE__ */ jsx19(
            "button",
            {
              onClick: subitem.action,
              className: `block w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200
                            ${subitem.isActive ? "bg-white/5" : "hover:bg-white/5"}`,
              style: {
                color: subitem.isActive ? theme.sidebar?.icon?.color || "#54e073" : theme.sidebar?.label?.color || "#ffffff",
                fontSize: "0.8125rem",
                // 13px
                fontWeight: subitem.isActive ? 500 : 400
              },
              children: subitem.label
            }
          ) }, subitem.id)) })
        ] }, item.id)) }) })
      ]
    }
  );
}

// src/components/layout/layout.tsx
import { jsx as jsx20, jsxs as jsxs13 } from "react/jsx-runtime";
function ITLayout({
  topBar,
  sidebar,
  children,
  className = ""
}) {
  const [desktopCollapsed, setDesktopCollapsed] = useState12(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState12(false);
  return /* @__PURE__ */ jsxs13("div", { className: `flex flex-col h-screen ${className}`, children: [
    /* @__PURE__ */ jsx20(
      ITTopBar,
      {
        ...topBar,
        showMobileMenuButton: true,
        onToggleMobileMenu: () => setMobileSidebarOpen((v) => !v)
      }
    ),
    /* @__PURE__ */ jsxs13("div", { className: "flex flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsx20(
        ITSidebar,
        {
          ...sidebar,
          isCollapsed: desktopCollapsed,
          onToggleCollapse: () => setDesktopCollapsed((v) => !v),
          visibleOnMobile: false
        }
      ),
      mobileSidebarOpen && /* @__PURE__ */ jsx20(
        "div",
        {
          className: "lg:hidden fixed inset-0 bg-black bg-opacity-40 z-40",
          onClick: () => setMobileSidebarOpen(false),
          children: /* @__PURE__ */ jsx20(
            ITSidebar,
            {
              ...sidebar,
              isCollapsed: false,
              visibleOnMobile: true,
              className: "absolute left-0 top-0 h-full z-50"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx20("main", { className: "flex-1 overflow-y-auto bg-gray-50 p-6 z-10", children })
    ] })
  ] });
}

// src/components/time-picker/timePicker.tsx
import clsx11 from "clsx";
import { useEffect as useEffect8, useRef as useRef7, useState as useState13 } from "react";
import { FaClock } from "react-icons/fa";
import { jsx as jsx21, jsxs as jsxs14 } from "react/jsx-runtime";
function ITTimePicker({
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
  variant = "primary"
}) {
  const [isOpen, setIsOpen] = useState13(false);
  const [inputValue, setInputValue] = useState13(value || "");
  const [isValidTime, setIsValidTime] = useState13(true);
  const wrapperRef = useRef7(null);
  useEffect8(() => {
    setInputValue(value || "");
  }, [value]);
  useEffect8(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const validateTime = (timeString) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(timeString);
  };
  const handleInputChange = (e) => {
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
  const timeOptions = Array.from(
    { length: 24 },
    (_, hour) => Array.from({ length: 60 / 15 }, (_2, step) => {
      const minute = step * 15;
      const hh = hour.toString().padStart(2, "0");
      const mm = minute.toString().padStart(2, "0");
      return `${hh}:${mm}`;
    })
  ).flat();
  return /* @__PURE__ */ jsxs14("div", { ref: wrapperRef, className: clsx11("relative w-full", className), children: [
    /* @__PURE__ */ jsx21(
      ITInput,
      {
        name,
        label,
        placeholder,
        type: "text",
        value: inputValue,
        onChange: handleInputChange,
        onBlur: handleBlurInput,
        maxLength: 5,
        required,
        disabled,
        variant,
        size,
        touched,
        error: !isValidTime ? "Hora inv\xE1lida" : error,
        iconRight: /* @__PURE__ */ jsx21(
          FaClock,
          {
            onClick: () => setIsOpen(!isOpen),
            className: "text-slate-900 cursor-pointer"
          }
        )
      }
    ),
    isOpen && /* @__PURE__ */ jsx21(
      "div",
      {
        className: "absolute z-[9999] bg-white border border-gray-200 shadow-lg rounded-lg mt-1 w-full max-h-60 overflow-y-auto",
        children: timeOptions.map((t, idx) => /* @__PURE__ */ jsx21(
          "div",
          {
            className: "px-3 py-2 cursor-pointer hover:bg-gray-100",
            onClick: () => {
              setInputValue(t);
              onChange({ target: { name, value: t } });
              setIsValidTime(true);
              setIsOpen(false);
            },
            children: t
          },
          idx
        ))
      }
    )
  ] });
}

// src/components/dropfile/dropfile.tsx
import { useState as useState14, useEffect as useEffect9, useRef as useRef8 } from "react";
import { useDropzone } from "react-dropzone";
import clsx12 from "clsx";
import { Fragment as Fragment2, jsx as jsx22, jsxs as jsxs15 } from "react/jsx-runtime";
var ITDropfile = ({
  onFileSelect,
  onCancel,
  onSubmit,
  contentClassName,
  containerClassName,
  acceptedFileTypes = ["application/pdf" /* PDF */, "application/vnd.ms-excel" /* XLS */, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" /* XLSX */, "image/jpg" /* JPG */, "image/png" /* PNG */, "image/jpeg" /* JPEG */],
  showStatusBadge = true,
  uploadStatus: externalStatus,
  onStatusChange,
  initialPreviewUrl
}) => {
  const [selectedFile, setSelectedFile] = useState14(null);
  const [fileType, setFileType] = useState14(null);
  const [imagePreview, setImagePreview] = useState14(initialPreviewUrl || null);
  const [isConfirmed, setIsConfirmed] = useState14(false);
  const [internalUploadStatus, setInternalUploadStatus] = useState14(
    initialPreviewUrl ? "subido" /* UPLOADED */ : "pendiente" /* PENDING */
  );
  const canvasRef = useRef8(null);
  useEffect9(() => {
    if (initialPreviewUrl && !selectedFile) {
      setImagePreview(initialPreviewUrl);
      if (externalStatus === void 0) setInternalUploadStatus("subido" /* UPLOADED */);
    }
  }, [initialPreviewUrl, selectedFile, externalStatus]);
  const uploadStatus = externalStatus || internalUploadStatus;
  const setUploadStatus = (status) => {
    if (externalStatus === void 0) {
      setInternalUploadStatus(status);
    }
    onStatusChange?.(status);
  };
  const getAcceptedFileTypes = () => {
    const accept = {};
    acceptedFileTypes.forEach((type) => {
      switch (type) {
        case "application/pdf" /* PDF */:
          accept["application/pdf" /* PDF */] = [".pdf"];
          break;
        case "application/vnd.ms-excel" /* XLS */:
          accept["application/vnd.ms-excel" /* XLS */] = [".xls"];
          break;
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" /* XLSX */:
          accept["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" /* XLSX */] = [".xlsx"];
          break;
        case "text/csv" /* CSV */:
          accept["text/csv" /* CSV */] = [".csv"];
          break;
        case "image/png" /* PNG */:
          accept["image/png" /* PNG */] = [".png"];
          break;
        case "image/jpg" /* JPG */:
          accept["image/jpg" /* JPG */] = [".jpg", ".jpeg"];
          break;
        case "image/jpeg" /* JPEG */:
          accept["image/jpeg" /* JPEG */] = [".jpeg", ".jpg"];
          break;
      }
    });
    return accept;
  };
  const getFileExtensions = () => {
    const extensions = [];
    acceptedFileTypes.forEach((type) => {
      switch (type) {
        case "application/pdf" /* PDF */:
          if (!extensions.includes("PDF")) extensions.push("PDF");
          break;
        case "application/vnd.ms-excel" /* XLS */:
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" /* XLSX */:
          if (!extensions.includes("EXCEL")) extensions.push("EXCEL");
          break;
        case "text/csv" /* CSV */:
          if (!extensions.includes("CSV")) extensions.push("CSV");
          break;
        case "image/png" /* PNG */:
        case "image/jpg" /* JPG */:
        case "image/jpeg" /* JPEG */:
          if (!extensions.includes("IMAGEN")) extensions.push("IMAGEN");
          break;
      }
    });
    return extensions.join(", ");
  };
  const StatusBadge = ({ status }) => {
    const config = {
      ["pendiente" /* PENDING */]: {
        label: "Pendiente",
        color: "bg-amber-100 text-amber-800 border-amber-200",
        dotColor: "bg-amber-400"
      },
      ["subiendo" /* UPLOADING */]: {
        label: "Subiendo...",
        color: "bg-teal-100 text-teal-800 border-teal-200",
        dotColor: "bg-teal-400 animate-pulse"
      },
      ["subido" /* UPLOADED */]: {
        label: "Subido",
        color: "bg-green-100 text-green-800 border-green-200",
        dotColor: "bg-green-400"
      },
      ["error" /* ERROR */]: {
        label: "Error",
        color: "bg-red-100 text-red-800 border-red-200",
        dotColor: "bg-red-400"
      }
    };
    const { label, color, dotColor } = config[status];
    return /* @__PURE__ */ jsxs15("div", { className: `inline-flex items-center gap-2 px-2.5 py-1 rounded-full border ${color}`, children: [
      /* @__PURE__ */ jsx22("div", { className: `w-2 h-2 rounded-full ${dotColor}` }),
      /* @__PURE__ */ jsx22("span", { className: "text-xs font-medium flex items-center gap-1.5", children: label })
    ] });
  };
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (acceptedFileTypes.includes(file.type)) {
        setSelectedFile(file);
        setFileType(file.type);
        setUploadStatus("pendiente" /* PENDING */);
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
          setImagePreview(null);
        }
        if (file.type.startsWith("image/")) {
          const previewUrl = URL.createObjectURL(file);
          setImagePreview(previewUrl);
        }
      } else {
        alert(`Tipo de archivo no permitido.`);
        setSelectedFile(null);
        setFileType(null);
        setImagePreview(null);
        setUploadStatus("pendiente" /* PENDING */);
      }
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: getAcceptedFileTypes(),
    maxFiles: 1
  });
  useEffect9(() => {
    const renderPDF = async () => {
    };
    renderPDF();
  }, [selectedFile, fileType]);
  useEffect9(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);
  const handleConfirm = async () => {
    if (selectedFile) {
      setIsConfirmed(true);
      setUploadStatus("subiendo" /* UPLOADING */);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        onFileSelect(selectedFile);
        onSubmit?.(selectedFile);
        setUploadStatus("subido" /* UPLOADED */);
      } catch (error) {
        setUploadStatus("error" /* ERROR */);
        console.error("Error al subir archivo:", error);
      }
    }
  };
  const handleCancel = () => {
    setSelectedFile(null);
    setFileType(null);
    setIsConfirmed(false);
    setUploadStatus("pendiente" /* PENDING */);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    onFileSelect(null);
    onCancel?.();
  };
  const handleDelete = () => {
    handleCancel();
  };
  const isImage = fileType && fileType.startsWith("image/");
  return /* @__PURE__ */ jsxs15("div", { className: clsx12("w-full transition-all duration-300", containerClassName), children: [
    /* @__PURE__ */ jsxs15("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsxs15("label", { className: "block text-sm font-semibold text-slate-700", children: [
        "Subir archivo ",
        /* @__PURE__ */ jsxs15("span", { className: "text-slate-400 font-normal text-xs", children: [
          "(",
          getFileExtensions(),
          ")"
        ] })
      ] }),
      showStatusBadge && selectedFile && /* @__PURE__ */ jsx22(StatusBadge, { status: uploadStatus })
    ] }),
    !selectedFile && !imagePreview ? /* @__PURE__ */ jsxs15(
      "div",
      {
        ...getRootProps(),
        className: `
            relative group flex flex-col items-center justify-center w-full p-6 
            border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ease-in-out
            ${isDragActive ? "border-teal-500 bg-teal-50 scale-[1.01]" : "border-slate-300 bg-white hover:border-teal-400 hover:bg-slate-50"}
          `,
        children: [
          /* @__PURE__ */ jsx22("input", { ...getInputProps() }),
          /* @__PURE__ */ jsx22("div", { className: `mb-3 p-3 rounded-full transition-colors duration-300 ${isDragActive ? "bg-teal-100" : "bg-slate-100 group-hover:bg-teal-50"}`, children: /* @__PURE__ */ jsx22(
            "svg",
            {
              className: `w-6 h-6 transition-colors duration-300 ${isDragActive ? "text-teal-600" : "text-slate-400 group-hover:text-teal-500"}`,
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: /* @__PURE__ */ jsx22("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" })
            }
          ) }),
          /* @__PURE__ */ jsx22("div", { className: "text-center space-y-1", children: /* @__PURE__ */ jsx22("p", { className: `text-sm font-medium transition-colors duration-300 ${isDragActive ? "text-teal-700" : "text-slate-700"}`, children: isDragActive ? "\xA1Suelta aqu\xED!" : "Haz clic o arrastra" }) })
        ]
      }
    ) : /* @__PURE__ */ jsxs15("div", { className: "w-full bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-fade-in", children: [
      /* @__PURE__ */ jsx22("div", { className: "flex items-center justify-between p-3 bg-slate-50 border-b border-slate-100", children: /* @__PURE__ */ jsxs15("div", { className: "flex items-center gap-3 overflow-hidden", children: [
        /* @__PURE__ */ jsx22("div", { className: "flex-shrink-0 w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600", children: selectedFile && fileType?.startsWith("image/") || !selectedFile && imagePreview ? /* @__PURE__ */ jsx22("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx22("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) : /* @__PURE__ */ jsx22("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx22("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }),
        /* @__PURE__ */ jsxs15("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx22("p", { className: "text-xs font-medium text-slate-900 truncate", title: selectedFile?.name || "Imagen cargada", children: selectedFile?.name || "Imagen cargada" }),
          /* @__PURE__ */ jsx22("p", { className: "text-[10px] text-slate-500", children: selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) + " MB" : "" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx22("div", { className: clsx12("relative bg-slate-100 flex items-center justify-center", !contentClassName ? "max-h-[200px] min-h-[100px] overflow-auto" : contentClassName), children: selectedFile && fileType?.startsWith("image/") || !selectedFile && imagePreview ? /* @__PURE__ */ jsx22(
        "img",
        {
          src: imagePreview,
          alt: "Vista previa",
          className: "w-full h-full object-contain max-h-[200px]"
        }
      ) : /* @__PURE__ */ jsxs15("div", { className: "py-8 flex flex-col items-center text-slate-400", children: [
        /* @__PURE__ */ jsx22("svg", { className: "w-10 h-10 mb-2 opacity-50", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx22("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" }) }),
        /* @__PURE__ */ jsx22("span", { className: "text-xs", children: "Sin vista previa" })
      ] }) }),
      /* @__PURE__ */ jsx22("div", { className: "px-3 py-2 bg-white border-t border-slate-100 flex justify-end gap-2", children: !isConfirmed ? /* @__PURE__ */ jsxs15(Fragment2, { children: [
        /* @__PURE__ */ jsx22(
          "button",
          {
            type: "button",
            onClick: handleCancel,
            className: "px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsxs15(
          "button",
          {
            type: "button",
            onClick: handleConfirm,
            className: "px-3 py-1.5 text-xs font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 shadow-sm transition-colors flex items-center gap-1",
            children: [
              /* @__PURE__ */ jsx22("span", { children: "Confirmar" }),
              /* @__PURE__ */ jsx22("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx22("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) })
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxs15(
        "button",
        {
          type: "button",
          onClick: handleDelete,
          className: "px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1",
          children: [
            /* @__PURE__ */ jsx22("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx22("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) }),
            /* @__PURE__ */ jsx22("span", { children: "Eliminar" })
          ]
        }
      ) }),
      uploadStatus === "subiendo" /* UPLOADING */ && /* @__PURE__ */ jsx22("div", { className: "px-4 pb-2", children: /* @__PURE__ */ jsx22("div", { className: "w-full bg-slate-200 rounded-full h-1.5", children: /* @__PURE__ */ jsx22(
        "div",
        {
          className: "bg-teal-600 h-1.5 rounded-full transition-all duration-1000 ease-out",
          style: {
            width: "100%",
            animation: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite"
          }
        }
      ) }) })
    ] })
  ] });
};
var dropfile_default = ITDropfile;

// src/components/stepper/stepper.tsx
import clsx13 from "clsx";
import { useEffect as useEffect10, useRef as useRef9, useState as useState15 } from "react";
import { Fragment as Fragment3, jsx as jsx23, jsxs as jsxs16 } from "react/jsx-runtime";
function ITStepper({
  steps,
  currentStep,
  onFinish,
  onStepChange,
  allowClickToJump = true,
  useIcons = false,
  disableNext = false,
  containerClassName,
  stepClassName,
  scrollableContent = false,
  maxContentHeight = "400px"
}) {
  const [direction, setDirection] = useState15("next");
  const contentRef = useRef9(null);
  const progressRef = useRef9(null);
  useEffect10(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);
  useEffect10(() => {
    const pct = currentStep / Math.max(1, steps.length - 1) * 100;
    if (progressRef.current) {
      progressRef.current.style.width = `${pct}%`;
    }
    if (contentRef.current) {
      contentRef.current.classList.remove(
        "animate-slide-in-left",
        "animate-slide-in-right"
      );
      requestAnimationFrame(() => {
        contentRef.current?.classList.add(
          direction === "next" ? "animate-slide-in-right" : "animate-slide-in-left"
        );
      });
    }
    contentRef.current?.focus();
  }, [currentStep, direction, steps.length]);
  const nextStep = () => {
    if (disableNext) return;
    if (currentStep < steps.length - 1) {
      setDirection("next");
      onStepChange?.(currentStep + 1);
    } else {
      onFinish?.();
    }
  };
  const prevStep = () => {
    if (currentStep > 0) {
      setDirection("prev");
      onStepChange?.(currentStep - 1);
    }
  };
  const jumpTo = (index) => {
    if (!allowClickToJump) return;
    if (index <= currentStep) {
      setDirection(index > currentStep ? "next" : "prev");
      onStepChange?.(index);
    }
  };
  const renderStepContent = (index, isCompleted, isActive) => {
    const step = steps[index];
    if (isCompleted) {
      return /* @__PURE__ */ jsx23(
        "svg",
        {
          className: "w-5 h-5",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          children: /* @__PURE__ */ jsx23(
            "path",
            {
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M5 13l4 4L19 7"
            }
          )
        }
      );
    }
    if (step.icon && useIcons) {
      return /* @__PURE__ */ jsx23("div", { className: "flex items-center justify-center w-5 h-5", children: step.icon });
    }
    return /* @__PURE__ */ jsx23("span", { className: "text-sm font-semibold", children: index + 1 });
  };
  return /* @__PURE__ */ jsxs16("div", { className: clsx13("w-full max-w-5xl mx-auto px-4", containerClassName), children: [
    /* @__PURE__ */ jsxs16("div", { className: "relative mb-8", children: [
      /* @__PURE__ */ jsx23(
        "div",
        {
          className: "absolute left-6 right-6 top-5 h-1 bg-gray-200 rounded-full z-0",
          "aria-hidden": true
        }
      ),
      /* @__PURE__ */ jsx23(
        "div",
        {
          ref: progressRef,
          className: "absolute left-6 top-5 h-1 bg-slate-400 rounded-full z-10 transition-all duration-500 ease-in-out",
          "aria-hidden": true
        }
      ),
      /* @__PURE__ */ jsx23("div", { className: "flex items-start justify-between space-x-2 relative z-20", children: steps.map((step, idx) => {
        const isActive = idx === currentStep;
        const isCompleted = idx < currentStep;
        const hasIcon = step.icon && useIcons;
        return /* @__PURE__ */ jsx23(
          "button",
          {
            type: "button",
            onClick: () => jumpTo(idx),
            disabled: !allowClickToJump && idx !== currentStep,
            "aria-current": isActive ? "step" : void 0,
            "aria-label": `Paso ${idx + 1} ${step.label}`,
            className: "flex-1 group",
            title: step.label,
            children: /* @__PURE__ */ jsxs16("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ jsx23(
                "div",
                {
                  className: `flex items-center justify-center w-11 h-11 rounded-full border-2 transition-all duration-300 transform ${isCompleted ? "bg-slate-400 border-slate-400 text-white scale-100 shadow" : isActive ? "bg-teal-500 border-teal-500 text-white scale-110 shadow-lg" : "bg-white border-gray-300 text-gray-400"} ${hasIcon ? "p-2" : ""}`,
                  children: renderStepContent(idx, isCompleted, isActive)
                }
              ),
              /* @__PURE__ */ jsx23(
                "span",
                {
                  className: `mt-2 text-xs sm:text-sm font-medium transition-colors text-center ${isActive ? "text-teal-500" : isCompleted ? "text-slate-400" : "text-gray-400"}`,
                  children: step.label
                }
              )
            ] })
          },
          idx
        );
      }) })
    ] }),
    /* @__PURE__ */ jsx23(
      "div",
      {
        ref: contentRef,
        tabIndex: -1,
        role: "region",
        "aria-labelledby": `step-${currentStep}`,
        className: clsx13(
          stepClassName,
          "bg-white border border-gray-100 rounded-2xl shadow-lg min-h-[280px] transition-transform duration-400 no-scrollbar",
          scrollableContent && "overflow-y-auto hide-scrollbar"
        ),
        style: scrollableContent && maxContentHeight ? { maxHeight: maxContentHeight } : void 0,
        children: steps[currentStep].content
      }
    ),
    /* @__PURE__ */ jsxs16("div", { className: "flex justify-between mt-6", children: [
      /* @__PURE__ */ jsxs16(
        "button",
        {
          onClick: prevStep,
          type: "button",
          disabled: currentStep === 0,
          className: `px-5 py-2 rounded-xl text-sm font-medium border transition-all duration-200 flex items-center ${currentStep === 0 ? "border-gray-200 text-gray-400 cursor-not-allowed opacity-60" : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-sm"}`,
          children: [
            /* @__PURE__ */ jsx23(
              "svg",
              {
                className: "w-4 h-4 mr-2",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                children: /* @__PURE__ */ jsx23(
                  "path",
                  {
                    strokeWidth: 2,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M15 19l-7-7 7-7"
                  }
                )
              }
            ),
            "Atr\xE1s"
          ]
        }
      ),
      /* @__PURE__ */ jsxs16("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs16("div", { className: "text-sm text-gray-500 mr-2 hidden sm:block", children: [
          "Paso ",
          currentStep + 1,
          " de ",
          steps.length
        ] }),
        /* @__PURE__ */ jsx23(
          "button",
          {
            onClick: nextStep,
            type: "button",
            disabled: disableNext,
            className: `px-6 py-2 rounded-xl text-sm font-medium flex items-center transition-all duration-200 ${disableNext ? "bg-gray-300 text-gray-600 cursor-not-allowed opacity-70" : "bg-gradient-to-r from-teal-500 to-slate-400 text-white hover:shadow-lg transform hover:scale-[1.02]"}`,
            children: currentStep === steps.length - 1 ? /* @__PURE__ */ jsxs16(Fragment3, { children: [
              "Finalizar",
              /* @__PURE__ */ jsx23(
                "svg",
                {
                  className: "w-4 h-4 ml-2",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  children: /* @__PURE__ */ jsx23(
                    "path",
                    {
                      strokeWidth: 2,
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M5 13l4 4L19 7"
                    }
                  )
                }
              )
            ] }) : /* @__PURE__ */ jsxs16(Fragment3, { children: [
              "Siguiente",
              /* @__PURE__ */ jsx23(
                "svg",
                {
                  className: "w-4 h-4 ml-2",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  children: /* @__PURE__ */ jsx23(
                    "path",
                    {
                      strokeWidth: 2,
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M9 5l7 7-7 7"
                    }
                  )
                }
              )
            ] })
          }
        )
      ] })
    ] })
  ] });
}
export {
  ITBadget,
  ITButton,
  calendar_default as ITCalendar,
  ITCard,
  ITDatePicker,
  ITDialog,
  dropfile_default as ITDropfile,
  ITFormBuilder,
  image_default as ITImage,
  ITInput,
  ITLayout,
  ITLoader,
  ITNavbar,
  ITSelect,
  ITSlideToggle,
  ITStepper,
  ITTable,
  ITText,
  ITTimePicker,
  ITToast,
  createValidationSchema
};
