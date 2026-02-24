import { notFound } from 'next/navigation';
import { createRSCCaller } from '@/lib/trpc/server';
import { getTranslations } from 'next-intl/server';
import { ProductList } from '@/components/collection';
import { ProductDetails } from '@/components/product';
import { ProductSize, ProductColor } from '@prisma/client';
import { PRICE_RANGES } from '@/config/filters';
import type { Metadata } from 'next';
import type { IBasePageProps } from '@/types';
import { getT } from '@/utils/i18n';

type TParams = { category: string; slug: string[] };

export async function generateMetadata({
  params,
}: IBasePageProps<TParams>): Promise<Metadata> {
  const { locale, category: rootCategory, slug } = await params;
  const lastSlug = slug[slug.length - 1];
  const trpc = await createRSCCaller();

  let collectionSlug = lastSlug;
  if (lastSlug === 'view-all') {
    collectionSlug = rootCategory;
  }

  const collection = await trpc.collection.bySlug({ slug: collectionSlug });
  if (collection) {
    const collName = getT(collection.name, locale);
    return {
      title: collName,
      description:
        getT(collection.metaDescription, locale) ||
        `Shop ${collName} collection`,
    };
  }

  const product = await trpc.product.bySlug({ slug: lastSlug });
  if (product) {
    return {
      title: getT(product.name, locale),
      description: getT(product.description, locale).slice(0, 160),
    };
  }

  return { title: 'Not Found' };
}

export default async function DispatcherPage({
  params,
  searchParams,
}: IBasePageProps<TParams>) {
  const { locale, category: rootCategory, slug } = await params;
  const lastSlug = slug[slug.length - 1];
  const trpc = await createRSCCaller();

  let collectionSlug = lastSlug;
  let isViewAll = false;

  if (lastSlug === 'view-all') {
    collectionSlug = rootCategory;
    isViewAll = true;
  }

  const collection = await trpc.collection.bySlug({ slug: collectionSlug });

  if (collection) {
    const { page = '1', rate, price, sizes, colors } = await searchParams;

    const priceRange = PRICE_RANGES.find(r => r.value === price);

    const productData = await trpc.product.all({
      collectionId: collection.id,
      sizes: [sizes].flat().filter(Boolean) as ProductSize[],
      colors: [colors].flat().filter(Boolean) as ProductColor[],
      page: Number(page),
      rate: rate ? Number(rate) : undefined,
      gte: priceRange?.min,
      lte: priceRange?.max,
    });

    const t = await getTranslations('common');

    const breadcrumbs = [
      { label: rootCategory.toUpperCase(), href: `/${locale}/${rootCategory}` },
    ];

    if (collection.parent && collection.parent.slug !== rootCategory) {
      breadcrumbs.push({
        label: getT(collection.parent.name, locale),
        href: `/${locale}/${rootCategory}/${collection.parent.slug}`,
      });
    }

    breadcrumbs.push({
      label: isViewAll ? t('viewAll') : getT(collection.name, locale),
      href: `/${locale}/${rootCategory}/${slug.join('/')}`,
    });

    return (
      <ProductList
        category={collection}
        products={productData.products}
        totalCount={productData.totalCount}
        currentPage={Number(page)}
        locale={locale}
        breadcrumbs={breadcrumbs}
        rootCategory={rootCategory}
      />
    );
  }

  const product = await trpc.product.bySlug({ slug: lastSlug });

  if (product) {
    return <ProductDetails product={product} locale={locale} />;
  }

  notFound();
}
