import { ReactNode } from "react";
import { ColorsTypes } from "@/types/colors.types";

export interface ITConfirmDialogProps {
  /** Controls whether the confirmation dialog is visible. */
  isOpen: boolean;
  /** Callback fired when the user cancels or closes the dialog. */
  onClose: () => void;
  /** Callback fired when the user confirms the destructive action. */
  onConfirm: () => void;
  /** Heading text displayed at the top of the dialog. @default "Confirmar acción" */
  title?: string;
  /** Body content — accepts plain strings or React nodes. @default "¿Estás seguro de que deseas continuar?" */
  message?: ReactNode;
  /** Label for the confirm button. @default "Confirmar" */
  confirmLabel?: string;
  /** Label for the cancel button. @default "Cancelar" */
  cancelLabel?: string;
  /** Color variant applied to the confirm button. Accepts any ColorsTypes value (e.g. "primary", "danger", "warning", "info"). @default "primary" */
  variant?: ColorsTypes;
  /** Disables all buttons and signals a loading state. @default false */
  loading?: boolean;
}
