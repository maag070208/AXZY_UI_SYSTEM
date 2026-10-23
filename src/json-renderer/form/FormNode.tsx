/**
 * Nodo `form` del motor: campos declarados en JSON, validación y envío por acción.
 *
 * El esquema describe los campos; el motor los pinta con `ITInput`, valida al enviar
 * y muestra el error bajo cada campo. Los valores válidos salen por la acción
 * `onSubmit` que resuelve el host: el host decide qué hacer con ellos.
 */

import React, { useState } from "react";
import ITButton from "../../components/atoms/button/button";
import ITFlex from "../../components/atoms/flex/flex";
import ITInput from "../../components/atoms/input/input";
import ITStack from "../../components/atoms/stack/stack";
import { useITTranslation } from "../../i18n/useITTranslation";
import { validateForm, type FormField, type FormRuleCode } from "./rules";

/** Props del nodo `form` ya resueltos por el renderizador. */
export interface FormNodeProps {
  /** Id del nodo: se refleja en el DOM como ancla. */
  id?: string;
  /** Campos, con sus textos ya traducidos. */
  fields: FormField[];
  /** Texto del botón de envío. Sin valor, `jsonRenderer.form.submit`. */
  submitLabel?: string;
  /** Acción del host: recibe los valores de los campos cuando el formulario es válido. */
  onSubmit?: (values: Record<string, string>) => void;
}

/** Valor de un evento o de un valor directo de `ITInput`. */
function valorDe(evento: unknown): string {
  if (typeof evento === "string") return evento;
  return (evento as { target?: { value?: unknown } } | null)?.target?.value?.toString() ?? "";
}

/**
 * Formulario declarado en JSON. Nunca lanza por los valores que escribe el usuario.
 *
 * @example
 * <FormNode fields={[{ name: "correo", kind: "email", label: "Correo", required: true }]}
 *           submitLabel="Enviar" onSubmit={(valores) => console.log(valores)} />
 */
export function FormNode({ id, fields, submitLabel, onSubmit }: FormNodeProps) {
  const { t } = useITTranslation();
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, FormRuleCode>>({});
  // Desde el primer envío, los campos se consideran tocados: sus errores se muestran.
  const [intentado, setIntentado] = useState(false);

  /** Mensaje traducido para un error de campo. Las longitudes van como parámetros. */
  const mensaje = (code: FormRuleCode, campo: FormField) =>
    t(`jsonRenderer.form.${code}`, { min: String(campo.minLength ?? 0), max: String(campo.maxLength ?? 0) });

  const enviar = () => {
    const encontrados = validateForm(fields, values);
    setIntentado(true);
    setErrors(encontrados);
    if (Object.keys(encontrados).length === 0) onSubmit?.(values);
  };

  return (
    <div id={id}>
      <ITStack direction="column" spacing={3} alignItems="stretch">
        {fields.map((field) => (
          <ITInput
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.kind === "email" ? "email" : "text"}
            value={values[field.name] ?? ""}
            touched={intentado}
            error={errors[field.name] ? mensaje(errors[field.name], field) : undefined}
            onChange={(evento: unknown) => {
              const valor = valorDe(evento);
              setValues((previo) => ({ ...previo, [field.name]: valor }));
              setErrors((previo) => {
                if (!previo[field.name]) return previo;
                const resto = { ...previo };
                delete resto[field.name];
                return resto;
              });
            }}
          />
        ))}
        <ITFlex>
          <ITButton label={submitLabel ?? t("jsonRenderer.form.submit")} size="sm" onClick={enviar} />
        </ITFlex>
      </ITStack>
    </div>
  );
}

export default FormNode;
