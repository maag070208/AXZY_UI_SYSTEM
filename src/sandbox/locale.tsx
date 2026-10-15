/**
 * Idioma del sandbox, compartido entre el chrome (ITTopBar) y las páginas del
 * portafolio.
 *
 * La preferencia vivía solo en `App`, así que el portafolio no podía cambiarla:
 * ahora se expone por contexto para que el selector del header del portafolio y
 * el de la barra del sandbox muevan el mismo estado (y persistan en
 * `localStorage`).
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ITLocale } from "@/i18n";

/** Valor del contexto de idioma del sandbox. */
export interface SandboxLocaleValue {
  /** Idioma activo. */
  locale: ITLocale;
  /** Cambia el idioma y lo persiste. */
  setLocale: (locale: ITLocale) => void;
}

/** Clave de `localStorage` donde se recuerda la preferencia. */
const STORAGE_KEY = "it-locale";

const SandboxLocaleContext = createContext<SandboxLocaleValue | undefined>(undefined);

/**
 * Lee la preferencia guardada. Cualquier valor distinto de `"en"` cae en `"es"`,
 * que es el idioma por defecto del sandbox.
 */
function readStoredLocale(): ITLocale {
  if (typeof window === "undefined") return "es";
  return window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "es";
}

/**
 * Provee el idioma del sandbox a todo el árbol (chrome + páginas).
 *
 * @example
 * ```tsx
 * <SandboxLocaleProvider>
 *   <ITI18nProvider locale={locale} messages={sandboxMessages}>…</ITI18nProvider>
 * </SandboxLocaleProvider>
 * ```
 */
export function SandboxLocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<ITLocale>(readStoredLocale);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  return (
    <SandboxLocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </SandboxLocaleContext.Provider>
  );
}

/**
 * Acceso al idioma del sandbox. Fuera del provider devuelve español y un cambio
 * de idioma sin efecto, para que una página se pueda renderizar aislada (tests,
 * Storybook futuro) sin explotar.
 */
export function useSandboxLocale(): SandboxLocaleValue {
  return (
    useContext(SandboxLocaleContext) ?? {
      locale: "es",
      setLocale: () => undefined,
    }
  );
}
