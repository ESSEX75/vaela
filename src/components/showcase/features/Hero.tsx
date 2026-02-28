import type { TShowcaseCollection } from '@/types';
import Link from 'next/link';
import { Title } from '@/components/ui';
import { ShowcaseMedia } from '@/components/showcase/ui/ShowcaseMedia';
import { ArrowIcon } from '@/components/showcase/ui/ArrowIcon';
import { getT } from '@/utils/i18n';

type TCollection = Pick<TShowcaseCollection, 'collection' | 'title' | 'image'>;

interface IProps {
  collections: TCollection;
  locale: string;
  rootCategory: string;
}

export function Hero({ collections, locale, rootCategory }: IProps) {
  const { collection, title, image } = collections;

  return (
    <section className="mb-2 grid h-[65vh] w-full md:h-[87vh]">
      <Link
        key={collection.slug}
        href={`/${locale}/${rootCategory}/${collection.slug}`}
        className="group display relative flex h-full w-full flex-col gap-2 overflow-hidden"
      >
        <ShowcaseMedia
          src={image}
          alt={getT(collection.name, locale)}
          className="h-full w-full"
          priority
        />

        <div className="flex items-center justify-between px-6 pr-4">
          <Title>{getT(title, locale)}</Title>
          <ArrowIcon />
        </div>
      </Link>
    </section>
  );
}
