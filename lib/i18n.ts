import heCommon from '@/messages/he/common.json';
import heHomepage from '@/messages/he/homepage.json';
import heListings from '@/messages/he/listings.json';
import enCommon from '@/messages/en/common.json';
import enHomepage from '@/messages/en/homepage.json';
import enListings from '@/messages/en/listings.json';
import ruCommon from '@/messages/ru/common.json';
import ruHomepage from '@/messages/ru/homepage.json';
import ruListings from '@/messages/ru/listings.json';

export const locales = ['he', 'en', 'ru'] as const;
export type Locale = (typeof locales)[number];

const dictionaries = {
  he: { common: heCommon, homepage: heHomepage, listings: heListings },
  en: { common: enCommon, homepage: enHomepage, listings: enListings },
  ru: { common: ruCommon, homepage: ruHomepage, listings: ruListings }
} as const;

type Dictionaries = typeof dictionaries;
export type Domain = keyof Dictionaries[Locale];
type LocaleMessages = Dictionaries[Locale];

export const isRtl = (locale: Locale) => locale === 'he';

function getValue(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, part) => (acc as Record<string, unknown>)?.[part], obj);
}

function flattenKeys(obj: unknown, prefix = ''): string[] {
  if (typeof obj !== 'object' || obj === null) return [];
  return Object.entries(obj as Record<string, unknown>).flatMap(([key, value]) => {
    const next = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return flattenKeys(value, next);
    }
    return [next];
  });
}

function validateTranslations() {
  const base = dictionaries.en;

  for (const locale of locales) {
    if (locale === 'en') continue;
    (Object.keys(base) as Domain[]).forEach((domain) => {
      const sourceKeys = flattenKeys(base[domain]);
      const targetKeys = new Set(flattenKeys(dictionaries[locale][domain]));
      const missing = sourceKeys.filter((key) => !targetKeys.has(key));

      if (missing.length) {
        console.warn(`[i18n] Missing translations for locale "${locale}" in "${domain}": ${missing.join(', ')}`);
      }
    });
  }
}

if (process.env.NODE_ENV !== 'production') {
  validateTranslations();
}

export function getI18n(locale: Locale) {
  const localeMessages: LocaleMessages = dictionaries[locale];

  function t(domain: Domain, key: string, params?: Record<string, string | number>) {
    const raw = getValue(localeMessages[domain], key);
    const fallback = getValue(dictionaries.en[domain], key);
    const value = typeof raw === 'string' ? raw : typeof fallback === 'string' ? fallback : key;

    if (!params) {
      return value;
    }

    return Object.entries(params).reduce(
      (acc, [paramKey, paramValue]) => acc.replaceAll(`{${paramKey}}`, String(paramValue)),
      value
    );
  }

  return { t, messages: localeMessages };
}
