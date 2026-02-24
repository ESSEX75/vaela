'use client';

import { useMemo } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils';
import type { ReactNode } from 'react';
import { LOCALES } from '@/config/locales';

interface IProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  exact?: boolean;
}

export const MenuLink = ({
  href,
  children,
  className,
  onClick,
  exact = false,
}: IProps) => {
  const pathname = usePathname();

  const isActive = useMemo(() => {
    if (!pathname) return false;

    const segments = pathname.split('/').filter(Boolean);
    const localeCodes = LOCALES.map(l => l.code);
    if (
      segments.length > 0 &&
      localeCodes.includes(segments[0] as (typeof localeCodes)[number])
    ) {
      segments.shift();
    }
    const cleanPathname = `/${segments.join('/')}`;

    const normalizedPath = cleanPathname.replace(/\/$/, '') || '/';
    const normalizedHref = href.replace(/\/$/, '') || '/';

    if (exact) {
      return normalizedPath === normalizedHref;
    }
    return (
      normalizedPath === normalizedHref ||
      normalizedPath.startsWith(`${normalizedHref}/`)
    );
  }, [pathname, href, exact]);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'transition-colors hover:text-gray-500',
        isActive ? 'font-bold text-black' : 'font-normal text-black',
        className,
      )}
    >
      {children}
    </Link>
  );
};
