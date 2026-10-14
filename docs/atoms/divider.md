# ITDivider

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/divider/` |
| Archivo | `divider.tsx` |
| Props | `divider.props.ts` |
| Import | `import { ITDivider } from "@axzydev/axzy_ui_system"` |

Separador horizontal o vertical. Renderiza una línea fina de ancho completo (horizontal) o de alto completo del contenedor (vertical) con clases Tailwind, con color y grosor configurables.

## Import

```tsx
import { ITDivider } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Dirección del divisor. |
| `className` | `string` | — | Clases CSS adicionales del divisor. |
| `color` | `string` | `"bg-slate-200 dark:bg-slate-700"` | Clase(s) Tailwind de color de fondo. |
| `thickness` | `string` | `"h-px"` (horizontal) / `"w-px"` (vertical) | Utilidad Tailwind de ancho/alto (p. ej. `"h-px"`, `"h-1"`, `"w-px"`). Si se omite, se calcula según `orientation`. |

Tipos exportados: `DividerOrientation = "horizontal" | "vertical"`.

## Ejemplo

```tsx
import { ITDivider, ITFlex, ITStack } from "@axzydev/axzy_ui_system";

export function Sections() {
  return (
    <ITStack spacing={4}>
      <p>Sección A</p>
      <ITDivider />
      <p>Sección B</p>
      <ITDivider color="bg-danger-500" thickness="h-1" />
      <ITFlex gap={3} className="h-8 items-center">
        <span>Izquierda</span>
        <ITDivider orientation="vertical" />
        <span>Derecha</span>
      </ITFlex>
    </ITStack>
  );
}
```

## Notas

- Es un `<div>` (`flex-shrink-0`) sin atributos ARIA ni `role="separator"`.
- En horizontal aplica `w-full`; en vertical aplica `self-stretch`, así que depende de que el contenedor padre tenga altura definida (p. ej. un `ITFlex` con `items-center` y altura fija).
- El valor por defecto de `thickness` es dinámico: `orientation === "horizontal" ? "h-px" : "w-px"`.

## Textos (i18n)

Este componente no renderiza textos propios; es puramente visual.
