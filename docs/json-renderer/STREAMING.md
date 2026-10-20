# Streaming de esquemas

El caso de uso principal del motor es pintar UI que llega **a trozos** desde un
emisor (un agente/LLM o un backend que transmite). Un JSON a medias no es un JSON
roto: es un estado válido del que ya se puede pintar una parte.

## Cómo se usa

```tsx
import { parsePartialSchema, ITSchemaRenderer, ITSkeleton } from "@axzydev/axzy_ui_system";

// `texto` crece con cada token que llega.
const { tree, status, pendingNodes } = parsePartialSchema(texto);

<ITSchemaRenderer
  schema={tree}
  pendingFallback={<ITSkeleton variant="text" count={2} />}
/>
```

- `status: "complete"` → el esquema está entero.
- `status: "pending"` → falta algo; `tree` contiene lo que ya está cerrado.
- `pendingNodes` → cuántos nodos están a medias.

## Qué pinta el kernel con un esquema a medias

| Situación | Resultado |
|---|---|
| Falta cerrar un objeto o array | Se pinta lo completo; el hueco pendiente se reserva |
| Un nodo está a medias | No se pinta a medias ni parpadea: se sustituye por `pendingFallback` |
| Una prop está a medias | El nodo se conserva y se marca `$status: "pending"` |
| `children` incompletos | Los hijos cerrados se pintan; el resto espera |
| El emisor se corta | Se conserva el último árbol válido y se avisa |

## Reglas de diseño

1. **No hay dialecto distinto.** El stream es el mismo JSON canónico. Un formato
   de cable más corto duplicaría validación y documentación: se decidirá midiendo
   el coste en tokens (§13 del alcance).
2. **Lo cerrado no se pierde.** Un nodo ya completo permanece aunque su hermano
   esté a medias. Los contenedores truncados se marcan con `$status: "pending"`.
3. **Parseo por fragmento.** `parsePartialSchema` recibe el texto acumulado y
   devuelve el árbol hasta donde es válido. Es O(n) por llamada; el siguiente paso
   (fase 9) añadirá reutilización por identidad para no re-renderizar de más.
4. **Presupuesto.** Mismo techo de nodos y profundidad que un esquema completo,
   más `maxMsPerChunk` para diferir el trabajo al siguiente frame.
5. **Cancelación.** Si el emisor aborta, el árbol pintado se queda y el `status`
   pasa a informar del corte (`JR080`).

## Qué está probado hoy

- Truncar el esquema de ejemplo en **cada una de sus 714 posiciones** no lanza,
  no pierde nodos ya cerrados y marca como pendiente lo que falta.
- Un nodo cerrado con un hermano a medias no desaparece.
- El render pinta el primer nodo y, cuando llega el resto, añade el segundo sin
  perder el primero.

## Pendiente (fase 9)

- `useSchemaStream` con `AsyncIterable`/`ReadableStream`.
- Reutilización de nodos por identidad entre fragmentos (memoización real).
- Medición de trabajo por fragmento y diferido al siguiente frame (`JR081`).
