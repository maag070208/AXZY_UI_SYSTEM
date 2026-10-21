# Seguridad del motor de pantallas

> Este documento dice **qué protege el motor hoy** y **qué no**. Donde el alcance
> ([`ALCANCE.md` §4](./ALCANCE.md)) promete una capa que aún no existe, aquí figura como
> pendiente. Se actualiza con cada cambio de seguridad.

## 1. Modelo en una frase

**El esquema JSON es entrada no confiable.** Solo nombra cosas; la autoridad (qué
componente existe, qué datos hay, qué acción hace algo, qué efecto se cumple) vive en el
**host**, a través de registros que el host pasa al renderizador.

| Lo que nombra el JSON | Quién decide qué es | Cómo se pasa |
|---|---|---|
| Componente (`type`) | El catálogo (`axzyCatalog`) | Lista blanca, por código |
| Props de un componente | El catálogo, por tipo | Lista blanca; lo que sobra se descarta |
| Fuente de datos (`$source`) | El host | Prop `dataHandlers` (nombre → función) |
| Acción (`onClick: { action }`) | El host | Prop `resolveAction` (nombre → función) |
| Efecto (`toast`, `navigate`…) | El host | Prop `effects` (nombre → función) |
| Slot (`{ type: "slot" }`) | El host | Prop `slots` (nombre → componente) |
| Parámetro de ruta (`$param`) | El host | Prop `params` |
| Texto (`{ i18n }`) | El host | Prop `resolveValue` |

El JSON **no puede** elegir un componente que no esté en el catálogo, ni una función que
no esté en un registro, ni un dato que el host no haya entregado.

## 2. Lo que el JSON no puede hacer

| Intento | Qué pasa | Cómo se comprueba |
|---|---|---|
| Ejecutar código (funciones, expresiones, `eval`) | No existe ese lenguaje en el esquema. Una referencia desconocida (`$row` fuera de tabla, `$concat`…) avisa con `JR032` y no se pinta | `validation`, `kernel`; el motor no usa `eval` ni `new Function` |
| Inyectar HTML | Las props `dangerouslySetInnerHTML`, `render`, `component`, `children` como prop, `ref`, `key`, `icon` y `style` (si el catálogo no lo declara) están prohibidas. Un texto siempre es texto | `GLOBALLY_FORBIDDEN_PROPS` en `catalog.props.ts`; `JR011` |
| Montar un componente arbitrario | Un `type` fuera del catálogo avisa con `JR010` y no se pinta. Un slot solo monta lo que el host registró | `resolveNode`, `renderSlot` |
| Pedir datos por red | El esquema no tiene campo de URL ni endpoint: una fuente solo nombra un `handler` que el host registra. Un nombre sin registrar avisa con `JR030` | `DataSourceSchema`, `binding/resolveValue.ts` |
| Llamar a una acción no registrada | El host no la resuelve: el botón no hace nada y se avisa con `JR040` al pintar | `renderNode`; `seguridad.test.tsx` |
| Ver o usar algo que exige una capacidad no concedida | Denegado por defecto: el nodo (o la pantalla) no se pinta, o se pinta su `fallback`. Un `requires` que no se entiende también se deniega. Aviso `JR060` | `kernel/capabilities.ts`; `SchemaRenderer.tsx` |
| Pedir red desde una fuente | Una fuente que declara `url`, `endpoint`, `href` o `src` se rechaza con `JR031` y no llama a ningún handler | `binding/resolveValue.ts` |
| Colgar una acción del host | Si la promesa no resuelve en `actionTimeoutMs` (15 s por defecto), cuenta como fallida: se aplica `onError` y se avisa con `JR041`. El resultado tardío se ignora | `actions/effects.ts` |
| Encadenar efectos sin fin | El encadenado tiene un límite de 5 niveles; más avisa con `JR042` y no se ejecuta | `MAX_EFFECT_DEPTH` en `actions/effects.ts` |
| Expresiones regulares que bloqueen el navegador | Los formularios no admiten `pattern`: solo `required`, `minLength`, `maxLength` y el tipo `email` | `form/rules.ts` |
| Tumbar la pantalla con un componente roto | El componente que lanza queda aislado por su boundary (`JR012`); el resto sigue | `NodeBoundary` |
| Tumbar la pantalla con un handler que falla | El handler se ejecuta dentro de una promesa: un error se convierte en rechazo de la carga, no en error del render | `binding/resolveValue.ts` |
| Un esquema enorme | El renderizador corta en `maxNodes` (5000) y `maxDepth` y avisa con `JR013` | `shared/limits.ts` |

## 3. Límites conocidos

Estas capas del alcance **no están implementadas**. No hay que asumir que protegen nada:

| Capa del alcance | Estado | Consecuencia hoy |
|---|---|---|
| **1. JSON Schema en tiempo de ejecución** | El JSON Schema lo usan el tester (`pnpm schema:check`) y el editor. El renderizador **no lo valida**: `ITSchemaRenderer` pinta lo que puede y avisa de lo demás. `validateSchema` (la validación del motor) la llama el demo para mostrar el veredicto, no el renderizador | Un documento que el schema rechaza puede pintarse igual. Úsalo siempre con `pnpm schema:check` antes de publicar |
| **3. Capacidades (`requires`)** | Implementada: el host concede con la prop `capabilities`; sin concesión, denegado por defecto (`JR060`) | Úsala para ocultar nodos y pantallas. Sigue siendo una decisión del host: el JSON solo nombra la capacidad |
| **3. Redacción (`redact`)** | **No implementada** | Si el host entrega un campo sensible en los datos, se puede pintar. El host **no debe enviar** lo que no quiere mostrar |
| **5. Timeout de acciones** | Implementado (`actionTimeoutMs`, `JR041`). Solo cubre promesas del host; un handler síncrono que se cuelga bloquea el hilo | Un handler síncrono lento sigue siendo problema del host |
| **4. Aviso de acción no registrada** | Implementado (`JR040`) | — |
| **1. JSON Schema en el renderizador** | No se valida al pintar: el schema lo usan el tester y el editor | Usa `pnpm schema:check` antes de publicar |

## 4. Reglas para quien escribe el host

- Registra solo lo que la pantalla necesita. Los `dataHandlers`, `resolveAction`, `effects`
  y `slots` son la lista blanca: lo que no registras no existe para el JSON.
- Un `handler` devuelve **solo los campos que la pantalla va a pintar**. No devuelvas el
  registro completo si tiene secretos.
- Un slot recibe valores ya resueltos. No le pases funciones ni objetos del host que no
  quieras que se lean desde el JSON.
- Las acciones de borrado o de escritura **no** se confirman solas: usa `confirm` o un
  diálogo del host antes de ejecutar.

## 5. Reglas para quien escribe el JSON

- No pongas URLs, rutas de archivos ni código en un texto. Un texto es un texto.
- Los datos llegan con `data` + `$source`. No intentes pedirlos de otro modo.
- No dependas de `requires` ni de `redact` para proteger algo: todavía no protegen.

## 6. Riesgos abiertos

1. **Datos sensibles en el host:** sin `redact`, el riesgo está en lo que el host entrega.
   Mitigación hoy: el host filtra antes de devolver.
2. **Schema y motor pueden divergir:** el schema lo valida el tester, y el motor tiene su
   propio validador. Mitigación: correr `pnpm schema:check` y los tests (`demoJson.test.tsx`
   comprueba que los JSON del demo pasen y se pinten sin avisos).
3. **Acciones sin límite de tiempo:** un handler colgado deja el botón ocupado. Mitigación:
   el host debe responder o rechazar siempre.
4. **Capacidades sin evaluar:** `requires` no protege. Pendiente de la fase 7.

## 7. Cómo se comprueba esto

- `src/json-renderer/seguridad.test.tsx`: la batería de seguridad y adversaria. Cubre
  capacidades, acciones sin handler, URL en fuentes, timeouts, HTML e intentos de
  ejecución en textos, presupuesto de nodos, handlers y slots que lanzan, y streams
  cortados, con basura o sin cerrar.
- `src/json-renderer/**/*.test.*`: el resto de pruebas del motor.
- `src/showcases/demoApp/demoJson.test.tsx`: los JSON del demo usan solo acciones, slots,
  fuentes y parámetros que el host registra, y se pintan sin avisos.
- `scripts/json-renderer/check.mjs` (`pnpm schema:check`): forma de los documentos.

## 8. Cambios de seguridad pendientes

Por orden de prioridad:

1. Implementar `redact` (recorte de campos antes del render).
2. Permisos por acción (`JR061`): hoy `requires` solo se evalúa en nodos y en la pantalla.
3. Validar el documento con el JSON Schema dentro del renderizador, en un modo estricto opcional.

Ya cerrados en esta revisión: aviso de acción no registrada (`JR040`), `requires` con
capacidades (`JR060`), URL en fuentes (`JR031`) y timeout de acciones (`JR041`).
