# Versionado y migración del formato

Cómo cambia el formato de pantalla (`axzy/screen`) sin romper los JSON que ya existen.

## 1. Qué es la versión

Cada pantalla declara `"version": N`. Hoy la versión vigente es **1**. El motor la lee así:

- Una pantalla sin `version` es inválida (`JR020`). Sin versión no hay forma de migrarla.
- Una versión mayor que la que soporta el motor se rechaza, en vez de adivinar.
- La versión sube solo cuando un cambio **rompe** lo que ya existe. Añadir algo nuevo
  opcional no sube la versión.

## 2. Qué cuenta como cambio que rompe

| Cambio | ¿Rompe? | Qué hacer |
|---|---|---|
| Añadir un componente, una prop opcional, un efecto o una capacidad | No | Nada. Documentar en `REFERENCIA.md` |
| Añadir un código de aviso `JR0xx` | No | Documentar en la tabla de códigos |
| Cambiar el significado de una prop existente | Sí | Subir versión y migrar |
| Quitar una prop, un componente o un efecto | Sí | Subir versión y migrar |
| Cambiar la forma de un nodo (por ejemplo, `children` pasa a ser objeto) | Sí | Subir versión y migrar |
| Volver más estricto un valor que antes se aceptaba | Depende | Si hay documentos que dejan de pintarse, es un cambio que rompe |

## 3. Cómo se migra

El motor tiene un registro de migraciones en `src/json-renderer/validation/migrate.ts`.
Cada migración convierte un documento de la versión N a la N+1:

```ts
export const DEFAULT_MIGRATIONS: MigrationRegistry = {
  1: (documento) => ({ ...documento, version: 2 /* … transformaciones … */ }),
};
```

`migrateSchema(documento)` aplica las migraciones en orden hasta la versión actual. Si falta
un paso del registro, avisa con `JR070` y no adivina.

Hoy `DEFAULT_MIGRATIONS` está vacío: no existe todavía una versión 2, así que no hay nada
que migrar. El ejemplo de arriba es la forma que tendrá la primera migración.

Pasos para subir de versión:

1. Escribe la migración de N a N+1 en `DEFAULT_MIGRATIONS`.
2. Sube `CURRENT_SCHEMA_VERSION` en `validation/validate.ts`.
3. Añade una prueba: un documento de la versión N, migrado, pasa el validador y se pinta
   igual que antes.
4. Regenera el schema: `pnpm docs:json-renderer`. El `maximum` de `version` cambia solo.
5. Actualiza los JSON del demo a la versión nueva, o déjalos en N si la migración los
   sigue aceptando.
6. Documenta el cambio en la sección de abajo.

## 4. Historial

### Versión 1 (vigente)

Formato inicial: nodos del catálogo, `slot`, `form`, `data` con `$source`, `state` con
`$state`, `$param`, acciones con `then`, `onError`, efectos (`toast`, `navigate`,
`refresh`, `openOverlay`, `closeOverlay`, `set`), `requires` en nodos, pantallas y
acciones, `rowActions` en las columnas de tablas, y streaming con `useSchemaStream`.

Cambios durante la versión 1 que **no** rompen:

- `set` y `requires` en acciones: documentos anteriores no los usan.
- `rowActions` en columnas `type: "actions"`: antes no existían.
- Nuevos códigos de aviso: `JR031`, `JR040`, `JR041`, `JR042`, `JR060`, `JR061`.

## 5. Compatibilidad del código del host

Lo que el host le pasa al renderizador también es una superficie que hay que cuidar:

- Las props de `ITSchemaRenderer` se añaden; no se renombran ni se quitan sin aviso.
- El tipo `StreamState` puede ganar campos; no se quitan.
- Las acciones, los efectos y las fuentes son nombres que el host elige. Si el host cambia
  un nombre, los JSON que lo usan avisan con `JR040` o `JR030` al pintar, no fallan en
  silencio.
