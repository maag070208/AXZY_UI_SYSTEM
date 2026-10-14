# ITWysiwyg

|  |  |
| --- | --- |
| Capa | `molecules` |
| Directorio | `src/components/molecules/wysiwyg/` |
| Archivo | `wysiwyg.tsx` |
| Props | `wysiwyg.props.ts` |
| Import | `import { ITWysiwyg } from "@axzydev/axzy_ui_system"` |

Editor WYSIWYG ligero (sin dependencias externas de rich-text) con negrita, itálica, subrayado,
resaltador amarillo y listas ordenadas/desordenadas. Aplica el formato manualmente sobre la
Selection/Range API (sin `document.execCommand`), envolviendo o desenvolviendo nodos de texto.

## Import

```tsx
import { ITWysiwyg } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `value` | `string` | `—` | HTML controlado del editor. Solo se refleja en el contenido visible mientras el editor **no** tiene foco (evita saltos del cursor). |
| `onChange` | `(html: string) => void` | `—` | Se llama con el HTML del editor cada vez que cambia el contenido. |
| `label` | `string` | `—` | Texto de la etiqueta sobre el editor. |
| `placeholder` | `string` | `—` | Texto de placeholder mostrado cuando el editor está vacío. |
| `error` | `string` | `—` | Mensaje de error mostrado debajo del editor. |
| `disabled` | `boolean` | `false` | Deshabilita el editor y la barra de herramientas. |
| `readOnly` | `boolean` | `false` | Renderiza el contenido en modo solo lectura (no editable, toolbar deshabilitada). |
| `name` | `string` | `—` | Atributo `name` para el envío de formularios y la asociación del label vía `htmlFor`. |
| `size` | `SizesTypes` | `"md"` | Tamaño del editor: controla el padding y el tamaño de fuente: `"sm"`, `"md"`, `"lg"`. |
| `minHeight` | `number` | `128` | Altura mínima (px) del área editable. |
| `highlightColor` | `string` | `"#fde68a"` | Color de fondo usado por el resaltador (marcador amarillo). |
| `toolbar` | `ToolbarAction[]` | todas las acciones | Subconjunto de acciones de la toolbar a renderizar. |
| `className` | `string` | `—` | Clases CSS adicionales para el contenedor. |

### `ToolbarAction`

```typescript
export type ToolbarAction =
  | "bold"
  | "italic"
  | "underline"
  | "highlight"
  | "ul"
  | "ol"
  | "clear";
```

Valor por defecto de `toolbar` (constante `toolbarActions`, todas las acciones en este orden):
`["bold", "italic", "underline", "highlight", "ul", "ol", "clear"]`.

## Ejemplo

```tsx
import { useState } from "react";
import { ITWysiwyg } from "@axzydev/axzy_ui_system";

export default function DescripcionField() {
  const [html, setHtml] = useState("");

  return (
    <ITWysiwyg
      name="descripcion"
      label="Descripción"
      placeholder="Escribe aquí..."
      value={html}
      onChange={setHtml}
      highlightColor="#fde68a"
      size="md"
      minHeight={128}
    />
  );
}
```

Variante con toolbar reducida:

```tsx
<ITWysiwyg size="lg" highlightColor="#fef08a" toolbar={["bold", "ul"]} />
```

## Notas

- El componente es **no controlado**: `value` solo se escribe en el editor mientras `focusedRef` es falso, para no interrumpir el caret. Los cambios se emiten al padre vía `onChange` en `input` y en `blur`.
- El área editable es un `div` con `contentEditable`, `role="textbox"` y `aria-multiline="true"`; `id={name}` permite asociar el `label` por `htmlFor`.
- `disabled` y `readOnly` se combinan en `isLocked`: con cualquiera de los dos, `contentEditable` es `false` y los botones de la toolbar quedan deshabilitados.
- El resaltado inserta `<mark>` con `backgroundColor: highlightColor`. La detección de formato activo usa las etiquetas `STRONG`/`B`, `EM`/`I`, `U` y `MARK`, más `UL`/`OL` para las listas.
- Al pegar, se toma `text/plain` del portapapeles, por lo que el HTML pegado no se conserva.
- Los botones de la toolbar usan `type="button"`, `tabIndex={-1}`, `title`/`aria-label` con la etiqueta de la acción y `aria-pressed` con el estado activo; cada acción va envuelta en un `ITTooltip` con el mismo texto.
- El placeholder se implementa con el atributo `data-placeholder` y la utilidad `empty:before:content-[attr(data-placeholder)]`; no es un `placeholder` nativo.
- El tamaño (`size`) se resuelve vía `inputSizeTokens` (padding y font-size); un valor desconocido cae al preset `md`.
- Se apoya en `ITText` (label) e `ITTooltip` (tooltips de la toolbar).

## Textos (i18n)

Las etiquetas de la barra se resuelven con `ACTION_LABEL_KEYS` (`wysiwyg.tsx:29-35`) y se traducen
al construir cada botón (`wysiwyg.tsx:530`).

| Key | es | en |
| --- | --- | --- |
| `wysiwyg.bold` | `Negrita` | `Bold` |
| `wysiwyg.italic` | `Itálica` | `Italic` |
| `wysiwyg.underline` | `Subrayado` | `Underline` |
| `wysiwyg.highlight` | `Marcador` | `Highlight` |
| `wysiwyg.bulletList` | `Lista con viñetas` | `Bulleted list` |
| `wysiwyg.numberedList` | `Lista numerada` | `Numbered list` |
| `wysiwyg.clearFormat` | `Limpiar formato` | `Clear formatting` |
