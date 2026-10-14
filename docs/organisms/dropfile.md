# ITDropfile

|  |  |
| --- | --- |
| Capa | `organisms` |
| Carpeta | `src/components/organisms/dropfile/` |
| Archivo | `dropfile.tsx` |
| Props | `dropfile.props.ts` |
| Import | `import { ITDropfile, FileTypeEnum, UploadStatus } from "@axzydev/axzy_ui_system"` |

Cargador de archivos por arrastrar y soltar, con previsualización, estado de subida y flujo de
confirmación (seleccionar → confirmar → subir). Admite tipos MIME configurables, vista previa
de imágenes y dos modos de presentación: zona de drop o botón que abre la zona en un modal.
Re-exporta los enums `FileTypeEnum` y `UploadStatus`.

## Import

```tsx
import { ITDropfile, FileTypeEnum, UploadStatus } from "@axzydev/axzy_ui_system";
```

## Props

### `ITDropfileProps`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `onFileSelect` | `(file: File \| null) => void` | — | Se invoca al seleccionar, confirmar o limpiar un archivo (`null` al cancelar). Obligatoria. |
| `onCancel` | `() => void` | — | Se invoca cuando el usuario cancela la selección actual. |
| `onSubmit` | `(file: File) => void` | — | Se invoca al confirmar y enviar el archivo. |
| `acceptedFileTypes` | `FileTypeEnum[]` | `[PDF, XLS, XLSX, JPG, PNG, JPEG]` | Tipos MIME aceptados. |
| `contentClassName` | `string` | — | Clases adicionales para el área de preview/contenido. |
| `containerClassName` | `string` | — | Clases adicionales para el contenedor externo. |
| `showStatusBadge` | `boolean` | `true` | Muestra el badge de estado (pendiente/subiendo/subido/error). |
| `uploadStatus` | `UploadStatus` | — | Estado de subida controlado desde fuera. Si no se pasa, el componente gestiona el estado interno. |
| `onStatusChange` | `(status: UploadStatus) => void` | — | Se invoca en cada cambio de estado. |
| `initialPreviewUrl` | `string` | — | URL de previsualización inicial; si existe se asume `UPLOADED`. |
| `view` | `"drop" \| "button"` | `"drop"` | Modo de presentación. `"button"` renderiza un botón que abre la zona de carga en un modal. |
| `buttonLabel` | `string` | `"Subir archivo"` | Etiqueta del botón cuando `view="button"` y aún no hay archivo. |
| `modalTitle` | `string` | `buttonLabel` | Título del modal abierto cuando `view="button"`. |

### Enums

`FileTypeEnum` (tipos MIME permitidos):

```typescript
PDF  = "application/pdf"
XLS  = "application/vnd.ms-excel"
XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
CSV  = "text/csv"
PNG  = "image/png"
JPG  = "image/jpg"
JPEG = "image/jpeg"
MP4  = "video/mp4"
MOV  = "video/quicktime"
AVI  = "video/x-msvideo"
MKV  = "video/x-matroska"
VIDEO_3GPP = "video/3gpp"
WEBM = "video/webm"
```

`UploadStatus` (ciclo de vida de la subida):

```typescript
PENDING   = "pendiente"
UPLOADING = "subiendo"
UPLOADED  = "subido"
ERROR     = "error"
```

## Ejemplo

```tsx
import { useState } from "react";
import { ITDropfile, FileTypeEnum, UploadStatus } from "@axzydev/axzy_ui_system";

export function AdjuntoForm() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>(UploadStatus.PENDING);

  return (
    <ITDropfile
      onFileSelect={(f) => setFile(f)}
      onSubmit={(f) => console.log("subir", f.name)}
      onCancel={() => setStatus(UploadStatus.PENDING)}
      acceptedFileTypes={[FileTypeEnum.PDF, FileTypeEnum.XLSX]}
      uploadStatus={status}
      onStatusChange={setStatus}
      showStatusBadge
    />
  );
}
```

Modo botón (abre la zona de carga en un modal y se resetea tras subir):

```tsx
import { ITDropfile } from "@axzydev/axzy_ui_system";

<ITDropfile
  view="button"
  buttonLabel="Subir archivos"
  onFileSelect={(file) => console.log(file)}
/>
```

## Notas

- **Flujo de tres pasos.** Al soltar/seleccionar un archivo se marca `PENDING`; al pulsar `Confirmar` el estado pasa a `UPLOADING` y se espera una simulación de `1500 ms`; después se llama a `onFileSelect(file)` y `onSubmit?.(file)` y se pasa a `UPLOADED`.
- **Estado interno vs. controlado.** Si se pasa `uploadStatus`, el componente lo usa y no muta su estado interno; en cualquier cambio llama a `onStatusChange`. Si no se pasa, gestiona su propio estado y también notifica vía `onStatusChange`.
- **Tipo no permitido.** Si el archivo no está en `acceptedFileTypes` se muestra un `alert("Tipo de archivo no permitido.")` y se resetea la selección.
- **Previsualización.** Los archivos de imagen usan `URL.createObjectURL` y se muestra la `<img>`; los demás muestran un icono de documento y `"Sin vista previa"`. `initialPreviewUrl` arranca en estado `UPLOADED`.
- **Modo `button`.** El modal se cierra automáticamente `900 ms` después de una subida exitosa y limpia la selección, dejando el botón listo para el siguiente archivo (sustituye el antiguo patrón de remount con `key`). El título del modal es `modalTitle ?? buttonLabel`.
- **Badge de estado.** Con `showStatusBadge`, se muestra el badge si hay archivo seleccionado (o `initialPreviewUrl`). Etiquetas: `"Pendiente"`, `"Subiendo..."`, `"Subido"`, `"Error"`.
- **PDF.** El render embebido de PDF está comentado/deshabilitado (`pdfjs` no disponible); un PDF muestra el icono de documento.
- **Enums re-exportados.** `FileTypeEnum` y `UploadStatus` se exportan desde `dropfile.tsx`, y el entrypoint los publica como exports globales.

## Textos (i18n)

| Key | es | en | Dónde (`dropfile.tsx`) |
| --- | --- | --- | --- |
| `dropfile.upload` | `Subir archivo` | `Upload file` | `:323`, `:484`, `:490` (default de `buttonLabel`) |
| `dropfile.status.pending` | `Pendiente` | `Pending` | `:177` (badge) |
| `dropfile.status.uploading` | `Subiendo...` | `Uploading...` | `:182` (badge) |
| `dropfile.status.uploaded` | `Subido` | `Uploaded` | `:187` (badge) |
| `dropfile.status.error` | `Error` | `Error` | `:192` (badge) |
| `dropfile.fileTypeNotAllowed` | `Tipo de archivo no permitido.` | `File type not allowed.` | `:228` (alert) |
| `dropfile.dropHere` | `¡Suelta aquí!` | `Drop here!` | `:360` |
| `dropfile.clickOrDrag` | `Haz clic o arrastra` | `Click or drag` | `:360` |
| `dropfile.imageLoaded` | `Imagen cargada` | `Image loaded` | `:380`, `:381` (title + nombre por defecto) |
| `dropfile.previewAlt` | `Vista previa` | `Preview` | `:394` (alt de la imagen) |
| `dropfile.noPreview` | `Sin vista previa` | `No preview` | `:402` |
| `common.cancel` | `Cancelar` | `Cancel` | `:417` |
| `common.confirm` | `Confirmar` | `Confirm` | `:427` |
| `common.delete` | `Eliminar` | `Delete` | `:445` |
| `dropfile.fileLoaded` | `Archivo cargado` | `File uploaded` | `:484` |
