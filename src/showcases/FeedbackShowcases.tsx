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
    />
  );
};
