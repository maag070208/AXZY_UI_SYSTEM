import clsx from "clsx";
import { ITConfirmDialogProps } from "./confirm-dialog.props";
import ITButton from "../button/button";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ITConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar acción",
  message = "¿Estás seguro de que deseas continuar?",
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  variant = "primary",
  loading = false,
}: ITConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div
        className={clsx(
          "relative z-10 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6",
          "border border-slate-200 dark:border-slate-700"
        )}
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center flex-shrink-0">
            <FaExclamationTriangle className="text-amber-600" size={18} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">{title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <ITButton label={cancelLabel} variant="outlined" size="small" onClick={onClose} disabled={loading} />
          <ITButton label={confirmLabel} color={variant} size="small" onClick={onConfirm} disabled={loading} />
        </div>
      </div>
    </div>
  );
}
