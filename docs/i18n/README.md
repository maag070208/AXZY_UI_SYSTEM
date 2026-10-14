# i18n — Internacionalización del AXZY UI SYSTEM

> **Estado: implementado.** El runtime vive en `src/i18n/` (viaja en el paquete npm) y todos los
> componentes de la librería obtienen sus textos por ahí. Este directorio `docs/i18n/` es solo
> documentación (no se publica como API).

## Objetivo

Internacionalizar todos los textos que la librería renderiza, con **español** e **inglés**, de modo
que se puedan añadir idiomas sin tocar los componentes.

## Quick start

```tsx
import { ITThemeProvider, ITI18nProvider } from "@axzydev/axzy_ui_system";

<ITThemeProvider>
  <ITI18nProvider locale="en">
    <App />
  </ITI18nProvider>
</ITThemeProvider>
```

- **Sin provider** el resultado es idéntico al comportamiento histórico (español).
- `locale` por defecto `"es"`; `fallbackLocale` por defecto `"es"`.

En cualquier componente:

```tsx
import { useITTranslation } from "@axzydev/axzy_ui_system";

const { t, formatCurrency, formatNumber, formatDate, dateLocale } = useITTranslation();

t("common.cancel");                              // "Cancelar" / "Cancel"
t("pagination.showing", { from: 1, to: 10, total: 42 }); // "Mostrando 1-10 de 42"
formatCurrency(1234.5);                          // "$1,234.50" (es-MX por defecto)
formatDate(new Date(), { day: "numeric", month: "long" }); // usa Intl + locale
```

## API

| Export | Tipo | Descripción |
| --- | --- | --- |
| `ITI18nProvider` | componente | Provee `locale` y mensajes al árbol. Props: `locale`, `fallbackLocale`, `messages`. |
| `useITTranslation()` | hook | Devuelve `{ locale, fallbackLocale, t, formatNumber, formatCurrency, formatDate, dateLocale }`. Funciona sin provider (cae al catálogo es). |
| `createI18n(options)` | función | Construye el valor de contexto fuera de React (tests, utils). |
| `interpolate(template, vars)` | función | Sustituye `{var}`. |
| `baseCatalog`, `esMessages`, `enMessages` | datos | Catálogos incluidos. |
| `toIntlLocale(locale)` / `toDateLocale(locale)` | función | Mapea `es`/`en` a locale `Intl` / `date-fns`. |
| `ITI18nValue`, `ITI18nProviderProps`, `ITMessages`, `ITMessagesByLocale`, `ITLocale` | tipos | Contratos públicos. |

### Prioridad de resolución (mayor → menor)

1. **Prop explícita** del componente (`noResults`, `placeholder`, `confirmLabel`, …).
2. `messages[locale]` pasado a `ITI18nProvider`.
3. Catálogo base de la librería para `locale` (inglés).
4. Catálogo base español (`es`).
5. La propia key (visible en desarrollo).

## Runtime (`src/i18n/`)

| Archivo | Contenido |
| --- | --- |
| `types.ts` | Tipos públicos (`ITI18nValue`, `ITMessages`, props…). |
| `translator.ts` | `createI18n`, `interpolate`, `resolveMessages`, mapeos de locale (`es-MX`, `en-US`, date-fns). |
| `context.ts` | `ITI18nContext` con valor por defecto en español. |
| `provider.tsx` | `ITI18nProvider`. |
| `useITTranslation.ts` | Hook de consumo. |
| `locales/es.ts`, `locales/en.ts` | Catálogos (mismas keys). |
| `index.ts` | Barrel exportado desde `src/index.ts`. |

## Formatos dependientes de locale

- **Números/moneda**: `formatNumber` / `formatCurrency` del hook (`Intl.NumberFormat`). Default `es-MX`.
- **Fechas**: `formatDate` del hook (`Intl.DateTimeFormat`).
- **date-fns**: `dateLocale` del hook; `ITCalendar` deriva meses, cabeceras de día y nombres del locale activo.
- `ITTable` / `ITDataTable` / `ITSearchTable` usan `formatCurrencyMX(value, locale)` (compatible hacia atrás).

## Sandbox

El sandbox (`pnpm dev`) envuelve la app en `ITI18nProvider` con un **selector ES/EN** en el topbar
(persistido en `localStorage`). El chrome del sandbox (búsqueda, navegación, menú de usuario) está
internacionalizado con las keys `sandbox.*`.

## Alcance y límites

- **Librería**: todos los textos de UI de `src/components/**` están internacionalizados.
- **Sandbox**: chrome + navegación (keys `sandbox.*`).
- **Fuera de alcance**: los textos de *demo* de `src/showcases/*` (descripciones de ejemplo y datos
  ficticios) se mantienen tal cual; son contenido de documentación, no UI del producto.

## Archivos

| Archivo | Contenido |
| --- | --- |
| `README.md` | Este documento: API, runtime y uso. |
| `conventions.md` | Convenciones de keys, overrides, interpolación, fechas/números, accesibilidad. |
| `strings.md` | Inventario maestro de textos (es ↔ en) por componente. |

## Cómo añadir un texto

1. Implementa el texto en el componente con `t("namespace.key")` (nunca hardcodeado).
2. Añade la key **a la vez** en `src/i18n/locales/es.ts` y `src/i18n/locales/en.ts`.
3. Refléjalo en `docs/i18n/strings.md` y en la sección *Textos (i18n)* del `docs/<capa>/<componente>.md`.
4. Las props de texto existentes se mantienen y ganan prioridad sobre el catálogo.

## Relación con el resto de la documentación

- `docs/README.md` — índice general.
- Cada componente en `docs/<capa>/<componente>.md` incluye su sección **Textos (i18n)**.
- `docs/i18n/strings.md` es la vista agregada de todas las keys.
