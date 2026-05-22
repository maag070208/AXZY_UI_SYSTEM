DOCUMENTACIÓN: CÓMO IMPLEMENTAR EL ITThemeProvider

Este documento describe la estructura, componentes clave e implementación del sistema de temas dinámicos en tiempo real (ITThemeProvider) utilizado en el ecosistema UI.

================================================================================
1. PROPÓSITO
================================================================================
El ITThemeProvider permite:
- Personalizar la paleta de colores global en tiempo real mediante una interfaz visual (Drawer).
- Persistir la selección de colores del usuario en el navegador (localStorage).
- Aplicar temas predefinidos (Presets) o editar canales de color uno por uno.
- Inyectar variables CSS de manera dinámica en el elemento :root de HTML.
- Sobrescribir clases fijas de Tailwind (ej. `.bg-cyan-400`, `.text-green-700`) mediante la inyección de una etiqueta <style> dinámica con reglas CSS marcadas como `!important`.

================================================================================
2. ESTRUCTURA DE ARCHIVOS Y COMPONENTES
================================================================================
El sistema consta de:
1. ITThemePalette (Interfaz de Tipos): Define las propiedades del tema.
2. DEFAULT_PALETTE & PRESETS (Configuración): Paleta inicial y temas prediseñados.
3. ITThemeContext & useITTheme (Contexto y Hook): Comunicación y consumo del tema en componentes del cliente.
4. ITThemeProvider (Proveedor): Lógica del estado, inyección de CSS y Drawer visual.

================================================================================
3. PASO A PASO PARA LA IMPLEMENTACIÓN
================================================================================

PASO 1: DEFINIR TIPOS Y ESTRUCTURA DE LA PALETA
--------------------------------------------------------------------------------
Crear la interfaz de la paleta. Soporta colores base de marca (primary, secondary, danger, etc.), layout (sidebar y navbar) y tablas.

```typescript
export interface ITThemePalette {
  primary: string;
  secondary: string;
  ternary: string;
  danger: string;
  success: string;
  info: string;
  alert: string;
  warning: string;
  layout: {
    sidebarBg: string;
    sidebarText: string;
    navbarBg: string;
    navbarText: string;
  };
  table: {
    headerBg: string;
    headerText: string;
    rowBg: string;
    rowText: string;
  };
}
```

PASO 2: CREAR VALORES POR DEFECTO Y PRESETS
--------------------------------------------------------------------------------
Establecer los colores estándar (DEFAULT_PALETTE) y predefinir algunos temas como "Emerald & Gold", "Cyberpunk Neon", "Sleek Obsidian" o "Warm Sunset" para facilitar el cambio rápido al usuario.

PASO 3: DISEÑAR EL CONTEXTO DE REACT Y EL HOOK DE CONSUMO
--------------------------------------------------------------------------------
Crear el contexto y exponer funciones para modificar colores específicos, aplicar presets completos o restaurar a valores por defecto:

```typescript
interface ITThemeContextType {
  palette: ITThemePalette;
  colors: ITThemePalette; // Alias para compatibilidad de nomenclatura
  setPalette: (newPalette: ITThemePalette) => void;
  updateColor: (key: string, value: string) => void;
  resetTheme: () => void;
  applyPreset: (colors: ITThemePalette) => void;
}

const ITThemeContext = createContext<ITThemeContextType | undefined>(undefined);

export const useITTheme = () => {
  const context = useContext(ITThemeContext);
  if (!context) {
    throw new Error("useITTheme debe usarse dentro de un ITThemeProvider");
  }
  return context;
};
```

PASO 4: LÓGICA DEL PROVEEDOR (ITThemeProvider)
--------------------------------------------------------------------------------
El componente proveedor debe realizar varias tareas clave:

A) Carga y Persistencia en localStorage
   Al montar el componente, intenta cargar la configuración previa guardada con `localStorage.getItem("it-theme-palette")`. Realiza una fusión profunda (deep merge) con los valores por defecto para evitar problemas con propiedades nuevas o indefinidas.

B) Inyección de Variables CSS y Sobrescritura Dinámica (useEffect)
   El hook `useEffect` se activa cada vez que la paleta cambia. Su tarea es doble:
   1. Recorrer de forma recursiva la paleta para inyectar cada color en `:root` con el prefijo `--color-[propiedad]`. Por ejemplo: `palette.primary` se convierte en `--color-primary`.
   2. Generar o actualizar un elemento `<style id="it-theme-dynamic-overrides">` en el `<head>` del documento.

   Este estilo inyectado hace dos cosas fundamentales:
   - Calcula colores derivados usando la función `color-mix` nativa de CSS. Por ejemplo, calcula colores de hover mezclando el color principal con negro, o colores de anillo/focus mezclándolo con transparente:
     ```css
     --color-primary-hover: color-mix(in srgb, var(--color-primary) 85%, black);
     --color-primary-ring: color-mix(in srgb, var(--color-primary) 40%, transparent);
     --color-primary-soft: color-mix(in srgb, var(--color-primary) 12%, transparent);
     ```
   - Mapea selectores fijos de Tailwind (ej. `.bg-cyan-400`, `.text-green-700`, `.hover:bg-cyan-500:hover`) a sus respectivas variables CSS dinámicas utilizando `!important`. Esto asegura que los componentes legacy utilicen la paleta personalizada sin requerir refactorización de código.

C) Funciones Auxiliares para Modificar Colores
   Para modificar propiedades anidadas (ej. "layout.sidebarBg"), se utiliza una función que procesa la ruta con punto (dot notation):
   ```typescript
   const updateColor = (key: string, value: string) => {
     setPaletteState((prev) => {
       if (key.includes(".")) {
         const [section, subKey] = key.split(".");
         return {
           ...prev,
           [section]: {
             ...prev[section],
             [subKey]: value,
           },
         };
       }
       return { ...prev, [key]: value };
     });
   };
   ```

PASO 5: INTERFAZ DE DISEÑO (DRAWER & FAB)
--------------------------------------------------------------------------------
El propio proveedor incluye los elementos visuales de personalización para que estén accesibles globalmente si se desea:
1. FAB (Floating Action Button): Un botón flotante redondo de paleta de colores en la esquina inferior derecha (`fixed bottom-6 right-6 z-50`).
2. Drawer lateral (Panel de Configuración): Se despliega al pulsar el FAB. Contiene:
   - Panel de Presets: Botones con vista previa rápida de colores para cambiar todo el tema de un clic.
   - Selector de Colores Base: Inputs de tipo `color` nativos enlazados con inputs de texto hexadecimal para afinar colores base (Primary, Secondary, Ternary, Success, Danger, Info, Warning, Alert).
   - Selector de Colores de Estructura: Controles para Sidebar, Navbar y Tablas.
   - Indicador de Autoguardado: Notificación visual rápida de confirmación de guardado en localStorage.
   - Controles de Restablecimiento: Botón para volver a la DEFAULT_PALETTE.

================================================================================
4. INTEGRACIÓN EN LA APLICACIÓN
================================================================================
Para habilitar el tema dinámico global, envuelve la aplicación raíz en el proveedor:

```tsx
import { ITThemeProvider } from "./providers/ITThemeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ITThemeProvider>
      <App />
    </ITThemeProvider>
  </React.StrictMode>
);
```

Para consumir los colores dentro de los componentes utilizando TypeScript:
```tsx
import { useITTheme } from "./providers/ITThemeProvider";

const MyComponent = () => {
  const { colors, updateColor } = useITTheme();
  return (
    <div style={{ backgroundColor: colors.primary, color: colors.layout.navbarText }}>
      Contenido Tematizado
    </div>
  );
};
```
Y mediante CSS/Tailwind:
```tsx
// Con Tailwind (usando variables inyectadas)
<div className="bg-[var(--color-primary)] text-[var(--color-layout-navbarText)]" />
```
o gracias a las sobrescrituras del provider, usando las clases de Tailwind que fueron mapeadas:
```tsx
// Se convertirá automáticamente al color primario y secundario del tema dinámico
<button className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded">
  Botón Dinámico
</button>
```
