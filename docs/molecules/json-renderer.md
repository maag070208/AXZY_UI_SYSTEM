# ITJsonRenderer

El componente **ITJsonRenderer** permite renderizar componentes del AXZY UI System a partir de una estructura JSON.

> Esta ficha describe **`ITJsonRenderer`**, el PoC retrocompatible de 8 tipos de nodo.
> El motor declarativo nuevo es **`ITSchemaRenderer`** (sección siguiente). Si vas a
> construir pantallas, empieza por ese motor.
>
> - [`GUIA-PANTALLAS.md`](../json-renderer/GUIA-PANTALLAS.md) — guía paso a paso para armar una pantalla.
> - [`REFERENCIA.md`](../json-renderer/REFERENCIA.md) — formato, nodos, acciones, efectos y formularios.
> - [`SEGURIDAD.md`](../json-renderer/SEGURIDAD.md) — qué protege el motor y qué no.
> - [`ALCANCE.md`](../json-renderer/ALCANCE.md) y [`PLAN-IMPLEMENTACION.md`](../json-renderer/PLAN-IMPLEMENTACION.md) — alcance y fases.

## Motor declarativo: `ITSchemaRenderer`

Pinta un documento JSON (`axzy/screen`) contra el catálogo de componentes. El JSON nombra
componentes, datos, acciones y slots; el host registra lo que cada nombre significa.

```tsx
import { ITSchemaRenderer } from "@axzydev/axzy_ui_system";

<ITSchemaRenderer
  schema={schema}                 // documento JSON ya parseado
  params={{ id: "42" }}           // valores de $param (ruta)
  dataHandlers={{ usuarios: fetchUsuarios }}   // fuentes $source
  resolveAction={(node, prop, action) => acciones[action.action]}
  effects={{ toast: (aviso) => mostrarToast(aviso) }}
  slots={{ graficaVentas: GraficaVentas }}     // bloques JSX del host
  resolveValue={(valor) => (esI18n(valor) ? t(valor.i18n) : valor)}
  onIssue={(aviso) => console.warn(aviso.code, aviso.path)}
/>
```

Props principales: `schema`, `catalog`, `params`, `dataHandlers`, `resolveAction`,
`effects`, `slots`, `capabilities`, `resolveValue`, `pendingFallback`, `onIssue`, `limits`,
`className`. `capabilities` es la lista de permisos que concede el host: un nodo con
`requires` solo se pinta si todos están concedidos.
La lista completa y sus tipos está en `ITSchemaRenderer` (`kernel/schemaRenderer.props.ts`).

Qué puede declarar el JSON (resumen; detalle en la guía):

- Componentes del catálogo, más `slot` (bloque del host) y `form` (formulario del motor).
- Datos con `data` y `{ "$source": "…" }`; estado con `state` y `{ "$state": "…" }`;
  parámetros de ruta con `{ "$param": "…" }`.
- Acciones por nombre, con `then` y `onError` para sus efectos (`toast`, `navigate`…).
- Textos siempre como `{ "i18n": "clave" }`.

Los avisos llegan por `onIssue` con código `JR0xx` y ruta exacta. Tabla de códigos en
[`REFERENCIA.md`](../json-renderer/REFERENCIA.md).

## Uso básico

```tsx
<ITJsonRenderer json={{ type: "button", props: { label: "Click me" } }} />
```

## Estructura del JSON

```ts
interface JsonComponentNode {
  type: "button" | "text" | "card" | "flex" | "stack" | "grid" | "alert" | "div";
  props?: Record<string, any>;
  children?: JsonComponentNode[] | React.ReactNode;
  text?: string;
}
```

## Ejemplo anidado

```tsx
<ITJsonRenderer
  json={[
    { type: "alert", props: { variant: "info", title: "Info" }, text: "Desde JSON" },
    {
      type: "card",
      props: { title: "Tarjeta" },
      children: [
        { type: "text", text: "Contenido" },
        {
          type: "flex",
          props: { gap: 2, justify: "end" },
          children: [
            { type: "button", props: { label: "Cancelar", variant: "outlined" } },
            { type: "button", props: { label: "Aceptar" } },
          ],
        },
      ],
    },
  ]}
/>
```

## Hook

También está disponible `useJsonRender(json)` que devuelve el nodo memoizado:

```tsx
import { useJsonRender } from "@axzydev/axzy_ui_system";

const ui = useJsonRender({ type: "button", props: { label: "Go" } });
return <>{ui}</>;
```

## Props

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `json` | `JsonComponentNode \| JsonComponentNode[]` | — | Árbol JSON a renderizar |
| `className` | `string` | — | Clases CSS adicionales |

## Notas

- Es un **PoC**: solo mapea un subconjunto de componentes (button, text, card, flex, stack, grid, alert, div).
- Los `children` pueden ser nodos JSON anidados, strings, números o elementos React.
- En `type="grid"`, por defecto se aplica `container` para simplificar el uso inicial.
