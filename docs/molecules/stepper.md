# ITStepper

|  |  |
| --- | --- |
| Capa | `molecules` |
| Directorio | `src/components/molecules/stepper/` |
| Archivo | `stepper.tsx` |
| Props | `stepper.props.ts` |
| Import | `import { ITStepper } from "@axzydev/axzy_ui_system"` |

Asistente paso a paso (wizard) con indicador de progreso animado, navegación entre pasos
(clickable), iconos configurables y un panel de contenido con transiciones. Incluye botones
«Atrás»/«Siguiente» —«Finalizar» en el último paso— y el contador «Paso N de M».

## Import

```tsx
import { ITStepper } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `steps` | `Step[]` | `—` | Arreglo de pasos que definen `label`, `content` e icono opcional. |
| `currentStep` | `number` | `—` | Índice (base 0) del paso activo. |
| `onFinish` | `() => void` | `—` | Se llama al pulsar «Finalizar» en el último paso. |
| `onStepChange` | `(step: number) => void` | `—` | Se llama siempre que cambia el paso activo, con el nuevo índice. |
| `allowClickToJump` | `boolean` | `true` | Permite saltar a pasos completados o al actual al hacer clic en sus indicadores. |
| `useIcons` | `boolean` | `false` | Con `true`, renderiza los iconos de cada paso (si los tienen) en lugar de los números. |
| `disableNext` | `boolean` | `false` | Deshabilita el botón «Siguiente» / «Finalizar». |
| `containerClassName` | `string` | `—` | Clases CSS adicionales para el contenedor externo. |
| `stepClassName` | `string` | `—` | Clases CSS adicionales para el panel de contenido. |
| `scrollableContent` | `boolean` | `false` | Hace desplazable verticalmente el área de contenido del paso. |
| `maxContentHeight` | `string` | `"400px"` | Altura máxima del área de contenido desplazable (valor CSS). Solo surte efecto con `scrollableContent`. |
| `color` | `string` | `"primary"` | Color semántico del tema para el paso activo y los botones. Acepta una clave de `theme.colors` o un color crudo. |

### `Step`

```typescript
export interface Step {
  /** Etiqueta mostrada junto al indicador del paso. */
  label: string;
  /** Contenido renderizado en el panel mientras este paso está activo. */
  content: React.ReactNode;
  /** Icono personalizado mostrado en el indicador cuando `useIcons` del stepper es true. */
  icon?: IconType;
}
```

## Ejemplo

```tsx
import { useState } from "react";
import { ITStepper } from "@axzydev/axzy_ui_system";

export default function AltaUsuario() {
  const [step, setStep] = useState(0);

  return (
    <ITStepper
      steps={[
        { label: "Datos", content: <FormularioDatos /> },
        { label: "Revisión", content: <Resumen /> },
        { label: "Confirmación", content: <Confirmacion /> },
      ]}
      currentStep={step}
      onStepChange={setStep}
      onFinish={() => console.log("proceso finalizado")}
      scrollableContent
      maxContentHeight="360px"
      color="primary"
    />
  );
}
```

## Notas

- `color` se resuelve contra `theme.colors`: si la clave existe se usa su tono `500`; si no, el valor se pasa tal cual como color CSS.
- El progreso se pinta como una barra absoluta cuyo ancho es `(currentStep / (steps.length - 1)) * 100%`, con transición de 500 ms.
- Al cambiar de paso, el contenido se anima (clases `next`/`prev`) y el panel recibe foco (`tabIndex={-1}`).
- `onStepChange` se invoca en un `useEffect` que depende de `currentStep` y `onStepChange`, por lo que **se dispara también al montar** y cada vez que cambia de paso.
- Con `allowClickToJump` (por defecto `true`) el clic solo salta a pasos con índice ≤ `currentStep` (completados o el actual); no se puede avanzar haciendo clic.
- Los pasos completados muestran un icono `FaCheck` en lugar del número o del icono propio.
- El panel de contenido usa `role="region"` y `aria-labelledby={`step-${currentStep}`}`, pero **no se renderiza ningún elemento con ese `id`** en el componente: la referencia apunta a un id inexistente.
- Cada indicador es un `<button>` con `aria-label={`Paso {n} {label}`}` y `aria-current="step"` en el activo.
- **Efecto verificado**: `onStepChange` se invoca en un `useEffect` dependiente de `currentStep`; en el montaje inicial también se llama con el `currentStep` recibido.
- Se apoya en los átomos `ITButton` (controles) e `ITText` (etiquetas y contador).

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `common.back` | `Atrás` | `Back` | `stepper.tsx:219` |
| `common.next` | `Siguiente` | `Next` | `stepper.tsx:235` |
| `common.finish` | `Finalizar` | `Finish` | `stepper.tsx:235` |
| `stepper.stepOf` | `Paso {current} de {total}` | `Step {current} of {total}` | `stepper.tsx:225` |
| `stepper.stepAria` | `Paso {n} {label}` | `Step {n} {label}` | `stepper.tsx:154` (aria-label) |

Los botones Atrás/Siguiente/Finalizar reutilizan las keys compartidas `common.back` / `common.next`
/ `common.finish` (no existen `stepper.back` / `stepper.next` / `stepper.finish`).
