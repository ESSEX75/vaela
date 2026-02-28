'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { trpc } from '@/lib/trpc/client';
import { Drawer } from '@/components/ui/Drawer';
import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';
import { TrendingSearches } from './TrendingSearches';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDrawer({ isOpen, onClose }: IProps) {
  const t = useTranslations('header');
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery('');
      setDebouncedQuery('');
    }
  }, [isOpen]);

  const { data, isLoading } = trpc.product.all.useQuery(
    { query: debouncedQuery },
    { enabled: !!debouncedQuery.trim() },
  );

  const products = data?.products || [];
  const hasResults = products.length > 0;
  const showResults = !!debouncedQuery.trim();

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      position="right"
      title={t('search')}
      overlayClassName="bg-white/30"
    >
      <div className="flex flex-col gap-6">
        <SearchInput query={query} setQuery={setQuery} />

        {/* Контент */}
        <div className="flex-1 overflow-y-auto">
          {showResults ? (
            <SearchResults
              isLoading={isLoading}
              products={products}
              hasResults={hasResults}
              debouncedQuery={debouncedQuery}
              onClose={onClose}
            />
          ) : (
            <TrendingSearches setQuery={setQuery} />
          )}
        </div>
      </div>
    </Drawer>
  );
}
