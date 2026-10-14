# ITSearchSelect

|  |  |
| --- | --- |
| Capa | `molecules` |
| Directorio | `src/components/molecules/search-select/` |
| Archivo | `search-select.tsx` |
| Props | `search-select.props.ts` |
| Import | `import { ITSearchSelect } from "@axzydev/axzy_ui_system"` |

Combobox de selección única con búsqueda. Funciona en dos modos: **Modo 1** con `options` locales y
filtrado en cliente, y **Modo 2** con `onSearch` para búsqueda remota (el filtrado se delega al
callback, con *debounce* de 500 ms). El panel se renderiza en un portal para no recortarse.

## Import

```tsx
import { ITSearchSelect } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `name` | `string` | `—` | Atributo `name` para integración con formularios. |
| `label` | `string` | `—` | Etiqueta sobre el input. |
| `placeholder` | `string` | `"Selecciona una opción"` | Texto de placeholder cuando no hay valor. |
| `value` | `string \| number` | `—` | Valor seleccionado actual. |
| `options` | `ITSearchSelectOption[]` | `[]` | Opciones para el modo local (Modo 1). |
| `valueField` | `string` | `"value"` | Campo usado como valor de la opción. |
| `labelField` | `string` | `"label"` | Campo usado como etiqueta visible de la opción. |
| `onChange` | `(value: string \| number, option?: ITSearchSelectOption) => void` | `—` | Se llama al cambiar el valor; recibe el valor y el objeto de opción. |
| `onBlur` | `(e: FocusEvent<any>) => void` | `—` | Se llama cuando el input pierde el foco. |
| `disabled` | `boolean` | `false` | Deshabilita el componente. |
| `className` | `string` | `—` | Clases extra del contenedor. |
| `touched` | `boolean` | `—` | Indica si el campo fue interactuado (validación). |
| `required` | `boolean` | `—` | Marca el campo como requerido (asterisco rojo). |
| `error` | `string \| boolean` | `—` | Mensaje de error o `true` para estado de error. |
| `readOnly` | `boolean` | `false` | Modo solo lectura. |
| `size` | `SizesTypes` | `"md"` | Tamaño: `"sm"` \| `"md"` \| `"lg"`. |
| `onSearch` | `(query: string) => void` | `—` | Búsqueda server-side (Modo 2); *debounce* de 500 ms. |
| `isLoading` | `boolean` | `false` | Muestra spinner mientras se cargan opciones desde una API. |
| `noResultsMessage` | `string` | `"No se encontraron resultados"` | Mensaje cuando no hay resultados. |
| `renderOption` | `(option: ITSearchSelectOption, state: { isSelected: boolean; searchTerm: string }) => ReactNode` | `—` | Plantilla personalizada de cada opción. |
| `clearable` | `boolean` | `true` | Muestra el botón de limpiar (X) dentro del input. |
| `onClear` | `() => void` | `—` | Se llama al pulsar el botón de limpiar. |

### `ITSearchSelectOption`

```typescript
export interface ITSearchSelectOption {
  label: string;
  value: string | number;
  [key: string]: any; // campos custom
}
```

## Ejemplo

```tsx
import { useState } from "react";
import { ITSearchSelect } from "@axzydev/axzy_ui_system";

export default function PaisSelector() {
  const [country, setCountry] = useState<string | number>("");

  return (
    <ITSearchSelect
      name="country"
      label="Seleccionar País"
      placeholder="Escribe para filtrar..."
      value={country}
      options={[
        { label: "México", value: "MX" },
        { label: "España", value: "ES" },
        { label: "Colombia", value: "CO" },
      ]}
      onChange={(value) => setCountry(value)}
      clearable
      onClear={() => setCountry("")}
    />
  );
}
```

## Notas

- **Modo 1 (local)**: con `options` y sin `onSearch`, el filtrado es en cliente sobre `labelField`, sensible a mayúsculas solo por `toLowerCase()`. Mientras el input muestra la etiqueta de la opción seleccionada y está enfocado, se muestran todas las opciones; solo filtra cuando el usuario escribe algo distinto.
- **Modo 2 (API)**: si se pasa `onSearch`, el componente **no filtra** `options`; el padre debe actualizar `options` con los resultados. El callback se invoca con 500 ms de *debounce*.
- El panel va en portal (`document.body`) y se posiciona con `useFloatingPanel` (`matchWidth: true`), por lo que no se recorta en contenedores `overflow-hidden`.
- El botón de limpiar (X) aparece cuando `clearable` y hay texto o valor. Al limpiar se emite `onChange("", undefined)` y luego `onClear()`. El callback de `onSearch` también se llama con `""`.
- El input no es un listbox: los ítems del dropdown son `div` con `onClick`, sin `role="option"` ni navegación por teclado declarada.
- El estado de error reutiliza el tema de `ITInput` (`theme.input`): borde rojo y anillo de focus.
- `touched` propio: si no se pasa, el componente lleva estado interno (`localTouched`) que se activa en blur.

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `select.placeholder` | `Selecciona una opción` | `Select an option` | `search-select.tsx:254` |
| `select.noResults` | `No se encontraron resultados` | `No results found` | `search-select.tsx:318` |
| `common.loading` | `Cargando...` | `Loading...` | `search-select.tsx:318` |
| `common.clear` | `Limpiar` | `Clear` | `search-select.tsx:266`, `search-select.tsx:267` (aria-label y title del botón X) |
| `field.required` | `Este campo es requerido` | `This field is required` | `search-select.tsx:185`, `search-select.tsx:186`, `search-select.tsx:189` |

El placeholder y el texto de «sin resultados» usan las keys compartidas `select.placeholder` y
`select.noResults` (no existen `searchSelect.*`).
