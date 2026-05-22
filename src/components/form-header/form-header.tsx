import { FaTimes } from "react-icons/fa";
import { ITFormHeaderProps } from "./form-header.props";
import { useITThemeSafe } from "../theme-provider/themeProvider";
import { getContrastTextColor } from "@/utils/color.utils";

export default function ITFormHeader({
  title,
  onClose,
  className = "",
}: ITFormHeaderProps) {
  const themeContext = useITThemeSafe();

  const isDarkMode = themeContext?.resolvedTheme === "dark";
  const palette = themeContext?.palette;
  const textColorClass = getContrastTextColor(
    palette?.primary || "#06b6d4",
    palette,
    isDarkMode
  );

  return (
    <div className={`bg-primary-500 ${textColorClass} px-6 py-4 rounded-t-lg flex justify-center items-center relative ${className}`}>
      <h2 className="text-lg font-semibold text-center" style={{ color: "inherit" }}>{title}</h2>
      {onClose && (
        <button
          onClick={onClose}
          className={`absolute right-4 ${textColorClass} hover:opacity-80 transition-colors duration-200 p-1 rounded-full`}
          style={{ color: "inherit" }}
          aria-label="Cerrar"
        >
          <FaTimes className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
 