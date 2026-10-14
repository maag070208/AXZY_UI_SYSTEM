# ITLoader

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/loader/` |
| Archivo | `loader.tsx` |
| Props | `loader.props.ts` |
| Import | `import { ITLoader } from "@axzydev/axzy_ui_system"` |

Indicador de carga con cuatro animaciones: `spinner`, `dots`, `pulse` y `bar`. Soporta tamaño configurable y color semántico del tema o personalizado.

## Import

```tsx
import { ITLoader } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `size` | `LoaderSize` (`"sm" \| "md" \| "lg" \| "xl"`) | `"md"` | Tamaño del loader. |
| `variant` | `LoaderVariant` (`"spinner" \| "dots" \| "bar" \| "pulse"`) | `"spinner"` | Tipo de animación. |
| `color` | `string` | `"primary"` | Color: clave semántica del tema (`theme.colors`), valor CSS (`"#06b6d4"`, `"rgb(...)"`) o clase CSS (compatibilidad). |
| `className` | `string` | `""` | Clases CSS adicionales. |

> El tipo de las props se declara como `LoaderProps` en `loader.props.ts` y se re-exporta como `ITLoaderProps` desde el paquete.

## Ejemplo

```tsx
import { ITLoader, ITStack } from "@axzydev/axzy_ui_system";

export function LoadingStates() {
  return (
    <ITStack direction="row" spacing={4} alignItems="center">
      <ITLoader variant="spinner" size="lg" color="primary" />
      <ITLoader variant="dots" size="md" color="#06b6d4" />
      <ITLoader variant="pulse" size="xl" color="success" />
      <ITLoader variant="bar" size="sm" color="secondary" className="w-48" />
    </ITStack>
  );
}
```

## Notas

- **Resolución de color**: si `color` existe en `theme.colors` se usa el tono `500` del tema; si empieza por `#` o `rgb` se usa como valor CSS; en cualquier otro caso se inyecta como clase (legacy).
- **`spinner`**: div con `animate-spin`, `border-2 border-current border-r-transparent` y `role="status"`; incluye un texto `Loading...` visualmente oculto.
- **`dots`**: tres puntos con `animate-bounce` y `animationDelay` incremental (`i * 0.1s`). El tamaño se deriva quitando la primera `l`/`g` a `size`, por lo que solo `sm` y `md` coinciden con las clases definidas en `sizeClasses`.
- **`bar`**: track `bg-secondary-200` con altura según `size` (`sm` → `h-1`, `md` → `h-1.5`, `lg` → `h-2`, `xl` → `h-2.5`) y relleno con gradiente a partir del color resuelto (`animation: progress 1.5s ease-in-out infinite`).
- **`pulse`**: círculo `rounded-full animate-pulse` con el color aplicado como `backgroundColor`.
- Tamaños base (`sizeClasses` en `@/types/loader.types`): `sm` → `h-4 w-4`, `md` → `h-8 w-8`, `lg` → `h-12 w-12`, `xl` → `h-16 w-16`.
- Un `variant` desconocido no renderiza nada (`return null`).
- La documentación canónica (`DOCUMENTACION_DETALLADA_COMPONENTES.txt`) lista `xs` y solo tres variantes; el código real no tiene `xs` y sí tiene `pulse`.

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `common.loading` | Cargando... | Loading... | `loader.tsx` — texto oculto del spinner (`role="status"`), solo para lectores de pantalla |

No hay keys propias de `loader.*`.
