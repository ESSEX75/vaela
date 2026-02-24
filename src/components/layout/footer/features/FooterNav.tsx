'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import type { TCollections } from '@/types';
import { getT } from '@/utils/i18n';

interface IProps {
  collections: TCollections;
}

export function FooterNav({ collections }: IProps) {
  const t = useTranslations('footer');
  const locale = useLocale();

  const rootCollections = collections.filter(c => c.isRoot);

  const groups = [
    {
      label: t('shop'),
      links: rootCollections.map(collection => ({
        label: getT(collection.name, locale),
        href: `/${locale}/${collection.slug}`,
      })),
    },
    {
      label: t('company'),
      links: [
        { label: t('companyLinks.about'), href: `/${locale}/about` },
        { label: t('companyLinks.termOfUse'), href: `/${locale}/term-of-use` },
        {
          label: t('companyLinks.privacyPolicy'),
          href: `/${locale}/privacy-policy`,
        },
        { label: t('companyLinks.howItWorks'), href: `/${locale}/how-works` },
        { label: t('companyLinks.contactUs'), href: `/${locale}/contact-us` },
      ],
    },
    {
      label: t('help'),
      links: [
        { label: t('helpLinks.signup'), href: `/${locale}/signin` },
        { label: t('helpLinks.service'), href: `/${locale}/24-service` },
        { label: t('helpLinks.quickChat'), href: `/${locale}/quick-chat` },
      ],
    },
  ];

  return (
    <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
      {groups.map(({ label, links }) => (
        <div key={label} className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold tracking-wide text-black uppercase">
            {label}
          </h3>

          <ul className="flex flex-col gap-3">
            {links.map(({ label: linkLabel, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-neutral-500 transition-colors hover:text-black"
                >
                  {linkLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
