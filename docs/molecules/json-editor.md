# ITJSONEditor

Editor de JSON con resaltado de sintaxis, gutter con números y plegado, errores
señalados por línea y columna, árbol navegable y acciones de formato. Es
**independiente** de `ITJsonRenderer`: los une solo el JSON que les pases.

## Cómo está construido

El resaltado se pinta en una capa por debajo de un `<textarea>` nativo
transparente. Eso da tres cosas gratis que un `contenteditable` no tiene:

- se conservan el deshacer del navegador, el pegado, el dictado y el corrector;
- **cero dependencias nuevas** en el paquete (`dist` no crece);
- la validación sigue siendo `JSON.parse`, así que mientras el documento está a
  medias el coloreado funciona igual y el error se traduce a línea/columna.

La altura real de una línea se mide en el DOM (con `ResizeObserver` y
`document.fonts.ready`) y se publica como `--it-json-editor-line`, de modo que
gutter, capa resaltada y textarea quedan alineados al píxel con cualquier
tipografía.

## Uso básico

```tsx
import { ITJSONEditor } from "@axzydev/axzy_ui_system";

const [json, setJson] = useState('{"type":"button","props":{"label":"Test"}}');
return <ITJSONEditor value={json} onChange={setJson} />;
```

## Con preview de `ITJsonRenderer`

```tsx
<ITFlex direction="column" gap={4}>
  <ITJSONEditor value={value} onChange={setValue} onParse={handleParse} height={420} />
  {valid && <ITJsonRenderer json={parsed} />}
</ITFlex>
```

## Vista de árbol

```tsx
// Árbol navegable de solo lectura, con salto a la línea de cada nodo.
<ITJSONEditor value={json} readOnly mode="tree" treeShowLines />
```

## Props

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `value` | `string` | `""` | Documento JSON como cadena. |
| `onChange` | `(v: string) => void` | — | Se dispara con el texto completo en cada cambio. |
| `onParse` | `(parsed: unknown, isValid: boolean, error?: string) => void` | — | Valor parseado y estado tras cada validación. |
| `placeholder` | `string` | Texto traducido | Ayuda que se muestra con el documento vacío. |
| `readOnly` | `boolean` | `false` | Solo lectura: desaparecen las acciones que editan. |
| `mode` | `"text" \| "tree"` | `"text"` | Modo inicial del lienzo. |
| `showModeSwitch` | `boolean` | `true` | Conmutador texto/árbol en la barra. |
| `showToolbar` | `boolean` | `true` | Barra superior de acciones. |
| `showValidation` | `boolean` | `true` | Indicador válido/ no válido con línea y columna. |
| `showStatusBar` | `boolean` | `true` | Pie con líneas, nodos, profundidad, raíz y tamaño. |
| `showLineNumbers` | `boolean` | `true` | Números de línea en el gutter. |
| `showFoldGutter` | `boolean` | `true` | Gutter de plegado de bloques. |
| `showTransformActions` | `boolean` | `true` | Formatear, minificar, ordenar A-Z/Z-A, escapar y desescapar. |
| `showCopyButton` | `boolean` | `true` | Botón de copiar el documento. |
| `showImportButton` | `boolean` | `true` | Carga de un archivo `.json` desde disco. |
| `showDownloadButton` | `boolean` | `true` | Descarga del documento como `document.json`. |
| `showViewSettings` | `boolean` | `true` | Fila de ajustes: ajuste de línea, números, plegado e indentación. |
| `indentSize` | `number` | `2` | Espacios por nivel de indentación (`0`, `2`, `4` u `8`). |
| `wrapLines` | `boolean` | `false` | Ajusta las líneas largas al ancho. |
| `treeShowLines` | `boolean` | `false` | Muestra la línea de cada nodo y permite saltar a ella. |
| `canvasTheme` | `"ink" \| "light"` | `"ink"` | Paleta del lienzo de código. |
| `height` | `number \| string` | `340` | Alto del área de edición. |
| `minWidth` | `number \| string` | — | Ancho mínimo del editor. |
| `actions` | `ReactNode` | — | Acciones propias al final de la barra. |
| `className` | `string` | — | Clases del contenedor raíz. |
| `id` | `string` | — | Identificador HTML del contenedor raíz. |
| `textareaClassName` | `string` | — | Clases extra del `<textarea>`. |
| `errorLine` | `number` | — | Línea a marcar como errónea cuando el fallo lo detecta tu app. |

## Atajos de teclado

| Atajo | Acción |
|---|---|
| `Tab` / `Mayús+Tab` | Indenta o desangra el bloque seleccionado. |
| `Enter` | Continúa la indentación; entre `{}` o `[]` abre el bloque y centra el cursor. |
| `{`, `[`, `"` | Cierre automático; con texto seleccionado lo envuelve. |
| `}`, `]`, `"` | Salta el cierre si ya está delante. |
| `Retroceso` | Borra la pareja completa (`{}`, `[]`, `""`). |
| `Mayús+Alt+F` | Formatea. |
| `Mayús+Alt+M` | Minifica. |
| `Mayús+Alt+S` | Ordena las claves A-Z. |
| `Cmd/Ctrl+D` | Duplica la línea. |
| `Cmd/Ctrl+A` | Selecciona solo el contenido del editor. |

## i18n

Todas las cadenas salen de `useITTranslation()` con el namespace `jsonEditor.*`
(`jsonEditor.format`, `jsonEditor.invalidAt`, `jsonEditor.treeNeedsValid`…).
Sin `ITI18nProvider` la salida es idéntica al español por defecto.

## Notas

- El formateo y el resto de transformaciones solo están disponibles cuando el
  documento es válido: con el JSON roto los botones se deshabilitan.
- Con `wrapLines` activo, el resaltado de la línea vigente y el de error se
  desactivan de forma deliberada: su posición dependería de las vueltas que dé
  cada línea, que ya no se pueden calcular por índice.
- El árbol corta a 1500 filas para no colgar la vista con documentos enormes y
  avisa con `jsonEditor.treeTruncated`.
- Las claves i18n viven en `src/i18n/locales/es.ts` y `en.ts`.
