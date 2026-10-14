---
version: "1.0"
name: "AXZY Blueprint — Sandbox & Portfolio"
description: "Superficie de ingeniería para una librería de componentes: dark-first, plano, retícula técnica, mono para metadatos, un solo acento. Deriva del perfil 'Portfolio Dev Full-Stack' (dark + cyan + mono) y lo aterriza en los tokens de AXZY UI System."
colors:
  ink: "#0B0D10"
  surface: "#101216"
  surface-alt: "#FAFAFA"
  line: "#E2E8F0"
  line-dark: "#1E293B"
  accent: "#2563EB"
  accent-soft: "#3B82F6"
  signal: "#22D3EE"
  text: "#0F172A"
  text-muted: "#64748B"
typography:
  display:
    fontFamily: Bricolage Grotesque
    fontWeight: 700
  body:
    fontFamily: IBM Plex Sans
    fontSize: 1rem
    fontWeight: 400
  mono:
    fontFamily: JetBrains Mono
    fontWeight: 500
rounded:
  sm: 6px
  md: 10px
  lg: 14px
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
  card:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.line-dark}"
    rounded: "{rounded.lg}"
---

# AXZY Blueprint

## Overview

Especificación visual para las **dos superficies propias** del proyecto: el **sandbox** (`#ui-system`,
vitrina de los componentes) y el **portafolio** (raíz `/`). No es un tema de la librería publicada —
es la cara que ve quien abre `pnpm dev`.

**Idea:** la retícula de un plano técnico. Superficies planas, bordes de 1px, tipografía monoespaciada
para todo lo que es *metadato* (eyebrows, etiquetas, versiones, contadores) y un único acento azul
usado con avaricia. Nada de degradados decorativos, nada de sombras pesadas, nada de emojis en la UI:
el ornamento es la estructura.

Densidad, varianza y movimiento (escala 1–10, del perfil de referencia adaptado):

- **Densidad:** 4/10 — aireada pero técnica.
- **Varianza:** 4/10 — asimetría contenida (split-screen, zig-zag), nunca 3 columnas iguales.
- **Movimiento:** 3/10 — sutil: una entrada escalonada, hovers discretos.

- **Estilo:** Engineering / blueprint, minimal, dark-first.
- **Keywords:** retícula, mono, metadatos, un acento, plano, técnico.
- **Tema:** claro y oscuro completos (ambos obligatorios).
- **Origen:** derivado de `design (1).md` ("Portfolio Dev Full-Stack").

## Colors

Un solo acento. El neutro es la escala `slate` de Tailwind; el acento es el `primary` de AXZY.

| Rol | Token | Uso |
| --- | --- | --- |
| Acento | `primary-600` (#2563EB) | Foco, enlaces, indicador activo, 1 botón por bloque |
| Acento suave | `primary-500` / `primary-400` (dark) | Texto de acento sobre superficie |
| Tinta | `slate-900` / `white` (dark) | Titulares, valores |
| Texto | `slate-700` / `slate-200` (dark) | Cuerpo |
| Muted | `slate-500` / `slate-400` (dark) | Metadatos, hints |
| Línea | `slate-200` / `slate-800` (dark) | Bordes de 1px, separadores |
| Superficie | `white` / `slate-900` (dark) | Tarjetas |
| Fondo | `slate-50` / `slate-950` (dark) | Lienzo |
| Señal | `cyan-400` (#22D3EE) | **Solo** dentro de bloques terminal/código |

Reglas de color:

- El acento **no** rellena tarjetas grandes; se usa en bordes, texto y un solo CTA por bloque.
- Sin degradados decorativos. El único degradado permitido es un velo de retícula (`it-blueprint`).
- Saturación de acento contenida (≤ 80%). Nunca dos acentos compitiendo.

## Typography

Tres roles, sin excepciones:

| Rol | Familia | Uso |
| --- | --- | --- |
| Display | **Bricolage Grotesque** (600–800, tracking tight) | `h1`/`h2`, cifras grandes |
| Body | **IBM Plex Sans** (400–600) | Párrafos, listas, UI |
| Mono | **JetBrains Mono** (400–700) | Eyebrows, etiquetas, contadores, código, IDs |

Reglas:

- **Todo eyebrow / etiqueta / metadato va en mono**, mayúsculas, `tracking-[0.18em]`, `text-[11px]`.
- Titulares con `font-display` y `-tracking-[0.02em]`; nunca en mono.
- Cuerpo máx. ~68ch. `leading-relaxed` en párrafos.
- Clases: `font-display`, `font-sans`, `font-mono` (registradas en `src/dev.css`, solo sandbox).

Escala: hero `clamp(2.25rem, 5vw, 3.5rem)`, h1 `2rem`, h2 `1.25rem`, body `1rem/1.6`, small `0.875rem`.

## Layout

- **Contención:** máx. 1280px centrado, padding lateral `1.5rem`.
- **Retícula:** CSS Grid. Secciones asimétricas; el hero es split-screen (texto izq., visual der.).
- **Ritmo:** base 8px; separación entre secciones `clamp(3.5rem, 7vw, 6rem)`.
- **Rompe-retícula:** el eyebrow lleva un guion mono (`▍` o `//`) pegado a la línea de retícula.
- **Móvil:** todo colapsa a 1 columna < 768px; sin scroll horizontal.
- **z-index:** base 0 / sticky 100 / overlay 200 / modal 300 / toast 500 (ver `theme.ts`).
- Nunca `h-screen` → `min-h-[100dvh]`.

## Elevation & Motion

- **Profundidad:** casi plana. Superficies + borde 1px (`slate-200` / `slate-800`). Sombra **solo**
  al hover: `hover:shadow-[0_8px_30px_-12px_rgba(15,23,42,0.25)]`. Nada más pesado que
  `0 8px 24px rgba(0,0,0,0.10)`.
- **Física:** ease-out, 180–260ms. Predecible.
- **Entrada:** `opacity 0→1` + `translateY(16px→0)` en 420ms, cascada de 70ms por item
  (clase `it-reveal` + `--it-delay`).
- **Hover:** cambio de color de borde + sombra sutil + `-translate-y-0.5`. Nunca escala > 1.02.
- **Reduced motion:** todo se desactiva con `@media (prefers-reduced-motion: reduce)`.

## Shapes

Radio base **10px** (`rounded-[10px]`), máx. `rounded-2xl` (16px) en contenedores de sección.
Se acabó el `rounded-3xl` decorativo. Píldoras (`rounded-full`) solo para badges/chips y contadores.

## Components

- **CTA primario:** relleno `primary-600`, texto blanco, `rounded-[10px]`, `font-semibold`. Hover: 8% más oscuro + lift 1px. Un solo CTA primario por bloque.
- **CTA secundario/ghost:** borde 1px, texto tinta, fondo transparente. Hover: `bg-slate-100`/`slate-800`.
- **Tarjeta:** superficie + borde 1px + `rounded-[14px]`. Sin sombra en reposo; sombra al hover.
- **Cabecera de sección:** eyebrow mono (`// CATÁLOGO`) + `h2` display + subtítulo muted.
- **Tile técnica:** caja cuadrada, borde 1px, icono centrado + label mono `[11px]`. Hover: borde acento.
- **Código / terminal:** fondo `slate-950`, texto `slate-200`, `font-mono`. Acento de señal (`cyan-400`) solo aquí.
- **Empty state:** composición con icono, texto muted y un CTA. Sin ilustraciones decorativas.
- **Navegación:** la del sandbox (ITLayout/ITTopBar). Ítem activo = acento. Se respeta el tema.

## Do's & Don'ts

**Do**

- Do un único acento por vista, usado como señal (borde/foco/CTA puntual).
- Do eyebrows y metadatos en mono, mayúsculas, tracking amplio.
- Do superficies planas con borde de 1px y sombra solo al hover.
- Do entrada escalonada (`it-reveal`) una sola vez por página.
- Do `min-h-[100dvh]` en vez de `h-screen`.
- Do contraste AA mínimo; foco visible con anillo del acento.

**Don't**

- Don't degradados decorativos (fuera de la retícula `it-blueprint`).
- Don't sombras más fuertes que `0 8px 24px rgba(0,0,0,0.10)`.
- Don't fondos blanco puro (`#FFFFFF`) en superficies grandes — usa off-white/superficie.
- Don't emojis en la UI — solo el set de iconos (`react-icons`).
- Don't 3 columnas de igual ancho; zig-zag o grid asimétrico.
- Don't ámbar/rojo/violeta como decoración; son semánticos (warning/danger/info).
- Don't copy de relleno ("Elevate", "Seamless", "Potencia tu…").
- Don't romper el tema: componentes siempre con tokens (`primary-*`, `slate-*`), nunca hex suelto.

## Mapping a AXZY

| Concepto | Implementación |
| --- | --- |
| Fuentes | `index.html` (Google Fonts) + `@theme` en `src/dev.css` (`--font-display/sans/mono`). Solo sandbox. |
| Retícula | `.it-blueprint` (`src/dev.css`): grid 1px con máscara radial. |
| Entrada | `.it-reveal` + `--it-delay` (`src/dev.css`). |
| Acento | `primary-600` (texto/borde/foco) y `primary-500` (bloques pequeños). |
| Radio | `rounded-[10px]` / `rounded-[14px]` / `rounded-2xl`. |
| Superficie | `bg-white dark:bg-slate-900` + `border border-slate-200 dark:border-slate-800`. |

## Use Case

Sandbox de componentes (`#ui-system`) y portafolio (`/`) de AXZY UI System. Ambos dev-only; nunca
afectan al bundle publicado (`src/index.ts` no importa `src/showcases/**` ni `src/sandbox/**`).
