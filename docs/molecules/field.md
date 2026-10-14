# ITField

|  |  |
| --- | --- |
| Capa | `molecules` |
| Carpeta | `src/components/molecules/field/` |
| Archivo | `field.tsx` |
| Props | `field.props.ts` |
| Import | `import { ITField } from "@axzydev/axzy_ui_system"` |

Contenedor de campo de formulario que estandariza label, asterisco de requerido, texto de ayuda y mensaje de error alrededor de cualquier control (`ITInput`, `ITSelect`, `ITTextarea`, …).

## Import

```tsx
import { ITField } from "@axzydev/axzy_ui_system";
```

## Props

### `ITFieldProps`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `label` | `string` | — | Etiqueta renderizada sobre el control. |
| `htmlFor` | `string` | — | `id` del control al que apunta el label (`htmlFor`). |
| `required` | `boolean` | `false` | Muestra un asterisco rojo junto al label. |
| `error` | `string \| boolean` | — | Error de validación. `true` para el mensaje genérico, o un string. |
| `helpText` | `string` | — | Texto de ayuda bajo el control cuando no hay error. |
| `children` | `ReactNode` | — | El control del formulario. |
| `className` | `string` | — | Clases CSS adicionales para el contenedor. |
| `labelClassName` | `string` | — | Clases CSS adicionales para el label. |
| `contentClassName` | `string` | — | Clases CSS adicionales para el contenedor del control. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITField, ITInput } from "@axzydev/axzy_ui_system";

export default function EmailField() {
  const [email, setEmail] = useState("");
  const error = email && !email.includes("@") ? "Ingresa un correo válido." : undefined;

  return (
    <ITField label="Correo" htmlFor="email" required error={error} helpText="Nunca compartimos tu correo.">
      <ITInput name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </ITField>
  );
}
```

## Notas

- `hasError = Boolean(error)`. El error tiene prioridad sobre `helpText`: solo se muestra uno.
- `error` como string se muestra tal cual; `error === true` renderiza el mensaje genérico `"Este campo es requerido"`.
- El `<label>` aplica `inputLabel(hasError)` (de `@/utils/styles`) y solo añade el asterisco cuando `required`.
- El control va dentro de un `<div>` con `contentClassName`.
- No inyecta `aria-invalid`/`aria-describedby` en el control: la asociación accesible la debe resolver el consumidor con `htmlFor` + `id`.
- Estructura: `flex flex-col gap-1.5`.

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `field.required` | `Este campo es requerido` | `This field is required` | `field.tsx:32` (fallback cuando `error` es `true`) |

`label` y `helpText` entran por props.
