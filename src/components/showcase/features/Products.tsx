import Link from 'next/link';
import { Title } from '@/components/ui';
import { ShowcaseMedia } from '@/components/showcase/ui/ShowcaseMedia';
import type { TProduct } from '@/types';
import { getT } from '@/utils/i18n';

type TUIProduct = Pick<TProduct, 'id' | 'name' | 'slug' | 'price' | 'images'>[];

interface IProps {
  products: TUIProduct;
  locale: string;
  title?: string | null;
  rootCategory: string;
}

export function Products({ products, locale, title, rootCategory }: IProps) {
  if (!products || products.length === 0) return null;
  return (
    <section className="mt-16 w-full">
      <Title as="h2" className="px-6 pb-2">
        {title}
      </Title>

      <div className="grid grid-cols-2 gap-y-6 md:grid-cols-4 lg:grid-cols-6 lg:gap-y-4">
        {products.map(({ id, name, slug, price, images }) => {
          const translatedName = getT(name, locale);
          return (
            <Link
              key={id}
              href={`/${locale}/${rootCategory}/${slug}`}
              className="group flex flex-col gap-y-2"
            >
              <ShowcaseMedia
                src={images?.[3]?.imageURL}
                alt={translatedName}
                className="aspect-3/4 w-full bg-gray-100"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="flex flex-col gap-1 px-6">
                <Title>{translatedName}</Title>
                <p className="text-sm text-gray-500 uppercase">
                  ${price.toFixed(2)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
