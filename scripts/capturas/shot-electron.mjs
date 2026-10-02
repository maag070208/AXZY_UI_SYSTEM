// Captura la interfaz real de una app Electron conectándose por CDP.
//
// La app tiene que estar corriendo con depuración remota, por ejemplo:
//   cd ~/DEV/PTNV/AXZY_PTNV_SERVERS/agente
//   env -u ELECTRON_RUN_AS_NODE pnpm exec electron . \
//     --remote-debugging-port=9222 --no-sandbox --disable-gpu \
//     --user-data-dir=<carpeta escribible>
//
// Uso:
//   node scripts/capturas/shot-electron.mjs <puerto> <salida|prefijo> [texto a clickear ...]
//
// Sin textos: guarda una sola captura en <salida>.
// Con textos: clickea cada uno (pestañas del panel) y guarda <prefijo>-<texto>.png
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const [puerto = "9222", destino = "captura.png", ...clicks] = process.argv.slice(2);

const navegador = await chromium.connectOverCDP(`http://127.0.0.1:${puerto}`);
const contexto = navegador.contexts()[0];
const page =
  contexto.pages().find((p) => !p.url().startsWith("devtools://")) ?? contexto.pages()[0];

await page.waitForLoadState("domcontentloaded");
// La app consulta estado real (docker, scripts) al abrir: damos margen.
await page.waitForTimeout(3000);

const guardar = async (ruta) => {
  mkdirSync(dirname(ruta), { recursive: true });
  await page.screenshot({ path: ruta });
  console.log("guardado", ruta);
};

if (clicks.length === 0) {
  await guardar(destino);
} else {
  for (const texto of clicks) {
    const objetivo = page.getByText(texto, { exact: true }).first();
    if (await objetivo.count()) await objetivo.click();
    else console.log("  (no encontré)", texto);
    await page.waitForTimeout(2600);
    const slug = texto.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "-");
    await guardar(`${destino}-${slug}.png`);
  }
}

// No cerramos el navegador: cerraría la app.
process.exit(0);
