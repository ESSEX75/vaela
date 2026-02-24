'use client';

import { forwardRef, useMemo } from 'react';
import type { TCollections } from '@/types';
import { useTranslations, useLocale } from 'next-intl';
import { MenuLink } from './MenuLink';
import { getT } from '@/utils/i18n';

interface Props {
  activeSlug: string;
  collections: TCollections;
  onShowMenu: () => void;
  onCloseMenu: () => void;
}

export const MegaMenu = forwardRef<HTMLDivElement, Props>(
  ({ activeSlug, collections, onShowMenu, onCloseMenu }, ref) => {
    const t = useTranslations('common');
    const locale = useLocale();

    const { rootCollection, children } = useMemo(() => {
      const root = collections?.find(c => c.slug === activeSlug);
      return {
        rootCollection: root,
        children: root?.children ?? [],
      };
    }, [activeSlug, collections]);

    if (!rootCollection) return null;

    return (
      <div
        ref={ref}
        onMouseEnter={onShowMenu}
        onMouseLeave={onCloseMenu}
        className="absolute top-full left-0 z-40 w-full border-t border-gray-100 bg-white shadow-lg"
      >
        <div className="mx-6 my-8 flex flex-col gap-6">
          <ul className="flex flex-col space-y-3">
            <li className="pt-2">
              <MenuLink
                href={`/${locale}/${rootCollection.slug}/view-all`}
                onClick={onCloseMenu}
                className="inline-flex items-center text-sm tracking-wider uppercase"
                exact={true}
              >
                {t('viewAll')}
              </MenuLink>
            </li>

            {children.map(child => {
              const href = `/${locale}/${rootCollection.slug}/${child.slug}`;
              return (
                <li key={child.id}>
                  <MenuLink
                    href={href}
                    onClick={onCloseMenu}
                    className="inline-flex items-center text-base"
                    exact={true}
                  >
                    {getT(child.name, locale)}
                  </MenuLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  },
);

MegaMenu.displayName = 'MegaMenu';
