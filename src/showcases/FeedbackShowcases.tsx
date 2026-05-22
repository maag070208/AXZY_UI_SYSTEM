import React, { useState } from "react";
import {
  ITDialog,
  ITButton,
  ITSlideToggle,
  ITToast,
  ITInput,
  ITSelect,
  ITLoader,
  useITTheme
} from "../index";
import { PRESETS } from "../components/theme-provider/themeProvider";
import { ShowcaseLayout } from "./ShowcaseLayout";

// 1. ITDialog Showcase
export const DialogShowcase = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [useFormHeader, setUseFormHeader] = useState(true);

  const code = `<ITDialog\n  isOpen={${isOpen}}\n  onClose={() => setIsOpen(false)}\n  title="Confirmación de Auditoría"\n  useFormHeader={${useFormHeader}}\n>\n  <p>¿Estás seguro de registrar esta auditoría?</p>\n</ITDialog>`;

  return (
    <ShowcaseLayout
      title="ITDialog"
      description="Cajas de diálogo modales con overlay oscuro y soporte de cabeceras de formulario."
      code={code}
      demo={
        <div>
          <ITButton label="Abrir Ventana Modal" color="primary" onClick={() => setIsOpen(true)} />
          <ITDialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Confirmación de Auditoría"
            useFormHeader={useFormHeader}
          >
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Se guardará un registro inmutable en los logs de la blockchain corporativa. Esta acción es irreversible.
              </p>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <ITButton label="Cancelar" variant="ghost" onClick={() => setIsOpen(false)} />
                <ITButton label="Autorizar" color="success" onClick={() => { alert("Transacción firmada!"); setIsOpen(false); }} />
              </div>
            </div>
          </ITDialog>
        </div>
      }
      controls={
        <>
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">Usar Cabecera de Formulario</span>
            <ITSlideToggle isOn={useFormHeader} onToggle={setUseFormHeader} size="sm" />
          </div>
        </>
      }
    />
  );
};

// 2. ITToast Showcase
export const ToastShowcase = () => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<any>("success");
  const [msg, setMsg] = useState("¡La operación se procesó con éxito!");

  const code = `<ITToast\n  message="${msg}"\n  type="${type}"\n  duration={3000}\n  onClose={() => setVisible(false)}\n/>`;

  return (
    <ShowcaseLayout
      title="ITToast"
      description="Alertas efímeras del sistema flotantes para notificar eventos inmediatos al usuario."
      code={code}
      demo={
        <div>
          <ITButton label="Lanzar Notificación" color="purple" onClick={() => setVisible(true)} />
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
          <ITInput name="msg_ctrl" label="Mensaje" value={msg} onChange={(e: any) => setMsg(e.target.value)} onBlur={() => { }} />
          <ITSelect
            name="type_ctrl"
            label="Tipo de Notificación"
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
          <ITButton label="Toast Exito" color="success" size="small" onClick={() => { setMsg("Operación exitosa!"); setType("success"); setVisible(true); }} />
          <ITButton label="Toast Error" color="danger" size="small" onClick={() => { setMsg("Ocurrió un fallo de red."); setType("error"); setVisible(true); }} />
          <ITButton label="Toast Warning" color="warning" size="small" onClick={() => { setMsg("Licencia por expirar."); setType("warning"); setVisible(true); }} />
          <ITButton label="Toast Info" color="info" size="small" onClick={() => { setMsg("Actualización disponible."); setType("info"); setVisible(true); }} />
        </div>
      }
    />
  );
};

// 3. ITLoader Showcase
export const LoaderShowcase = () => {
  const [variant, setVariant] = useState<any>("spinner");
  const [size, setSize] = useState<any>("md");
  const [color, setColor] = useState("primary");

  const code = `<ITLoader\n  variant="${variant}"\n  size="${size}"\n  color="${color}"\n/>`;

  return (
    <ShowcaseLayout
      title="ITLoader"
      description="Indicadores de carga animados con soporte para múltiples estilos visuales."
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
            label="Tipo de Cargador"
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
            label="Tamaño"
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
            label="Color"
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
        <div className="flex flex-wrap items-center gap-6">
          <ITLoader variant="spinner" size="md" color="primary" />
          <ITLoader variant="dots" size="md" color="success" />
          <div className="w-32"><ITLoader variant="bar" size="md" color="danger" /></div>
          <ITLoader variant="pulse" size="md" color="purple" />
        </div>
      }
    />
  );
};

// 4. ITThemeProvider Showcase
export const ThemeProviderShowcase = () => {
  const { applyPreset, resolvedTheme, darkModeMode, setDarkModeMode } = useITTheme();

  const code = `// En index.tsx o App.tsx\n<ITThemeProvider>\n  <App />\n</ITThemeProvider>\n\n// En tu componente para obtener la paleta y cambiar modo:\nconst { palette, resolvedTheme, darkModeMode, setDarkModeMode, applyPreset } = useITTheme();`;

  return (
    <ShowcaseLayout
      title="ITThemeProvider"
      description="Inyector dinámico de tokens CSS que gestiona el modo oscuro/claro y las paletas de colores unificadas."
      code={code}
      demo={
        <div className="w-full max-w-md space-y-6 bg-white dark:bg-slate-900 border p-6 rounded-2xl shadow-sm border-slate-100 dark:border-slate-800">
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Modo de Apariencia</h4>
            <div className="flex flex-wrap gap-2">
              {(["light", "dark", "system"] as const).map((mode) => (
                <ITButton
                  key={mode}
                  label={mode === "light" ? "Claro ☀️" : mode === "dark" ? "Oscuro 🌙" : "Sistema 🖥️"}
                  color={darkModeMode === mode ? "primary" : "secondary"}
                  onClick={() => setDarkModeMode(mode)}
                  size="small"
                />
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Tema resuelto actualmente: <strong>{resolvedTheme === "dark" ? "Oscuro" : "Claro"}</strong>
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Cambiar Preset del Sistema</h4>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset.colors)}
                  className="p-2 border rounded-xl text-xs font-semibold text-left hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      controls={
        <div className="space-y-3 text-xs text-slate-500">
          <p>Usa la burbuja de la paleta de colores flotante (FAB) en la parte inferior derecha para configurar a fondo cada color.</p>
        </div>
      }
    />
  );
};
