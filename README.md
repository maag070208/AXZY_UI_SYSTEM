# AXZY UI System

A modern, enterprise-ready React component library powered by **Tailwind CSS v4**. Built specifically for high-density data applications, hospital management software, and complex dashboards.

---

## Quick Start

### 1. Crear un proyecto nuevo con Vite + React + TypeScript

```bash
npm create vite@latest mi-app -- --template react-ts
cd mi-app
npm install
```

### 2. Instalar Tailwind CSS v4 y AXZY UI System

```bash
npm install @axzydev/axzy_ui_system
npm install -D tailwindcss @tailwindcss/vite
```

### 3. Configurar Vite

Edita `vite.config.ts`:

```ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [tailwindcss(), react()],
})
```

### 4. Agregar directivas de Tailwind

En `src/index.css`:

```css
@import "tailwindcss";
```

### 5. Envolver la app con ITThemeProvider

```tsx
// src/main.tsx
import React from "react"
import ReactDOM from "react-dom/client"
import { ITThemeProvider } from "@axzydev/axzy_ui_system"
import App from "./App"
import "./index.css"

const myTheme = {
  colors: {
    primary: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
      950: "#450a0a",
    },
  },
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ITThemeProvider theme={myTheme}>
      <App />
    </ITThemeProvider>
  </React.StrictMode>
)
```

### 6. ¡Usar componentes!

```tsx
// src/App.tsx
import { ITButton } from "@axzydev/axzy_ui_system"

export default function App() {
  return (
    <div className="p-8">
      <ITButton variant="primary">Hola Mundo</ITButton>
    </div>
  )
}
```

---

## Theming

El `ITThemeProvider` permite sobrescribir toda la paleta de colores en tiempo de ejecución sin recompilar.

```tsx
const myTheme = {
  colors: {
    primary: { 50: "..." , 500: "#ef4444", ... },
    secondary: { 50: "...", 500: "#3b82f6", ... },
    success: { 50: "...", 500: "#22c55e", ... },
    danger: { 50: "...", 500: "#ef4444", ... },
    warning: { 50: "...", 500: "#f59e0b", ... },
    purple: { 50: "...", 500: "#a855f7", ... },
    info: { 50: "...", 500: "#06b6d4", ... },
  },
}
```

Solo debes proveer los colores que quieras cambiar — el resto usa los valores por defecto.

---

## Scripts del proyecto

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza el build |
| `npm run storybook` | Storybook para desarrollo |
| `npm run lint` | Ejecuta ESLint |

---

## Requisitos

- React 18+
- Tailwind CSS 4.x + `@tailwindcss/vite`
- Node.js 18+
