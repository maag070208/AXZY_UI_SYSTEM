# Guía: cómo construir una pantalla con JSON

Esta guía es para **nosotros** y para **cualquier IA** que tenga que escribir una pantalla.
Sigue los pasos en orden. Cada paso dice qué archivo tocar, qué escribir y cómo comprobar
que quedó bien.

> La referencia completa está en [`REFERENCIA.md`](./REFERENCIA.md). El catálogo de
> componentes, con sus props, está en [`VOCABULARIO.md`](./VOCABULARIO.md) y en
> [`vocabulario.json`](./vocabulario.json). El schema para el editor está en
> [`screen.schema.json`](./screen.schema.json).

---

## 0. La idea en una frase

Una pantalla es **un archivo JSON que describe qué componentes mostrar**. El JSON no
ejecuta código, no hace peticiones y no escribe HTML. Lo que hace algo (cargar datos,
guardar, navegar) lo hace **el host**, que es la aplicación. El JSON solo lo **nombra**.

```
JSON (qué mostrar)  →  motor (lo pinta)  →  host (datos, acciones, navegación)
```

---

## 1. Antes de empezar

| Qué | Dónde |
|---|---|
| Páginas JSON del demo | `public/demo/app/*.json` |
| Rutas (qué pantalla responde a cada dirección) | `public/demo/app/routes.json` |
| Marca del shell | `public/demo/app/layout.json` |
| Textos traducidos del demo | `src/sandbox/i18n.ts` |
| Acciones, fuentes de datos y slots del demo (lo que el host registra) | `src/showcases/DemoJsonDashboard.tsx` |

Comprueba siempre con:

```bash
pnpm schema:check
```

Te dice, archivo por archivo, si el JSON cumple la forma. Si está abierto en VS Code, el
autocompletado sale por `.vscode/settings.json`.

---

## 2. Paso 1 · La forma mínima de una pantalla

Todas las pantallas tienen esta forma. Copia y cambia lo que haga falta:

```json
{
  "$schema": "axzy/screen",
  "version": 1,
  "id": "demo.mi-pantalla",
  "title": { "i18n": "sandbox.app.miPantalla.title" },
  "description": { "i18n": "sandbox.app.miPantalla.lead" },
  "content": [
    {
      "type": "ITText",
      "text": { "i18n": "sandbox.app.miPantalla.saludo" },
      "props": { "as": "h2" }
    }
  ]
}
```

Reglas de esta forma:

- `version` siempre es `1`. `id` es único.
- `content` es un nodo o una lista de nodos.
- Cada nodo tiene un `type`, que es un componente del catálogo.
- `title` y `description` son opcionales, pero si los pones, usa `{ "i18n": … }`.

---

## 3. Paso 2 · Elegir componentes

Los componentes disponibles y sus props están en [`VOCABULARIO.md`](./VOCABULARIO.md).
Los más usados:

| Para… | Componente | Props útiles |
|---|---|---|
| Texto | `ITText` | `as` (`span`, `p`, `h2`…), `muted`, `className`, o el atajo `text` |
| Botón | `ITButton` | `label`, `size`, `variant`, `color`, `onClick` |
| Apilar en columna o fila | `ITStack` | `direction`, `spacing`, `alignItems`, `justifyContent`, `flexWrap` |
| Fila con salto | `ITFlex` | `gap`, `wrap`, `align`, `justify` |
| Rejilla | `ITGrid` | `container`, `item`, `spacing`, `xs`, `md` |
| Tarjeta de métrica | `ITStatCard` | `label`, `value` |
| Aviso | `ITAlert` | `variant` (`info`, `success`, `warning`, `error`), `title` |
| Tarjeta | `ITCard` | `title`, `onClick` |
| Separador | `ITDivider` | `orientation` |
| Tabla con paginación | `ITDataTable` | `columns`, `fetchData`, `onRowClick` |

**Regla:** usa solo las props que aparecen en el vocabulario para ese `type`. Lo demás se
descarta con aviso (`JR011`).

**Hijos:** los componentes que admiten hijos los llevan en `children`:

```json
{
  "type": "ITStack",
  "props": { "direction": "column", "spacing": 4, "alignItems": "stretch" },
  "children": [
    { "type": "ITText", "text": { "i18n": "sandbox.app.miPantalla.saludo" } },
    { "type": "ITDivider", "props": { "orientation": "horizontal" } }
  ]
}
```

---

## 4. Paso 3 · Textos siempre traducidos

**Nunca** escribas texto visible a pelo si puedes evitarlo. Usa una clave:

```json
{ "type": "ITButton", "props": { "label": { "i18n": "sandbox.app.miPantalla.guardar" } } }
```

Luego añade la clave en los dos idiomas:

- En el demo: `src/sandbox/i18n.ts`, en `es` y en `en`.
- En la librería: `src/i18n/locales/es.ts` y `en.ts`.

Si una clave no existe, normalmente se ve la clave en lugar del texto. El test
`demoJson.test.tsx` lo detecta.

Los textos con variables usan `params` (ejemplo ilustrativo; la clave no existe en el demo):

```json
{ "i18n": "sandbox.app.pedidos.total", "params": { "cuenta": "3" } }
```

---

## 5. Paso 4 · Datos de una tabla

Una tabla no trae sus datos en el JSON. Declara **una fuente** y el host registra el
handler que los entrega.

**En el JSON:**

```json
{
  "version": 1,
  "id": "demo.usuarios",
  "data": {
    "usuarios": { "handler": "usuarios" }
  },
  "content": {
    "type": "ITDataTable",
    "props": {
      "columns": [
        { "key": "nombre", "label": "Nombre", "type": "string", "sortable": true, "filter": true },
        { "key": "rol", "label": "Rol", "type": "string", "filter": "catalog" }
      ],
      "fetchData": { "$source": "usuarios" },
      "defaultItemsPerPage": 10
    }
  }
}
```

**En el host** (`DemoJsonDashboard.tsx`), el handler con ese nombre:

```tsx
const dataHandlers = { usuarios: (query) => fetchUsuarios(query) };
```

Cómo se lee:

- `data` declara la fuente y dice qué handler la atiende.
- `{ "$source": "usuarios" }` en `fetchData` conecta la tabla con esa fuente.
- El JSON **no puede poner una URL**. Si lo intenta, el schema lo rechaza.

---

## 6. Paso 5 · Estado y parámetros

- **`state`**: valores iniciales de la pantalla. Se leen con `{ "$state": "clave" }`.
- **`$param`**: valores de la dirección (`/usuarios/:id`). El host los pasa; se leen con
  `{ "$param": "id" }`.

```json
{
  "version": 1,
  "id": "demo.titulo",
  "state": { "titulo": "Usuarios" },
  "content": { "type": "ITText", "text": { "$state": "titulo" }, "props": { "as": "h2" } }
}
```

> Escribir en `state` desde el JSON todavía no existe. Eso llega con las acciones que
> escriben estado (pendiente).

---

## 7. Paso 6 · Rutas: qué pantalla responde a cada dirección

Una pantalla no se abre sola: `routes.json` dice qué dirección la pinta.

```json
{
  "$schema": "axzy/routes",
  "version": 1,
  "routes": [
    {
      "id": "inicio",
      "path": "/inicio",
      "page": "inicio",
      "nav": { "label": { "i18n": "sandbox.app.nav.inicio" }, "icon": "home" }
    },
    {
      "id": "usuarios",
      "path": "/usuarios",
      "nav": { "label": { "i18n": "sandbox.app.nav.usuarios" }, "icon": "users" },
      "children": [
        { "id": "u-todos", "page": "usuarios", "nav": { "label": { "i18n": "sandbox.app.sub.todos" } } },
        { "id": "u-activos", "page": "usuarios", "query": { "estado": "Activo" },
          "nav": { "label": { "i18n": "sandbox.app.sub.activos" } } }
      ]
    },
    { "id": "usuario-detalle", "path": "/usuarios/:id", "page": "usuario-detalle" }
  ]
}
```

Reglas:

- **Hoja:** tiene `page` y no tiene `children`. Es lo que se pinta.
- **Grupo:** tiene `children` y no tiene `page`. Solo agrupa entradas del menú.
- `nav` es opcional: sin él, la ruta existe pero **no sale en el menú**.
- `query` distingue variantes de la misma página (`?estado=Activo`).
- `:id` es un parámetro: llega a la página como `$param`.
- Un segmento fijo gana a un parámetro: `/usuarios/nuevo` antes que `/usuarios/:id`.

Para una pantalla nueva: crea `public/demo/app/mi-pantalla.json` y añade una ruta que la
apunte.

---

### Permisos: `requires`

Un nodo (o la pantalla entera) puede exigir una capacidad con `requires`:

```json
{ "type": "ITButton", "props": { "label": { "i18n": "sandbox.app.borrar" } },
  "requires": "usuarios.eliminar",
  "fallback": { "type": "ITText", "text": { "i18n": "sandbox.app.sinPermiso" } } }
```

El host decide qué capacidades concede, con la prop `capabilities` del renderizador. Sin
concesión, el nodo no se pinta (o pinta su `fallback`) y se avisa con `JR060`. El JSON solo
nombra la capacidad: nunca decide si el usuario la tiene.

## 8. Paso 7 · Acciones: botones que hacen algo

Un botón **nombra** una acción. El host la resuelve por nombre:

```json
{ "type": "ITButton", "props": { "label": { "i18n": "sandbox.app.nuevo" }, "onClick": { "action": "nuevo-registro" } } }
```

Acciones que ya existen en el demo y puedes usar: `ir-pagina`, `nuevo-registro`,
`ver-usuario`, `editar-usuario`, `exportar-reporte`, `enviar-contacto`. Lista oficial:
`DEMO_ACTIONS` en `DemoJsonDashboard.tsx`. Para añadir una acción nueva, el host la
registra en `resolveAction`.

Pasar argumentos: `"args"` llega al host.

```json
{ "action": "ir-pagina", "args": { "pagina": "usuarios" } }
```

---

## 9. Paso 8 · Efectos: qué pasa después de la acción

Lo que pasa **después** de una acción se declara en el JSON, con `then` (si sale bien) y
`onError` (si falla). El host cumple los efectos. El ejemplo siguiente es ilustrativo: muestra la forma, no un caso del demo.

```json
{
  "action": "enviar-contacto",
  "then": [
    { "toast": { "variant": "success", "message": { "i18n": "sandbox.app.contact.sent" } } },
    { "navigate": "/usuarios/{id}" }
  ],
  "onError": { "toast": { "variant": "error", "message": { "i18n": "sandbox.app.contact.error" } } }
}
```

Efectos disponibles: `toast`, `navigate`, `refresh`, `openOverlay`, `closeOverlay`.

Dos cosas más:

- **Encadenar:** un efecto puede ser otra acción, con `action`, `args` y sus propios
  `then`. Tiene un límite de 5 niveles.
- **Datos del resultado:** el handler puede devolver datos. Un texto los lee con
  `{ "$result": "campo" }`, y una dirección con `{campo}`:

```json
{ "toast": { "message": { "i18n": "pedido.creado", "params": { "folio": { "$result": "folio" } } } } }
```

El host registra los efectos con la prop `effects`: `{ toast, navigate, refresh, … }`.
Si el JSON pide un efecto que el host no tiene, el motor avisa con `JR040`.

---

## 10. Paso 9 · Formularios

Un `form` pinta sus campos, valida y entrega los valores a una acción:

```json
{
  "type": "form",
  "id": "contacto",
  "props": {
    "fields": [
      { "name": "nombre", "kind": "text", "label": { "i18n": "sandbox.app.form.name" },
        "required": true, "minLength": 2 },
      { "name": "correo", "kind": "email", "label": { "i18n": "sandbox.app.form.email" },
        "required": true }
    ],
    "submitLabel": { "i18n": "sandbox.app.contact.send" },
    "onSubmit": { "action": "enviar-contacto" }
  }
}
```

Reglas de campo:

- `kind`: `text` (por defecto) o `email`.
- `required`, `minLength`, `maxLength`. **No hay expresiones regulares** en el JSON.
- Los errores salen solos, bajo cada campo. Los textos son `jsonRenderer.form.*`.
- `onSubmit` solo se dispara si todos los campos son válidos.

---

## 11. Paso 10 · Lo que el JSON no puede hacer: slots

Si necesitas un bloque con lógica propia (una gráfica con datos calculados, un diálogo
complejo), **no** lo escribas en JSON. El host lo registra como **slot**:

```json
{ "type": "slot", "props": { "name": "graficaIngresos" } }
```

```tsx
// En el host
const slots = { graficaIngresos: GraficaIngresos };
<ITSchemaRenderer schema={schema} slots={slots} />
```

Los props del slot son valores del JSON (ya resueltos). El JSON no puede elegir qué
componente se monta: solo el nombre que el host registró. Nombre desconocido → `JR010`.

---

## 12. Paso 11 · Comprobar

Antes de dar la pantalla por buena:

```bash
pnpm schema:check              # forma del JSON contra el schema
pnpm test                      # incluye los JSON del demo: acciones, slots, traducciones y render
```

Y mira la pantalla en el navegador. En la cabecera del demo aparece el veredicto:
`VALID · 0 AVISOS`. Si hay avisos, salen con su código.

### Códigos de aviso que vas a ver

| Código | Qué significa | Qué hacer |
|---|---|---|
| `JR010` | `type` que no existe, o slot sin registrar | Revisa el nombre contra `VOCABULARIO.md` |
| `JR011` | Prop que el componente no tiene, o valor inválido | Quita la prop o corrige el valor |
| `JR012` | Un componente lanzó al pintarse (queda aislado) | Revisa el componente del host |
| `JR014` | Un `id` que no llegó al DOM | Quita el `id` o ponlo en un nodo que lo acepte |
| `JR020` | Estructura de la pantalla o de las rutas | Revisa `version`, `id`, `content`, `page` |
| `JR021` | Nodo, campo o ruta mal formados | Revisa `type`, `name`, `path` |
| `JR030` | Fuente sin declarar o handler que el host no tiene | Declara la fuente en `data` y regístrala en el host |
| `JR032` | Referencia sin valor, o operador que todavía no existe | Declara el valor, o usa uno de los soportados |
| `JR040` | Acción o efecto que el host no implementa | Regístralo en el host o quítalo |
| `JR042` | Encadenado de acciones demasiado profundo | Reduce los `then` anidados |

---

## 13. Lista de comprobación final

- [ ] La pantalla tiene `$schema`, `version: 1`, `id`, `content`.
- [ ] Cada `type` está en `VOCABULARIO.md`.
- [ ] Cada prop está en el vocabulario para ese `type`.
- [ ] Ningún texto visible va a pelo: todos son `{ "i18n": … }` y las claves existen en `es` y en `en`.
- [ ] No hay URLs, código, HTML ni expresiones en el JSON.
- [ ] Cada tabla tiene su fuente en `data` y su handler en el host.
- [ ] Cada acción está en `DEMO_ACTIONS` (o el host la registra).
- [ ] Si hay una ruta nueva, está en `routes.json` y su página existe.
- [ ] `pnpm schema:check` pasa.
- [ ] `pnpm test` pasa.
- [ ] La pantalla se ve sin avisos en el navegador.

---

## 14. Para la IA: reglas duras

Si eres una IA escribiendo una pantalla, cumple estas reglas sin excepción:

1. **Emite solo JSON** con la forma del paso 1. Nada de texto alrededor del JSON si te lo piden como archivo.
2. **Usa solo componentes del vocabulario** (`VOCABULARIO.md`). Si algo no existe, no lo inventes: usa un `slot` y dilo.
3. **Usa solo props declaradas** para cada componente. Lo que no esté, no va.
4. **Todo texto visible es `{ "i18n": "clave" }`.** Propón las claves nuevas al final, para que el equipo las añada en `es` y en `en`.
5. **Nunca pongas URLs, código, HTML, `fetch` ni expresiones.** Los datos llegan por `data` + `$source`.
6. **Las acciones solo se nombran.** Usa nombres de `DEMO_ACTIONS` o di que el host debe registrar uno nuevo.
7. **Una tabla siempre tiene `data` y `$source`.** Sin fuente, no hay datos.
8. **Las rutas van en `routes.json`**, no en el JSON de la página.
9. **Verifica** con `pnpm schema:check` antes de entregar.

### Plantilla para pedir una pantalla a una IA

```text
Escribe una pantalla JSON para AXZY UI System siguiendo docs/json-renderer/GUIA-PANTALLAS.md.

Objetivo: <qué debe hacer la pantalla>
Componentes: usa solo los de VOCABULARIO.md
Datos: <tabla/fuente y columnas, si aplica>
Acciones: <botones y qué hacen; usa nombres de DEMO_ACTIONS o propón nuevos>
Textos: claves i18n nuevas en la lista final, en es y en
Ruta: <dirección y si sale en el menú>

Entrega: el JSON de la página, la entrada de routes.json y la lista de claves i18n.
```

---

## 15. Errores comunes

| Error | Por qué pasa | Cómo evitarlo |
|---|---|---|
| Ver la clave `sandbox.app.x` en lugar del texto | Falta la clave en `i18n.ts` (`es` o `en`) | Añádela en los dos idiomas |
| La tabla sale vacía | La fuente no está en `data` o el handler no existe | Revisa `data` y `dataHandlers` |
| El botón no hace nada | La acción no está registrada en el host | Usa un nombre de `DEMO_ACTIONS` |
| La pantalla no aparece en el menú | Falta `nav` en la ruta | Añade `nav` o quítalo a propósito |
| `/usuarios/42` muestra el listado | Falta la ruta `/usuarios/:id` | Añádela en `routes.json` |
| `JR011` por una prop | Usaste una prop que el componente no tiene | Mira `VOCABULARIO.md` |
| Autocompletado no aparece | El archivo no está en la carpeta asociada, o VS Code no lee el `$schema` | Revisa `.vscode/settings.json` |
