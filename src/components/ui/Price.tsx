'use client';

import { formatCurrency } from '@/utils';
import { cn } from '@/utils';
import { useLocale } from 'next-intl';

interface IProps {
  amount: number;
  className?: string;
}

export function Price({ amount, className }: IProps) {
  const locale = useLocale();
  return (
    <span className={cn('font-medium', className)}>
      {formatCurrency(amount, 'USD', locale)}
    </span>
  );
}
