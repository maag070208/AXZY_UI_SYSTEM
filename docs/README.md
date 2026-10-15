# Documentación — AXZY UI SYSTEM

Documentación **por componente** de la librería `@axzydev/axzy_ui_system`, organizada espejando las capas
atómicas. Cada fichero describe props, tipos, defaults, un ejemplo y notas de comportamiento y accesibilidad.

> Esta carpeta es **documentación** (no se ejecuta ni se publica como API). La fuente de verdad es el código:
> JSDoc en `src/components/**`, `DOCUMENTACION_DETALLADA_COMPONENTES.txt` y `src/showcases/*` (sandbox).
> Si cambia el código, actualiza el `.md` correspondiente.

## Estructura

| Carpeta | Contenido |
| --- | --- |
| `docs/atoms/` | Componentes base. |
| `docs/molecules/` | Componentes compuestos. |
| `docs/organisms/` | Componentes complejos. |
| `docs/templates/` | Shells de página. |
| `docs/provider/` | `ITThemeProvider`. |
| `docs/i18n/` | i18n (runtime en `src/i18n/`): API, convenciones y catálogo de textos (ver abajo). |
| `docs/llm/` | **Documentación para IA**: guía de uso (`GUIA.md`) + catálogo de componentes generado desde el código (`catalogo.md`, `catalogo.json`). |
| `docs/sandbox-audit.md` | Estado de la auditoría del sandbox (axe + recortes de contenido) y pendientes por grupo. |

## Documentación para IA

`pnpm docs:llm` regenera `docs/llm/catalogo.md` y `catalogo.json` a partir del código (compilador de
TypeScript sobre `src/index.ts`), así que props, tipos y defaults no se quedan viejos. Empieza por
[`docs/llm/GUIA.md`](llm/GUIA.md).

## Índice de componentes

### Atoms (`docs/atoms/`)

| Componente | Doc | Resumen |
| --- | --- | --- |
| ITAvatar | [avatar.md](atoms/avatar.md) | Avatar con imagen, fallback de iniciales y badge. |
| ITBadget | [badget.md](atoms/badget.md) | Etiqueta/insignia de estado con colores del tema. |
| ITButton | [button.md](atoms/button.md) | Botón de acción, 8 variantes, 3 tamaños. |
| ITCheckbox | [checkbox.md](atoms/checkbox.md) | Checkbox con label, indeterminado y disabled. |
| ITChip | [chip.md](atoms/chip.md) | Etiqueta/pill compacta, removible. |
| ITDivider | [divider.md](atoms/divider.md) | Separador horizontal/vertical. |
| ITFlex | [flex.md](atoms/flex.md) | Contenedor flexbox completo. |
| ITGrid | [grid.md](atoms/grid.md) | Sistema de rejilla de 12 columnas. |
| ITImage | [image.md](atoms/image.md) | Imagen con fallback ante error. |
| ITInput | [input.md](atoms/input.md) | Input de texto con label, error, iconos y formato. |
| ITInputNumber | [input-number.md](atoms/input-number.md) | Campo numérico con formato tipo moneda. |
| ITLoader | [loader.md](atoms/loader.md) | Indicadores de carga (spinner, dots, pulse…). |
| ITPopover | [popover.md](atoms/popover.md) | Panel flotante por click. |
| ITProgress | [progress.md](atoms/progress.md) | Barra de progreso determinada/indeterminada. |
| ITRadioGroup | [radio.md](atoms/radio.md) | Grupo de radios. |
| ITSegmentedControl | [segmented-control.md](atoms/segmented-control.md) | Toggle segmentado tipo iOS. |
| ITSkeleton | [skeleton.md](atoms/skeleton.md) | Placeholder de carga. |
| ITSlideToggle | [slide.md](atoms/slide.md) | Interruptor on/off tipo iOS. |
| ITSlider | [slider.md](atoms/slider.md) | Slider de rango. |
| ITStack | [stack.md](atoms/stack.md) | Stack flex con gap uniforme. |
| ITText | [text.md](atoms/text.md) | Tipografía semántica. |
| ITTextarea | [textarea.md](atoms/textarea.md) | Input multilínea. |
| ITTooltip | [tooltip.md](atoms/tooltip.md) | Tooltip por hover/focus. |

## Molecules

| Componente | Doc | Descripción |
| --- | --- | --- |
| ITAccordion | [accordion.md](molecules/accordion.md) | Secciones colapsables. |
| ITAlert | [alert.md](molecules/alert.md) | Banner de alerta descartable. |
| ITBreadcrumbs | [breadcrumbs.md](molecules/breadcrumbs.md) | Ruta de migas. |
| ITCalendar | [calendar.md](molecules/calendar.md) | Calendario completo (mes/semana/día, eventos). |
| ITCard | [card.md](molecules/card.md) | Tarjeta con imagen, título, cuerpo y acciones. |
| ITChipInput | [chip-input.md](molecules/chip-input.md) | Input que convierte texto en chips. |
| ITDatePicker | [date-picker.md](molecules/date-picker.md) | Selector de fecha y rango. |
| ITDropdownMenu | [dropdown-menu.md](molecules/dropdown-menu.md) | Menú de acciones con teclado y ARIA. |
| ITEmptyState | [empty-state.md](molecules/empty-state.md) | Estado vacío. |
| ITField | [field.md](molecules/field.md) | Wrapper de campo de formulario. |
| ITFormHeader | [form-header.md](molecules/form-header.md) | Cabecera coloreada para modales/formularios. |
| ITLineBarChart | [line-bar-chart.md](molecules/line-bar-chart.md) | Gráfica SVG de barras + línea. |
| ITMaskedInput | [masked-input.md](molecules/masked-input.md) | Input con máscara. |
| ITMultiSelect | [multi-select.md](molecules/multi-select.md) | Selector múltiple con búsqueda. |
| ITPagination | [pagination.md](molecules/pagination.md) | Navegación por páginas e items por página. |
| ITSearchSelect | [search-select.md](molecules/search-select.md) | Select con búsqueda local/servidor. |
| ITSelect | [select.md](molecules/select.md) | Select nativo con tema. |
| ITStatCard | [stat-card.md](molecules/stat-card.md) | Tarjeta de métrica. |
| ITStepper | [stepper.md](molecules/stepper.md) | Asistente por pasos. |
| ITTable | [table.md](molecules/table.md) | Tabla con filtros, orden, paginación, diseño. |
| ITTabs | [tabs.md](molecules/tabs.md) | Pestañas `line`/`pill`. |
| ITTimePicker | [time-picker.md](molecules/time-picker.md) | Selector de hora. |
| ITWysiwyg | [wysiwyg.md](molecules/wysiwyg.md) | Editor de texto enriquecido. |

## Organisms

| Componente | Doc | Descripción |
| --- | --- | --- |
| ITConfirmDialog | [confirm-dialog.md](organisms/confirm-dialog.md) | Modal de confirmación. |
| ITDataTable | [data-table.md](organisms/data-table.md) | Tabla server-side (fetch, orden, filtros, paginación). |
| ITDialog | [dialog.md](organisms/dialog.md) | Modal por portal. |
| ITDrawer | [drawer.md](organisms/drawer.md) | Panel lateral deslizante. |
| ITDropfile | [dropfile.md](organisms/dropfile.md) | Subida de archivos drag & drop. |
| ITFormBuilder | [form-builder.md](organisms/form-builder.md) | Formularios dirigidos por esquema. |
| ITNavbar | [navbar.md](organisms/navbar.md) | Shell de navegación lateral. |
| ITPageHeader | [page-header.md](organisms/page-header.md) | Barra de título de página. |
| ITSearchTable | [searchTable.md](organisms/searchTable.md) | Tabla server-side con búsqueda y edición. |
| ITSidebar | [sidebar.md](organisms/sidebar.md) | Sidebar de navegación. |
| ITToast | [toast.md](organisms/toast.md) | Notificaciones flotantes. |
| ITTopBar | [topbar.md](organisms/topbar.md) | Barra superior. |
| ITTripleFilter | [triple-filter.md](organisms/triple-filter.md) | Barra de filtro segmentado. |

## Templates y Provider

| Componente | Doc | Descripción |
| --- | --- | --- |
| ITLayout | [templates/layout.md](templates/layout.md) | Shell de app (sidebar + topbar + contenido). |
| ITPage | [templates/page.md](templates/page.md) | Plantilla de página con estados. |
| ITThemeProvider | [provider/theme-provider.md](provider/theme-provider.md) | Provider de tema (CSS vars, presets, editor). |

## i18n

Runtime en **`src/i18n/`** (`ITI18nProvider`, `useITTranslation`, catálogos `es`/`en`), exportado desde `src/index.ts`.

- [docs/i18n/README.md](i18n/README.md) — API, runtime y uso (provider, hook, formatos).
- [docs/i18n/conventions.md](i18n/conventions.md) — convenciones de keys, overrides, formatos y accesibilidad.
- [docs/i18n/strings.md](i18n/strings.md) — catálogo maestro de textos (es ↔ en).

## Fuentes y mantenimiento

| Fuente | Rol |
| --- | --- |
| `src/components/**/*.tsx` y `*.props.ts` | **Autoridad**: props, defaults y comportamiento reales. |
| `DOCUMENTACION_DETALLADA_COMPONENTES.txt` | Referencia canónica previa (secciones por componente). |
| `LLM_DOCS.md` | Detalles y gotchas (tablas, virtualización, pinning…). |
| `src/showcases/*.tsx` | Ejemplos reales usados por el sandbox (`pnpm dev`). |
| `docs/**` | Esta documentación (derivada de las anteriores). |

> Nota: Storybook fue eliminado del repo (`*.stories.tsx`, `*.doc.mdx`, `.storybook/`). El sandbox (`pnpm dev` → `src/showcases/*.tsx`) es la única superficie de ejemplos, y esta carpeta `docs/` es la referencia escrita por componente.
