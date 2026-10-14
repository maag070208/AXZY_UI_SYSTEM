# ITAvatar

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/avatar/` |
| Archivo | `avatar.tsx` |
| Props | `avatar.props.ts` |
| Import | `import { ITAvatar } from "@axzydev/axzy_ui_system"` |

Avatar circular que muestra una imagen, o iniciales como fallback, con un slot opcional para superponer un badge en la esquina inferior derecha.

## Import

```tsx
import { ITAvatar } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `src` | `string` | — | URL de la imagen. Cuando se pasa, renderiza un `<img>`. |
| `alt` | `string` | `""` | Texto alternativo de la imagen. También se usa para derivar la inicial del fallback cuando no hay `initials` ni `src`. |
| `initials` | `string` | — | Iniciales a mostrar cuando no hay imagen (se recomiendan máximo 2 caracteres). |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Dimensiones del avatar. |
| `color` | `string` | `"bg-primary-600"` | Color de fondo del fallback de iniciales. Acepta un valor de color real (`"#8b5cf6"`, `"rgb(...)"`, `"hsl(...)"`, `"var(--...)"`) que se aplica como `style` inline, o una clase Tailwind (`"bg-purple-600"`) por compatibilidad. |
| `className` | `string` | — | Clases CSS adicionales del contenedor. |
| `badge` | `ReactNode` | — | Nodo renderizado como badge superpuesto en la esquina inferior derecha. |
| `onClick` | `() => void` | — | Handler de click. Cuando se pasa, el avatar se vuelve interactivo (`role="button"`). |

Tipos exportados: `AvatarSize = "xs" | "sm" | "md" | "lg" | "xl"`.

## Ejemplo

```tsx
import { useState } from "react";
import { ITAvatar, ITStack, ITText } from "@axzydev/axzy_ui_system";

export function UserRow() {
  const [selected, setSelected] = useState(false);

  return (
    <ITStack direction="row" spacing={3} alignItems="center">
      <ITAvatar
        initials="JD"
        size="md"
        color={selected ? "#8b5cf6" : undefined}
        onClick={() => setSelected((prev) => !prev)}
        badge={<span className="w-2.5 h-2.5 block rounded-full bg-success-500" />}
      />
      <ITText as="span">John Doe</ITText>
    </ITStack>
  );
}
```

## Notas

- **Edges de tamaño** (`sizeMap`): `xs` → `w-6 h-6` / `text-[10px]`, `sm` → `w-8 h-8` / `text-xs`, `md` → `w-10 h-10` / `text-sm`, `lg` → `w-12 h-12` / `text-base`, `xl` → `w-16 h-16` / `text-xl`.
- **Fallback de iniciales**: el texto es `initials || alt.charAt(0).toUpperCase() || "?"`.
- **Si la imagen falla**: el `<img>` se oculta con `display: none` pero **no** se renderiza el fallback de iniciales; el contenedor queda vacío (con su color de fondo).
- **Colores**: la heurística `isRawColorValue` aplica el valor inline si empieza por `#`, `rgb`, `hsl` o `var(`; cualquier otra cosa se trata como clase Tailwind. Con el valor por defecto usa `var(--color-primary-600)` como fondo y una sombra inline.
- `color` vacío (`""`) también cae en el estilo por defecto (`useDefaultStyle = !color || color === DEFAULT_COLOR`).
- **Accesibilidad**: con `onClick` el contenedor expone `role="button"` y `tabIndex={0}`, pero **no** hay `onKeyDown`; el componente no responde a Enter/Space.
- El badge se posiciona con `absolute -bottom-0.5 -right-0.5`.

## Textos (i18n)

`ITAvatar` **no** usa keys de i18n: el carácter de fallback es el literal `"?"` (`avatar.tsx:86`), usado solo si no hay `initials` ni `alt`. No existe una key `avatar.*` en el catálogo.

El resto del texto visible entra por props (`initials`, `alt`, `badge`).
