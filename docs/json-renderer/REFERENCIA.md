# Referencia del esquema (fase 1)

> Versión del formato: **1**. Catálogo de referencia: [`VOCABULARIO.md`](./VOCABULARIO.md)
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

## Datos y páginas (estado actual)

Mientras llegan las fases 4 y 6, el **host** resuelve las dos piezas que el
esquema no puede decidir:

```json
{ "type": "ITDataTable",
  "props": {
    "columns": [{ "key": "nombre", "label": "Nombre", "type": "string", "sortable": true, "filter": true }],
    "fetchData": { "$source": "usuarios" }
  } }
```

- `{ "$source": "usuarios" }` → el host devuelve un `fetchData(params)` (SSR de
  mentira: paginación, orden y filtros reales sobre sus datos).
- `{ "i18n": "clave" }` → texto ya traducido.
- `{ "action": "ir-pagina", "args": { "pagina": "usuarios" } }` → el host navega.
- Las **páginas** son varios esquemas servidos por el host; el router declarativo
  del plan (fase 6) los unificará en un solo esquema de rutas.

Ejemplo completo: `public/demo/app/*.json` + `src/showcases/DemoJsonDashboard.tsx`.

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
| `JR020` | esquema inválido (versión, `id`, `content`) |
| `JR021` | nodo inválido (no es objeto, o `content` vacío) |
| `JR070` | falta la migración de versión |
| `JR080` | stream cortado sin cerrar (se conserva el último árbol válido) |

El catálogo completo, incluidos los códigos de fases posteriores, está en
[`PLAN-IMPLEMENTACION.md`](./PLAN-IMPLEMENTACION.md) §11.
