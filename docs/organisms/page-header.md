# ITPageHeader

|  |  |
| --- | --- |
| Capa | `organisms` |
| Carpeta | `src/components/organisms/page-header/` |
| Archivo | `page-header.tsx` |
| Props | `page-header.props.ts` |
| Import | `import { ITPageHeader } from "@axzydev/axzy_ui_system"` |

Barra de título de página con breadcrumbs, descripción, botón de volver y acciones. Cuando hay breadcrumbs o `backAction`, muestra una fila superior con ambos y mueve las acciones a esa fila.

## Import

```tsx
import { ITPageHeader } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `title` | `string` | — | Título principal (obligatoria). |
| `description` | `string` | — | Texto descriptivo bajo el título. |
| `breadcrumbs` | `ITBreadcrumbItem[]` (`{ label: string; href?: string; onClick?: () => void }[]`) | — | Migas de pan. |
| `actions` | `ReactNode` | — | Botones/elementos a la derecha. |
| `backAction` | `() => void` | — | Se dispara al pulsar el botón de volver. |
| `icon` | `ReactNode` | — | Icono junto al título. |
| `iconColor` | `string` | — | Color CSS del icono. |
| `className` | `string` | — | Clases CSS adicionales del contenedor. |

## Ejemplo

```tsx
import { ITButton, ITPageHeader } from "@axzydev/axzy_ui_system";
import { FaUsers } from "react-icons/fa";

export function UsersHeader() {
  return (
    <ITPageHeader
      title="Usuarios"
      description="Gestiona todos los usuarios del sistema"
      breadcrumbs={[{ label: "Admin" }, { label: "Usuarios" }]}
      backAction={() => history.back()}
      actions={<ITButton label="Nuevo usuario" />}
      icon={<FaUsers />}
    />
  );
}
```

## Notas

- La fila superior (`showTopRow = breadcrumbs?.length || backAction`) contiene el botón de volver y los breadcrumbs a la izquierda, y `actions` a la derecha. Si **no** hay fila superior, las acciones se colocan en la fila principal, a la derecha.
- Diseño con `space-y-3`. El título es un `<h1>` (`text-3xl`, o `text-[1.625rem]` en aspecto flat).
- Aspecto `bento`: título `text-3xl` con tracking ajustado, descripción atenuada, sin recuadro de icono y botón de volver como círculo neutro de 40 px sin borde.
- El recuadro del icono (`w-12 h-12 rounded-full`, con borde y fondo) **no** se renderiza en aspecto flat (`useITFlatAppearance()`); `iconColor` se aplica como `style.color` de ese recuadro.
- El botón de volver es un círculo `w-9 h-9` con `FaChevronLeft`.
- `breadcrumbs` se delega a `ITBreadcrumbs`.
- Accesibilidad: el botón de volver tiene `aria-label="Volver"`.

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `pageHeader.back` | `Volver` | `Back` | `page-header.tsx:48` (`aria-label` del botón) |

El resto del texto visible entra por `title`, `description`, `breadcrumbs` y `actions`.
