import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { AUTH_PROVIDERS } from '@/config/auth';
import { Button } from '@/components/ui';

export function SigninProviders() {
  const t = useTranslations('auth');

  return (
    <div className="flex flex-col gap-3">
      {AUTH_PROVIDERS.map(provider => (
        <Button
          key={provider.id}
          type="button"
          variant="provider"
          className={provider.className}
          onClick={() => signIn(provider.id)}
        >
          <provider.icon className="h-5 w-5" />
          {t(provider.nameKey)}
        </Button>
      ))}
    </div>
  );
}
