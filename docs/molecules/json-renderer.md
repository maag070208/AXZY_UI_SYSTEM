# ITJsonRenderer

El componente **ITJsonRenderer** permite renderizar componentes del AXZY UI System a partir de una estructura JSON.

> **En construcción.** El PoC actual (8 tipos de nodo) se está convirtiendo en un **motor
> declarativo de pantallas**. El alcance aprobado y el plan por fases viven en:
>
> - [`docs/json-renderer/ALCANCE.md`](../json-renderer/ALCANCE.md) — qué entra, qué no y el modelo de seguridad.
> - [`docs/json-renderer/PLAN-IMPLEMENTACION.md`](../json-renderer/PLAN-IMPLEMENTACION.md) — fases, entregables y criterios.
>
> Hasta que llegue la fase 1, esta ficha describe el comportamiento **actual** (retrocompatible).

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
