import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { BsTelegram } from 'react-icons/bs';
import { FaVk } from 'react-icons/fa';
import type { IconType } from 'react-icons/lib';

const SOCIAL_LINKS: [IconType, string, string][] = [
  [FaVk, 'https://m.vk.com/id152897536', 'ВКонтакте'],
  [BsTelegram, 'https://t.me/KislitsynEgor', 'Telegram'],
];

export function FooterBrand() {
  const t = useTranslations('footer');

  return (
    <div className="flex flex-col gap-6 md:max-w-xs">
      {/* Логотип */}
      <Link href="/" aria-label="VAELA Shop – Home">
        <Image
          src="/assets/logo.svg"
          alt="VAELA Shop"
          width={150}
          height={40}
          priority
          className="h-8 w-auto object-contain"
        />
      </Link>

      {/* Описание */}
      <p className="text-sm leading-relaxed text-neutral-500">{t('hm')}</p>

      {/* Соцсети */}
      <div className="flex items-center gap-2">
        {SOCIAL_LINKS.map(([Icon, href, label]) => (
          <Link
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-600 transition-colors hover:bg-black hover:text-white"
          >
            <Icon size="1rem" />
          </Link>
        ))}
      </div>
    </div>
  );
}
