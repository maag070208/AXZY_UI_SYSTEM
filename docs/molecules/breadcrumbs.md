# ITBreadcrumbs

|  |  |
| --- | --- |
| Capa | `molecules` |
| Carpeta | `src/components/molecules/breadcrumbs/` |
| Archivo | `breadcrumbs.tsx` |
| Props | `breadcrumbs.props.ts` |
| Import | `import { ITBreadcrumbs } from "@axzydev/axzy_ui_system"` |

Ruta de navegación (breadcrumb trail) con renderizado automático de enlace o botón según cada item i un separador personalizable.

## Import

```tsx
import { ITBreadcrumbs } from "@axzydev/axzy_ui_system";
```

## Props

### `ITBreadcrumbsProps`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `items` | `ITBreadcrumbItem[]` | — | Array ordenado de items. El último se renderiza como texto plano (página actual). |
| `separator` | `ReactNode` | `<FaChevronRight size={10} />` | Elemento separador entre items. |
| `className` | `string` | — | Clases CSS adicionales para el `<nav>`. |

### `ITBreadcrumbItem`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `label` | `string` | — | Texto visible del segmento. |
| `href` | `string` | — | URL del enlace; renderiza un `<a>`. |
| `onClick` | `() => void` | — | Handler de click; renderiza un `<button>` cuando no hay `href`. |

## Ejemplo

```tsx
import { ITBreadcrumbs } from "@axzydev/axzy_ui_system";

export default function Trail() {
  return (
    <ITBreadcrumbs
      items={[
        { label: "Inicio", href: "/" },
        { label: "Productos", href: "/productos" },
        { label: "Detalles" },
      ]}
    />
  );
}
```

## Notas

- El último item siempre se renderiza como texto plano (`ITText as="span"`, `font-semibold`), nunca interactivo.
- Los items no finales con `href` renderizan `<a>`; los que solo tienen `onClick` renderizan `<button>`.
- Contenedor `<nav aria-label="Breadcrumb">`.
- Separador por defecto `FaChevronRight` de `react-icons/fa`.
- El componente es puramente presentacional: la navegación la resuelve `href` o `onClick`.

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `breadcrumbs.aria` | `Ruta de navegación` | `Breadcrumb` | `breadcrumbs.tsx:26` (`aria-label` del `<nav>`) |

El resto del texto entra por props (`items[].label`).
