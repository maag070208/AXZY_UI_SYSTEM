/**
 * Motor de pantallas declarativas de AXZY UI System.
 *
 * Convierte un esquema JSON versionado en una pantalla completa, tratándolo
 * siempre como **entrada no confiable**: lista blanca de componentes y props,
 * sin código, sin red y sin HTML. El caso de uso principal es la UI generada por
 * IA, así que el esquema puede llegar **a trozos** y el motor pinta lo que ya
 * está cerrado.
 *
 * Alcance y plan: `docs/json-renderer/ALCANCE.md` y `PLAN-IMPLEMENTACION.md`.
 *
 * @example
 * ```tsx
 * const schema = { version: 1, id: "demo", content: { type: "ITText", text: "Hola" } };
 * <ITSchemaRenderer schema={schema} />
 * ```
 */

/* ── Kernel ─────────────────────────────────────────────────────────────── */
export { ITSchemaRenderer, default as ITJsonScreen } from "./kernel/SchemaRenderer";
export { NodeBoundary } from "./kernel/NodeBoundary";
export { renderNode, childList, hasChildren } from "./kernel/renderNode";
export { auditTree, countPendingNodes } from "./kernel/partial";
export type { ITJsonRenderEngineProps } from "./kernel/schemaRenderer.props";

/* ── Rutas y navegación ────────────────────────────────────────────────── */
export { validateRoutes, flattenRoutes, joinRoutePath } from "./routing/routes";
export type { RoutesSchema, RouteSchema, RouteNavSchema, FlatRoute } from "./routing/routes";
export { matchRoute, routeHref } from "./routing/match";
export type { RouteMatch } from "./routing/match";
export { buildNavigationTree, navContainsRoute } from "./routing/navigation";
export type { NavNode } from "./routing/navigation";

/* ── Efectos de acción (lo que el host cumple tras una acción) ─────────── */
export { wrapAction } from "./actions/effects";
export type { EffectRegistry, EffectContext, ToastVariant } from "./actions/effects";

/* ── Slots (bloques JSX que registra el host) ──────────────────────────── */
export type { SlotComponent, SlotRegistry } from "./kernel/slots";

/* ── Binding ───────────────────────────────────────────────────────────── */
export { createBindingResolver } from "./binding/resolveValue";
export type { DataHandler, DataLoader, BindingScope, BindingResolver } from "./binding/resolveValue";
export type {
  ScreenSchema,
  NodeSchema,
  SchemaValue,
  SchemaReference,
  WhenSchema,
  ActionSchema,
  EffectSchema,
  DataSourceSchema,
  NodeStatus,
} from "./kernel/types";

/* ── Catálogo ──────────────────────────────────────────────────────────── */
export { axzyCatalog, axzyCatalogTypes, AXZY_CATALOG_ENTRIES, AXZY_EXCLUDED_TYPES } from "./catalog/axzyCatalog";
export {
  createCatalog,
  getCatalogEntry,
  isExcludedType,
  getExclusionReason,
  GLOBALLY_FORBIDDEN_PROPS,
} from "./catalog/catalog.props";
export { resolveNode } from "./catalog/resolve";
export type { Catalog, CatalogEntry, PropSpec, PropKind } from "./catalog/catalog.props";
export type { ResolvedNode, UnresolvedNode } from "./catalog/resolve";

/* ── Validación y versionado ───────────────────────────────────────────── */
export { validateSchema, CURRENT_SCHEMA_VERSION } from "./validation/validate";
export { migrateSchema, DEFAULT_MIGRATIONS } from "./validation/migrate";
export type { ValidationReport, ValidationVerdict, ValidateOptions } from "./validation/validate";
export type { SchemaMigration, MigrationRegistry, MigrationResult } from "./validation/migrate";

/* ── Contrato de vocabulario (para el emisor) ──────────────────────────── */
export { buildVocabularyContract, formatVocabularyForPrompt } from "./vocabulary/buildContract";
export type { VocabularyContract, ComponentContract, PropContract } from "./vocabulary/buildContract";

/* ── Streaming ─────────────────────────────────────────────────────────── */
export { parsePartialSchema, isNodePending } from "./stream/tolerantParse";
export type { PartialParseResult, StreamState } from "./stream/tolerantParse";

/* ── Compartido ────────────────────────────────────────────────────────── */
export { JsonEngineError, issue } from "./shared/errors";
export type { JsonEngineIssue, JsonEngineCode, JsonEngineSeverity } from "./shared/errors";
export { formatPath, parsePath, readPath, hasPath, pushPath, propPath } from "./shared/paths";
export type { SchemaPath, PathSegment } from "./shared/paths";
export { DEFAULT_LIMITS, resolveLimits, createLimitTracker } from "./shared/limits";
export type { EngineLimits, LimitTracker } from "./shared/limits";
