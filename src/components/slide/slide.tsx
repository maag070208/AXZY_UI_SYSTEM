import { useState, useEffect } from "react";
import clsx from "clsx";
import { ITSlideToggleProps } from "./slide.props";
import { theme } from "@/theme/theme";

/**
 * Slide toggle switch component.
 * Supports fully controlled (`isOn`) or uncontrolled (`initialState`) modes.
 */
export default function ITSlideToggle({
  onToggle,
  isOn: controlledIsOn,
  initialState = false,
  activeColor = "success",
  inactiveColor = "#9ca3af", // default gray-400
  disabled = false,
  size = "md",
  className = "",
}: ITSlideToggleProps) {
  // Handle internal state if not controlled
  const isControlled = controlledIsOn !== undefined;
  const [internalIsOn, setInternalIsOn] = useState(initialState);

  // Sync internal state with controlled state if it changes externally
  useEffect(() => {
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

  // Resolve active theme color
  const isThemeColor = activeColor in theme.colors;
  const resolvedActiveColor = isThemeColor
    ? theme.colors[activeColor as keyof typeof theme.colors][500]
    : activeColor;

  // Resolve inactive color (could also be theme color, but defaulting to hex)
  const isInactiveThemeColor = inactiveColor in theme.colors;
  const resolvedInactiveColor = isInactiveThemeColor
    ? theme.colors[inactiveColor as keyof typeof theme.colors][400]
    : inactiveColor;

  const backgroundColor = isOn ? resolvedActiveColor : resolvedInactiveColor;

  // Sizing definitions
  const sizeClasses = {
    sm: {
      container: "w-10 h-5",
      knob: "w-3.5 h-3.5",
      translate: "translate-x-5",
    },
    md: {
      container: "w-14 h-7",
      knob: "w-5 h-5",
      translate: "translate-x-7",
    },
    lg: {
      container: "w-16 h-8",
      knob: "w-6 h-6",
      translate: "translate-x-8",
    },
  };

  const { container, knob, translate } = sizeClasses[size];

  return (
    <div
      onClick={toggleSwitch}
      className={clsx(
        "flex items-center rounded-full p-1 transition-colors duration-300",
        container,
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className
      )}
      style={{ backgroundColor }}
      role="switch"
      aria-checked={isOn}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleSwitch();
        }
      }}
    >
      <div
        className={clsx(
          "bg-white rounded-full shadow-md transform transition-transform duration-300 pointer-events-none",
          knob,
          isOn ? translate : "translate-x-0"
        )}
      />
    </div>
  );
}
