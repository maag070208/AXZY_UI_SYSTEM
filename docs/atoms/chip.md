# ITChip

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/chip/` |
| Archivo | `chip.tsx` |
| Props | `chip.props.ts` |
| Import | `import { ITChip } from "@axzydev/axzy_ui_system"` |

Etiqueta / pill compacta para labels, filtros activos y selecciones multivalor. Soporta variantes `soft`, `filled` y `outlined`, icono inicial, botón de quitar (X) y estado seleccionado.

## Import

```tsx
import { ITChip } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `label` | `string` | — | Texto mostrado dentro del chip. Se ignora si se pasa `children`. |
| `children` | `ReactNode` | — | Contenido personalizado. Tiene prioridad sobre `label`. |
| `color` | `ColorsTypes` (`"primary" \| "secondary" \| "success" \| "danger" \| "warning" \| "info" \| "purple" \| "error" \| "gray"`) | `"secondary"` | Clave de color semántica de la paleta. |
| `size` | `SizesTypes` (`"sm" \| "md" \| "lg"`) | `"md"` | Tamaño del chip. |
| `variant` | `keyof typeof chipVariants` (`"soft" \| "filled" \| "outlined"`) | `"soft"` | Estilo visual. |
| `icon` | `ReactNode` | — | Icono renderizado antes del label. |
| `removable` | `boolean` | `false` | Muestra un botón de quitar (X) al final. |
| `onRemove` | `() => void` | — | Callback al pulsar el botón de quitar. |
| `onClick` | `() => void` | — | Hace el chip clicable (uso como filtro/toggle). |
| `selected` | `boolean` | `false` | Resalta el chip como seleccionado usando el color indicado. |
| `disabled` | `boolean` | `false` | Deshabilita las interacciones y reduce la opacidad. |
| `className` | `string` | — | Clases CSS adicionales del chip. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITChip, ITStack } from "@axzydev/axzy_ui_system";

export function FilterChips() {
  const [active, setActive] = useState<string[]>(["mx"]);

  const toggle = (id: string) =>
    setActive((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <ITStack direction="row" spacing={2} flexWrap="wrap">
      {[
        { id: "mx", label: "México" },
        { id: "es", label: "España" },
      ].map((c) => (
        <ITChip
          key={c.id}
          label={c.label}
          color="primary"
          selected={active.includes(c.id)}
          onClick={() => toggle(c.id)}
        />
      ))}
      <ITChip label="Quitar" color="danger" variant="outlined" removable onRemove={() => {}} />
    </ITStack>
  );
}
```

## Notas

- Los colores se leen de `theme.colors[color]` (fallback a `theme.colors.secondary`); se aplican como `style` inline, no como clases. `soft` usa los tonos `100`/`700`/`200`, `filled` los `500`, y `outlined` texto/borde en `700`/`400`.
- `selected` sobrescribe el color de la variante con `500` (fondo, texto blanco y borde).
- Con `onClick` y sin `disabled`, el chip expone `role="button"`, `tabIndex={0}` y `aria-pressed={selected}`; además responde a Enter y Space con `onKeyDown`.
- `disabled` aplica `aria-disabled`, `opacity-50 cursor-not-allowed` y deshabilita el botón de quitar.
- El botón de quitar es un `<button type="button">` anidado que hace `stopPropagation` antes de llamar a `onRemove`.
- Si se pasa `children`, no se renderiza el `label`.
- Tamaños (`chipSizes` en `@/types/chip.types`): `sm` → `text-[11px] px-2 py-0.5 gap-1`, `md` → `text-xs px-2.5 py-1 gap-1.5`, `lg` → `text-sm px-3 py-1.5 gap-2`.

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `chip.remove` | `Quitar {label}` | `Remove {label}` | `chip.tsx:101` (`aria-label` del botón X) |

Key implementada en `src/i18n/locales/es.ts`/`en.ts`, resuelta con `useITTranslation()`. Sin
`label`, el placeholder `{label}` queda vacío (`t("chip.remove", { label: "" }).trim()`).
