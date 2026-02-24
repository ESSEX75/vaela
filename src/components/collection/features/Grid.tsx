import { ProductCard } from '@/components/product';
import { ProductCardSkeleton } from '@/components/product';
import type { TProducts } from '@/types';

interface IProps {
  products: TProducts;
  isLoading?: boolean;
  rootCategory: string;
  locale: string;
}

export function Grid({
  products,
  isLoading = false,
  rootCategory,
  locale,
}: IProps) {
  return (
    <section className="mb-12 grid grid-cols-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {isLoading
        ? Array.from({ length: 12 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        : products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              rootCategory={rootCategory}
              locale={locale}
            />
          ))}
    </section>
  );
}
