'use client';

import { useTranslations } from 'next-intl';
import { useUrlParams } from '@/hooks/useUrlParams';
import { Rating } from '@/components/ui';
import { RATING_OPTIONS } from '@/config/filters';
import { FilterSection } from './FilterSection';

export function RatingFilter() {
  const t = useTranslations('product');
  const { addQuery, removeQuery, searchParams } = useUrlParams();
  const rate = searchParams.get('rate') || 0;

  const handleRateChange = (option: string) => {
    if (String(rate) === option) removeQuery('rate');
    else addQuery('rate', option);
  };

  return (
    <FilterSection title={t('rating')}>
      <ul className="space-y-3">
        {RATING_OPTIONS.map(option => (
          <li key={option} className="flex items-center gap-3">
            <input
              type="checkbox"
              id={`filter-rate-${option}`}
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              checked={String(rate) === option}
              onChange={() => handleRateChange(option)}
            />
            <label
              htmlFor={`filter-rate-${option}`}
              className="flex cursor-pointer items-center gap-2"
            >
              <Rating defaultValue={Number(option)} size="small" />
            </label>
          </li>
        ))}
      </ul>
    </FilterSection>
  );
}
