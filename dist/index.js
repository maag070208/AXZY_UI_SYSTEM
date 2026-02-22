// src/types/button.types.ts
var buttonVariants = {
  filled: "border-transparent shadow-sm",
  outlined: "bg-transparent border-2",
  raised: "border-transparent shadow-md",
  rounded: "border-transparent shadow-sm rounded-full",
  text: "bg-transparent border-transparent shadow-none hover:bg-opacity-10",
  "raised-text": "bg-white border border-gray-200 shadow-sm hover:shadow-md",
  "icon-only": "p-2 aspect-square flex items-center justify-center border-transparent shadow-sm",
  link: "bg-transparent border-transparent shadow-none hover:underline px-0"
};
var buttonSizes = {
  small: "text-xs px-3 py-1.5",
  medium: "text-sm px-5 py-2.5",
  large: "text-lg px-6 py-3"
};

// src/components/button/button.tsx
import clsx from "clsx";
import { useState } from "react";

// src/theme/theme.ts
import colors from "tailwindcss/colors";
var palette = {
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554"
  },
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    950: "#083344"
  },
  gray: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617"
  },
  // Mantenemos los colores de estado pero actualizamos a tonos más suaves
  success: colors.emerald,
  danger: colors.rose,
  warning: colors.amber,
  purple: colors.violet,
  info: colors.sky
};
var semanticColors = {
  primary: palette.blue,
  secondary: palette.gray,
  success: palette.success,
  danger: palette.danger,
  warning: palette.warning,
  info: palette.cyan,
  // Usamos cyan para info en lugar de sky
  purple: palette.purple,
  error: palette.danger,
  gray: palette.gray
};
var components = {
  layout: {
    backgroundColor: semanticColors.gray[50],
    // Very light gray background for the main content area
    contentPadding: "1.5rem"
    // p-6
  },
  topbar: {
    backgroundColor: "rgba(255, 255, 255, 0.90)",
    // Glassmorphism base
    borderColor: semanticColors.gray[200],
    iconColor: semanticColors.gray[500],
    iconHoverColor: semanticColors.gray[700],
    shadow: "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.025)",
    textColor: semanticColors.gray[700],
    textHoverColor: semanticColors.gray[900],
    userMenu: {
      backgroundColor: semanticColors.gray[50],
      hoverBackground: semanticColors.gray[100],
      textColor: semanticColors.gray[900],
      subtitleColor: semanticColors.gray[500],
      dropdown: {
        backgroundColor: "#ffffff",
        borderColor: semanticColors.gray[200],
        itemHoverBackground: semanticColors.gray[50]
      }
    }
  },
  sidebar: {
    backgroundColor: "rgba(255, 255, 255, 0.90)",
    // Glassmorphism base like topbar
    borderColor: semanticColors.gray[200],
    label: {
      color: semanticColors.gray[700],
      size: "0.9rem",
      weight: "500"
    },
    icon: {
      color: semanticColors.gray[500],
      size: "1.25rem"
    },
    hover: {
      backgroundColor: semanticColors.gray[100]
    },
    active: {
      backgroundColor: semanticColors.gray[50],
      // Very subtle active bg in light mode
      color: semanticColors.gray[900],
      iconColor: "#10b981"
      // Emerald green
    },
    badge: {
      backgroundColor: "#10b981",
      color: "#ffffff"
    }
  },
  button: {
    primary: {
      backgroundColor: "#06b6d4",
      // Cyan-500
      color: "#ffffff",
      hover: "#0891b2",
      // Cyan-600
      active: "#0e7490",
      // Cyan-700
      focus: "0 0 0 2px #a5f3fc",
      // Cyan-200
      borderRadius: "0.375rem",
      // 6px - rounded-md
      padding: "0.5rem 1rem",
      fontSize: "0.875rem",
      fontWeight: "600",
      transition: "all 150ms ease-in-out"
    },
    secondary: {
      backgroundColor: "#64748b",
      // Slate-500
      color: "#ffffff",
      // Text white for filled secondary per screenshot
      hover: "#475569",
      // Slate-600
      focus: "0 0 0 2px #e2e8f0",
      borderRadius: "0.375rem",
      padding: "0.5rem 1rem",
      fontSize: "0.875rem",
      fontWeight: "600"
    },
    success: {
      backgroundColor: "#22c55e",
      // Green-500
      color: "#ffffff",
      hover: "#16a34a",
      // Green-600
      focus: `0 0 0 2px ${semanticColors.success[200]}`,
      borderRadius: "0.375rem"
    },
    danger: {
      backgroundColor: "#ef4444",
      // Red-500
      color: "#ffffff",
      hover: "#dc2626",
      // Red-600
      focus: `0 0 0 2px ${semanticColors.danger[200]}`,
      borderRadius: "0.375rem"
    },
    error: {
      backgroundColor: "#ef4444",
      color: "#ffffff",
      hover: "#dc2626",
      borderRadius: "0.375rem"
    },
    warning: {
      backgroundColor: "#f97316",
      // Orange-500
      color: "#ffffff",
      hover: "#ea580c",
      // Orange-600
      focus: `0 0 0 2px ${semanticColors.warning[200]}`,
      borderRadius: "0.375rem"
    },
    info: {
      backgroundColor: "#0ea5e9",
      // Sky-500
      color: "#ffffff",
      hover: "#0284c7",
      // Sky-600
      focus: `0 0 0 2px ${semanticColors.info[200]}`,
      borderRadius: "0.375rem"
    },
    purple: {
      backgroundColor: "#8b5cf6",
      // Violet-500
      color: "#ffffff",
      hover: "#7c3aed",
      // Violet-600
      focus: `0 0 0 2px ${semanticColors.purple[200]}`,
      borderRadius: "0.375rem"
    },
    outline: {
      backgroundColor: "transparent",
      color: semanticColors.primary[600],
      borderColor: semanticColors.primary[600],
      borderWidth: "2px",
      // Slightly thicker for modern look
      hover: semanticColors.primary[50],
      borderRadius: "0.375rem"
    }
  },
  badge: {
    primary: {
      backgroundColor: semanticColors.primary[100],
      color: semanticColors.primary[800],
      borderColor: semanticColors.primary[200],
      borderRadius: "9999px",
      padding: "0.25rem 0.75rem",
      fontSize: "0.75rem",
      fontWeight: "500"
    },
    secondary: {
      backgroundColor: semanticColors.secondary[100],
      color: semanticColors.secondary[800],
      borderColor: semanticColors.secondary[200],
      borderRadius: "9999px"
    },
    success: {
      backgroundColor: semanticColors.success[100],
      color: semanticColors.success[800],
      borderColor: semanticColors.success[200],
      borderRadius: "9999px"
    },
    danger: {
      backgroundColor: semanticColors.danger[100],
      color: semanticColors.danger[800],
      borderColor: semanticColors.danger[200],
      borderRadius: "9999px"
    },
    warning: {
      backgroundColor: semanticColors.warning[100],
      color: semanticColors.warning[800],
      borderColor: semanticColors.warning[200],
      borderRadius: "9999px"
    },
    info: {
      backgroundColor: semanticColors.info[100],
      color: semanticColors.info[800],
      borderColor: semanticColors.info[200],
      borderRadius: "9999px"
    },
    purple: {
      backgroundColor: semanticColors.purple[100],
      color: semanticColors.purple[800],
      borderColor: semanticColors.purple[200],
      borderRadius: "9999px"
    },
    error: {
      backgroundColor: semanticColors.danger[100],
      color: semanticColors.danger[800],
      borderColor: semanticColors.danger[200],
      borderRadius: "9999px"
    }
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "1rem",
    // 16px - más moderno
    borderColor: semanticColors.gray[200],
    borderWidth: "1px",
    shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    hover: {
      shadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
    },
    header: {
      backgroundColor: semanticColors.gray[50],
      borderBottom: `1px solid ${semanticColors.gray[200]}`,
      padding: "1rem 1.5rem",
      borderTopLeftRadius: "1rem",
      borderTopRightRadius: "1rem"
    },
    body: {
      padding: "1.5rem"
    }
  },
  input: {
    backgroundColor: "#ffffff",
    borderColor: semanticColors.gray[300],
    borderRadius: "0.5rem",
    padding: "0.5rem 0.75rem",
    fontSize: "0.875rem",
    focus: {
      borderColor: semanticColors.primary[500],
      ring: `0 0 0 3px ${semanticColors.primary[100]}`
    },
    placeholder: semanticColors.gray[400],
    disabled: {
      backgroundColor: semanticColors.gray[100],
      borderColor: semanticColors.gray[200]
    },
    error: {
      borderColor: semanticColors.danger[500],
      ring: `0 0 0 3px ${semanticColors.danger[100]}`
    }
  },
  table: {
    header: {
      backgroundColor: semanticColors.gray[50],
      color: semanticColors.gray[700],
      fontSize: "0.75rem",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    },
    row: {
      hover: semanticColors.primary[50],
      borderBottom: `1px solid ${semanticColors.gray[200]}`
    },
    cell: {
      padding: "1rem 1.5rem"
    }
  },
  alert: {
    info: {
      backgroundColor: semanticColors.info[50],
      borderColor: semanticColors.info[200],
      color: semanticColors.info[800],
      icon: semanticColors.info[500]
    },
    success: {
      backgroundColor: semanticColors.success[50],
      borderColor: semanticColors.success[200],
      color: semanticColors.success[800],
      icon: semanticColors.success[500]
    },
    warning: {
      backgroundColor: semanticColors.warning[50],
      borderColor: semanticColors.warning[200],
      color: semanticColors.warning[800],
      icon: semanticColors.warning[500]
    },
    error: {
      backgroundColor: semanticColors.danger[50],
      borderColor: semanticColors.danger[200],
      color: semanticColors.danger[800],
      icon: semanticColors.danger[500]
    }
  },
  modal: {
    overlay: {
      backgroundColor: "rgba(15, 23, 42, 0.75)"
      // gray[900] con opacidad
    },
    content: {
      backgroundColor: "#ffffff",
      borderRadius: "1rem",
      shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
    },
    header: {
      padding: "1.5rem 1.5rem 0.5rem 1.5rem",
      borderBottom: `1px solid ${semanticColors.gray[200]}`
    },
    body: {
      padding: "1.5rem"
    },
    footer: {
      padding: "1rem 1.5rem",
      borderTop: `1px solid ${semanticColors.gray[200]}`,
      backgroundColor: semanticColors.gray[50]
    }
  }
};
var typography = {
  fontFamily: {
    sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
    mono: ["Fira Code", "monospace"]
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem"
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700"
  },
  lineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75"
  }
};
var theme = {
  palette,
  colors: semanticColors,
  typography,
  ...components
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
  const [isFocused, setIsFocused] = useState(false);
  const themeBtn = theme.button;
  const themeConfig = themeBtn[color] || themeBtn.primary;
  const isSolid = ["filled", "raised", "rounded", "icon-only"].includes(variant || "filled");
  const isOutlined = variant === "outlined";
  const isText = variant === "text" || variant === "link";
  const isRaisedText = variant === "raised-text";
  const getStyle = () => {
    const mainColor = themeConfig.backgroundColor;
    const textColor = themeConfig.color;
    let style = {
      // fontSize: themeConfig.fontSize, // Removed to allow size prop to control font size
      fontWeight: themeConfig.fontWeight,
      // padding: themeConfig.padding, // Removed to allow size prop to control padding
      borderRadius: themeConfig.borderRadius,
      // Default from theme
      transition: themeConfig.transition || "all 0.2s"
    };
    if (variant === "rounded") {
      style.borderRadius = "9999px";
    }
    if (variant === "icon-only") {
      style.padding = "0.5rem";
    }
    if (isSolid) {
      style.backgroundColor = isHovered && !disabled ? themeConfig.hover : mainColor;
      style.color = textColor;
    } else if (isOutlined) {
      style.backgroundColor = "transparent";
      style.color = mainColor;
      style.borderColor = mainColor;
      if (isHovered && !disabled) {
        style.backgroundColor = `${mainColor}10`;
      }
    } else if (isText) {
      style.backgroundColor = isHovered && !disabled ? `${mainColor}10` : "transparent";
      style.color = mainColor;
    } else if (isRaisedText) {
      style.backgroundColor = "#ffffff";
      style.color = mainColor;
      if (isHovered && !disabled) style.backgroundColor = "#f8fafc";
    }
    if (isFocused && themeConfig.focus && !disabled) {
      style.boxShadow = themeConfig.focus;
    }
    return style;
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      type,
      className: clsx(
        "focus:outline-none",
        // Removed focus:ring-2 focus:ring-offset-2 to use theme style
        // Apply variant base styles (border, shadow, rounded-full)
        buttonVariants[variant || "filled"],
        // Apply size classes (padding/font-size)
        buttonSizes[size],
        className,
        { "opacity-50 cursor-not-allowed": disabled }
      ),
      style: getStyle(),
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
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
var ITCalendar = ({
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
  const [view, setView] = useState2("calendar");
  useEffect(() => {
    if (value) setCurrentDate(value);
  }, [value]);
  const handleNext = () => {
    if (view === "years") {
      setCurrentDate((d) => {
        const newDate = new Date(d);
        newDate.setFullYear(d.getFullYear() + 12);
        return newDate;
      });
    } else if (mode === "month") {
      setCurrentDate((d) => addMonths(d, 1));
    } else if (mode === "day") {
      setCurrentDate((d) => addDays(d, 1));
    } else {
      setCurrentDate((d) => addDays(d, 7));
    }
  };
  const handlePrev = () => {
    if (view === "years") {
      setCurrentDate((d) => {
        const newDate = new Date(d);
        newDate.setFullYear(d.getFullYear() - 12);
        return newDate;
      });
    } else if (mode === "month") {
      setCurrentDate((d) => addMonths(d, -1));
    } else if (mode === "day") {
      setCurrentDate((d) => addDays(d, -1));
    } else {
      setCurrentDate((d) => addDays(d, -7));
    }
  };
  const handleToday = () => {
    setCurrentDate(/* @__PURE__ */ new Date());
    setView("calendar");
  };
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
  const startYear = currentDate.getFullYear() - 6;
  const years = Array.from({ length: 12 }, (_, i) => startYear + i);
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
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-2 py-2 border-b border-gray-200 bg-white", children: [
          /* @__PURE__ */ jsx2(
            "h2",
            {
              className: "text-sm font-bold text-gray-800 capitalize cursor-pointer hover:text-primary-600 transition-colors select-none px-2 py-1 rounded hover:bg-gray-50 bg-transparent",
              onClick: () => setView(view === "calendar" ? "years" : "calendar"),
              children: view === "years" ? `${years[0]} - ${years[years.length - 1]}` : format(currentDate, "MMMM yyyy", { locale: es })
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx2("button", { onClick: handlePrev, type: "button", className: "p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-600", children: /* @__PURE__ */ jsx2(FaChevronLeft, { size: 14 }) }),
            /* @__PURE__ */ jsx2("button", { onClick: handleToday, type: "button", className: "text-sm font-medium text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors", children: "Hoy" }),
            /* @__PURE__ */ jsx2("button", { onClick: handleNext, type: "button", className: "p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-600", children: /* @__PURE__ */ jsx2(FaChevronRight, { size: 14 }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx2("div", { className: "flex-1 overflow-auto relative bg-white", children: view === "years" ? /* @__PURE__ */ jsx2("div", { className: "p-4 grid grid-cols-4 gap-2", children: years.map((year) => /* @__PURE__ */ jsx2(
          "button",
          {
            type: "button",
            className: cn(
              "h-10 rounded-md text-sm font-medium transition-colors border border-transparent",
              year === currentDate.getFullYear() ? "bg-primary-600 text-white" : "hover:bg-primary-50 text-gray-700 hover:text-primary-700"
            ),
            onClick: () => {
              setCurrentDate((d) => {
                const newDate = new Date(d);
                newDate.setFullYear(year);
                return newDate;
              });
              setView("calendar");
            },
            children: year
          },
          year
        )) }) : mode === "month" ? /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
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
                  isSelected ? "bg-primary-600 text-white font-medium hover:bg-primary-700" : "hover:bg-gray-100 text-gray-700",
                  isToday(day) && !isSelected && "text-primary-600 font-bold bg-primary-50"
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
                isToday(day) && "bg-primary-50"
              ), children: [
                /* @__PURE__ */ jsx2("span", { className: cn("text-xs font-semibold uppercase", isToday(day) ? "text-primary-600" : "text-gray-500"), children: format(day, "EEE", { locale: es }) }),
                /* @__PURE__ */ jsx2("span", { className: cn(
                  "text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full mt-0.5",
                  isToday(day) ? "bg-primary-600 text-white" : "text-gray-800"
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
                          className: "absolute inset-x-0 top-0 h-10 border-b border-transparent hover:border-primary-100 hover:bg-primary-50/30 transition-colors cursor-pointer z-0",
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
                          className: "absolute inset-x-0 bottom-0 h-10 hover:border-primary-100 hover:bg-primary-50/30 transition-colors cursor-pointer z-0",
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
                      className: "absolute left-1 right-1 bg-primary-500/30 border border-primary-500 rounded z-10 pointer-events-none",
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
                        !event.color && "bg-primary-100 text-primary-700 border-primary-500"
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
                  className: "absolute left-0 right-0 border-t-2 border-danger-500 z-30 pointer-events-none",
                  style: {
                    top: `${((/* @__PURE__ */ new Date()).getHours() * 60 + (/* @__PURE__ */ new Date()).getMinutes() - START_HOUR * 60) / 60 * 80}px`
                  },
                  children: /* @__PURE__ */ jsx2("div", { className: "absolute -left-1.5 -top-1.5 w-3 h-3 bg-danger-500 rounded-full" })
                }
              )
            ] }, day.toISOString())) })
          ] })
        ) })
      ]
    }
  );
};
var calendar_default = ITCalendar;

// src/components/card/card.tsx
import clsx3 from "clsx";
import { useState as useState3 } from "react";
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
  const [isHovered, setIsHovered] = useState3(false);
  const cardTheme = theme.card;
  const containerStyle = {
    backgroundColor: cardTheme.backgroundColor,
    borderColor: cardTheme.borderColor,
    borderWidth: cardTheme.borderWidth,
    borderRadius: cardTheme.borderRadius,
    boxShadow: onClick ? isHovered ? cardTheme.hover.shadow : cardTheme.shadow : "none",
    transition: onClick ? "all 0.2s ease-in-out" : "none",
    cursor: onClick ? "pointer" : "default"
  };
  const bodyStyle = {
    padding: cardTheme.body.padding
  };
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      onClick,
      onMouseEnter: () => onClick && setIsHovered(true),
      onMouseLeave: () => onClick && setIsHovered(false),
      className: clsx3(
        "overflow-hidden flex flex-col",
        className
      ),
      style: containerStyle,
      children: [
        image && /* @__PURE__ */ jsx3(
          "img",
          {
            src: image,
            alt,
            className: clsx3("w-full h-48 object-cover", imageClassName)
          }
        ),
        /* @__PURE__ */ jsxs2("div", { className: clsx3(contentClassName), style: bodyStyle, children: [
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
        actions && /* @__PURE__ */ jsx3("div", { className: clsx3("p-4 border-t border-gray-100 mt-auto", actionClassName), children: actions })
      ]
    }
  );
}

// src/components/date-picker/datePicker.tsx
import clsx5 from "clsx";
import React2, { useEffect as useEffect3, useRef as useRef2, useState as useState5 } from "react";
import { FaCalendarAlt } from "react-icons/fa";

// src/components/input/input.tsx
import clsx4 from "clsx";
import { useState as useState4, useEffect as useEffect2, useRef, useCallback } from "react";
import { Fragment, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
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
  const [displayValue, setDisplayValue] = useState4("");
  const [isFocused, setIsFocused] = useState4(false);
  const [hasSelectedAll, setHasSelectedAll] = useState4(false);
  const [showPassword, setShowPassword] = useState4(false);
  const inputRef = useRef(null);
  const inputTheme = theme.input || {};
  const getStyle = () => {
    const style = {
      backgroundColor: inputTheme.backgroundColor,
      borderColor: inputTheme.borderColor,
      borderRadius: inputTheme.borderRadius,
      padding: inputTheme.padding,
      fontSize: inputTheme.fontSize,
      borderWidth: "1px",
      borderStyle: "solid",
      transition: "all 0.2s",
      color: theme.colors.gray[900]
      // Default text color
    };
    if (disabled) {
      style.backgroundColor = inputTheme.disabled?.backgroundColor || style.backgroundColor;
      style.borderColor = inputTheme.disabled?.borderColor || style.borderColor;
      style.opacity = 0.7;
    }
    if (hasError) {
      style.borderColor = inputTheme.error?.borderColor || "red";
      if (isFocused) {
        style.boxShadow = inputTheme.error?.ring;
      }
    } else if (isFocused && !readOnly) {
      style.boxShadow = inputTheme.focus?.ring;
    }
    if (iconLeft) {
      style.paddingLeft = "2.5rem";
    }
    if (iconRight) {
      style.paddingRight = "2.5rem";
    }
    return style;
  };
  const hasError = touched && error;
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
          maximumFractionDigits: 2
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
      "End",
      "Unidentified"
      // mobile keyboards
    ];
    if (allowedKeys.includes(key) || ctrlKey || metaKey) {
      return;
    }
    if (!currencyFormat && (key === "." || key === ",")) {
      e.preventDefault();
      return;
    }
    if (currencyFormat && (key === "." || key === ",") && currentValue.includes(".")) {
      const dotIndex = currentValue.indexOf(".");
      const replacingDot = selectionStart !== null && selectionEnd !== null && selectionStart <= dotIndex && dotIndex < selectionEnd;
      if (!replacingDot) {
        e.preventDefault();
        return;
      }
    }
    const allowedCharsRegex = currencyFormat ? /^[0-9.,]$/ : /^[0-9]$/;
    if (key !== "Unidentified" && !allowedCharsRegex.test(key)) {
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
      if (rawValue.includes(",") && rawValue.includes(".")) {
        rawValue = rawValue.replace(/,/g, "");
      } else if (rawValue.includes(",")) {
        rawValue = rawValue.replace(/,/g, ".");
      }
      cleanedValue = rawValue.replace(/[^0-9.]/g, "");
      const parts = cleanedValue.split(".");
      if (parts.length > 1) {
        const decimals = parts.slice(1).join("").substring(0, 2);
        cleanedValue = parts[0] + "." + decimals;
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
            valueToSend = cleanedValue;
          }
        } else {
          const numericValue = parseInt(cleanedValue, 10);
          if (!isNaN(numericValue)) {
            valueToSend = cleanedValue;
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
          iconLeft && /* @__PURE__ */ jsx4("div", { className: "absolute inset-y-0 left-0 flex items-center pl-3 z-10", children: iconLeft }),
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
                "focus:outline-none w-full resize-none",
                className,
                { "cursor-not-allowed": disabled }
              ),
              style: getStyle()
            }
          ) : /* @__PURE__ */ jsxs3(Fragment, { children: [
            /* @__PURE__ */ jsx4(
              "input",
              {
                ref: inputRef,
                name,
                id: name,
                type: isNumberType ? "text" : type === "password" ? showPassword ? "text" : "password" : type,
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
                  "focus:outline-none w-full",
                  className,
                  { "cursor-not-allowed": disabled },
                  { "pl-10": iconLeft },
                  { "pr-10": iconRight || type === "password" }
                ),
                style: getStyle()
              }
            ),
            type === "password" && /* @__PURE__ */ jsx4(
              "button",
              {
                type: "button",
                className: "absolute inset-y-0 right-0 flex items-center pr-3 z-10 text-gray-400 hover:text-gray-600 focus:outline-none",
                onClick: () => setShowPassword(!showPassword),
                tabIndex: -1,
                children: showPassword ? /* @__PURE__ */ jsxs3("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                  /* @__PURE__ */ jsx4("path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24" }),
                  /* @__PURE__ */ jsx4("path", { d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" }),
                  /* @__PURE__ */ jsx4("path", { d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" }),
                  /* @__PURE__ */ jsx4("line", { x1: "2", x2: "22", y1: "2", y2: "22" })
                ] }) : /* @__PURE__ */ jsxs3("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                  /* @__PURE__ */ jsx4("path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" }),
                  /* @__PURE__ */ jsx4("circle", { cx: "12", cy: "12", r: "3" })
                ] })
              }
            )
          ] }),
          iconRight && type !== "password" && /* @__PURE__ */ jsx4("div", { className: "absolute inset-y-0 right-0 flex items-center pr-3 z-10", children: iconRight })
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
  const [isOpen, setIsOpen] = useState5(false);
  const [inputValue, setInputValue] = useState5("");
  const [isValidDate, setIsValidDate] = useState5(true);
  const [lastValidDate, setLastValidDate] = useState5(new Date(value));
  const wrapperRef = useRef2(null);
  const [calendarPosition, setCalendarPosition] = useState5({ top: 0, left: 0 });
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
          "fixed z-[9999]",
          calendarClassName
        ),
        style: {
          top: `${calendarPosition.top}px`,
          left: `${calendarPosition.left}px`,
          backgroundColor: theme.card.backgroundColor,
          borderColor: theme.card.borderColor,
          borderWidth: "1px",
          borderStyle: "solid",
          borderRadius: theme.card.borderRadius,
          boxShadow: theme.card.shadow,
          padding: "0.5rem"
          // Added a bit of padding for the calendar inside
        },
        children: /* @__PURE__ */ jsx5(
          calendar_default,
          {
            value: dateValue,
            onChange: handleDateChange,
            minDate,
            maxDate,
            className: "h-auto border-none shadow-none w-full"
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
  return /* @__PURE__ */ jsxs5("div", { className: `bg-primary-500 text-white px-6 py-4 rounded-t-lg flex justify-center items-center relative ${className}`, children: [
    /* @__PURE__ */ jsx6("h2", { className: "text-lg font-semibold text-center", children: title }),
    onClose && /* @__PURE__ */ jsx6(
      "button",
      {
        onClick: onClose,
        className: "absolute right-4 text-white hover:text-gray-200 transition-colors duration-200 p-1 rounded-full hover:bg-primary-600",
        "aria-label": "Cerrar",
        children: /* @__PURE__ */ jsx6(FaTimes, { className: "w-4 h-4" })
      }
    )
  ] });
}

// src/components/dialog/dialog.tsx
import { Fragment as Fragment2, jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
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
      className: `overflow-hidden relative ${className} ${useFormHeader ? "p-0" : "p-6"}`,
      style: {
        backgroundColor: theme.card.backgroundColor,
        borderRadius: theme.card.borderRadius,
        boxShadow: theme.card.shadow,
        // Border? theme.card.borderWidth?
        borderWidth: theme.card.borderWidth,
        borderColor: theme.card.borderColor,
        borderStyle: "solid"
      },
      children: useFormHeader && title ? /* @__PURE__ */ jsxs6(Fragment2, { children: [
        /* @__PURE__ */ jsx7(ITFormHeader, { title, onClose }),
        /* @__PURE__ */ jsx7("div", { className: "p-6", children })
      ] }) : /* @__PURE__ */ jsxs6(Fragment2, { children: [
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

// src/components/form-builder/formBuilder.tsx
import clsx9 from "clsx";

// src/components/select/select.tsx
import clsx6 from "clsx";
import { FaAngleDown } from "react-icons/fa";
import { useState as useState6 } from "react";
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
  const [isFocused, setIsFocused] = useState6(false);
  const inputTheme = theme.input || {};
  const getStyle = () => {
    const style = {
      backgroundColor: inputTheme.backgroundColor,
      borderColor: inputTheme.borderColor,
      borderRadius: inputTheme.borderRadius,
      padding: inputTheme.padding,
      fontSize: inputTheme.fontSize,
      borderWidth: "1px",
      borderStyle: "solid",
      transition: "all 0.2s",
      color: theme.colors.gray[900],
      appearance: "none"
      // Important for custom styling
    };
    if (disabled) {
      style.backgroundColor = inputTheme.disabled?.backgroundColor || style.backgroundColor;
      style.borderColor = inputTheme.disabled?.borderColor || style.borderColor;
      style.opacity = 0.7;
    }
    if (touched && error) {
      style.borderColor = inputTheme.error?.borderColor || "red";
      if (isFocused) {
        style.boxShadow = inputTheme.error?.ring;
      }
    } else if (isFocused && !readOnly) {
      style.boxShadow = inputTheme.focus?.ring;
    }
    return style;
  };
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
            onBlur: (e) => {
              setIsFocused(false);
              readOnly ? void 0 : onBlur?.(e);
            },
            onFocus: () => setIsFocused(true),
            disabled,
            className: clsx6(
              "w-full focus:outline-none",
              // Core structure only
              className,
              { "cursor-not-allowed": disabled }
            ),
            style: getStyle(),
            children: [
              /* @__PURE__ */ jsx8("option", { value: "", children: placeholder || "Selecciona una opci\xF3n" }),
              readOnly ? /* @__PURE__ */ jsx8("option", { value, disabled: true, children: options.find((option) => option[valueField] === value)?.[labelField] }) : options.map((option) => /* @__PURE__ */ jsx8(
                "option",
                {
                  value: option[valueField],
                  title: option[labelField],
                  children: option[labelField]
                },
                option[valueField]
              ))
            ]
          }
        ),
        /* @__PURE__ */ jsx8("div", { className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500", children: /* @__PURE__ */ jsx8(FaAngleDown, {}) })
      ] }),
      touched && error && /* @__PURE__ */ jsx8("div", { className: "flex-shrink-0 min-w-[140px] flex items-center pt-3", children: /* @__PURE__ */ jsx8("p", { className: "text-red-500 text-xs", children: error }) })
    ] })
  ] }) });
}

// src/components/form-builder/formBuilder.tsx
import { useEffect as useEffect10, useState as useState10, useMemo as useMemo3 } from "react";

// src/components/form-builder/formBuilder.context.tsx
import React3, { createContext, useContext, useState as useState7 } from "react";
import { jsx as jsx9 } from "react/jsx-runtime";
var ITFormBuilderContext = createContext(void 0);
var ITFormBuilderProvider = ({
  children,
  value
}) => {
  const [fieldRegistry, setFieldRegistry] = useState7({});
  const registerField = React3.useCallback((name, config) => {
    setFieldRegistry((prev) => ({ ...prev, [name]: config }));
  }, []);
  const unregisterField = React3.useCallback((name) => {
    setFieldRegistry((prev) => {
      const newRegistry = { ...prev };
      delete newRegistry[name];
      return newRegistry;
    });
  }, []);
  const getFieldConfig = React3.useCallback((name) => {
    return fieldRegistry[name];
  }, [fieldRegistry]);
  const contextValue = React3.useMemo(
    () => ({
      ...value,
      registerField,
      unregisterField,
      getFieldConfig
    }),
    [value, registerField, unregisterField, getFieldConfig]
  );
  return /* @__PURE__ */ jsx9(ITFormBuilderContext.Provider, { value: contextValue, children });
};
var useITFormBuilderContext = () => {
  const context = useContext(ITFormBuilderContext);
  if (!context) {
    throw new Error("useITFormBuilderContext must be used within an ITFormBuilderProvider");
  }
  return context;
};

// src/components/form-builder/fieldRenderer.tsx
import { memo, useEffect as useEffect9 } from "react";
import clsx8 from "clsx";

// src/components/time-picker/timePicker.tsx
import clsx7 from "clsx";
import { useEffect as useEffect7, useRef as useRef4, useState as useState8 } from "react";
import { FaClock } from "react-icons/fa";
import { jsx as jsx10, jsxs as jsxs8 } from "react/jsx-runtime";
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
  variant = "primary",
  color = "primary"
}) {
  const [isOpen, setIsOpen] = useState8(false);
  const [inputValue, setInputValue] = useState8(value || "");
  const [isValidTime, setIsValidTime] = useState8(true);
  const [dropdownPosition, setDropdownPosition] = useState8({ top: 0, left: 0 });
  const wrapperRef = useRef4(null);
  const dropdownRef = useRef4(null);
  const hoursRef = useRef4(null);
  const minutesRef = useRef4(null);
  useClickOutside_default(dropdownRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });
  const isThemeColor = color in theme.colors;
  const highlightColor = isThemeColor ? theme.colors[color][50] : "#f3f4f6";
  const activeColor = isThemeColor ? theme.colors[color][100] : "#e5e7eb";
  useEffect7(() => {
    setInputValue(value || "");
  }, [value]);
  const calculateDropdownPosition = () => {
    if (wrapperRef.current) {
      const inputRect = wrapperRef.current.getBoundingClientRect();
      const dropdownHeight = 280;
      const viewportHeight = window.innerHeight;
      let top = inputRect.bottom + 4;
      if (inputRect.bottom + dropdownHeight > viewportHeight) {
        top = inputRect.top - dropdownHeight - 4;
      }
      setDropdownPosition({
        top,
        left: inputRect.left
      });
    }
  };
  const validateTime = (timeString) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(timeString);
  };
  const currentHour = validateTime(inputValue) ? inputValue.split(":")[0] : null;
  const currentMinute = validateTime(inputValue) ? inputValue.split(":")[1] : null;
  useEffect7(() => {
    if (isOpen) {
      setTimeout(() => {
        if (hoursRef.current && currentHour) {
          const selectedHourEl = hoursRef.current.querySelector(
            `[data-value="${currentHour}"]`
          );
          if (selectedHourEl) {
            hoursRef.current.scrollTop = selectedHourEl.offsetTop - hoursRef.current.clientHeight / 2 + selectedHourEl.clientHeight / 2;
          }
        }
        if (minutesRef.current && currentMinute) {
          const selectedMinuteEl = minutesRef.current.querySelector(
            `[data-value="${currentMinute}"]`
          );
          if (selectedMinuteEl) {
            minutesRef.current.scrollTop = selectedMinuteEl.offsetTop - minutesRef.current.clientHeight / 2 + selectedMinuteEl.clientHeight / 2;
          }
        }
      }, 50);
    }
  }, [isOpen, currentHour, currentMinute]);
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
  const handleHourSelect = (h) => {
    const min = currentMinute || "00";
    const newVal = `${h}:${min}`;
    setInputValue(newVal);
    onChange({ target: { name, value: newVal } });
    setIsValidTime(true);
  };
  const handleMinuteSelect = (m) => {
    const hr = currentHour || "00";
    const newVal = `${hr}:${m}`;
    setInputValue(newVal);
    onChange({ target: { name, value: newVal } });
    setIsValidTime(true);
  };
  const handleConfirm = () => {
    setIsOpen(false);
  };
  const hoursList = Array.from(
    { length: 24 },
    (_, i) => i.toString().padStart(2, "0")
  );
  const minutesList = Array.from(
    { length: 60 },
    (_, i) => i.toString().padStart(2, "0")
  );
  return /* @__PURE__ */ jsxs8("div", { ref: wrapperRef, className: clsx7("relative w-full", className), children: [
    /* @__PURE__ */ jsx10(
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
        error: !isValidTime ? "Hora inv\xE1lida" : typeof error === "string" ? error : void 0,
        iconRight: /* @__PURE__ */ jsx10(
          FaClock,
          {
            onClick: () => {
              if (!disabled) {
                calculateDropdownPosition();
                setIsOpen(!isOpen);
              }
            },
            className: clsx7(
              "cursor-pointer transition-colors",
              disabled ? "text-slate-400 cursor-not-allowed" : "text-slate-900 hover:text-slate-600"
            )
          }
        )
      }
    ),
    isOpen && !disabled && /* @__PURE__ */ jsxs8(
      "div",
      {
        ref: dropdownRef,
        className: "fixed z-[9999] bg-white border border-gray-100 shadow-xl rounded-xl w-64 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 origin-top it-timepicker-dropdown",
        style: {
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`
        },
        children: [
          /* @__PURE__ */ jsxs8("div", { className: "flex bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider", children: [
            /* @__PURE__ */ jsx10("div", { className: "flex-1 text-center py-2 border-r border-gray-100", children: "Horas" }),
            /* @__PURE__ */ jsx10("div", { className: "flex-1 text-center py-2", children: "Minutos" })
          ] }),
          /* @__PURE__ */ jsxs8("div", { className: "flex h-56 relative bg-white", children: [
            /* @__PURE__ */ jsx10(
              "div",
              {
                ref: hoursRef,
                className: "flex-1 overflow-y-auto no-scrollbar border-r border-gray-50 scroll-smooth relative",
                children: /* @__PURE__ */ jsx10("div", { className: "py-2", children: hoursList.map((h) => {
                  const isSelected = currentHour === h;
                  return /* @__PURE__ */ jsx10(
                    "div",
                    {
                      "data-value": h,
                      className: clsx7(
                        "text-center py-2 cursor-pointer transition-all duration-200 text-sm font-medium mx-2 rounded-lg my-1",
                        isSelected ? "text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                      ),
                      style: {
                        backgroundColor: isSelected ? activeColor : void 0
                      },
                      onMouseEnter: (e) => {
                        if (!isSelected)
                          e.currentTarget.style.backgroundColor = highlightColor;
                      },
                      onMouseLeave: (e) => {
                        if (!isSelected)
                          e.currentTarget.style.backgroundColor = "transparent";
                      },
                      onClick: () => handleHourSelect(h),
                      children: h
                    },
                    h
                  );
                }) })
              }
            ),
            /* @__PURE__ */ jsx10(
              "div",
              {
                ref: minutesRef,
                className: "flex-1 overflow-y-auto no-scrollbar scroll-smooth relative",
                children: /* @__PURE__ */ jsx10("div", { className: "py-2", children: minutesList.map((m) => {
                  const isSelected = currentMinute === m;
                  return /* @__PURE__ */ jsx10(
                    "div",
                    {
                      "data-value": m,
                      className: clsx7(
                        "text-center py-2 cursor-pointer transition-all duration-200 text-sm font-medium mx-2 rounded-lg my-1",
                        isSelected ? "text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                      ),
                      style: {
                        backgroundColor: isSelected ? activeColor : void 0
                      },
                      onMouseEnter: (e) => {
                        if (!isSelected)
                          e.currentTarget.style.backgroundColor = highlightColor;
                      },
                      onMouseLeave: (e) => {
                        if (!isSelected)
                          e.currentTarget.style.backgroundColor = "transparent";
                      },
                      onClick: () => handleMinuteSelect(m),
                      children: m
                    },
                    m
                  );
                }) })
              }
            ),
            /* @__PURE__ */ jsx10("div", { className: "absolute top-1/2 left-0 right-0 h-10 -mt-5 bg-black/5 pointer-events-none border-y border-black/10 z-10" })
          ] }),
          /* @__PURE__ */ jsx10("div", { className: "p-3 bg-gray-50 border-t border-gray-100 flex justify-end", children: /* @__PURE__ */ jsx10(
            ITButton,
            {
              variant: "solid",
              color,
              size: "small",
              onClick: handleConfirm,
              children: "Aceptar"
            }
          ) })
        ]
      }
    )
  ] });
}

// src/components/form-builder/useFormBuilder.ts
import { useMemo as useMemo2 } from "react";
var useFieldRules = (name, dependsOn) => {
  const { values, getFieldConfig } = useITFormBuilderContext();
  const config = getFieldConfig(name);
  const isVisible = useMemo2(() => {
    if (!config?.renderWhen) return true;
    return config.renderWhen(values);
  }, [config, values]);
  const dynamicProps = useMemo2(() => {
    if (!config?.dynamicProps) return {};
    return config.dynamicProps(values);
  }, [config, values]);
  const isRequired = useMemo2(() => {
    if (typeof config?.required === "function") {
      return config.required(values);
    }
    return config?.required || false;
  }, [config, values, dynamicProps]);
  const isDisabled = useMemo2(() => {
    if (typeof config?.disabled === "function") {
      return config.disabled(values);
    }
    return config?.disabled || false;
  }, [config, values, dynamicProps]);
  return {
    isVisible,
    dynamicProps,
    isRequired: dynamicProps.required !== void 0 ? dynamicProps.required : isRequired,
    isDisabled: dynamicProps.disabled !== void 0 ? dynamicProps.disabled : isDisabled
  };
};

// src/components/form-builder/fieldRenderer.tsx
import { jsx as jsx11, jsxs as jsxs9 } from "react/jsx-runtime";
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
var getColSpanClass = (span = 12, maxCols) => {
  if (typeof span === "object") {
    const classes = [];
    if (span.sm) classes.push(`col-span-${Math.min(span.sm, maxCols)}`);
    if (span.md) classes.push(`md:col-span-${Math.min(span.md, maxCols)}`);
    if (span.lg) classes.push(`lg:col-span-${Math.min(span.lg, maxCols)}`);
    if (span.xl) classes.push(`xl:col-span-${Math.min(span.xl, maxCols)}`);
    return classes.join(" ") || `col-span-${maxCols}`;
  }
  return `col-span-${Math.min(span, maxCols)}`;
};
var ITFieldRenderer = ({ config, columns = 12 }) => {
  const context = useITFormBuilderContext();
  const { isVisible, isRequired, isDisabled, dynamicProps } = useFieldRules(
    config.name,
    config.dependsOn
  );
  useEffect9(() => {
    context.registerField(config.name, config);
    return () => {
      context.unregisterField(config.name);
    };
  }, [config.name]);
  if (!isVisible) return null;
  const activeConfig = {
    ...config,
    ...dynamicProps,
    required: isRequired,
    disabled: isDisabled
  };
  const {
    name,
    label,
    type,
    placeholder,
    options,
    valueField,
    labelField,
    formatNumber,
    showHintLength,
    leftIcon,
    rightIcon
  } = activeConfig;
  const value = context.values[name];
  const error = context.errors[name];
  const touched = context.touched[name];
  const handleChangeWrapper = async (val) => {
    const finalValue = val?.target ? val.target.value : val;
    await context.setFieldValue(name, finalValue);
    if (activeConfig.onChangeAction) {
      await activeConfig.onChangeAction(finalValue, context);
    }
  };
  const renderField = () => {
    switch (type) {
      case "text":
      case "password":
      case "number":
      case "email":
        return /* @__PURE__ */ jsx11(
          ITInput,
          {
            type: type === "email" ? "text" : type,
            name,
            label: label || "",
            placeholder,
            disabled: isDisabled,
            value: value !== void 0 ? value : activeConfig.defaultValue || "",
            onChange: handleChangeWrapper,
            onBlur: context.handleBlur,
            currencyFormat: activeConfig.currencyFormat,
            touched,
            error,
            required: isRequired,
            iconRight: rightIcon,
            iconLeft: leftIcon,
            showHintLength,
            maxLength: activeConfig.maxLength,
            minLength: activeConfig.minLength,
            rows: activeConfig.rows,
            formatNumber
          }
        );
      case "select":
        return /* @__PURE__ */ jsx11(
          ITSelect,
          {
            options: Array.isArray(options) ? options : [],
            name,
            disabled: isDisabled,
            label: label || "",
            placeholder,
            value: value !== void 0 ? value : activeConfig.defaultValue || "",
            valueField,
            labelField,
            onChange: handleChangeWrapper,
            onBlur: context.handleBlur,
            touched,
            error,
            required: isRequired
          }
        );
      case "date":
        return /* @__PURE__ */ jsx11(
          ITDatePicker,
          {
            name,
            disabled: isDisabled,
            label: label || "",
            value,
            onChange: handleChangeWrapper,
            placeholder,
            onBlur: context.handleBlur,
            touched,
            error,
            required: isRequired
          }
        );
      case "time":
        return /* @__PURE__ */ jsx11(
          ITTimePicker,
          {
            name,
            disabled: isDisabled,
            label: label || "",
            value,
            onChange: handleChangeWrapper,
            placeholder,
            onBlur: context.handleBlur,
            touched,
            error,
            required: isRequired
          }
        );
      case "custom":
        if (activeConfig.component) {
          const CustomComponent = activeConfig.component;
          return /* @__PURE__ */ jsx11(
            CustomComponent,
            {
              ...activeConfig,
              value,
              onChange: handleChangeWrapper,
              onBlur: context.handleBlur,
              error,
              touched,
              context
            }
          );
        }
        return null;
      case "section":
        return /* @__PURE__ */ jsxs9(
          "div",
          {
            className: clsx8(
              "w-full col-span-full",
              activeConfig.className
            ),
            children: [
              label && /* @__PURE__ */ jsx11("h4", { className: "text-lg font-semibold text-gray-800 mb-4", children: label }),
              /* @__PURE__ */ jsx11(
                "div",
                {
                  className: clsx8(
                    "grid gap-y-6 gap-x-5",
                    getGridColsClass(columns)
                  ),
                  children: activeConfig.fields?.map((childConfig) => /* @__PURE__ */ jsx11(
                    ITFieldRenderer,
                    {
                      config: childConfig,
                      columns
                    },
                    childConfig.name
                  ))
                }
              )
            ]
          }
        );
      case "array":
        return /* @__PURE__ */ jsx11("div", { className: "p-4 border-2 border-dashed border-gray-200 rounded-xl", children: /* @__PURE__ */ jsxs9("p", { className: "text-sm text-gray-500 text-center", children: [
          "Array Field: ",
          label
        ] }) });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsx11(
    "div",
    {
      className: clsx8(
        getColSpanClass(activeConfig.column, columns),
        activeConfig.className
      ),
      children: renderField()
    }
  );
};
var fieldRenderer_default = memo(ITFieldRenderer);

// src/components/form-builder/formBuilder.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
var gridColsClasses2 = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  8: "grid-cols-8",
  12: "grid-cols-12"
};
var getGridColsClass2 = (columns) => gridColsClasses2[columns] || "grid-cols-12";
var getColSpanClass2 = (span, maxCols) => {
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
  config,
  columns = 12,
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  setFieldValue = () => Promise.resolve(),
  setFieldTouched = () => Promise.resolve(),
  setFieldError = () => {
  },
  isSubmitting = false
}) {
  const [mounted, setMounted] = useState10(false);
  useEffect10(() => {
    setMounted(true);
  }, []);
  const providerValue = useMemo3(() => ({
    config: config || [],
    values: values || {},
    errors: errors || {},
    touched: touched || {},
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    initialValues: {},
    // Can be expanded later if Formik exposes it
    isSubmitting,
    isValidating: false,
    submitCount: 0
  }), [config, values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldTouched, setFieldError, isSubmitting]);
  if (config) {
    return /* @__PURE__ */ jsx12(ITFormBuilderProvider, { value: providerValue, children: /* @__PURE__ */ jsx12("div", { className: clsx9("grid gap-y-6 gap-x-5", getGridColsClass2(columns)), children: config.map((fieldConfig) => /* @__PURE__ */ jsx12(fieldRenderer_default, { config: fieldConfig, columns }, fieldConfig.name)) }) });
  }
  return /* @__PURE__ */ jsx12(
    "div",
    {
      className: clsx9(
        "grid gap-y-6 gap-x-5",
        getGridColsClass2(columns)
      ),
      children: fields?.map(
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
        }, index) => /* @__PURE__ */ jsx12(
          "div",
          {
            className: getColSpanClass2(column, columns),
            children: (() => {
              switch (type) {
                case "text":
                case "number":
                case "password":
                  return /* @__PURE__ */ jsx12(
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
                  return /* @__PURE__ */ jsx12(
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
                  return /* @__PURE__ */ jsx12(
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
            })()
          },
          name
        )
      )
    }
  );
}

// src/components/slide/slide.tsx
import { useState as useState11, useEffect as useEffect11 } from "react";
import clsx10 from "clsx";
import { jsx as jsx13 } from "react/jsx-runtime";
function ITSlideToggle({
  onToggle,
  isOn: controlledIsOn,
  initialState = false,
  activeColor = "success",
  inactiveColor = "#9ca3af",
  // default gray-400
  disabled = false,
  size = "md",
  className = ""
}) {
  const isControlled = controlledIsOn !== void 0;
  const [internalIsOn, setInternalIsOn] = useState11(initialState);
  useEffect11(() => {
    if (isControlled) {
      setInternalIsOn(controlledIsOn);
    }
  }, [controlledIsOn, isControlled]);
  const isOn = isControlled ? controlledIsOn : internalIsOn;
  const toggleSwitch = () => {
    if (disabled) return;
    const newState = !isOn;
    if (!isControlled) {
      setInternalIsOn(newState);
    }
    if (onToggle) {
      onToggle(newState);
    }
  };
  const isThemeColor = activeColor in theme.colors;
  const resolvedActiveColor = isThemeColor ? theme.colors[activeColor][500] : activeColor;
  const isInactiveThemeColor = inactiveColor in theme.colors;
  const resolvedInactiveColor = isInactiveThemeColor ? theme.colors[inactiveColor][400] : inactiveColor;
  const backgroundColor = isOn ? resolvedActiveColor : resolvedInactiveColor;
  const sizeClasses2 = {
    sm: {
      container: "w-10 h-5",
      knob: "w-3.5 h-3.5",
      translate: "translate-x-5"
    },
    md: {
      container: "w-14 h-7",
      knob: "w-5 h-5",
      translate: "translate-x-7"
    },
    lg: {
      container: "w-16 h-8",
      knob: "w-6 h-6",
      translate: "translate-x-8"
    }
  };
  const { container, knob, translate } = sizeClasses2[size];
  return /* @__PURE__ */ jsx13(
    "div",
    {
      onClick: toggleSwitch,
      className: clsx10(
        "flex items-center rounded-full p-1 transition-colors duration-300",
        container,
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className
      ),
      style: { backgroundColor },
      role: "switch",
      "aria-checked": isOn,
      tabIndex: disabled ? -1 : 0,
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleSwitch();
        }
      },
      children: /* @__PURE__ */ jsx13(
        "div",
        {
          className: clsx10(
            "bg-white rounded-full shadow-md transform transition-transform duration-300 pointer-events-none",
            knob,
            isOn ? translate : "translate-x-0"
          )
        }
      )
    }
  );
}

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
import clsx12 from "clsx";
import React7, { useState as useState12 } from "react";
import {
  FaCheck,
  FaSpinner,
  FaTimes as FaTimes2
} from "react-icons/fa";
import { MdOutlineSwapVert } from "react-icons/md";

// src/components/pagination/pagination.tsx
import React6 from "react";
import clsx11 from "clsx";
import { FaChevronLeft as FaChevronLeft2, FaChevronRight as FaChevronRight2 } from "react-icons/fa";
import { Fragment as Fragment3, jsx as jsx14, jsxs as jsxs10 } from "react/jsx-runtime";
var DOTS = "...";
var usePagination = ({
  totalPages,
  currentPage,
  siblingCount = 1
}) => {
  return React6.useMemo(() => {
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;
    const firstPageIndex = 1;
    const lastPageIndex = totalPages;
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, DOTS, totalPages];
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalPages, currentPage, siblingCount]);
};
function ITPagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  color = "primary",
  className = "",
  itemsPerPageOptions,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems
}) {
  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingCount
  });
  if (currentPage === 0 || paginationRange && paginationRange.length < 2) {
    return null;
  }
  const isSemantic = color in theme.colors;
  const resolvedBgColor = isSemantic ? theme.colors[color][500] : color;
  const resolvedHoverBgColor = isSemantic ? theme.colors[color][50] : "#f3f4f6";
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const baseItemClass = "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors cursor-pointer select-none";
  const renderPaginationControls = () => /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ jsx14(
      "div",
      {
        className: clsx11(
          baseItemClass,
          currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-100"
        ),
        onClick: handlePrevious,
        "aria-disabled": currentPage === 1,
        children: /* @__PURE__ */ jsx14(FaChevronLeft2, { size: 12 })
      }
    ),
    paginationRange?.map((pageNumber, idx) => {
      if (pageNumber === DOTS) {
        return /* @__PURE__ */ jsx14(
          "div",
          {
            className: "flex items-center justify-center w-8 h-8 select-none text-gray-400",
            children: "\u2026"
          },
          `dots-${idx}`
        );
      }
      const isActive = pageNumber === currentPage;
      return /* @__PURE__ */ jsx14(
        "div",
        {
          className: clsx11(
            baseItemClass,
            isActive ? "text-white" : "text-gray-600 hover:bg-gray-100"
          ),
          style: {
            backgroundColor: isActive ? resolvedBgColor : void 0,
            ...isActive ? {} : { "--hover-bg": resolvedHoverBgColor }
          },
          onClick: () => onPageChange(pageNumber),
          title: `Page ${pageNumber}`,
          children: pageNumber
        },
        pageNumber
      );
    }),
    /* @__PURE__ */ jsx14(
      "div",
      {
        className: clsx11(
          baseItemClass,
          currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-100"
        ),
        onClick: handleNext,
        "aria-disabled": currentPage === totalPages,
        children: /* @__PURE__ */ jsx14(FaChevronRight2, { size: 12 })
      }
    )
  ] });
  if (itemsPerPageOptions && itemsPerPage && onItemsPerPageChange) {
    const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems || 0);
    const endItem = Math.min(currentPage * itemsPerPage, totalItems || 0);
    return /* @__PURE__ */ jsxs10("div", { className: clsx11("flex flex-col sm:flex-row justify-between items-center gap-4 w-full", className), children: [
      /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-4 text-sm text-gray-500", children: [
        /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200", children: [
          /* @__PURE__ */ jsx14("span", { className: "text-xs font-medium", children: "Mostrar" }),
          /* @__PURE__ */ jsx14(
            ITSelect,
            {
              name: "itemsPerPage",
              options: itemsPerPageOptions.map((option) => ({
                value: String(option),
                label: String(option)
              })),
              value: String(itemsPerPage),
              onChange: (e) => onItemsPerPageChange(Number(e.target.value)),
              onBlur: () => {
              },
              size: "small",
              className: "!w-14 !h-6 !text-xs !py-0 !px-1! !border-none !bg-transparent !ring-0 focus:!ring-0 cursor-pointer font-bold text-gray-700",
              placeholder: ""
            }
          )
        ] }),
        totalItems !== void 0 && /* @__PURE__ */ jsxs10(Fragment3, { children: [
          /* @__PURE__ */ jsx14("span", { className: "text-gray-300", children: "|" }),
          /* @__PURE__ */ jsxs10("span", { className: "text-xs", children: [
            /* @__PURE__ */ jsx14("span", { className: "font-semibold text-gray-700", children: startItem }),
            " - ",
            /* @__PURE__ */ jsx14("span", { className: "font-semibold text-gray-700", children: endItem }),
            " de ",
            /* @__PURE__ */ jsx14("span", { className: "font-semibold text-gray-900", children: totalItems })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx14("nav", { "aria-label": "Pagination", children: renderPaginationControls() })
    ] });
  }
  return /* @__PURE__ */ jsx14("nav", { "aria-label": "Pagination", className: clsx11("inline-flex", className), children: renderPaginationControls() });
}

// src/components/table/table.tsx
import { jsx as jsx15, jsxs as jsxs11 } from "react/jsx-runtime";
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
  const [currentPage, setCurrentPage] = useState12(1);
  const [itemsPerPage, setItemsPerPage] = useState12(defaultItemsPerPage);
  const [filters, setFilters] = useState12({});
  const [sortConfig, setSortConfig] = useState12(null);
  const sortedData = React7.useMemo(() => {
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
      return /* @__PURE__ */ jsx15(
        "button",
        {
          className: "flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-full p-1 transition-all duration-200",
          onClick: () => handleFilterChange(col.key, nextValue),
          "aria-label": `${getToggleLabel()} para ${col.label}`,
          title: `${getToggleLabel()} para ${col.label}`,
          children: /* @__PURE__ */ jsx15("div", { className: "relative w-10 h-5 bg-gray-300 rounded-full", children: /* @__PURE__ */ jsx15(
            "div",
            {
              className: clsx12(
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
        return /* @__PURE__ */ jsx15(
          FaSpinner,
          {
            className: "animate-spin",
            "aria-label": "Cargando opciones",
            title: "Cargando opciones"
          }
        );
      }
      if (col.catalogOptions.error) {
        return /* @__PURE__ */ jsx15("span", { className: "text-red-500 text-xs", children: "Error cargando" });
      }
      return /* @__PURE__ */ jsx15(
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
    return /* @__PURE__ */ jsx15(
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
        return value ? /* @__PURE__ */ jsx15(
          FaCheck,
          {
            className: "text-green-500",
            "aria-label": "Verdadero",
            title: "Verdadero"
          }
        ) : /* @__PURE__ */ jsx15(
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
  return /* @__PURE__ */ jsxs11("div", { className: clsx12("space-y-4 w-full", containerClassName), children: [
    /* @__PURE__ */ jsxs11("div", { className: "bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden", children: [
      title && /* @__PURE__ */ jsx15("div", { className: "bg-white px-6 py-5 border-b border-secondary-100", children: /* @__PURE__ */ jsx15("h2", { className: "text-xl font-bold text-secondary-900 leading-tight", children: title }) }),
      /* @__PURE__ */ jsx15("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs11(
        "table",
        {
          className: clsx12(
            "min-w-max w-full text-sm text-left text-secondary-600",
            variantStyles[variant],
            sizeStyles[size]
          ),
          children: [
            /* @__PURE__ */ jsx15("thead", { children: /* @__PURE__ */ jsx15("tr", { className: "bg-secondary-50 border-b border-secondary-200 text-xs uppercase tracking-wider font-semibold text-secondary-500", children: columns.map((col) => /* @__PURE__ */ jsx15(
              "th",
              {
                scope: "col",
                className: clsx12("px-4 py-4 align-top", col.className),
                children: /* @__PURE__ */ jsxs11("div", { className: "flex flex-col gap-3 min-w-[150px]", children: [
                  /* @__PURE__ */ jsxs11("div", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsx15("span", { className: "text-secondary-700 font-bold", children: col.label }),
                    col.sortable && col.type !== "actions" && /* @__PURE__ */ jsx15(
                      "button",
                      {
                        onClick: () => handleSort(col.key),
                        className: `p-1 rounded-md transition-colors ${sortConfig?.key === col.key ? "bg-secondary-200 text-secondary-900" : "hover:bg-secondary-200 text-secondary-400 hover:text-secondary-700"}`,
                        title: `Ordenar por ${col.label}`,
                        children: /* @__PURE__ */ jsx15(MdOutlineSwapVert, { className: "w-4 h-4", "aria-hidden": "true" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx15("div", { className: "w-full", children: col.filter ? renderFilterInput(col) : null })
                ] })
              },
              col.key
            )) }) }),
            /* @__PURE__ */ jsx15("tbody", { className: "divide-y divide-secondary-100", children: currentData.length > 0 ? currentData.map((row, rowIndex) => /* @__PURE__ */ jsx15(
              "tr",
              {
                className: "hover:bg-secondary-50/50 transition-colors duration-150 group",
                children: columns.map((col) => /* @__PURE__ */ jsx15(
                  "td",
                  {
                    className: clsx12("px-4 py-3 align-middle", col.className),
                    children: col.type === "actions" ? /* @__PURE__ */ jsx15("div", { className: "flex items-center justify-center gap-2", children: renderCellContent(col, row) }) : /* @__PURE__ */ jsx15("div", { className: "text-secondary-700 font-medium", children: renderCellContent(col, row) })
                  },
                  `${rowIndex}-${col.key}`
                ))
              },
              rowIndex
            )) : /* @__PURE__ */ jsx15("tr", { children: /* @__PURE__ */ jsx15("td", { colSpan: columns.length, className: "px-6 py-12 text-center", children: /* @__PURE__ */ jsxs11("div", { className: "flex flex-col items-center justify-center text-secondary-400", children: [
              /* @__PURE__ */ jsx15("span", { className: "text-lg", children: "No se encontraron resultados" }),
              /* @__PURE__ */ jsx15("span", { className: "text-sm mt-1", children: "Intenta ajustar los filtros" })
            ] }) }) }) })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx15("div", { className: "bg-white rounded-b-xl border-t border-secondary-200 px-6 py-4", children: /* @__PURE__ */ jsx15(
      ITPagination,
      {
        currentPage,
        totalPages: totalPages || 1,
        onPageChange: goToPage,
        color: "primary",
        itemsPerPageOptions,
        itemsPerPage,
        onItemsPerPageChange: handleItemsPerPageChange,
        totalItems: filteredData.length
      }
    ) })
  ] });
}

// src/types/toast.types.ts
var positionStyles = {
  "top-right": "top-4 right-4",
  "top-center": "top-4 left-1/2 transform -translate-x-1/2",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
  "bottom-left": "bottom-4 left-4"
};

// src/components/toast/toast.tsx
import clsx13 from "clsx";
import { useEffect as useEffect12, useState as useState13 } from "react";
import { FaTimesCircle, FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes as FaTimes3 } from "react-icons/fa";
import { jsx as jsx16, jsxs as jsxs12 } from "react/jsx-runtime";
function ITToast({
  message,
  type = "info",
  duration = 1500,
  position = "top-right",
  onClose
}) {
  const [isVisible, setIsVisible] = useState13(true);
  useEffect12(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };
  const isThemeColor = type in theme.colors;
  const backgroundColor = isThemeColor ? theme.colors[type][500] : theme.colors.primary[500];
  const TypeIcon = () => {
    switch (type) {
      case "success":
        return /* @__PURE__ */ jsx16(FaCheckCircle, { className: "w-5 h-5 flex-shrink-0" });
      case "error":
      case "danger":
        return /* @__PURE__ */ jsx16(FaTimesCircle, { className: "w-5 h-5 flex-shrink-0" });
      case "warning":
        return /* @__PURE__ */ jsx16(FaExclamationTriangle, { className: "w-5 h-5 flex-shrink-0" });
      case "info":
      default:
        return /* @__PURE__ */ jsx16(FaInfoCircle, { className: "w-5 h-5 flex-shrink-0" });
    }
  };
  return /* @__PURE__ */ jsxs12(
    "div",
    {
      className: clsx13(
        "fixed z-50 p-4 rounded-xl shadow-xl flex items-center justify-between gap-4 transition-all duration-300 text-white min-w-[300px]",
        positionStyles[position],
        {
          "opacity-100 translate-y-0 scale-100": isVisible,
          "opacity-0 scale-95": !isVisible,
          "-translate-y-4": !isVisible && position.startsWith("top"),
          "translate-y-4": !isVisible && position.startsWith("bottom")
        }
      ),
      style: { backgroundColor },
      role: "alert",
      children: [
        /* @__PURE__ */ jsxs12("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx16(TypeIcon, {}),
          /* @__PURE__ */ jsx16("span", { className: "font-medium text-sm sm:text-base leading-snug", children: message })
        ] }),
        /* @__PURE__ */ jsx16(
          "button",
          {
            onClick: handleClose,
            className: "p-1.5 rounded-full hover:bg-black/15 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50",
            "aria-label": "Close notification",
            children: /* @__PURE__ */ jsx16(FaTimes3, { className: "w-4 h-4" })
          }
        )
      ]
    }
  );
}

// src/components/navbar/navbar.tsx
import { useRef as useRef5, useState as useState14 } from "react";
import { FaChevronDown, FaChevronRight as FaChevronRight3, FaUserCircle } from "react-icons/fa";
import { jsx as jsx17, jsxs as jsxs13 } from "react/jsx-runtime";
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState14(false);
  const [expandedItems, setExpandedItems] = useState14(/* @__PURE__ */ new Set());
  const userMenuRef = useRef5(null);
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
    return /* @__PURE__ */ jsxs13("div", { className: "flex flex-col h-screen", children: [
      /* @__PURE__ */ jsx17("nav", { className: "bg-white border-b border-gray-200", children: /* @__PURE__ */ jsxs13("div", { className: "flex items-center justify-between mx-auto p-4", children: [
        /* @__PURE__ */ jsxs13("div", { className: "flex items-center space-x-3 rtl:space-x-reverse", children: [
          logo && /* @__PURE__ */ jsx17("div", { className: "h-8", children: logo }),
          logoText && /* @__PURE__ */ jsx17("span", { className: "self-center text-2xl font-semibold whitespace-nowrap text-gray-900", children: logoText })
        ] }),
        /* @__PURE__ */ jsx17("div", { className: "flex items-center justify-end w-full md:w-auto md:order-2", children: /* @__PURE__ */ jsxs13("div", { className: "flex items-center space-x-4 md:order-2", children: [
          /* @__PURE__ */ jsx17("ul", { className: "hidden md:flex space-x-4", children: navItems }),
          userMenu && /* @__PURE__ */ jsxs13("div", { className: "relative", children: [
            /* @__PURE__ */ jsx17(
              "button",
              {
                type: "button",
                className: "flex text-sm bg-gray-200 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300",
                onClick: toggleUserMenu,
                children: userMenu.userImage ? /* @__PURE__ */ jsx17(
                  "img",
                  {
                    className: "w-8 h-8 rounded-full",
                    src: userMenu.userImage,
                    alt: "user photo"
                  }
                ) : /* @__PURE__ */ jsx17(FaUserCircle, { className: "w-8 h-8 text-gray-500" })
              }
            ),
            isUserMenuOpen && /* @__PURE__ */ jsxs13(
              "div",
              {
                ref: userMenuRef,
                className: "z-50 absolute right-0 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm",
                children: [
                  /* @__PURE__ */ jsxs13("div", { className: "px-4 py-3", children: [
                    /* @__PURE__ */ jsx17("span", { className: "block text-sm text-gray-900", children: userMenu.userName }),
                    /* @__PURE__ */ jsx17("span", { className: "block text-sm text-gray-500 truncate", children: userMenu.userEmail })
                  ] }),
                  /* @__PURE__ */ jsx17("ul", { className: "py-2", children: userMenu.menuItems.map((item, index) => /* @__PURE__ */ jsx17("li", { children: /* @__PURE__ */ jsx17(
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
      /* @__PURE__ */ jsxs13("div", { className: "flex-1 flex overflow-hidden relative", children: [
        (showSidebar || showSidebarOnMobile) && /* @__PURE__ */ jsx17("aside", { className: "fixed inset-y-0 left-0 w-64 bg-gray-50 transform transition-transform duration-300 ease-in-out z-50 shadow-lg md:static md:transform-none md:shadow-none md:border-r md:border-gray-200", children: /* @__PURE__ */ jsx17("div", { className: "h-full overflow-y-auto py-4 px-3", children: /* @__PURE__ */ jsx17("ul", { className: "space-y-2 font-medium", children: sidebarItems }) }) }),
        /* @__PURE__ */ jsx17("main", { className: "flex-1 bg-gray-100 overflow-y-auto", children })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs13("div", { className: "flex h-screen bg-gray-50 font-sans", children: [
    /* @__PURE__ */ jsxs13("aside", { className: "w-72 bg-secondary-900 shadow-xl flex flex-col transition-all duration-300 ease-in-out", children: [
      /* @__PURE__ */ jsxs13("div", { className: "p-6 border-b border-secondary-800/50 flex items-center gap-3", children: [
        logo && /* @__PURE__ */ jsx17("div", { className: "h-8 w-auto object-contain transition-transform hover:scale-105", children: logo }),
        logoText && /* @__PURE__ */ jsx17("span", { className: "text-lg font-bold text-white tracking-wide", children: logoText })
      ] }),
      /* @__PURE__ */ jsx17("nav", { className: "flex-1 px-4 py-6 overflow-y-auto custom-scrollbar", children: /* @__PURE__ */ jsx17("ul", { className: "space-y-1.5", children: navigationItems.map((item) => /* @__PURE__ */ jsxs13("li", { children: [
        /* @__PURE__ */ jsxs13(
          "div",
          {
            className: `group flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 border-l-4 ${item.isActive ? "bg-secondary-800/60 border-primary-500 text-white shadow-sm" : "border-transparent text-secondary-400 hover:bg-secondary-800 hover:text-white"}`,
            onClick: () => handleItemClick(item),
            children: [
              /* @__PURE__ */ jsxs13("div", { className: "flex items-center gap-3", children: [
                item.icon && /* @__PURE__ */ jsx17("div", { className: `text-xl transition-colors ${item.isActive ? "text-primary-400" : "text-secondary-500 group-hover:text-white"}`, children: item.icon }),
                /* @__PURE__ */ jsx17("span", { className: `font-medium text-sm ${item.isActive ? "font-semibold" : ""}`, children: item.label })
              ] }),
              item.subitems && item.subitems.length > 0 && /* @__PURE__ */ jsx17("div", { className: "text-secondary-500 group-hover:text-white transition-transform", children: expandedItems.has(item.id) ? /* @__PURE__ */ jsx17(FaChevronDown, { className: "w-3 h-3" }) : /* @__PURE__ */ jsx17(FaChevronRight3, { className: "w-3 h-3" }) })
            ]
          }
        ),
        item.subitems && item.subitems.length > 0 && expandedItems.has(item.id) && /* @__PURE__ */ jsx17("ul", { className: "mt-1 ml-4 pl-4 border-l border-secondary-800 space-y-1", children: item.subitems.map((subitem) => /* @__PURE__ */ jsx17("li", { children: /* @__PURE__ */ jsx17(
          "button",
          {
            onClick: subitem.action,
            className: `block w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${subitem.isActive ? "text-primary-400 font-medium bg-secondary-800/30" : "text-secondary-400 hover:text-white hover:bg-secondary-800/30"}`,
            children: subitem.label
          }
        ) }, subitem.id)) })
      ] }, item.id)) }) }),
      userMenu && /* @__PURE__ */ jsx17("div", { className: "p-4 border-t border-secondary-800", children: /* @__PURE__ */ jsxs13("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs13(
          "button",
          {
            type: "button",
            className: "flex items-center gap-3 w-full p-3 rounded-xl hover:bg-secondary-800 transition-colors duration-200 group",
            onClick: toggleUserMenu,
            children: [
              userMenu.userImage ? /* @__PURE__ */ jsx17(
                "img",
                {
                  className: "w-10 h-10 rounded-full border-2 border-secondary-700 group-hover:border-primary-500 transition-colors",
                  src: userMenu.userImage,
                  alt: "user photo"
                }
              ) : /* @__PURE__ */ jsx17("div", { className: "w-10 h-10 rounded-full bg-secondary-800 flex items-center justify-center text-secondary-400 group-hover:text-white group-hover:bg-secondary-700 transition-colors", children: /* @__PURE__ */ jsx17(FaUserCircle, { className: "w-6 h-6" }) }),
              /* @__PURE__ */ jsxs13("div", { className: "flex-1 text-left overflow-hidden", children: [
                /* @__PURE__ */ jsx17("div", { className: "text-white font-medium text-sm truncate group-hover:text-primary-400 transition-colors", children: userMenu.userName }),
                /* @__PURE__ */ jsx17("div", { className: "text-secondary-500 text-xs truncate", children: userMenu.userEmail })
              ] }),
              /* @__PURE__ */ jsx17(FaChevronRight3, { className: "text-secondary-600 w-3 h-3 group-hover:text-white transition-colors" })
            ]
          }
        ),
        isUserMenuOpen && /* @__PURE__ */ jsxs13(
          "div",
          {
            ref: userMenuRef,
            className: "absolute bottom-full left-0 mb-3 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-200 origin-bottom",
            children: [
              /* @__PURE__ */ jsxs13("div", { className: "bg-gray-50 px-4 py-3 border-b border-gray-100", children: [
                /* @__PURE__ */ jsx17("span", { className: "block text-sm font-semibold text-gray-800", children: userMenu.userName }),
                /* @__PURE__ */ jsx17("span", { className: "block text-xs text-gray-500 truncate", children: userMenu.userEmail })
              ] }),
              /* @__PURE__ */ jsx17("ul", { className: "py-1", children: userMenu.menuItems.map((item, index) => /* @__PURE__ */ jsx17("li", { children: /* @__PURE__ */ jsx17(
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
    /* @__PURE__ */ jsx17("main", { className: "flex-1 overflow-y-auto bg-gray-50/50 relative", children })
  ] });
}

// src/components/text/text.tsx
import { jsx as jsx18 } from "react/jsx-runtime";
function ITText({ children, className = "" }) {
  return /* @__PURE__ */ jsx18("p", { className: `${className} text-gray-900 `, children });
}

// src/components/image/image.tsx
import { useState as useState15 } from "react";
import { jsx as jsx19 } from "react/jsx-runtime";
var ITImage = ({
  src,
  alt,
  className = "",
  fallbackSrc = ""
}) => {
  const [imageError, setImageError] = useState15(false);
  const handleImageError = () => {
    setImageError(true);
  };
  return /* @__PURE__ */ jsx19(
    "div",
    {
      className: `${className} flex items-center justify-center bg-transparent`,
      children: imageError ? /* @__PURE__ */ jsx19(
        "img",
        {
          src: fallbackSrc,
          alt: "Fallback",
          className: "w-full h-full object-cover"
        }
      ) : /* @__PURE__ */ jsx19(
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
import clsx14 from "clsx";

// src/types/badget.types.ts
var badgeSizes = {
  small: "text-xs px-2 py-1",
  medium: "text-sm px-3 py-1.5",
  large: "text-base px-4 py-2"
};

// src/components/badget/badget.tsx
import { jsx as jsx20 } from "react/jsx-runtime";
function ITBadget({
  children,
  label,
  color = "primary",
  size = "medium",
  variant = "filled",
  className
}) {
  const themeBadge = theme.badge || {};
  const config = themeBadge[color] || themeBadge.primary || {};
  const getStyle = () => {
    const style = {
      fontSize: config.fontSize,
      fontWeight: config.fontWeight,
      padding: config.padding,
      borderRadius: config.borderRadius,
      // '9999px' in theme
      borderWidth: "1px",
      // Default border width for consistency
      borderStyle: "solid",
      borderColor: "transparent",
      // Default transparent
      transition: "all 0.2s"
    };
    if (variant === "filled") {
      style.backgroundColor = config.backgroundColor;
      style.color = config.color;
      style.borderColor = config.borderColor || "transparent";
    } else if (variant === "outlined") {
      style.backgroundColor = "transparent";
      style.color = config.color;
      style.borderColor = config.color;
    }
    return style;
  };
  return /* @__PURE__ */ jsx20(
    "span",
    {
      className: clsx14(
        "inline-flex items-center justify-center",
        // Fallback size if theme doesn't have it (though theme does have it for primary)
        !config.padding ? badgeSizes[size] : "",
        className
      ),
      style: getStyle(),
      children: children || /* @__PURE__ */ jsx20("span", { className: clsx14("font-semibold"), children: label })
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
import { jsx as jsx21 } from "react/jsx-runtime";
function ITLoader({
  size = "md",
  variant = "spinner",
  color = "primary",
  // Default to semantic primary
  className = ""
}) {
  const isSemantic = color in theme.colors;
  const resolvedColor = isSemantic ? theme.colors[color][500] : color;
  const isCssValue = isSemantic || color.startsWith("#") || color.startsWith("rgb");
  const style = isCssValue ? { color: resolvedColor } : {};
  const bgStyle = isCssValue ? { backgroundColor: resolvedColor } : {};
  const colorClass = !isCssValue ? color : "";
  if (variant === "spinner") {
    return /* @__PURE__ */ jsx21(
      "div",
      {
        className: `inline-block ${sizeClasses[size]} animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${colorClass} ${className}`,
        role: "status",
        style,
        children: /* @__PURE__ */ jsx21("span", { className: "!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]", children: "Loading..." })
      }
    );
  }
  if (variant === "dots") {
    return /* @__PURE__ */ jsx21(
      "div",
      {
        className: `flex items-center justify-center space-x-2 ${className}`,
        children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsx21(
          "div",
          {
            className: `${sizeClasses[size.replace(/l|g/, "")]} animate-bounce rounded-full ${colorClass}`,
            style: {
              ...bgStyle,
              animationDelay: `${i * 0.1}s`
            }
          },
          i
        ))
      }
    );
  }
  if (variant === "bar") {
    return /* @__PURE__ */ jsx21(
      "div",
      {
        className: `w-full ${size === "sm" ? "h-1" : size === "md" ? "h-1.5" : size === "lg" ? "h-2" : "h-2.5"} bg-gray-200 rounded-full overflow-hidden ${className}`,
        children: /* @__PURE__ */ jsx21(
          "div",
          {
            className: `h-full animate-progress ${colorClass}`,
            style: {
              backgroundColor: resolvedColor,
              // Simplified gradient for modern look, or keep it solid
              backgroundImage: isCssValue ? `linear-gradient(to right, ${resolvedColor}DD, ${resolvedColor})` : void 0,
              animation: "progress 1.5s ease-in-out infinite"
            }
          }
        )
      }
    );
  }
  if (variant === "pulse") {
    return /* @__PURE__ */ jsx21(
      "div",
      {
        className: `rounded-full ${sizeClasses[size]} animate-pulse ${colorClass} ${className}`,
        style: bgStyle
      }
    );
  }
  return null;
}

// src/components/layout/layout.tsx
import { useState as useState18 } from "react";

// src/components/topbar/topbar.tsx
import { FaUserCircle as FaUserCircle2, FaBars } from "react-icons/fa";
import { useRef as useRef6, useState as useState16 } from "react";
import { jsx as jsx22, jsxs as jsxs14 } from "react/jsx-runtime";
function ITTopBar({
  logo,
  logoText,
  userMenu,
  showMobileMenuButton,
  onToggleMobileMenu,
  navItems,
  onNavItemClick
}) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState16(false);
  const userMenuRef = useRef6(null);
  useClickOutside_default(userMenuRef, () => setIsUserMenuOpen(false));
  return /* @__PURE__ */ jsx22(
    "header",
    {
      className: "sticky top-0 z-40 backdrop-blur-md transition-all duration-300",
      style: {
        backgroundColor: theme.topbar?.backgroundColor || "rgba(255, 255, 255, 0.9)",
        borderBottom: `1px solid ${theme.topbar?.borderColor || "#e2e8f0"}`,
        boxShadow: theme.topbar?.shadow || "none"
      },
      children: /* @__PURE__ */ jsxs14("div", { className: "flex items-center justify-between h-[72px] px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxs14("div", { className: "flex items-center gap-5", children: [
          showMobileMenuButton && /* @__PURE__ */ jsx22(
            "button",
            {
              className: "lg:hidden p-2.5 rounded-xl transition-colors duration-200",
              style: {
                color: theme.topbar?.iconColor || "#64748b"
              },
              onMouseEnter: (e) => e.currentTarget.style.backgroundColor = theme.topbar?.userMenu?.hoverBackground || "#f1f5f9",
              onMouseLeave: (e) => e.currentTarget.style.backgroundColor = "transparent",
              onClick: onToggleMobileMenu,
              children: /* @__PURE__ */ jsx22(FaBars, { className: "w-[1.125rem] h-[1.125rem]" })
            }
          ),
          /* @__PURE__ */ jsxs14("div", { className: "flex items-center gap-3", children: [
            logo && /* @__PURE__ */ jsx22("div", { className: "flex-shrink-0 drop-shadow-sm", children: logo }),
            logoText && /* @__PURE__ */ jsx22(
              "span",
              {
                className: "text-[1.15rem] font-bold tracking-tight",
                style: { color: theme.topbar?.textHoverColor || "#0f172a" },
                children: logoText
              }
            )
          ] }),
          navItems && navItems.length > 0 && /* @__PURE__ */ jsx22("nav", { className: "hidden md:flex ml-8 space-x-1 border-l pl-8", style: { borderColor: theme.topbar?.borderColor || "#e2e8f0" }, children: navItems.map((item) => /* @__PURE__ */ jsx22(
            "button",
            {
              onClick: () => onNavItemClick?.(item.id),
              className: "px-4 py-2 rounded-lg font-medium text-[0.9rem] transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
              style: { color: theme.topbar?.textColor || "#475569" },
              onMouseEnter: (e) => {
                e.currentTarget.style.color = theme.topbar?.textHoverColor || "#0f172a";
                e.currentTarget.style.backgroundColor = theme.topbar?.userMenu?.hoverBackground || "#f1f5f9";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.color = theme.topbar?.textColor || "#475569";
                e.currentTarget.style.backgroundColor = "transparent";
              },
              children: /* @__PURE__ */ jsxs14("div", { className: "flex items-center gap-2", children: [
                item.icon && /* @__PURE__ */ jsx22("span", { className: "opacity-70", children: item.icon }),
                item.label
              ] })
            },
            item.id
          )) })
        ] }),
        userMenu && /* @__PURE__ */ jsxs14("div", { className: "relative", children: [
          /* @__PURE__ */ jsxs14(
            "button",
            {
              type: "button",
              className: "flex items-center gap-3 rounded-full pl-2 pr-4 py-1.5 transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] border border-transparent hover:border-gray-200",
              style: {
                backgroundColor: isUserMenuOpen ? theme.topbar?.userMenu?.hoverBackground || "#f1f5f9" : "transparent"
              },
              onMouseEnter: (e) => {
                if (!isUserMenuOpen) e.currentTarget.style.backgroundColor = theme.topbar?.userMenu?.hoverBackground || "#f1f5f9";
              },
              onMouseLeave: (e) => {
                if (!isUserMenuOpen) e.currentTarget.style.backgroundColor = "transparent";
              },
              onClick: () => setIsUserMenuOpen(!isUserMenuOpen),
              children: [
                /* @__PURE__ */ jsxs14("div", { className: "relative", children: [
                  userMenu.userImage ? /* @__PURE__ */ jsx22(
                    "img",
                    {
                      className: "w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm",
                      src: userMenu.userImage,
                      alt: "Current user"
                    }
                  ) : /* @__PURE__ */ jsx22("div", { className: "w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center ring-2 ring-white shadow-sm", children: /* @__PURE__ */ jsx22(FaUserCircle2, { className: "w-6 h-6", style: { color: theme.topbar?.iconColor || "#94a3b8" } }) }),
                  /* @__PURE__ */ jsx22("div", { className: "absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" })
                ] }),
                /* @__PURE__ */ jsxs14("div", { className: "hidden sm:flex flex-col text-left py-0.5", children: [
                  /* @__PURE__ */ jsx22(
                    "span",
                    {
                      className: "font-semibold text-[0.85rem] leading-tight",
                      style: { color: theme.topbar?.userMenu?.textColor || "#0f172a" },
                      children: userMenu.userName
                    }
                  ),
                  /* @__PURE__ */ jsx22(
                    "span",
                    {
                      className: "text-[0.7rem] font-medium",
                      style: { color: theme.topbar?.userMenu?.subtitleColor || "#64748b" },
                      children: userMenu.userEmail
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs14(
            "div",
            {
              ref: userMenuRef,
              className: `
                absolute right-0 mt-3 w-64 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] z-50 overflow-hidden transform origin-top-right transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)]
                ${isUserMenuOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 -translate-y-2 pointer-events-none"}
              `,
              style: {
                backgroundColor: theme.topbar?.userMenu?.dropdown?.backgroundColor || "#ffffff",
                border: `1px solid ${theme.topbar?.userMenu?.dropdown?.borderColor || "#f1f5f9"}`
              },
              children: [
                /* @__PURE__ */ jsxs14("div", { className: "px-5 py-4 border-b bg-slate-50/50", style: { borderColor: theme.topbar?.userMenu?.dropdown?.borderColor || "#f1f5f9" }, children: [
                  /* @__PURE__ */ jsx22("span", { className: "block font-bold text-[0.9rem]", style: { color: theme.topbar?.userMenu?.textColor || "#0f172a" }, children: userMenu.userName }),
                  /* @__PURE__ */ jsx22("span", { className: "block text-xs font-medium truncate mt-0.5", style: { color: theme.topbar?.userMenu?.subtitleColor || "#64748b" }, children: userMenu.userEmail })
                ] }),
                /* @__PURE__ */ jsx22("ul", { className: "py-2", children: userMenu.menuItems.map((m, i) => {
                  const isDestructive = m.label.toLowerCase().includes("salir") || m.label.toLowerCase().includes("cerrar") || m.label.toLowerCase().includes("logout");
                  return /* @__PURE__ */ jsxs14("li", { className: "px-2", children: [
                    i === userMenu.menuItems.length - 1 && isDestructive && i > 0 && /* @__PURE__ */ jsx22("div", { className: "h-px bg-slate-100 my-1 mx-2" }),
                    /* @__PURE__ */ jsx22(
                      "button",
                      {
                        onClick: (e) => {
                          m.onClick();
                          setIsUserMenuOpen(false);
                        },
                        className: `block w-full text-left px-3 py-2.5 rounded-xl text-[0.875rem] font-medium transition-colors duration-150`,
                        style: { color: isDestructive ? "#ef4444" : theme.topbar?.userMenu?.textColor || "#334155" },
                        onMouseEnter: (e) => {
                          e.currentTarget.style.backgroundColor = isDestructive ? "#fef2f2" : theme.topbar?.userMenu?.dropdown?.itemHoverBackground || "#f8fafc";
                        },
                        onMouseLeave: (e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        },
                        children: m.label
                      }
                    )
                  ] }, i);
                }) })
              ]
            }
          )
        ] })
      ] })
    }
  );
}

// src/components/sidebar/sidebar.tsx
import { useEffect as useEffect13, useRef as useRef7, useState as useState17 } from "react";
import { FaChevronDown as FaChevronDown2 } from "react-icons/fa";
import { jsx as jsx23, jsxs as jsxs15 } from "react/jsx-runtime";
function ITSidebar({
  navigationItems = [],
  isCollapsed = false,
  onToggleCollapse,
  className = "",
  visibleOnMobile = false
}) {
  const [expandedItems, setExpandedItems] = useState17(/* @__PURE__ */ new Set());
  const [isHovering, setIsHovering] = useState17(false);
  const sidebarRef = useRef7(null);
  const hoverTimeoutRef = useRef7(null);
  const leaveTimeoutRef = useRef7(null);
  useEffect13(() => {
    const handleMouseEnter = () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
      setIsHovering(true);
    };
    const handleMouseLeave = () => {
      leaveTimeoutRef.current = setTimeout(() => {
        setIsHovering(false);
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
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) newExpanded.delete(itemId);
    else newExpanded.add(itemId);
    setExpandedItems(newExpanded);
  };
  const handleItemClick = (item) => {
    if (item.subitems && item.subitems.length > 0) {
      toggleExpanded(item.id);
    } else if (item.action) {
      item.action();
    }
  };
  const isSidebarCollapsed = visibleOnMobile ? false : !isHovering && isCollapsed;
  const sidebarWidth = isSidebarCollapsed ? "w-[88px]" : "w-[280px]";
  return /* @__PURE__ */ jsx23(
    "aside",
    {
      ref: sidebarRef,
      className: `
        relative flex flex-col 
        transition-all duration-400 ease-[cubic-bezier(0.2,0,0,1)]
        ${sidebarWidth}
        ${className}
        ${!visibleOnMobile ? "hidden lg:flex" : "flex"}
        shadow-[4px_0_24px_rgba(0,0,0,0.02)]
      `,
      style: {
        zIndex: 50,
        backgroundColor: theme.sidebar?.backgroundColor || "rgba(255, 255, 255, 0.90)",
        borderRight: `1px solid ${theme.sidebar?.borderColor || "#e2e8f0"}`,
        WebkitBackdropFilter: "blur(12px)",
        backdropFilter: "blur(12px)"
      },
      children: /* @__PURE__ */ jsx23("nav", { className: "flex-1 py-6 overflow-y-auto overflow-x-hidden custom-scrollbar px-4", children: /* @__PURE__ */ jsx23("ul", { className: "space-y-2", children: navigationItems.map((item) => /* @__PURE__ */ jsxs15("li", { className: "relative group/navitem", children: [
        /* @__PURE__ */ jsxs15(
          "div",
          {
            className: `flex items-center cursor-pointer 
                  transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
                  rounded-xl relative overflow-visible
                  ${isSidebarCollapsed ? "justify-center p-2.5 mb-2" : "justify-between px-3.5 py-3 mb-1"}
                `,
            style: {
              backgroundColor: item.isActive ? theme.sidebar?.active?.backgroundColor || "#f8fafc" : "transparent",
              boxShadow: item.isActive ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)" : "none",
              border: item.isActive ? `1px solid ${theme.sidebar?.borderColor || "#e2e8f0"}` : "1px solid transparent"
            },
            onMouseEnter: (e) => {
              if (!item.isActive) e.currentTarget.style.backgroundColor = theme.sidebar?.hover?.backgroundColor || "#f1f5f9";
            },
            onMouseLeave: (e) => {
              if (!item.isActive) e.currentTarget.style.backgroundColor = "transparent";
            },
            onClick: () => handleItemClick(item),
            children: [
              item.isActive && !isSidebarCollapsed && /* @__PURE__ */ jsx23(
                "div",
                {
                  className: "absolute left-0 top-1/4 bottom-1/4 w-[3px] rounded-r-full transition-all",
                  style: { backgroundColor: theme.sidebar?.active?.iconColor || "#10b981", boxShadow: `0 0 10px ${theme.sidebar?.active?.iconColor || "#10b981"}` }
                }
              ),
              /* @__PURE__ */ jsxs15("div", { className: `flex items-center ${!isSidebarCollapsed ? "gap-3.5" : "justify-center"} relative z-10 w-full`, children: [
                item.icon && /* @__PURE__ */ jsx23(
                  "div",
                  {
                    className: `transition-all duration-300 flex-shrink-0 flex items-center justify-center`,
                    style: {
                      color: item.isActive ? theme.sidebar?.active?.iconColor || "#10b981" : theme.sidebar?.icon?.color || "#9ca3af",
                      opacity: item.isActive ? 1 : 0.8,
                      fontSize: item.isActive ? "1.35rem" : theme.sidebar?.icon?.size || "1.25rem",
                      filter: item.isActive ? "drop-shadow(0 0 8px rgba(255,255,255,0.2))" : "none"
                    },
                    children: item.icon
                  }
                ),
                !isSidebarCollapsed && /* @__PURE__ */ jsx23(
                  "span",
                  {
                    className: `transition-all duration-300 truncate tracking-wide`,
                    style: {
                      color: item.isActive ? theme.sidebar?.active?.color || "#ffffff" : theme.sidebar?.label?.color || "#d1d5db",
                      fontSize: theme.sidebar?.label?.size || "0.9rem",
                      fontWeight: item.isActive ? "600" : theme.sidebar?.label?.weight || "500"
                    },
                    children: item.label
                  }
                )
              ] }),
              !isSidebarCollapsed && item.subitems && item.subitems.length > 0 && /* @__PURE__ */ jsx23(
                "div",
                {
                  className: `flex-shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${expandedItems.has(item.id) ? "rotate-180" : ""}`,
                  style: { color: item.isActive ? theme.sidebar?.active?.color || "#0f172a" : theme.sidebar?.icon?.color || "#64748b", opacity: 0.7 },
                  children: /* @__PURE__ */ jsx23(FaChevronDown2, { className: "w-3 h-3" })
                }
              ),
              item.badge && /* @__PURE__ */ jsx23(
                "span",
                {
                  className: `
                      absolute flex items-center justify-center font-bold shadow-md
                      ${isSidebarCollapsed ? "top-1 right-1 w-2.5 h-2.5 rounded-full ring-2" : "right-3 top-1/2 transform -translate-y-1/2 px-2 py-0.5 text-[10px] rounded-full backdrop-blur-sm"}
                    `,
                  style: {
                    backgroundColor: theme.sidebar?.badge?.backgroundColor || theme.sidebar?.active?.iconColor || "#10b981",
                    color: theme.sidebar?.badge?.color || "#ffffff",
                    boxShadow: isSidebarCollapsed ? `0 0 0 2px ${theme.sidebar?.backgroundColor || "#111827"}` : "none"
                  },
                  children: isSidebarCollapsed ? "" : item.badge
                }
              )
            ]
          }
        ),
        isSidebarCollapsed && /* @__PURE__ */ jsxs15(
          "div",
          {
            className: "absolute left-full top-0 ml-4 rounded-2xl opacity-0 invisible group-hover/navitem:opacity-100 group-hover/navitem:visible transition-all duration-300 pointer-events-none z-50 min-w-[220px] overflow-hidden -translate-x-2 group-hover/navitem:translate-x-0 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]",
            style: {
              backgroundColor: theme.sidebar?.backgroundColor || "#ffffff",
              border: `1px solid ${theme.sidebar?.borderColor || "#e2e8f0"}`,
              WebkitBackdropFilter: "blur(16px)",
              backdropFilter: "blur(16px)"
            },
            children: [
              /* @__PURE__ */ jsxs15("div", { className: "px-5 py-4 flex items-center gap-3 font-semibold border-b", style: { borderColor: theme.sidebar?.borderColor || "#e2e8f0", color: theme.sidebar?.active?.color || "#0f172a" }, children: [
                item.icon && /* @__PURE__ */ jsx23("span", { style: { color: theme.sidebar?.active?.iconColor || "#10b981" }, className: "text-xl drop-shadow-sm", children: item.icon }),
                /* @__PURE__ */ jsx23("span", { className: "tracking-wide text-[15px]", children: item.label })
              ] }),
              item.subitems && item.subitems.length > 0 ? /* @__PURE__ */ jsx23("div", { className: "py-2", children: item.subitems.map((subitem) => /* @__PURE__ */ jsxs15(
                "div",
                {
                  className: `px-5 py-2.5 text-sm flex items-center gap-3 transition-colors`,
                  children: [
                    /* @__PURE__ */ jsx23("span", { className: `w-1.5 h-1.5 rounded-full transition-all ${subitem.isActive ? "scale-125" : ""}`, style: { backgroundColor: subitem.isActive ? theme.sidebar?.active?.iconColor || "#10b981" : theme.sidebar?.icon?.color || "#94a3b8" } }),
                    /* @__PURE__ */ jsx23("span", { style: { color: subitem.isActive ? theme.sidebar?.active?.color || "#0f172a" : theme.sidebar?.label?.color || "#475569", fontWeight: subitem.isActive ? 600 : 500 }, children: subitem.label })
                  ]
                },
                subitem.id
              )) }) : /* @__PURE__ */ jsx23("div", { className: "px-5 py-3 text-sm text-zinc-500 italic", children: "No hay submen\xFA" })
            ]
          }
        ),
        !isSidebarCollapsed && item.subitems && item.subitems.length > 0 && /* @__PURE__ */ jsx23("div", { className: `overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.2,0,0,1)] ${expandedItems.has(item.id) ? "max-h-[500px] opacity-100 mt-1" : "max-h-0 opacity-0"}`, children: /* @__PURE__ */ jsx23("ul", { className: "ml-5 pl-4 space-y-1 py-1", style: { borderLeft: `2px solid ${theme.sidebar?.borderColor || "#e2e8f0"}` }, children: item.subitems.map((subitem) => /* @__PURE__ */ jsxs15("li", { className: "relative", children: [
          subitem.isActive && /* @__PURE__ */ jsx23("div", { className: "absolute -left-[18px] top-1/2 -translate-y-1/2 w-4 h-[2px] rounded-r-full", style: { backgroundColor: theme.sidebar?.active?.iconColor || "#10b981" } }),
          /* @__PURE__ */ jsx23(
            "button",
            {
              onClick: subitem.action,
              className: `block w-full text-left px-4 py-2 rounded-xl transition-all duration-300`,
              style: {
                color: subitem.isActive ? theme.sidebar?.active?.color || "#0f172a" : theme.sidebar?.label?.color || "#475569",
                backgroundColor: subitem.isActive ? theme.sidebar?.active?.backgroundColor || "#f8fafc" : "transparent",
                fontSize: "0.85rem",
                fontWeight: subitem.isActive ? 600 : 500,
                letterSpacing: "0.01em"
              },
              onMouseEnter: (e) => {
                if (!subitem.isActive) {
                  e.currentTarget.style.backgroundColor = theme.sidebar?.hover?.backgroundColor || "#f1f5f9";
                  e.currentTarget.style.transform = "translateX(4px)";
                }
              },
              onMouseLeave: (e) => {
                if (!subitem.isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "translateX(0)";
                }
              },
              children: subitem.label
            }
          )
        ] }, subitem.id)) }) })
      ] }, item.id)) }) })
    }
  );
}

// src/components/layout/layout.tsx
import { jsx as jsx24, jsxs as jsxs16 } from "react/jsx-runtime";
function ITLayout({
  topBar,
  sidebar,
  children,
  className = ""
}) {
  const [desktopCollapsed, setDesktopCollapsed] = useState18(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState18(false);
  return /* @__PURE__ */ jsxs16("div", { className: `flex flex-col h-screen overflow-hidden w-full ${className}`, children: [
    /* @__PURE__ */ jsx24(
      ITTopBar,
      {
        ...topBar,
        showMobileMenuButton: true,
        onToggleMobileMenu: () => setMobileSidebarOpen((v) => !v)
      }
    ),
    /* @__PURE__ */ jsxs16("div", { className: "flex flex-1 overflow-hidden relative", style: { backgroundColor: theme.layout?.backgroundColor || "#f8fafc" }, children: [
      /* @__PURE__ */ jsxs16("div", { className: "hidden lg:block relative z-40 h-full", children: [
        /* @__PURE__ */ jsx24("div", { className: "w-[88px] h-full flex-shrink-0" }),
        /* @__PURE__ */ jsx24("div", { className: "absolute top-0 left-0 h-full", children: /* @__PURE__ */ jsx24(
          ITSidebar,
          {
            ...sidebar,
            isCollapsed: desktopCollapsed,
            onToggleCollapse: () => setDesktopCollapsed((v) => !v),
            visibleOnMobile: false,
            className: `h-full drop-shadow-2xl transition-all duration-400 ease-[cubic-bezier(0.2,0,0,1)] flex-shrink-0`
          }
        ) })
      ] }),
      mobileSidebarOpen && /* @__PURE__ */ jsx24(
        "div",
        {
          className: "lg:hidden fixed inset-0 z-50 transition-opacity duration-300 backdrop-blur-sm bg-black/40",
          onClick: () => setMobileSidebarOpen(false),
          children: /* @__PURE__ */ jsx24(
            "div",
            {
              className: "h-full w-auto transform transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
              onClick: (e) => e.stopPropagation(),
              children: /* @__PURE__ */ jsx24(
                ITSidebar,
                {
                  ...sidebar,
                  isCollapsed: false,
                  visibleOnMobile: true,
                  className: "h-full shadow-2xl",
                  onToggleCollapse: () => setMobileSidebarOpen(false)
                }
              )
            }
          )
        }
      ),
      /* @__PURE__ */ jsx24("main", { className: "flex-1 overflow-y-auto w-full custom-scrollbar relative z-0", children: /* @__PURE__ */ jsx24(
        "div",
        {
          className: "mx-auto w-full h-full",
          style: { padding: theme.layout?.contentPadding || "1.5rem" },
          children
        }
      ) })
    ] })
  ] });
}

// src/components/dropfile/dropfile.tsx
import { useState as useState19, useEffect as useEffect14, useRef as useRef8 } from "react";
import { useDropzone } from "react-dropzone";
import clsx15 from "clsx";
import { Fragment as Fragment4, jsx as jsx25, jsxs as jsxs17 } from "react/jsx-runtime";
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
  const [selectedFile, setSelectedFile] = useState19(null);
  const [fileType, setFileType] = useState19(null);
  const [imagePreview, setImagePreview] = useState19(initialPreviewUrl || null);
  const [isConfirmed, setIsConfirmed] = useState19(false);
  const [internalUploadStatus, setInternalUploadStatus] = useState19(
    initialPreviewUrl ? "subido" /* UPLOADED */ : "pendiente" /* PENDING */
  );
  const canvasRef = useRef8(null);
  useEffect14(() => {
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
        color: "bg-warning-100 text-warning-800 border-warning-200",
        dotColor: "bg-warning-400"
      },
      ["subiendo" /* UPLOADING */]: {
        label: "Subiendo...",
        color: "bg-primary-100 text-primary-800 border-primary-200",
        dotColor: "bg-primary-400 animate-pulse"
      },
      ["subido" /* UPLOADED */]: {
        label: "Subido",
        color: "bg-success-100 text-success-800 border-success-200",
        dotColor: "bg-success-400"
      },
      ["error" /* ERROR */]: {
        label: "Error",
        color: "bg-danger-100 text-danger-800 border-danger-200",
        dotColor: "bg-danger-400"
      }
    };
    const { label, color, dotColor } = config[status];
    return /* @__PURE__ */ jsxs17("div", { className: `inline-flex items-center gap-2 px-2.5 py-1 rounded-full border ${color}`, children: [
      /* @__PURE__ */ jsx25("div", { className: `w-2 h-2 rounded-full ${dotColor}` }),
      /* @__PURE__ */ jsx25("span", { className: "text-xs font-medium flex items-center gap-1.5", children: label })
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
  useEffect14(() => {
    const renderPDF = async () => {
    };
    renderPDF();
  }, [selectedFile, fileType]);
  useEffect14(() => {
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
  return /* @__PURE__ */ jsxs17("div", { className: clsx15("w-full transition-all duration-300", containerClassName), children: [
    /* @__PURE__ */ jsxs17("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsxs17("label", { className: "block text-sm font-semibold text-gray-700", children: [
        "Subir archivo ",
        /* @__PURE__ */ jsxs17("span", { className: "text-gray-400 font-normal text-xs", children: [
          "(",
          getFileExtensions(),
          ")"
        ] })
      ] }),
      showStatusBadge && selectedFile && /* @__PURE__ */ jsx25(StatusBadge, { status: uploadStatus })
    ] }),
    !selectedFile && !imagePreview ? /* @__PURE__ */ jsxs17(
      "div",
      {
        ...getRootProps(),
        className: `
            relative group flex flex-col items-center justify-center w-full p-6 
            border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ease-in-out
            ${isDragActive ? "border-primary-500 bg-primary-50 scale-[1.01]" : "border-gray-300 bg-white hover:border-primary-400 hover:bg-gray-50"}
          `,
        children: [
          /* @__PURE__ */ jsx25("input", { ...getInputProps() }),
          /* @__PURE__ */ jsx25("div", { className: `mb-3 p-3 rounded-full transition-colors duration-300 ${isDragActive ? "bg-primary-100" : "bg-gray-100 group-hover:bg-primary-50"}`, children: /* @__PURE__ */ jsx25(
            "svg",
            {
              className: `w-6 h-6 transition-colors duration-300 ${isDragActive ? "text-primary-600" : "text-gray-400 group-hover:text-primary-500"}`,
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: /* @__PURE__ */ jsx25("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" })
            }
          ) }),
          /* @__PURE__ */ jsx25("div", { className: "text-center space-y-1", children: /* @__PURE__ */ jsx25("p", { className: `text-sm font-medium transition-colors duration-300 ${isDragActive ? "text-primary-700" : "text-gray-700"}`, children: isDragActive ? "\xA1Suelta aqu\xED!" : "Haz clic o arrastra" }) })
        ]
      }
    ) : /* @__PURE__ */ jsxs17("div", { className: "w-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden animate-fade-in", children: [
      /* @__PURE__ */ jsx25("div", { className: "flex items-center justify-between p-3 bg-gray-50 border-b border-gray-100", children: /* @__PURE__ */ jsxs17("div", { className: "flex items-center gap-3 overflow-hidden", children: [
        /* @__PURE__ */ jsx25("div", { className: "flex-shrink-0 w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600", children: selectedFile && fileType?.startsWith("image/") || !selectedFile && imagePreview ? /* @__PURE__ */ jsx25("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx25("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) : /* @__PURE__ */ jsx25("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx25("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }),
        /* @__PURE__ */ jsxs17("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx25("p", { className: "text-xs font-medium text-gray-900 truncate", title: selectedFile?.name || "Imagen cargada", children: selectedFile?.name || "Imagen cargada" }),
          /* @__PURE__ */ jsx25("p", { className: "text-[10px] text-gray-500", children: selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) + " MB" : "" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx25("div", { className: clsx15("relative bg-gray-100 flex items-center justify-center", !contentClassName ? "max-h-[200px] min-h-[100px] overflow-auto" : contentClassName), children: selectedFile && fileType?.startsWith("image/") || !selectedFile && imagePreview ? /* @__PURE__ */ jsx25(
        "img",
        {
          src: imagePreview,
          alt: "Vista previa",
          className: "w-full h-full object-contain max-h-[200px]"
        }
      ) : /* @__PURE__ */ jsxs17("div", { className: "py-8 flex flex-col items-center text-gray-400", children: [
        /* @__PURE__ */ jsx25("svg", { className: "w-10 h-10 mb-2 opacity-50", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx25("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" }) }),
        /* @__PURE__ */ jsx25("span", { className: "text-xs", children: "Sin vista previa" })
      ] }) }),
      /* @__PURE__ */ jsx25("div", { className: "px-3 py-2 bg-white border-t border-gray-100 flex justify-end gap-2", children: !isConfirmed ? /* @__PURE__ */ jsxs17(Fragment4, { children: [
        /* @__PURE__ */ jsx25(
          "button",
          {
            type: "button",
            onClick: handleCancel,
            className: "px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsxs17(
          "button",
          {
            type: "button",
            onClick: handleConfirm,
            className: "px-3 py-1.5 text-xs font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-sm transition-colors flex items-center gap-1",
            children: [
              /* @__PURE__ */ jsx25("span", { children: "Confirmar" }),
              /* @__PURE__ */ jsx25("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx25("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) })
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxs17(
        "button",
        {
          type: "button",
          onClick: handleDelete,
          className: "px-3 py-1.5 text-xs font-medium text-danger-600 bg-danger-50 border border-danger-100 rounded-lg hover:bg-danger-100 transition-colors flex items-center gap-1",
          children: [
            /* @__PURE__ */ jsx25("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx25("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) }),
            /* @__PURE__ */ jsx25("span", { children: "Eliminar" })
          ]
        }
      ) }),
      uploadStatus === "subiendo" /* UPLOADING */ && /* @__PURE__ */ jsx25("div", { className: "px-4 pb-2", children: /* @__PURE__ */ jsx25("div", { className: "w-full bg-gray-200 rounded-full h-1.5", children: /* @__PURE__ */ jsx25(
        "div",
        {
          className: "bg-primary-600 h-1.5 rounded-full transition-all duration-1000 ease-out",
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
import clsx16 from "clsx";
import { useEffect as useEffect15, useRef as useRef9, useState as useState20 } from "react";
import { FaChevronLeft as FaChevronLeft4, FaChevronRight as FaChevronRight5, FaCheck as FaCheck2 } from "react-icons/fa";
import { jsx as jsx26, jsxs as jsxs18 } from "react/jsx-runtime";
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
  maxContentHeight = "400px",
  color = "primary"
}) {
  const [direction, setDirection] = useState20("next");
  const contentRef = useRef9(null);
  const progressRef = useRef9(null);
  const isThemeColor = color in theme.colors;
  const resolvedColor = isThemeColor ? theme.colors[color][500] : color;
  useEffect15(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);
  useEffect15(() => {
    const pct = currentStep / Math.max(1, steps.length - 1) * 100;
    if (progressRef.current) {
      progressRef.current.style.width = `${pct}%`;
      progressRef.current.style.backgroundColor = resolvedColor;
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
  }, [currentStep, direction, steps.length, resolvedColor]);
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
      return /* @__PURE__ */ jsx26(FaCheck2, { className: "w-4 h-4" });
    }
    if (step.icon && useIcons) {
      return /* @__PURE__ */ jsx26("div", { className: "flex items-center justify-center w-5 h-5", children: step.icon });
    }
    return /* @__PURE__ */ jsx26("span", { className: "text-sm font-semibold", children: index + 1 });
  };
  return /* @__PURE__ */ jsxs18("div", { className: clsx16("w-full max-w-5xl mx-auto px-4", containerClassName), children: [
    /* @__PURE__ */ jsxs18("div", { className: "relative mb-8", children: [
      /* @__PURE__ */ jsx26(
        "div",
        {
          className: "absolute left-6 right-6 top-5 h-1 bg-gray-200 rounded-full z-0",
          "aria-hidden": true
        }
      ),
      /* @__PURE__ */ jsx26(
        "div",
        {
          ref: progressRef,
          className: "absolute left-6 top-5 h-1 rounded-full z-10 transition-all duration-500 ease-in-out",
          "aria-hidden": true
        }
      ),
      /* @__PURE__ */ jsx26("div", { className: "flex items-start justify-between space-x-2 relative z-20", children: steps.map((step, idx) => {
        const isActive = idx === currentStep;
        const isCompleted = idx < currentStep;
        const hasIcon = step.icon && useIcons;
        return /* @__PURE__ */ jsx26(
          "button",
          {
            type: "button",
            onClick: () => jumpTo(idx),
            disabled: !allowClickToJump && idx !== currentStep,
            "aria-current": isActive ? "step" : void 0,
            "aria-label": `Paso ${idx + 1} ${step.label}`,
            className: "flex-1 group",
            title: step.label,
            children: /* @__PURE__ */ jsxs18("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ jsx26(
                "div",
                {
                  className: clsx16(
                    "flex items-center justify-center w-11 h-11 rounded-full border-2 transition-all duration-300 transform",
                    hasIcon && "p-2",
                    isCompleted && "bg-slate-400 border-slate-400 text-white scale-100 shadow",
                    isActive && "text-white scale-110 shadow-lg",
                    !isActive && !isCompleted && "bg-white border-gray-300 text-gray-400"
                  ),
                  style: isActive ? { backgroundColor: resolvedColor, borderColor: resolvedColor } : void 0,
                  children: renderStepContent(idx, isCompleted, isActive)
                }
              ),
              /* @__PURE__ */ jsx26(
                "span",
                {
                  className: clsx16(
                    "mt-2 text-xs sm:text-sm font-medium transition-colors text-center",
                    isCompleted ? "text-slate-400" : !isActive && "text-gray-400"
                  ),
                  style: isActive ? { color: resolvedColor } : void 0,
                  children: step.label
                }
              )
            ] })
          },
          idx
        );
      }) })
    ] }),
    /* @__PURE__ */ jsx26(
      "div",
      {
        ref: contentRef,
        tabIndex: -1,
        role: "region",
        "aria-labelledby": `step-${currentStep}`,
        className: clsx16(
          stepClassName,
          "bg-white border border-gray-100 rounded-2xl shadow-lg min-h-[280px] transition-transform duration-400 no-scrollbar p-6",
          scrollableContent && "overflow-y-auto hide-scrollbar"
        ),
        style: scrollableContent && maxContentHeight ? { maxHeight: maxContentHeight } : void 0,
        children: steps[currentStep].content
      }
    ),
    /* @__PURE__ */ jsxs18("div", { className: "flex justify-between items-center mt-6", children: [
      /* @__PURE__ */ jsx26(
        ITButton,
        {
          variant: "outlined",
          color: "secondary",
          disabled: currentStep === 0,
          onClick: prevStep,
          children: /* @__PURE__ */ jsxs18("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx26(FaChevronLeft4, {}),
            "Atr\xE1s"
          ] })
        }
      ),
      /* @__PURE__ */ jsxs18("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs18("div", { className: "text-sm text-gray-500 mr-2 hidden sm:block", children: [
          "Paso ",
          currentStep + 1,
          " de ",
          steps.length
        ] }),
        /* @__PURE__ */ jsx26(
          ITButton,
          {
            variant: "solid",
            color,
            disabled: disableNext,
            onClick: nextStep,
            children: /* @__PURE__ */ jsxs18("div", { className: "flex items-center gap-2", children: [
              currentStep === steps.length - 1 ? "Finalizar" : "Siguiente",
              currentStep === steps.length - 1 ? /* @__PURE__ */ jsx26(FaCheck2, {}) : /* @__PURE__ */ jsx26(FaChevronRight5, {})
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
  ITPagination,
  ITSelect,
  ITSlideToggle,
  ITStepper,
  ITTable,
  ITText,
  ITTimePicker,
  ITToast,
  createValidationSchema
};
