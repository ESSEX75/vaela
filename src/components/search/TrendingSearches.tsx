'use client';

import { useTranslations } from 'next-intl';

interface IProps {
  setQuery: (query: string) => void;
}

import { TRENDING_SEARCHES } from '@/config/search';

export function TrendingSearches({ setQuery }: IProps) {
  const t = useTranslations('header');

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase">
        {t('trendingNow')}
      </h3>

      <div className="flex flex-wrap gap-2">
        {TRENDING_SEARCHES.map(term => (
          <button
            key={term}
            onClick={() => setQuery(term)}
            className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
