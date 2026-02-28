import { DEFAULT_LOCALE } from '@/config/locales';

/**
 * Извлекает перевод из JSON-полей Prisma.
 * Ожидаемый формат: { en: "string", ru: "string" }
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getT(field: any, locale: string = DEFAULT_LOCALE): string {
  if (!field) return '';

  if (typeof field === 'string') return field;

  if (typeof field === 'object') {
    return field[locale] || field[DEFAULT_LOCALE] || '';
  }

  return '';
}
