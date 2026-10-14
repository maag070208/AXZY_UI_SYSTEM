# ITSelect

|  |  |
| --- | --- |
| Capa | `molecules` |
| Directorio | `src/components/molecules/select/` |
| Archivo | `select.tsx` |
| Props | `select.props.ts` |
| Import | `import { ITSelect } from "@axzydev/axzy_ui_system"` |

Selector desplegable nativo (`<select>`) estilizado con los tokens de input del design system.
Soporta label, placeholder, validación (`touched` / `error` / `required`), tamaño y modo solo
lectura. Los colores y estados se resuelven desde `theme.input`.

## Import

```tsx
import { ITSelect } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `name` | `string` | `—` | Atributo `name` del `<select>` subyacente (también su `id`). |
| `options` | `OptionType[]` | `—` | Arreglo de objetos clave-valor con `value`/`label`. |
| `valueField` | `string` | `"value"` | Clave de cada objeto usada como valor de la opción. |
| `labelField` | `string` | `"label"` | Clave de cada objeto usada como etiqueta visible. |
| `label` | `string` | `—` | Etiqueta sobre el select (vinculada por `htmlFor={name}`). |
| `placeholder` | `string` | `—` | Texto de la opción vacía por defecto. Si se omite, se muestra `"Selecciona una opción"`. |
| `value` | `string` | `—` | Valor seleccionado (controlado). |
| `onChange` | `(event: React.ChangeEvent<HTMLSelectElement>) => void` | `—` | Se llama al cambiar la selección; recibe el evento nativo. |
| `onBlur` | `(event: React.FocusEvent<HTMLSelectElement>) => void` | `—` | Se llama al perder el foco. |
| `variant` | `ColorsTypes` | `—` | Variante de color. **Declarada en el tipo, pero `select.tsx` no la aplica.** |
| `size` | `SizesTypes` | `"md"` | Tamaño: `"sm"` \| `"md"` \| `"lg"`. |
| `disabled` | `boolean` | `false` | Deshabilita el select. |
| `className` | `string` | `—` | Clases extra aplicadas al elemento `<select>`. |
| `touched` | `boolean` | `—` | Marca el campo como tocado (para mostrar el error). |
| `error` | `string \| boolean` | `—` | Mensaje de error o `true` para el error por defecto. |
| `required` | `boolean` | `—` | Marca el campo como requerido (asterisco rojo y error por defecto). |
| `autoFocus` | `boolean` | `—` | Enfoca el select al montar. **Declarado en el tipo, pero `select.tsx` no lo aplica.** |
| `readOnly` | `boolean` | `false` | Modo solo lectura: muestra el valor actual como una opción deshabilitada. |

### `OptionType`

```typescript
export interface OptionType {
  [key: string]: string;
}
```

## Ejemplo

```tsx
import { useState } from "react";
import { ITSelect } from "@axzydev/axzy_ui_system";

export default function RolSelector() {
  const [role, setRole] = useState("");

  return (
    <ITSelect
      name="role"
      label="Rol"
      placeholder="Selecciona un rol"
      value={role}
      options={[
        { label: "Administrador", value: "SUPERADMIN" },
        { label: "Operador", value: "OPERATOR" },
        { label: "Auditor", value: "AUDITOR" },
      ]}
      required
      touched
      error={!role ? "Debe seleccionar un rol" : undefined}
      onChange={(e) => setRole(e.target.value)}
    />
  );
}
```

## Notas

- Es un `<select>` nativo con `appearance: none` y un icono `FaAngleDown` absoluto: la apariencia se controla por estilos inline derivados de `theme.input`.
- La opción vacía se renderiza siempre como primera opción con `value=""`; su texto es `placeholder` o, si no se pasa, `"Selecciona una opción"`.
- Estado de error: se calcula como `error === true ? "Este campo es requerido" : error`, o `"Este campo es requerido"` si `required` y el valor está vacío. Solo se muestra cuando el campo está «touched» (`touched` explícito o el estado interno al hacer blur).
- En `readOnly` se pinta una única opción deshabilitada con la etiqueta del valor actual y `onChange` no se conecta.
- No usa el átomo `ITInput`: comparte utilidades como `inputFieldStyle` y `inputLabel` de `@/utils/styles`.
- **Drift verificado**: `variant` y `autoFocus` existen en `ITSelectProps` pero no se destructuran ni se aplican en `select.tsx`.

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `select.placeholder` | `Selecciona una opción` | `Select an option` | `select.tsx:105` (placeholder por defecto) |
| `field.required` | `Este campo es requerido` | `This field is required` | `select.tsx:39`, `select.tsx:40`, `select.tsx:43` |

`select.noResults` existe en el catálogo pero **no** lo usa `ITSelect` (es un `<select>` nativo); lo
consumen `ITMultiSelect` y `ITSearchSelect`.
