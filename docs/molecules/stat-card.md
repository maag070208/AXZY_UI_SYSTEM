# ITStatCard

|  |  |
| --- | --- |
| Capa | `molecules` |
| Directorio | `src/components/molecules/stat-card/` |
| Archivo | `stat-card.tsx` |
| Props | `stat-card.props.ts` |
| Import | `import { ITStatCard } from "@axzydev/axzy_ui_system"` |

Tarjeta de métrica que muestra un valor principal con una etiqueta arriba, un icono opcional en
la esquina superior derecha y un indicador de tendencia (badge) coloreado según su dirección.
Cuando se pasa `onClick` la tarjeta adquiere semántica de botón.

## Import

```tsx
import { ITStatCard } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `label` | `string` | `—` | Etiqueta de la métrica, mostrada sobre el valor. |
| `value` | `string \| number` | `—` | Valor principal (numérico o texto) mostrado en la tarjeta. |
| `trend` | `string` | `—` | Texto indicador de tendencia (p. ej. `"+12%"`, `"-3"`). Si se omite, no se renderiza el badge. |
| `trendDirection` | `"up" \| "down" \| "neutral"` | `trend?.startsWith("-") ? "down" : "neutral"` | Dirección de la tendencia; controla el color del badge. Por defecto se infiere del prefijo `-` de `trend`. |
| `icon` | `ReactNode` | `—` | Elemento icono renderizado junto a la etiqueta, en la esquina superior derecha. |
| `color` | `string` | `"bg-primary-50 dark:bg-primary-950/20"` | Clase de fondo de la tarjeta (admite clases con variante `dark:`). |
| `className` | `string` | `—` | Clases CSS adicionales para el contenedor más externo. |
| `style` | `CSSProperties` | `—` | Estilos inline aplicados al contenedor de la tarjeta. |
| `onClick` | `() => void` | `—` | Manejador de clic; al proporcionarlo la tarjeta gana semántica de botón (`role="button"`, `tabIndex=0`). |

## Ejemplo

```tsx
import { ITStatCard } from "@axzydev/axzy_ui_system";
import { FaUsers, FaDollarSign } from "react-icons/fa";

export default function Metricas() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ITStatCard
        label="Ingresos"
        value="$12,430"
        trend="+12%"
        trendDirection="up"
        icon={<FaDollarSign />}
      />
      <ITStatCard
        label="Usuarios"
        value={1042}
        trend="-3%"
        icon={<FaUsers />}
        onClick={() => console.log("ver usuarios")}
      />
    </div>
  );
}
```

## Notas

- `trendDirection` se infiere de `trend` en el propio valor por defecto: si `trend` empieza con `-` es `"down"`, en cualquier otro caso `"neutral"`. Para mostrar un alza hay que pasar `trendDirection="up"` explícitamente.
- Los colores del badge están fijos por dirección: `up` = esmeralda, `down` = rosa, `neutral` = gris (`trendColors` en `stat-card.tsx`), con variantes `dark:`.
- El badge de tendencia solo se renderiza cuando `trend` tiene valor.
- Con `onClick` se aplican `role="button"` y `tabIndex={0}`, pero el componente **no** maneja `onKeyDown`: la activación por teclado (Enter/Espacio) no está implementada.
- Se apoya en el átomo `ITText` para los tres textos (etiqueta, valor y badge).
- `className` se fusiona con `clsx` después de `color`, por lo que puede sobreescribir el fondo (sujeto al orden de utilidades de Tailwind).
- No define `aria-*` adicionales fuera de `role`/`tabIndex`; `style` se aplica al `<div>` contenedor.

## Textos (i18n)

No renderiza textos propios; todos los textos visibles llegan por props (`label`, `value`, `trend`).
