# ITFormHeader

|  |  |
| --- | --- |
| Capa | `molecules` |
| Carpeta | `src/components/molecules/form-header/` |
| Archivo | `form-header.tsx` |
| Props | `form-header.props.ts` |
| Import | `import { ITFormHeader } from "@axzydev/axzy_ui_system"` |

Barra de cabecera coloreada para modales y formularios, con un botón de cierre opcional. Usa el color primario del tema como fondo y calcula automáticamente un color de texto con contraste suficiente para la legibilidad.

## Import

```tsx
import { ITFormHeader } from "@axzydev/axzy_ui_system";
```

## Props

### `ITFormHeaderProps`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `title` | `string` | — | Texto del título de la cabecera. |
| `onClose` | `() => void` | — | Handler del botón de cierre. Si se omite, no se renderiza botón. |
| `className` | `string` | `""` | Clases CSS adicionales. |

## Ejemplo

```tsx
import { ITFormHeader } from "@axzydev/axzy_ui_system";

export default function FormTitle() {
  return <ITFormHeader title="Crear usuario" onClose={() => console.log("close")} />;
}
```

## Notas

- Fondo `bg-primary-500`. El color del texto se calcula con `getContrastTextColor(palette.primary || "#06b6d4", palette, isDarkMode)` a través de `useITThemeSafe()`; fuera del `ITThemeProvider` cae al hex `#06b6d4`.
- El título se renderiza centrado (`ITText as="h2"`, `text-lg font-semibold`, `text-center`); el botón de cierre es absoluto a la derecha (`right-4`).
- El botón de cierre solo existe cuando se pasa `onClose`.
- El contenedor aplica `px-6 py-4 rounded-t-lg` por defecto; `className` puede sobrescribirlo (por ejemplo `rounded-none`).
- Forma parte del ecosistema de `ITDialog`, que lo usa como cabecera cuando se combina `title` + variante de cabecera.

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `common.close` | `Cerrar` | `Close` | `form-header.tsx:43` (`aria-label` del botón) |

El `title` entra por props.
