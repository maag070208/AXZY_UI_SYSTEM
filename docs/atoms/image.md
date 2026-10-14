# ITImage

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/image/` |
| Archivo | `image.tsx` |
| Props | `image.props.ts` |
| Import | `import { ITImage } from "@axzydev/axzy_ui_system"` |

Imagen con fallback automático ante error de carga. Muestra el `src` principal y, si falla, cambia a la imagen `fallback`.

## Import

```tsx
import { ITImage } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `src` | `string` | — (requerido) | URL de la imagen principal. |
| `alt` | `string` | — | Texto alternativo de accesibilidad. |
| `className` | `string` | `""` | Clases CSS adicionales del contenedor. |
| `fallback` | `string` | `""` | URL de la imagen de respaldo cuando falla el `src`. |
| `onClick` | `()` | — | Declarada en las props, pero **no se usa** en la implementación actual (no se pasa al `<img>` ni al contenedor). |

## Ejemplo

```tsx
import { ITImage } from "@axzydev/axzy_ui_system";

export function Photo() {
  return (
    <ITImage
      src="https://example.com/photo.jpg"
      fallback="/images/placeholder.png"
      alt="Foto de usuario"
      className="w-32 h-32 rounded-full"
    />
  );
}
```

## Notas

- El contenedor es un `<div>` con `flex items-center justify-center bg-transparent`; las `<img>` internas usan `w-full h-full object-cover`, por lo que el tamaño lo define el `className`.
- El estado se controla con `useState(imageError)`. Ante `onError` de la imagen principal, conmuta a la imagen de `fallback`.
- La imagen de fallback se renderiza con `alt="Fallback"` fijo (ignora el `alt` del componente).
- Si `fallback` queda vacío (`""`) y la principal falla, se renderiza un `<img src="">` con `alt="Fallback"`.
- `onClick` está declarado en las props pero **no se aplica** en la implementación actual.

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `image.fallbackAlt` | `Fallback` | `Fallback` | `image.tsx:44` (alt de la imagen de fallback) |

La key existe en `src/i18n/locales/es.ts`/`en.ts` y se resuelve con `useITTranslation()`. El `alt`
de la imagen principal sigue entrando por la prop `alt`.
