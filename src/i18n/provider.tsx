import { useMemo } from "react";
import { ITI18nContext } from "./context";
import { createI18n } from "./translator";
import type { ITI18nProviderProps } from "./types";

/**
 * Provee locale y mensajes al árbol de componentes.
 *
 * Sin provider, los componentes usan el catálogo base en español. Con provider,
 * cualquier prop de texto explícita de un componente sigue teniendo prioridad
 * sobre el catálogo.
 *
 * @example
 * ```tsx
 * <ITThemeProvider>
 *   <ITI18nProvider locale="en">
 *     <App />
 *   </ITI18nProvider>
 * </ITThemeProvider>
 * ```
 *
 * @example
 * ```tsx
 * // Overrides parciales sobre el catálogo incluido
 * <ITI18nProvider locale="es" messages={{ es: { "common.cancel": "Abortar" } }}>
 *   <App />
 * </ITI18nProvider>
 * ```
 */
export function ITI18nProvider({
  locale,
  fallbackLocale,
  messages,
  children,
}: ITI18nProviderProps) {
  const value = useMemo(
    () => createI18n({ locale, fallbackLocale, messages }),
    [locale, fallbackLocale, messages]
  );

  return <ITI18nContext.Provider value={value}>{children}</ITI18nContext.Provider>;
}

export default ITI18nProvider;
