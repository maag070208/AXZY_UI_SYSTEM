// Renderiza una captura ANSI cruda (de capture-tui.py) como PNG dentro de un
// marco de ventana de terminal, usando xterm.js en Chromium.
//
// Uso: node scripts/capturas/render-terminal.mjs <captura.bin> <salida.png> <cols> <filas> "<título>"
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const [bin, salida, cols, filas, titulo = "terminal"] = process.argv.slice(2);
if (!bin || !salida) {
  console.error("uso: render-terminal.mjs <captura.bin> <salida.png> <cols> <filas> \"<título>\"");
  process.exit(1);
}

const datos = readFileSync(bin).toString("base64");

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/css/xterm.css">
<style>
  html, body { margin:0; padding:0; background:#f1f5f9; }
  #marco { display:inline-block; border-radius:12px; overflow:hidden; background:#1e1f29;
           box-shadow:0 18px 40px rgba(15,23,42,.28); border:1px solid rgba(15,23,42,.35); }
  #barra { display:flex; align-items:center; gap:8px; padding:9px 12px; background:#2b2d3a; }
  .punto { width:11px; height:11px; border-radius:50%; }
  #titulo { font:500 12px -apple-system, "Segoe UI", sans-serif; color:#c8cad8; margin-left:6px; }
  #terminal { padding:10px 4px 12px 12px; }
  .xterm .xterm-viewport { background:transparent !important; }
</style></head>
<body>
<div id="marco">
  <div id="barra">
    <span class="punto" style="background:#ff5f57"></span>
    <span class="punto" style="background:#febc2e"></span>
    <span class="punto" style="background:#28c840"></span>
    <span id="titulo">${titulo}</span>
  </div>
  <div id="terminal"></div>
</div>
<script src="https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/lib/xterm.js"></script>
<script>
  const datos = Uint8Array.from(atob("${datos}"), (c) => c.charCodeAt(0));
  const term = new Terminal({
    cols: ${cols}, rows: ${filas}, convertEol: false, cursorBlink: false, scrollback: 0,
    fontFamily: 'SFMono-Regular, Menlo, Monaco, monospace', fontSize: 13.5, lineHeight: 1.25,
    theme: { background: '#1e1f29', foreground: '#f8f8f2', cursor: '#1e1f29' },
  });
  term.open(document.getElementById('terminal'));
  term.write(datos, () => { window.__listo = true; });
</script>
</body></html>`;

const navegador = await chromium.launch();
const page = await navegador.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
await page.setContent(html);
await page.waitForFunction(() => window.__listo === true, null, { timeout: 20000 });
await page.waitForTimeout(400);
await page.locator("#marco").screenshot({ path: resolve(salida) });
await navegador.close();
console.log("guardado", salida);
