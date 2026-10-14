# ITGrid

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/grid/` |
| Archivo | `grid.tsx` |
| Props | `grid.props.ts` |
| Import | `import { ITGrid } from "@axzydev/axzy_ui_system"` |

Sistema de grid CSS responsivo de 12 columnas (patrón container/item). Como `container` renderiza el padre con `display:grid`; como `item` renderiza un hijo con `col-span`, con spans por breakpoint.

## Import

```tsx
import { ITGrid } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Elementos hijos. |
| `container` | `boolean` | — | Renderiza como contenedor grid (`display:grid`). |
| `item` | `boolean` | — | Renderiza como item del grid (col-span). Si no se pasa ninguno de los dos, renderiza un `<div>` simple. |
| `spacing` | `number` | `0` | Gap entre hijos en unidades de 0.25rem. Solo aplica con `container`. |
| `columns` | `number` | `12` | Número de columnas (1–12). Solo aplica con `container`; también se usa para limitar los spans. |
| `xs` | `number` | — | Span de columnas en el breakpoint base (mobile). Si no se define, se usa `sm`. |
| `sm` | `number` | — | Span de columnas en el breakpoint `sm`. |
| `md` | `number` | — | Span de columnas en el breakpoint `md`. |
| `lg` | `number` | — | Span de columnas en el breakpoint `lg`. |
| `xl` | `number` | — | Span de columnas en el breakpoint `xl`. |
| `className` | `string` | — | Clases CSS adicionales. |
| `style` | `CSSProperties` | — | Estilos inline. |
| `as` | `ElementType` | `"div"` | Tipo de elemento HTML a renderizar. |

## Ejemplo

```tsx
import { ITGrid } from "@axzydev/axzy_ui_system";

export function Dashboard() {
  return (
    <ITGrid container columns={12} spacing={4}>
      <ITGrid item xs={12} md={6}>
        Sidebar
      </ITGrid>
      <ITGrid item xs={12} md={6}>
        Contenido
      </ITGrid>
    </ITGrid>
  );
}
```

## Notas

- **Container**: aplica `grid` + `grid-cols-{columns}`; `columns` se acota a 1–12. El `spacing` se emite como `gap` inline (`spacing * 0.25rem`) solo cuando `spacing > 0`.
- **Item**: el span base es `xs ?? sm` y, si ninguno está definido, cae en `col-span-full`. Los breakpoints `sm`/`md`/`lg`/`xl` solo se aplican si están definidos.
- Los spans se redondean y se acotan entre 1 y `columns` (`Math.min(Math.max(Math.round(span), 1), cols)`).
- Si no se pasa `container` ni `item`, renderiza un elemento plano con `className` y `style`.
- **Gotcha de Tailwind v4**: las clases `grid-cols-{n}` y `col-span-{n}` se construyen en runtime, por lo que deben estar en el `@source inline(...)` safelist de `src/index.css` para existir en el CSS compilado.
- **Gotcha de orden**: `col-span-full` se emite después de `col-span-N`, así que un item no debe llevar a la vez `col-span-full` y un span base.
- No reenvía atributos HTML arbitrarios (solo `className`, `style`).

## Textos (i18n)

Este componente no renderiza textos propios; todo el contenido entra por `children`.
