# ITFlex

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/flex/` |
| Archivo | `flex.tsx` |
| Props | `flex.props.ts` |
| Import | `import { ITFlex } from "@axzydev/axzy_ui_system"` |

Contenedor flexbox completo con control de dirección, alineación, distribución, wrap y propiedades flex (`grow` / `shrink` / `basis`). Para layouts que necesitan más control que `ITStack`.

## Import

```tsx
import { ITFlex } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Elementos hijos del contenedor. |
| `direction` | `"row" \| "column" \| "row-reverse" \| "column-reverse"` | `"row"` | Dirección del eje principal. |
| `align` | `"start" \| "end" \| "center" \| "stretch" \| "baseline"` | — | Alineación en el eje transversal. |
| `justify` | `"start" \| "end" \| "center" \| "between" \| "around" \| "evenly"` | — | Justificación en el eje principal. |
| `wrap` | `"nowrap" \| "wrap" \| "wrap-reverse"` | — | Comportamiento de wrap. |
| `gap` | `number` | `0` | Separación entre hijos en unidades de 0.25rem. |
| `grow` | `boolean \| number` | — | Factor `flex-grow`. `true` = 1, `false` = 0, número = valor exacto. |
| `shrink` | `boolean \| number` | — | Factor `flex-shrink`. `true` = 1, `false` = 0, número = valor exacto. |
| `basis` | `string \| number` | — | `flex-basis`. Los números se multiplican por 0.25rem; los strings se usan tal cual. |
| `className` | `string` | — | Clases CSS adicionales. |
| `style` | `CSSProperties` | — | Estilos inline (se aplican después de `gap`/`grow`/`shrink`/`basis`, por lo que pueden sobrescribirlos). |
| `as` | `ElementType` | `"div"` | Tipo de elemento HTML a renderizar. |
| `onClick` | `(e: React.MouseEvent) => void` | — | Handler de click. |

Tipos exportados: `FlexDirection`, `FlexAlign`, `FlexJustify`, `FlexWrap`.

## Ejemplo

```tsx
import { ITFlex, ITButton } from "@axzydev/axzy_ui_system";

export function Toolbar() {
  return (
    <ITFlex direction="row" justify="between" align="center" gap={3}>
      <ITFlex direction="column" gap={0}>
        <p className="font-semibold">Documento.pdf</p>
        <p className="text-xs text-slate-500">Editado hace 2 min</p>
      </ITFlex>
      <ITFlex direction="row" gap={2}>
        <ITFlex grow basis={56} direction="column">
          Contenido flexible
        </ITFlex>
        <span>Fijo</ITFlex>
      </ITFlex>
    </ITFlex>
  );
}
```

## Notas

- `gap` solo se aplica cuando es `> 0`: `gap={4}` → `gap: 1rem` (inline). Con `0` no se emite gap.
- `grow`/`shrink` booleanos se traducen a `1`/`0`; los valores numéricos se pasan tal cual.
- `basis` numérico se convierte a rem (`basis={56}` → `14rem`); un string se usa sin transformar.
- `style` recibido se aplica **después** de los estilos calculados, por lo que gana en caso de conflicto.
- Mapeos: `align` → `items-*`, `justify` → `justify-*`, `wrap` → `flex-nowrap` / `flex-wrap` / `flex-wrap-reverse`.
- No reenvía atributos HTML arbitrarios (solo `className`, `style`, `onClick`).

## Textos (i18n)

Este componente no renderiza textos propios; todo el contenido entra por `children`.
