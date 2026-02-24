import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('system');

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="text-xl text-gray-600 uppercase">{t('notFound.title')}</p>
      <p className="max-w-md text-gray-500">{t('notFound.description')}</p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-black px-6 py-2 text-white transition hover:bg-gray-800"
      >
        {t('notFound.goHome')}
      </Link>
    </div>
  );
}
