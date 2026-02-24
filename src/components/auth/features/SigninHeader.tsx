import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export function SigninHeader() {
  const t = useTranslations('auth');

  return (
    <div className="mb-8 flex flex-col items-center gap-6">
      <Link href="/" aria-label="Home">
        <Image
          src="/assets/logo.svg"
          alt="VAELA Shop"
          width={150}
          height={40}
          priority
          className="h-8 w-auto object-contain"
        />
      </Link>

      <h3 className="text-xl font-bold tracking-tight text-neutral-900 uppercase sm:text-2xl">
        {t('title')}
      </h3>
    </div>
  );
}
