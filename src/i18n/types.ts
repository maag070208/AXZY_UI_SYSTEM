import type { ReactNode } from "react";
import type { Locale } from "date-fns";

/** Supported base locales shipped with the library. */
export type ITLocale = "es" | "en";

/** Message catalog: flat `namespace.key` → text. */
export type ITMessages = Record<string, string>;

/** Message overrides keyed by locale. */
export type ITMessagesByLocale = Record<string, ITMessages>;

/** Interpolation variables for `t()`. */
export type ITVars = Record<string, string | number>;

/** Options used to build an i18n value. */
export interface ITI18nOptions {
  /** Active locale. @default "es" */
  locale?: string;
  /** Locale used for missing keys. @default "es" */
  fallbackLocale?: string;
  /** Custom messages merged over the built-in catalog. */
  messages?: ITMessagesByLocale;
}

/** Contract of the i18n context (returned by `useITTranslation()`). */
export interface ITI18nValue {
  /** Active locale. */
  locale: string;
  /** Fallback locale. */
  fallbackLocale: string;
  /** Translate a `namespace.key` and interpolate `{var}` placeholders. */
  t: (key: string, vars?: ITVars) => string;
  /** Format a number using `Intl.NumberFormat(locale)`. */
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
  /** Format a currency using `Intl.NumberFormat(locale)`. */
  formatCurrency: (value: number, currency?: string, options?: Intl.NumberFormatOptions) => string;
  /** Format a date using `Intl.DateTimeFormat(locale)`. */
  formatDate: (value: Date | number | string, options?: Intl.DateTimeFormatOptions) => string;
  /** Matching `date-fns` locale. */
  dateLocale: Locale;
}

/** Props for `ITI18nProvider`. */
export interface ITI18nProviderProps {
  /** Active locale. @default "es" */
  locale?: string;
  /** Fallback locale for missing keys. @default "es" */
  fallbackLocale?: string;
  /** Custom messages merged over the built-in catalog, keyed by locale. */
  messages?: ITMessagesByLocale;
  /** Application tree. */
  children: ReactNode;
}
