'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import type { IBaseErrorProps } from '@/types';
import { Button } from '@/components/ui';

export default function Error({ error, reset }: IBaseErrorProps) {
  const t = useTranslations('system');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-bold">{t('error.title')}</h2>
      <p className="text-gray-600">{t('error.description')}</p>
      <Button variant="primary" size="sm" onClick={reset}>
        {t('error.tryAgain')}
      </Button>
    </div>
  );
}
