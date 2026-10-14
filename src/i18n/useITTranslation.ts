import { useContext } from "react";
import { ITI18nContext } from "./context";
import type { ITI18nValue } from "./types";

/**
 * Devuelve el traductor y los formateadores de la locale activa.
 *
 * Funciona aunque no exista `ITI18nProvider` (cae al catálogo base en español).
 *
 * @example
 * ```tsx
 * const { t, formatCurrency } = useITTranslation();
 * return <ITButton label={t("common.cancel")} onClick={onCancel} />;
 * ```
 */
export function useITTranslation(): ITI18nValue {
  return useContext(ITI18nContext);
}

export default useITTranslation;
