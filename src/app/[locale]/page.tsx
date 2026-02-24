import { redirect } from 'next/navigation';
import { createRSCCaller } from '@/lib/trpc/server';
import type { IBasePageProps } from '@/types';
import { env } from '@/env';

export default async function Page({ params }: IBasePageProps) {
  const { locale } = await params;
  const trpc = await createRSCCaller();
  const collections = await trpc.collection.all();

  const sortedRootCollections = collections
    .filter(c => c.isRoot)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const targetSlug =
    sortedRootCollections[0]?.slug || env.DEFAULT_ROOT_CATEGORY;

  redirect(`/${locale}/${targetSlug}`);
}
