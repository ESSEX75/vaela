export const LOCALES = [
  { code: 'en', label: 'English', flag: '/assets/en-flag.svg' },
  { code: 'ru', label: 'Russian', flag: '/assets/ru-flag.svg' },
] as const;

export const LOCALE_CODES = LOCALES.map(l => l.code);
export const DEFAULT_LOCALE = 'en';

export type LocaleCode = (typeof LOCALES)[number]['code'];
