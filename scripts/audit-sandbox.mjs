/**
 * Auditoría del sandbox (`#ui-system`): recorre las 45 páginas y reporta
 *   · violaciones de axe (reglas completas, no solo los tags WCAG),
 *   · contenido recortado dentro de su caja (`overflow: hidden` que corta),
 *   · el estado de la pestaña de documentación (props, ejemplos, notas).
 *
 * Es dev-only: no entra en el paquete publicado ni en `dist/`.
 *
 * Uso:
 *   pnpm build:app          # la auditoría sirve `dist-app/`
 *   pnpm audit:sandbox      # imprime la tabla y sale con 1 si hay violaciones
 *   CHROME_PATH=/ruta/a/chrome pnpm audit:sandbox
 *
 * Requiere un Chrome/Chromium con DevTools. Por defecto busca el de
 * `~/Library/Caches/ms-playwright` (macOS) o el de Google Chrome.
 */

import { createServer } from "node:http";
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { connect as netConnect } from "node:net";
import path from "node:path";
import crypto from "node:crypto";

const RAIZ = path.resolve(import.meta.dirname, "..");
const DIST = path.join(RAIZ, "dist-app");
const PUERTO_APP = Number(process.env.AUDIT_PORT ?? 4188);
const PUERTO_CDP = Number(process.env.AUDIT_CDP_PORT ?? 9444);
const ESTRICTO = process.argv.includes("--strict");

/**
 * Rutas del sandbox leídas de `src/sandbox/navigation.ts`.
 *
 * Se parsea con expresiones regulares en vez de importarlo porque el archivo es
 * TypeScript y este script corre con Node a secas (el fichero es data plana:
 * grupos con `id`, `label` y `subitems`).
 */
function rutasDelSandbox() {
  const fuente = readFileSync(path.join(RAIZ, "src/sandbox/navigation.ts"), "utf8");
  // `GROUP_SLUGS` también se menciona en un JSDoc: se busca la declaración real.
  const inicioSlugs = fuente.indexOf("export const GROUP_SLUGS");

  const slugs = Object.fromEntries(
    [...fuente.slice(inicioSlugs).matchAll(/(\w+):\s*"([a-z-]+)"/g)].map((m) => [m[1], m[2]]),
  );

  const grupos = [
    ...fuente
      .slice(0, inicioSlugs)
      .matchAll(/\n  \{\n    id: "(\w+)"[\s\S]*?subitems: \[([\s\S]*?)\n    \],/g),
  ];

  if (grupos.length === 0) throw new Error("No pude leer los grupos de navigation.ts");

  return grupos.flatMap(([, grupoId, cuerpo]) =>
    [...cuerpo.matchAll(/\{ id: "([\w-]+)"/g)].map(
      ([, itemId]) => `#ui-system/${slugs[grupoId] ?? grupoId}/${itemId}`,
    ),
  );
}

/** Servidor estático mínimo para `dist-app/`. */
function servirDist() {
  const tipos = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".pdf": "application/pdf",
    ".json": "application/json",
  };

  const server = createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://localhost");
    let file = path.join(DIST, decodeURIComponent(url.pathname));
    if (!existsSync(file) || statSync(file).isDirectory()) file = path.join(DIST, "index.html");
    res.writeHead(200, { "content-type": tipos[path.extname(file)] ?? "application/octet-stream" });
    createReadStream(file).pipe(res);
  });

  return new Promise((resolve) => server.listen(PUERTO_APP, () => resolve(server)));
}

/** Chrome/Chromium disponible en la máquina. */
function buscarChrome() {
  const candidatos = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].filter(Boolean);

  const encontrado = candidatos.find((c) => existsSync(c));
  if (!encontrado) throw new Error("No encontré Chrome. Pasa CHROME_PATH=/ruta/a/chrome");
  return encontrado;
}

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

/** Cliente CDP mínimo por WebSocket (sin dependencias). */
function conectar(wsUrl) {
  const { hostname, port, pathname } = new URL(wsUrl);
  const clave = randomBytes(16).toString("base64");

  return new Promise((resolve, reject) => {
    const socket = netConnect(Number(port), hostname, () => {
      socket.write(
        `GET ${pathname} HTTP/1.1\r\nHost: ${hostname}:${port}\r\nUpgrade: websocket\r\n` +
          `Connection: Upgrade\r\nSec-WebSocket-Key: ${clave}\r\nSec-WebSocket-Version: 13\r\n\r\n`,
      );
    });
    socket.on("error", reject);

    let buffer = Buffer.alloc(0);
    let listo = false;
    const pendientes = new Map();
    let id = 0;

    const enviar = (method, params = {}) =>
      new Promise((res) => {
        const mensaje = JSON.stringify({ id: ++id, method, params });
        pendientes.set(id, res);
        const payload = Buffer.from(mensaje);
        const mask = crypto.randomBytes(4);
        let cabecera;
        if (payload.length < 126) {
          cabecera = Buffer.from([0x81, 0x80 | payload.length]);
        } else if (payload.length < 65536) {
          cabecera = Buffer.alloc(4);
          cabecera[0] = 0x81;
          cabecera[1] = 0x80 | 126;
          cabecera.writeUInt16BE(payload.length, 2);
        } else {
          cabecera = Buffer.alloc(10);
          cabecera[0] = 0x81;
          cabecera[1] = 0x80 | 127;
          cabecera.writeBigUInt64BE(BigInt(payload.length), 2);
        }
        const enmascarado = Buffer.from(payload);
        for (let i = 0; i < enmascarado.length; i++) enmascarado[i] ^= mask[i % 4];
        socket.write(Buffer.concat([cabecera, mask, enmascarado]));
      });

    socket.on("data", (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);
      if (!listo) {
        const fin = buffer.indexOf("\r\n\r\n");
        if (fin === -1) return;
        listo = true;
        buffer = buffer.subarray(fin + 4);
        resolve({ enviar, cerrar: () => socket.destroy() });
      }
      while (buffer.length >= 2) {
        const len0 = buffer[1] & 0x7f;
        let offset = 2;
        let len = len0;
        if (len0 === 126) {
          if (buffer.length < 4) break;
          len = buffer.readUInt16BE(2);
          offset = 4;
        } else if (len0 === 127) {
          if (buffer.length < 10) break;
          len = Number(buffer.readBigUInt64BE(2));
          offset = 10;
        }
        if (buffer.length < offset + len) break;
        const opcode = buffer[0] & 0x0f;
        const payload = buffer.subarray(offset, offset + len);
        buffer = buffer.subarray(offset + len);
        if (opcode !== 0x1) continue;
        try {
          const msg = JSON.parse(payload.toString("utf8"));
          if (msg.id && pendientes.has(msg.id)) {
            pendientes.get(msg.id)(msg.result ?? msg.error);
            pendientes.delete(msg.id);
          }
        } catch {
          /* frame no JSON: se ignora */
        }
      }
    });
  });
}

/** Evaluación en la página con await de promesas. */
async function evaluar(ws, expression, { promesa = false } = {}) {
  const res = await ws.enviar("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: promesa,
  });
  return res?.result?.value;
}

const AXE_CDN = "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js";

const DETECTOR_RECORTES = `(() => {
  const malos = [];
  document.querySelectorAll("main *").forEach((el) => {
    if (el.children.length === 0) return;
    const cs = getComputedStyle(el);
    const d = el.scrollWidth - el.clientWidth;
    if (d > 24 && el.clientWidth > 160 && cs.overflowX === "hidden") {
      malos.push(String(el.className).slice(0, 60));
    }
  });
  return JSON.stringify(malos);
})()`;

const ASEGURAR_AXE = `(async () => {
  if (window.axe) return "ok";
  await new Promise((r) => {
    const s = document.createElement("script");
    s.src = "${AXE_CDN}";
    s.onload = r;
    s.onerror = r;
    document.head.appendChild(s);
    setTimeout(r, 8000);
  });
  return window.axe ? "ok" : "sin-axe";
})()`;

const CORRER_AXE = `(async () => {
  const res = await window.axe.run(document);
  return JSON.stringify(res.violations.map((v) => ({ id: v.id, n: v.nodes.length })));
})()`;

const MEDIR_DOCS = `(() => {
  const panel = [...document.querySelectorAll('[role="tabpanel"]')][0] || document;
  const props = panel.querySelectorAll("dl > div").length;
  const ejemplos = panel.querySelectorAll("pre").length;
  const notas = panel.querySelectorAll("ul li").length;
  return JSON.stringify({ props, ejemplos, notas, vacio: props === 0 && ejemplos === 0 });
})()`;

async function principal() {
  if (!existsSync(DIST)) {
    console.error("Falta dist-app/. Corre `pnpm build:app` antes de auditar.");
    process.exit(1);
  }

  const rutas = rutasDelSandbox();
  const servidor = await servirDist();
  const chrome = spawn(
    buscarChrome(),
    [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--hide-scrollbars",
      `--remote-debugging-port=${PUERTO_CDP}`,
      `--user-data-dir=/tmp/axzy-audit-${PUERTO_CDP}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--window-size=1440,1200",
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  let ws;
  try {
    let wsUrl = null;
    for (let i = 0; i < 60 && !wsUrl; i++) {
      try {
        const lista = await (await fetch(`http://127.0.0.1:${PUERTO_CDP}/json/list`)).json();
        wsUrl = lista.find((t) => t.type === "page")?.webSocketDebuggerUrl ?? null;
      } catch {
        /* Chrome aún arrancando */
      }
      if (!wsUrl) await dormir(250);
    }
    if (!wsUrl) throw new Error("Chrome no expuso DevTools");

    ws = await conectar(wsUrl);
    await ws.enviar("Page.enable");
    await ws.enviar("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 1200,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await ws.enviar("Page.navigate", { url: `http://127.0.0.1:${PUERTO_APP}/#ui-system` });
    await dormir(3500);

    const filas = [];
    for (const ruta of rutas) {
      await evaluar(ws, `location.hash = ${JSON.stringify(ruta)}`);
      await dormir(1100);

      const titulo = await evaluar(
        ws,
        `document.querySelector("h1")?.textContent.trim().slice(0, 34) ?? "(sin h1)"`,
      );
      await evaluar(ws, ASEGURAR_AXE, { promesa: true });

      const recortes = JSON.parse((await evaluar(ws, DETECTOR_RECORTES)) ?? "[]");
      const violaciones = JSON.parse((await evaluar(ws, CORRER_AXE, { promesa: true })) ?? "[]");

      const hayDocs = await evaluar(
        ws,
        `!!document.querySelector('[role="tab"]')`,
      );
      let docs = null;
      if (hayDocs) {
        await evaluar(ws, `document.querySelectorAll('[role="tab"]')[1]?.click()`);
        await dormir(400);
        docs = JSON.parse((await evaluar(ws, MEDIR_DOCS)) ?? "null");
      }

      filas.push({ ruta, titulo, recortes, violaciones, docs });
    }

    // ─── Informe ───
    const conViolaciones = filas.filter((f) => f.violaciones.length > 0);
    const conRecortes = filas.filter((f) => f.recortes.length > 0);
    const conDocs = filas.filter((f) => f.docs);

    console.log(`\nAuditoría del sandbox — ${filas.length} páginas\n`);
    console.log(`Recortes de contenido: ${conRecortes.length}`);
    for (const f of conRecortes) console.log(`   ${f.ruta}  →  ${f.recortes[0]}`);
    console.log(`\nPáginas con violaciones de axe: ${conViolaciones.length}`);
    for (const f of conViolaciones) {
      const resumen = f.violaciones.map((v) => `${v.id}×${v.n}`).join(", ");
      console.log(`   ${f.ruta.padEnd(46)} ${f.titulo.padEnd(26)} ${resumen}`);
    }
    console.log(`\nPáginas con pestaña de documentación: ${conDocs.length}`);
    for (const f of conDocs) {
      const { props, ejemplos, notas, vacio } = f.docs;
      console.log(
        `   ${f.titulo.padEnd(26)} props=${String(props).padEnd(3)} ejemplos=${String(ejemplos).padEnd(3)} notas=${String(notas).padEnd(3)}${vacio ? "  (VACÍA)" : ""}`,
      );
    }
    console.log("");

    if (ESTRICTO && (conViolaciones.length > 0 || conRecortes.length > 0)) process.exitCode = 1;
  } finally {
    ws?.cerrar();
    chrome.kill();
    servidor.close();
  }
}

principal().catch((error) => {
  console.error(error);
  process.exit(1);
});
