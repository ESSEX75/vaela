import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { BsGithub } from 'react-icons/bs';

export function FooterBottom() {
  const t = useTranslations('footer');

  return (
    <div className="border-t border-[#cccccc]">
      <div className="flex flex-col items-center justify-between gap-3 pt-2 text-xs text-neutral-500 sm:flex-row">
        {/* Копирайт */}
        <p>{t('copyright')}</p>

        {/* Автор */}
        <div className="flex gap-4">
          <p>
            {`${t('createdBy')} `}
            <Link
              href="https://github.com/ESSEX75?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-black transition-colors hover:text-neutral-600"
            >
              Kisitsyn Egor
            </Link>
            {` · ${t('reserved')}`}
          </p>

          {/* GitHub */}
          <Link
            href="https://github.com/ESSEX75/vaela"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-black"
          >
            <BsGithub size="1.1rem" />
          </Link>
        </div>
      </div>
    </div>
  );
}
