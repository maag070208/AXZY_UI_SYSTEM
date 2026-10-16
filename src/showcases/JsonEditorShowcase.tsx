import React, { useMemo, useState } from "react";
import { ITCard, ITJSONEditor, ITFlex } from "../index";
import { ShowcaseLayout } from "./ShowcaseLayout";

/** Documento de arranque de la demo. */
const initial = `[
  {
    "type": "card",
    "props": { "title": "Demo JSON Editor" },
    "children": [
      { "type": "text", "text": "Edita este JSON y mira el preview" },
      { "type": "button", "props": { "label": "Aceptar" } }
    ]
  }
]`;

export const JsonEditorShowcase: React.FC = () => {
  const [value, setValue] = useState(initial);

  /** Un documento más grande para que luzcan el plegado y el árbol. */
  const bigDocument = useMemo(
    () =>
      JSON.stringify(
        {
          app: "axzy-ui-system",
          version: "1.6.0",
          layers: {
            atoms: ["button", "input", "text", "flex", "grid", "stack"],
            molecules: ["card", "alert", "table", "json-editor"],
            organisms: ["data-table", "dialog", "sidebar", "navbar"],
          },
          flags: { darkMode: true, i18n: true, a11y: true, treeView: true },
          limits: { maxDepth: 12, maxNodes: 5000, timeout: null },
        },
        null,
        2
      ),
    []
  );

  const code = `<ITJSONEditor
  value={json}
  onChange={setJson}
  onParse={handleParse}
  mode="text"          // "text" | "tree"
  indentSize={2}       // 0 | 2 | 4 | 8
  height={420}
  showToolbar
  showViewSettings
  showValidation
  showStatusBar
  showFoldGutter
  showLineNumbers
/>`;

  return (
    <ShowcaseLayout
      title="ITJSONEditor"
      description="Editor JSON con resaltado, gutter plegable, errores por línea/columna y árbol navegable. Sin dependencias nuevas."
      demo={
        <ITFlex direction="column" gap={4} className="w-full">
          <ITJSONEditor id="json-editor-demo" value={value} onChange={setValue} height={420} indentSize={2} />
        </ITFlex>
      }
      gallery={
        <ITFlex direction="column" gap={4} className="w-full">
          <ITCard title="Vista de árbol (mode=&quot;tree&quot;)">
            <ITJSONEditor
              value={bigDocument}
              readOnly
              mode="tree"
              treeShowLines
              height={320}
              showToolbar={false}
              showViewSettings={false}
            />
          </ITCard>
          <ITCard title="Documento grande con plegado">
            <ITJSONEditor value={bigDocument} onChange={() => undefined} height={320} />
          </ITCard>
          <ITCard title="Lienzo claro y ajuste de línea (canvasTheme=&quot;light&quot;, wrapLines)">
            <ITJSONEditor
              value={bigDocument}
              readOnly
              canvasTheme="light"
              wrapLines
              height={260}
              showTransformActions={false}
              showImportButton={false}
            />
          </ITCard>
          <ITCard title="Estado de error: línea y columna señaladas">
            <ITJSONEditor
              value={'{\n  "a": 1,\n  "b": ,\n  "c": 3\n}'}
              height={220}
              showStatusBar
            />
          </ITCard>
        </ITFlex>
      }
      code={code}
      doc={{
        summary: "Editor JSON para prototipar con ITJsonRenderer",
        description:
          "El resaltado se pinta en una capa bajo un textarea nativo, así que conserva el deshacer del navegador y no añade dependencias. Valida con JSON.parse y traduce el error a línea y columna.",
        examples: [
          '<ITJSONEditor value={json} onChange={setJson} />',
          '<ITJSONEditor value={json} mode="tree" treeShowLines />',
          '<ITJSONEditor value={json} indentSize={4} wrapLines canvasTheme="light" />',
          '<ITJSONEditor value={json} readOnly showToolbar={false} height="100%" />',
        ],
        props: [
          { name: "value", type: "string", default: '""', description: "Documento JSON como cadena." },
          { name: "onChange", type: "(v: string) => void", default: "—", description: "Se dispara con el texto completo en cada cambio." },
          { name: "onParse", type: "(parsed, isValid, error?) => void", default: "—", description: "Valor parseado y estado tras cada validación." },
          { name: "mode", type: '"text" | "tree"', default: '"text"', description: "Modo inicial del lienzo." },
          { name: "showModeSwitch", type: "boolean", default: "true", description: "Conmutador texto/árbol en la barra." },
          { name: "showToolbar", type: "boolean", default: "true", description: "Barra superior de acciones." },
          { name: "showViewSettings", type: "boolean", default: "true", description: "Fila de ajustes de vista." },
          { name: "showValidation", type: "boolean", default: "true", description: "Indicador válido/ inválido con L:C." },
          { name: "showStatusBar", type: "boolean", default: "true", description: "Pie con líneas, nodos, profundidad y tamaño." },
          { name: "showLineNumbers", type: "boolean", default: "true", description: "Números de línea en el gutter." },
          { name: "showFoldGutter", type: "boolean", default: "true", description: "Gutter de plegado de bloques." },
          { name: "showTransformActions", type: "boolean", default: "true", description: "Formatear, minificar, ordenar, escapar." },
          { name: "showCopyButton", type: "boolean", default: "true", description: "Botón de copiar el documento." },
          { name: "showImportButton", type: "boolean", default: "true", description: "Carga de un archivo .json." },
          { name: "showDownloadButton", type: "boolean", default: "true", description: "Descarga del documento." },
          { name: "indentSize", type: "number", default: "2", description: "Espacios por nivel (0, 2, 4 u 8)." },
          { name: "wrapLines", type: "boolean", default: "false", description: "Ajuste de línea dentro del ancho." },
          { name: "treeShowLines", type: "boolean", default: "false", description: "Muestra la línea de cada nodo y permite saltar." },
          { name: "canvasTheme", type: '"ink" | "light"', default: '"ink"', description: "Paleta del lienzo de código." },
          { name: "height", type: "number | string", default: "340", description: "Alto del área de edición." },
          { name: "readOnly", type: "boolean", default: "false", description: "Solo lectura, sin acciones de edición." },
          { name: "actions", type: "ReactNode", default: "—", description: "Acciones propias al final de la barra." },
          { name: "className", type: "string", default: "—", description: "Clases del contenedor raíz." },
          { name: "textareaClassName", type: "string", default: "—", description: "Clases extra del textarea." },
          { name: "errorLine", type: "number", default: "—", description: "Línea a marcar como errónea desde fuera." },
        ],
        notes: [
          "Atajos: Tab indenta el bloque, Mayús+Tab lo desangra, Mayús+Alt+F formatea, +M minifica y +S ordena.",
          "Las llaves, corchetes y comillas se cierran solos y se borran por parejas.",
          "Con wrapLines activo el resaltado de línea vigente se desactiva: la posición dependería de las vueltas de cada línea.",
          "Es totalmente independiente de ITJsonRenderer: los une solo el JSON que tú les pases.",
        ],
      }}
    />
  );
};

export default JsonEditorShowcase;
