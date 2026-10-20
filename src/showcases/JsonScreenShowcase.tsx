import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaBolt, FaBug, FaCheck, FaTrashAlt } from "react-icons/fa";
import {
  ITAlert,
  ITBadget,
  ITButton,
  ITCard,
  ITFlex,
  ITJSONEditor,
  ITSchemaRenderer,
  ITText,
  type JsonEngineIssue,
  type ScreenSchema,
  parsePartialSchema,
  axzyCatalogTypes,
} from "../index";
import { ShowcaseLayout } from "./ShowcaseLayout";

/** Esquema de ejemplo: usa el catálogo real y muestra permisos y estado. */
const EJEMPLO: ScreenSchema = {
  version: 1,
  id: "laboratorio",
  title: "Pantalla de ejemplo",
  content: [
    {
      type: "ITFlex",
      props: { align: "center", justify: "between", wrap: "wrap", gap: 3 },
      children: [
        {
          type: "ITFlex",
          props: { align: "center", gap: 2 },
          children: [
            { type: "ITBadget", props: { label: "Motor", color: "primary" } },
            { type: "ITText", props: { muted: true }, text: "Esquema interpretado en vivo" },
          ],
        },
        {
          type: "ITButton",
          props: { label: "Acción declarada", color: "primary", size: "sm", onClick: { action: "saludar" } },
        },
      ],
    },
    {
      type: "ITGrid",
      props: { container: true, spacing: 3 },
      children: [
        {
          type: "ITGrid",
          props: { item: true, md: 6 },
          children: [
            {
              type: "ITCard",
              props: { title: "Listo para pintar" },
              children: [
                { type: "ITText", text: "Este árbol viene de un JSON, no de TSX." },
                { type: "ITProgress", props: { value: 64, max: 100, size: "sm" } },
              ],
            },
          ],
        },
        {
          type: "ITGrid",
          props: { item: true, md: 6 },
          children: [
            {
              type: "ITAlert",
              props: { variant: "info", title: "Casos cubiertos" },
              children: [{ type: "ITText", text: "Si algo no está en el catálogo, se avisa y no se pinta." }],
            },
          ],
        },
      ],
    },
  ],
};

/** Texto inicial del editor: el esquema anterior, formateado. */
const TEXTO_INICIAL = JSON.stringify(EJEMPLO, null, 2);

/** Velocidad del stream simulado (caracteres por tick). */
const CHUNK = 6;

/**
 * Laboratorio del motor de pantallas declarativas.
 *
 * Izquierda: el esquema en `ITJSONEditor`. Derecha: lo que pinta el motor. El
 * botón «emitir como stream» escribe el esquema carácter a carácter para ver el
 * render progresivo y comprobar que lo pendiente no se pinta a medias.
 *
 * @example
 * // Ruta del sandbox: #ui-system/feedback/jsonscreen
 */
export const JsonScreenShowcase: React.FC = () => {
  const [texto, setTexto] = useState(TEXTO_INICIAL);
  const [streaming, setStreaming] = useState(false);
  const [emitido, setEmitido] = useState(TEXTO_INICIAL.length);
  const [avisos, setAvisos] = useState<JsonEngineIssue[]>([]);
  const timer = useRef<number | null>(null);

  /** Estado del esquema: mientras se emite, se parsea en modo tolerante. */
  const estado = useMemo(() => {
    if (!streaming) {
      try {
        const completo = JSON.parse(texto) as ScreenSchema;
        return { tree: completo, status: "complete" as const, pending: 0, roto: false };
      } catch {
        return { tree: null, status: "complete" as const, pending: 0, roto: true };
      }
    }
    const parcial = parsePartialSchema(texto);
    return {
      tree: parcial.tree,
      status: parcial.status,
      pending: parcial.pendingNodes,
      roto: parcial.broken,
    };
  }, [texto, streaming]);

  /** Detiene el stream y limpia el temporizador. */
  const detener = useCallback(() => {
    if (timer.current !== null) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
    setStreaming(false);
  }, []);

  useEffect(() => () => detener(), [detener]);

  /** Emite el esquema carácter a carácter, como haría un modelo. */
  const emitirStream = useCallback(() => {
    detener();
    setAvisos([]);
    setEmitido(0);
    setTexto("");
    setStreaming(true);

    const total = TEXTO_INICIAL;
    let cursor = 0;

    timer.current = window.setInterval(() => {
      cursor = Math.min(total.length, cursor + CHUNK);
      setTexto(total.slice(0, cursor));
      setEmitido(cursor);
      if (cursor >= total.length) {
        window.clearInterval(timer.current as number);
        timer.current = null;
        setStreaming(false);
      }
    }, 24);
  }, [detener]);

  /** Registro de acciones del host: el esquema solo puede pedir estos nombres. */
  const resolveAction = useCallback(
    () => () => {
      window.alert("Acción declarada ejecutada por el host.");
    },
    []
  );

  const registrarAviso = useCallback((issue: JsonEngineIssue) => {
    setAvisos((previos) =>
      previos.some((item) => item.code === issue.code && item.path === issue.path)
        ? previos
        : [...previos, issue].slice(-8)
    );
  }, []);

  const codigo = `<ITSchemaRenderer
  schema={parsePartialSchema(texto).tree}
  onIssue={(issue) => registrar(issue)}
  resolveAction={() => actions[accion]}
  pendingFallback={<ITSkeleton />}
/>`;

  return (
    <ShowcaseLayout
      title="Motor de pantallas"
      description="ITSchemaRenderer interpreta un esquema JSON contra un catálogo de componentes con lista blanca. Pinta mientras el esquema llega por trozos, avisa con código y ruta, y aísla los nodos que fallan."
      demo={
        <div className="grid w-full gap-4 xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
          <div className="min-w-0">
            <ITCard title="Esquema (JSON)">
              <ITJSONEditor value={texto} onChange={setTexto} height={420} readOnly={streaming} />
            </ITCard>
          </div>
          <div className="min-w-0">
            <ITCard title="Pantalla resultante">
              <div className="min-h-[420px]">
                {estado.roto && !estado.tree ? (
                  <ITAlert variant="error" title="El esquema no es JSON válido">
                    Corrige el texto de la izquierda para volver a pintar.
                  </ITAlert>
                ) : (
                  <ITSchemaRenderer
                    schema={estado.tree}
                    onIssue={registrarAviso}
                    resolveAction={resolveAction}
                    pendingFallback={<ITText muted>·</ITText>}
                  />
                )}
              </div>

              <ITFlex align="center" gap={2} wrap="wrap" className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-800">
                <ITButton
                  label={streaming ? "Emitiendo…" : "Emitir como stream"}
                  icon={<FaBolt size={10} />}
                  size="sm"
                  color="primary"
                  onClick={emitirStream}
                  disabled={streaming}
                />
                <ITButton
                  label="Documentación del motor"
                  icon={<FaBolt size={10} />}
                  size="sm"
                  variant="text"
                  color="gray"
                  onClick={() => {
                    window.location.hash = "#demo/app/docs";
                  }}
                />
                <ITButton
                  label="Ver panel (sistema completo)"
                  icon={<FaBolt size={10} />}
                  size="sm"
                  color="primary"
                  onClick={() => {
                    window.location.hash = "#demo/app/inicio";
                  }}
                />
                <ITButton
                  label="Ver portafolio de demo"
                  icon={<FaBolt size={10} />}
                  size="sm"
                  variant="outlined"
                  color="gray"
                  onClick={() => {
                    window.location.hash = "#demo";
                  }}
                />
                <ITButton
                  label="Reiniciar"
                  icon={<FaTrashAlt size={10} />}
                  size="sm"
                  variant="outlined"
                  color="gray"
                  onClick={() => {
                    detener();
                    setTexto(TEXTO_INICIAL);
                    setEmitido(TEXTO_INICIAL.length);
                    setAvisos([]);
                  }}
                />
                <ITText
                  as="span"
                  className="font-mono !text-[10px] uppercase !tracking-[0.12em]"
                  muted
                >
                  {streaming
                    ? `stream ${emitido}/${TEXTO_INICIAL.length} · ${estado.pending} nodos pendientes`
                    : `esquema completo · ${axzyCatalogTypes.length} tipos en el catálogo`}
                </ITText>
              </ITFlex>

              {avisos.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  <ITFlex align="center" gap={1.5}>
                    <FaBug size={10} className="text-amber-500" />
                    <ITText
                      as="span"
                      className="font-mono !text-[10px] uppercase !tracking-[0.12em]"
                      muted
                    >
                      Avisos del motor
                    </ITText>
                  </ITFlex>
                  {avisos.map((aviso) => (
                    <ITFlex
                      key={`${aviso.code}-${aviso.path}`}
                      align="start"
                      gap={2}
                      className="rounded-[6px] border border-slate-200 px-2 py-1.5 dark:border-slate-800"
                    >
                      <ITBadget
                        label={aviso.code}
                        color={aviso.severity === "error" ? "danger" : "warning"}
                        size="sm"
                      />
                      <div className="min-w-0">
                        <p className="text-[11px] leading-snug text-slate-700 dark:text-slate-300">{aviso.message}</p>
                        <p className="font-mono text-[10px] text-slate-500 dark:text-slate-400">{aviso.path || "raíz"}</p>
                      </div>
                    </ITFlex>
                  ))}
                </div>
              )}

              {!streaming && avisos.length === 0 && (
                <ITFlex align="center" gap={1.5} className="mt-3">
                  <FaCheck size={10} className="text-emerald-500" />
                  <ITText as="span" className="font-mono !text-[10px] uppercase !tracking-[0.12em]" muted>
                    Sin avisos: el esquema cabe entero en el catálogo
                  </ITText>
                </ITFlex>
              )}
            </ITCard>
          </div>
        </div>
      }
      code={codigo}
      doc={{
        summary: "Ejecuta un esquema JSON contra el catálogo de componentes, con lista blanca y avisos.",
        description:
          "El esquema se trata como entrada no confiable: un tipo fuera del catálogo no rompe la pantalla, una prop prohibida se ignora con aviso y un componente que lanza queda aislado. Durante el stream, los nodos pendientes no se pintan a medias.",
        examples: [
          '<ITSchemaRenderer schema={{ version: 1, id: "demo", content: { type: "ITText", text: "Hola" } }} />',
          '<ITSchemaRenderer schema={parsePartialSchema(tokens).tree} pendingFallback={<ITSkeleton />} />',
          '<ITSchemaRenderer schema={schema} onIssue={(issue) => console.warn(issue.code, issue.path)} />',
        ],
        props: [
          { name: "schema", type: "ScreenSchema | null", required: true, description: "Esquema de pantalla; admite árbol parcial." },
          { name: "catalog", type: "Catalog", default: "axzyCatalog", description: "Componentes y props permitidos." },
          { name: "limits", type: "Partial<EngineLimits>", default: "—", description: "Presupuesto de nodos, profundidad y tiempos." },
          { name: "resolveValue", type: "(value, path) => unknown", default: "—", description: "Resuelve referencias ($state, $param…)." },
          { name: "resolveAction", type: "(node, prop, action, path) => fn", default: "—", description: "Traduce acciones declaradas a handlers del host." },
          { name: "pendingFallback", type: "ReactNode", default: "—", description: "Qué pintar mientras un nodo está pendiente." },
          { name: "onIssue", type: "(issue) => void", default: "—", description: "Avisos con código y ruta." },
          { name: "className", type: "string", default: "—", description: "Clases del contenedor raíz." },
        ],
        notes: [
          `El catálogo de esta fase expone ${axzyCatalogTypes.length} tipos con lista blanca de props.`,
          "Códigos de aviso: JR010 tipo fuera del catálogo · JR011 prop ignorada · JR012 nodo aislado · JR013 presupuesto excedido.",
          "Pulsa «Emitir como stream» para ver el render progresivo: lo pendiente no se pinta a medias.",
        ],
      }}
    />
  );
};

export default JsonScreenShowcase;
