# ITMultiSelect

|  |  |
| --- | --- |
| Capa | `molecules` |
| Directorio | `src/components/molecules/multi-select/` |
| Archivo | `multi-select.tsx` |
| Props | `multi-select.props.ts` |
| Import | `import { ITMultiSelect } from "@axzydev/axzy_ui_system"` |

Selector de múltiples valores con dropdown buscable, chips removibles y navegación por teclado.
Soporta filtrado local y búsqueda remota (`onSearch`), resumen colapsado de chips
(`maxVisibleChips`) y plantilla de opción personalizada (`renderOption`). El dropdown va en un
portal, por lo que nunca queda recortado por ancestros con `overflow`.

## Import

```tsx
import { ITMultiSelect } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `name` | `string` | `—` | Atributo `name` para integración con formularios. |
| `label` | `string` | `—` | Etiqueta sobre el control. |
| `placeholder` | `string` | `"Selecciona opciones"` | Texto mostrado cuando no hay valores seleccionados. |
| `options` | `ITMultiSelectOption[]` | `—` | Opciones disponibles. |
| `value` | `(string \| number)[]` | `—` | Valores seleccionados (controlado). |
| `onChange` | `(values: (string \| number)[], options: ITMultiSelectOption[]) => void` | `—` | Devuelve los siguientes valores y sus objetos de opción. |
| `onBlur` | `(e: React.FocusEvent<HTMLInputElement>) => void` | `—` | Se llama cuando el control pierde el foco. |
| `valueField` | `string` | `"value"` | Campo usado como valor de la opción. |
| `labelField` | `string` | `"label"` | Campo usado como etiqueta visible de la opción. |
| `disabled` | `boolean` | `false` | Deshabilita el control. |
| `readOnly` | `boolean` | `false` | Solo lectura: muestra los chips, sin edición. |
| `required` | `boolean` | `false` | Marca el campo como requerido (asterisco rojo). |
| `touched` | `boolean` | `—` | Indica si el campo fue interactuado (validación). |
| `error` | `string \| boolean` | `—` | Mensaje de error o `true` para estado de error. |
| `size` | `SizesTypes` | `"md"` | Tamaño del control: `"sm"` \| `"md"` \| `"lg"`. |
| `maxVisibleChips` | `number` | `3` | Máximo de chips visibles antes de colapsar en `+N`. |
| `clearable` | `boolean` | `true` | Muestra el botón de limpiar todo (X). |
| `searchable` | `boolean` | `true` | Habilita el input de búsqueda. |
| `onSearch` | `(query: string) => void` | `—` | Búsqueda remota; se llama con *debounce* de 500 ms. |
| `isLoading` | `boolean` | `false` | Muestra spinner y el estado de carga en el dropdown. |
| `noResultsMessage` | `string` | `"No se encontraron resultados"` | Mensaje cuando no hay resultados. |
| `renderOption` | `(option: ITMultiSelectOption, state: { isSelected: boolean; searchTerm: string }) => ReactNode` | `—` | Plantilla personalizada de cada opción. |
| `className` | `string` | `—` | Clases extra del contenedor. |

### `ITMultiSelectOption`

```typescript
export interface ITMultiSelectOption {
  label: string;
  value: string | number;
  [key: string]: any; // campos custom
}
```

## Ejemplo

```tsx
import { useState } from "react";
import { ITMultiSelect } from "@axzydev/axzy_ui_system";

export default function SkillsPicker() {
  const [selected, setSelected] = useState<(string | number)[]>(["mx", "es"]);

  const options = [
    { value: "mx", label: "México" },
    { value: "es", label: "España" },
    { value: "co", label: "Colombia" },
  ];

  return (
    <ITMultiSelect
      label="Países"
      options={options}
      value={selected}
      onChange={(values) => setSelected(values)}
      maxVisibleChips={3}
      renderOption={(option, { isSelected }) => (
        <span className={isSelected ? "font-bold" : ""}>{option.label}</span>
      )}
    />
  );
}
```

## Notas

- Teclado: `ArrowUp`/`ArrowDown` navegan, `Enter` alterna, `Backspace` con input vacío quita el último chip y `Escape` cierra.
- Accesibilidad: el control usa `role="combobox"` + `aria-expanded` + `aria-haspopup="listbox"`; el panel es `role="listbox"` con `aria-multiselectable="true"`; cada opción es `role="option"` con `aria-selected`.
- El dropdown se renderiza en un portal (`document.body`), así que no se recorta dentro de un `ITCard` ni de contenedores con `overflow-hidden`.
- Si se pasa `onSearch`, el filtrado local se delega al padre (las `options` se muestran tal cual) y el callback se llama con 500 ms de *debounce*.
- Con búsqueda vacía y valores seleccionados, `Backspace` elimina el último chip (mismo contrato que los chips removibles).
- El estado `touched` es local si no se controla; al mostrar error sin `error` se usa el mensaje por defecto de campo requerido.
- El dropdown se posiciona con el hook interno `useFloatingPanel` (`matchWidth: true`).

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `multiSelect.placeholder` | `Selecciona opciones` | `Select options` | `multi-select.tsx:289` |
| `select.noResults` | `No se encontraron resultados` | `No results found` | `multi-select.tsx:375` |
| `common.loading` | `Cargando...` | `Loading...` | `multi-select.tsx:375` |
| `common.clearSelection` | `Limpiar selección` | `Clear selection` | `multi-select.tsx:303`, `multi-select.tsx:304` (aria-label + title del botón X) |
| `field.required` | `Este campo es requerido` | `This field is required` | `multi-select.tsx:115`, `multi-select.tsx:118`, `multi-select.tsx:121` |

El texto de «sin resultados» reutiliza la key compartida `select.noResults` (no existe
`multiSelect.noResults`).
