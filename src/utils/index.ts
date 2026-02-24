import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatCurrency = (
  amount: number | string,
  currency: string = 'USD',
  locale: string = 'en-US',
) => {
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(value)) {
    return '$0.00';
  }

  const formatLocale = locale === 'ru' ? 'ru-RU' : 'en-US';

  return new Intl.NumberFormat(formatLocale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};
