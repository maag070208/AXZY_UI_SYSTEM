export interface ITDialogProps {
  /** Controls whether the dialog is visible. */
  isOpen: boolean;
  /** Callback fired when the overlay or close button is clicked, or Escape is pressed. */
  onClose: () => void;
  /** Content rendered inside the dialog body. */
  children: React.ReactNode;
  /** Additional CSS classes for the dialog panel. */
  className?: string;
  /** Optional heading displayed at the top of the dialog. */
  title?: string;
  /** When true and `title` is provided, renders an ITFormHeader instead of the default title bar. @default false */
  useFormHeader?: boolean;
  /** When false, the card has no padding: the title row and body are flush to the edges, so the content can draw its own sections. @default true */
  padded?: boolean;
  /** Makes the dialog fill the entire viewport. @default false */
  fullScreen?: boolean;
}
