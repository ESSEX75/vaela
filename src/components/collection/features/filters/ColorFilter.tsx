'use client';

import { cn } from '@/utils';
import { useTranslations } from 'next-intl';
import { useUrlParams } from '@/hooks/useUrlParams';
import { FilterSection } from './FilterSection';

import { ProductColor } from '@prisma/client';
import { COLOR_MAP } from '@/config/filters';

const colorOptions = Object.values(ProductColor).map(color => ({
  label: color,
  value: COLOR_MAP[color],
}));

export function ColorFilter() {
  const t = useTranslations('product');
  const { addQuery, removeQuery, searchParams } = useUrlParams();
  const colors = searchParams.getAll('colors');

  const handleColorChange = (option: string) => {
    let newColors = [...colors];
    if (!newColors.includes(option)) newColors.push(option);
    else newColors = newColors.filter(c => c !== option);

    if (newColors.length === 0) removeQuery('colors');
    else addQuery('colors', newColors);
  };

  return (
    <FilterSection title={t('color')}>
      <ul className="grid grid-cols-2 gap-3">
        {colorOptions.map(({ label, value }) => (
          <li key={label} className="flex items-center gap-3">
            <input
              type="checkbox"
              id={`filter-color-${label}`}
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              checked={colors.includes(label)}
              onChange={() => handleColorChange(label)}
            />
            <label
              htmlFor={`filter-color-${label}`}
              className="flex cursor-pointer items-center gap-2"
            >
              <span
                className={cn(
                  'h-6 w-6 rounded-full border border-gray-100 shadow-sm',
                  value,
                )}
              />
              <span className="text-sm text-gray-700 capitalize">
                {t(`colors.${label}` as any)}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </FilterSection>
  );
}
