'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Price } from '@/components/ui/Price';
import { Skeleton } from '@/components/ui/Skeleton';
import type { TProducts } from '@/types';
import { getT } from '@/utils/i18n';

interface IProps {
  isLoading: boolean;
  products: TProducts;
  hasResults: boolean;
  debouncedQuery: string;
  onClose: () => void;
}

export function SearchResults({
  isLoading,
  products,
  hasResults,
  debouncedQuery,
  onClose,
}: IProps) {
  const locale = useLocale();
  const tProduct = useTranslations('product');
  const tCommon = useTranslations('common');

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-20 w-16 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (hasResults) {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase">
          {tProduct('productsCount', { count: products.length })}
        </h3>

        <div className="flex flex-col gap-6">
          {products.map(product => (
            <Link
              key={product.id}
              href={`/${locale}/${product.collection?.slug || 'products'}/${product.slug}`}
              onClick={onClose}
              className="group flex gap-4 transition-opacity hover:opacity-75"
            >
              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={product.images[0]?.imageURL}
                  alt={getT(product.name, locale)}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-base font-medium text-gray-900">
                  {getT(product.name, locale)}
                </h4>

                <Price
                  amount={product.price}
                  className="mt-1 text-sm font-normal text-gray-500"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 text-center">
      <p className="text-gray-500">
        {tCommon('noResults', { query: debouncedQuery })}
      </p>
    </div>
  );
}
