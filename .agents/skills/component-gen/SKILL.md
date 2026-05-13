---
name: component-gen
description: Estándar de generación de componentes para AXZY UI SYSTEM.
---

# AXZY Component Standard (Caveman Mode)

Respetar estructura estricta para cada componente nuevo.

## 1. Nomenclatura y Directorio
- **Nombre**: Prefijo `IT` + PascalCase (ej: `ITButton`, `ITCard`).
- **Ruta**: `src/components/[kebab-name]/`.
- **Archivos obligatorios**:
  - `[name].tsx`: Lógica y renderizado.
  - `[name].props.ts`: Definición de interfaces/tipos.
  - `[name].stories.tsx`: Historias para Storybook.

## 2. Estilo y Tematización
- **Theme First**: Prohibido hardcodear colores. Usar `import { theme } from "@/theme/theme"`.
- **Tailwind**: Usar para layout/spacing. Colores dinámicos vía `style` o clases calculadas del `theme`.
- **Variant Pattern**: Definir variantes en `src/types/[component].types.ts` si es complejo.

## 3. Estructura de Archivos

### Props (`[name].props.ts`)
```ts
export interface IT[Name]Props {
  // Propiedades básicas
  className?: string;
  children?: React.ReactNode;
  // Usar tipos globales si existen
  color?: string; 
}
```

### Componente (`[name].tsx`)
```tsx
import { theme } from "@/theme/theme";
import { IT[Name]Props } from "./[name].props";

export default function IT[Name]({ ... }: IT[Name]Props) {
  const resolvedColor = theme.colors.primary[500]; // Ejemplo
  return <div style={{ color: resolvedColor }}>...</div>;
}
```

## 4. Documentación Automática
Tras crear/modificar componente, **ACTUALIZAR** `DOCUMENTACION_COMPONENTES.txt` con:
- **Modelo**: Bloque de código TS con la interfaz completa y comentarios.
- **Tipos Literales**: Si una prop usa enums o tipos unión, listar todas las opciones explícitamente (ej: `color: "primary" | "secondary" | "error"`).
- **Usage**: Ejemplo de uso real con props configuradas.

**Formato Doc:**
```text
## IT[Name]
[Descripción corta]

### Model
[TS Interface Block]

### Usage
[Code Block]
```

## 5. Exportación
Añadir a `src/index.ts` tanto el componente como sus Props.
