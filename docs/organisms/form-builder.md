# ITFormBuilder

|  |  |
| --- | --- |
| Capa | `organisms` |
| Carpeta | `src/components/organisms/form-builder/` |
| Archivo | `formBuilder.tsx` |
| Props | `formBuilder.props.ts` |
| Import | `import { ITFormBuilder } from "@axzydev/axzy_ui_system"` |

Generador declarativo de formularios. Renderiza una rejilla responsive de campos a partir de un
arreglo V2 (`config`) o legacy V1 (`fields`) y cablea cada input/select/fecha a los callbacks
estilo Formik (`handleChange`, `handleBlur`, `setFieldValue`). Es totalmente controlado: no
posee el estado del formulario.

## Import

```tsx
import { ITFormBuilder } from "@axzydev/axzy_ui_system";
```

## Props

### `ITFormBuilderProps`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `fields` | `FieldConfig[]` | — | Definiciones V1 (legacy, **deprecado**). Subconjunto reducido: sin reglas, `section`, `custom` ni opciones asíncronas. |
| `config` | `FieldConfigV2[]` | — | Configuración V2 (recomendada). Soporta motor de reglas (`renderWhen`/`dynamicProps`/`dependsOn`), `sections`, renderers custom, options async y validación por campo. Si se pasa, anula `fields`. |
| `values` | `ITFormBuilderValues` (`Record<string, unknown>`) | — | Valores del formulario indexados por `name`. Obligatoria. |
| `handleChange` | `(event: ITFormBuilderChangeEvent) => void` | — | Callback de cambio estilo Formik. Obligatoria. |
| `handleBlur` | `(event: ITFormBuilderBlurEvent) => void` | — | Callback de blur estilo Formik. Obligatoria. |
| `touched` | `ITFormBuilderTouched` (`Record<string, boolean>`) | — | Estado de touched por campo. Obligatoria. |
| `errors` | `ITFormBuilderErrors` (`Record<string, string \| undefined>`) | — | Errores de validación por campo. Obligatoria. |
| `setFieldValue` | `(field: string, value: any, shouldValidate?: boolean) => Promise<void \| any>` | no-op | Asigna un valor de campo (paridad Formik). Necesario para `onChangeAction` y efectos de `dynamicProps`. |
| `setFieldTouched` | `(field: string, touched?: boolean, shouldValidate?: boolean) => Promise<void \| any>` | no-op | Marca un campo como tocado (paridad Formik). |
| `setFieldError` | `(field: string, message: string \| undefined) => void` | no-op | Asigna un error de campo (paridad Formik). |
| `isSubmitting` | `boolean` | `false` | Estado de envío del formulario padre; se expone vía el contexto del builder. |
| `children` | `ReactNode` | — | Se renderiza dentro del `ITFormBuilderProvider` (ruta V2), después de la rejilla. Útil para botones de envío que leen estado vía `useFormBuilder`. Se ignora en la ruta V1. |

## Tipos relacionados

```typescript
export type ITFormBuilderChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.FocusEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>
  | { target: { name: string; value: any } };

export type ITFormBuilderBlurEvent =
  | React.FocusEvent<HTMLInputElement>
  | React.FocusEvent<HTMLSelectElement, Element>
  | React.FocusEvent<HTMLTextAreaElement, Element>
  | { target: { name: string; value: any } };

export type ITFormBuilderValues = Record<string, unknown>;
export type ITFormBuilderErrors = Record<string, string | undefined>;
export type ITFormBuilderTouched = Record<string, boolean>;
```

Los tipos de campo (`FieldConfig` V1 y `FieldConfigV2` V2, con `FieldTypeV2` y `FieldContextV2`)
viven en `src/types/field.types.ts` y se exportan como `FieldConfig` / `FieldConfigV2`.

## Ejemplo

```tsx
import { useState } from "react";
import { ITFormBuilder } from "@axzydev/axzy_ui_system";
import type { FieldConfigV2 } from "@axzydev/axzy_ui_system";

const config: FieldConfigV2[] = [
  {
    name: "country",
    label: "País",
    type: "select",
    required: true,
    options: [
      { value: "MX", label: "México" },
      { value: "US", label: "USA" },
    ],
  },
  {
    name: "rfc",
    label: "RFC",
    type: "text",
    required: true,
    dependsOn: ["country"],
    renderWhen: (v) => v.country === "MX",
  },
  {
    name: "subtotal",
    label: "Subtotal",
    type: "number",
    currencyFormat: true,
    onChangeAction: (val, ctx) =>
      ctx.setFieldValue("total", (Number(val) * 1.16).toFixed(2)),
  },
  { name: "total", label: "Total", type: "number", currencyFormat: true, disabled: true },
];

export function InvoiceForm() {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors] = useState<Record<string, string | undefined>>({});

  return (
    <ITFormBuilder
      config={config}
      columns={12}
      values={values}
      handleChange={(e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
      }}
      handleBlur={(e) => {
        const { name } = e.target as { name: string };
        setTouched((prev) => ({ ...prev, [name]: true }));
      }}
      touched={touched}
      errors={errors}
      setFieldValue={async (field, value) => {
        setValues((prev) => ({ ...prev, [field]: value }));
      }}
    />
  );
}
```

## Notas

- **V1 vs V2.** Si se pasa `config`, tiene prioridad y hace sombra a `fields`. Si no se pasa ninguno, el componente no renderiza nada. V1 no monta provider ni expone contexto.
- **Campos V1 soportados.** `text`, `number`, `password`, `select` y `date`. Un `type` desconocido se ignora (renderiza `null`) y, en desarrollo, emite un `console.warn`.
- **Campos V2 por `type`** (`fieldRenderer.tsx`): `text`/`password`/`number`/`email` → `ITInput` (email se pasa como `text`); `select` con opciones síncronas → `ITSelect`; `select` con `options` función → `ITSearchSelect` con spinner; `date` → `ITDatePicker`; `time` → `ITTimePicker`; `custom` → `config.component`; `section` → rejilla anidada de `config.fields`; `array` → placeholder reservado.
- **Drift verificado (`checkbox`/`radio`).** `FieldTypeV2` declara `"checkbox"` y `"radio"`, pero `fieldRenderer.tsx` no tiene ramas para ellos: caen en el `default`, que avisa por consola y devuelve `null`.
- **Motor de reglas.** `dependsOn` filtra los valores que se pasan a `renderWhen`/`dynamicProps`; solo se re-evalúan cuando cambia alguno de esos hermanos. `renderWhen` falso oculta (y excluye) el campo.
- **`custom`.** Antes de renderizar `config.component` se eliminan las claves propias del builder (`component`, `type`, `fields`, `renderWhen`, `dynamicProps`, `dependsOn`, `validation`, `asyncValidation`, `options`, `defaultValue`, `className`) y se añaden `name`, `value`, `onChange`, `onBlur`, `error`, `touched` y `context`.
- **Sin export público del contexto.** `ITFormBuilderProvider` (en `formBuilder.context.tsx`) y el hook `useFormBuilder` **no** están en `src/index.ts`; solo se exporta `ITFormBuilder`. La prop `children` usa ese contexto internamente.
- **Opciones asíncronas.** `useAsyncOptions` resuelve el arreglo o llama a la función una vez por cambio de dependencias y expone `loading` (spinner `"Cargando opciones..."`).
- **Estilos.** La rejilla usa `formGrid(columns)` y `getColSpanClass(column, columns)` de `@/utils/styles`; `columns` se limita al rango 1–12.

## Textos (i18n)

| Key | es | en | Dónde (`fieldRenderer.tsx`) |
| --- | --- | --- | --- |
| `formBuilder.loadingOptions` | `Cargando opciones...` | `Loading options...` | `:225` (select con opciones asíncronas) |
| `formBuilder.arrayField` | `Array Field: {label}` | `Array field: {label}` | `:371` (placeholder de `type: "array"`) |

Los `label` y `placeholder` de cada campo entran por la configuración. Los mensajes de consola
(`[ITFormBuilder] Unknown legacy V1 field type ...`, `Field ... has type "custom" but no …`,
`Unknown V2 field type …`) son solo de desarrollo y no se renderizan.
