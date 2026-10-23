# Recetario del motor de pantallas

Recetas copiables. Cada una es una pantalla o un fragmento que ya funciona en el demo o
que se prueba en `src/json-renderer/**/*.test.*`. Antes de leer esto, la guía paso a paso
está en [`GUIA-PANTALLAS.md`](./GUIA-PANTALLAS.md) y la referencia en
[`REFERENCIA.md`](./REFERENCIA.md).

Convenciones: los textos van como `{ "i18n": "clave" }`; las acciones se nombran y el host
las registra; nada de código en el JSON.

---

## 1. Listado con filtro por estado

Una tabla que carga datos de una fuente, con columnas ordenables y filtrables.

```json
{
  "$schema": "axzy/screen",
  "version": 1,
  "id": "demo.personas",
  "title": { "i18n": "sandbox.app.personas.title" },
  "data": { "personas": { "handler": "personas" } },
  "content": {
    "type": "ITDataTable",
    "props": {
      "columns": [
        { "key": "nombre", "label": "Nombre", "type": "string", "sortable": true, "filter": true },
        { "key": "estado", "label": "Estado", "type": "string", "filter": "catalog" }
      ],
      "fetchData": { "$source": "personas" },
      "defaultItemsPerPage": 10
    }
  }
}
```

En el host, el handler `personas` recibe la query de la tabla (página, filtros, orden) y
devuelve `{ data, total }`.

## 2. Botones por fila: ver y editar

Cada fila muestra botones que llaman a una acción con la fila como primer argumento.

```json
{
  "key": "acciones",
  "label": "Acciones",
  "type": "actions",
  "rowActions": [
    { "label": { "i18n": "sandbox.app.usuarios.verFila" }, "action": "ver-usuario",
      "variant": "outlined", "color": "secondary" },
    { "label": { "i18n": "sandbox.app.form.edit" }, "action": "editar-usuario",
      "variant": "outlined", "color": "primary" }
  ]
}
```

Va dentro de `columns`. Un botón sin handler en el host no se pinta y avisa con `JR040`.

## 3. Detalle por dirección: `/usuarios/:id`

La ruta pasa el id como `$param`. Una pantalla de detalle con botón de volver y un bloque
del host para los datos.

```json
{
  "$schema": "axzy/screen",
  "version": 1,
  "id": "demo.usuario-detalle",
  "title": { "i18n": "sandbox.app.detail.title" },
  "content": [
    { "type": "ITButton",
      "props": { "label": { "i18n": "sandbox.app.detail.back" },
                 "onClick": { "action": "ir-pagina", "args": { "pagina": "usuarios" } } } },
    { "type": "slot", "props": { "name": "usuarioDetalle", "id": { "$param": "id" } } }
  ]
}
```

Ruta correspondiente en `routes.json`:

```json
{ "id": "usuario-detalle", "path": "/usuarios/:id", "page": "usuario-detalle" }
```

## 4. Formulario con validación y aviso de éxito

Campos declarados en JSON, validados por el motor. El aviso lo declara el JSON, no el código.

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
    "onSubmit": {
      "action": "enviar-contacto",
      "then": [ { "toast": { "variant": "success", "message": { "i18n": "sandbox.app.contact.sent" } } } ],
      "onError": { "toast": { "variant": "error", "message": { "i18n": "sandbox.app.contact.error" } } }
    }
  }
}
```

## 5. Un contador que escribe en el estado

Un botón escribe en el estado de la pantalla, y el texto que lo lee se actualiza solo.

```json
{
  "$schema": "axzy/screen",
  "version": 1,
  "id": "demo.contador",
  "state": { "clics": 0 },
  "content": [
    { "type": "ITText", "text": { "$state": "clics" }, "props": { "as": "h2" } },
    { "type": "ITButton",
      "props": { "label": { "i18n": "sandbox.app.contador.sumar" },
                 "onClick": { "action": "sumar", "then": [ { "set": { "clics": 1 } } ] } } }
  ]
}
```

Para usar el valor que devuelve la acción, usa `$result`:

```json
{ "action": "crear-pedido", "then": [ { "set": { "folio": { "$result": "folio" } } } ] }
```

Los valores de `state` son los del esquema al empezar. Al cambiar de esquema, la pantalla
vuelve a su estado inicial.

## 6. Acción con permiso

El host concede capacidades con la prop `capabilities`. Sin concesión, la acción no se
ejecuta y se avisa con `JR061`.

```json
{ "type": "ITButton",
  "props": { "label": { "i18n": "sandbox.app.borrar" },
             "onClick": { "action": "eliminar", "requires": "usuarios.eliminar" } } }
```

Y un nodo entero puede pedir permiso, con un `fallback` para cuando no lo tiene:

```json
{ "type": "ITButton", "props": { "label": { "i18n": "sandbox.app.borrar" } },
  "requires": "usuarios.eliminar",
  "fallback": { "type": "ITText", "text": { "i18n": "sandbox.app.sinPermiso" } } }
```

## 7. Aviso y navegación después de una acción

```json
{ "type": "ITButton",
  "props": { "label": { "i18n": "sandbox.app.guardar" },
    "onClick": {
      "action": "guardar",
      "then": [
        { "toast": { "variant": "success", "message": { "i18n": "sandbox.app.guardado" } } },
        { "navigate": "/usuarios" }
      ],
      "onError": { "toast": { "variant": "error", "message": { "i18n": "sandbox.app.noGuardado" } } }
    } } }
```

Un efecto puede ser otra acción encadenada, hasta 5 niveles:

```json
{ "action": "guardar", "then": [ { "action": "notificar", "args": { "canal": "email" } } ] }
```

## 8. Pantalla que llega por trozos (un modelo que escribe)

```tsx
const { tree, streaming, issues } = useSchemaStream(respuestaDelModelo);

<ITSchemaRenderer
  schema={tree}
  pendingFallback={<ITSkeleton />}
  onIssue={(aviso) => registrar(aviso)}
/>
```

`respuestaDelModelo` puede ser un `string`, un iterable asíncrono o un `ReadableStream`.
Lo que todavía no cierra no se pinta a medias. Si el stream falla o termina sin cerrar el
JSON, `issues` trae `JR080`.

**Importante:** la fuente debe ser estable entre renders. Créala una vez, no en cada render.

## 9. Gráfica o bloque propio del host

El JSON nombra el bloque; el host lo implementa con todo lo que necesite.

```json
{ "type": "slot", "props": { "name": "graficaIngresos" } }
```

```tsx
const GraficaIngresos: SlotComponent = () => <ITLineBarChart data={datos} ariaLabel="..." />;
<ITSchemaRenderer schema={schema} slots={{ graficaIngresos: GraficaIngresos }} />
```

El nombre que no esté registrado avisa con `JR010` y no se pinta.

## 10. Exportar con confirmación

La confirmación la abre el host; el JSON solo nombra la acción.

```json
{ "type": "ITButton",
  "props": { "label": { "i18n": "sandbox.app.reportes.export" },
             "onClick": { "action": "exportar-reporte" } } }
```

En el host, la acción `exportar-reporte` abre el diálogo de confirmación; al confirmar, el
host muestra el toast.

---

## Checklist para cualquier receta

- [ ] Los textos son `{ "i18n": "…" }` y existen en `es` y en `en`.
- [ ] Cada acción está registrada en el host (o aparecerá `JR040`).
- [ ] Cada fuente de `data` tiene su handler (o aparecerá `JR030`).
- [ ] `pnpm schema:check` pasa.
- [ ] La pantalla se ve sin avisos en el navegador.
