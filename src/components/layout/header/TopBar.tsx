'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { LocaleSelector } from './features/LocaleSelector';

export function TopBar() {
  const { status } = useSession();
  const t = useTranslations('header');
  const locale = useLocale();

  return (
    <div className="mx-auto flex flex-col border-b border-[#cccccc] bg-[#ffffff] p-4 pl-6 text-sm text-black md:flex-row">
      <Link
        href={`/${locale}${status === 'authenticated' ? '/profile' : '/signin'}`}
        className="text-[#eb0010] uppercase underline"
      >
        {t('topbar.discount')}
      </Link>

      <div className="hidden flex-wrap justify-center md:ml-auto md:flex">
        <div className="relative z-50 ml-2.5 flex cursor-pointer items-center">
          <LocaleSelector />
        </div>
      </div>
    </div>
  );
}
