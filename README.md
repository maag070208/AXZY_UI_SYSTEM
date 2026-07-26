# AXZY UI System

Librería de componentes React enterprise-ready con **Tailwind CSS v4**. Diseñada para aplicaciones de datos densos, dashboards y sistemas de gestión.

---

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

### 4. Importar Tailwind CSS

`src/index.css`:

```css
@import "tailwindcss";
```

### 5. Importar el CSS de la librería

`src/main.tsx`:

```tsx
import "@axzydev/axzy_ui_system/dist/index.css"
```

### 6. Envolver con ITThemeProvider

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
git clone https://github.com/axzydev/axzy_ui_system.git
cd axzy_ui_system
pnpm install
```

### 2. Iniciar servidor de desarrollo (sandbox interactivo)

```bash
pnpm dev
```

Abre `http://localhost:5173` para ver el Interactive Sandbox con todos los componentes.

### 3. Storybook (documentación visual)

```bash
pnpm storybook
```

### 4. Build de producción

```bash
pnpm build        # TypeScript + Vite
pnpm bundle       # tsup + CSS
```

---

## Scripts

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Sandbox interactivo (Vite) |
| `pnpm build` | TypeScript + Vite build |
| `pnpm build:app` | Build de la app sandbox |
| `pnpm bundle` | Bundle del paquete (tsup + CSS) |
| `pnpm watch` | Watch mode para desarrollo del paquete |
| `pnpm storybook` | Storybook local |
| `pnpm build-storybook` | Build estático de Storybook |
| `pnpm lint` | ESLint |
| `pnpm preview` | Preview del build |

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
- **ITTable** / **ITDataTable** – Tablas con filtros, ordenamiento y paginación
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

## Requisitos

- React 18+
- Tailwind CSS 4.x + `@tailwindcss/vite`
- Node.js 18+
- pnpm (para desarrollo local)
