'use client';

import { formatCurrency } from '@/utils';
import { cn } from '@/utils';
import { useLocale } from 'next-intl';
import { LOCALES } from '@/config/locales';
import { RATE_USD_TO_RUB, CURRENCY_CODES } from '@/config/currency';

interface IProps {
  amount: number;
  className?: string;
}

export function Price({ amount, className }: IProps) {
  const locale = useLocale();

  const currentLocale = LOCALES.find(l => l.code === locale) || LOCALES[0];
  const isRu = currentLocale.code === 'ru';

  const finalAmount = isRu ? amount * RATE_USD_TO_RUB : amount;
  const currencyCode = isRu ? CURRENCY_CODES.ru : CURRENCY_CODES.en;

  return (
    <span className={cn('font-medium', className)}>
      {formatCurrency(finalAmount, currencyCode, locale)}
    </span>
  );
}
