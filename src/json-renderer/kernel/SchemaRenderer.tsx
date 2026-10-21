import React, { useEffect, useMemo, useRef } from "react";
import type { Catalog } from "../catalog/catalog.props";
import { axzyCatalog } from "../catalog/axzyCatalog";
import { createBindingResolver } from "../binding/resolveValue";
import { issue, type JsonEngineIssue } from "../shared/errors";
import { resolveLimits, type EngineLimits } from "../shared/limits";
import { formatPath, type SchemaPath } from "../shared/paths";
import { faltanCapacidades } from "./capabilities";
import { NodeBoundary } from "./NodeBoundary";
import { auditTree } from "./partial";
import { childList, renderNode } from "./renderNode";
import type { ITJsonRenderEngineProps } from "./schemaRenderer.props";
import type { SlotRegistry } from "./slots";
import type { EffectRegistry } from "../actions/effects";
import type { NodeSchema } from "./types";

/** Contexto que comparten los nodos durante un render. */
interface RenderContext {
  catalog: Catalog;
  /** Ids declarados por los nodos, para verificar que llegan al DOM. */
  nodeIds: Set<string>;
  limits: EngineLimits;
  issues: JsonEngineIssue[];
  onIssue?: (issue: JsonEngineIssue) => void;
  resolveValue?: ITJsonRenderEngineProps["resolveValue"];
  resolveAction?: ITJsonRenderEngineProps["resolveAction"];
  pendingFallback?: React.ReactNode;
  slots?: SlotRegistry;
  effects?: EffectRegistry;
  /** Capacidades que concede el host. Un `requires` sin concesión no se pinta. */
  capabilities?: readonly string[];
}

/**
 * Recorre un nodo y sus hijos, acumulando avisos y aislando fallos.
 *
 * La recursión se hace aquí (y no dentro de `renderNode`) para que el
 * presupuesto y los avisos se compartan en todo el árbol.
 */
function renderTree(node: NodeSchema, path: SchemaPath, context: RenderContext, level: number): React.ReactNode {
  if (!node || typeof node !== "object") return null;
  if (level > context.limits.maxDepth) return null;

  // Todos los avisos del subárbol van a parar al mismo array del contexto: el
  // resolutor escribe ahí directamente y el boundary informa por `onIssue`.
  const issues = context.issues;

  if (node.id) context.nodeIds.add(node.id);

  const reportIssue = (issue: JsonEngineIssue) => {
    issues.push(issue);
    context.onIssue?.(issue);
  };

  // Capacidades: un nodo que exige algo que el host no concede no se pinta. Si tiene
  // `fallback`, se pinta el fallback en su lugar; si no, el nodo desaparece con aviso.
  const faltan = faltanCapacidades(node.requires, context.capabilities);
  if (faltan.length > 0) {
    reportIssue(
      issue("JR060", `Falta la capacidad ${faltan.join(", ")} para pintar \`${node.type}\`.`, formatPath(path), {
        severity: "warning",
        hint: "El host debe conceder la capacidad con la prop `capabilities`, o el nodo debe declarar un `fallback`.",
      })
    );
    return node.fallback ? renderTree(node.fallback, [...path, "fallback"], context, level + 1) : null;
  }

  const issuesBefore = issues.length;

  const element = renderNode(node, {
    catalog: context.catalog,
    path,
    issues,
    resolveValue: context.resolveValue,
    resolveAction: context.resolveAction,
    pendingFallback: context.pendingFallback,
    slots: context.slots,
    effects: context.effects,
    actionTimeoutMs: context.limits.actionTimeoutMs,
    onIssue: context.onIssue,
    renderChildren: (current, currentPath) => {
      const children = childList(current);
      if (children.length === 0) return undefined;
      return children.map((child, index) =>
        renderTree(child, [...currentPath, "children", index], context, level + 1)
      );
    },
  });

  // El resolutor acumula en el array compartido; aquí se reenvían los nuevos
  // para que `onIssue` los reciba todos (incluidos los de tipos desconocidos).
  for (let index = issuesBefore; index < issues.length; index += 1) {
    context.onIssue?.(issues[index]);
  }

  // El fallback declarado por el nodo se usa si algo del subárbol falla.
  const fallback = node.fallback
    ? renderTree(node.fallback, [...path, "fallback"], context, level + 1)
    : context.pendingFallback ?? null;

  const wrapped = (
    <NodeBoundary
      key={String(path.join("-"))}
      path={path.join(".")}
      fallback={fallback}
      onError={(error, errorPath) =>
        reportIssue({
          code: "JR012",
          severity: "error",
          message: error.message,
          path: errorPath,
          hint: "El nodo se ha aislado; el resto de la pantalla sigue pintándose.",
        })
      }
    >
      {element}
    </NodeBoundary>
  );

  return wrapped;
}

/**
 * Pinta una pantalla completa a partir de un esquema.
 *
 * Nunca lanza por culpa del esquema: los problemas se convierten en avisos que
 * se entregan por `onIssue` (y se acumulan en `issuesRef` si quieres leerlos).
 *
 * @example
 * <ITSchemaRenderer schema={{ version: 1, id: "demo", content: { type: "ITText", text: "Hola" } }} />
 *
 * @example
 * <ITSchemaRenderer schema={schema} onIssue={(issue) => console.warn(issue.code, issue.path)} />
 */
export function ITSchemaRenderer({
  schema,
  catalog = axzyCatalog,
  limits,
  params,
  dataHandlers,
  slots,
  effects,
  capabilities,
  resolveValue,
  resolveAction,
  pendingFallback,
  onIssue,
  className,
}: ITJsonRenderEngineProps) {
  const resolvedLimits = useMemo(() => resolveLimits(limits), [limits]);
  // Un único array de avisos por render: el resolutor y los boundaries escriben
  // en él, así que no se pierde ninguno por el camino.
  const issues: JsonEngineIssue[] = [];
  // Ids que el esquema declara y que deben acabar en el DOM (anclas, deep links).
  const nodeIds = new Set<string>();

  // El recuento va antes del render para poder recortar y avisar sin montar nada.
  const audit = useMemo(
    () => (schema ? auditTree(schema, resolvedLimits) : null),
    [schema, resolvedLimits]
  );

  const context = useMemo<RenderContext>(
    () => ({
      catalog,
      nodeIds,
      limits: resolvedLimits,
      issues,
      onIssue,
      // El binding escribe sus avisos (JR030, JR032) en el mismo array que el resto del render.
      resolveValue: createBindingResolver({
        data: schema?.data,
        state: schema?.state,
        params,
        handlers: dataHandlers,
        report: (aviso) => issues.push(aviso),
        host: resolveValue,
      }),
      resolveAction,
      pendingFallback,
      slots,
      effects,
      capabilities,
    }),
    // `issues` es un array nuevo en cada render a propósito: acumular avisos
    // entre renders duplicaría los avisos de esquemas que no han cambiado.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [schema, params, dataHandlers, slots, effects, capabilities, catalog, resolvedLimits, onIssue, resolveValue, resolveAction, pendingFallback]
  );

  // Una pantalla que exige una capacidad no concedida no se pinta en absoluto.
  const faltanRaiz = schema ? faltanCapacidades(schema.requires, capabilities) : [];
  if (faltanRaiz.length > 0) {
    issues.push(
      issue("JR060", `Falta la capacidad ${faltanRaiz.join(", ")} para esta pantalla.`, "requires", {
        severity: "error",
        hint: "Concede la capacidad con la prop `capabilities` del renderizador.",
      })
    );
  }

  const content = schema && faltanRaiz.length === 0
    ? (Array.isArray(schema.content) ? schema.content : [schema.content]).filter(
        (node): node is NodeSchema => Boolean(node) && typeof node === "object"
      )
    : [];
  const children = content
    .slice(0, resolvedLimits.maxNodes)
    .map((node, index) => renderTree(node, ["content", index], context, 0))
    .filter(Boolean);

  // Todos los avisos del render + los del recuento, sin duplicar por código y ruta.
  const collected: JsonEngineIssue[] = [...(audit?.issues ?? []), ...issues];
  const signature = collected.map((issue) => `${issue.code}:${issue.path}`).join("|");

  // Se entregan después del commit: llamar a `onIssue` (que puede hacer setState
  // en el padre) durante el render sería un error de React.
  const reported = useRef<string>("");
  useEffect(() => {
    const all = [...collected];

    // Un `id` que no existe en el DOM es un fallo silencioso: el componente no
    // reenvía props al elemento, así que el ancla no funcionaría. Se avisa.
    for (const id of nodeIds) {
      if (!document.getElementById(id)) {
        all.push({
          code: "JR014",
          severity: "warning",
          message: `El \`id\` "${id}" no llegó al DOM.`,
          path: id,
          hint: "El componente no reenvía props al elemento. Pon el id en un nodo que sí lo haga (por ejemplo ITText) o en un contenedor del host.",
        });
      }
    }

    const firma = all.map((issue) => `${issue.code}:${issue.path}`).join("|");
    if (!onIssue || reported.current === firma) return;
    reported.current = firma;
    for (const issue of all) onIssue(issue);
    // `all` se deriva de la firma; la firma es la dependencia real.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, onIssue]);

  if (!schema || children.length === 0) return null;

  return className ? <div className={className}>{children}</div> : <>{children}</>;
}

export default ITSchemaRenderer;
