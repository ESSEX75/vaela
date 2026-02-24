'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FiSliders } from 'react-icons/fi';
import { CollectionHeader } from './ui/CollectionHeader';
import { FilterPanel } from './features/FilterPanel';
import { Grid } from './features/Grid';
import { Pagination } from '@/components/ui';
import { useUrlParams } from '@/hooks/useUrlParams';
import type { TCollection, TProducts } from '@/types';
import { getT } from '@/utils/i18n';

interface IProductListProps {
  category: TCollection;
  products: TProducts;
  totalCount: number;
  currentPage: number;
  locale: string;
  breadcrumbs: { label: string; href: string }[];
  rootCategory: string;
}

export function ProductList({
  category,
  products,
  totalCount,
  currentPage,
  locale,
  breadcrumbs,
  rootCategory,
}: IProductListProps) {
  const t = useTranslations('common');
  const { addQuery } = useUrlParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <section className="my-12 flex min-h-screen flex-col gap-10">
      <CollectionHeader
        title={getT(category.name, locale)}
        breadcrumbs={breadcrumbs}
        locale={locale}
      />

      <div className="flex flex-col gap-6">
        {/* Фильтры */}
        <div className="flex items-center justify-between px-6">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 text-xs font-bold tracking-wide text-black uppercase transition-colors hover:text-gray-600"
          >
            {t('filter')}
            <FiSliders className="h-4 w-4" />
          </button>
        </div>

        {/* Панель фильтров */}
        <FilterPanel
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />

        {/* Сетка товаров */}
        <Grid products={products} rootCategory={rootCategory} locale={locale} />

        <Pagination
          totalCount={totalCount}
          currentPage={currentPage}
          pageSize={12}
          onPageChange={page => addQuery('page', page)}
          className="pb-12"
        />
      </div>
    </section>
  );
}
