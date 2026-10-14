# ITStack

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/stack/` |
| Archivo | `stack.tsx` |
| Props | `stack.props.ts` |
| Import | `import { ITStack } from "@axzydev/axzy_ui_system"` |

Stack flexbox simplificado con espaciado consistente (`gap`) para ordenar hijos en fila o columna. Soporta un elemento divisor opcional entre hijos.

## Import

```tsx
import { ITStack } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Elementos hijos del stack. |
| `direction` | `StackDirection` (`"row" \| "column" \| "row-reverse" \| "column-reverse"`) | `"column"` | Dirección flex. |
| `spacing` | `number` | `0` | Separación entre hijos en unidades de 0.25rem. |
| `alignItems` | `StackAlignment` (`"start" \| "end" \| "center" \| "stretch" \| "baseline"`) | — | Alineación en el eje transversal. |
| `justifyContent` | `StackJustify` (`"start" \| "end" \| "center" \| "between" \| "around" \| "evenly"`) | — | Justificación en el eje principal. |
| `flexWrap` | `StackWrap` (`"nowrap" \| "wrap" \| "wrap-reverse"`) | — | Si los hijos hacen wrap. |
| `divider` | `ReactNode` | — | Elemento opcional insertado entre los hijos. |
| `className` | `string` | — | Clases CSS adicionales del contenedor. |
| `style` | `CSSProperties` | — | Estilos inline del contenedor (se aplican después de `gap`). |
| `as` | `ElementType` | `"div"` | Tipo de elemento HTML a renderizar. |

Tipos exportados: `StackDirection`, `StackAlignment`, `StackJustify`, `StackWrap`.

## Ejemplo

```tsx
import { ITButton, ITStack } from "@axzydev/axzy_ui_system";

export function Toolbar() {
  return (
    <ITStack
      direction="row"
      spacing={4}
      alignItems="center"
      justifyContent="between"
      divider={<div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />}
    >
      <ITButton label="Cancelar" variant="outlined" />
      <ITButton label="Guardar" color="primary" />
    </ITStack>
  );
}
```

## Notas

- **Espaciado**: el `gap` se calcula como `spacing * 0.25rem` (p. ej. `spacing={4}` → `1rem`) y solo se emite cuando `spacing > 0`.
- **Divider**: cuando se pasa `divider`, los hijos se recorren con `Children.toArray` y el divider (clonado con `key`) se inserta entre cada par, nunca al final. Solo se clona si es un elemento React válido (`isValidElement`).
- `style` recibido se aplica después del `gap` calculado, por lo que puede sobrescribirlo.
- Mapeos: `direction` → `flex-row` / `flex-col` / `flex-row-reverse` / `flex-col-reverse`; `alignItems` → `items-*`; `justifyContent` → `justify-*`; `flexWrap` → `flex-nowrap` / `flex-wrap` / `flex-wrap-reverse`.
- No reenvía atributos HTML arbitrarios (solo `className`, `style`).
- Diferencia con `ITFlex`: `ITStack` se centra en `spacing` + `divider`; `ITFlex` expone además `grow`/`shrink`/`basis`/`onClick`.

## Textos (i18n)

Este componente no renderiza textos propios; todo el contenido entra por `children` y `divider`.
