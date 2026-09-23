import clsx from "clsx";
import { ITFieldProps } from "./field.props";
import { inputError, inputLabel } from "@/utils/styles";
import ITText from "@/components/atoms/text/text";

/**
 * Form-field wrapper that standardizes label, required marker, helper text,
 * and error message around any control.
 *
 * Keeps spacing and error styling consistent across forms so each control
 * does not re-implement label/error logic.
 *
 * @example
 * <ITField label="Email" htmlFor="email" required error={errors.email} helpText="We never share it.">
 *   <ITInput name="email" value={email} onChange={onChange} />
 * </ITField>
 */
export default function ITField({
  label,
  htmlFor,
  required = false,
  error,
  helpText,
  children,
  className,
  labelClassName,
  contentClassName,
}: ITFieldProps) {
  const hasError = Boolean(error);
  const message = typeof error === "string" ? error : hasError ? "Este campo es requerido" : undefined;

  return (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={htmlFor} className={clsx(inputLabel(hasError), labelClassName)}>
          <ITText as="span">{label}</ITText>
          {required && (
            <ITText as="span" className="text-danger-500 ml-1">
              *
            </ITText>
          )}
        </label>
      )}

      <div className={clsx(contentClassName)}>{children}</div>

      {hasError ? (
        <ITText as="p" className={inputError}>{message}</ITText>
      ) : helpText ? (
        <ITText as="p" className="text-xs text-secondary-500 dark:text-secondary-400">{helpText}</ITText>
      ) : null}
    </div>
  );
}
