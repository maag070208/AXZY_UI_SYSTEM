# ITJsonRenderer — Plan de implementación

> **Estado:** propuesta para aprobación · **Versión:** 1.0 (borrador)
> **Alcance:** [ALCANCE.md](./ALCANCE.md) — este documento lo convierte en fases ejecutables.
> **Regla de oro:** cada fase termina con criterios verificables y documentación viva. Nada
> se da por hecho sin una comprobación que lo demuestre.
>
> **Estado:** fases **0, 1 y 2 entregadas** (base del motor). Siguiente: fase 3
> (catálogo completo) o fase 4 (binding), según prioridad.
>
> **Caso de uso que manda:** UI generada por IA. El esquema se trata como **entrada no
> confiable** y el **streaming es una capacidad del kernel desde la fase 1** — no una fase
> al final. Eso adelanta el parseo parcial, el nodo pendiente y los límites.

---

## 1. Cómo leer este plan

- **Fase**: unidad de entrega con criterios de aceptación propios. Las fases 0–2 son la
  base; de la 3 en adelante son módulos que se pueden paralelizar.
- **Entregable**: archivos concretos, no conceptos.
- **Criterio**: comprobación que se puede ejecutar (test o paso manual descrito).
- **Riesgo**: lo que puede tumbar la fase y cómo se mitiga dentro de ella.

El orden está pensado para tener valor demostrable pronto: al final de la fase 1 ya hay
una pantalla real del sandbox pintada solo con JSON.

---

## 2. Convenciones del proyecto para este trabajo

- **Ubicación del código**: `src/json-renderer/` (nuevo dominio, hermano de `components/`).
  No es una capa atómica: consume `components/**` y publica su propia API desde
  `src/index.ts`. `scripts/check-atomic-deps.mjs` solo vigila `src/components/**`, así que
  el dominio queda fuera de esa regla **a propósito** (y así se documentará).
- **CSS**: todo lo del motor va en `src/index.css` bajo `@layer components` con prefijo
  `it-jr-*` (la librería no publica CSS por componente). `devtools` vive en `src/dev.css`.
- **i18n**: namespace nuevo `jsonRenderer.*` en `es.ts` y `en.ts`, más los textos que el
  motor necesita para sus propios avisos (códigos de error, estados de carga).
- **Tipos**: un `.props.ts` por módulo público, con JSDoc en cada prop, como el resto.
- **Documentación viva**: cada fase actualiza `docs/json-renderer/*` y, si publica API
  nueva, `DOCUMENTACION_DETALLADA_COMPONENTES.txt`, `LLM_DOCS.md` y `pnpm docs:llm`.
- **Sin dependencias nuevas de runtime.** El motor se apoya en lo que ya hay (`clsx`,
  `react-icons`).

---

## 3. Estructura objetivo

```
src/json-renderer/
├─ index.ts                        # único entry point público del motor
├─ engine.tsx                      # createEngine(): compone módulos
├─ engine.props.ts                 # EngineOptions, EngineApi
├─ shared/
│  ├─ errors.ts                    # JsonEngineError con code + path
│  ├─ paths.ts                     # utilidades de path (screens[0].children[2])
│  ├─ limits.ts                    # presupuesto de nodos/profundidad/tiempo
│  └─ memo.ts                      # memoización por nodo y por identidad
├─ kernel/
│  ├─ renderNode.tsx               # resuelve un nodo → ReactNode (incluye nodo pendiente)
│  ├─ NodeBoundary.tsx             # error boundary por subárbol
│  ├─ SchemaRenderer.tsx           # recorrido del árbol y presupuesto
│  ├─ partial.ts                   # estado pendiente: qué está cerrado y qué no
│  └─ types.ts                     # NodeSchema, ScreenSchema, SchemaValue
├─ stream/
│  ├─ tolerantParse.ts             # JSON a medias → árbol + punto de corte
│  ├─ incremental.ts               # consume deltas reutilizando nodos por identidad
│  ├─ useSchemaStream.ts           # string | AsyncIterable | ReadableStream → esquema
│  └─ stream.props.ts              # StreamOptions, StreamState
├─ vocabulary/
│  └─ buildContract.ts             # catálogo legible por máquina para el prompt
├─ catalog/
│  ├─ catalog.props.ts             # CatalogEntry, PropSpec, CatalogType
│  ├─ axzyCatalog.ts               # catálogo por defecto (63 componentes)
│  ├─ resolve.ts                   # resolución de tipo, defaults, coerción
│  └─ forbidden.ts                 # props y componentes prohibidos
├─ validation/
│  ├─ schema.json                  # JSON Schema del esquema de pantalla
│  ├─ validate.ts                  # validador propio (sin dependencias)
│  ├─ codes.ts                     # catálogo de códigos de error
│  └─ migrate.ts                   # registro de migraciones de versión
├─ binding/
│  ├─ resolveValue.ts              # $source, $state, $param, literales
│  ├─ operators.ts                 # $concat, $map, $count, $coalesce
│  ├─ state.ts                     # estado de pantalla
│  └─ dataSources.tsx              # resolución, estados y refresco
├─ actions/
│  ├─ registry.ts                  # nombre → handler + capacidades
│  ├─ dispatch.ts                  # args + contexto + timeout + auditoría
│  └─ effects.ts                   # then, onError, toast, navigate, overlay
├─ permissions/
│  ├─ capabilities.ts              # resolución de requires
│  └─ redact.ts                    # recorte de campos antes del árbol
├─ routing/
│  ├─ match.ts                     # path → params (sin dependencias)
│  ├─ guards.ts                    # guards por capacidad/handler
│  └─ RouterProvider.tsx           # tabla de rutas + layouts + outlet
├─ form/
│  ├─ FormNode.tsx                 # nodo `form` → ITField + entradas
│  └─ rules.ts                     # required, min, max, pattern, email, custom
├─ table/
│  ├─ TableNode.tsx                # nodo `table` → ITTable/ITDataTable
│  └─ columns.ts                   # columnas, filtros, orden, acciones de fila
├─ i18n/
│  └─ resolveText.ts               # { i18n, params } → string
└─ devtools/
   ├─ Overlay.tsx                  # errores y avisos con path
   ├─ Inspector.tsx                # árbol + tiempos + contador de nodos
   └─ report.ts                    # acumulador de avisos de la sesión
```

---

## 4. API pública objetivo

```ts
// src/json-renderer/index.ts

/** Compone el motor con los módulos que le des. */
export function createEngine(options: EngineOptions): EngineApi;

/** Renderiza un esquema sin router (pantalla suelta). */
export const ITSchemaRenderer: React.FC<ITSchemaRendererProps>;

/** Renderiza una tabla de rutas completa (con layouts y guards). */
export const ITSchemaRouter: React.FC<ITSchemaRouterProps>;

/** Valida un esquema contra el JSON Schema y devuelve errores con path. */
export function validateSchema(schema: unknown, options?: ValidateOptions): ValidationReport;

/** Catálogo AXZY por defecto, para extenderlo o sustituirlo. */
export const axzyCatalog: Catalog;

/** Consume un esquema que llega por trozos y devuelve el árbol pintable. */
export function useSchemaStream(
  source: string | AsyncIterable<string> | ReadableStream<string>,
  options?: StreamOptions
): StreamState;

/** Parsea un esquema incompleto: árbol hasta donde es válido + punto de corte. */
export function parsePartialSchema(text: string, previous?: ScreenSchema | null): PartialParseResult;

/** Catálogo legible por máquina para el prompt del emisor (generado). */
export function buildVocabularyContract(catalog?: Catalog): VocabularyContract;

/** Helper para declarar un módulo de terceros. */
export function defineModule<T>(module: T): T;

export type { ScreenSchema, NodeSchema, DataSourceMap, ActionRegistry, Capability, EngineOptions, EngineApi };
```

Decisiones de API que se fijan aquí y no cambian sin migración:

- `createEngine` es el **único** punto de composición; los componentes sueltos existen para
  usos simples y comparten el mismo kernel.
- El motor **no** expone un contexto propio obligatorio: `useJsonEngine()` es opcional y
  devuelve `null` fuera de un motor (igual que `useITThemeSafe`).
- Los códigos de error son estables y forman parte del contrato (`JR001`… ver §11).

---

## 5. Fases

### Fase 0 — Andamiaje y contrato de tipos

**Objetivo:** dejar el terreno listo (estructura, tipos, errores, límites y runner de
pruebas) antes de escribir lógica.

**Entregables**
- `src/json-renderer/` con el esqueleto de carpetas y `index.ts` vacío pero exportable.
- `shared/errors.ts`: `JsonEngineError` con `code`, `path`, `severity`, `hint`.
- `shared/paths.ts`: construir, leer y renderizar paths de esquema.
- `shared/limits.ts`: presupuesto de nodos, profundidad, **ms por fragmento de stream** y
  ms por acción.
- `kernel/types.ts`: `ScreenSchema`, `NodeSchema`, `SchemaValue`, `CatalogType` y el
  discriminante de estado del nodo (`complete` | `pending`).
- `stream/tolerantParse.ts`: JSON incompleto → árbol parcial + punto de corte + nodos
  pendientes. Es la pieza que decide si el streaming sale barato o caro.
- Vitest como devDependency con `pnpm test` / `pnpm test:watch` y config propia.

**Criterios**
- [ ] `pnpm test` corre y pasa con pruebas de `paths`, `limits` y `tolerantParse`.
- [ ] `tolerantParse` devuelve el árbol correcto para un esquema cortado en **cada** una de
      sus posiciones (prueba de truncado exhaustiva sobre un esquema de ejemplo).
- [ ] `tolerantParse` no lanza nunca: entrada basura → árbol vacío + punto de corte.
- [ ] `pnpm lint`, `tsc --noEmit` y `pnpm bundle` siguen en verde.
- [ ] `dist/` no crece: el motor aún no se exporta desde `src/index.ts`.

**Riesgo:** añadir Vitest toca el flujo del repo. Mitigación: script aislado, sin tocar
`pnpm lint`, y se documenta en `AGENTS.md`.

**Riesgo:** escribir un parser tolerante propio es la pieza más delicada del plan (es
fácil que un caso raro tumbe el render). Mitigación: la prueba de truncado exhaustiva es
el criterio de aceptación, y el parser vive aislado en `stream/` con su propia batería.

**Estimación:** 3–4 días (sube respecto al borrador por el parser tolerante).

---

### Fase 1 — Kernel + catálogo mínimo (valor demostrable)

**Objetivo:** pintar una pantalla real del sandbox solo con JSON, con lista blanca de
props y error boundaries. Retrocompatible con el PoC.

**Entregables**
- `catalog/catalog.props.ts`, `catalog/axzyCatalog.ts` (25 componentes de la fase),
  `catalog/resolve.ts`, `catalog/forbidden.ts`.
- `kernel/renderNode.tsx`, `kernel/NodeBoundary.tsx`, `kernel/SchemaRenderer.tsx`,
  `kernel/partial.ts` (reserva de hueco para nodos pendientes).
- `ITSchemaRenderer` exportado desde `src/index.ts`.
- `docs/json-renderer/REFERENCIA.md` con nodos y props de la fase.
- Ruta nueva en el sandbox: `#ui-system/feedback/jsonscreen` con un laboratorio
  (esquema editable a la izquierda, resultado a la derecha) reutilizando `ITJSONEditor`, y
  un botón **«emitir como stream»** que escribe el esquema carácter a carácter para ver el
  render progresivo.

**Criterios**
- [ ] Los esquemas del PoC actual (los del showcase vigente) pintan **exactamente** igual.
- [ ] Un `type` fuera del catálogo no rompe: aviso `JR010` con path + nada pintado.
- [ ] Una prop prohibida (`children` como función, `render`, `dangerouslySetInnerHTML`) se
      ignora con aviso `JR011`.
- [ ] Un componente que lanza durante el render queda aislado por su boundary y el resto
      de la pantalla sigue viva (`JR012`).
- [ ] Un esquema con 5 000 nodos no bloquea: se corta en el presupuesto con aviso `JR013`.
- [ ] Un nodo pendiente no se pinta a medias ni parpadea: aparece una sola vez, ya cerrado
      (o reserva su hueco si el host pide `skeleton`).
- [ ] Pruebas: un fixture por componente del catálogo (render con `@testing-library/react`
      o, si no se añade, comprobación de props resueltas en el resolver).

**Riesgo:** el catálogo a mano se desincroniza. Mitigación: `axzyCatalog` se genera desde
los `*.props.ts` con un script (`scripts/build-jr-catalog.mjs`) y un test que falle si un
componente del catálogo LLM no tiene entrada.

**Estimación:** 5–7 días.

---

### Fase 2 — Validación (con modo parcial), códigos y contrato de vocabulario

**Objetivo:** que un esquema inválido se explique solo, y que un esquema **a medias** no se
confunda con uno roto.

**Entregables**
- `validation/schema.json` (JSON Schema del esquema de pantalla, v1).
- `validation/validate.ts` (validador propio, sin dependencias) + `validation/codes.ts`,
  con **tres veredictos**: válido, válido-pero-incompleto (`partial`) e inválido.
- `validation/migrate.ts` con el registro de migraciones (`version: 1` como base).
- `vocabulary/buildContract.ts`: catálogo legible por máquina (tipos, props, enums,
  obligatorias y un ejemplo mínimo por componente) para el prompt del emisor.
- `validateSchema()` exportado y usado por `ITSchemaRenderer` en modo `strict` (producción)
  o `lenient` (desarrollo: avisa y pinta).

**Criterios**
- [ ] Un esquema sin `$schema` o `version` falla con `JR020` y path raíz.
- [ ] Un nodo sin `type` falla con `JR021` y su path completo.
- [ ] Un esquema cortado a la mitad devuelve veredicto `partial` y **cero** errores: la
      prueba de truncado exhaustiva de la fase 0 se repite contra el validador.
- [ ] Los errores se agrupan por severidad y se pueden filtrar (`errors`, `warnings`).
- [ ] `validateSchema` no lanza nunca: siempre devuelve informe.
- [ ] El contrato de vocabulario cubre los 25 componentes de la fase 1 y un test falla si
      un componente del catálogo no aparece en él.
- [ ] Migración de prueba v1→v2 aplicada en un test (aunque v2 no exista aún, el
      mecanismo queda cubierto).

**Riesgo:** escribir el JSON Schema a mano y que se desincronice de los tipos.
Mitigación: un test que compare `schema.json` con `kernel/types.ts` en las claves de
primer nivel.

**Estimación:** 5–7 días.

---

### Fase 3 — Catálogo completo (63) y anotaciones de props

**Objetivo:** que ningún componente del sistema quede fuera por falta de entrada.

**Entregables**
- `axzyCatalog.ts` completo, con `PropSpec` por prop (tipo, default, enum, doc) y
  `forbidden` por componente.
- `scripts/build-jr-catalog.mjs`: genera entradas desde los `*.props.ts` usando el
  compilador de TypeScript (mismo enfoque que `generate-catalog.mjs`).
- `docs/json-renderer/REFERENCIA.md` autogenerado para la tabla de props.
- Fixture por componente en `src/json-renderer/__fixtures__/`.

**Criterios**
- [ ] 63/63 componentes con entrada y fixture.
- [ ] El script regenera el catálogo sin cambios manuales (`git diff` vacío tras correrlo).
- [ ] Los 6 componentes excluidos están marcados como tales con su motivo.
- [ ] Un test verifica que ninguna prop del catálogo recibe un nodo React cuando no debe.

**Riesgo:** props con tipos complejos (`columns`, `navigationItems`, `filters`) no se
pueden generar solas. Mitigación: se declaran a mano como `kind: "structured"` con su
propia especificación y su validación dedicada.

**Estimación:** 6–8 días.

---

### Fase 4 — Binding, estado y fuentes de datos

**Objetivo:** que el esquema nombre datos y el host los resuelva, con estados incluidos.

**Entregables**
- `binding/resolveValue.ts` + `binding/operators.ts` (`$source`, `$state`, `$param`,
  `$concat`, `$map`, `$count`, `$coalesce`, `$row`, `$form`).
- `binding/state.ts`: estado de pantalla (`initial` + `set` por acción).
- `binding/dataSources.tsx`: resolución, `loading`/`empty`/`error`/`ok`, `refreshOn`,
  invalidación y `handler` obligatorio.
- Nodos especiales `state` y `dataStatus` para condicionales.

**Criterios**
- [ ] Una tabla con `$source` muestra `ITSkeleton` mientras carga, `ITEmptyState` sin
      filas y `ITAlert` con reintento si el handler falla.
- [ ] `$param` toma el valor de la ruta; `$state` cambia y re-renderiza solo el subárbol
      afectado (medido con un contador de renders).
- [ ] Un `handler` no registrado produce `JR030` y estado `error`, sin lanzar.
- [ ] El esquema **no** puede provocar red por sí mismo: test que pase un esquema con
      `url`/`endpoint` y verifique que se ignora con aviso `JR031`.

**Riesgo:** el binding se convierte en un lenguaje. Mitigación: los operadores son una
lista cerrada; añadir uno exige un caso real del sandbox y su test.

**Estimación:** 6–8 días.

---

### Fase 5 — Acciones y efectos

**Objetivo:** que el esquema pueda hacer cosas sin contener código.

**Entregables**
- `actions/registry.ts` (`ActionSpec` con `handler`, `requires`, `timeout`, `audit`).
- `actions/dispatch.ts` (args + contexto `{ row, form, params, state, event }`).
- `actions/effects.ts` (`then`, `onError`, `toast`, `navigate`, `openOverlay`,
  `closeOverlay`, `refresh`, `confirm`).
- Integración con `ITToast`, `ITConfirmDialog` y `ITDialog` generados por el motor.

**Criterios**
- [ ] `onClick` con acción registrada ejecuta el handler con los `args` esperados.
- [ ] Acción no registrada: `JR040`, aviso en devtools y **no** se ejecuta nada.
- [ ] Acción que excede su `timeout`: `JR041` y aviso, sin bloquear la UI.
- [ ] `confirm` abre `ITConfirmDialog` y solo entonces ejecuta.
- [ ] Cada acción ejecutada deja entrada en la traza de auditoría (nombre, duración,
      resultado) accesible con `engine.getAuditLog()` en desarrollo.
- [ ] `onError` con `toast` no se dispara cuando el handler termina bien.

**Riesgo:** efectos encadenados infinitos. Mitigación: profundidad máxima de encadenado
(configurable, por defecto 5) y `JR042` al superarla.

**Estimación:** 5–7 días.

---

### Fase 6 — Router declarativo, layouts y guards

**Objetivo:** una tabla de rutas JSON que monta el shell y navega con la app.

**Entregables**
- `routing/match.ts` (segmentos, `:param`, `:param?`, `*`, orden por especificidad).
- `routing/guards.ts` (capacidad o `handler` del host + `redirectTo`).
- `routing/RouterProvider.tsx` + `ITSchemaRouter`.
- Nodos de shell: `layout` (topbar, sidebar, breadcrumbs) compilados con `ITLayout`,
  `ITNavbar`, `ITPage`.
- Integración con el router que use el host (`adapter`: hash, memory o history).

**Criterios**
- [ ] `/usuarios/:id` resuelve `params.id` y lo expone a `$param` y a las acciones.
- [ ] Ruta sin capacidad: redirige a `redirectTo` o pinta `fallback`, según declaración.
- [ ] Guard con `handler` que devuelve `false` redirige; que lanza, pinta error (`JR050`).
- [ ] `*` captura lo no encontrado y pinta la pantalla declarada.
- [ ] Anidado: una ruta hija hereda el layout del padre sin duplicar el shell.

**Riesgo:** acoplarse a un router concreto. Mitigación: el módulo recibe un `adapter` con
la interfaz mínima (`getPath`, `subscribe`, `navigate`) y se entregan dos: hash (sandbox)
y memory (tests).

**Estimación:** 6–8 días.

---

### Fase 7 — Permisos, redacción y auditoría

**Objetivo:** que el JSON jamás decida permisos y que lo sensible no llegue al DOM.

**Entregables**
- `permissions/capabilities.ts` (`requires` en nodo, ruta, acción y **prop**).
- `permissions/redact.ts` (`redact` por fuente, con patrones `campo`, `objeto.*`).
- Informe de denegaciones (`engine.getDenied()`) con path y capacidad.

**Criterios**
- [ ] Nodo con `requires` no satisfecho: pinta `fallback` si existe, si no desaparece, y
      queda registrado con `JR060`.
- [ ] `redact` elimina los campos **antes** del render: test que serializa el DOM y
      comprueba que el valor sensible no aparece en ningún atributo ni texto.
- [ ] Un botón visible con acción denegada no ejecuta el handler (`JR061`).
- [ ] Cambiar las capacidades del host re-evalúa el árbol sin recargar.

**Riesgo:** falsa sensación de seguridad si el host entrega datos ya con secretos.
Mitigación: documentar que la redacción es defensa en profundidad y que el host no debe
enviar lo que no se va a mostrar.

**Estimación:** 4–6 días.

---

### Fase 8 — Formularios y tablas declarativas

**Objetivo:** cubrir los dos patrones que más pantallas ocupan.

**Entregables**
- `form/FormNode.tsx` + `form/rules.ts` (campos, reglas, layout de 1/2/3 columnas,
  `ITField`, `ITFormHeader`, envío por acción, reset).
- `table/TableNode.tsx` + `table/columns.ts` (columnas tipadas, filtros, orden,
  paginación, `rowActions`, `onRowClick`, selección múltiple).
- `docs/json-renderer/RECETARIO.md` con 8 recetas copiables.

**Criterios**
- [ ] Un formulario declarado valida antes de enviar y muestra el error por campo.
- [ ] Regla `custom` delega en un handler del host y usa su mensaje (`i18n`).
- [ ] Una tabla con 10 000 filas paginadas no bloquea (medición de tiempo de render).
- [ ] `rowActions` se resuelven contra el registro de acciones y respetan `requires`.
- [ ] Cambiar de página o filtro actualiza el `$state` y refresca la fuente (no una copia).

**Riesgo:** duplicar `ITFormBuilder` y que se contradigan. Mitigación: el nodo `form` se
define como capa fina sobre los mismos componentes de entrada; se documenta la diferencia
(esquema de pantalla vs. configuración de formulario).

**Estimación:** 7–9 días.

---

### Fase 9 — Entry point, devtools y observabilidad

**Objetivo:** un solo punto de composición y herramientas para depurar en desarrollo.

**Entregables**
- `engine.tsx` + `engine.props.ts`: `createEngine`, `defineModule`, `useJsonEngine`.
- `stream/incremental.ts` + `stream/useSchemaStream.ts`: `string`, `AsyncIterable` y
  `ReadableStream`, con cancelación y conservación del último árbol válido.
- `devtools/Overlay.tsx`, `Inspector.tsx`, `report.ts` (solo si `import.meta.env.DEV`).
- Ruta del sandbox `#ui-system/feedback/jsonscreen` completa: validador en vivo, inspector
  y 4 ejemplos (listado, formulario, ruta con guard, dashboard).
- `docs/json-renderer/MIGRACION.md` (versionado y migraciones).

**Criterios**
- [ ] El motor se monta **solo con el kernel** (sin datos, sin router, sin permisos) y
      funciona.
- [ ] Componer los módulos opcionales no cambia el comportamiento del kernel (mismos
      fixtures, mismos resultados).
- [ ] En desarrollo, un esquema inválido muestra overlay con código, path y hint; en
      producción solo avisa por consola y pinta `fallback`.
- [ ] Un `AsyncIterable` real (generador que emite tokens con retardo) pinta la pantalla
      progresivamente: se ve crecer sin parpadeos y sin re-montar subárboles ya cerrados
      (verificado con un contador de montajes por nodo).
- [ ] `engine.getReport()` devuelve avisos, denegaciones, acciones ejecutadas y nodos
      pintados.
- [ ] El overlay no aparece en `dist/` (verificado sobre el bundle construido).

**Estimación:** 5–7 días.

---

### Fase 10 — Endurecimiento, documentación y piloto real

**Objetivo:** cerrar el alcance con pruebas adversarias, documentación completa y una
pantalla real del sandbox construida **solo** con el motor.

**Entregables**
- Batería adversaria: `type` desconocido, prop prohibida, HTML en un texto, acción no
  registrada, `requires` ausente, esquema enorme, ciclos de datos, `redact` incompleto,
  handler que lanza, guard que lanza, encadenado infinito, **stream que se corta**,
  **stream con basura intercalada** y **stream que nunca cierra**.
- Medición de coste en tokens de una pantalla real (dato para decidir el dialecto compacto).
- `docs/json-renderer/SEGURIDAD.md` con el modelo de autoridad y la checklist.
- Actualización de `docs/molecules/json-renderer.md`, `DOCUMENTACION_DETALLADA_COMPONENTES.txt`,
  `LLM_DOCS.md`, `AGENTS.md` y `pnpm docs:llm`.
- Piloto: reconstruir una pantalla existente del sandbox (propuesta: `ScreenDashboard`)
  con esquema JSON y comparar lado a lado.

**Criterios**
- [ ] Los 14 casos adversarios pasan: no rompen la app, no ejecutan código, no filtran
      datos sensibles y dejan la pantalla en su último estado válido.
- [ ] La medición de tokens está hecha y publicada en el documento de alcance.
- [ ] El piloto pinta la misma pantalla que su versión TSX (comparación visual y de
      comportamiento en el sandbox).
- [ ] `pnpm lint`, `tsc --noEmit`, `pnpm test`, `pnpm bundle`, `pnpm build:app` y
      `pnpm audit:sandbox` en verde.
- [ ] `pnpm docs:llm` regenerado sin diferencias pendientes.

**Estimación:** 6–8 días.

---

## 5.bis Estado entregado (fases 0–2)

**Qué hay funcionando**

| Pieza | Archivo | Verificado |
|---|---|---|
| Tipos del esquema y estado pendiente | `src/json-renderer/kernel/types.ts` | tsc |
| Errores con código y ruta (`JR0xx`) | `shared/errors.ts` | 3 pruebas |
| Rutas de esquema | `shared/paths.ts` | 6 pruebas |
| Presupuestos | `shared/limits.ts` | 5 pruebas |
| Parser tolerante de JSON incompleto | `stream/tolerantParse.ts` | 10 pruebas, **truncado en las 714 posiciones** |
| Catálogo de 17 tipos con lista blanca | `catalog/axzyCatalog.ts` | 10 pruebas de resolución |
| Kernel con nodo pendiente, boundary y presupuesto | `kernel/SchemaRenderer.tsx` | 12 pruebas de render |
| Validación con veredicto `partial` | `validation/validate.ts` | 8 pruebas |
| Migraciones de versión | `validation/migrate.ts` | 4 pruebas |
| Contrato de vocabulario generado | `vocabulary/buildContract.ts` + `pnpm docs:json-renderer` | 7 pruebas |
| Laboratorio en el sandbox | `src/showcases/JsonScreenShowcase.tsx` (`#ui-system/feedback/jsonscreen`) | manual + captura |

**Total: 65 pruebas, `pnpm lint` en 0 errores, `pnpm bundle` y `pnpm build:app` en verde.**

**Desviaciones respecto al borrador**

- El catálogo mínimo tiene **17 tipos** (el plan decía 25): se dejaron fuera los de entrada
  de datos (`ITInput`, `ITSelect`…) porque sin binding ni formularios no aportan nada
  todavía; entran en la fase 8 con el nodo `form`.
- El contrato de vocabulario se genera con esbuild (Node 20 no ejecuta TS) y se publica
  como `docs/json-renderer/vocabulario.json` + `VOCABULARIO.md`.
- `vitest`, `@testing-library/react` y `jsdom@26` entran como devDependencies (jsdom 30
  exige Node 22 por `undici`).

## 6. Resumen de fases

| Fase | Contenido | Días | Depende de | Estado |
|---|---|---|---|---|
|---|---|---|---|
| 0 | Andamiaje, tipos, errores, **parser tolerante**, Vitest | 3–4 | — | ✅ entregada |
| 1 | Kernel **con nodo pendiente** + catálogo mínimo + laboratorio con stream | 5–7 | 0 | ✅ entregada |
| 2 | Validación en modo parcial, códigos, versionado, **contrato de vocabulario** | 5–7 | 0, 1 | ✅ entregada |
| 3 | Catálogo completo (63) generado | 6–8 | 1, 2 | pendiente |
| 4 | Binding, estado y datos | 6–8 | 1 | pendiente |
| 5 | Acciones y efectos | 5–7 | 1, 4 | pendiente |
| 6 | Router, layouts y guards | 6–8 | 1, 5 | pendiente |
| 7 | Permisos y redacción | 4–6 | 1 | pendiente |
| 8 | Formularios y tablas | 7–9 | 4, 5 | pendiente |
| 9 | Entry point, devtools, observabilidad | 5–7 | 1–8 | pendiente |
| 10 | Endurecimiento, docs y piloto | 6–8 | todas | pendiente |
| | **Total** | **58–78 días ideales** | |

Con un solo desarrollador son ~3 meses de calendario. Las fases 4–8 se pueden repartir
entre dos personas sin solaparse (4→5, 7 y 8 son independientes de 6).

---

## 7. Estrategia de pruebas

| Nivel | Qué cubre | Herramienta |
|---|---|---|
| Unidad | paths, límites, validador, binding, operadores, guards, reglas de formulario | Vitest |
| Integración | esquema → árbol de componentes resuelto (sin DOM): tipos, props y avisos | Vitest |
| Render | fixtures de los 63 componentes y de los 4 ejemplos del sandbox | Vitest + testing-library (si se aprueba) |
| Adversarias | los 11 casos de la fase 10 | Vitest |
| Navegador | flujos reales en el sandbox + a11y y recorte | `pnpm audit:sandbox` (ya existe) |

Se propone añadir `vitest` y `@testing-library/react` como devDependencies. Si no se
aprueba testing-library, los niveles de render se cubren con el laboratorio del sandbox y
comprobaciones manuales descritas paso a paso.

---

## 8. Documentación por fase

| Documento | Se crea/actualiza en |
|---|---|
| `docs/json-renderer/ALCANCE.md` | Ya escrito (este plan lo acompaña) |
| `docs/json-renderer/PLAN-IMPLEMENTACION.md` | Ya escrito |
| `docs/json-renderer/REFERENCIA.md` | Fase 1 (semilla) y fase 3 (autogenerado) |
| `docs/json-renderer/VOCABULARIO.md` | Fase 2 (contrato para el emisor) y fase 3 (completo) |
| `docs/json-renderer/STREAMING.md` | Fase 0 (parser tolerante) y fase 9 (driver) |
| `docs/json-renderer/RECETARIO.md` | Fase 8 |
| `docs/json-renderer/MIGRACION.md` | Fase 9 |
| `docs/json-renderer/SEGURIDAD.md` | Fase 10 |
| `docs/molecules/json-renderer.md` | Al cerrar cada fase que cambie API |
| `DOCUMENTACION_DETALLADA_COMPONENTES.txt`, `LLM_DOCS.md`, `ai/` | Fase 10 (`pnpm docs:llm`) |
| `AGENTS.md` | Fase 0 (Vitest y dominio `src/json-renderer/`) |

---

## 9. Riesgos globales del plan

| Riesgo | Señal temprana | Mitigación |
|---|---|---|
| El alcance crece solo («ya que estamos, añade X») | Nuevos operadores o nodos sin receta que los pida | Regla: cada capacidad nueva entra con un caso real del sandbox y su test |
| Divergencia entre el PoC y el motor | Dos formas de pintar lo mismo en el sandbox | Retrocompatibilidad en la fase 1 y una sola ruta de render desde entonces |
| El catálogo generado no cubre props complejas | Fixtures que fallan al resolver `columns`/`navigationItems` | `kind: "structured"` con especificación y validación propias (fase 3) |
| Coste de mantenimiento de 63 entradas | PRs que rompen el catálogo | Script de regeneración + test de paridad con el catálogo LLM |
| El motor se acopla a un router | Tests que necesitan el DOM real | `adapter` con interfaz mínima desde la fase 6 |
| Permisos mal usados | Esquemas que «deciden» con `when` cosas de seguridad | `requires` es lo único que decide; `when` nunca consulta permisos que no sean del host |

---

## 10. Definición de terminado (por fase)

Una fase está terminada cuando:

1. El código compila (`tsc --noEmit`) y `pnpm lint` termina en **0 errores**.
2. Las pruebas de la fase pasan y las anteriores siguen pasando.
3. Los criterios de aceptación de la fase están marcados y **verificados** (no supuestos).
4. `pnpm bundle` y `pnpm build:app` siguen en verde y `dist/` no gana dependencias.
5. La documentación de la fase está escrita y enlazada.
6. Se describe cómo el sandbox demuestra la capacidad nueva.

---

## 11. Catálogo de códigos de error (contrato estable)

| Código | Significado |
|---|---|
| `JR010` | `type` fuera del catálogo |
| `JR011` | Prop prohibida o no declarada |
| `JR012` | Componente lanzó durante el render (aislado) |
| `JR013` | Presupuesto de nodos/profundidad excedido |
| `JR020` | Esquema inválido (estructura o versión) |
| `JR021` | Nodo inválido (forma o `type` ausente) |
| `JR030` | Fuente de datos sin `handler` registrado |
| `JR031` | El esquema intenta provocar red (prohibido) |
| `JR040` | Acción no registrada |
| `JR041` | Acción excedió su timeout |
| `JR042` | Encadenado de efectos demasiado profundo |
| `JR050` | Guard de ruta lanzó o devolvió algo inválido |
| `JR060` | Capacidad insuficiente para un nodo |
| `JR061` | Capacidad insuficiente para una acción |
| `JR070` | Migración de versión ausente |
| `JR080` | Stream cortado sin cerrar (se conserva el último árbol válido) |
| `JR081` | Trabajo por fragmento excedido (render diferido al siguiente frame) |

---

## 12. Próximo paso

Decisiones ya tomadas (§13 del alcance): estado **local**, `ITWysiwyg` **fuera**, formato
**JSON canónico**, nodo **`form`**, publicación **en el paquete actual**.

Queda por decidir, y no bloquea el arranque:

1. **Nodo pendiente**: reservar hueco con `ITSkeleton` o no pintar hasta cerrar. Se decide
   mirando el laboratorio de la fase 1 con el botón «emitir como stream».
2. **Reparación**: ¿`repairSchema()` para que el host lo use al reintentar, o el motor solo
   valida e informa?
3. **Dialecto compacto**: se decide con la medición de tokens de la fase 10.
4. **Sinónimos de vocabulario**: si el modelo emite `text` donde va `label`, ¿el contrato
   publica sinónimos aceptados o el motor solo avisa y descarta?

Arranque propuesto: fases **0 → 1 → 2** (13–18 días ideales) para tener el kernel, el
parser tolerante, la validación parcial y el laboratorio con stream funcionando. A partir
de ahí el catálogo completo y los módulos se reparten.
