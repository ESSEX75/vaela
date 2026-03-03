'use client';

import { useLocale } from 'next-intl';
import { FiSearch, FiUser, FiHeart, FiMenu, FiUserCheck } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FavoritesCount } from './features/FavoritesCount';
import { CartTrigger } from '@/components/cart/CartTrigger';
import { Button } from '@/components/ui';

interface IProps {
  onSearchClick: () => void;
  setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void;
}

export function HeaderActions({ onSearchClick, setIsMobileMenuOpen }: IProps) {
  const locale = useLocale();
  const { data: session, status } = useSession();

  return (
    <div className="flex items-center gap-6 text-black">
      {/* Поиск */}
      <Button
        variant="icon-ghost"
        onClick={onSearchClick}
        className="cursor-pointer transition-transform hover:scale-105"
        aria-label="Search"
      >
        <FiSearch className="h-5 w-5 transform transition-transform duration-300 hover:scale-110" />
      </Button>

      {/* Пользователь */}
      <Button
        variant="icon-ghost"
        href={`/${locale}/signin`}
        className="overflow-hidden rounded-full transition-transform hover:scale-105"
        aria-label="Sign in"
      >
        {status === 'authenticated' ? (
          session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || 'User avatar'}
              width={24}
              height={24}
              className="h-6 w-6 rounded-full object-cover"
            />
          ) : (
            <FiUserCheck className="h-5 w-5 transform transition-transform duration-300 hover:scale-110" />
          )
        ) : (
          <FiUser className="h-5 w-5 transform transition-transform duration-300 hover:scale-110" />
        )}
      </Button>

      {/* Избранное */}
      <Button
        variant="icon-ghost"
        href={`/${locale}/wishlist`}
        className="relative transition-transform hover:scale-105"
        aria-label="Favorites"
      >
        <FiHeart className="h-5 w-5 transform transition-transform duration-300 hover:scale-110" />
        <FavoritesCount />
      </Button>

      {/* Корзина */}
      <CartTrigger />

      {/* Бургер меню */}
      <Button
        type="button"
        variant="icon-ghost"
        className="p-2 text-black md:hidden"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <span className="sr-only">Open menu</span>
        <FiMenu className="h-6 w-6" />
      </Button>
    </div>
  );
}
