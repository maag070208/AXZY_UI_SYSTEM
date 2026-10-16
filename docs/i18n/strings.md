# Catálogo maestro de textos (i18n)

> **Estado: implementado.** La fuente de verdad runtime son `src/i18n/locales/es.ts` y
> `src/i18n/locales/en.ts` (193 keys cada uno, en paridad). Si añades keys nuevas, actualiza los
> catálogos **y** este documento; ante duda, manda el código.
>
> La vista **por componente** (con archivo:línea) está en la sección *Textos (i18n)* de
> `docs/<capa>/<componente>.md`. Este documento es la vista **agregada**.

Las columnas `es` / `en` son los valores **reales** del catálogo. La columna «Usado en» indica qué
componentes llaman a `t(...)` con esa key; `—` significa que la key existe pero hoy no se usa.

## `common.*` — compartidos

| Key | es | en | Usado en |
| --- | --- | --- | --- |
| `common.loading` | Cargando... | Loading... | ITMultiSelect, ITSearchSelect, ITLoader |
| `common.loadingOptions` | Cargando opciones... | Loading options... | ITTable, ITDataTable |
| `common.loadError` | Error cargando | Couldn't load | ITTable, ITDataTable (filtros tipo catálogo) |
| `common.search` | Buscar... | Search... | ITTable, ITDataTable |
| `common.clear` | Limpiar | Clear | ITSearchSelect, ITSearchTable (`SearchAndSortBar`) |
| `common.clearSelection` | Limpiar selección | Clear selection | ITMultiSelect |
| `common.all` | Todos | All | ITTable, ITDataTable |
| `common.true` | Verdadero | True | ITTable, ITDataTable, ITSearchTable |
| `common.false` | Falso | False | ITTable, ITDataTable, ITSearchTable |
| `common.back` | Atrás | Back | ITStepper |
| `common.next` | Siguiente | Next | ITStepper |
| `common.finish` | Finalizar | Finish | ITStepper |
| `common.accept` | Aceptar | OK | — |
| `common.confirm` | Confirmar | Confirm | ITConfirmDialog, ITDropfile |
| `common.cancel` | Cancelar | Cancel | ITConfirmDialog, ITDropfile |
| `common.close` | Cerrar | Close | ITDialog, ITDrawer, ITFormHeader |
| `common.dismiss` | Descartar | Dismiss | ITAlert (aria-label) |
| `common.closeNotification` | Cerrar notificación | Close notification | ITToast (aria-label) |
| `common.menu` | Menú | Menu | ITTopBar (aria-label) |
| `common.userAvatar` | Usuario actual | Current user | ITTopBar, ITNavbar (alt) |
| `common.retry` | Reintentar | Retry | ITPage |
| `common.error` | Error | Error | ITPage |
| `common.noData` | Sin datos | No data | ITPage |
| `common.empty` | No hay información para mostrar | Nothing to show | ITPage |
| `common.noResults` | No se encontraron resultados | No results found | — |
| `common.delete` | Eliminar | Delete | ITDropfile |
| `common.copy` | Copiar | Copy | — |

## Validación de formularios (`field.*`)

| Key | es | en | Usado en |
| --- | --- | --- | --- |
| `field.required` | Este campo es requerido | This field is required | ITInput, ITSelect, ITField, ITMultiSelect, ITSearchSelect, ITChipInput |

## Atoms

| Key | es | en | Usado en |
| --- | --- | --- | --- |
| `image.fallbackAlt` | Fallback | Fallback | ITImage (alt) |
| `chip.remove` | Quitar {label} | Remove {label} | ITChip (aria-label) |
| `input.invalidFormat` | Formato inválido | Invalid format | ITMaskedInput |
| `input.showPassword` | Mostrar contraseña | Show password | ITInput (aria-label del botón del ojo) |
| `input.hidePassword` | Ocultar contraseña | Hide password | ITInput (aria-label del botón del ojo) |

> Los demás átomos no renderizan textos propios (entran por props).

## Molecules

| Key | es | en | Usado en |
| --- | --- | --- | --- |
| `select.placeholder` | Selecciona una opción | Select an option | ITSelect, ITSearchSelect |
| `select.noResults` | No se encontraron resultados | No results found | ITMultiSelect, ITSearchSelect |
| `card.imageAlt` | Imagen de tarjeta | Card image | ITCard (default del `alt`) |
| `multiSelect.placeholder` | Selecciona opciones | Select options | ITMultiSelect |
| `chipInput.placeholder` | Escribe y presiona Enter | Type and press Enter | ITChipInput |
| `chipInput.maxTags` | Máximo {count} etiquetas | Maximum {count} tags | ITChipInput |
| `chipInput.duplicate` | Etiqueta duplicada | Duplicate tag | ITChipInput |
| `dropdownMenu.open` | Abrir menú | Open menu | ITDropdownMenu (default de `triggerLabel`) |
| `lineBarChart.lineLabel` | Serie A | Series A | ITLineBarChart |
| `lineBarChart.barLabel` | Serie B | Series B | ITLineBarChart |
| `datePicker.invalid` | Fecha inválida | Invalid date | ITDatePicker |
| `datePicker.placeholder` | dd/mm/aaaa | dd/mm/yyyy | ITDatePicker, ITTable, ITDataTable |
| `datePicker.rangePlaceholder` | dd/mm/aaaa - dd/mm/aaaa | dd/mm/yyyy - dd/mm/yyyy | ITDatePicker, ITTable, ITDataTable |
| `calendar.today` | Hoy | Today | ITCalendar |
| `timePicker.accept` | Aceptar | OK | ITTimePicker |
| `timePicker.placeholder` | HH:MM | HH:MM | ITTimePicker |
| `timePicker.invalid` | Hora inválida | Invalid time | ITTimePicker |
| `timePicker.hours` | Horas | Hours | ITTimePicker |
| `timePicker.minutes` | Minutos | Minutes | ITTimePicker |
| `table.showAll` | Mostrar todos | Show all | ITTable, ITDataTable |
| `table.filterTrue` | Filtrar solo verdaderos | Filter true only | ITTable, ITDataTable |
| `table.filterFalse` | Filtrar solo falsos | Filter false only | ITTable, ITDataTable |
| `table.sortBy` | Ordenar por {label} | Sort by {label} | ITTable, ITDataTable |
| `table.filterToggle` | {action} para {label} | {action} for {label} | ITTable, ITDataTable |
| `table.viewTable` | Tabla | Table | ITTable, ITDataTable |
| `table.viewCards` | Tarjetas | Cards | ITTable, ITDataTable |
| `table.noResults` | No se encontraron resultados | No results found | ITTable, ITDataTable |
| `table.adjustFilters` | Intenta ajustar los filtros | Try adjusting the filters | ITTable, ITDataTable |
| `table.loading` | Cargando datos... | Loading data... | ITDataTable |
| `table.selectAll` | Seleccionar todo | Select all | — |
| `wysiwyg.bold` | Negrita | Bold | ITWysiwyg (title + aria-label) |
| `wysiwyg.italic` | Itálica | Italic | ITWysiwyg |
| `wysiwyg.underline` | Subrayado | Underline | ITWysiwyg |
| `wysiwyg.highlight` | Marcador | Highlight | ITWysiwyg |
| `wysiwyg.bulletList` | Lista con viñetas | Bulleted list | ITWysiwyg |
| `wysiwyg.numberedList` | Lista numerada | Numbered list | ITWysiwyg |
| `wysiwyg.clearFormat` | Limpiar formato | Clear formatting | ITWysiwyg |
| `pagination.itemsPerPage` | Mostrar | Show | ITPagination |
| `pagination.of` | de | of | ITPagination |
| `pagination.page` | Página {page} | Page {page} | ITPagination (title) |
| `pagination.aria` | Paginación | Pagination | ITPagination (aria-label) |
| `pagination.previous` | Página anterior | Previous page | ITPagination (aria-label) |
| `pagination.next` | Página siguiente | Next page | ITPagination (aria-label) |
| `pagination.showing` | Mostrando {from}-{to} de {total} | Showing {from}-{to} of {total} | — |
| `breadcrumbs.aria` | Ruta de navegación | Breadcrumb | ITBreadcrumbs (aria-label) |
| `stepper.stepOf` | Paso {current} de {total} | Step {current} of {total} | ITStepper |
| `stepper.stepAria` | Paso {n} {label} | Step {n} {label} | ITStepper (aria-label) |

### ITJSONEditor — `jsonEditor.*`

| Key | es | en | Usado en |
| --- | --- | --- | --- |
| `jsonEditor.ariaLabel` | Editor de JSON | JSON editor | ITJSONEditor (`aria-label`) |
| `jsonEditor.placeholder` | `{ … }` de ejemplo | `{ … }` de ejemplo | ITJSONEditor (placeholder) |
| `jsonEditor.valid` | JSON válido | Valid JSON | ITJSONEditor |
| `jsonEditor.invalid` | JSON no válido | Invalid JSON | ITJSONEditor |
| `jsonEditor.invalidAt` | Error en línea {line}, columna {column} | Error on line {line}, column {column} | ITJSONEditor (pie) |
| `jsonEditor.format` | Formatear | Format | ITJSONEditor |
| `jsonEditor.formatHint` | Reindenta el documento (Mayús+Alt+F) | Reindents the document (Shift+Alt+F) | ITJSONEditor (title) |
| `jsonEditor.minify` | Minificar | Minify | ITJSONEditor |
| `jsonEditor.sortAsc` | A-Z | A-Z | ITJSONEditor |
| `jsonEditor.sortDesc` | Z-A | Z-A | ITJSONEditor |
| `jsonEditor.escape` | Escapar | Escape | ITJSONEditor |
| `jsonEditor.unescape` | Desescapar | Unescape | ITJSONEditor |
| `jsonEditor.copy` | Copiar | Copy | ITJSONEditor |
| `jsonEditor.copied` | Copiado | Copied | ITJSONEditor |
| `jsonEditor.copyFailed` | No se pudo copiar al portapapeles | Could not copy to the clipboard | ITJSONEditor (aviso) |
| `jsonEditor.importFile` | Abrir | Open | ITJSONEditor |
| `jsonEditor.download` | Descargar | Download | ITJSONEditor |
| `jsonEditor.fileLoaded` | Archivo cargado | File loaded | ITJSONEditor (aviso) |
| `jsonEditor.fileError` | No se pudo leer el archivo | The file could not be read | ITJSONEditor (aviso) |
| `jsonEditor.applied` | Acción aplicada | Action applied | ITJSONEditor (aviso) |
| `jsonEditor.actionFailed` | La acción no se pudo aplicar | The action could not be applied | ITJSONEditor (aviso) |
| `jsonEditor.viewMode` | Modo de vista | View mode | ITJSONEditor (aria-label) |
| `jsonEditor.modeText` | Texto | Text | ITJSONEditor |
| `jsonEditor.modeTree` | Árbol | Tree | ITJSONEditor |
| `jsonEditor.viewSettings` | Vista | View | ITJSONEditor |
| `jsonEditor.wrap` | Ajuste | Wrap | ITJSONEditor |
| `jsonEditor.lineNumbers` | Números | Numbers | ITJSONEditor |
| `jsonEditor.folding` | Plegado | Folding | ITJSONEditor |
| `jsonEditor.indent` | Indentación | Indent | ITJSONEditor |
| `jsonEditor.indentNone` | Sin sangrar | No indent | ITJSONEditor |
| `jsonEditor.collapseAll` | Plegar todo | Collapse all | ITJSONEditor |
| `jsonEditor.expandAll` | Desplegar todo | Expand all | ITJSONEditor |
| `jsonEditor.collapseBlock` | Plegar el bloque de la línea {line} | Collapse the block on line {line} | ITJSONEditor (aria-label) |
| `jsonEditor.expandBlock` | Desplegar el bloque de la línea {line} | Expand the block on line {line} | ITJSONEditor (aria-label) |
| `jsonEditor.foldMore` | … {count} líneas plegadas | … {count} folded lines | ITJSONEditor (marcador) |
| `jsonEditor.expandNode` | Desplegar nodo | Expand node | ITCodeTreeView (aria-label) |
| `jsonEditor.collapseNode` | Plegar nodo | Collapse node | ITCodeTreeView (aria-label) |
| `jsonEditor.jumpToLine` | Ir a la línea {line} | Go to line {line} | ITCodeTreeView |
| `jsonEditor.childCount` | {count} hijos | {count} children | ITCodeTreeView |
| `jsonEditor.treeNeedsValid` | Corrige el JSON para ver el árbol | Fix the JSON to see the tree | ITJSONEditor |
| `jsonEditor.treeTruncated` | Árbol recortado: demasiados nodos, usa la vista de texto | Tree truncated: too many nodes, use the text view | ITCodeTreeView |
| `jsonEditor.statLines` | {count} líneas | {count} lines | ITJSONEditor (pie) |
| `jsonEditor.statNodes` | {count} nodos | {count} nodes | ITJSONEditor (pie) |
| `jsonEditor.statDepth` | prof. {count} | depth {count} | ITJSONEditor (pie) |
| `jsonEditor.statRoot` | raíz: {kind} | root: {kind} | ITJSONEditor (pie) |
| `jsonEditor.statSize` | tamaño: {size} | size: {size} | ITJSONEditor (pie) |
| `jsonEditor.kindObject` | objeto | object | ITJSONEditor, ITCodeTreeView |
| `jsonEditor.kindArray` | array | array | ITJSONEditor, ITCodeTreeView |
| `jsonEditor.kindString` | texto | string | ITJSONEditor, ITCodeTreeView |
| `jsonEditor.kindNumber` | número | number | ITJSONEditor, ITCodeTreeView |
| `jsonEditor.kindBoolean` | booleano | boolean | ITJSONEditor, ITCodeTreeView |
| `jsonEditor.kindNull` | nulo | null | ITJSONEditor, ITCodeTreeView |

## Organisms

| Key | es | en | Usado en |
| --- | --- | --- | --- |
| `confirmDialog.title` | Confirmar acción | Confirm action | ITConfirmDialog |
| `confirmDialog.message` | ¿Estás seguro de que deseas continuar? | Are you sure you want to continue? | ITConfirmDialog |
| `dropfile.upload` | Subir archivo | Upload file | ITDropfile |
| `dropfile.status.pending` | Pendiente | Pending | ITDropfile |
| `dropfile.status.uploading` | Subiendo... | Uploading... | ITDropfile |
| `dropfile.status.uploaded` | Subido | Uploaded | ITDropfile |
| `dropfile.status.error` | Error | Error | ITDropfile |
| `dropfile.dropHere` | ¡Suelta aquí! | Drop here! | ITDropfile |
| `dropfile.clickOrDrag` | Haz clic o arrastra | Click or drag | ITDropfile |
| `dropfile.imageLoaded` | Imagen cargada | Image loaded | ITDropfile |
| `dropfile.noPreview` | Sin vista previa | No preview | ITDropfile |
| `dropfile.previewAlt` | Vista previa | Preview | ITDropfile (alt) |
| `dropfile.fileTypeNotAllowed` | Tipo de archivo no permitido. | File type not allowed. | ITDropfile |
| `dropfile.fileLoaded` | Archivo cargado | File uploaded | ITDropfile |
| `sidebar.notifications` | Notificaciones | Notifications | ITSidebar |
| `sidebar.navAria` | Componentes de la librería | Library components | ITSidebar (aria-label) |
| `sidebar.noSubmenu` | No hay submenú | No submenu | ITSidebar |
| `pageHeader.back` | Volver | Back | ITPageHeader (aria-label) |
| `searchTable.searchPlaceholder` | Buscar en todos los campos... | Search all fields... | ITSearchTable |
| `searchTable.showing` | Mostrando {from}-{to} de {total} resultados | Showing {from}-{to} of {total} results | — |
| `searchTable.showingCount` | Mostrando {from} de {total} resultados | Showing {from} of {total} results | ITSearchTable |
| `searchTable.emptySearch` | No se encontraron resultados para tu búsqueda | No results for your search | ITSearchTable |
| `searchTable.empty` | No se encontraron resultados | No results found | ITSearchTable |
| `searchTable.showLabel` | Mostrar: | Show: | ITSearchTable |
| `searchTable.pageOf` | Página {current} de {total} | Page {current} of {total} | ITSearchTable |
| `searchTable.prev` | Página anterior | Previous page | ITSearchTable (aria + title) |
| `searchTable.next` | Página siguiente | Next page | ITSearchTable (aria + title) |
| `searchTable.sort` | Ordenar | Sort | ITSearchTable |
| `searchTable.sortAsc` | Asc ↑ | Asc ↑ | ITSearchTable |
| `searchTable.sortDesc` | Desc ↓ | Desc ↓ | ITSearchTable |
| `searchTable.clearSearch` | Limpiar búsqueda | Clear search | ITSearchTable |
| `searchTable.sortTable` | Ordenar tabla | Sort table | ITSearchTable |
| `searchTable.sortAria` | Ordenar tabla {direction} | Sort table {direction} | ITSearchTable |
| `searchTable.sortAscending` | ascendente | ascending | ITSearchTable |
| `searchTable.sortDescending` | descendente | descending | ITSearchTable |
| `formBuilder.arrayField` | Array Field: {label} | Array field: {label} | ITFormBuilder |
| `formBuilder.loadingOptions` | Cargando opciones... | Loading options... | ITFormBuilder |

## Provider (Theme Designer) — `themeProvider.*`

| Key | es | en | Usado en |
| --- | --- | --- | --- |
| `themeProvider.fab.ariaLabel` | Configurar Paleta de Colores | Configure Color Palette | ITThemeProvider (aria-label del FAB) |
| `themeProvider.designer.title` | Diseñador de Temas | Theme Designer | ITThemeProvider (título del modal) |
| `themeProvider.designer.appearance` | Apariencia | Appearance | ITThemeProvider |
| `themeProvider.designer.presets` | Presets | Presets | ITThemeProvider |
| `themeProvider.designer.myThemes` | Mis Temas | My Themes | ITThemeProvider |
| `themeProvider.designer.presetNamePlaceholder` | Nombre del tema... | Theme name... | ITThemeProvider (placeholder) |
| `themeProvider.designer.save` | Guardar | Save | ITThemeProvider |
| `themeProvider.designer.cancelSave` | X | X | ITThemeProvider |
| `themeProvider.designer.saveCurrent` | Guardar actual | Save current | ITThemeProvider |
| `themeProvider.designer.reset` | Restaurar default | Reset to default | ITThemeProvider |
| `themeProvider.designer.autosave` | Los cambios se guardan automáticamente | Changes are saved automatically | ITThemeProvider |
| `themeProvider.designer.close` | Cerrar | Close | ITThemeProvider |
| `themeProvider.designer.deletePreset` | Eliminar | Delete | ITThemeProvider (title) |
| `themeProvider.tabs.brand` | Marca | Brand | ITThemeProvider |
| `themeProvider.tabs.layout` | Nav & Sidebar | Nav & Sidebar | ITThemeProvider |
| `themeProvider.tabs.tables` | Tablas | Tables | ITThemeProvider |
| `themeProvider.mode.light` | Claro | Light | — |
| `themeProvider.mode.dark` | Oscuro | Dark | — |
| `themeProvider.mode.system` | Sistema | System | — |
| `themeProvider.presets.midnightIndigo` | Midnight Indigo 🌌 | Midnight Indigo 🌌 | ITThemeProvider (vía `PRESET_I18N_KEY`) |
| `themeProvider.presets.coralReef` | Coral Reef 🪸 | Coral Reef 🪸 | ITThemeProvider (vía `PRESET_I18N_KEY`) |
| `themeProvider.presets.oceanicTeal` | Oceanic Teal 🌊 | Oceanic Teal 🌊 | ITThemeProvider (vía `PRESET_I18N_KEY`) |
| `themeProvider.presets.goldenHour` | Golden Hour ☀️ | Golden Hour ☀️ | ITThemeProvider (vía `PRESET_I18N_KEY`) |
| `themeProvider.presets.deepForest` | Deep Forest 🌲 | Deep Forest 🌲 | ITThemeProvider (vía `PRESET_I18N_KEY`) |

## Sandbox (solo dev, no se publica)

Estas keys alimentan `src/sandbox/**` (cromo del showroom), no componentes de la librería.

| Key | es | en |
| --- | --- | --- |
| `sandbox.language` | Idioma | Language |
| `sandbox.notifications` | Notificaciones | Notifications |
| `sandbox.nav.portfolio` | Portafolio | Portfolio |
| `sandbox.userMenu.portfolio` | Ir al Portafolio | Go to portfolio |
| `sandbox.search.label` | Buscar componentes | Search components |
| `sandbox.search.placeholder` | Buscar componente… | Search component… |
| `sandbox.search.clear` | Limpiar búsqueda | Clear search |
| `sandbox.search.results` | {count} resultados | {count} results |

## Formatos dependientes de locale (no son strings de UI)

| Uso | Dónde | Nota |
| --- | --- | --- |
| Números/moneda | `atoms/input/input.tsx`, `molecules/line-bar-chart/line-bar-chart.tsx`, `utils/table.utils.ts` | `Intl.NumberFormat`; el locale del provider (default `es-MX`) se obtiene del hook `useITTranslation()`. |
| Fechas | `molecules/date-picker/datePicker.tsx` | `toLocaleDateString("es-ES", …)`. |
| date-fns | `molecules/calendar/calendar.tsx` | Locale `es` de date-fns. |
