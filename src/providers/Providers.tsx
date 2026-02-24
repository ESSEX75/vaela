'use client';

import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';
import { TrpcProvider } from '@/providers/TrpcProvider';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TrpcProvider>
      <SessionProvider>{children}</SessionProvider>
    </TrpcProvider>
  );
};
