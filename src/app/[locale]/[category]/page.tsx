import { notFound } from 'next/navigation';
import { createRSCCaller } from '@/lib/trpc/server';
import { Showcase } from '@/components/showcase';
import type { Metadata } from 'next';
import type { IBasePageProps } from '@/types';
import { getT } from '@/utils/i18n';

type TParams = { category: string };

export async function generateMetadata({
  params,
}: IBasePageProps<TParams>): Promise<Metadata> {
  const { locale, category: slug } = await params;
  const trpc = await createRSCCaller();

  const collection = await trpc.collection.bySlug({ slug });

  if (!collection) {
    return { title: 'Not Found' };
  }

  const name = getT(collection.name, locale);

  return {
    title: name,
    description:
      getT(collection.metaDescription, locale) || `Shop ${name} collection`,
  };
}

export default async function CategoryPage({
  params,
}: IBasePageProps<TParams>) {
  const { locale, category: slug } = await params;
  const trpc = await createRSCCaller();

  const collection = await trpc.collection.bySlug({ slug });

  if (!collection) {
    notFound();
  }

  return <Showcase collectionData={collection} locale={locale} />;
}
