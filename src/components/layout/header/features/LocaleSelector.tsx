'use client';

import { useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { FiCheck, FiChevronDown } from 'react-icons/fi';
import { cn } from '@/utils';
import { LOCALES } from '@/config/locales';

export function LocaleSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations('header');
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === currentLocale || !pathname) return;

    const segments = pathname.split('/').filter(Boolean);

    const isFirstSegmentLocale = LOCALES.some(l => l.code === segments[0]);
    if (isFirstSegmentLocale) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    const newPath = `/${segments.join('/')}`;

    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <Menu as="div" className="relative z-50 inline-block text-left">
      <MenuButton
        disabled={isPending}
        className={cn(
          'flex cursor-pointer items-center justify-center rounded-md transition-opacity hover:opacity-80 focus:ring-2 focus:ring-gray-200 focus:outline-none',
          isPending && 'cursor-wait opacity-50',
        )}
      >
        <div className="relative mr-2 h-4 w-4 overflow-hidden rounded-full">
          <Image
            priority
            src={LOCALES.find(l => l.code === currentLocale)?.flag || ''}
            alt={currentLocale}
            fill
            className="object-cover"
          />
        </div>

        <span className="mr-1 text-sm font-medium text-gray-700 uppercase">
          {currentLocale}
        </span>

        <FiChevronDown className="h-4 w-4 text-gray-500" aria-hidden="true" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-lg bg-white p-1 shadow-lg ring-1 ring-black/5 transition duration-100 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0"
      >
        {LOCALES.map(({ code, flag }) => (
          <MenuItem key={code}>
            {({ focus }) => (
              <button
                onClick={() => handleLocaleChange(code)}
                className={cn(
                  'group flex w-full items-center justify-between rounded-md px-2 py-2 text-sm transition-colors',
                  focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  currentLocale === code && 'bg-gray-50 font-medium',
                )}
              >
                <div className="flex items-center">
                  <div className="relative mr-3 h-4 w-4 overflow-hidden rounded-full">
                    <Image
                      src={flag}
                      alt={code}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {t(`locales.${code}`)}
                </div>

                {currentLocale === code && (
                  <FiCheck className="h-4 w-4 text-green-600" />
                )}
              </button>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
