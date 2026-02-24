import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function SigninDisclaimer() {
  const t = useTranslations('auth');

  return (
    <p className="mt-8 text-center text-xs leading-relaxed text-neutral-500">
      {t('disclaimer')}{' '}
      <Link
        href="/terms-service"
        className="font-medium text-neutral-900 underline-offset-4 hover:underline"
      >
        {t('terms')}
      </Link>{' '}
      {t('and')}{' '}
      <Link
        href="/privacy-policy"
        className="font-medium text-neutral-900 underline-offset-4 hover:underline"
      >
        {t('privacy')}
      </Link>
      .
    </p>
  );
}
