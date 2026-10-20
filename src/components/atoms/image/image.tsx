import { useState } from "react";
import { ITImageProps } from "./image.props";
import { useITTranslation } from "@/i18n";

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
  fit = "cover",
}: ITImageProps) => {
  const [imageError, setImageError] = useState(false);
  const { t } = useITTranslation();

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
          alt={t("image.fallbackAlt")}
          className="w-full h-full" style={{ objectFit: fit }}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          onError={handleImageError}
          className="w-full h-full" style={{ objectFit: fit }}
        />
      )}
    </div>
  );
};

export default ITImage;
