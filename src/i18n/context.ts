import { createContext } from "react";
import { createI18n } from "./translator";
import type { ITI18nValue } from "./types";

/**
 * Contexto de i18n. Su valor por defecto es un traductor en español (locale base),
 * de modo que `useITTranslation()` funciona aunque no haya `ITI18nProvider`.
 */
export const ITI18nContext = createContext<ITI18nValue>(createI18n());
