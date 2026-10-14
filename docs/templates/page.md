# ITPage

|  |  |
| --- | --- |
| Capa | `templates` |
| Carpeta | `src/components/templates/page/` |
| Archivo | `page.tsx` |
| Props | `page.props.ts` |
| Import | `import { ITPage } from "@axzydev/axzy_ui_system"` |

Plantilla de página que envuelve el contenido en un ancho máximo, con cabecera opcional
(`ITPageHeader`) y estados integrados de carga, error y vacío. La cabecera solo se renderiza si
hay algo que mostrar (título, descripción, breadcrumbs, acciones, botón de volver o icono).

## Import

```tsx
import { ITPage } from "@axzydev/axzy_ui_system";
```

## Props

### `ITPageProps`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `title` | `string` | — | Título de la página; se pasa a la cabecera. |
| `description` | `string` | — | Descripción bajo el título. |
| `breadcrumbs` | `ITBreadcrumbItem[]` | — | Migas de pan para dar contexto de navegación. |
| `actions` | `ReactNode` | — | Botones de acción en la cabecera. |
| `backAction` | `() => void` | — | Callback del botón de volver. |
| `icon` | `ReactNode` | — | Icono opcional junto al título. |
| `iconColor` | `string` | — | Color CSS del icono. |
| `loading` | `boolean` | `false` | Muestra placeholders de esqueleto. |
| `error` | `string \| null` | `null` | Muestra el estado de error con botón de reintento. |
| `errorTitle` | `string` | `"Error"` | Título del estado de error. |
| `errorActionLabel` | `string` | `"Reintentar"` | Etiqueta del botón de reintento. |
| `onRetry` | `() => void` | — | Callback del botón de reintento (solo si `error`). |
| `empty` | `boolean` | `false` | Muestra el estado vacío. |
| `emptyTitle` | `string` | `"Sin datos"` | Título del estado vacío. |
| `emptyDescription` | `string` | `"No hay información para mostrar"` | Descripción del estado vacío. |
| `emptyAction` | `ReactNode` | — | Acción personalizada del estado vacío. |
| `className` | `string` | — | Clases adicionales para el wrapper de la página. |
| `children` | `ReactNode` | — | Contenido renderizado dentro del wrapper. Obligatoria. |
| `maxWidth` | `"2xl" \| "3xl" \| "4xl" \| "5xl" \| "6xl" \| "7xl"` | `"7xl"` | Ancho máximo del contenido. |
| `noPadding` | `boolean` | `false` | Elimina el padding por defecto; tiene prioridad sobre `horizontalPadding`. |
| `horizontalPadding` | `string` | `"px-4 sm:px-6 lg:px-8"` | Clases Tailwind del padding horizontal. Debe ser un literal que Tailwind pueda escanear. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITButton, ITPage } from "@axzydev/axzy_ui_system";

export function ReportesPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    try {
      setLoading(true);
      setError(null);
      // await api.getReportes();
    } catch {
      setError("No se pudieron cargar los reportes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ITPage
      title="Reportes"
      description="Histórico de movimientos"
      loading={loading}
      error={error}
      errorTitle="Error de carga"
      errorActionLabel="Reintentar"
      onRetry={cargar}
      maxWidth="6xl"
      actions={<ITButton label="Actualizar" onClick={cargar} size="sm" />}
    >
      <p>Contenido del reporte</p>
    </ITPage>
  );
}
```

Sin gutter horizontal (contenido a sangre, conservando el padding vertical):

```tsx
import { ITPage } from "@axzydev/axzy_ui_system";

<ITPage title="Tablero" horizontalPadding="px-0">
  <div>Contenido a ancho completo</div>
</ITPage>;
```

## Notas

- **Prioridad de estados.** `loading` tiene prioridad sobre `error`, y `error` sobre `empty`; si ninguno aplica, se renderiza `children`. En todos los casos se incluye la cabecera si aplica.
- **Estado de carga.** Tres `ITSkeleton` rectangulares (40 px al 40 % de ancho y dos de 200 px) dentro de un `ITStack`.
- **Estado de error.** Usa `ITEmptyState` con `title={errorTitle || "Error"}`, `description={error}` y, si se pasa `onRetry`, un `ITButton` con `errorActionLabel || "Reintentar"`.
- **Estado vacío.** Usa `ITEmptyState` con `emptyTitle || "Sin datos"` y `emptyDescription || "No hay información para mostrar"`, más `emptyAction`.
- **Cabecera.** `hasHeader` es verdadero si existe `title`, `description`, `breadcrumbs`, `actions`, `backAction` o `icon`; la cabecera se delega a `ITPageHeader`.
- **Padding.** Con `noPadding` se omiten tanto `horizontalPadding` como el `py-6`. Por defecto el wrapper añade `py-6` y `horizontalPadding`.
- **`maxWidth` dinámico.** El ancho se arma como `` `max-w-${maxWidth}` `` en tiempo de ejecución; hoy los literales `max-w-2xl`…`max-w-7xl` aparecen en el código fuente, por lo que Tailwind los genera. Si se añadiera una variante nueva, habría que incluir su literal para que no quede fuera del CSS.

## Textos (i18n)

| Key | es | en | Dónde (`page.tsx`) |
| --- | --- | --- | --- |
| `common.error` | `Error` | `Error` | `:100` (título por defecto del estado de error) |
| `common.retry` | `Reintentar` | `Retry` | `:105` (etiqueta por defecto del botón) |
| `common.noData` | `Sin datos` | `No data` | `:121` (título por defecto del estado vacío) |
| `common.empty` | `No hay información para mostrar` | `Nothing to show` | `:122` (descripción por defecto del estado vacío) |

El resto del texto entra por `title`, `description`, `breadcrumbs`, `actions`, `emptyAction` y `children`.
