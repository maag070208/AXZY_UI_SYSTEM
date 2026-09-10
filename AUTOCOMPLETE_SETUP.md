# Autocomplete / IntelliSense — AXZY UI System

Esta guía explica qué autocomplete obtienes al instalar `@axzydev/axzy_ui_system` y cómo activar el resto (no es una librería de Web Components, así que "autocompletar el HTML" en la práctica significa autocompletar JSX + props vía TypeScript, más un par de extras opcionales).

---

## 1. Autocomplete de props en JSX (automático, sin configuración)

Al hacer `npm install @axzydev/axzy_ui_system`, el paquete trae `dist/index.d.ts` con las declaraciones de tipos **y los comentarios JSDoc de cada prop**. VS Code (y cualquier editor con soporte de TypeScript/Language Server) los lee automáticamente:

- Al escribir `<ITButton `, el editor sugiere todas las props (`variant`, `color`, `size`, `onClick`, ...).
- Al pasar el mouse sobre una prop, o mientras se autocompleta, se muestra su descripción, los valores válidos y el `@default`, por ejemplo:

  ```
  variant?: keyof typeof buttonVariants
  Button visual style. Valid values: "filled", "outlined", "raised",
  "rounded", "text", "raised-text", "icon-only", "link". @default "filled"
  ```

No requiere ningún `tsconfig.json` especial en el proyecto consumidor: basta con que el proyecto use TypeScript (o `// @ts-check` en JS) y tenga `"jsx": "react-jsx"` (lo normal en cualquier setup de Vite/CRA/Next con React).

**Importante para quienes mantienen esta librería:** este autocomplete depende de que `dist/index.d.ts` esté actualizado. Corre `pnpm build` (o `pnpm bundle`) antes de publicar una nueva versión — sobre todo después de esta revisión, que completó el JSDoc de `ITThemePalette`, `Column`/`CatalogOption` (tablas), `FieldConfigV2`/`FieldConfig` (form builder), `ITDataTableFetchParams`/`ITDataTableResponse` y `Step` (stepper), que antes no tenían documentación.

---

## 2. Snippets de VS Code (setup de un minuto)

El paquete incluye `snippets/axzy-ui-system.code-snippets` con un snippet por cada uno de los 50 componentes exportados (prefijo `it` + nombre en minúsculas: `itbutton`, `ittable`, `itdatatable`, `itformbuilder`, etc.). Cada snippet inserta el componente con sus props más comunes y tabstops (`Tab`) para rellenar rápido, por ejemplo escribir `ittable` + `Tab` inserta:

```tsx
<ITTable
  title="Title"
  columns={[
    { key: "field", label: "Label", type: "string", sortable: true, filter: true },
  ]}
  data={data}
/>
```

### Instalación (proyecto consumidor)

1. Instala el paquete: `npm install @axzydev/axzy_ui_system`
2. Copia el archivo de snippets a tu proyecto:

   ```bash
   mkdir -p .vscode
   cp node_modules/@axzydev/axzy_ui_system/snippets/axzy-ui-system.code-snippets .vscode/
   ```

3. Listo — VS Code carga automáticamente cualquier `*.code-snippets` dentro de `.vscode/` del proyecto abierto. No hace falta reiniciar el editor.

Alternativa: si prefieres tenerlos disponibles en **todos** tus proyectos (no solo este), usa `Preferences: Configure User Snippets → New Global Snippets file` en la paleta de comandos de VS Code y pega el contenido del archivo ahí en vez de copiarlo a `.vscode/`.

> Como el paso 2 es manual (copiar el archivo), considera automatizarlo con un script `postinstall` en el proyecto consumidor si quieres que quede listo para todo el equipo sin pasos manuales.

---

## 3. Autocomplete de clases Tailwind del theme (opcional, mejor esfuerzo)

Si además de usar los componentes tal cual quieres escribir clases del theme directamente (`bg-primary-500`, `text-danger-800`, `border-warning-200`, etc.) en tu propio código, instala la extensión **Tailwind CSS IntelliSense** de Microsoft en VS Code. Para que reconozca la paleta semántica de esta librería (`primary`, `secondary`, `success`, `danger`, `warning`, `purple`, `info`) y no solo los colores por defecto de Tailwind, tu propio `src/index.css` debe importar el CSS de la librería (que ya es el paso 5 de instalación en el `README.md`):

```css
@import "tailwindcss";
@import "@axzydev/axzy_ui_system/dist/index.css";
```

Ten en cuenta que esto depende de cómo la extensión resuelva imports de `node_modules` en tu proyecto — si no autocompleta esas clases automáticamente, siempre puedes consultar la paleta completa en `src/theme/theme.ts` (`palette`) o simplemente confiar en los snippets/props (`color="danger"`, `variant="filled"`), que no requieren memorizar ninguna clase de Tailwind.

---

## 4. Documentación adicional ya incluida en el repo

- **Storybook** (`pnpm storybook`): cada componente tiene un `.doc.mdx` con ejemplos y una tabla de props generada automáticamente desde el JSDoc (vía `react-docgen-typescript`, ya configurado en `.storybook/main.ts`) — es la referencia visual equivalente a este autocomplete.
- `LLM_DOCS.md`, `GUIA_EJEMPLOS_REALES.md`, `DOCUMENTACION_DETALLADA_COMPONENTES.txt`: contexto arquitectónico y ejemplos reales, útiles para pegar como contexto a un asistente de IA cuando alguien del equipo esté generando código con esta librería.
