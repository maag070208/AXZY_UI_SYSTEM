---
version: "2.0"
name: "AXZY Console — Sandbox & Portfolio"
description: "Hoja técnica editorial para una librería de componentes: tipografía grande, filetes de 1px, mono para metadatos y un solo acento. Deriva del perfil 'Portfolio Dev Full-Stack' (dark + cyan + mono) y lo aterriza en los tokens de AXZY UI System."
colors:
  ink: "#0B0D10"
  surface: "#FFFFFF"
  surface-dark: "#111827"
  canvas: "#FAFAFA"
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
    border: "1px solid {colors.line}"
    rounded: "{rounded.lg}"
---

# AXZY Console

## Overview

Especificación visual para las **dos superficies propias** del proyecto: el **sandbox** (`#ui-system`,
vitrina de los componentes) y el **portafolio** (raíz `/`). No es un tema de la librería publicada —
es la cara que ve quien abre `pnpm dev`.

**Idea (v2):** el portafolio es una **hoja técnica**, no una landing. Se lee como el datasheet de un
sistema: titular display grande, banda de métricas separada por filetes de 1px, stack en filas
etiquetadas y productos con uno destacado. El ornamento es la jerarquía tipográfica y la retícula;
**no hay papel tapiz, no hay tarjetas flotando sobre un lienzo gris, no hay una caja por dato**.

Lo que quedó fuera de la v1 (y no vuelve):

- El velo de retícula (`it-blueprint`) como fondo decorativo: era ruido, no estructura. Se eliminó la
  clase de `src/dev.css`.
- Rejillas de 27–28 tiles idénticas (sopa de logos): el stack es una tabla de categorías.
- Cuatro tarjetas iguales de métricas: ahora es una banda con filetes.
- Cuadrículas 2×2 de productos idénticas: hay un producto destacado + rejilla de tres.
- Cualquier string de relleno ("Elevate", "Potencia tu…").

Densidad, varianza y movimiento (escala 1–10, del perfil de referencia adaptado):

- **Densidad:** 3/10 — aireada; el dato va donde se necesita, no en cajas.
- **Varianza:** 5/10 — asimetría real: masthead 2 columnas, destacado 5/7, rejilla 3.
- **Movimiento:** 3/10 — una sola cascada de entrada (`it-reveal`) en el masthead, hovers discretos
  y una línea de progreso de lectura en la cabecera.

- **Estilo:** editorial técnico, dark-first, plano.
- **Keywords:** hoja, filete, mono, un acento, jerarquía, dato.
- **Tema:** claro y oscuro completos (ambos obligatorios).
- **Origen:** v1 (`AXZY Blueprint`), corregida tras la revisión de diseño.

## Colors

Un solo acento. El neutro es la escala `slate` de Tailwind; el acento es el `primary` de AXZY.

| Rol | Token | Uso |
| --- | --- | --- |
| Acento | `primary-700` | Relleno de CTA con texto blanco, texto de acento chico, foco |
| Acento (oscuro) | `primary-500` | Acento sobre superficie oscura |
| Acento grande | `primary-600` / `primary-400` | Solo titulares ≥ 24px |
| Tinta | `slate-900` / `white` (dark) | Titulares, cifras |
| Texto | `slate-700` / `slate-200` (dark) | Cuerpo, filas de datos |
| Muted | `slate-500` / `slate-400` (dark) | Metadatos, labels mono |
| Filete | `slate-200` / `slate-800` (dark) | Bordes de 1px, separadores |
| Superficie | `white` / `slate-900` (dark) | Tarjetas de producto |
| Lienzo | `#FAFAFA` / `#0B0D10` (dark) | Fondo de la hoja |
| Señal | `success-500` | Solo el punto de disponibilidad |

Reglas de color:

- El acento **no** rellena tarjetas grandes; se usa en bordes, texto y un solo CTA por bloque.
- Sin degradados. Sin velos de retícula. El único degradado permitido es el scrim sobre una captura.
- **Contraste (AA, verificado con axe):** la paleta resuelta en runtime es más clara que el hex
  nominal (`--color-primary` = `#06b6d4` → `primary-600` = `#059bb4`, 3.3:1 con blanco). Por eso:
  relleno con texto blanco → `primary-700`; texto acento chico sobre blanco → `primary-700`;
  sobre `slate-50` → `primary-800`; en oscuro → `primary-500` (el `primary-400` oscuro se queda en
  4.1–4.5:1). Los tokens `primary-600`/`text-primary-400` se reservan a texto grande (≥ 24px).
- Nunca bajes el contraste de un metadato para "que se vea sutil": usa tamaño, peso o mono.

## Typography

Tres roles, sin excepciones:

| Rol | Familia | Uso |
| --- | --- | --- |
| Display | **Bricolage Grotesque** (600–800, tracking tight) | `h1`/`h2`, cifras grandes |
| Body | **IBM Plex Sans** (400–600) | Párrafos, listas, UI |
| Mono | **JetBrains Mono** (400–700) | Índices, labels, contadores, datos, código |

Reglas:

- **Todo label / índice / metadato va en mono**, mayúsculas, `tracking-[0.14em]`, `10–11px`.
- Titulares `font-display` con `-tracking-[0.02em]…[-0.03em]`; el `h1` llega a **62px** en escritorio.
- Cuerpo máx. ~62–70ch, `leading-[1.75]`, 15.5–17px (nunca 13px para texto de lectura).
- Clases: `font-display`, `font-sans`, `font-mono` (registradas en `src/dev.css`, solo sandbox).

Escala: masthead `clamp(38px, 7vw, 62px)`, h2 `26–32px`, cierre `32–44px`, cuerpo `15.5–17px`,
label `10–11px`, dato de banda `30px`.

## Layout

- **Contención:** máx. **1180px** centrado (`HOJA` en `portfolioUi`), padding lateral 20/32/40px.
- **Retícula:** CSS Grid. Masthead `1fr + retrato`, destacado `5/7`, rejilla de productos 3 columnas,
  banda de métricas 4 columnas con filetes verticales.
- **Ritmo:** secciones `py-12`/`py-16`; el filete superior de cada sección es lo que separa, no una caja.
- **Filetes:** `border-slate-200 dark:border-slate-800` (constante `FILETE`). Un filete separa bloques
  del mismo nivel; nunca se combinan filete y sombra en el mismo borde.
- **Móvil:** todo colapsa a 1 columna; la banda de métricas pasa a 2×2 y el índice de la cabecera a
  una fila desplazable. Sin scroll horizontal.
- **z-index:** base 0 / sticky 100 / overlay 200 / modal 300 / toast 500 (ver `theme.ts`).
- Nunca `h-screen` → `min-h-[100dvh]`. Anclas con `scroll-mt` que descuente la cabecera (2 filas en móvil).

## Elevation & Motion

- **Profundidad:** plana. Superficie + filete de 1px. Sombra **solo** al hover de tarjeta de producto:
  `hover:shadow-[0_8px_30px_-12px_rgba(15,23,42,0.25)]`.
- **Física:** ease-out, 150–260ms. Predecible.
- **Entrada:** una sola cascada `it-reveal` (`opacity 0→1` + `translateY(16px→0)`, 420ms, pasos de 70ms)
  y **solo en el masthead**.
- **Progreso:** `BarraProgreso` (2px de acento) al pie de la cabecera sticky.
- **Hover:** cambio de color de borde/texto + `-translate-y-0.5`. Nunca escala > 1.02.
- **Reduced motion:** todo se desactiva con `@media (prefers-reduced-motion: reduce)`.

## Shapes

Radio base **10px** (`rounded-[10px]`); 14px solo en tarjetas de producto y 16px en contenedores de
sección del sandbox. Píldoras (`rounded-full`) solo para la etiqueta de tipo y el punto de estado.

## Components

- **Masthead:** rail mono (disponibilidad + ubicación + LinkedIn) → `h1` display en dos tonos →
  bio (máx. 62ch) → CTAs → retrato como documento (borde 1px, sin tarjeta, alineado al pie).
- **Banda de métricas:** `<dl>` con 2/4 columnas y filetes; label mono arriba, cifra display de 30px.
- **Encabezado de sección:** `NN — LABEL` mono + `h2` display + subtítulo muted; acciones a la derecha.
- **Datasheet de stack:** filas `categoría | tecnologías` con filete; íconos de 16px decorativos
  (`alt=""`, `aria-hidden`) y nombres en texto. El buscador filtra filas y el contador cierra el bloque.
- **Producto destacado:** tarjeta 5/7 — copy con 3 bullets, stack y CTAs a la izquierda; captura
  enmarcada con pie mono a la derecha.
- **Tarjeta de producto:** portada 16/10 con filete inferior, índice mono + etiqueta de tipo, nombre,
  descripción a 3 líneas, stack y acciones. Sin capturas → placeholder con ícono + tipo (no caja vacía).
- **Detalle (`#proyecto/<id>`):** ficha con índice `NN / MM`, filas con filete para "qué resuelve" y
  "ficha técnica", galería con miniaturas y navegación anterior/siguiente como bloque con filete.
- **CTA que navega = enlace real:** `EnlaceBoton` (`src/showcases/portfolioUi.tsx`) rinde un `<a>` con
  aspecto de botón. Nunca envuelvas un `ITButton` en un `<a>`: interactivos anidados (fallo
  `nested-interactive` en axe).
- **Controles de cabecera:** `ControlSegmentado`, `SelectorIdioma` y `SelectorTema` en `src/sandbox/controls.tsx`, usados por la cabecera del portafolio **y** por la barra del sandbox (mismo estado, dos sitios). Idioma: contexto `SandboxLocaleProvider` (persiste en `localStorage`). Tema: `useITThemeSafe()` → claro / oscuro / sistema. Sustituyen a `ITSegmentedControl`, cuya opción inactiva queda en 4.34:1 y falla AA. Los tres miden 28px de alto (target ≥ 24px) y el activo es `primary-700` con texto blanco.
- **Piezas compartidas del portafolio** (dev-only, `src/showcases/portfolioUi.tsx`): `EYEBROW`, `CARD`,
  `CARD_HOVER`, `CHIP`, `EnlaceBoton`, `Etiqueta`, `BotonAccion`, `BarraProgreso`, `SaltarContenido`,
  `VolverArriba`. `ITBadget` e `ITButton color="secondary"` quedan fuera del portafolio: con la paleta
  por defecto no llegan a 4.5:1 (2.6:1 y 3.7:1 sobre tarjeta oscura).
- **Tile técnica / terminal / empty state:** igual que la v1 (caja cuadrada con borde 1px; código en
  `slate-950` con `cyan-400` solo ahí; empty state con icono + CTA).
- **Navegación del sandbox:** la de la librería (ITLayout/ITTopBar). Ítem activo = acento.

## Sandbox (`#ui-system`)

Las tres piezas del sandbox siguen la misma hoja que el portafolio:

- **Chrome** (`src/App.tsx`): barra con marca, dos enlaces reales (UI System / Portafolio), buscador, y
  los controles de idioma y tema. **Sin datos inventados**: se quitó la campana de notificaciones y el
  usuario de mentira ("Alex Dev / alex@axzy.dev"); el sello de versión sale de `package.json` inyectado
  por Vite (`__APP_VERSION__`, `define`) en vez de un literal que se quedaba viejo.
- **Landing** (`src/sandbox/LandingShowcase.tsx`): masthead (sello `v… · Tailwind v4 · MIT` + GitHub y
  npm + titular display + CTAs + comando de instalación), banda de métricas con filetes, catálogo como
  datasheet (`NN | familia + chips | nº →`) y quickstart con código + "incluido de fábrica".
- **Página de componente** (`src/showcases/ShowcaseLayout.tsx`): cabecera con filete, vitrina
  (vista previa / código) como superficie plana **sin los tres puntitos de ventana falsa**, panel lateral
  con Propiedades/Docs, y galería separada por filete. Los encabezados no saltan niveles (la galería se
  rotula con un `<p>` mono, no con `h4`) y la página **no añade otro `<main>`/`<aside>`**: los landmarks
  son los del `ITLayout`.
  - `demoAncho="completo"` da toda la anchura a la vitrina y baja el panel: obligatorio para demos que
    son un layout entero (`ITLayout`, pantallas de ejemplo), que antes se recortaban dentro de la caja.
  - `controls` es opcional: las páginas de ejemplo/receta usan la vitrina a ancho completo sin panel.
- **Páginas de contenido**: la puesta en marcha (`GettingStartedShowcase`) y la ayuda (`HelpShowcase`)
  siguen el mismo patrón — masthead con sello real, pasos numerados con filete y bloques de código
  compartidos; fuera los degradados decorativos, los blobs y los cuadros de color por paso.

Kit compartido: `src/sandbox/ui.tsx` (tipografía de metadatos, superficies, CTA, `Etiqueta`,
`SectionHeading`, `EnlaceMono`), `src/sandbox/controls.tsx` (idioma + tema), `src/sandbox/locale.tsx`
(contexto de idioma) e `src/sandbox/icons.tsx` (íconos de familia, iguales en la barra y en la landing).

## Auditoría

`pnpm audit:sandbox` (script en `scripts/audit-sandbox.mjs`) recorre las 45 páginas en una sesión de
Chrome y reporta violaciones de axe con el set completo, contenido recortado (`overflow: hidden` que
corta) y el contenido de la pestaña de Docs. `--strict` falla si algo aparece. El estado y la lista
priorizada de pendientes viven en `docs/sandbox-audit.md`.

## Deuda saldada en la librería

Dos fallos que el sandbox destapó y que se corrigieron en los componentes publicados (sin cambios de API
salvo el prop nuevo):

- `ITSidebar`: ponía `aria-controls` a un submenú que **no existe en el DOM** cuando el riel está
  colapsado → referencia ARIA inválida en las seis familias (`aria-valid-attr-value`, crítica). Ahora
  solo se declara cuando el submenú está renderizado.
- `ITSlideToggle`: no había forma de darle nombre accesible (`role="switch"` sin `aria-label`). Se añaden
  `label` y `ariaLabel` (opcionales) y los 50 interruptores de demo del sandbox pasan su etiqueta visible.

## Do's & Don'ts

**Do**

- Do un titular grande de verdad: si el `h1` no domina la página, no hay jerarquía.
- Do filetes de 1px para separar bloques y para las filas de datos.
- Do índices y labels en mono, mayúsculas, tracking amplio.
- Do asimetría: masthead 1fr+retrato, destacado 5/7, rejilla 3.
- Do un solo CTA relleno por bloque; el resto, enlaces de texto.
- Do enlace de salto al contenido y «volver arriba» en páginas largas.
- Do `min-h-[100dvh]`. Do contraste AA mínimo; foco visible con anillo del acento.

**Don't**

- Don't fondos con retícula, ruido o degradado decorativo.
- Don't una caja por dato: si es una tabla, es una tabla.
- Don't rejillas de logos idénticos ni 2×2 de tarjetas iguales.
- Don't sombras más fuertes que `0 8px 24px rgba(0,0,0,0.10)` (y solo al hover).
- Don't emojis en la UI — solo el set de iconos (`react-icons`).
- Don't ámbar/rojo/violeta como decoración; son semánticos (warning/danger/info).
- Don't copy de relleno ("Elevate", "Seamless", "Potencia tu…").
- Don't romper el tema: componentes siempre con tokens (`primary-*`, `slate-*`), nunca hex suelto
  (excepción: el lienzo `#FAFAFA` / `#0B0D10` de la hoja).

## Mapping a AXZY

| Concepto | Implementación |
| --- | --- |
| Fuentes | `index.html` (Google Fonts) + `src/dev.css`. Se declaran **dos veces a propósito**: en `@theme` (para que Tailwind genere `font-sans/mono/display`) y en un `:root` **sin capa**, porque el tema por defecto de Tailwind vive en `@layer theme` y, al emitirse después, pisaba los valores: la hoja acababa renderizando en las fuentes del sistema. Solo sandbox. |
| Íconos de stack | `public/tech-icons/*.svg` vía `src/showcases/techIcons.ts`. Devicon (MIT); `appium.svg` de Simple Icons (CC0). Se normaliza el tamaño óptico con un `scale` interno (los glifos no llenan igual el `viewBox`). |
| Lienzo | `bg-[#fafafa] dark:bg-[#0b0d10]` en el wrapper de `src/App.tsx`. |
| Filetes | `border-slate-200 dark:border-slate-800` (constantes `FILETE`). |
| Entrada | `.it-reveal` + `--it-delay` (`src/dev.css`). |
| Acento | `primary-700` (claro) / `primary-500` (oscuro); `primary-600`/`primary-400` solo en titulares. |
| Radio | `rounded-[6px]` (chips), `rounded-[10px]` (base), `rounded-[14px]` (tarjetas). |
| Superficie | `bg-white dark:bg-slate-900` + `border-slate-200 dark:border-slate-800`. |
| Piezas | `src/showcases/portfolioUi.tsx` (dev-only). |
| Chrome del sandbox | `src/sandbox/controls.tsx` (idioma + tema) y `src/sandbox/locale.tsx` (contexto de idioma compartido). |

## Use Case

Sandbox de componentes (`#ui-system`) y portafolio (`/`) de AXZY UI System. Ambos dev-only; nunca
afectan al bundle publicado (`src/index.ts` no importa `src/showcases/**` ni `src/sandbox/**`).
