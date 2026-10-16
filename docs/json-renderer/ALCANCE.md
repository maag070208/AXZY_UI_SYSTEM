# ITJsonRenderer — Alcance del motor de pantallas declarativas

> **Estado:** propuesta para aprobación · **Versión:** 1.0 (borrador)
> **Autor:** AXZY UI System · **Ámbito:** `@axzydev/axzy_ui_system` (componente publicado)
> **Documento hermano:** [PLAN-IMPLEMENTACION.md](./PLAN-IMPLEMENTACION.md) (fases, entregables y criterios)

---

## 1. Resumen ejecutivo

`ITJsonRenderer` deja de ser un PoC que mapea 8 componentes y pasa a ser un **motor
declarativo de pantallas**: un runtime que toma un esquema JSON versionado y construye
la pantalla completa —layout, componentes, datos, acciones, rutas, permisos y textos—
sin escribir TSX por cada pantalla.

La decisión central del alcance es esta: **el JSON describe la intención, el host
conserva la autoridad**. El motor nunca decide permisos, nunca ejecuta código, nunca
pide datos por su cuenta y nunca pinta HTML crudo. Todo lo que puede hacer un esquema
está firmado de antemano por la aplicación que lo monta.

El caso de uso que manda es **UI generada por IA**: un agente emite el esquema por
tokens, en trozos, y la pantalla se va construyendo mientras llega. Eso convierte el
esquema en **entrada no confiable** y convierte el **streaming en una capacidad del
kernel**, no en una fase al final.

El motor se reparte en **módulos independientes** (kernel, catálogo, validación,
binding, acciones, router, permisos, i18n, formularios, tablas, herramientas) y se
compone con **un único entry point**:

```tsx
const engine = createEngine({
  schema,                       // el esquema de la pantalla (objeto o JSON string)
  catalog: axzyCatalog,         // módulo: qué componentes y props se aceptan
  data: hostDataModule,         // módulo: de dónde salen los datos y el estado
  actions: { guardar, borrar }, // módulo: manejadores por nombre
  router: hashRouter,           // módulo: rutas y guards
  permissions: userCaps,        // módulo: qué puede ver y hacer este usuario
  i18n: appI18n,                // módulo: catálogo de textos
});

<engine.Provider>{/* ITLayout, ITPage, ITDataTable… ya vienen del esquema */}</engine.Provider>
```

---

## 2. Objetivo

Construir pantallas **más rápido y más simple** que escribiendo TSX, cubriendo el ciclo
completo de una pantalla de producto:

| Necesidad real | Hoy | Con el motor |
|---|---|---|
| Definir una pantalla | TSX a mano por pantalla | Un esquema JSON versionado |
| Componentes disponibles | 8 tipos (`button`, `text`, `card`, `flex`, `stack`, `grid`, `alert`, `div`) | Los 63 del sistema, por familias y con lista blanca de props |
| Datos | No existen | `dataSources` declarados que el **host** resuelve; estados de carga/vacío/error incluidos |
| Acciones | No existen | `actions` declarativas por nombre, resueltas contra un registro del host |
| Rutas | No existen | Tabla de rutas, parámetros, `redirect`, guards |
| Permisos | No existen | Capacidades por nodo y **redacción de campos** antes de pintar |
| Textos | No existen | Claves `i18n` resueltas por el host |
| Estructura | Archivo único | Módulos componibles + entry point |

---

## 3. Principios de diseño

1. **El JSON no es código.** Describe datos, no comportamiento. Ni `eval`, ni expresiones,
   ni funciones serializadas, ni referencias a módulos.
2. **La autoridad es del host.** Componentes, props, datos, acciones, rutas y permisos se
   registran en la aplicación. El esquema solo puede pedir lo que ya fue autorizado.
3. **Seguro por defecto.** Lista blanca (no lista negra), validación antes de renderizar,
   límites de tamaño y aislamiento por error boundary.
4. **Composición sobre configuración.** Cada capacidad es un módulo que se enchufa; el
   motor funciona con el mínimo (solo kernel) y crece según lo que le des.
5. **Un esquema, un contrato.** Versionado, validable con JSON Schema y con migraciones
   explícitas entre versiones.
6. **Parcial es un estado válido.** Un esquema a medio llegar no es un esquema roto: el
   kernel sabe pintar lo completo y reservar el hueco de lo que falta, sin parpadeos ni
   reconstruir el árbol entero en cada token.
7. **Errores accionables.** Todo fallo (nodo inválido, prop prohibida, acción inexistente,
   permiso denegado) tiene un código, un path (`screens[0].children[3].props.x`) y, en
   desarrollo, una traza visible en pantalla.

---

## 4. Modelo de seguridad

Cinco capas, de fuera hacia dentro. Cualquiera de ellas puede detener un esquema.

**El esquema se trata siempre como entrada no confiable.** No porque el autor sea
hostil, sino porque el emisor principal es un modelo que puede alucinar un componente,
inventarse una prop, emitir HTML dentro de un texto o cerrar mal el JSON. El motor no
confía ni en el esquema propio: la lista blanca se aplica igual.

| Capa | Qué hace | Cuándo actúa |
|---|---|---|
| **1. Esquema (JSON Schema)** | Estructura, tipos, campos requeridos, `additionalProperties: false` | Antes de construir nada |
| **2. Catálogo** | Lista blanca de `type` y de props por componente; valores por defecto; coerción de tipos | Al resolver cada nodo |
| **3. Capacidades** | `requires` por nodo/ruta/acción contra las capacidades del host; `redact` de campos sensibles | Antes de pintar un nodo |
| **4. Registro de acciones** | Solo se ejecutan nombres registrados; las no registradas se ignoran y se avisan | Al disparar un evento |
| **5. Límites y aislamiento** | Máximo de nodos y profundidad, timeout de acciones, error boundary por subárbol, aviso de subárboles que fallan | Durante todo el ciclo |

**Reglas duras (no configurables en v1):**

- Prohibido `dangerouslySetInnerHTML`.
- Prohibidas las props que inyectan nodos React: `render`, `component`, `children` como
  función, `icon`/`logo`/`actions`/`emptyAction` con nodos, `fallback` con elemento.
- Prohibido disparar red desde el esquema. No hay `fetch`, `url`, `endpoint` ni `effect`
  dentro del JSON; los datos llegan resueltos por el host.
- Prohibidos los componentes recursivos o que ejecutan entrada del usuario como código:
  `ITJsonRenderer`, `ITJSONEditor`, `ITFormBuilder`, `ITWysiwyg` (este último solo lectura
  y previa petición).
- Prohibido `state`/`visibleIf` con lógica arbitraria: la composición se hace con nodos
  condicionales resueltos por el host (ver §7.5).

### 4.1 Redacción de datos (`redact`)

El recorte de campos ocurre **antes** de que el dato entre en el árbol de render, para que
un campo sensible no acabe ni en el DOM ni en una prop de la que se pueda leer:

```json
{
  "type": "ITDataTable",
  "data": { "source": "usuarios", "redact": ["passwordHash", "token", "interno.*"] },
  "requires": "usuarios.leer"
}
```

### 4.2 Modo confiable (`trusted`) — fuera de alcance en v1

Existe la tentación de un `trusted: true` para esquemas propios que quieran más libertad.
**No entra en v1.** Si más adelante entra, será un módulo aparte, documentado como
inseguro, y con el mismo catálogo como única puerta.

---

## 5. Arquitectura por módulos

Siete módulos con una sola responsabilidad cada uno, más el entry point que los une.

```
                    ┌─────────────────────────────────────────┐
                    │         createEngine()  ← 1 entry point │
                    └───────────────────┬─────────────────────┘
        ┌───────────────┬───────────────┼───────────────┬───────────────┐
        ▼               ▼               ▼               ▼               ▼
  ┌──────────┐   ┌────────────┐   ┌───────────┐   ┌───────────┐   ┌──────────┐
  │ kernel   │   │ catálogo   │   │ datos y   │   │ acciones  │   │ router   │
  │ (árbol,  │◄──│ + validar  │   │ estado    │   │ (handlers │   │ + guards │
  │  render) │   │ + permisos │   │ (binding) │   │  por nom) │   │ + params │
  └──────────┘   └────────────┘   └───────────┘   └───────────┘   └──────────┘
        │               │               │               │               │
        └───────────────┴───────┬───────┴───────────────┴───────────────┘
                                ▼
                    ┌───────────────────────┐
                    │ i18n + formularios +  │   ← módulos opcionales
                    │ tablas + devtools     │
                    └───────────────────────┘
```

| Módulo | Responsabilidad | Obligatorio |
|---|---|---|
| **kernel** | Recorrer el árbol, resolver nodos contra el catálogo, pintar, error boundaries, límites, memoización | Sí |
| **catálogo** | Lista blanca de componentes y props, defaults, coerción, tokens de diseño | Sí (trae el catálogo AXZY por defecto) |
| **validación** | JSON Schema, códigos de error, rutas de error, migraciones de versión | Sí |
| **datos y estado** | `dataSources` resueltos por el host, binding de rutas (`$bind`), estado de pantalla declarado, estados carga/vacío/error | Opcional |
| **acciones** | Registro `nombre → handler`, argumentos desde el nodo, confirmaciones, encadenado, timeout, auditoría | Opcional |
| **router** | Tabla de rutas, params tipados, anidado con layouts, `redirect`, guards por capacidad | Opcional |
| **permisos** | Capacidades, `requires`, `redact`, denegación con `fallback` declarativo | Opcional |
| **i18n** | Resolución de claves y parámetros en los textos del esquema | Opcional |
| **formularios** | Esquema de campos → validación → envío por acción | Opcional |
| **tablas** | Columnas, filtros, paginación, acciones por fila | Opcional |
| **devtools** | Overlay de errores, inspector del esquema, contador de nodos y tiempos | Solo desarrollo |

---

## 6. Catálogo de componentes

Los 63 componentes del sistema, agrupados por lo que aportan a un esquema. El catálogo
por defecto expone las props **permitidas** de cada uno; el resto se ignora y se avisa.

| Familia | Componentes | Uso típico en un esquema |
|---|---|---|
| **Layout y primitivas** | `ITFlex`, `ITStack`, `ITGrid`, `ITDivider`, `ITLayout`, `ITPage`, `ITPageHeader` | Estructura de la pantalla, rejillas, cabeceras |
| **Tipografía y estado** | `ITText`, `ITBadget`, `ITChip`, `ITAvatar`, `ITImage`, `ITLoader`, `ITSkeleton`, `ITProgress`, `ITEmptyState`, `ITStatCard` | Contenido, métricas, estados vacíos y de carga |
| **Entrada de datos** | `ITInput`, `ITInputNumber`, `ITTextarea`, `ITSelect`, `ITSearchSelect`, `ITMultiSelect`, `ITCheckbox`, `ITRadioGroup`, `ITSlideToggle`, `ITSlider`, `ITSegmentedControl`, `ITDatePicker`, `ITTimePicker`, `ITCalendar`, `ITMaskedInput`, `ITChipInput`, `ITField`, `ITFormHeader` | Formularios declarativos |
| **Superficie y navegación** | `ITCard`, `ITAccordion`, `ITTabs`, `ITBreadcrumbs`, `ITDropdownMenu`, `ITPagination`, `ITStepper`, `ITTripleFilter`, `ITPopover` | Contenedores, filtros, pasos, menús |
| **Datos tabulares** | `ITTable`, `ITDataTable`, `ITSearchTable`, `ITLineBarChart` | Listados y métricas |
| **Retroalimentación y overlays** | `ITAlert`, `ITToast`, `ITDialog`, `ITConfirmDialog`, `ITDrawer`, `ITDropfile` | Avisos y flujos modales |
| **Shell de aplicación** | `ITNavbar`, `ITSidebar`, `ITTopBar` | Marco de la app cuando la ruta define el shell |
| **Excluidos por defecto** | `ITJsonRenderer`, `ITJSONEditor`, `ITFormBuilder`, `ITWysiwyg`, `ITI18nProvider`, `ITThemeProvider` | Recursión, ejecución de entrada o providers (los pone el host) |

### 6.1 Anotaciones de props

El catálogo no es una lista de nombres: cada prop tiene tipo, obligatoriedad, valores
admitidos y notas para el autor del esquema.

```ts
{
  type: "ITDataTable",
  props: {
    data:        { kind: "data",    required: true,  doc: "Filas; llega resuelta del host" },
    columns:     { kind: "columns", required: true,  doc: "Columnas; field/header/width/sortable" },
    loading:     { kind: "boolean", default: false },
    onRowClick:  { kind: "action",  doc: "Nombre de una acción registrada; recibe { row }" },
    emptyTitle:  { kind: "i18n",    doc: "Clave de traducción" },
  },
  forbidden: ["render", "children", "rowKeyRender"],
}
```

---

## 7. Capacidades del esquema

### 7.1 Estructura de nodos

```ts
interface ScreenSchema {
  $schema: "axzy/screen";
  version: 1;
  id: string;
  title?: I18nText;
  requires?: string | string[];
  layout?: LayoutSchema;     // topbar/sidebar/crumbs/página
  data?: DataSourceMap;      // definiciones; el host las resuelve
  state?: StateSchema;       // valores iniciales de pantalla
  content: NodeSchema | NodeSchema[];
  overlays?: OverlaySchema[]; // dialogs/drawers con su disparador
}

interface NodeSchema {
  type: CatalogType;         // "ITCard", "ITDataTable"…
  id?: string;               // para binding y depuración
  props?: Record<string, SchemaValue>;
  children?: NodeSchema | NodeSchema[];
  text?: string;             // atajo para ITText
  requires?: string | string[];
  fallback?: NodeSchema;     // qué pintar si no hay permiso o falla
  when?: WhenSchema;         // condicional resuelto por el host, sin lógica libre
}
```

### 7.2 Binding de datos (sin expresiones)

El esquema **nombra** datos; el host los resuelve. Cuatro formas, todas explícitas:

| Forma | Ejemplo | Quién resuelve |
|---|---|---|
| Fuente nombrada | `{ "$source": "usuarios" }` | Host, vía `dataSources` |
| Estado de pantalla | `{ "$state": "filtroActivo" }` | Módulo de estado |
| Parámetro de ruta | `{ "$param": "id" }` | Módulo de router |
| Valor literal | `"Aceptar"`, `42`, `true` | Nadie (constante) |

Composición sin código: `{ "$concat": [...] }`, `{ "$map": { "$source": "roles", "pick": "nombre" } }`,
`{ "$count": { "$source": "filas" } }`. Son un conjunto **cerrado** de operadores, no un
lenguaje: si un caso no está cubierto, se añade un operador o se resuelve en el host.

### 7.3 Datos declarados, resueltos por el host

```json
{
  "data": {
    "usuarios": {
      "handler": "usuarios.listar",
      "params": { "page": { "$state": "page" }, "busqueda": { "$state": "q" } },
      "refreshOn": ["accion:usuario.creado"]
    }
  }
}
```

`handler` es un nombre registrado por el host. El JSON nunca contiene una URL.

Cada fuente produce cuatro estados que el motor pinta sin que el autor los escriba:
`loading` (`ITSkeleton`/`ITLoader`), `empty` (`ITEmptyState`), `error` (`ITAlert` con
reintento) y `ok`.

### 7.4 Acciones declarativas

```json
{
  "type": "ITButton",
  "props": {
    "label": { "i18n": "usuarios.crear" },
    "onClick": {
      "action": "abrirFormulario",
      "args": { "modo": "crear" },
      "confirm": { "title": { "i18n": "comun.confirmar" } },
      "then": [{ "action": "refrescar", "args": { "source": "usuarios" } }],
      "onError": { "toast": { "variant": "error", "message": { "i18n": "comun.errorGuardar" } } }
    }
  }
}
```

- **Solo nombres registrados.** Una acción desconocida no se ejecuta: aviso + entrada en
  el informe de desarrollo.
- **Argumentos explícitos.** El handler recibe `args` + contexto (`{ row, form, params,
  state, event }`), nunca el esquema completo.
- **Efectos declarativos** (`then`, `onError`, `toast`, `navigate`, `openOverlay`,
  `closeOverlay`, `refresh`), ejecutados por el host con timeout y traza de auditoría.
- **Confirmaciones** con `ITConfirmDialog` generado por el motor a partir de `confirm`.

### 7.5 Condicionales

Sin expresiones libres, pero con lo necesario para el 90 % de los casos:

```json
{ "when": { "state": "modo", "equals": "editar" } }
{ "when": { "source": "usuarios", "status": "loading" } }
{ "when": { "not": { "capability": "usuarios.borrar" } } }
{ "when": { "any": [ … ] } }
```

Un árbol de decisión finito (`equals`, `in`, `not`, `all`, `any`, `capability`,
`status`), evaluado por el kernel. No hay aritmética, ni comparaciones encadenadas, ni
acceso a objetos arbitrarios.

### 7.6 Rutas, layouts y guards

```json
{
  "routes": [
    { "path": "/usuarios", "screen": "usuarios.lista", "requires": "usuarios.leer",
      "layout": { "sidebar": "app", "page": { "title": { "i18n": "usuarios.titulo" } } } },
    { "path": "/usuarios/:id", "screen": "usuarios.detalle",
      "data": { "usuario": { "handler": "usuarios.obtener", "params": { "id": { "$param": "id" } } } } },
    { "path": "/admin", "requires": "admin", "redirect": "/usuarios" },
    { "path": "*", "screen": "no.encontrado" }
  ]
}
```

- Parámetros tipados (`:id`, `:id?`), anidado con layouts, `redirect` estático y por
  capacidad, guard que puede pedir resolución al host (`handler: "sesion.verificar"`).
- El motor **no** navega por su cuenta salvo en `redirect` o efecto `navigate`.
- El shell (`ITLayout` con topbar y sidebar) también se declara: el menú es un árbol de
  navegación, no TSX.

### 7.7 Permisos y redacción

- `requires` acepta una capacidad o una lista (todas).
- Si falla: se pinta `fallback` si existe; si no, el nodo desaparece y se registra el
  motivo.
- `redact` recorta campos antes de entrar al árbol (ver §4.1).
- Las acciones llevan su propia capacidad: un botón visible puede tener la acción
  denegada.

### 7.8 Formularios y tablas (módulos de alto nivel)

- **Formularios:** `ITFormBuilder` no se expone desde el esquema (prohibido), pero el
  motor ofrece un nodo `form` que compila a `ITField` + componentes de entrada, con
  validación declarativa (`required`, `min`, `max`, `pattern`, `minLength`, `email`,
  `custom` por handler del host) y envío por acción.
- **Tablas:** un nodo `table` compila a `ITTable`/`ITDataTable` con columnas, filtros,
  orden, paginación y acciones por fila (`onRowClick`, `rowActions`).

### 7.9 Internacionalización

Todo texto visible es una clave, nunca un literal:

```json
{ "text": { "i18n": "usuarios.total", "params": { "count": { "$count": { "$source": "usuarios" } } } } }
```

Sin `ITI18nProvider`, el motor resuelve el español por defecto, igual que el resto de la
librería. Un literal en un campo de texto se acepta pero se avisa en desarrollo.

### 7.10 Streaming de esquemas parciales

El esquema puede llegar como texto incompleto (`ReadableStream`, `AsyncIterable` o
acumulando tokens). El motor lo trata como un estado de primera clase.

**Qué hace el kernel con un esquema a medias**

| Situación | Comportamiento |
|---|---|
| Falta cerrar un objeto o array | Se pinta lo completo; el hueco pendiente se reserva |
| Un nodo está a medias (`{"type": "ITCa`) | El nodo espera: no se pinta a medias ni parpadea |
| Una prop a medias (`"label": "Acep`) | El valor se marca *pendiente* y se usa el anterior hasta que se cierre |
| `children` incompleto | Los hijos ya cerrados se pintan; el resto se reserva |
| El emisor se corta sin cerrar | Aviso `JR080`; lo pintado se queda, no se desmonta todo |

**Reglas de diseño del streaming**

1. **No hay dialecto distinto.** El stream es el mismo `ScreenSchema` canónico. Si el
   formato de cable fuera otro (más corto para gastar menos tokens), habría dos cosas
   que validar y dos que documentar. El ahorro de tokens se estudia aparte (§13).
2. **Parseo incremental, no re-parseo.** Cada fragmento nuevo se parsea desde el último
   punto válido; los nodos ya cerrados se reutilizan **por identidad** para que la
   memoización no se rompa y React no re-monte subárboles.
3. **Presupuesto mientras llega.** Mismo techo de nodos y profundidad, más un techo de
   trabajo por fragmento: si un token dispara un render caro, se difiere al siguiente
   frame.
4. **Sin parpadeos.** Un nodo pendiente no aparece y desaparece: o se reserva su hueco
   (`ITSkeleton`) o no se pinta hasta que esté cerrado, según lo declare el host.
5. **Cancelación.** Si el emisor se aborta, el motor conserva el último árbol válido y
   avisa; nunca deja la pantalla a medias sin explicación.

**Contrato de vocabulario.** Para que un modelo acierte, el prompt necesita el catálogo
en formato de máquina: qué `type` existen, qué props acepta cada uno y qué valores
admiten los enums. Ese contrato se genera desde `axzyCatalog` (fase 3) y se publica como
artefacto versionado, de modo que el prompt nunca se desincronice del motor.

---

## 8. Ejemplos de referencia

### 8.1 Listado con permisos y acciones

```json
{
  "$schema": "axzy/screen", "version": 1, "id": "usuarios.lista",
  "data": { "usuarios": { "handler": "usuarios.listar", "params": { "page": { "$state": "page" } } } },
  "content": [
    { "type": "ITPageHeader", "props": { "title": { "i18n": "usuarios.titulo" },
      "actions": { "$slot": "acciones" } } },
    { "type": "ITDataTable",
      "data": { "$source": "usuarios" },
      "props": {
        "columns": [
          { "field": "nombre", "header": { "i18n": "usuarios.nombre" }, "sortable": true },
          { "field": "correo", "header": { "i18n": "usuarios.correo" } },
          { "field": "rol",    "header": { "i18n": "usuarios.rol" } }
        ],
        "onRowClick": { "action": "abrirDetalle", "args": { "id": { "$row": "id" } } }
      } }
  ],
  "overlays": [
    { "id": "acciones", "trigger": "acciones", "content": [
      { "type": "ITButton", "requires": "usuarios.crear",
        "props": { "label": { "i18n": "usuarios.crear" }, "onClick": { "action": "abrirFormulario" } } }
    ] }
  ]
}
```

### 8.2 Formulario con validación y error

```json
{
  "$schema": "axzy/screen", "version": 1, "id": "usuarios.form",
  "content": {
    "type": "form",
    "props": {
      "fields": [
        { "name": "nombre", "type": "text",     "label": { "i18n": "usuarios.nombre" }, "required": true },
        { "name": "correo", "type": "text",     "label": { "i18n": "usuarios.correo" }, "rules": ["email"] },
        { "name": "rol",    "type": "select",   "label": { "i18n": "usuarios.rol" },
          "options": { "$source": "roles" } }
      ],
      "submit": { "action": "usuarios.guardar",
        "onError": { "toast": { "variant": "error", "message": { "i18n": "comun.errorGuardar" } } } }
    }
  }
}
```

### 8.3 Ruta con guard y redirección

```json
{
  "$schema": "axzy/routes", "version": 1,
  "routes": [
    { "path": "/entrar", "screen": "auth.login" },
    { "path": "/panel", "screen": "panel.inicio", "requires": "sesion.activa" },
    { "path": "/admin", "screen": "admin.inicio", "requires": "admin" },
    { "path": "*", "redirect": "/panel" }
  ],
  "guards": { "sesion.activa": { "handler": "sesion.verificar", "redirectTo": "/entrar" } }
}
```

---

## 9. Dentro del alcance

- Kernel de render declarativo, retrocompatible con el PoC actual (`type` + `props` +
  `children` + `text` siguen funcionando).
- Catálogo completo de los 63 componentes con lista blanca de props.
- Validación con JSON Schema, códigos de error y rutas de error.
- Versionado del esquema y migraciones entre versiones.
- Módulos: datos/estado, acciones, router, permisos, i18n, formularios, tablas, devtools.
- **Streaming de esquemas parciales** con parseo incremental, nodos pendientes y
  cancelación (§7.10).
- **Contrato de vocabulario** para el emisor (catálogo legible por máquina, generado).
- Entry point único (`createEngine`) y helpers de composición (`defineModule`).
- API imperativa mínima para el host: `engine.getState()`, `engine.setData()`,
  `engine.refresh()`, `engine.dispatch()`.
- Documentación: JSON Schema, referencia de nodos y props, recetario, guía de migración.
- Sandbox: laboratorio con esquemas de ejemplo, validador en vivo e inspector.

## 10. Fuera del alcance (v1)

| Fuera | Por qué | Alternativa |
|---|---|---|
| Expresiones JS o `eval` | Inyección y superficie imposible de auditar | Operadores cerrados + handlers del host |
| `fetch`/URLs en el JSON | SSRF, fugas de token, comportamiento no reproducible | `handler` registrado por el host |
| HTML crudo o props con nodos React | XSS y rompe la lista blanca | Nodos del catálogo |
| `ITFormBuilder`/`ITJSONEditor`/`ITWysiwyg`/`ITJsonRenderer` desde JSON | Recursión, ejecución de entrada, DoS | Nodos `form`/`table` del motor |
| Editor visual bidireccional | Producto aparte | Previsualización + editor JSON en el sandbox |
| Generación de esquemas por IA en runtime | Fuera de la librería | El motor solo consume, valida y pinta lo que llega |
| Dialecto de cable compacto (menos tokens) | Duplicaría validación y documentación | Solo JSON canónico en v1; se estudia si el coste en tokens lo justifica (§13) |
| Reintento automático si el modelo emite algo inválido | Decide el host, no el motor | El host recibe el informe del validador y reintenta |
| Estado global compartido entre pantallas | Acoplamiento oculto | Estado de pantalla + datos del host |
| Render en servidor | No es el foco de la librería | Igual que el resto de componentes |
| Modo `trusted` | Riesgo | Se evalúa en v2 como módulo aislado |

---

## 11. Criterios de aceptación del alcance

- [ ] Un esquema válido de los 3 ejemplos de §8 se pinta **sin escribir TSX** de pantalla.
- [ ] Un esquema con un `type` fuera del catálogo, una prop prohibida o una acción no
      registrada **no rompe la app**: avisa con código y path, y pinta `fallback` o nada.
- [ ] Ningún esquema puede provocar red, ejecutar código ni inyectar HTML (probado con
      casos adversarios).
- [ ] Los 63 componentes del catálogo tienen entrada con props permitidas y un fixture.
- [ ] Un esquema que llega por fragmentos se pinta progresivamente sin parpadeos, sin
      re-montar subárboles y sin bloquear el hilo (medido con el presupuesto por fragmento).
- [ ] Un stream cortado a la mitad deja la pantalla en su último estado válido y avisa.
- [ ] Retrocompatibilidad: los esquemas del PoC actual siguen pintando igual.
- [ ] Todo error del motor es rastreable a un path del esquema.
- [ ] La librería publicada no crece con dependencias nuevas (`dist` sin peso extra).
- [ ] El motor se puede montar solo con el kernel: sin router, sin datos y sin permisos.

---

## 12. Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
|---|---|---|
| El catálogo de 63 componentes se vuelve inmantenible a mano | Alto | Generar el catálogo desde los `*.props.ts` con el mismo script que ya produce `docs/llm/catalogo.json`, y un test que falle si un componente no tiene entrada |
| La validación se percibe como fricción | Medio | Modo permisivo en desarrollo (avisa y pinta), estricto en producción; mensajes con path y código |
| Sobre-diseño del binding | Alto | Empezar con los 5 operadores de §7.2 y crecer solo con casos reales del sandbox |
| Permisos mal entendidos (creer que el JSON decide) | Alto | Documentar el modelo de autoridad y hacer la redacción en el host, antes del árbol |
| Coste de rendimiento en esquemas grandes | Medio | Memoización por nodo, virtualización en tablas, presupuesto de nodos y medición en devtools |
| Migraciones de versión olvidadas | Medio | `version` obligatoria, migraciones registradas, test de compatibilidad por versión |
| Dos verdades: TSX y esquema para la misma pantalla | Medio | Empezar por pantallas nuevas; el sandbox demuestra paridad en 2-3 casos reales |
| El streaming parece "solo parsear JSON" y se deja para el final | Alto | Es una capacidad del kernel desde la fase 1: nodo pendiente, parseo incremental y presupuesto por fragmento |
| El modelo emite `type` o props que no existen | Alto | Contrato de vocabulario generado + lista blanca + `fallback` declarativo; los fallos se miden, no se ignoran |
| Coste en tokens del JSON canónico | Medio | Se mide con una pantalla real antes de decidir un dialecto compacto |

## 13. Decisiones tomadas y pendientes

**Tomadas**

| Decisión | Resuelto |
|---|---|
| Estado de pantalla | **Local por pantalla**; lo transversal lo lleva el host. El estado compartido se añade después como módulo, sin romper contratos |
| `ITWysiwyg` | **Fuera de v1** |
| Formato del stream | **JSON canónico**; sin dialecto de cable en v1 |
| Nodo de formulario | **`form`** en minúscula (regla: mayúscula = componente 1:1, minúscula = nodo compilado por el motor) |
| Publicación | **Todo en el paquete actual**, sin subpath. El subpath se decide con el peso real medido en la fase 9 |

**Pendientes**

1. **Modo de representación de nodos pendientes**: reservar hueco con `ITSkeleton` o no
   pintar hasta cerrar. Afecta a la sensación de "se está escribiendo la pantalla".
2. **Reintento asistido**: ¿el motor ofrece `repairSchema()` (cerrar llaves, quitar el
   último nodo) para que el host lo use al reintentar, o se queda solo en validar?
3. **Coste en tokens**: ¿merece un dialecto compacto? Se decide con la medición de una
   pantalla real (fase 10), no antes.
4. **Reparación de vocabulario**: si el modelo emite `ITButton` con `text` en vez de
   `label`, ¿el motor avisa y descarta, o el contrato de vocabulario publica sinónimos
   aceptados?

## 14. Glosario

- **Esquema**: documento JSON que describe una pantalla o un conjunto de rutas.
- **Catálogo**: registro de componentes y props permitidas.
- **Nodo**: un objeto del esquema que se resuelve a un elemento React.
- **Binding**: referencia declarativa a un dato (`$source`, `$state`, `$param`).
- **Fuente de datos**: definición `handler` + `params` que el host resuelve.
- **Acción**: nombre registrado por el host que el esquema puede invocar.
- **Capacidad**: permiso del host (`usuarios.borrar`) que un nodo o ruta exige.
- **Redacción**: recorte de campos sensibles antes de entrar al árbol de render.
- **Kernel**: núcleo que recorre, valida contra el catálogo y pinta.
- **Nodo pendiente**: nodo que aún no está cerrado en el stream; se reserva su hueco y no se pinta a medias.
- **Parseo incremental**: reutilizar el árbol ya parseado y consumir solo el fragmento nuevo.
- **Contrato de vocabulario**: catálogo legible por máquina que se entrega al emisor para que acierte con `type` y props.
