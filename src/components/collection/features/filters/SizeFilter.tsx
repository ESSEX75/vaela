'use client';

import { cn } from '@/utils';
import { useTranslations } from 'next-intl';
import { useUrlParams } from '@/hooks/useUrlParams';
import { FilterSection } from './FilterSection';

import { ProductSize } from '@prisma/client';

const sizeOptions = Object.keys(ProductSize);

export function SizeFilter() {
  const t = useTranslations('product');
  const { addQuery, removeQuery, searchParams } = useUrlParams();
  const sizes = searchParams.getAll('sizes');

  const handleSizeChange = (option: string) => {
    let newSizes = [...sizes];
    if (!newSizes.includes(option)) newSizes.push(option);
    else newSizes = newSizes.filter(s => s !== option);

    if (newSizes.length === 0) removeQuery('sizes');
    else addQuery('sizes', newSizes);
  };

  return (
    <FilterSection title={t('size')}>
      <div className="flex flex-wrap gap-2">
        {sizeOptions.map(option => (
          <button
            key={option}
            onClick={() => handleSizeChange(option)}
            className={cn(
              'flex h-10 min-w-[40px] items-center justify-center rounded border px-3 text-sm transition-colors',
              sizes.includes(option)
                ? 'border-black bg-black text-white'
                : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300',
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </FilterSection>
  );
}
