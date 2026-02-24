'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Drawer } from '@/components/ui/Drawer';
import { LocaleSelector } from '../LocaleSelector';
import type { TCollections } from '@/types';
import { FiChevronRight, FiUser } from 'react-icons/fi';
import { getT } from '@/utils/i18n';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  collections: TCollections;
}

export function MobileMenu({ isOpen, onClose, collections }: IProps) {
  const t = useTranslations('header');
  const locale = useLocale();

  return (
    <nav>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        position="right"
        className="uppercase"
        title={t('menu')}
      >
        <div className="flex h-full flex-col gap-8">
          <div className="flex-1 overflow-y-auto">
            <ul className="space-y-4">
              {collections
                .filter(c => c.isRoot)
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map(collection => (
                  <li key={collection.id}>
                    <Link
                      href={`/${locale}/${collection.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between text-lg font-medium text-gray-900 uppercase"
                    >
                      {getT(collection.name, locale)}
                      <FiChevronRight className="text-gray-400" />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href={`/${locale}/signin`}
              onClick={onClose}
              className="flex items-center gap-2 text-base font-medium text-gray-900"
            >
              <FiUser className="h-5 w-5" />
              {t('account') || 'Account'}
            </Link>

            <LocaleSelector />
          </div>
        </div>
      </Drawer>
    </nav>
  );
}
