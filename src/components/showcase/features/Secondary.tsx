import Link from 'next/link';
import type { TShowcaseCollection } from '@/types';
import { Title } from '@/components/ui';
import { ShowcaseMedia } from '@/components/showcase/ui/ShowcaseMedia';
import { getT } from '@/utils/i18n';

interface IProps {
  collections: TShowcaseCollection[];
  locale: string;
  rootCategory: string;
}

export function Secondary({ collections, locale, rootCategory }: IProps) {
  if (collections.length === 0) return null;

  return (
    <section className="mx-auto mt-8 grid w-full max-w-[920px] grid-cols-1 gap-y-8 sm:grid-cols-2 md:mt-16">
      {collections.map(({ collection, image }) => {
        const { slug } = collection;
        const name = getT(collection.name, locale);
        const metaDescription = getT(collection.metaDescription, locale);

        return (
          <Link
            key={slug}
            href={`/${locale}/${rootCategory}/${slug}`}
            className="group flex flex-col gap-2"
          >
            <ShowcaseMedia
              src={image}
              alt={name}
              className="aspect-4/5 w-full bg-gray-100"
              sizes="(max-width: 920px) 50vw, 400px"
            />

            <div className="flex flex-col items-start justify-between gap-1 px-6 md:px-0">
              <Title className="hover:underline">{name}</Title>
              {metaDescription && (
                <p className="line-clamp-2 text-sm text-gray-500">
                  {metaDescription}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </section>
  );
}
