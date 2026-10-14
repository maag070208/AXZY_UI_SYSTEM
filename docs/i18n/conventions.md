# Convenciones de i18n

Reglas para nombrar, resolver e implementar los textos. Pensadas para que el catálogo sea estable y para
que añadir un idioma o un texto no obligue a tocar los componentes.

## Namespaces y keys

- Formato: `namespace.clave`, ambos en `camelCase`.
- **Namespace** = componente en `camelCase` sin el prefijo `IT`:
  `pagination`, `multiSelect`, `searchSelect`, `chipInput`, `datePicker`, `timePicker`, `confirmDialog`,
  `dropfile`, `themeProvider`, `table`, `searchTable`, `formBuilder`, `stepper`, `wysiwyg`, …
- **Claves compartidas** en `common.*`:
  `common.loading`, `common.loadingOptions`, `common.loadError`, `common.clear`, `common.all`, `common.search`,
  `common.true`, `common.false`, `common.back`, `common.next`, `common.finish`, `common.accept`, `common.cancel`,
  `common.confirm`, `common.close`, `common.userAvatar`, …
- **Validación de formularios** en `field.*` (`field.required`) para que `ITInput`, `ITSelect`, `ITField`,
  `ITMultiSelect` y `ITSearchSelect` compartan el mismo mensaje.

## Prioridad / overrides

1. **Prop explícita** del componente (p. ej. `noResults`, `placeholder`, `confirmLabel`) — gana siempre.
2. `messages[locale]` pasado a `ITI18nProvider`.
3. Catálogo base incluido en la librería (español).
4. La propia key, devuelta tal cual (último recurso; visible en desarrollo).

## Interpolación y plurales

- Variables con llaves: `table.sortBy` = `Ordenar por {label}`.
- Plurales: usar sufijos `_one` / `_other` (p. ej. `chipInput.maxTags_one` / `_other`) o la sintaxis
  ICU simple, a decidir en la implementación. Evitar concatenar plurales a mano.

## Fechas, números y moneda

- **Fechas visibles**: `Intl.DateTimeFormat(locale, …)` en lugar de formatos hardcodeados.
- **date-fns**: pasar `locale` desde un mapa (`es → es`, `en → enUS`) en vez del `es` fijo actual de `ITCalendar`.
- **Números/moneda**: `Intl.NumberFormat(locale, …)` en lugar del `es-MX` hardcodeado de `ITInput`,
  `ITLineBarChart` y `src/utils/table.utils.ts`.
- **Locale por defecto de la librería**: `es-MX` (mantiene la compatibilidad actual hasta que haya provider).
- `weekdays` de `ITCalendar` hoy es un array literal en español; debe derivarse del locale.

## Accesibilidad

- Todo control sin texto visible necesita `aria-label` **traducido**.
- Estado actual: `ITDialog` e `ITDrawer` (`common.close`), `ITAlert` (`common.dismiss`) e `ITInput`
  (botón de ojo: `input.showPassword` / `input.hidePassword`) ya exponen `aria-label` traducido.
- `ITButton` ya aplica `aria-label={ariaLabel || label}` y `title={title || ariaLabel || label}`: conservar.

## Cómo añadir un texto nuevo

1. Añade la key **a la vez** a `src/i18n/locales/es.ts` y `src/i18n/locales/en.ts` (mismas keys).
2. Úsala con `t("namespace.key")`; **nunca** hardcodees el string en el componente.
3. Refléjala en `docs/i18n/strings.md` y en la sección *Textos (i18n)* de `docs/<capa>/<componente>.md`.

## Compatibilidad

- Sin `ITI18nProvider`, el resultado por defecto debe ser idéntico al comportamiento actual (español).
- Las props de texto existentes siguen funcionando y tienen prioridad sobre el catálogo.
