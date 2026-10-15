# AXZY UI System

Librería de componentes React enterprise-ready con **Tailwind CSS v4**. Diseñada para aplicaciones de datos densos, dashboards y sistemas de gestión.

---

## Documentación para IA

Si vas a generar código con esta librería (Copilot, Claude, Cursor, un agente propio), pásale:

| Archivo | Qué contiene |
| --- | --- |
| [`docs/llm/GUIA.md`](docs/llm/GUIA.md) | Guía de uso: reglas, composición de pantallas, theming, i18n, accesibilidad, trampas conocidas y recetas |
| [`docs/llm/catalogo.md`](docs/llm/catalogo.md) | **Generado desde el código**: 61 componentes con props, tipos, defaults y ejemplo |
| [`docs/llm/catalogo.json`](docs/llm/catalogo.json) | El mismo catálogo en JSON, para indexar |
| [`docs/llm/ejemplos-reales.md`](docs/llm/ejemplos-reales.md) | **Así se usa en producción** (CYC ERP): capas de CSS, provider real, chassis, listados, formularios, tablas con API y toasts |
| [`LLM_DOCS.md`](LLM_DOCS.md) | Theming a fondo: variables CSS `--it-*`, escalas y chassis de layout |

### Carpeta [`ai/`](ai/) — copiar y pegar

Si no quieres ir archivo por archivo, la carpeta [`ai/`](ai/) trae el paquete **autocontenido** listo para
pegar en un chat o subir como conocimiento del proyecto:

| Archivo | Tamaño | Contenido |
| --- | --- | --- |
| [`ai/AXZY-UI-SYSTEM.md`](ai/AXZY-UI-SYSTEM.md) | ~150 KB (~38k tokens) | Todo en uno: guía + ejemplos reales + catálogo completo |
| [`ai/AXZY-UI-SYSTEM-compacto.md`](ai/AXZY-UI-SYSTEM-compacto.md) | ~65 KB (~17k tokens) | Igual, con el catálogo sin descripciones de props |
| `ai/catalogo.md` · `ai/catalogo.json` | — | Solo el catálogo |
| `ai/plantillas/` | — | Reglas para Cursor (`.mdc`), Copilot, Claude Code y prompt inicial |

```bash
pnpm docs:llm        # regenera el catálogo (compilador de TS sobre src/index.ts), docs/llm/ y ai/
pnpm docs:ai         # solo el paquete ai/ (usa docs/llm/ ya generado)
pnpm audit:sandbox   # audita el sandbox: axe (set completo) + contenido recortado, 45 páginas
```


## Instalación en un proyecto nuevo

### 1. Crear proyecto Vite + React + TypeScript

```bash
npm create vite@latest mi-app -- --template react-ts
cd mi-app
```

### 2. Instalar dependencias

```bash
npm install @axzydev/axzy_ui_system
npm install -D tailwindcss @tailwindcss/vite @vitejs/plugin-react-swc
```

### 3. Configurar Vite con Tailwind v4

`vite.config.ts`:

```ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [tailwindcss(), react()],
})
```

### 4. Importar Tailwind + el CSS de la librería (en el orden de capas correcto)

`dist/index.css` es un build de Tailwind **independiente y ya compilado** (tiene sus propias
capas `@layer theme, base, components, utilities`). Si tu app también hace
`@import "tailwindcss";` por su cuenta, el navegador acaba con **dos** juegos de esas mismas
capas compartiendo nombre, y gana la que se registró en último lugar en el documento — normalmente
el Preflight/reset de tu propia app, que no conoce los tokens de AXZY. Eso es lo que rompe cosas
como el Sidebar: se ve bien solo mientras tu app no tiene su propio Tailwind corriendo.

La forma correcta es importar el CSS de la librería con un **layer propio** y fijar el orden de
capas explícitamente, para que el reset/tema de AXZY nunca dependa del orden de imports:

`src/index.css`:

```css
/* El orden aquí es el que manda, independientemente de en qué orden se
   importen los archivos: axzy-ui-system se ejecuta después del `base` de
   Tailwind (así su reset nunca lo pisa) pero antes de `utilities` (así tus
   clases de Tailwind siguen pudiendo sobrescribir estilos de AXZY cuando
   haga falta). */
@layer theme, base, axzy-ui-system, components, utilities;

@import "tailwindcss";
@import "@axzydev/axzy_ui_system/dist/index.css" layer(axzy-ui-system);
```

Con esto **ya no** se importa `dist/index.css` desde `main.tsx` — todo entra por `index.css`.

> **Orden alternativo (y su consecuencia):** si colocas `axzy-ui-system` *después* de `utilities`,
> los estilos de la librería ganan a tus utilidades y tendrás que forzarlas con el sufijo `!` de
> Tailwind v4 (`m-0! px-4! max-w-screen!`). El orden de arriba te ahorra esos `!`.

**Modo oscuro por defecto:** el provider arranca en `system` y guarda la preferencia en la clave
`it-theme-dark-mode` (`"light" | "dark" | "system"`). Si quieres otro default, escríbela **antes** de
montar la app:

```tsx
if (!localStorage.getItem("it-theme-dark-mode")) localStorage.setItem("it-theme-dark-mode", "light");
```

### 5. Envolver con ITThemeProvider

`src/main.tsx`:

```tsx
import React from "react"
import ReactDOM from "react-dom/client"
import { ITThemeProvider } from "@axzydev/axzy_ui_system"
import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ITThemeProvider>
      <App />
    </ITThemeProvider>
  </React.StrictMode>
)
```

### 6. Usar componentes

```tsx
import { ITButton } from "@axzydev/axzy_ui_system"

export default function App() {
  return (
    <div className="p-8">
      <ITButton>Hola Mundo</ITButton>
    </div>
  )
}
```

---

## Desarrollo local (contribuir)

### 1. Clonar e instalar

```bash
git clone https://github.com/maag070208/AXZY_UI_SYSTEM.git
cd AXZY_UI_SYSTEM
pnpm install
```

### 2. Iniciar servidor de desarrollo (sandbox interactivo)

```bash
pnpm dev
```

Abre `http://localhost:5173` para ver el Interactive Sandbox con todos los componentes.

El sandbox usa hash routing: `#ui-system` (landing), `#ui-system/<grupo>/<item>` (componente), p. ej.
`http://localhost:5173/#ui-system/forms/input`. La tabla de rutas y slugs vive en
`src/sandbox/navigation.ts`.

### 3. Build de producción

```bash
pnpm build        # alias de pnpm bundle (tsup + CSS)
pnpm bundle       # tsup + CSS
```

---

## Scripts

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Sandbox interactivo (Vite) |
| `pnpm build` | Alias de `pnpm bundle` (tsup + CSS) |
| `pnpm build:app` | Build de la app sandbox |
| `pnpm bundle` | Bundle del paquete (tsup + CSS) |
| `pnpm watch` | Watch mode para desarrollo del paquete |
| `pnpm lint` | ESLint |
| `pnpm check:atomic` | Valida dependencias atómicas (sin imports hacia capas superiores) |
| `pnpm check:css` | Valida aislamiento CSS (selectores `it-*`, tokens `--it-*`, sin duplicados) |
| `pnpm preview` | Preview del build |

---

## Arquitectura atómica y aislamiento CSS

Los componentes se organizan en **capas atómicas** con dependencias unidireccionales
(una capa solo importa de capas iguales o inferiores):

| Capa | Regla | Ejemplos |
|------|-------|----------|
| `atoms/` | Primitivos, sin dependencias de componentes | `ITButton`, `ITInput`, `ITText`, `ITGrid`, `ITFlex`, `ITStack` |
| `molecules/` | Combinan átomos y moléculas | `ITCard`, `ITDatePicker`, `ITSelect`, `ITTable`, `ITStepper` |
| `organisms/` | Composiciones complejas | `ITDataTable`, `ITFormBuilder`, `ITDialog`, `ITSidebar`, `ITTopbar` |
| `templates/` | Páginas/estructuras completas | `ITLayout`, `ITPage` |
| `theme-provider/` | Provider (no capa visual) | `ITThemeProvider` |

### Garantía de aislamiento

Anidar componentes (p.ej. **`ITDatePicker` dentro de `ITCard`**) **no** produce
interferencia de estilos. Esto se garantiza por convención y se valida en CI:

1. **Clases propias siempre con prefijo `it-`** (BEM: `.it-card`, `.it-date-picker__popover`).
   Nunca clases genéricas (`.card`, `.toast-enter`, `.animate-*`).
2. **Selectores con `:where(.it-*)`** → especificidad 0, para que las utilities de
   Tailwind del consumidor sigan overrideando sin conflicto.
3. **CSS plano en `@layer components`** → las utilities (layer `utilities`) ganan siempre.
4. **Tokens públicos con namespace `--it-*`** (`--it-card-bg`, `--it-input-border`, ...).
   El resto de tokens `--color-*`/`--radius-*` son internos de Tailwind.
5. **Checks automáticos**: `pnpm check:css` (selectores/tokens genéricos) y
   `pnpm check:atomic` (grafo de dependencias) fallan si se viola la convención.

El aislamiento se valida en CI con `pnpm check:css` y `pnpm check:atomic`; ya no hay historia de Storybook de aislamiento.

---

## Theming

Personaliza la paleta de colores en runtime sin recompilar:

```tsx
const myTheme = {
  colors: {
    primary: { 50: "#fef2f2", 500: "#ef4444", 900: "#7f1d1d" },
    success: { 50: "#f0fdf4", 500: "#22c55e" },
    // solo necesitas los colores que quieras sobreescribir
  },
}

<ITThemeProvider theme={myTheme}>
  <App />
</ITThemeProvider>
```

Override fino por CSS: los tokens de componente usan el namespace **`--it-*`**
(`--it-card-bg`, `--it-topbar-bg`, `--it-calendar-selected-bg`, ...). Sobrescribir
estas variables en cualquier contenedor estila solo ese subárbol.

> **Breaking (v1.3)**: los tokens se renombraron de `--card-*`, `--input-*`,
> `--topbar-*`, `--sidebar-*`, `--modal-*`, `--calendar-*`, `--layout-*` a `--it-*`
> para evitar colisiones con CSS de la app consumidora.

---

## Componentes disponibles

- **ITButton** – Botón con variants (filled, outlined, raised, rounded, text, link, icon-only)
- **ITInput** – Input con soporte para texto, password, número, textarea, iconos
- **ITSelect** – Dropdown nativo estilizado
- **ITSearchSelect** – Select con búsqueda y opciones async
- **ITDatePicker** / **ITTimePicker** – Selectores de fecha y hora
- **ITCalendar** – Calendario con eventos y modos month/week/day
- **ITSlideToggle** – Switch toggle
- **ITDropfile** – Área de arrastrar y soltar archivos
- **ITFormBuilder** – Generador dinámico de formularios desde JSON
- **ITTable** / **ITDataTable** – Tablas con filtros, ordenamiento, paginación y columnas fijas (`pinned`)
- **ITCard** / **ITStatCard** – Tarjetas de contenido y métricas
- **ITLayout** / **ITNavbar** – Sistema de layout con sidebar colapsable
- **ITFlex** / **ITStack** / **ITGrid** – Layout helpers
- **ITText** – Tipografía con variants
- **ITAvatar** – Avatares con iniciales
- **ITBadget** – Badges de estado
- **ITDivider** – Divisores
- **ITProgress** – Barras de progreso
- **ITPagination** – Paginación
- **ITPageHeader** – Encabezados de página
- **ITPage** – Página completa con layout
- **ITThemeProvider** – Proveedor de tema

---

## Autocomplete / IntelliSense

Al instalar el paquete obtienes autocomplete de props en JSX automáticamente (TypeScript + JSDoc). También incluye snippets de VS Code para insertar cada componente con un par de teclas. Ver [`AUTOCOMPLETE_SETUP.md`](./AUTOCOMPLETE_SETUP.md) para el setup completo (snippets, Tailwind IntelliSense).

---

## Requisitos

- React 18+
- Tailwind CSS 4.x + `@tailwindcss/vite`
- Node.js 18+
- pnpm (para desarrollo local)
