# 🚀 Plan de Migración y Verificación — AXZY UI System

> Documento vivo para garantizar que los 52 componentes funcionan correctamente en el dev app (`npm run dev`) y Storybook (`npm run storybook`).

## 📋 Reglas de verificación

Para cada componente, marcar el estado de las siguientes 4 verificaciones:

| Símbolo | Significado |
|---------|-------------|
| ✅ | Verificado, funciona correctamente |
| ⚠️ | Funciona con warnings / issues menores |
| ❌ | Falla, requiere fix |
| ⏳ | Pendiente de verificar |
| N/A | No aplica a este componente |

---

## 🧭 Checklist de verificación por componente

### Cómo verificar
1. Abrir `npm run dev` en http://localhost:5173
2. Ir al sidebar de la izquierda → categoría del componente
3. Verificar:
   - **Render**: ¿Se ve el componente sin errores visuales?
   - **Controles**: ¿Los controles (ITS, Select, ITSlider) actualizan el sandbox?
   - **Dark mode**: Toggle a modo oscuro → ¿se ve bien?
   - **Responsive**: Reducir el ancho del browser → ¿se adapta?
4. Abrir `npm run storybook` en http://localhost:6006
5. Buscar el componente en el sidebar
6. Verificar:
   - **Controls**: ¿Los argumentos se pueden modificar?
   - **Stories**: ¿Las variantes se renderizan?
   - **Docs**: ¿La pestaña de Docs muestra la tabla de props?

---

## 📦 Estado actual por componente

> **52/52 componentes tienen:** `*.tsx` + `*.props.ts` + `*.stories.tsx` + `*.doc.mdx` + JSDoc en props y default export.

### Estructura & Layout (10 componentes)

| # | Componente | Render | Controles | Dark Mode | Responsive | Storybook | Notas |
|---|-----------|:---:|:---:|:---:|:---:|:---:|-------|
| 1 | ITAlert | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Banner con 4 variants |
| 2 | ITAvatar | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Circular avatar + initials fallback |
| 3 | ITBreadcrumbs | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Trail de navegación |
| 4 | ITCard | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | 4 variants + hoverable |
| 5 | ITFlex | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Flexbox completo |
| 6 | ITGrid | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | CSS Grid 12 cols |
| 7 | ITLayout | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Shell sidebar + topbar |
| 8 | ITNavbar | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Sidebar nav + user menu |
| 9 | ITPageHeader | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Title bar con breadcrumbs |
| 10 | ITPage | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Page template |
| 11 | ITStack | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Flex stack spacing |
| 12 | ITSidebar | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Vertical nav colapsable |
| 13 | ITTopBar | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Top nav bar |
| 14 | ITDivider | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Separator horizontal/vertical |
| 15 | ITTabs | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Tabs navigation 4 variants |
| 16 | ITBreadcrumbs | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | (Duplicado, ya listado) |

### Formularios & Inputs (11 componentes)

| # | Componente | Render | Controles | Dark Mode | Responsive | Storybook | Notas |
|---|-----------|:---:|:---:|:---:|:---:|:---:|-------|
| 17 | ITButton | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | 8 variants, 7 colores, 3 sizes |
| 18 | ITInput | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Text + icon + validation |
| 19 | ITSelect | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Dropdown |
| 20 | ITSearchSelect | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Async searchable |
| 21 | ITDatePicker | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Single + range mode |
| 22 | ITTimePicker | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | 12h/24h |
| 23 | ITCalendar | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Calendar + events |
| 24 | ITSlideToggle | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | iOS toggle (file: slide/) |
| 25 | ITDropfile | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Drag & drop upload |
| 26 | ITFormBuilder | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Dynamic form gen |
| 27 | ITFormHeader | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Modal/form header |
| 28 | ITTextarea | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Multi-line input |
| 29 | ITCheckbox | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Checkbox + indeterminate |
| 30 | ITRadio | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Radio group |
| 31 | ITSlider | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Range slider |
| 32 | ITPopover | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Floating panel |
| 33 | ITText | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Typography wrapper |
| 34 | ITSegmentedControl | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | iOS segmented |
| 35 | ITTripleFilter | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | 3-state filter |

### Visualización Datos (4 componentes)

| # | Componente | Render | Controles | Dark Mode | Responsive | Storybook | Notas |
|---|-----------|:---:|:---:|:---:|:---:|:---:|-------|
| 36 | ITTable | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Basic table |
| 37 | ITDataTable | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Server-side table |
| 38 | ITSearchTable | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Search + sort + edit |
| 39 | ITStatCard | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Metric card |
| 40 | ITImage | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Image with fallback |
| 41 | ITBadget | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Status tags |

### Navegación & Control (3 componentes)

| # | Componente | Render | Controles | Dark Mode | Responsive | Storybook | Notas |
|---|-----------|:---:|:---:|:---:|:---:|:---:|-------|
| 42 | ITStepper | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Wizard indicator |
| 43 | ITPagination | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Page navigation |
| 44 | ITProgress | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Bar + circle |

### Feedback & Sistema (7 componentes)

| # | Componente | Render | Controles | Dark Mode | Responsive | Storybook | Notas |
|---|-----------|:---:|:---:|:---:|:---:|:---:|-------|
| 45 | ITDialog | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Modal dialog |
| 46 | ITDrawer | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Slide-in panel |
| 47 | ITToast | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Notification |
| 48 | ITLoader | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Loading indicators |
| 49 | ITSkeleton | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Placeholder |
| 50 | ITEmptyState | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Empty placeholder |
| 51 | ITConfirmDialog | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Confirm modal |
| 52 | ITTooltip | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Info tooltip |
| 53 | ITThemeProvider | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Theme root |

**Total: 53 entries** (algunos duplicados por error de lista, revisar)

---

## 🐛 Issues conocidos / Pendientes

### 1. ITStack — Demo items aparecen blancos

**Síntoma**: Los `StackDemoItem` (gradient primary-500 → primary-700) no se ven, aparecen blancos.

**Causa probable**: El `ITThemeProvider` inyecta variables CSS en `:root` que pueden estar siendo sobrescritas dentro del sandbox con `data-theme="light"` por las reglas `[data-theme="light"] .bg-white { background-color: #ffffff !important; }` del theme provider. La combinación de specificity puede hacer que las utilities `from-primary-500 to-primary-700` no resuelvan correctamente.

**Fix propuesto**:
```tsx
// Antes (puede fallar por CSS var cascade):
<div className="bg-gradient-to-br from-primary-500 to-primary-700">

// Después (inline style, sin dependencia de CSS vars):
<div style={{
  background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))'
}}>
```

O usar colores Tailwind nativos directamente:
```tsx
<div className="bg-gradient-to-br from-blue-500 to-blue-700">
```

### 2. Storybook + ITSlider `showValue` prop

El `ITSlider` no tiene `showValue`. Si alguna showcase lo usa, fallará en TypeScript.

### 3. ESLint warnings pre-existentes

Hay errores pre-existentes en varios componentes (any types, unused imports) que NO son introducidos por esta migración.

---

## 🔧 Plan de acción recomendado

### Fase 1: Diagnóstico
- [ ] Levantar `npm run dev` y `npm run storybook`
- [ ] Verificar consola: errores de TypeScript, warnings de React, errores de Tailwind
- [ ] Listar todos los errores recurrentes por componente

### Fase 2: ITStack visual fix
- [ ] Reemplazar `bg-gradient-to-br from-primary-500 to-primary-700` por `style={{ background: 'linear-gradient(...)' }}` en `StackDemoItem`
- [ ] Verificar que se ve el gradient correctamente
- [ ] Documentar el patrón en `.agents/skills/component-gen/SKILL.md`

### Fase 3: Verificación componente por componente
- [ ] Pasar por los 52 componentes en orden
- [ ] Llenar la checklist marcando ✅ / ⚠️ / ❌
- [ ] Para cada ⚠️ o ❌: crear issue en este documento con fix propuesto

### Fase 4: Build y lint final
- [ ] `npx tsc --noEmit` → 0 errores
- [ ] `npm run lint` → revisar warnings
- [ ] `npm run build` → verificar bundle
- [ ] `npm run build-storybook` → verificar Storybook build

### Fase 5: Documentación
- [ ] Actualizar este MD con el estado final ✅ de cada componente
- [ ] Agregar a `DOCUMENTACION_DETALLADA_COMPONENTES.txt` cualquier nueva nota
- [ ] Commit por componente o por categoría

---

## 📝 Convenciones para llenar este checklist

```text
- ✅: Funciona perfecto
- ⚠️: Funciona pero tiene nota (ej: "warning de consola no bloqueante")
- ❌: No funciona (escribir abajo el error exacto)
- ⏳: Aún no verificado
```

### Para issues ❌:
```text
❌ ITButton - "TypeError: Cannot read property 'padding' of undefined"
   Fix: theme.button.colorName is undefined when color="custom"
   PR: #XXX
```

---

## 🚀 Quick commands

```bash
# Dev app (localhost:5173)
npm run dev

# Storybook (localhost:6006)
npm run storybook

# Build
npm run build
npm run build-storybook

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Build library
npm run build
```
