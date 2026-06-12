import clsx from "clsx";
import { ITSliderProps } from "./slider.props";
import ITText from "@/components/text/text";

export default function ITSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  disabled = false,
  className,
}: ITSliderProps) {
  return (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      {label && (
        <ITText as="label" className="text-xs font-semibold text-gray-600 dark:text-gray-400">
          {label}: {value}
        </ITText>
      )}
      <div className="relative w-full h-5 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className={clsx(
            "w-full h-1.5 appearance-none rounded-full outline-none cursor-pointer",
            "bg-gray-200 dark:bg-gray-700",
            "accent-primary-500",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4",
            "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500",
            "[&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white",
            "[&::-webkit-slider-thumb]:hover:bg-primary-600 [&::-webkit-slider-thumb]:transition-colors",
            "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:bg-primary-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white",
            "[&::-moz-range-track]:bg-gray-200 dark:[&::-moz-range-track]:bg-gray-700",
            "[&::-moz-range-track]:rounded-full [&::-moz-range-track]:h-1.5"
          )}
        />
      </div>
    </div>
  );
}
