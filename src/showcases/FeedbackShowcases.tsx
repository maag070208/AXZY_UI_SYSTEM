import React, { useState } from "react";
import {
  ITDialog,
  ITButton,
  ITSearchSelect,
  ITSlideToggle,
  ITToast,
  ITInput,
  ITSelect,
  ITLoader,
  ITGrid,
  ITStack,
  useITTheme
} from "../index";
import { PRESETS } from "../components/theme-provider/themePresets";
import { ShowcaseLayout } from "./ShowcaseLayout";
import { useITTranslation } from "@/i18n";
import { AxzyLoader, AxzyLogo } from "@/sandbox/AxzyLogo";

// 1. ITDialog Showcase
export const DialogShowcase = () => {
  const { t } = useITTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [useFormHeader, setUseFormHeader] = useState(true);
  const [auditor, setAuditor] = useState("");

  const code = `<ITDialog\n  isOpen={${isOpen}}\n  onClose={() => setIsOpen(false)}\n  title="Confirmación de Auditoría"\n  useFormHeader={${useFormHeader}}\n>\n  <p>¿Estás seguro de registrar esta auditoría?</p>\n  <ITSearchSelect placeholder="Selecciona un auditor" ... />\n</ITDialog>`;

  return (
    <ShowcaseLayout
      title="ITDialog"
      description={t("showcase.feedback.dialogDesc")}
      code={code}
      demo={
        <div>
          <ITButton label={t("showcase.feedback.openModal")} color="primary" onClick={() => setIsOpen(true)} />
          <ITDialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title={t("showcase.feedback.dialogTitle")}
            useFormHeader={useFormHeader}
          >
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {t("showcase.feedback.dialogBody")}
              </p>
              {/* Los paneles flotantes (selects, pickers, menús) se renderizan en
                  un portal fuera del diálogo: elegir una opción no debe cerrarlo. */}
              <ITSearchSelect
                label={t("showcase.feedback.auditorLabel")}
                placeholder={t("showcase.feedback.auditorPlaceholder")}
                options={[
                  { value: "ana", label: "Ana Torres" },
                  { value: "luis", label: "Luis Paredes" },
                  { value: "marta", label: "Marta Ruiz" },
                ]}
                value={auditor}
                onChange={(next) => setAuditor(String(next))}
              />
              <div className="flex justify-end gap-3 pt-4 border-t">
                <ITButton label={t("showcase.common.cancel")} variant="ghost" onClick={() => setIsOpen(false)} />
                <ITButton label={t("showcase.feedback.authorize")} color="success" onClick={() => { alert(t("showcase.feedback.signedTransaction")); setIsOpen(false); }} />
              </div>
            </div>
          </ITDialog>
        </div>
      }
      controls={
        <>
          <div className="flex items-center justify-between pt-2">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{t("showcase.feedback.useFormHeader")}</span>
            <ITSlideToggle isOn={useFormHeader} onToggle={setUseFormHeader} size="sm"
              ariaLabel={t("showcase.feedback.useFormHeader")}
            />
          </div>
        </>
      }
      doc={{
        summary: "Modal montado en un portal sobre `document.body` para confirmaciones, formularios o detalle, con cierre por Escape o clic fuera.",
        description: "Con `title` dibuja una barra propia o un `ITFormHeader` si `useFormHeader` está activo, y con `fullScreen` ocupa todo el viewport.",
        examples: [
          '<ITDialog isOpen={open} onClose={() => setOpen(false)} title="Confirmación de auditoría"><p>¿Registrar la auditoría?</p></ITDialog>',
          '<ITDialog isOpen={open} onClose={close} title="Nuevo usuario" useFormHeader>…</ITDialog>',
          '<ITDialog isOpen={open} onClose={close} fullScreen><ITDataTable columns={cols} fetchData={api.page} /></ITDialog>',
        ],
        props: [
          { name: "isOpen", type: "boolean", required: true, description: "Controla la visibilidad; con `false` no renderiza nada." },
          { name: "onClose", type: "() => void", required: true, description: "Se dispara al pulsar Escape, hacer clic fuera del panel o usar el botón de cerrar." },
          { name: "children", type: "React.ReactNode", required: true, description: "Contenido del cuerpo del diálogo." },
          { name: "className", type: "string", description: "Clases adicionales del panel; se ignoran en `fullScreen`." },
          { name: "title", type: "string", description: "Encabezado opcional mostrado en la parte superior." },
          { name: "useFormHeader", type: "boolean", default: "false", description: "Con `title`, renderiza un `ITFormHeader` en lugar de la barra por defecto." },
          { name: "fullScreen", type: "boolean", default: "false", description: "Hace que el diálogo ocupe todo el viewport (sin radio, borde ni sombra)." },
        ],
        notes: [
          "Los paneles flotantes que abre su contenido (selects, pickers, menús) viven en su propio portal, así que elegir una opción no cierra el diálogo.",
          "No trae `role=\"dialog\"`, `aria-modal`, focus trap ni retorno de foco: esa gestión queda en el consumidor.",
        ],
      }}
    />
  );
};

// 2. ITToast Showcase
export const ToastShowcase = () => {
  const { t } = useITTranslation();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<any>("success");
  const [msg, setMsg] = useState(t("showcase.feedback.toastDefaultMsg"));

  const code = `<ITToast\n  message="${msg}"\n  type="${type}"\n  duration={3000}\n  onClose={() => setVisible(false)}\n/>`;

  return (
    <ShowcaseLayout
      title="ITToast"
      description={t("showcase.feedback.toastDesc")}
      code={code}
      demo={
        <div>
          <ITButton label={t("showcase.feedback.launchNotification")} color="purple" onClick={() => setVisible(true)} />
          {visible && (
            <ITToast
              message={msg}
              type={type}
              duration={3000}
              onClose={() => setVisible(false)}
            />
          )}
        </div>
      }
      controls={
        <>
          <ITInput name="msg_ctrl" label={t("showcase.feedback.message")} value={msg} onChange={(e: any) => setMsg(e.target.value)} onBlur={() => { }} />
          <ITSelect
            name="type_ctrl"
            label={t("showcase.feedback.notificationType")}
            value={type}
            onChange={(e: any) => setType(e.target.value)}
            options={[
              { label: "Success (Éxito)", value: "success" },
              { label: "Error (Peligro)", value: "error" },
              { label: "Warning (Advertencia)", value: "warning" },
              { label: "Info (Información)", value: "info" }
            ]}
          />
        </>
      }
      gallery={
        <div className="flex flex-wrap gap-3">
          <ITButton label={t("showcase.feedback.toastSuccess")} color="success" size="sm" onClick={() => { setMsg(t("showcase.feedback.msgSuccess")); setType("success"); setVisible(true); }} />
          <ITButton label={t("showcase.feedback.toastError")} color="danger" size="sm" onClick={() => { setMsg(t("showcase.feedback.msgError")); setType("error"); setVisible(true); }} />
          <ITButton label={t("showcase.feedback.toastWarning")} color="warning" size="sm" onClick={() => { setMsg(t("showcase.feedback.msgWarning")); setType("warning"); setVisible(true); }} />
          <ITButton label={t("showcase.feedback.toastInfo")} color="info" size="sm" onClick={() => { setMsg(t("showcase.feedback.msgInfo")); setType("info"); setVisible(true); }} />
        </div>
      }
      doc={{
        summary: "Notificación flotante que se autocierra y colorea según su severidad, colocada en una de seis posiciones.",
        examples: [
          '<ITToast message="Cambios guardados" type="success" duration={2000} position="bottom-right" onClose={() => setVisible(false)} />',
          '<ITToast message="No se pudo conectar" type="error" />',
        ],
        props: [
          { name: "message", type: "string", required: true, description: "Texto que muestra el toast." },
          { name: "type", type: '"success" | "error" | "warning" | "info" | "primary" | "danger" | string', default: '"info"', description: "Severidad; define el icono y el color de fondo." },
          { name: "duration", type: "number", default: "1500", description: "Milisegundos antes del autocierre." },
          { name: "position", type: '"top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left"', default: '"top-right"', description: "Posición fija en pantalla." },
          { name: "onClose", type: "() => void", description: "Se invoca 300 ms después del autocierre o del cierre manual, al terminar la transición." },
        ],
        notes: [
          "`type` acepta cualquier string: se resuelve contra `theme.colors`; si la clave no existe, cae al `primary[500]` del tema.",
          "El contenedor lleva `role=\"alert\"`, `fixed z-[80]` y un ancho mínimo de 300 px. Sin `onClose` el toast se desvanece igual, pero el padre no puede desmontarlo.",
        ],
      }}
    />
  );
};

// 3. ITLoader Showcase
export const LoaderShowcase = () => {
  const { t } = useITTranslation();
  const [variant, setVariant] = useState<any>("spinner");
  const [size, setSize] = useState<any>("md");
  const [color, setColor] = useState("primary");

  const code = `<ITLoader\n  variant="${variant}"\n  size="${size}"\n  color="${color}"\n/>`;

  return (
    <ShowcaseLayout
      title="ITLoader"
      description={t("showcase.feedback.loaderDesc")}
      code={code}
      demo={
        <div className="w-full max-w-xs flex items-center justify-center min-h-[80px]">
          <ITLoader variant={variant} size={size} color={color} />
        </div>
      }
      controls={
        <>
          <ITSelect
            name="var_ctrl"
            label={t("showcase.feedback.loaderVariant")}
            value={variant}
            onChange={(e: any) => setVariant(e.target.value)}
            options={[
              { label: "Spinner (Círculo)", value: "spinner" },
              { label: "Dots (Puntos)", value: "dots" },
              { label: "Bar (Barra)", value: "bar" },
              { label: "Pulse (Pulso)", value: "pulse" }
            ]}
          />
          <ITSelect
            name="sz_ctrl"
            label={t("showcase.common.size")}
            value={size}
            onChange={(e: any) => setSize(e.target.value)}
            options={[
              { label: "Extra Small (xs)", value: "xs" },
              { label: "Small (sm)", value: "sm" },
              { label: "Medium (md)", value: "md" },
              { label: "Large (lg)", value: "lg" },
              { label: "Extra Large (xl)", value: "xl" }
            ]}
          />
          <ITSelect
            name="col_ctrl"
            label={t("showcase.common.color")}
            value={color}
            onChange={(e: any) => setColor(e.target.value)}
            options={[
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Success", value: "success" },
              { label: "Danger", value: "danger" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" }
            ]}
          />
        </>
      }
      gallery={
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-6">
            <ITLoader variant="spinner" size="md" color="primary" />
            <ITLoader variant="dots" size="md" color="success" />
            <div className="w-32"><ITLoader variant="bar" size="md" color="danger" /></div>
            <ITLoader variant="pulse" size="md" color="purple" />
          </div>

          {/* Loader de marca: el ícono axzydev con un latido suave. En el kit la
              versión animada es Lottie; aquí se usa el SVG estático. */}
          <div className="flex flex-wrap items-center gap-8 border-t border-slate-200 pt-6 dark:border-slate-800">
            <AxzyLoader etiqueta={t("sandbox.loading")} />
            <AxzyLoader etiqueta={t("sandbox.loading")} tamano={24} />
            <AxzyLogo variante="loader" tamano={56} etiqueta="axzydev" />
          </div>
        </div>
      }
      doc={{
        summary: "Indicador de carga con cuatro animaciones (spinner, dots, bar y pulse) y color semántico del tema o valor CSS.",
        examples: [
          '<ITLoader variant="spinner" size="md" color="primary" />',
          '<ITLoader variant="dots" size="sm" color="success" />',
          '<div className="w-48"><ITLoader variant="bar" color="#06b6d4" /></div>',
        ],
        props: [
          { name: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "Tamaño del indicador." },
          { name: "variant", type: '"spinner" | "dots" | "bar" | "pulse"', default: '"spinner"', description: "Tipo de animación." },
          { name: "color", type: "string", default: '"primary"', description: "Clave semántica del tema, valor CSS (`#rrggbb`, `rgb(...)`) o clase CSS por compatibilidad." },
          { name: "className", type: "string", default: '""', description: "Clases adicionales (en `bar` define el ancho)." },
        ],
        notes: [
          "Resolución de color: si es clave de `theme.colors` usa el tono 500; si empieza por `#` o `rgb` lo usa tal cual; cualquier otro string se inyecta como clase.",
          "`spinner` lleva `role=\"status\"` con un texto oculto para lectores de pantalla; `bar` ocupa todo el ancho de su contenedor, así que conviene acotarlo con `className`.",
          "En `dots` el tamaño se deriva quitando la primera `l`/`g` a `size`, por lo que solo `sm` y `md` producen clases válidas.",
        ],
      }}
    />
  );
};

// 4. ITThemeProvider Showcase
export const ThemeProviderShowcase = () => {
  const { t } = useITTranslation();
  const { applyPreset, resolvedTheme, darkModeMode, setDarkModeMode } = useITTheme();

  const code = `// En index.tsx o App.tsx\n<ITThemeProvider>\n  <App />\n</ITThemeProvider>\n\n// En tu componente:\nconst { palette, resolvedTheme, darkModeMode, setDarkModeMode, applyPreset } = useITTheme();`;

  return (
    <ShowcaseLayout
      title="ITThemeProvider"
      description={t("showcase.feedback.themeDesc")}
      code={code}
      demo={
        <ITStack spacing={5} className="w-full max-w-md">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 block">
              {t("showcase.feedback.appearanceMode")}
            </span>
            <div className="flex flex-wrap gap-2">
              {(["light", "dark", "system"] as const).map((mode) => (
                <ITButton
                  key={mode}
                  label={mode === "light" ? t("showcase.feedback.modeLight") : mode === "dark" ? t("showcase.feedback.modeDark") : t("showcase.feedback.modeSystem")}
                  color={darkModeMode === mode ? "primary" : "secondary"}
                  onClick={() => setDarkModeMode(mode)}
                  size="sm"
                />
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {t("showcase.feedback.currentTheme")} <strong>{resolvedTheme === "dark" ? t("showcase.feedback.modeDarkName") : t("showcase.feedback.modeLightName")}</strong>
            </p>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 block">
              {t("showcase.feedback.quickPresets")}
            </span>
            <ITGrid container spacing={2}>
              {PRESETS.map((preset) => {
                const dotColors = [preset.colors.primary, preset.colors.secondary, preset.colors.ternary, preset.colors.success];
                return (
                  <ITGrid key={preset.name} item xs={6}>
                    <button
                      onClick={() => applyPreset(preset.colors)}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-600 transition-colors text-left"
                    >
                      <div className="flex -space-x-1">
                        {dotColors.map((c, i) => (
                          <span
                            key={i}
                            className="w-3.5 h-3.5 rounded-full border border-white dark:border-slate-800"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                        {preset.name.replace(/ [\w]+$/, "")}
                      </span>
                    </button>
                  </ITGrid>
                );
              })}
            </ITGrid>
          </div>
        </ITStack>
      }
      controls={
        <ITStack spacing={3}>
          <p className="text-xs text-slate-500">
            {t("showcase.feedback.themeHint1")}
          </p>
          <p className="text-xs text-slate-500">
            {t("showcase.feedback.themeHint2")}
          </p>
        </ITStack>
      }
      doc={{
        summary: "Provider raíz del tema: inyecta las variables CSS de color, resuelve el modo claro/oscuro y aplica densidad, radio y sombras globales.",
        description: "Envuelve la app (o la parte que usa componentes AXZY) una sola vez. Expone `useITTheme()` con `palette`, `colors`, `setPalette`, `updateColor`, `resetTheme`, `applyPreset`, `resolvedTheme`, `darkModeMode`, `setDarkModeMode` y `appearance`, y opcionalmente un FAB con diseñador de temas en vivo.",
        examples: [
          '<ITThemeProvider><App /></ITThemeProvider>',
          '<ITThemeProvider theme={{ primary: "#3b82f6", layout: { sidebarBg: "#0f172a" } }} showFab={false}><App /></ITThemeProvider>',
          '<ITThemeProvider density={0.9} radius={8} shadow={1} appearance="flat"><App /></ITThemeProvider>',
          '<ITThemeProvider appearance="bento"><App /></ITThemeProvider>',
        ],
        props: [
          { name: "theme", type: "Partial<ITThemePalette>", description: "Overrides de paleta fusionados (deep merge) con el tema por defecto: `primary`, `secondary`, `ternary`, `danger`, `success`, `info`, `alert`, `warning`, `layout` y `table`." },
          { name: "children", type: "React.ReactNode", required: true, description: "Subárbol que recibe el contexto y las variables CSS." },
          { name: "showFab", type: "boolean", default: "true", description: "Muestra el botón flotante que abre el diseñador de temas y persiste la paleta; en producción se suele poner en `false`." },
          { name: "density", type: "number", default: "1", description: "Factor de densidad global: escala el `font-size` raíz para compactar todo lo basado en `rem`. Se limita a `0.5`–`1.5`." },
          { name: "radius", type: "number", default: "—", description: "Radio global en px aplicado a toda la escala `--radius-*`; `0` deja las esquinas totalmente cuadradas." },
          { name: "shadow", type: "number", default: "—", description: "Fuerza global de sombras: `0` ninguna, `1` sutiles, `2` look actual, `3` marcadas." },
          { name: "appearance", type: '"soft" | "flat" | "bento"', default: '"soft"', description: "Lenguaje visual del sistema; `\"flat\"` usa superficies planas con bordes de 1 px; `\"bento\"` usa lienzo gris claro, tarjetas blancas sin borde con sombra difusa y radio de 24 px, controles en píldora y navegación con píldora tinta. Fija `data-it-appearance` en `<html>`; un `radius`/`shadow` explícito gana sobre los valores bento." },
        ],
        notes: [
          "`useITTheme()` lanza error si se usa fuera del provider; `useITThemeSafe()` devuelve `undefined` en ese caso.",
          "Con `showFab` la paleta, el modo y los presets se persisten en `localStorage` (`it-theme-palette`, `it-theme-dark-mode`, `it-theme-custom-presets`); con `showFab={false}` el estado se sincroniza con la prop `theme`.",
          "`radius={0}` no significa «sin override»: deja todas las esquinas cuadradas. Para no tocar la escala hay que omitir la prop.",
        ],
      }}
    />
  );
};
