import { FaTimes } from "react-icons/fa";
import { ITFormHeaderProps } from "./form-header.props";

export default function ITFormHeader({
  title,
  onClose,
  className = "",
}: ITFormHeaderProps) {
  return (
    <div className={`bg-primary-500 text-white px-6 py-4 rounded-t-lg flex justify-center items-center relative ${className}`}>
      <h2 className="text-lg font-semibold text-center">{title}</h2>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 text-white hover:text-gray-200 transition-colors duration-200 p-1 rounded-full hover:bg-primary-600"
          aria-label="Cerrar"
        >
          <FaTimes className="w-4 h-4" />
        </button>
      )}
    </div>
  );
} 