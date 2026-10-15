# ITSlideToggle

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/slide/` |
| Archivo | `slide.tsx` |
| Props | `slide.props.ts` |
| Import | `import { ITSlideToggle } from "@axzydev/axzy_ui_system"` |

Interruptor estilo iOS con soporte de colores del tema. Funciona en modo controlado (`isOn`) o no controlado (`initialState`).

Renderiza `role="switch"`: **dale un nombre accesible** con `label` (o `ariaLabel` si la etiqueta visible está fuera) para que un lector de pantalla anuncie qué se está activando.

## Import

```tsx
import { ITSlideToggle } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `onToggle` | `(value: boolean) => void` | — | Callback ejecutado al cambiar el estado; recibe el nuevo booleano. |
| `isOn` | `boolean` | — | Estado controlado. Si se pasa, el componente opera en modo controlado. |
| `initialState` | `boolean` | `false` | Estado inicial para uso no controlado. |
| `activeColor` | `string` | `"success"` | Color cuando está activo: clave semántica del tema o valor hex. |
| `inactiveColor` | `string` | `"#9ca3af"` | Color cuando está inactivo: clave semántica del tema o valor hex. |
| `disabled` | `boolean` | `false` | Deshabilita el switch. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Tamaño del switch. |
| `label` | `string` | — | Texto visible del interruptor; se usa como nombre accesible (`aria-label`) cuando no hay un `<label>` externo. |
| `ariaLabel` | `string` | — | Nombre accesible cuando la etiqueta visible vive fuera del componente. Tiene prioridad sobre `label`. |
| `className` | `string` | `""` | Clases CSS adicionales del contenedor. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITFlex, ITSlideToggle, ITText } from "@axzydev/axzy_ui_system";

export function SettingsRow() {
  const [enabled, setEnabled] = useState(true);

  return (
    <ITFlex justify="between" align="center">
      <ITText as="span">Habilitar notificaciones</ITText>
      <ITSlideToggle isOn={enabled} onToggle={setEnabled} activeColor="primary" size="md" />
    </ITFlex>
  );
}
```

## Notas

- **Modos**: si `isOn` es `undefined` usa estado interno inicializado con `initialState`; si se pasa `isOn`, el valor controlado manda y se sincroniza mediante `useEffect`.
- **Colores**: `activeColor`/`inactiveColor` se resuelven contra `theme.colors` (tono `500` para activo, tono `400` para inactivo); si no son claves del tema, se usan como valor CSS.
- **Tamaños**: `sm` → `w-10 h-5` (knob `w-3.5 h-3.5`, `translate-x-5`), `md` → `w-14 h-7` (knob `w-5 h-5`, `translate-x-7`), `lg` → `w-16 h-8` (knob `w-6 h-6`, `translate-x-8`).
- **Accesibilidad**: expone `role="switch"` y `aria-checked`; `tabIndex` es `0` o `-1` si está deshabilitado, y responde a Enter/Space con `onKeyDown`.
- `disabled` aplica `opacity-50 cursor-not-allowed` y el `toggleSwitch` hace early-return.
- **No existe prop `label`**: el texto debe ir fuera (por ejemplo en un `ITFlex`/`ITText`). La documentación canónica lo menciona, pero el código real no lo implementa ni `checked`/`defaultChecked`/`onChange`.

## Textos (i18n)

Este componente no renderiza textos propios; es puramente visual (no hay label ni `aria-label` interno).
