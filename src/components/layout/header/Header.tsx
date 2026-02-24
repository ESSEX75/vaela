'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Fragment, useMemo, useState, useCallback } from 'react';
import { Transition } from '@headlessui/react';
import { useLocale } from 'next-intl';
import { TopBar } from './TopBar';
import { MegaMenu } from './features/mega-menu/MegaMenu';
import { SearchDrawer } from '@/components/search/SearchDrawer';
import { MobileMenu } from './features/mobile-menu/MobileMenu';
import { Navigation } from './Navigation';
import { HeaderActions } from './HeaderActions';
import type { TCollections } from '@/types';

interface IProps {
  collections: TCollections;
}

export function Header({ collections }: IProps) {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCollectionSlug, setActiveCollectionSlug] = useState<
    string | null
  >(null);

  const locale = useLocale();

  const handleMouseEnter = useCallback((slug: string) => {
    setActiveCollectionSlug(slug);
    setIsCatalogOpen(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setIsCatalogOpen(false);
    setActiveCollectionSlug(null);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white font-sans">
        <TopBar />

        <div className="relative z-40 bg-white" onMouseLeave={handleMouseLeave}>
          <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 md:gap-12">
              {/* Логотип */}
              <Link href={`/${locale}`} className="flex-shrink-0">
                <Image
                  src="/assets/logo.svg"
                  alt="Vaela"
                  width={150}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>

              {/* Навигация по категориям */}
              <Navigation
                collections={collections}
                onMouseEnter={handleMouseEnter}
              />
            </div>

            {/* Навигация по действиям */}
            <HeaderActions
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              onSearchClick={() => setIsSearchOpen(true)}
            />
          </div>

          {/* Мега-меню */}
          <Transition
            show={isCatalogOpen}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <MegaMenu
              activeSlug={activeCollectionSlug || ''}
              collections={collections}
              onShowMenu={() => setIsCatalogOpen(true)}
              onCloseMenu={handleMouseLeave}
            />
          </Transition>
        </div>
      </header>

      {/* Глобальный поиск */}
      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Мобильное меню */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        collections={collections}
      />
    </>
  );
}
