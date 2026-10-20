# AXZY UI System — Guía de uso para IA

> **Cómo usar este documento.** Es el contexto que le pasas a un modelo para que genere código con esta
> librería. Léelo en este orden: §1–§4 (qué es y reglas), §5–§9 (cómo se compone cada tipo de pantalla),
> §10–§12 (theming, i18n y accesibilidad), **§13 trampas conocidas** (evita los errores más caros) y §14
> recetas. Para la lista completa de props de un componente, usa `docs/llm/catalogo.md` (generado desde el
> código) o `docs/<capa>/<componente>.md`. Para el detalle del theming, `LLM_DOCS.md`.

| Documento | Para qué |
| --- | --- |
| **Este archivo** (`docs/llm/GUIA.md`) | Cómo pensar y escribir código con el sistema |
| `docs/llm/catalogo.md` | **Generado**: 61 componentes con todos sus props, tipos, defaults y ejemplo |
| `docs/llm/catalogo.json` | El mismo catálogo en JSON (para pegarlo en contexto o indexarlo) |
| **`docs/llm/ejemplos-reales.md`** | **Así se usa en producción** (CYC ERP): capas de CSS, provider real, chassis, páginas de listado/formulario/tablero, tabla con API y toasts |
| `LLM_DOCS.md` | Theming a fondo: variables CSS `--it-*`, layout chassis, patrones |
| `docs/<capa>/<componente>.md` | Referencia por componente (props + ejemplos + textos i18n) |
| `DESIGN.md` | Lenguaje visual del sandbox y del portafolio (dev-only) |

---

## 1. Qué es

Librería de componentes **React + TypeScript + Tailwind CSS v4** (`@axzydev/axzy_ui_system`), publicada en
npm. 61 componentes organizados en capas atómicas — la dependencia va **siempre hacia abajo**:

```
atoms  <  molecules  <  organisms  <  templates
```

- **atoms**: `ITButton`, `ITInput`, `ITText`, `ITBadget`, `ITSlideToggle`, `ITStack`, `ITGrid`, …
- **molecules**: `ITTable`, `ITSelect`, `ITDatePicker`, `ITCard`, `ITTabs`, `ITWysiwyg`, …
- **organisms**: `ITDataTable`, `ITDialog`, `ITToast`, `ITSidebar`, `ITFormBuilder`, `ITPageHeader`, …
- **templates**: `ITLayout` (chassis completo), `ITPage` (página con cabecera y estados).

## 2. Puesta en marcha (receta completa)

```css
/* src/index.css — el orden de capas manda por encima del orden de imports */
@layer theme, base, axzy-ui-system, components, utilities;

@import "tailwindcss";
@import "@axzydev/axzy_ui_system/dist/index.css" layer(axzy-ui-system);
/* o el build ya capado del propio paquete: */
/* @import "@axzydev/axzy_ui_system/layered.css"; */
```

```tsx
// src/main.tsx
import { ITThemeProvider } from "@axzydev/axzy_ui_system";
import "@app/index.css";

// Opcional: fija el modo por defecto ANTES de montar (si no, es "system").
if (!localStorage.getItem("it-theme-dark-mode")) localStorage.setItem("it-theme-dark-mode", "light");

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ITThemeProvider theme={{ primary: "#3056B8" }} appearance="flat" radius={10} shadow={1} showFab={false}>
      <App />
    </ITThemeProvider>
  </React.StrictMode>
);
```

Claves de esta receta (todas verificadas en producción, ver `ejemplos-reales.md`):

1. **Las capas se declaran explícitamente** y el CSS de la librería entra en `layer(axzy-ui-system)`
   **antes** de `utilities`: así tu Preflight no pisa su reset y tus utilidades sí pueden ajustar la
   librería. Si la capa de la librería queda después de `utilities`, tus ajustes necesitan el sufijo `!`
   de Tailwind v4 (`m-0! px-4!`).
2. **`dist/index.css` va en el CSS, no en `main.tsx`** (si tu app también importa Tailwind, dos
   importaciones compiten).
3. **Dark mode**: el provider usa la clave `it-theme-dark-mode` (`"light" | "dark" | "system"`) y arranca
   en `system`. Escríbela antes de renderizar para fijar otro default.
4. **Tokens**: para ajustar superficies que inyecta el provider, usa un selector que gane —
   `:root[data-it-appearance="flat"] { --it-layout-bg: #f5f6fa; }`.
5. **Config de producción del provider**: `appearance`, `radius`, `density`, `shadow`, `showFab={false}` y
   una paleta propia (incluye los bloques `layout` y `table`).
6. React ≥ 18 como peer. Ninguna otra librería de UI.

## 3. Reglas de oro

1. **Nunca hardcodees colores.** Usa las utilidades del tema: `bg-primary-600`, `text-slate-600`,
   `border-slate-200`… y las variables `var(--it-*)` cuando escribas CSS propio.
2. **Nunca hardcodees textos visibles.** Todo sale de `useITTranslation()` → `t("namespace.key")`.
3. **Un solo acento por vista**, usado como señal (borde, foco, un CTA). Los colores semánticos
   (`danger`, `warning`, `success`, `info`) son para estado, no decoración.
4. **Un componente por capa**: si un atom necesita un molecule, la pieza está mal ubicada.
5. **`className` es la válvula de escape**: los componentes aceptan `className` (y muchos
   `containerClassName`, `labelClassName`, `contentClassName`) para ajustes puntuales.
6. **Los textos siempre vía `ITText`** dentro de componentes de la librería (es el átomo de tipografía).
7. **La accesibilidad no es opcional**: todo control necesita nombre accesible (§12).
8. **Todo lo que el usuario puede tocar tiene estados**: `disabled`, `loading`, `error`, `empty`.
9. **No inventes props**: consulta `docs/llm/catalogo.md`, que se genera desde el código.
10. **Composición antes que configuración**: prefiere `ITStack`/`ITGrid`/`ITFlex` + componentes simples
    antes que un componente gigante con 30 props.

## 4. Convenciones de props

La mayoría de los componentes comparten estos nombres. Si dudas, asume esto:

| Prop | Valores típicos | Nota |
| --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | Escala única del sistema |
| `color` | `"primary" \| "secondary" \| "success" \| "danger" \| "warning" \| "info" \| "purple" \| "gray"` | Clave semántica de la paleta |
| `variant` | Depende del componente (`"filled" \| "outlined" \| "raised" \| "rounded" \| "text" \| …`) | Estilo visual |
| `label` | `string` | Texto del control o su nombre accesible |
| `value` / `onChange` | Controlado | Si acepta `value`, es controlado |
| `initialX` | Estado inicial | Para uso no controlado |
| `className` | `string` | Clases extra del contenedor |
| `disabled`, `loading`, `error` | `boolean` / `string` | Estados |

**Controlado vs no controlado**: `ITSlideToggle` usa `isOn` + `onToggle`; `ITInput`/`ITSelect` usan
`value` + `onChange`; los que tienen `initialState`/`defaultX` funcionan sin estado externo.

## 5. Componer una pantalla

```tsx
import { ITLayout, ITPageHeader, ITStack, ITGrid, ITCard, ITButton } from "@axzydev/axzy_ui_system";

<ITLayout
  topBar={{ logoText: "Mi App", userMenu: { userName: "Ana", userEmail: "ana@x.dev" } }}
  sidebar={{ navigationItems: [{ id: "home", label: "Inicio", icon: <FaHome />, isActive: true }] }}
>
  <ITPageHeader title="Panel" description="Resumen del día" actions={<ITButton>Exportar</ITButton>} />
  <ITStack spacing={5}>
    <ITGrid container spacing={4}>
      <ITGrid item xs={12} lg={6}><ITCard title="Ventas">…</ITCard></ITGrid>
      <ITGrid item xs={12} lg={6}><ITCard title="Tickets">…</ITCard></ITGrid>
    </ITGrid>
  </ITStack>
</ITLayout>
```

- `ITLayout` = chassis (topbar + sidebar + contenido). `ITPage` = página con `title`, `description`,
  `breadcrumbs`, `actions`, `loading`, `error`, `empty`, `maxWidth`, `horizontalPadding`.
- `ITStack` (vertical), `ITFlex` (flex), `ITGrid` (retícula 12 columnas) resuelven el layout.
- **Importante**: `ITLayout`/`ITNavbar` ocupan la altura del viewport (`h-screen`). Para embeberlos en
  otra superficie pasa `className="!h-full"` y dales un contenedor con altura (§13).

## 6. Formularios

```tsx
<ITStack spacing={4}>
  <ITField label="Correo" htmlFor="email" required error={errors.email} helpText="Lo usamos para avisos">
    <ITInput id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
  </ITField>

  <ITSelect
    name="role"
    label="Rol"
    value={role}
    onChange={(e) => setRole(e.target.value)}
    options={[{ label: "Admin", value: "admin" }, { label: "Staff", value: "staff" }]}
  />

  <ITSlideToggle label="Recibir avisos" isOn={newsletter} onToggle={setNewsletter} />
</ITStack>
```

- **`ITField`** agrupa etiqueta, obligatorio, ayuda y error de cualquier control (`error` acepta
  `string | boolean`).
- Cada control tiene su propio `label`; **si lo omites, pasa al menos `ariaLabel`** (o el control queda
  sin nombre accesible).
- Formik + Yup están soportados (son dependencias): usa `ITField` + los tipos de `src/types/yup.types.ts`
  para mapear `errors`/`touched` a la UI.
- `ITFormBuilder` arma formularios declarativos desde un esquema; `ITWysiwyg` para texto enriquecido;
  `ITMaskedInput` para máscaras; `ITChipInput`/`ITMultiSelect` para listas de valores.

## 7. Datos y tablas

| Componente | Cuándo |
| --- | --- |
| `ITTable` | Datos **en memoria**, con paginación, filtros por columna, cards en móvil |
| `ITDataTable` | Datos **del servidor** (`fetchData`), filtros externos, virtualización |
| `ITSearchTable` | Búsqueda + tabla con barra de filtros ya resuelta |
| `ITStatCard`, `ITLineBarChart`, `ITProgress` | Métricas y gráficas |
| `ITBadget`, `ITChip` | Estados y etiquetas dentro de celdas |

- Pasa `columns` (con `key`, `label`, `render`, filtros) y `data`/`fetchData`.
- En móvil, `renderCard` convierte cada fila en tarjeta (si no lo pasas, se usa el layout de tabla).

## 8. Feedback y overlays

- `ITDialog` / `ITDrawer` / `ITConfirmDialog`: overlays con foco y `Esc` gestionados.
- `ITToast`: mensaje efímero autocontenido (`message`, `type`, `duration`, `position`, `onClose`).
  No hay provider: renderiza el `ITToast` donde quieras y despídelo con `onClose`.
- `ITLoader`, `ITSkeleton`, `ITEmptyState`: estados de carga/vacío (obligatorios en listas y tablas).
- `ITAlert`: aviso en línea (no modal) para errores de formulario o avisos de sistema.

## 9. Navegación

`ITTabs`, `ITStepper`, `ITBreadcrumbs`, `ITPagination`, `ITDropdownMenu`, `ITSegmentedControl`,
`ITToggle` (vía `ITSlideToggle`). Para el chrome: `ITSidebar` (riel que se expande al pasar el cursor y
drawer en móvil) + `ITTopBar`; `ITNavbar` es la variante todo-en-uno.

## 10. Theming

```tsx
<ITThemeProvider
  theme={{ primary: "#2563eb", danger: "#dc2626" }}   // se fusiona con la paleta por defecto
  appearance="flat"      // "soft" (por defecto) | "flat"
  radius={10}            // radio global en px para toda la escala rounded-*
  density={0.95}         // 0.5–1.5: comprime tipografía/espaciados basados en rem
  shadow={2}             // 0–3
  showFab={false}        // oculta el diseñador de temas flotante
>
```

- `useITTheme()` → `{ palette, colors, setPalette, updateColor, resetTheme, applyPreset,
  resolvedTheme, darkModeMode, setDarkModeMode, appearance }`.
- **Dark mode es por clase**: el provider pone/quitá `.dark` en `<html>`; tus clases deben ser
  `bg-white dark:bg-slate-900`, y el CSS propio se escribe con `@variant dark (&:is(.dark &))`.
- Los colores del tema viven en variables CSS `--color-*` y los tokens de componentes en `--it-*`
  (lista completa en `LLM_DOCS.md`): **usa esas variables** en CSS propio, nunca hex sueltos.
- El provider genera escalas dinámicas (`--color-primary-50…950`) a partir del color base y las
  recalcula en dark mode.

## 11. i18n

```tsx
const { t, formatNumber, formatCurrency, formatDate, locale } = useITTranslation();
t("common.save");                    // "Guardar"
formatCurrency(1234.5, "EUR");       // "1.234,50 €"
```

- Claves `namespace.key` en `src/i18n/locales/es.ts` y `en.ts` (**paridad obligatoria**).
- Sin `ITI18nProvider` la salida es idéntica al español por defecto.
- **Los props explícitos ganan sobre el catálogo** (si pasas `label`, se usa tu texto).
- Formateo: siempre por el hook (`formatNumber`, `formatCurrency`, `formatDate`, `dateLocale`).

## 12. Accesibilidad (no negociable)

- **Todo control necesita nombre accesible**: `label` en `ITInput`/`ITSelect`/`ITField`;
  `label`/`ariaLabel` en `ITSlideToggle`; `ariaLabel` en botones de solo icono.
- **Nada de interactivos anidados**: nunca un `<button>`/`ITButton` dentro de un `<a>`.
- **Contraste AA**: el acento de la paleta resuelta se queda corto en algunos tonos. Regla práctica:
  relleno con texto blanco → `primary-700`; texto de acento sobre blanco → `primary-700`;
  sobre fondos tintados → `primary-800`; en dark → `primary-500`. `primary-600` solo para texto grande.
- **Foco visible siempre** (`focus-visible:ring-2`), y no lo elimines con `outline-none` sin reemplazo.
- Usa los landmarks una vez: un `<main>` por documento; `header`/`nav`/`aside` con nombre si se repiten.
- Respeta `prefers-reduced-motion` en animaciones propias.

## 13. Trampas conocidas (esto ahorra horas)

1. **El CSS por componente no viaja**: solo se publica `dist/index.css`. Si añades keyframes o CSS
   propios, ponlos en tu hoja con prefijo (`it-`) bajo `@layer components`.
2. **Tailwind no ve clases construidas en runtime**: `grid-cols-${n}` o `col-span-${n}` no existen en el
   bundle. Usa clases literales o un safelist (`@source inline("grid-cols-1 …")`). Aplica igual si
   consumes la librería.
3. **`col-span-full` se emite después de `col-span-N`**: no pongas las dos en el mismo item.
4. **`ITNavbar`/`ITLayout` fuerzan `h-screen`**: para embeberlos, dales un contenedor con altura y
   `className="!h-full"`; si no, se estiran a 100vh.
5. **El provider inyecta overrides `!important` en dark** para utilidades comunes (`.bg-white`,
   `.text-slate-*`). No pelees con él usando hex sueltos: usa las variables `--it-*` / utilidades del tema.
6. **`ITSidebar` colapsado**: el riel se expande al pasar el cursor; en móvil es un drawer. No hay botón
   de colapso.
7. **Iconos**: usa `react-icons` (ya es dependencia) y nunca emojis en la UI.
8. **`ITText`**: úsalo para todo texto dentro de componentes; `muted` aplica `--color-text-muted`.
9. **`ITPage` trae padding y `max-width` propios**: para una página a sangre usa `noPadding` y, si
   necesitas control total, `className="m-0! px-4! max-w-screen!"`.
10. **Capas de CSS**: si tu capa de la librería acaba después de `utilities`, tus utilidades no ganan a
   los estilos de la librería salvo con el sufijo `!` (`m-0!`, `px-4!`). Con el orden recomendado
   (`axzy-ui-system` antes de `utilities`) no hace falta.
11. **El id del diálogo es una clase interna** (`.it-dialog-panel`): para redimensionarlo sin prop, una
   regla propia (fuera de capas) es suficiente con el orden recomendado.
12. **Verifica antes de publicar**: `pnpm lint` (0 errores), `pnpm bundle` y, si tocas el sandbox,
   `pnpm audit:sandbox` (axe con el set completo + recortes de contenido).

## 14. Recetas

**Formulario con estados y validación**

```tsx
const [values, setValues] = useState({ email: "", role: "" });
const [errors, setErrors] = useState<Record<string, string>>({});

<ITStack spacing={4}>
  <ITField label="Correo" htmlFor="email" required error={errors.email}>
    <ITInput id="email" name="email" value={values.email}
      onChange={(e) => setValues({ ...values, email: e.target.value })} />
  </ITField>
  <ITSelect name="role" label="Rol" value={values.role}
    onChange={(e) => setValues({ ...values, role: e.target.value })}
    options={[{ label: "Admin", value: "admin" }]} />
  <ITFlex justify="end" gap={3}>
    <ITButton variant="outlined" color="gray">Cancelar</ITButton>
    <ITButton onClick={submit}>Guardar</ITButton>
  </ITFlex>
</ITStack>
```

**Listado con carga, vacío y error**

```tsx
{loading ? <ITSkeleton lines={5} /> :
 data.length === 0 ? <ITEmptyState title="Sin resultados" description="Ajusta los filtros" action={<ITButton>Crear</ITButton>} /> :
 <ITTable columns={columns} data={data} title="Usuarios" />}
```

**Tabla del servidor**

```tsx
<ITDataTable
  columns={columns}
  fetchData={async ({ page, pageSize, filters }) => {
    const res = await api.list({ page, pageSize, ...filters });
    return { rows: res.items, total: res.total };
  }}
/>
```

**Diálogo de confirmación + toast**

```tsx
<ITConfirmDialog open={open} title="Eliminar registro" description="No se puede deshacer"
  onConfirm={remove} onCancel={() => setOpen(false)} />
{toast && <ITToast message="Registro eliminado" type="success" onClose={() => setToast(null)} />}
```

## 15. Cómo pedirle código a una IA con esta guía

Dale **estos archivos** como contexto: `docs/llm/GUIA.md` + `docs/llm/catalogo.md` +
`docs/llm/ejemplos-reales.md` (patrones de producción; el que más ayuda a acertar de primeras) y
`LLM_DOCS.md` solo si va a tocar theming. Después pide así:

> Usa AXZY UI System. Compón una pantalla de listado de clientes con `ITLayout` + `ITPageHeader`, una
> `ITDataTable` alimentada por `fetchData`, estados de carga/vacío, un `ITConfirmDialog` para borrar y un
> `ITToast` de confirmación. Respeta las reglas de §3 y la accesibilidad de §12; si necesitas un prop que
> no conoces, búscalo en el catálogo antes de usarlo.

Pedir explícitamente «consulta el catálogo antes de inventar un prop» es lo que evita el 90% de las
alucinaciones con esta librería.

## 16. Motor de pantallas (JSON) y configuración global

Además de componentes sueltos, la librería trae un **motor declarativo**: una pantalla
descrita en JSON que se valida contra una lista blanca y se pinta sin ejecutar código.

```tsx
import { ITSchemaRenderer, validateSchema, parsePartialSchema } from "@axzydev/axzy_ui_system";

const informe = validateSchema(esquema);      // "valid" | "partial" | "invalid"
const { tree } = parsePartialSchema(texto);   // tolera JSON a medias (streaming)

<ITSchemaRenderer
  schema={esquema}
  resolveValue={(valor) => valor}             // { i18n } → texto, { $source } → datos
  resolveAction={(nodo, prop, accion) => () => {} } // { action } → handler del host
  onIssue={(issue) => console.warn(issue.code, issue.path)}
/>
```

```json
{
  "$schema": "axzy/screen",
  "version": 1,
  "id": "usuarios.lista",
  "title": { "i18n": "usuarios.title" },
  "content": [
    { "type": "ITCard", "props": { "title": "Usuarios" }, "children": [
      { "type": "ITDataTable", "props": {
        "columns": [{ "key": "nombre", "label": "Nombre", "type": "string", "sortable": true, "filter": true }],
        "fetchData": { "$source": "usuarios" },
        "defaultItemsPerPage": 10 } }
    ] }
  ]
}
```

**Reglas que no se negocian**

- El esquema **nunca** ejecuta código, hace red ni pinta HTML. Todo sale de listas blancas del host.
- `type` tiene que estar en el catálogo; una prop no declarada se ignora con aviso.
- Las referencias se resuelven en el host: `{ "i18n": "clave" }`, `{ "$source": "fuente" }`,
  `{ "action": "nombre", "args": { … } }`. **Nunca** metas funciones, nodos React ni URLs en el JSON.
- El nodo puede traer `id` (ancla en el DOM) y `$status: "pending"` (lo pone el parser, no el autor).
- Presupuesto: nodos máximos y profundidad; al excederse, `JR013` y la pantalla se corta, no se cae.

**Códigos de aviso** (contrato estable, no renumerar): `JR010` tipo desconocido · `JR011` prop
inválida o prohibida · `JR012` componente aislado · `JR013` presupuesto · `JR014` `id` que no llegó
al DOM · `JR020` esquema inválido · `JR021` nodo inválido · `JR040` acción no registrada ·
`JR070` falta migración · `JR080` stream cortado.

**Catálogo y contrato de vocabulario**

- Lista blanca: `src/json-renderer/catalog/axzyCatalog.ts` (18 tipos, 123 props al día de hoy).
- Antes de inventar un `type`, consulta `docs/json-renderer/VOCABULARIO.md` o
  `pnpm docs:json-renderer` (genera el contrato y un nodo mínimo que funciona por componente).
- Alcance y fases: `docs/json-renderer/ALCANCE.md` y `PLAN-IMPLEMENTACION.md`.

**Configuración global con `axzy.json`**

Lo que no es pantalla (tema, densidad, radios, sombras, apariencia) se declara una vez:

```json
{
  "$schema": "axzy/config",
  "version": 1,
  "density": 0.98,
  "radius": 10,
  "shadow": 2,
  "appearance": "soft",
  "showFab": true,
  "theme": { "primary": "#06b6d4", "danger": "#ef4444" }
}
```

```ts
import { mergeAxzyConfig } from "./sandbox/axzyConfig";

const config = mergeAxzyConfig(await (await fetch("/axzy.json")).json());
<ITThemeProvider {...config} />   // density, radius, shadow, appearance, showFab, theme
```

- El merge es tolerante: valores faltantes o inválidos caen al default; densidad se recorta a
  0.5–1.5, radio a 0–24 y sombra a 0–3.
- En el sandbox vive en `public/axzy.json`; en una app real, en tu propio archivo de configuración.

**Shell y páginas en el demo**

- `public/demo/app/layout.json` declara marca, módulos, iconos por nombre, badges y sub-items con
  `query` (que filtran de verdad: `?estado=Activo`).
- `public/demo/app/<página>.json` es el cuerpo de cada página.
- El host (`src/showcases/DemoJsonDashboard.tsx`) monta `ITLayout` + `ITPage` y resuelve iconos,
  etiquetas, datos y acciones. **ITLayout no puede ser un nodo del esquema**: recibe ReactNode y
  funciones. El JSON nombra; el host resuelve.
- Pantallas que necesitan código (editor, mapa, formulario) son del host, o híbridas: el esquema
  pinta y una acción abre la parte TSX (así funciona el CRUD del demo).

**Rutas del demo** (sandbox, dev-only): `#demo` portafolio en JSON · `#demo/app/inicio` dashboard ·
`#demo/app/docs` documentación viva con `ITJSONEditor`.

## 17. Mapa del repo (por si hace falta el código)

```
src/components/<capa>/<componente>/<componente>.tsx     implementación
src/components/<capa>/<componente>/<componente>.props.ts props + JSDoc (fuente de verdad)
src/index.ts                                            exports públicos
src/i18n/locales/{es,en}.ts                             catálogo de textos
docs/llm/                                               esta guía + catálogo generado + ejemplos reales
docs/<capa>/<componente>.md                             referencia por componente
docs/i18n/{conventions,strings}.md                      convenciones y catálogo maestro de textos
DESIGN.md                                               lenguaje visual de sandbox y portafolio
scripts/audit-sandbox.mjs                               auditoría (axe + recortes) del sandbox
```
