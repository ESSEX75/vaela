'use client';

import { cn } from '@/utils';
import { useTranslations } from 'next-intl';
import { useUrlParams } from '@/hooks/useUrlParams';
import { PRICE_RANGES } from '@/config/filters';
import { FilterSection } from './FilterSection';

export function PriceFilter() {
  const tProduct = useTranslations('product');
  const tCommon = useTranslations('common');
  const { addQuery, removeQuery, searchParams } = useUrlParams();
  const price = searchParams.get('price') || '';

  const handlePriceChange = (option: string) => {
    if (price === option) removeQuery('price');
    else addQuery('price', option);
  };

  return (
    <FilterSection title={tProduct('price')}>
      <div className="flex flex-wrap gap-2">
        {PRICE_RANGES.map(range => (
          <button
            key={range.value}
            onClick={() => handlePriceChange(range.value)}
            className={cn(
              'flex h-10 min-w-[60px] items-center justify-center rounded-full border px-4 text-sm transition-colors',
              price === range.value
                ? 'border-black bg-black text-white'
                : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300',
            )}
          >
            {tCommon('currencySymbol').repeat(range.labelMultiplier)}
          </button>
        ))}
      </div>
    </FilterSection>
  );
}
