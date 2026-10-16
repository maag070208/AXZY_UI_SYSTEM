# axzydev · Kit de marca — guía de integración

Todo lo que necesitas para meter el nuevo branding en **axzy.dev**.
Abre `demo.html` en el navegador para ver las 4 animaciones antes de integrarlas.

## 1. Contenido del kit

| Carpeta | Qué hay | Para qué |
|---|---|---|
| `lottie/` | `axzydev-logo-intro-light.json`, `axzydev-logo-intro-dark.json`, `axzydev-icon-intro.json`, `axzydev-icon-loop.json` | Animaciones |
| `logos/svg/` | Logos y íconos en SVG (color, negro, blanco, sobre oscuro, sin fondo…) | Web, impresión |
| `logos/png/` | `logo-no-background`, `logo-on-dark`, `logo-no-tagline` (2000 px, transparentes) | Docs, slides, CV |
| `favicons/` | `favicon.svg`, `favicon.ico`, PNG 16/32/48, `apple-touch-icon`, `icon-192/512`, `icon-maskable-512`, `site.webmanifest` | Pestaña, móvil, PWA |
| `social/` | `og-image.png` (1200×630), `avatar-800.png` | Previews de enlaces, GitHub, LinkedIn |
| `code/` | `AxzyLogo.tsx` (React), `axzy-logo.component.ts` (Angular), `axzy-logo.js` (vanilla), `head-snippet.html`, `brand.css`, `tailwind.brand.js` | Código listo para pegar |

## 2. Las 12 animaciones (todas con fondo transparente)

Tres animaciones, cada una en los mismos tonos que tus logos originales (a color, negro y blanco):

| Animación | Duración | Comportamiento |
|---|---|---|
| **logo-intro** | 3.2 s, una vez | La llama aparece con rebote, se dibuja `>`, las letras suben una por una y el lema se «escribe» |
| **icon-intro** | 2.5 s, una vez | Solo el ícono, para navbar (en lugar del badge «AA») |
| **icon-loop** | 3 s, en bucle sin corte | La llama oscila y el cursor parpadea; sirve de loader |

| Tono | Logo | Ícono / loader | Cuándo |
|---|---|---|---|
| A color, fondo claro | `axzydev-logo-intro-light.json` | `axzydev-icon-intro.json`, `axzydev-icon-loop.json` (teal) | Fondos claros |
| A color, fondo oscuro | `axzydev-logo-intro-dark.json` | Los mismos teal, que también se ven bien sobre oscuro | Fondos oscuros |
| Navy (solo ícono) | — | `axzydev-icon-intro-navy.json`, `axzydev-icon-loop-navy.json` | Ícono sólido sobre fondos claros |
| Negro | `axzydev-logo-intro-black.json` | `axzydev-icon-intro-black.json`, `axzydev-icon-loop-black.json` | Monocromo sobre claro |
| Blanco | `axzydev-logo-intro-white.json` | `axzydev-icon-intro-white.json`, `axzydev-icon-loop-white.json` | Monocromo sobre oscuro o fotos |

Los fondos son transparentes: ponlos sobre el color que necesites. El `>_` es un recorte real, así que se ve igual sobre cualquier color.

## 3. Instalar

```bash
npm i lottie-web
```

1. Copia `lottie/` a la carpeta pública del proyecto: `public/lottie/` (Vite, Angular 18+) o `src/assets/lottie/` (Angular anterior, y ajusta `BASE` en el componente).
2. Copia estos archivos a la **raíz** de `public/`: `favicons/*` (todos), `social/og-image.png`.
3. Pega `code/head-snippet.html` dentro del `<head>` de `index.html`.

## 4. Usar el componente

### React
Copia `code/AxzyLogo.tsx` a `src/components/`.

```tsx
import { AxzyLogo } from './components/AxzyLogo';

<AxzyLogo variant="icon"   style={{ width: 40 }} />          {/* navbar */}
<AxzyLogo variant="logo"   style={{ width: 280 }} />         {/* hero / footer */}
<AxzyLogo variant="loader" style={{ width: 96 }} />          {/* carga */}
<AxzyLogo variant="logo" theme="black" />                    {/* negro: "light" | "dark" | "black" | "white" */}
<AxzyLogo variant="icon" tone="white" />                      {/* ícono: "teal" | "navy" | "black" | "white" */}
<AxzyLogo variant="logo" replayOnHover />                    {/* repite al pasar el mouse */}
```

### Angular (standalone)
Copia `code/axzy-logo.component.ts` a tu proyecto.

```html
<axzy-logo variant="icon" style="--axzy-logo-width: 40px" />
<axzy-logo variant="logo" style="--axzy-logo-width: 280px" />
<axzy-logo variant="logo" theme="black" />   <!-- light | dark | black | white -->
<axzy-logo variant="icon" tone="white" />     <!-- teal | navy | black | white -->
```
```ts
imports: [AxzyLogoComponent]
```

### Vanilla JS / otro framework
```js
import { mountAxzy } from './axzy-logo.js';
mountAxzy(document.querySelector('#logo'), { variant: 'logo' });
```

### Tema claro / oscuro
Tus botones de tema (claro, oscuro, sistema) ya están contemplados. Los componentes eligen `light` o `dark` leyendo, en este orden: el atributo `data-theme` de `<html>`, la clase `.dark` o `.light`, y la preferencia del sistema. Si cambias de tema, la animación se vuelve a cargar con la variante correcta. Si tu toggle usa otro mecanismo, pasa `theme="light" | "dark"` manualmente.

### Accesibilidad
Con «reducir movimiento» activado en el sistema, las animaciones no se reproducen y se muestra el logo final estático.

## 5. Dónde poner cada cosa en tu sitio

- **Navbar:** cambia el badge «AA» por `<AxzyLogo variant="icon" />` o por `logos/svg/icon-color.svg` si prefieres uno estático.
- **Hero:** el `logo-intro` es mucho para el hero, que ya tiene un titular grande. Mejor ponlo en el footer o en una pantalla de carga inicial.
- **Carga:** usa `loader` en la pantalla de carga o en los estados «cargando» de tu UI System.
- **Avatar:** sube `social/avatar-800.png` a GitHub, LinkedIn y otras redes. Con recorte circular la llama queda dentro.

## 6. Paleta

| Token | Hex | Uso |
|---|---|---|
| `--axzy-teal` | `#4598B1` | Llama, acento, «dev» sobre oscuro |
| `--axzy-teal-deep` | `#387D92` | Botones, «dev» sobre claro |
| `--axzy-navy` | `#1D2636` | Texto principal, fondo oscuro |
| `--axzy-paper` | `#FAFAFA` | Fondo claro |
| `--axzy-slate` | `#5A6475` | Texto secundario sobre claro |
| `--axzy-mist` | `#9AA6B8` | Texto secundario sobre oscuro |

Importa `code/brand.css` o copia `code/tailwind.brand.js` en `theme.extend.colors`.

## 7. Notas

- Las animaciones usan solo formas, máscaras y mattes, sin expresiones, así que funcionan con `lottie-web`, `lottie-react`, `ngx-lottie`, `dotLottie` y LottieFiles.
- Para previsualizar o recolorear: arrastra el `.json` a <https://lottiefiles.com/preview>.
- Si quieres un `.lottie` (comprimido) en lugar de `.json`, conviértelo en la herramienta de dotLottie. Pesan unos 4 KB (íconos) y 38 KB (logo).
- Los SVG del logo tienen el texto convertido a trazos, así que no necesitas instalar fuentes (Outfit y JetBrains Mono).
