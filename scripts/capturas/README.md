# Capturas de producto

Utilidades para tomar las capturas **reales** que se muestran en la sección
«Mis Productos» de la home (`src/showcases/HomeShowcase.tsx`, datos en
`src/showcases/productos.ts`, imágenes en `public/productos/`).

Son herramientas manuales: no corren en CI ni forman parte del bundle.

| Archivo | Para qué |
|---|---|
| `shot-electron.mjs` | Captura una app Electron por CDP (una pantalla o varias pestañas) |
| `capture-tui.py` | Corre una app de terminal en un pty y guarda su salida ANSI cruda |
| `render-terminal.mjs` | Convierte esa salida en un PNG con marco de ventana de terminal |
| `mock-api.py` | API mínima (127.0.0.1:8899) para la demo del cliente HTTP |
| `demo/.http/` | Colección de ejemplo del cliente HTTP usada en las capturas |

Requisitos: `playwright` (ya está en las devDependencies) y Python 3. El
renderizado de la terminal usa xterm.js desde jsDelivr, así que necesita red.

---

## Agente Puerto Nuevo (app Electron)

La app tiene que estar corriendo con depuración remota. Ojo con
`ELECTRON_RUN_AS_NODE`: en un entorno que lo tenga puesto, Electron arranca
como Node y no abre ventana.

```bash
cd ~/DEV/PTNV/AXZY_PTNV_SERVERS/agente
env -u ELECTRON_RUN_AS_NODE pnpm exec electron . \
  --remote-debugging-port=9222 --no-sandbox --disable-gpu \
  --user-data-dir=/tmp/agente-captura
```

- `--user-data-dir` apunta a una carpeta escribible: la app guarda ahí su
  `config.json` (con la carpeta del repo) y su lock de instancia única. Si el
  sandbox no deja escribir en `~/Library/Application Support`, la app se cierra
  sola al no poder tomar el lock.
- Para el asistente de instalación (primera pantalla) hay que arrancar otra
  instancia con otro `--user-data-dir` y otro puerto, y un `config.json` cuya
  carpeta no sea un repo (así la app muestra el asistente).

Capturar (pestañas por texto exacto):

```bash
node scripts/capturas/shot-electron.mjs 9222 public/productos/agente \
  "Asistente" "Inicio" "Ajustes"
# una sola pantalla:
node scripts/capturas/shot-electron.mjs 9223 public/productos/agente-asistente.png
```

## axzy (CLI + TUI)

```bash
# 1. API de demo
python3 scripts/capturas/mock-api.py &

# 2. Proyecto de demo (el tema no se versiona: se elige al vuelo)
cd scripts/capturas/demo && axzy set theme dracula && cd -

# 3. TUI: abre users/, ejecuta el request y deja el último cuadro en el buffer
python3 scripts/capturas/capture-tui.py /tmp/axzy-tui.bin 132 34 scripts/capturas/demo axzy \
  sleep:2 send:j sleep:0.5 send:l sleep:0.5 send:j send:j send:j sleep:0.4 'send:\r' sleep:4 kill

# 4. Salida de la CLI (sin TUI)
python3 scripts/capturas/capture-tui.py /tmp/axzy-cli.bin 118 32 scripts/capturas/demo "axzy /users/list" sleep:3 kill

# 5. Render
node scripts/capturas/render-terminal.mjs /tmp/axzy-tui.bin public/productos/axzy-tui.png 132 34 "axzy — cliente HTTP de terminal"
node scripts/capturas/render-terminal.mjs /tmp/axzy-cli.bin public/productos/axzy-cli.png 118 32 "axzy"
```

Notas:

- **Cuidado con las comillas.** `send:\r` sin comillas llega como la letra `r`
  (bash se come el backslash) y el Enter nunca se envía: el request no corre.
  Va siempre entre comillas simples.
- `kill` mata el proceso sin restaurar la pantalla, para que el último cuadro
  quede en el buffer que se renderiza.
- En macOS el pty suele estar bloqueado por el sandbox del agente: hay que
  correr `capture-tui.py` con acceso completo.

## Optimizar antes de commitear

Los PNG de Chromium son 2x y pesan ~900 KB en total. Conviene pasarlos a WebP
(queda en ~250 KB, sin diferencia visible):

```bash
python3 - <<'EOF'
from PIL import Image
import glob, os
for f in glob.glob("public/productos/*.png"):
    im = Image.open(f).convert("RGB")
    if im.width > 1200:
        im = im.resize((1200, round(im.height * 1200 / im.width)), Image.LANCZOS)
    im.save(f.replace(".png", ".webp"), "WEBP", quality=88, method=6)
    os.remove(f)
EOF
```
