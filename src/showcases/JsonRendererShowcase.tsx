import React, { useState } from "react";
import { ITCard, ITJsonRenderer } from "../index";
import { ShowcaseLayout } from "./ShowcaseLayout";

const exampleWithChildren = [
  {
    type: "alert" as const,
    props: { variant: "info" as const, title: "Información" },
    text: "Esto se renderiza desde JSON",
  },
  {
    type: "card" as const,
    props: { title: "Tarjeta desde JSON" },
    children: [
      { type: "text" as const, text: "Contenido dentro de la tarjeta" },
      {
        type: "flex" as const,
        props: { gap: 2, justify: "end" as const },
        children: [
          { type: "button" as const, props: { label: "Cancelar", color: "gray" as const, variant: "outlined" as const } },
          { type: "button" as const, props: { label: "Aceptar", color: "primary" as const } },
        ],
      },
    ],
  },
];

export const JsonRendererShowcase: React.FC = () => {
  const [jsonText, setJsonText] = useState(JSON.stringify(exampleWithChildren, null, 2));

  let parsed: any = exampleWithChildren;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    parsed = exampleWithChildren;
  }

  return (
    <ShowcaseLayout
      title="ITJsonRenderer"
      description="Renderiza componentes del UI System a partir de un JSON."
      doc={{
        summary: "PoC: Builder JSON para AXZY UI System",
        description:
          "Permite construir interfaces pasándole un árbol JSON con type, props, children/text.",
        examples: [
          '<ITJsonRenderer json={{ type: "button", props: { label: "Click" } }} />',
        ],
        props: [],
      }}
      demo={
        <ITCard title="Preview">
          <ITJsonRenderer json={parsed} />
        </ITCard>
      }
      code={jsonText}
      controls={
        <ITCard title="JSON Editor (editable)">
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className="w-full h-64 font-mono text-sm border rounded p-3"
          />
        </ITCard>
      }
    />
  );
};

export default JsonRendererShowcase;
