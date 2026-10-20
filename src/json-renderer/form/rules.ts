/**
 * Reglas del nodo `form`: lectura de los campos del esquema y validación de valores.
 *
 * Son funciones puras, sin React. Las usan a la vez el renderizador (para pintar) y el
 * validador (para avisar antes de pintar), así que una forma inválida se trata igual
 * en los dos sitios. Las validaciones devuelven el **código** del error, no el texto:
 * el texto lo pone `FormNode` con `jsonRenderer.form.*`.
 *
 * Deliberadamente no hay reglas con expresiones regulares declaradas en el JSON: una
 * regex que llega del esquema puede bloquear la pestaña (retrocesos catastróficos).
 */

import { issue, type JsonEngineIssue } from "../shared/errors";
import { formatPath, type SchemaPath } from "../shared/paths";

/** Tipos de campo que admite el nodo `form`. */
export const FORM_FIELD_KINDS = ["text", "email"] as const;

/** Tipo de campo. */
export type FormFieldKind = (typeof FORM_FIELD_KINDS)[number];

/** Código de error de un campo. */
export type FormRuleCode = "required" | "email" | "minLength" | "maxLength";

/** Campo ya validado en forma, con la etiqueta aún sin traducir. */
export interface DeclaredField {
  /** Nombre del campo: clave del valor enviado. */
  name: string;
  /** Tipo de campo. */
  kind: FormFieldKind;
  /** Si el campo es obligatorio. */
  required: boolean;
  /** Mínimo de caracteres (sin contar espacios de los extremos). */
  minLength?: number;
  /** Máximo de caracteres (sin contar espacios de los extremos). */
  maxLength?: number;
  /** Etiqueta tal cual la declaró el esquema (puede ser `{ i18n }`). */
  label: unknown;
}

/** Campo listo para pintar: la etiqueta ya es texto. */
export interface FormField {
  /** Nombre del campo. */
  name: string;
  /** Tipo de campo. */
  kind: FormFieldKind;
  /** Etiqueta visible. */
  label: string;
  /** Si el campo es obligatorio. */
  required: boolean;
  /** Mínimo de caracteres. */
  minLength?: number;
  /** Máximo de caracteres. */
  maxLength?: number;
}

/** Forma razonable de un correo: algo@algo.dominio, sin espacios. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Longitud declarada: entero no negativo, o `undefined` si no hay o no es válida. */
function longitudDeclarada(value: unknown): number | undefined {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : undefined;
}

/**
 * Lee los campos declarados. Un campo sin `name` o repetido se descarta con `JR021`;
 * un tipo no admitido cae a `text` con `JR011`; una longitud inválida se ignora con
 * `JR011`. Si el mínimo supera al máximo, se descarta el campo con `JR021`.
 *
 * @example
 * readFormFields([{ name: "correo", kind: "email" }], ["content", 0, "props", "fields"]).fields[0].kind; // "email"
 */
export function readFormFields(declared: unknown, fieldsPath: SchemaPath): { fields: DeclaredField[]; issues: JsonEngineIssue[] } {
  const issues: JsonEngineIssue[] = [];
  const fields: DeclaredField[] = [];

  if (!Array.isArray(declared)) {
    issues.push(issue("JR021", "El formulario necesita `props.fields` como lista.", formatPath(fieldsPath), { severity: "error" }));
    return { fields, issues };
  }

  const nombres = new Set<string>();
  declared.forEach((raw, index) => {
    const fieldPath = [...fieldsPath, index];
    const campo = raw as Record<string, unknown> | null;
    if (!campo || typeof campo !== "object" || typeof campo.name !== "string" || campo.name === "") {
      issues.push(issue("JR021", "Un campo del formulario no declara `name`.", formatPath(fieldPath), { severity: "error" }));
      return;
    }
    if (nombres.has(campo.name)) {
      issues.push(issue("JR021", `El campo "${campo.name}" se repite.`, formatPath(fieldPath), { severity: "error" }));
      return;
    }

    let kind: FormFieldKind = "text";
    if (campo.kind !== undefined) {
      if (typeof campo.kind === "string" && (FORM_FIELD_KINDS as readonly string[]).includes(campo.kind)) {
        kind = campo.kind as FormFieldKind;
      } else {
        issues.push(
          issue("JR011", `Tipo de campo "${String(campo.kind)}" no admitido.`, formatPath(fieldPath), {
            severity: "warning",
            hint: `Admitidos: ${FORM_FIELD_KINDS.join(", ")}. Se usa "text".`,
          })
        );
      }
    }

    const minLength = longitudDeclarada(campo.minLength);
    const maxLength = longitudDeclarada(campo.maxLength);
    for (const [clave, valor, declarada] of [["minLength", campo.minLength, minLength], ["maxLength", campo.maxLength, maxLength]] as const) {
      if (valor !== undefined && declarada === undefined) {
        issues.push(issue("JR011", `\`${clave}\` debe ser un entero no negativo.`, formatPath(fieldPath), { severity: "warning", hint: "Se ignora." }));
      }
    }
    if (minLength !== undefined && maxLength !== undefined && minLength > maxLength) {
      issues.push(issue("JR021", `El campo "${campo.name}" tiene minLength mayor que maxLength.`, formatPath(fieldPath), { severity: "error" }));
      return;
    }

    nombres.add(campo.name);
    fields.push({ name: campo.name, kind, required: campo.required === true, minLength, maxLength, label: campo.label });
  });

  return { fields, issues };
}

/**
 * Valida un valor contra las reglas de su campo. Devuelve el código del primer error o `undefined`.
 *
 * El orden importa para el mensaje: obligatorio, longitud, correo. Un campo opcional vacío
 * no tiene más reglas que cumplir.
 */
export function validateField(
  field: Pick<FormField, "kind" | "required" | "minLength" | "maxLength">,
  value: string
): FormRuleCode | undefined {
  const texto = value.trim();
  if (texto === "") return field.required ? "required" : undefined;
  if (field.minLength !== undefined && texto.length < field.minLength) return "minLength";
  if (field.maxLength !== undefined && texto.length > field.maxLength) return "maxLength";
  if (field.kind === "email" && !EMAIL.test(texto)) return "email";
  return undefined;
}

/**
 * Valida todos los campos. Devuelve solo los que tienen error, por nombre de campo.
 *
 * @example
 * validateForm(campos, { nombre: "" }); // { nombre: "required" }
 */
export function validateForm(
  fields: Pick<FormField, "name" | "kind" | "required" | "minLength" | "maxLength">[],
  values: Record<string, string>
): Record<string, FormRuleCode> {
  const errores: Record<string, FormRuleCode> = {};
  for (const field of fields) {
    const code = validateField(field, values[field.name] ?? "");
    if (code) errores[field.name] = code;
  }
  return errores;
}
