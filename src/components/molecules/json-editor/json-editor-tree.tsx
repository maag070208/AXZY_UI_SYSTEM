import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { FaChevronDown, FaChevronRight, FaCrosshairs } from "react-icons/fa";
import { useITTranslation } from "@/i18n";
import { pathKey, previewValue, valueKind, type ITCodeAnalysis } from "./json-editor.utils";

/** Un nodo del árbol ya resuelto, listo para pintar. */
interface TreeNode {
  /** Clave o índice con el que se muestra (vacío en la raíz). */
  label: string;
  /** Ruta absoluta dentro del documento, como clave estable. */
  key: string;
  /** Ruta absoluta troceada (evita re-parsear la clave: las claves pueden llevar puntos). */
  path: (string | number)[];
  /** Profundidad de anidación (la raíz es 0). */
  level: number;
  /** Valor del nodo. */
  value: unknown;
  /** Tipo del valor. */
  kind: ReturnType<typeof valueKind>;
  /** Número de hijos directos. */
  childCount: number;
  /** Hijos, solo en objetos y arrays. */
  children: TreeNode[];
}

/** Props de `ITCodeTreeView`. */
export interface ITCodeTreeViewProps {
  /** Valor ya parseado que hay que representar. */
  value: unknown;
  /** Análisis del texto, para poder saltar a la línea de cada nodo. */
  analysis: ITCodeAnalysis;
  /** Muestra la línea de cada nodo y permite saltar a ella. @default false */
  showLines?: boolean;
  /** Se dispara al pulsar el botón de salto de un nodo. */
  onJumpToLine?: (line: number) => void;
  /** Clases del contenedor. */
  className?: string;
}

/** Número máximo de filas pintadas; evita colgar la vista con JSON enormes. */
const MAX_ROWS = 1500;
/** Niveles que vienen desplegados al abrir el árbol. */
const AUTO_EXPANDED_LEVELS = 2;

/** Construye el árbol de nodos a partir de un valor ya parseado. */
function buildTree(
  value: unknown,
  label: string,
  path: (string | number)[],
  level: number
): TreeNode {
  const kind = valueKind(value);
  const children: TreeNode[] = [];
  if (kind === "object") {
    for (const [childKey, nested] of Object.entries(value as Record<string, unknown>)) {
      children.push(buildTree(nested, childKey, [...path, childKey], level + 1));
    }
  } else if (kind === "array") {
    (value as unknown[]).forEach((nested, index) => {
      children.push(buildTree(nested, String(index), [...path, index], level + 1));
    });
  }
  return {
    label,
    key: pathKey(path),
    path,
    level,
    value,
    kind,
    childCount: children.length,
    children,
  };
}

/**
 * `ITCodeTreeView` — árbol navegable de un JSON ya parseado.
 *
 * Pieza visual interna de `ITJSONEditor`: no valida ni parsea, solo pinta lo que
 * recibe. Se exporta aparte por si hace falta reutilizarla en paneles o en
 * documentación.
 *
 * @example
 * ```tsx
 * <ITCodeTreeView value={{ a: 1 }} analysis={analysis} showLines onJumpToLine={setLine} />
 * ```
 */
export default function ITCodeTreeView({
  value,
  analysis,
  showLines = false,
  onJumpToLine,
  className,
}: ITCodeTreeViewProps) {
  const { t } = useITTranslation();
  const root = useMemo(() => buildTree(value, "", [], 0), [value]);
  /** Nodos plegados por el usuario; el resto sigue la heurística de niveles. */
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  /** Filas visibles ya aplanadas, con el corte por `MAX_ROWS` aplicado. */
  const rows = useMemo(() => {
    const result: TreeNode[] = [];
    const isOpen = (node: TreeNode) => {
      const explicit = collapsed[node.key];
      if (explicit !== undefined) return !explicit;
      return node.level < AUTO_EXPANDED_LEVELS;
    };
    const walk = (node: TreeNode) => {
      if (result.length >= MAX_ROWS) return;
      result.push(node);
      if (node.childCount && isOpen(node)) node.children.forEach(walk);
    };
    if (root.kind === "object" || root.kind === "array") root.children.forEach(walk);
    else result.push(root);
    return result;
  }, [root, collapsed]);

  const truncated = rows.length >= MAX_ROWS;

  const toggle = (key: string, level: number) =>
    setCollapsed((previous) => ({
      ...previous,
      // Sin decisión previa, la fila estaba abierta si su nivel se auto-despliega.
      [key]: previous[key] === undefined ? level < AUTO_EXPANDED_LEVELS : !previous[key],
    }));

  return (
    <div tabIndex={0} className={clsx("it-json-editor-tree overflow-auto", className)}>
      {rows.map((node) => {
        const line = analysis.nodeLines.get(pathKey(node.path))?.line;
        const isRoot = node.key === "";
        const isCollapsed =
          collapsed[node.key] ?? (node.childCount > 0 && node.level >= AUTO_EXPANDED_LEVELS);
        const hasChildren = node.childCount > 0;
        const isPrimitive = node.kind !== "object" && node.kind !== "array";

        return (
          <div
            key={node.key || "root"}
            className="it-json-editor-tree-row"
            style={{ paddingLeft: node.level * 14 }}
          >
            {hasChildren ? (
              <button
                type="button"
                onClick={() => toggle(node.key, node.level)}
                aria-expanded={!isCollapsed}
                aria-label={isCollapsed ? t("jsonEditor.expandNode") : t("jsonEditor.collapseNode")}
                className="it-json-editor-tree-toggle"
              >
                {isCollapsed ? <FaChevronRight size={8} /> : <FaChevronDown size={8} />}
              </button>
            ) : (
              <span className="it-json-editor-tree-spacer" aria-hidden="true" />
            )}

            {!isRoot && (
              <>
                <span className="it-json-editor-tk-key">{node.label}</span>
                <span className="it-json-editor-tk-punct">:</span>
              </>
            )}

            {hasChildren ? (
              <>
                <span className="it-json-editor-tk-punct">{node.kind === "array" ? "[" : "{"}</span>
                {isCollapsed && (
                  <span className="it-json-editor-tk-punct">
                    {node.kind === "array" ? "]" : "}"}
                  </span>
                )}
                <span className="it-json-editor-tree-badge">
                  {t("jsonEditor.childCount", { count: node.childCount })}
                </span>
              </>
            ) : (
              <span
                className={clsx(
                  "it-json-editor-tk-value",
                  node.kind === "string" && "it-json-editor-tk-string",
                  node.kind === "number" && "it-json-editor-tk-number",
                  node.kind === "boolean" && "it-json-editor-tk-keyword",
                  node.kind === "null" && "it-json-editor-tk-null"
                )}
              >
                {previewValue(node.value)}
              </span>
            )}

            {isPrimitive && isRoot && (
              <span className="it-json-editor-tree-badge">{kindLabel(node.kind, t)}</span>
            )}

            {showLines && line !== undefined && (
              <button
                type="button"
                onClick={() => onJumpToLine?.(line)}
                title={t("jsonEditor.jumpToLine", { line })}
                aria-label={t("jsonEditor.jumpToLine", { line })}
                className="it-json-editor-tree-jump"
              >
                <FaCrosshairs size={8} />
                <span>{line}</span>
              </button>
            )}
          </div>
        );
      })}

      {truncated && (
        <p className="it-json-editor-tree-badge m-2 inline-block px-2 py-1">
          {t("jsonEditor.treeTruncated")}
        </p>
      )}
    </div>
  );
}

/** Etiqueta corta y traducible del tipo de un valor. */
function kindLabel(kind: TreeNode["kind"], t: (key: string) => string): string {
  switch (kind) {
    case "object":
      return t("jsonEditor.kindObject");
    case "array":
      return t("jsonEditor.kindArray");
    case "string":
      return t("jsonEditor.kindString");
    case "number":
      return t("jsonEditor.kindNumber");
    case "boolean":
      return t("jsonEditor.kindBoolean");
    default:
      return t("jsonEditor.kindNull");
  }
}
