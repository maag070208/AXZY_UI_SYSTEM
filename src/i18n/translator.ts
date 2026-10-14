import { enUS, es as esDateLocale } from "date-fns/locale";
import type { Locale } from "date-fns";
import es from "./locales/es";
import en from "./locales/en";
import type { ITI18nOptions, ITI18nValue, ITMessagesByLocale } from "./types";

/** Locale por defecto de la librería (mantiene el comportamiento histórico). */
export const DEFAULT_LOCALE = "es";

/** Catálogo base incluido en el paquete. */
export const baseCatalog: ITMessagesByLocale = { es, en };

const INTL_LOCALES: Record<string, string> = { es: "es-MX", en: "en-US" };
const DATE_LOCALES: Record<string, Locale> = { es: esDateLocale, en: enUS };

/** Mapea `es`/`en` a una locale BCP-47 para `Intl.*` (default: la propia locale). */
export function toIntlLocale(locale: string): string {
  return INTL_LOCALES[locale] ?? locale;
}

/** Devuelve la locale de `date-fns` para la locale dada (fallback: español). */
export function toDateLocale(locale: string): Locale {
  return DATE_LOCALES[locale] ?? DATE_LOCALES[DEFAULT_LOCALE];
}

/** Sustituye los placeholders `{var}` de un texto. */
export function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    vars[key] !== undefined ? String(vars[key]) : match
  );
}

/**
 * Fusiona el catálogo base con los mensajes propios.
 * Prioridad (mayor → menor): `messages[locale]` → `messages[fallback]` →
 * catálogo base `[locale]` → catálogo base `[fallback]` → la propia key.
 */
export function resolveMessages({ locale, fallbackLocale, messages }: Required<Pick<ITI18nOptions, "locale" | "fallbackLocale">> & Pick<ITI18nOptions, "messages">): Record<string, string> {
  const custom = messages ?? {};
  return {
    ...BASE[fallbackLocale],
    ...BASE[locale],
    ...custom[fallbackLocale],
    ...custom[locale],
  };
}

const BASE: Record<string, Record<string, string> | undefined> = { es, en };

/**
 * Construye el valor de contexto de i18n (traductor + formateadores).
 *
 * @example
 * ```ts
 * const i18n = createI18n({ locale: "en" });
 * i18n.t("common.cancel"); // "Cancel"
 * i18n.formatCurrency(1234.5); // "$1,234.50"
 * ```
 */
export function createI18n(options: ITI18nOptions = {}): ITI18nValue {
  const locale = options.locale ?? DEFAULT_LOCALE;
  const fallbackLocale = options.fallbackLocale ?? DEFAULT_LOCALE;
  const messages = resolveMessages({ locale, fallbackLocale, messages: options.messages });
  const intlLocale = toIntlLocale(locale);

  const t = (key: string, vars?: Record<string, string | number>): string =>
    interpolate(messages[key] ?? key, vars);

  return {
    locale,
    fallbackLocale,
    t,
    dateLocale: toDateLocale(locale),
    formatNumber: (value: number, opts?: Intl.NumberFormatOptions): string =>
      new Intl.NumberFormat(intlLocale, opts).format(value),
    formatCurrency: (value: number, currency = "MXN", opts?: Intl.NumberFormatOptions): string =>
      new Intl.NumberFormat(intlLocale, { style: "currency", currency, ...opts }).format(value),
    formatDate: (value: Date | number | string, opts?: Intl.DateTimeFormatOptions): string =>
      new Intl.DateTimeFormat(intlLocale, opts).format(value instanceof Date ? value : new Date(value)),
  };
}
