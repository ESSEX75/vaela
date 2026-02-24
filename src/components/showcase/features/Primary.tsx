import Link from 'next/link';
import type { TShowcaseCollection } from '@/types';
import { Title } from '@/components/ui';
import { ShowcaseMedia } from '@/components/showcase/ui/ShowcaseMedia';
import { ArrowIcon } from '@/components/showcase/ui/ArrowIcon';
import { getT } from '@/utils/i18n';

type TCollection = Pick<TShowcaseCollection, 'collection' | 'title' | 'image'>;

interface IProps {
  collections: TCollection[];
  locale: string;
  rootCategory: string;
}

export function Primary({ collections, locale, rootCategory }: IProps) {
  if (collections.length === 0) return null;

  return (
    <section className="grid h-screen w-full grid-cols-1 gap-y-2 md:h-screen md:grid-cols-2">
      {collections.map(({ collection, title, image }) => {
        return (
          <Link
            key={collection.slug}
            href={`/${locale}/${rootCategory}/${collection.slug}`}
            className="group relative flex h-full w-full flex-col gap-2 overflow-hidden"
          >
            <ShowcaseMedia
              src={image}
              alt={getT(collection.name, locale)}
              className="h-full w-full"
              sizes="100vw"
            />

            <div className="flex items-center justify-between px-6 pr-4">
              <Title>{getT(title, locale)}</Title>
              <ArrowIcon />
            </div>
          </Link>
        );
      })}
    </section>
  );
}
