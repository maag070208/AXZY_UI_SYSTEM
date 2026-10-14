# ITSkeleton

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/skeleton/` |
| Archivo | `skeleton.tsx` |
| Props | `skeleton.props.ts` |
| Import | `import { ITSkeleton } from "@axzydev/axzy_ui_system"` |

Placeholder de carga con animación de pulso para representar texto, círculos (avatar/icono) y rectángulos (tarjeta/imagen).

## Import

```tsx
import { ITSkeleton } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `variant` | `"text" \| "circular" \| "rectangular"` | `"text"` | Forma del skeleton. |
| `width` | `string \| number` | — | Ancho explícito (valor CSS o número en px). En `text` sin `width` se usa un ancho aleatorio de 60%–90%. |
| `height` | `string \| number` | — | Alto explícito (valor CSS o número en px). |
| `count` | `number` | `1` | Número de skeletons a renderizar. |
| `className` | `string` | — | Clases CSS adicionales de cada item. |
| `style` | `CSSProperties` | — | Estilos inline aplicados a cada item. |

Tipos exportados: `SkeletonVariant = "text" | "circular" | "rectangular"`.

## Ejemplo

```tsx
import { ITSkeleton, ITStack } from "@axzydev/axzy_ui_system";

export function CardSkeleton() {
  return (
    <ITStack spacing={3}>
      <ITSkeleton variant="circular" width={40} height={40} />
      <ITSkeleton variant="text" count={3} />
      <ITSkeleton variant="rectangular" width="100%" height={200} />
    </ITStack>
  );
}
```

## Notas

- Cada item se renderiza como un `<div>` con `animate-pulse bg-slate-200 dark:bg-slate-700`.
- **Variantes** (`variantClasses`): `text` → `rounded-md h-4 w-full`, `circular` → `rounded-full`, `rectangular` → `rounded-lg`.
- Con `variant="text"`, `count > 1` y salvo el último, cada item añade `mb-2`.
- En `text` sin `width`, cada item recibe un ancho aleatorio (`Math.random() * 30 + 60` %). Por ser aleatorio, el layout cambia entre renders.
- Los estilos se combinan en este orden: `width`/`height` calculados, luego el `style` prop, y finalmente el `width` de la variante `text` (que puede sobrescribir lo anterior).
- `count` genera items con `key={i}`; no se envuelven en un contenedor común (retorna un fragmento).
- No expone `role`/`aria` (`aria-busy` no está implementado).

## Textos (i18n)

Este componente no renderiza textos propios; no hay textos visibles ni atributos de texto.
