import React, { useCallback, useEffect, useMemo, useState } from "react";
import { leerNodo, listarNodos } from "./demoApp/nodeTree";
import {
  ITBadget,
  ITButton,
  ITSelect,
  ITFlex,
  ITJSONEditor,
  ITStack,
  ITText,
  formatPath,
  parsePartialSchema,
  useITTranslation,
  validateSchema,
  type JsonEngineIssue,
} from "../index";

/** Páginas que se pueden inspeccionar en la documentación. */
const PAGINAS = ["inicio", "usuarios", "pedidos", "productos", "reportes"] as const;

/** Pasos del recorrido de un esquema, para la columna de explicación. */
const PASOS = [
  { id: "carga", titulo: "1 · Cargar", detalle: "El host pide el JSON. El motor nunca hace red: recibe texto." },
  { id: "parseo", titulo: "2 · Parsear", detalle: "`parsePartialSchema` tolera un JSON a medias; lo cerrado ya se puede pintar." },
  { id: "validacion", titulo: "3 · Validar", detalle: "`validateSchema` revisa versión, `id` y `content` contra el catálogo." },
  { id: "datos", titulo: "4 · Resolver", detalle: "`{ i18n }` → texto, `{ $source }` → datos, `{ action }` → acción del host." },
  { id: "render", titulo: "5 · Pintar", detalle: "`ITSchemaRenderer` monta componentes de la lista blanca y aísla fallos." },
];

/**
 * Documentación viva del motor: el JSON de una página real a la izquierda y su
 * recorrido (parseo, validación, datos, render) a la derecha.
 *
 * El editor es el propio `ITJSONEditor` del sistema, así que lo que se documenta
 * es lo que se usa.
 *
 * @example
 * // Ruta: #demo/app/docs
 * <DemoJsonDocs onOpenPage={(pagina) => onNavigate(pagina)} />
 */
/** Guía de arquitectura: quién manda en cada capa, con los archivos reales. */
const GUIA: { titulo: string; parrafos: string[]; codigo?: string }[] = [
  {
    titulo: "1 · Dos capas, no una",
    parrafos: [
      "El host (TSX, dev-only) es dueño del chrome: monta ITLayout e ITPage, traduce etiquetas, resuelve iconos, datos y acciones. Vive en src/showcases/DemoJsonDashboard.tsx.",
      "El motor (src/json-renderer/) pinta el cuerpo de cada página desde JSON. Nunca toca red, funciones ni nodos React.",
      "El JSON describe: public/demo/app/layout.json (marca), public/demo/app/routes.json (rutas y menú) y public/demo/app/<página>.json (cuerpo).",
    ],
  },
  {
    titulo: "2 · Dónde está ITLayout (y por qué no en el JSON)",
    parrafos: [
      "DemoJsonDashboard.tsx:356 monta <ITLayout topBar sidebar>; :398 monta <ITPage>; :340 monta <ITSchemaRenderer>.",
      "ITLayout no puede ser un nodo del esquema: topBar.logo es un ReactNode, navigationItems[].action es una función y icon es un componente. El motor prohíbe las tres.",
      "Por eso el JSON nombra (icon: \"users\", page: \"usuarios\", query: {estado: \"Activo\"}) y el host resuelve con el registro ICONOS y el árbol que sale de routes.json.",
    ],
    codigo: '<ITLayout\n  topBar={{ logo: <AxzyLogo/>, logoText: shell.brand.text }}\n  sidebar={{ navigationItems: arbol.map(\u2026) }}\n>',
  },
  {
    titulo: "3 · Añadir una ruta",
    parrafos: [
      "Edita public/demo/app/routes.json y añade una ruta con path, page y nav. Sin nav, la ruta existe pero no aparece en el menú. No hay que tocar TSX.",
      "Si la página no tiene JSON propio, apunta page a una existente: la verás navegar igual.",
    ],
    codigo: '{\n  "id": "ajustes",\n  "path": "/ajustes",\n  "page": "ajustes",\n  "nav": { "label": { "i18n": "sandbox.app.nav.ajustes" }, "icon": "box" }\n}',
  },
  {
    titulo: "4 · Sub-items que filtran de verdad",
    parrafos: [
      "Un sub-item es una ruta hija con query. Navegar a ella cambia la dirección (?estado=) y la tabla se refiltra.",
      "Sin query, el sub-item es la ruta base del grupo. Nada de botones decorativos.",
    ],
    codigo: '{\n  "id": "u-activos",\n  "page": "usuarios",\n  "query": { "estado": "Activo" },\n  "nav": { "label": { "i18n": "sandbox.app.sub.activos" } }\n}',
  },
  {
    titulo: "5 · Iconos y marca",
    parrafos: [
      "El JSON usa un nombre simbólico (home, users, cart, box, chart, book). El registro ICONOS del host decide qué componente es.",
      "Para añadir un icono: una línea en ICONOS. El JSON no cambia.",
      "La marca sale de layout.brand (logo y texto) y de AxzyLogo en el host.",
    ],
  },
  {
    titulo: "6 · Una pantalla que NO es JSON",
    parrafos: [
      "Soportado a propósito: hay pantallas que necesitan código (un editor, un mapa, un flujo con estado propio). El motor no las debe impedir.",
      "Ruta 1: página del host. Crea el componente, regístralo en DEMO_APP_PAGES y en routes.json, y renderízalo en lugar de ITSchemaRenderer cuando la página sea esa.",
      "Ruta 2: híbrido. El esquema pinta el 90% y un nodo con acción abre la parte TSX (diálogo, editor, visor). Es lo que hace el CRUD con su formulario.",
      "Ruta 3: contenido embebido. El host expone un componente del catálogo que internamente ya es TSX (ITDataTable, ITJSONEditor). El esquema solo lo nombra.",
      "La regla: si la pantalla necesita funciones, es del host; si solo describe, es JSON.",
    ],
    codigo: '// DemoJsonDashboard.tsx\n{ pagina === "docs" ? <DemoJsonDocs /> : cuerpo }',
  },
  {
    titulo: "7 · axzy.json: lo global en un archivo",
    parrafos: [
      "public/axzy.json configura lo que no es pantalla: paleta, densidad, radios, sombras, apariencia y el botón de tema.",
      "Se mezcla con los defaults y se recorta (densidad 0.5–1.5, radio 0–24, sombra 0–3); un valor inválido no rompe, se ignora.",
      "Se aplica una vez en el ITThemeProvider del host, así que cambiarlo reconfigura todo el sistema: tablas, diálogos, sidebar.",
      "Pruebas: src/sandbox/axzyConfig.test.ts cubre defaults, recortes, tipos raros y mezcla de paleta.",
    ],
    codigo: '{\n  "$schema": "axzy/config",\n  "version": 1,\n  "density": 0.98,\n  "radius": 10,\n  "shadow": 2,\n  "appearance": "soft",\n  "showFab": true,\n  "theme": { "primary": "#06b6d4" }\n}',
  },
  {
    titulo: "8 · Cambiar una página",
    parrafos: [
      "Cada página es un archivo JSON: title, description y content (nodos del catálogo).",
      "El componente tiene que estar en el catálogo (src/json-renderer/catalog/axzyCatalog.ts); si no, el validador devuelve JR010.",
      "Edita el JSON, guarda y recarga. El motor valida en vivo y aquí mismo ves el veredicto.",
    ],
  },
];

export const DemoJsonDocs: React.FC = () => {
  const { t } = useITTranslation();
  const [pagina, setPagina] = useState<(typeof PAGINAS)[number]>("usuarios");
  const [texto, setTexto] = useState("");
  const [aviso, setAviso] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;
    fetch(`/demo/app/${pagina}.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((json) => {
        if (!cancelado) setTexto(json);
      })
      .catch((fallo: unknown) => {
        if (!cancelado) setAviso(fallo instanceof Error ? fallo.message : String(fallo));
      });
    return () => {
      cancelado = true;
    };
  }, [pagina]);

  /** El árbol y el veredicto se recalculan con cada tecla. */
  const analisis = useMemo(() => {
    if (!texto.trim()) return null;
    const parcial = parsePartialSchema(texto);
    const informe = validSchema(parcial.tree);
    return { parcial, informe };
  }, [texto]);

  /** El validador trabaja con el árbol; nunca lanza. */
  function validSchema(tree: unknown) {
    try {
      return validateSchema(tree);
    } catch (fallo) {
      return {
        verdict: "invalid" as const,
        errors: [{ code: "JR020", severity: "error" as const, message: String(fallo), path: "" }],
        warnings: [] as JsonEngineIssue[],
        pendingNodes: 0,
      };
    }
  }

  const [vista, setVista] = useState<"guia" | "json">("guia");
  const [ruta, setRuta] = useState<number[]>([]);
  const arbol = analisis?.parcial.tree;
  const nodos = useMemo(() => listarNodos(arbol), [arbol]);
  const visible = ruta.length > 0 ? leerNodo(arbol, ruta) : null;
  const enNodo = ruta.length > 0;

  const copiar = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(texto);
      setAviso(t("sandbox.app.docs.copied"));
      window.setTimeout(() => setAviso(null), 2000);
    } catch {
      setAviso(t("sandbox.app.docs.copyError"));
    }
  }, [texto, t]);

  const veredicto = analisis?.informe.verdict ?? "invalid";
  const errores = analisis?.informe.errors ?? [];
  const avisos = analisis?.informe.warnings ?? [];

  const guia = (
    <div className="flex flex-col gap-4">
      {GUIA.map((seccion) => (
        <section key={seccion.titulo} className="rounded-[8px] border border-slate-200 p-4 dark:border-slate-800">
          <ITText as="h3" className="font-display !text-[15px] !font-bold">
            {seccion.titulo}
          </ITText>
          {seccion.parrafos.map((parrafo) => (
            <ITText key={parrafo} as="p" muted className="mt-2 !text-[12.5px] leading-relaxed">
              {parrafo}
            </ITText>
          ))}
          {seccion.codigo && (
            <pre className="mt-3 overflow-x-auto rounded-[6px] border border-slate-200 bg-slate-50 p-3 font-mono text-[11px] leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              <code>{seccion.codigo}</code>
            </pre>
          )}
        </section>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <ITFlex align="center" gap={2}>
        <ITButton label="Guía de arquitectura" size="sm" variant={vista === "guia" ? "filled" : "outlined"} color={vista === "guia" ? "primary" : "gray"} onClick={() => setVista("guia")} />
        <ITButton label="Esquema en vivo" size="sm" variant={vista === "json" ? "filled" : "outlined"} color={vista === "json" ? "primary" : "gray"} onClick={() => setVista("json")} />
      </ITFlex>
      {vista === "guia" ? guia : (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      {/* ── Columna izquierda: el JSON real, editable ───────────────────── */}
      <ITStack direction="column" spacing={3}>
        <ITFlex align="center" justify="between" wrap="wrap" gap={2}>
          <ITFlex align="center" gap={2} wrap="wrap">
            <ITText as="span" muted className="font-mono !text-[10px] uppercase !tracking-[0.12em]">
              {t("sandbox.app.docs.pick")}
            </ITText>
            {PAGINAS.map((item) => (
              <ITButton
                key={item}
                label={item}
                size="sm"
                variant={item === pagina ? "filled" : "outlined"}
                color={item === pagina ? "primary" : "gray"}
                onClick={() => setPagina(item)}
              />
            ))}
          </ITFlex>
          <ITFlex align="center" gap={2}>
            <ITBadget
              label={veredicto}
              size="sm"
              color={veredicto === "valid" ? "success" : veredicto === "partial" ? "warning" : "danger"}
            />
            <ITText
              as="button"
              onClick={copiar}
              className="cursor-pointer font-mono !text-[10px] uppercase !tracking-[0.12em] text-primary-700 dark:text-primary-400"
            >
              {t("sandbox.app.docs.copy")}
            </ITText>
          </ITFlex>
        </ITFlex>

        <ITFlex align="center" justify="between" wrap="wrap" gap={2}>
          <ITSelect
            name="nodo"
            label={t("sandbox.app.docs.node")}
            value={ruta.length > 0 ? JSON.stringify(ruta) : "raiz"}
            options={[
              { value: "raiz", label: t("sandbox.app.docs.whole") },
              ...nodos.map((nodo) => ({ value: JSON.stringify(nodo.ruta), label: nodo.etiqueta })),
            ]}
            onChange={(evento) => setRuta(evento.target.value === "raiz" ? [] : (JSON.parse(evento.target.value) as number[]))}
          />
          <ITText as="span" muted className="font-mono !text-[10px] uppercase !tracking-[0.12em]">
            {enNodo ? t("sandbox.app.docs.readOnly") : t("sandbox.app.docs.editable")}
          </ITText>
        </ITFlex>

        <ITJSONEditor
          value={enNodo ? JSON.stringify(visible, null, 2) : texto}
          onChange={(siguiente) => {
            if (!enNodo) setTexto(siguiente);
          }}
          readOnly={enNodo}
          height={460}
          showLineNumbers
        />

        <ITText as="span" muted className="font-mono !text-[10px] uppercase !tracking-[0.12em]">
          {`${errores.length} errores · ${avisos.length} avisos · ${analisis?.informe.pendingNodes ?? 0} nodos pendientes`}
        </ITText>

        {(errores.length > 0 || avisos.length > 0) && (
          <ITStack direction="column" spacing={1}>
            {[...errores, ...avisos].slice(0, 6).map((issue, indice) => (
              <ITFlex key={`${issue.code}-${indice}`} align="start" gap={2}>
                <ITBadget label={issue.code} size="sm" color={issue.severity === "error" ? "danger" : "warning"} />
                <ITText as="span" className="!text-[11px]">
                  {`${issue.message}${issue.path ? ` — ${formatPath(String(issue.path).split(".").filter(Boolean))}` : ""}`}
                </ITText>
              </ITFlex>
            ))}
          </ITStack>
        )}
      </ITStack>

      {/* ── Columna derecha: el recorrido del esquema ───────────────────── */}
      <ITStack direction="column" spacing={3}>
        <ITText as="h3" className="font-display !text-[16px] !font-bold">
          {t("sandbox.app.docs.steps")}
        </ITText>
        {PASOS.map((paso) => (
          <div
            key={paso.id}
            className="rounded-[8px] border border-slate-200 px-3 py-2.5 dark:border-slate-800"
          >
            <ITText as="p" className="font-mono !text-[10px] uppercase !tracking-[0.12em] text-primary-700 dark:text-primary-400">
              {paso.titulo}
            </ITText>
            <ITText as="p" className="mt-1 !text-[12px] leading-relaxed" muted>
              {paso.detalle}
            </ITText>
          </div>
        ))}

        <div className="rounded-[8px] border border-slate-200 px-3 py-2.5 dark:border-slate-800">
          <ITText as="p" className="font-mono !text-[10px] uppercase !tracking-[0.12em] text-slate-500 dark:text-slate-400">
            {t("sandbox.app.docs.rules")}
          </ITText>
          <ul className="mt-2 space-y-1.5">
            {[
              t("sandbox.app.docs.rule1"),
              t("sandbox.app.docs.rule2"),
              t("sandbox.app.docs.rule3"),
            ].map((regla) => (
              <li key={regla} className="flex gap-2 text-[12px] leading-snug text-slate-600 dark:text-slate-300">
                <span aria-hidden="true" className="mt-[6px] block h-[3px] w-[3px] shrink-0 rounded-full bg-primary-500" />
                {regla}
              </li>
            ))}
          </ul>
        </div>

        {aviso && (
          <ITText as="span" className="font-mono !text-[10px] uppercase !tracking-[0.12em] text-primary-700 dark:text-primary-400">
            {aviso}
          </ITText>
        )}
      </ITStack>
    </div>
      )}
    </div>
  );
};

export default DemoJsonDocs;
