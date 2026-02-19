import { theme } from "@/theme/theme";
import { LoaderSize, sizeClasses } from "@/types/loader.types";
import { LoaderProps } from "./loader.props";

export default function ITLoader({
  size = "md",
  variant = "spinner",
  color = "primary", // Default to semantic primary
  className = "",
}: LoaderProps) {
  
  // Resolve color: Check if it's a semantic color in theme, otherwise use as-is
  const isSemantic = color in theme.colors;
  const resolvedColor = isSemantic 
    ? theme.colors[color as keyof typeof theme.colors][500] 
    : color;

  // Helper for conditional styles
  const isCssValue = isSemantic || color.startsWith("#") || color.startsWith("rgb");
  
  // Base style object
  const style = isCssValue ? { color: resolvedColor } : {};
  const bgStyle = isCssValue ? { backgroundColor: resolvedColor } : {};

  // Legacy class handling: if it's not a CSS value, inject it as a class
  const colorClass = !isCssValue ? color : "";

  if (variant === "spinner") {
    return (
      <div
        className={`inline-block ${sizeClasses[size]} animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${colorClass} ${className}`}
        role="status"
        style={style}
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    );
  }

  // Dots loader
  if (variant === "dots") {
    return (
      <div
        className={`flex items-center justify-center space-x-2 ${className}`}
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`${
              sizeClasses[size.replace(/l|g/, "") as LoaderSize]
            } animate-bounce rounded-full ${colorClass}`}
            style={{ 
                ...bgStyle,
                animationDelay: `${i * 0.1}s` 
            }}
          />
        ))}
      </div>
    );
  }

  // Bar loader
  if (variant === "bar") {
    // For bar, we need a lighter shade for the background 'track' if possible, 
    // or just use gray-200.
    // And the progress bar uses the resolved color.
    return (
      <div
        className={`w-full ${
          size === "sm"
            ? "h-1"
            : size === "md"
            ? "h-1.5"
            : size === "lg"
            ? "h-2"
            : "h-2.5"
        } bg-gray-200 rounded-full overflow-hidden ${className}`}
      >
        <div
          className={`h-full animate-progress ${colorClass}`}
          style={{
            backgroundColor: resolvedColor, 
            // Simplified gradient for modern look, or keep it solid
             backgroundImage: isCssValue 
                ? `linear-gradient(to right, ${resolvedColor}DD, ${resolvedColor})` 
                : undefined,
            animation: "progress 1.5s ease-in-out infinite",
          }}
        />
      </div>
    );
  }

  // Pulse loader
  if (variant === "pulse") {
    return (
      <div
        className={`rounded-full ${sizeClasses[size]} animate-pulse ${colorClass} ${className}`}
        style={bgStyle}
      />
    );
  }

  return null;
}
