# Referencia del esquema (fase 1)

> Versión del formato: **1**. Catálogo de referencia: [`VOCABULARIO.md`](./VOCABULARIO.md)
> Para construir una pantalla paso a paso, empieza por [`GUIA-PANTALLAS.md`](./GUIA-PANTALLAS.md).
> (generado desde el catálogo real).

## Forma de una pantalla

```ts
interface ScreenSchema {
  $schema?: "axzy/screen";
  version: number;            // obligatoria
  id: string;                 // obligatoria
  title?: SchemaValue;
  requires?: string | string[];
  data?: Record<string, DataSourceSchema>;
  state?: Record<string, SchemaValue>;
  content: NodeSchema | NodeSchema[];   // obligatoria
}
```

## Forma de un nodo

```ts
interface NodeSchema {
  type: string;               // del catálogo, obligatoria
  id?: string;
  props?: Record<string, SchemaValue>;
  children?: NodeSchema | NodeSchema[];
  text?: string;              // atajo para componentes que lo admiten
  requires?: string | string[];
  fallback?: NodeSchema;      // qué pintar si falla o no hay permiso
  when?: WhenSchema;
  $status?: "complete" | "pending";   // lo pone el parser, no el autor
}
```

## Reglas del nodo

| Regla | Consecuencia si se incumple |
|---|---|
| `type` tiene que estar en el catálogo | `JR010`, el nodo no se pinta |
| Las props tienen que estar declaradas | `JR011`, la prop se ignora |
| Los hijos van en `children`, no en props | `JR011`, la prop se ignora |
| Los nodos React no viajan en JSON | `icon`, `actions`, `badge`… están prohibidos |
| Un componente que lanza se aísla | `JR012`, el resto de la pantalla sigue |
| El árbol respeta el presupuesto | `JR013`, se pinta hasta el techo |

## Props por tipo

La tabla completa (17 tipos, 108 props) está en [`VOCABULARIO.md`](./VOCABULARIO.md),
que se regenera con `pnpm docs:json-renderer`. Ahí está también el **nodo mínimo**
que funciona para cada componente: úsalo como punto de partida.

## Ejemplos

```json
{
  "$schema": "axzy/screen",
  "version": 1,
  "id": "demo",
  "content": [
    { "type": "ITBadget", "props": { "label": "Motor", "color": "primary" } },
    { "type": "ITCard", "props": { "title": "Listo para pintar" },
      "children": [{ "type": "ITText", "text": "Este árbol viene de un JSON." }] },
    { "type": "ITButton", "props": { "label": "Ejecutar", "onClick": { "action": "saludar" } } }
  ]
}
```

## Espaciado

`spacing` (`ITStack`, `ITGrid`) y `gap` (`ITFlex`) se multiplican por **0.25rem**:
`spacing={4}` son 1rem. No hay márgenes: el ritmo vertical se construye anidando
stacks, y por eso el `content` raíz debería ser **un solo `ITStack`** en lugar de
un array plano (un array plano no tiene separación entre bloques).

```json
{ "type": "ITStack", "props": { "direction": "column", "spacing": 10, "alignItems": "stretch" },
  "children": [ /* secciones */ ] }
```

- `alignItems`: los stacks que contienen `ITGrid` o filas `justify-between` van
  en `"stretch"` (si no, se encogen); los de contenido (badge, botón suelto) en
  `"start"`, o el badge se centra y los botones ocupan todo el ancho.

## Autocompletado y tester del schema

Los JSON de pantalla y de rutas tienen un JSON Schema (draft 2020-12) generado desde el
catálogo, en `docs/json-renderer/screen.schema.json` y `routes.schema.json`.

- **Generar:** `pnpm docs:json-renderer` (lo regenera junto con el vocabulario).
- **Tester:** `pnpm schema:check` valida `public/demo/app/*.json`; también acepta rutas
  de archivos. Sale con código 1 si algo no cumple. Valida la forma: que una acción,
  fuente o slot exista en el host lo avisa el motor al pintar.
- **Autocompletado:** `.vscode/settings.json` asocia cada JSON del demo con su schema.
  VS Code sugiere `type`, las props de cada componente y los valores de los enums, y
  marca lo que no cumple. Caveat: las pantallas llevan `"$schema": "axzy/screen"`, un
  identificador y no una URL. Si VS Code intenta cargarlo, la asociación puede fallar; en
  ese caso hay que cambiar el identificador o quitar la propiedad. No lo he podido
  comprobar en un VS Code real.
- **Sincronía:** un test compara los archivos versionados con el generador, y otro exige
  que cada prop del catálogo aparezca en el schema.

## Acciones y efectos

Una acción nombra algo que resuelve el host (`{ "action": "enviar" }`). Lo que pasa
después se declara en el JSON y lo cumple el registro `effects` del host.

```json
{
  "action": "enviar-contacto",
  "then": [{ "toast": { "variant": "success", "message": { "i18n": "clave" } } }],
  "onError": { "toast": { "variant": "error", "message": { "i18n": "clave-error" } } }
}
```

- `then`: efectos que se ejecutan si el handler termina bien. Si el handler devuelve una
  promesa, se espera a que resuelva.
- `onError`: efecto si el handler lanza o la promesa rechaza. `then` no se ejecuta.
- Un efecto puede ir también suelto en la acción; cuenta como un `then` más.
- Efectos: `toast` (`variant`: `success`, `error`, `info`, `warning`; `message` admite
  `{ i18n }`), `navigate` (dirección), `refresh` (fuente), `openOverlay` y `closeOverlay`.
- El host pasa su registro con la prop `effects`: `{ toast, navigate, … }`. Cada efecto
  es opcional. Si el JSON pide uno que el host no implementa, el motor avisa con `JR040`
  al pintar, y al ejecutarse no hace nada.
- Sin `then` ni `onError`, el handler del host se usa tal cual.
- Encadenar: un efecto puede ser otra acción, con `action`, `args` y sus propios `then` y
  `onError`. Si el host no tiene la acción encadenada, avisa con `JR040`. El encadenado
  tiene un límite de 5 niveles (`JR042`).
- Datos del resultado: el handler puede devolver datos. Un texto lee `{ "$result": "campo" }`
  (admite puntos, `"usuario.id"`), y una dirección sustituye `{campo}`. Un campo que no
  existe llega vacío, sin romper.

## Formularios (`form`, fase 8 parcial)

Un nodo `form` pinta sus campos, valida al enviar y entrega los valores a una acción
del host. El motor valida; el host decide qué hacer con los datos.

```json
{
  "type": "form",
  "id": "contacto",
  "props": {
    "fields": [
      { "name": "nombre", "kind": "text", "label": { "i18n": "clave" }, "required": true },
      { "name": "correo", "kind": "email", "label": { "i18n": "clave" }, "required": true }
    ],
    "submitLabel": { "i18n": "clave" },
    "onSubmit": { "action": "enviar-contacto" }
  }
}
```

- `kind`: `text` (por defecto) o `email`. Otro tipo avisa con `JR011` y se usa `text`.
- `required`: rechaza vacío y solo espacios. `email`: exige forma de correo.
- `minLength` / `maxLength`: longitud mínima y máxima, contando sin los espacios de los
  extremos. Un campo opcional vacío no se valida por longitud. Un valor que no sea un
  entero no negativo se ignora con `JR011`; `minLength` mayor que `maxLength` descarta el
  campo con `JR021`. No hay reglas por expresión regular: una regex que llega del JSON
  puede bloquear la pestaña.
- Los errores aparecen bajo cada campo desde el primer envío, y desaparecen al escribir
  en el campo. Los textos de error salen de `jsonRenderer.form.*`.
- Un campo sin `name`, o con un `name` repetido, se descarta con `JR021`; el resto se pinta.
- `onSubmit` recibe `{ nombre, correo, … }` solo cuando todos los campos son válidos.
- `submitLabel` es opcional: sin él, el botón dice `jsonRenderer.form.submit`.
- Un formulario sin `props.fields` como lista es `JR021` y no se pinta.

## Slots: bloques JSX del host

Un nodo `slot` monta un componente JSX que registra el host. Así se reutiliza una
pantalla escrita con etiquetas dentro de un JSON. El esquema solo nombra el bloque;
no puede elegir el componente.

```json
{ "type": "slot", "props": { "name": "avisoInicio", "titulo": { "i18n": "clave" } } }
```

```tsx
const AvisoInicio: SlotComponent = ({ titulo }) => <ITAlert variant="info">{String(titulo)}</ITAlert>;
<ITSchemaRenderer schema={schema} slots={{ avisoInicio: AvisoInicio }} />
```

- El componente recibe los `props` del nodo ya resueltos (binding, `i18n`), sin `name`.
- Un nombre que el host no registró → `JR010`, nada se pinta. Sin `props.name` → `JR011`.
- Un slot que lanza queda aislado (`JR012`), igual que cualquier nodo.
- No tiene `children`: el contenido lo pinta el propio componente del host.

## Rutas y navegación (`routes.json`, fase 6 parcial)

Un `routes.json` declara qué pantalla pinta cada dirección y qué entradas aparecen en
el menú. El host no escribe el árbol: lo deriva.

```json
{
  "$schema": "axzy/routes",
  "version": 1,
  "routes": [
    { "id": "inicio", "path": "/inicio", "page": "inicio",
      "nav": { "label": { "i18n": "clave" }, "icon": "home" } },
    { "id": "usuarios", "path": "/usuarios", "nav": { "label": { "i18n": "clave" }, "icon": "users" },
      "children": [
        { "id": "u-todos", "page": "usuarios", "nav": { "label": { "i18n": "clave" } } },
        { "id": "u-activos", "page": "usuarios", "query": { "estado": "Activo" },
          "nav": { "label": { "i18n": "clave" } } }
      ] },
    { "id": "usuario", "path": "/usuarios/:id", "page": "usuario-detalle" }
  ]
}
```

- Una **hoja** lleva `page`; un **grupo** lleva `children` y no `page`. Los hijos
  heredan el `path` del padre si no declaran uno.
- `query` exige claves concretas. Más claves = más específica; con el mismo path,
  gana la que mejor casa con la query de la dirección.
- Segmentos estáticos ganan a `:param` (`/usuarios/nuevo` antes que `/usuarios/:id`).
  Los `:param` llegan a la pantalla como `$param` (prop `params`).
- `nav` es opcional: sin él, la ruta existe pero no aparece en el menú.
- Una dirección que no casa no pinta nada: el host decide (el demo muestra el inicio).
- `validateRoutes(doc)` devuelve avisos (`JR020` estructura, `JR021` ruta o path
  inválidos); `buildNavigationTree(routes)` da el árbol con `href` para el host.

El demo lo usa en `public/demo/app/routes.json`: el sidebar, la barra superior y el
filtro de estado salen de ahí. Sin guards ni layouts anidados todavía (fase 6 completa).

## Datos, estado y parámetros (binding mínimo, fase 4)

El motor resuelve tres referencias. El **host** solo aporta los handlers y los
parámetros de ruta; el esquema no puede nombrar una URL ni un endpoint.

```json
{
  "version": 1,
  "id": "demo.usuarios",
  "state": { "titulo": "Usuarios" },
  "data": { "usuarios": { "handler": "usuarios", "params": { "estado": { "$param": "estado" } } } },
  "content": { "type": "ITDataTable",
    "props": {
      "columns": [{ "key": "nombre", "label": "Nombre", "type": "string", "sortable": true, "filter": true }],
      "fetchData": { "$source": "usuarios" }
    } }
}
```

```tsx
<ITSchemaRenderer
  schema={schema}
  params={{ estado: "Activo" }}
  dataHandlers={{ usuarios: (query, params) => fetchUsuarios(query) }}
  resolveValue={(value) => (isI18nRef(value) ? t(value.i18n) : value)}
/>
```

- `{ "$source": "x" }` → loader `fetchData(query)`. No llama al handler hasta que
  el componente lo invoca. Los parámetros de la fuente se resuelven antes.
- `{ "$state": "x" }` → valor de `state` del esquema (solo lectura; escribir llega con
  las acciones, fase 5).
- `{ "$param": "x" }` → valor de la prop `params` que pone el host.
- Un handler que lanza o rechaza, la carga rechaza y el componente muestra su error;
  el motor no lanza.
- `{ "i18n": "clave" }` y los demás valores pasan a `resolveValue` del host.
- `$row`, `$form`, `$concat`… todavía no: avisan con `JR032`.
- Las **páginas** son varios esquemas servidos por el host; el router declarativo
  del plan (fase 6) los unificará en un solo esquema de rutas.

Las pantallas escritas con etiquetas JSX (`<ITDataTable fetchData={…} />`) no usan
el motor y siguen funcionando igual. Ejemplo completo del motor:
`public/demo/app/*.json` + `src/showcases/DemoJsonDashboard.tsx`.

## `id` y anclas

El `id` de un nodo se aplica al elemento del componente. Funciona cuando el
componente reenvía props al DOM (por ejemplo `ITText`); en un contenedor que no
lo hace, el ancla no existe y el motor avisa con **`JR014`** en lugar de fallar en
silencio. Para una sección con ancla, pon el `id` en el nodo de su título.

```json
{ "type": "ITText", "id": "proyectos", "props": { "as": "h2" }, "text": { "i18n": "demo.proyectos" } }
```

## Códigos de aviso

| Código | Significado |
|---|---|
| `JR010` | `type` fuera del catálogo (o excluido a propósito) |
| `JR011` | prop prohibida, no declarada o con valor inválido; falta una obligatoria |
| `JR012` | el componente lanzó; el nodo se aisló |
| `JR013` | presupuesto de nodos/profundidad excedido |
| `JR014` | el `id` de un nodo no llegó al DOM (el componente no reenvía props) |
| `JR030` | fuente de datos no declarada en `data`, o handler no registrado por el host |
| `JR031` | una fuente declara `url`, `endpoint`, `href` o `src`: las fuentes no pueden pedir red |
| `JR032` | referencia sin valor (`$state`/`$param`) u operador de binding no soportado todavía |
| `JR040` | acción, `onSubmit` o efecto que el host no registra |
| `JR041` | una acción del host excedió `actionTimeoutMs` y se trata como fallida |
| `JR042` | encadenado de acciones desde efectos demasiado profundo (máximo 5 niveles) |
| `JR060` | falta una capacidad de `requires` (nodo, pantalla o `requires` no válido) |
| `JR020` | esquema inválido (versión, `id`, `content`) |
| `JR021` | nodo inválido (no es objeto, o `content` vacío) |
| `JR070` | falta la migración de versión |
| `JR080` | stream cortado sin cerrar (se conserva el último árbol válido) |

El catálogo completo, incluidos los códigos de fases posteriores, está en
[`PLAN-IMPLEMENTACION.md`](./PLAN-IMPLEMENTACION.md) §11.

## Estado, permisos por acción y botones de fila

- **`set` (efecto):** escribe en el estado de la pantalla. Las claves son las de `state`;
  los valores admiten referencias (`{ "$result": "campo" }`, `{ "$state": "otra" }`).
  Ejemplo: `"then": [{ "set": { "folio": { "$result": "id" } } }]`. Al cambiar de esquema,
  el estado vuelve al inicial del nuevo esquema.
- **`requires` en una acción:** la acción solo se ejecuta si el host concede la capacidad
  (prop `capabilities`). Sin concesión, no se ejecuta y avisa con `JR061`.
- **`rowActions` en columnas `type: "actions"`:** botones por fila de una tabla. Cada uno
  declara `label`, `action` y, opcionalmente, `variant`, `color` y `requires`. La acción
  recibe la fila como primer argumento. Sin `action` avisa con `JR021`; sin handler en el
  host, `JR040`.
