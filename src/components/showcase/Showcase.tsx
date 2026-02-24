import { Hero } from './features/Hero';
import { Products } from './features/Products';
import { Primary } from './features/Primary';
import { Secondary } from './features/Secondary';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Title } from '@/components/ui/Title';
import type { TCollection } from '@/types';
import { getT } from '@/utils/i18n';

interface IShowcaseProps {
  collectionData: TCollection;
  locale: string;
}

export function Showcase({ collectionData, locale }: IShowcaseProps) {
  const showcase = collectionData.showcase;

  const heroCollection = showcase?.showcaseCollections.find(
    c => c.type === 'HERO',
  );

  const primaryCollections =
    showcase?.showcaseCollections.filter(c => c.type === 'PRIMARY') ?? [];

  const secondaryCollections =
    showcase?.showcaseCollections.filter(c => c.type === 'SECONDARY') ?? [];

  const showcaseProducts =
    showcase?.showcaseProducts.map(sp => ({
      ...sp.product,
      collection: { slug: sp.product.collection.slug },
    })) || [];

  return (
    <div className="min-h-screen">
      {/* Секция Hero */}
      {heroCollection && (
        <Hero
          collections={heroCollection}
          locale={locale}
          rootCategory={collectionData.slug}
        />
      )}

      {/* Основные коллекции */}
      {primaryCollections.length > 0 && (
        <Primary
          collections={primaryCollections}
          locale={locale}
          rootCategory={collectionData.slug}
        />
      )}

      {/* Витрина продуктов */}
      {showcaseProducts.length > 0 && (
        <Products
          products={showcaseProducts}
          locale={locale}
          title={getT(showcase?.productsTitle, locale)}
          rootCategory={collectionData.slug}
        />
      )}

      {/* Вторичные коллекции */}
      {secondaryCollections.length > 0 && (
        <Secondary
          collections={secondaryCollections}
          locale={locale}
          rootCategory={collectionData.slug}
        />
      )}

      {/* Описание */}
      {showcase?.description && (
        <div className="mt-8 flex flex-col gap-y-2 px-6">
          <Title as="h2">{getT(showcase.title, locale)}</Title>
          <p className="text-xs">{getT(showcase.description, locale)}</p>
        </div>
      )}

      {/* Хлебные крошки*/}
      <div className="mt-28 mb-8 px-6">
        <Breadcrumbs
          className="text-gray-500"
          locale={locale}
          items={[
            ...(collectionData.parent
              ? [
                  {
                    label: getT(collectionData.parent.name, locale),
                    href: `/${locale}/${collectionData.parent.slug}`,
                  },
                ]
              : []),
            {
              label: getT(collectionData.name, locale),
              href: `/${locale}/${collectionData.slug}`,
            },
          ]}
        />
      </div>
    </div>
  );
}
