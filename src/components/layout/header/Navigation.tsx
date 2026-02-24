'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import type { TCollections } from '@/types';
import { cn } from '@/utils';
import { getT } from '@/utils/i18n';

interface IProps {
  collections: TCollections;
  onMouseEnter: (slug: string) => void;
}

export function Navigation({ collections, onMouseEnter }: IProps) {
  const params = useParams();
  const locale = useLocale();

  const sortedCollections = collections
    .filter(collection => collection.isRoot)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <nav className="hidden items-center gap-8 md:flex">
      {sortedCollections.map(({ name, slug, id }) => {
        const href = `/${locale}/${slug}`;
        const isActive = params.category === slug;

        return (
          <Link
            key={id}
            href={href}
            onMouseEnter={() => onMouseEnter(slug)}
            className={cn(
              'text-sm tracking-wide uppercase transition-colors duration-200',
              isActive
                ? 'font-bold text-black hover:text-[#737373]'
                : 'font-normal text-[#737373] hover:font-bold hover:text-black',
            )}
          >
            {getT(name, locale)}
          </Link>
        );
      })}
    </nav>
  );
}
