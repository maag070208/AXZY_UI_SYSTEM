import { useState } from "react";

const ITImage = ({
  src,
  alt,
  className = "",
  fallbackSrc = "",
}) => {
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
          src={fallbackSrc}
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
