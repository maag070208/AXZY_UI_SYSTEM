export interface ITImageProps {
  /** Source URL of the image */
  src: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Additional CSS classes */
  className?: string;
  /** Fallback image URL shown when the primary `src` fails to load */
  fallback?: string;
  /** Click handler */
  onClick?: () => void;
}
