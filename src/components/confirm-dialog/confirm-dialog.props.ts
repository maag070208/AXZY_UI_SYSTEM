import { ReactNode } from "react";
import { ColorsTypes } from "@/types/colors.types";

export interface ITConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ColorsTypes;
  loading?: boolean;
}
