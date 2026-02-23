# AXZY UI System

A modern, enterprise-ready React component library powered by Tailwind CSS. Built specifically for high-density data applications, hospital management software, and complex dashboards.

## Installation

```bash
npm install @axzydev/axzy_ui_system
```

## Basic Setup

Then, you must tell your own `tailwind.config.ts` to scan the library for its dynamic classes:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@axzydev/axzy_ui_system/dist/**/*.{js,ts,jsx,tsx}" // <--- ADD THIS LINE
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## Dynamic Theming (ITThemeProvider)

`AXZY_UI_SYSTEM` uses a powerful CSS Variables engine under the hood. You can override the entire color palette of all components instantly without recompiling the library by using the `<ITThemeProvider>`.

Wrap your application root with the provider and pass your custom brand JSON object:

```tsx
import React from 'react';
import { ITThemeProvider } from '@axzydev/axzy_ui_system';
import App from './App';

// Define your custom brand palette mapping
const myEnterpriseTheme = {
  colors: {
    primary: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444", // Your Main Brand Color
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
      950: "#450a0a",
    },
    // You can optionally override secondary, success, danger, warning, purple, info
  }
};

export default function Main() {
  return (
    <ITThemeProvider theme={myEnterpriseTheme}>
      <App />
    </ITThemeProvider>
  );
}
```

> **Note:** You do not need to provide all colors. Only provide the scales (e.g., `primary`) that you wish to override. Unprovided scales will gracefully fallback to the default AXZY palette.
