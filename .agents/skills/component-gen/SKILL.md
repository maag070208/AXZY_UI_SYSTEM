---
name: component-gen
description: Estándar de generación de componentes para AXZY UI SYSTEM.
---

# AXZY Component Standard

Respetar estructura estricta para cada componente nuevo.

## 1. Nomenclatura y Directorio
- **Nombre**: Prefijo `IT` + PascalCase (ej: `ITButton`, `ITCard`).
- **Ruta**: `src/components/[kebab-name]/`.
- **Archivos obligatorios**:
  - `[name].tsx`: Lógica y renderizado.
  - `[name].props.ts`: Definición de interfaces/tipos con JSDoc.
  - `[name].stories.tsx`: Historias para Storybook.

## 2. Estilo y Tematización
- **Theme First**: Prohibido hardcodear colores. Usar `import { theme } from "@/theme/theme"`.
- **Tailwind**: Usar para layout/spacing. Colores dinámicos vía `style` o clases calculadas del `theme`.
- **Variant Pattern**: Definir variantes en `src/types/[component].types.ts` si es complejo.

## 3. Estructura de Archivos

### Props (`[name].props.ts`)
```ts
export interface IT[Name]Props {
  /** Brief description of what this prop controls. */
  className?: string;
  /** Content rendered inside the component. */
  children?: React.ReactNode;
  /** Semantic color: "primary" | "secondary" | "success" | "danger" | "warning" | "purple" | "info" */
  color?: ColorsTypes;
}
```

Every prop MUST have a `/** JSDoc comment */` describing its purpose. For enum/union types, list all valid values in the description.

### Componente (`[name].tsx`)
```tsx
import { theme } from "@/theme/theme";
import { IT[Name]Props } from "./[name].props";

/**
 * Short description of what this component does.
 *
 * @example
 * <ITName prop1="value" onClick={handler} />
 * @example
 * <ITName prop1="another" variant="outlined">Content</ITName>
 */
export default function IT[Name]({ ... }: IT[Name]Props) {
  const resolvedColor = theme.colors.primary[500]; // Ejemplo
  return <div style={{ color: resolvedColor }}>...</div>;
}
```

Every default export MUST have a JSDoc block with `@description` (implicit first line) and at least one `@example`.

## 4. Documentación

After creating or modifying a component, update:

1. **`DOCUMENTACION_COMPONENTES.txt`** — canonical reference with:
   - Props interface block with comments.
   - All literal/enum values listed explicitly.
   - Real-world usage example with state hooks.

2. **Showcases** — update the corresponding `src/showcases/*.tsx` file and pass a `doc` prop to `ShowcaseLayout` with:
   ```tsx
   doc={{
     summary: "What the component does in one sentence.",
     description: "Detailed description (optional).",
     examples: ["<ITName prop=\"val\" />"],
     props: [
       { name: "propName", type: "string", default: "\"default\"", description: "What it does." },
     ],
     notes: ["Important note about usage or theming."],
   }}
   ```

## 5. Exportación
Añadir a `src/index.ts` tanto el componente como sus Props y cualquier enum/type exportado:

```ts
import ITName from "./components/[kebab]/[name]";
import type { ITNameProps } from "./components/[kebab]/[name].props";

export { ITName };
export type { ITNameProps };
```
