'use client';

import { useFavoritesStore } from '@/store/useFavoritesStore';
import { trpc } from '@/lib/trpc/client';
import { ProductCard, ProductCardSkeleton } from '@/components/product';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Title, Button } from '@/components/ui';

export default function WishlistPage() {
  const { items } = useFavoritesStore();
  const t = useTranslations('wishlist');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: products, isLoading } = trpc.product.getByIds.useQuery(
    { ids: items },
    {
      enabled: isClient && items.length > 0,
    },
  );

  if (!isClient) {
    return (
      <div className="my-12 flex min-h-screen flex-col gap-8">
        <Title as="h1" size="hero" className="px-6">
          {t('wishlist')}
        </Title>

        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {[...Array(4)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center p-4 text-center">
        <Title as="h1" size="hero">
          {t('wishlist')}
        </Title>

        <p className="mt-2 text-gray-500">{t('wishlistEmpty')}</p>

        <Button variant="primary" href="/" className="mt-6">
          {t('continueShopping')}
        </Button>
      </div>
    );
  }

  return (
    <div className="my-12 flex min-h-screen flex-col gap-8">
      <Title as="h1" size="hero" className="px-6">
        {t('wishlist')}
      </Title>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {[...Array(4)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products?.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              rootCategory={product.collection.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
