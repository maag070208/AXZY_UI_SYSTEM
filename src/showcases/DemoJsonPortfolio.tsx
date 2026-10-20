import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ITAlert,
  ITBadget,
  ITFlex,
  ITLoader,
  ITSchemaRenderer,
  ITText,
  parsePartialSchema,
  useITTranslation,
  validateSchema,
  type JsonEngineIssue,
  type NodeSchema,
  type SchemaValue,
  type ScreenSchema,
} from "../index";
import { PRODUCTOS } from "./productos";

/** Ruta del esquema servido como archivo estático. */
const SCHEMA_URL = "/demo/portfolio.schema.json";

/** Acciones declaradas por el esquema, implementadas por el host (este archivo). */
const ACCIONES = new Set(["ver-proyecto", "ir-seccion", "abrir-github", "abrir-linkedin", "abrir-correo", "volver", "abrir-panel"]);

/** Destinos que decide el host, nunca el esquema. */
const DESTINOS = {
  github: "https://github.com/maag070208",
  linkedin: "https://www.linkedin.com/in/maag070208/",
  correo: "mailto:aamaro@axzy.dev",
};

/** Props de la página de demostración. */
export interface DemoJsonPortfolioProps {
  /** Vuelve al showroom de componentes. */
  onBack: () => void;
  /** Navega al detalle de un proyecto del portafolio real. */
  onOpenProject: (id: string) => void;
  /** Abre el dashboard de demostración con páginas. */
  onOpenPanel: () => void;
}

/** Resultado de `{ i18n: key }` con parámetros opcionales. */
interface I18nRef {
  i18n: string;
  params?: Record<string, SchemaValue>;
}

/** `true` cuando un valor es una clave de traducción declarada por el esquema. */
function isI18nRef(value: unknown): value is I18nRef {
  return Boolean(value) && typeof value === "object" && typeof (value as I18nRef).i18n === "string";
}

/**
 * Portafolio de demostración pintado **solo** con el motor de pantallas.
 *
 * El host hace tres cosas y nada más:
 * 1. **Carga** el esquema desde `/demo/portfolio.schema.json` (un JSON real).
 * 2. **Valida** con `validateSchema` y avisa si algo no encaja.
 * 3. **Resuelve** dos cosas que el JSON no puede decidir: los textos (`i18n`) y
 *    las acciones por nombre. El esquema nunca navega ni abre URLs por su cuenta.
 *
 * @example
 * // Ruta: #demo
 * <DemoJsonPortfolio onBack={goToLanding} onOpenProject={goToProducto} />
 */
export const DemoJsonPortfolio: React.FC<DemoJsonPortfolioProps> = ({ onBack, onOpenProject, onOpenPanel }) => {
  const { t } = useITTranslation();
  const [esquema, setEsquema] = useState<ScreenSchema | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [avisos, setAvisos] = useState<JsonEngineIssue[]>([]);

  /** 1. El host carga el JSON; el motor nunca hace red. */
  useEffect(() => {
    let cancelado = false;
    fetch(SCHEMA_URL)
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        return respuesta.text();
      })
      .then((texto) => {
        if (cancelado) return;
        const parcial = parsePartialSchema(texto);
        setEsquema(parcial.tree);
      })
      .catch((fallo: unknown) => {
        if (cancelado) return;
        setError(fallo instanceof Error ? fallo.message : String(fallo));
      });
    return () => {
      cancelado = true;
    };
  }, []);

  /** 2. El host valida el esquema contra el catálogo y recoge los avisos. */
  const informe = useMemo(() => (esquema ? validateSchema(esquema) : null), [esquema]);

  /** 3a. El host resuelve textos: `{ i18n: "clave" }` → traducción. */
  const resolveValue = useCallback(
    (value: unknown): unknown => {
      if (isI18nRef(value)) {
        const params = value.params
          ? Object.fromEntries(
              Object.entries(value.params).map(([clave, dato]) => [
                clave,
                typeof dato === "number" || typeof dato === "string" ? dato : String(dato),
              ])
            )
          : undefined;
        return t(value.i18n, params);
      }
      return value;
    },
    [t]
  );

  /** 3b. El host resuelve acciones por nombre. Nada de URLs en el esquema. */
  const resolveAction = useCallback(
    (node: NodeSchema, _prop: string, action: unknown) => {
      const declarada = action as { action?: string; args?: Record<string, SchemaValue> } | undefined;
      const nombre = declarada?.action;
      if (!nombre) return undefined;

      if (!ACCIONES.has(nombre)) {
        // Acción desconocida: se avisa una vez y no se ejecuta nada.
        setAvisos((previos) =>
          previos.some((item) => item.code === "JR040" && item.path === `${nombre}`)
            ? previos
            : [
                ...previos,
                {
                  code: "JR040" as const,
                  severity: "warning" as const,
                  message: `La acción \`${nombre}\` no está registrada en el host.`,
                  path: node.id ?? nombre,
                },
              ]
        );
        return undefined;
      }

      return () => {
        switch (nombre) {
          case "volver":
            onBack();
            return;
          case "ver-proyecto": {
            const id = String(declarada?.args?.id ?? "");
            // El host comprueba que el proyecto existe: el esquema solo nombra.
            if (PRODUCTOS.some((producto) => producto.id === id)) onOpenProject(id);
            return;
          }
          case "ir-seccion": {
            const id = String(declarada?.args?.id ?? "");
            // El id lo declara el propio esquema y el kernel lo refleja en el DOM.
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
          }
          case "abrir-github":
            window.open(DESTINOS.github, "_blank", "noopener,noreferrer");
            return;
          case "abrir-linkedin":
            window.open(DESTINOS.linkedin, "_blank", "noopener,noreferrer");
            return;
          case "abrir-correo":
            window.location.href = DESTINOS.correo;
            return;
          case "abrir-panel":
            onOpenPanel();
            return;
          default:
            return;
        }
      };
    },
    [onBack, onOpenProject, onOpenPanel]
  );

  if (error) {
    return (
      <div className="mx-auto max-w-[1100px] px-5 py-10">
        <ITAlert variant="error" title="No se pudo cargar el esquema">
          {`${SCHEMA_URL}: ${error}`}
        </ITAlert>
      </div>
    );
  }

  if (!esquema) {
    return (
      <ITFlex align="center" justify="center" gap={3} className="min-h-[60vh]">
        <ITLoader variant="spinner" size="md" color="primary" />
        <ITText as="span" muted>
          Cargando el esquema…
        </ITText>
      </ITFlex>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1120px] px-5 py-10 sm:px-8 sm:py-12">
      {/* Barra de desarrollo: lo que el motor ha visto del esquema. */}
      <ITFlex align="center" justify="between" wrap="wrap" gap={2} className="mb-8">
        <ITFlex align="center" gap={2}>
          <ITBadget
            label={
              informe?.verdict === "valid"
                ? "Esquema válido"
                : informe?.verdict === "partial"
                  ? "Esquema parcial"
                  : "Esquema inválido"
            }
            color={informe?.verdict === "valid" ? "success" : informe?.verdict === "partial" ? "warning" : "danger"}
            size="sm"
          />
          <ITText as="span" muted className="hidden font-mono !text-[10px] uppercase !tracking-[0.12em] sm:inline">
            {`${SCHEMA_URL} · ${t("sandbox.demo.brand")}`}
          </ITText>
        </ITFlex>
        <ITText as="span" muted className="hidden font-mono !text-[10px] uppercase !tracking-[0.12em] sm:inline">
          {`${informe?.warnings.length ?? 0} avisos · ${avisos.length} de acciones`}
        </ITText>
      </ITFlex>

      {(informe?.errors.length || informe?.warnings.length || avisos.length) ? (
        <div className="mb-6 space-y-1.5">
          {[...(informe?.errors ?? []), ...(informe?.warnings ?? []), ...avisos].slice(0, 6).map((aviso, indice) => (
            <ITFlex
              key={`${aviso.code}-${aviso.path}-${indice}`}
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
      ) : null}

      <ITSchemaRenderer
        schema={esquema}
        resolveValue={resolveValue}
        resolveAction={resolveAction}
        onIssue={(aviso) => setAvisos((previos) => (previos.some((i) => i.code === aviso.code && i.path === aviso.path) ? previos : [...previos, aviso]))}
      />
    </div>
  );
};

export default DemoJsonPortfolio;
