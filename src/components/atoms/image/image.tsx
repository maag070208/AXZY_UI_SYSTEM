import { useState } from "react";
import { ITImageProps } from "./image.props";

/**
 * Image component with automatic fallback on load error.
 * Displays the primary `src` image and gracefully switches to the
 * `fallback` image if loading fails.
 *
 * @example
 * <ITImage
 *   src="https://example.com/photo.jpg"
 *   fallback="/images/placeholder.png"
 *   alt="User photo"
 * />
 *
 * @example
 * <ITImage
 *   src="/assets/logo.svg"
 *   alt="Company Logo"
 *   className="w-32 h-32 rounded-full"
 * />
 */
const ITImage = ({
  src,
  alt,
  className = "",
  fallback = "",
}: ITImageProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`${className} flex items-center justify-center bg-transparent`}
    >
      {imageError ? (
        <img
          src={fallback}
          alt="Fallback"
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src={src}
          alt={alt}
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default ITImage;
