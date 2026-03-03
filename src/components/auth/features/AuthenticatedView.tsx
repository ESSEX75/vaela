'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import type { Session } from 'next-auth';
import { Button } from '@/components/ui';

interface IProps {
  session: Session;
}

export function AuthenticatedView({ session }: IProps) {
  const t = useTranslations('auth');

  return (
    <div className="w-full max-w-lg bg-white p-8 text-center shadow-md ring-2 ring-black/5">
      <h2 className="mb-4 text-2xl font-semibold text-black">
        {t('welcome_back', {
          name: session.user?.name || session.user?.email || 'User',
        })}
      </h2>

      {session.user?.image && (
        <Image
          src={session.user.image}
          alt="Avatar"
          width={96}
          height={96}
          className="mx-auto mb-6 h-24 w-24 rounded-full object-cover ring-2 ring-gray-100"
        />
      )}

      <Button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="mt-4 w-full"
        variant="primary"
      >
        {t('logout')}
      </Button>
    </div>
  );
}
