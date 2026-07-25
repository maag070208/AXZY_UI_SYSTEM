export interface ITFormHeaderProps {
  /** Header title text */
  title: string;
  /** Optional close button click handler. If omitted, no close button is rendered */
  onClose?: () => void;
  /** Additional CSS classes */
  className?: string;
} 