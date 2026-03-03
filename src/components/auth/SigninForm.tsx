'use client';

import { SigninHeader } from './features/SigninHeader';
import { SigninProviders } from './features/SigninProviders';
import { SigninDisclaimer } from './features/SigninDisclaimer';
import { useSession } from 'next-auth/react';
import { AuthenticatedView } from './features/AuthenticatedView';

export function SigninForm() {
  const { data: session, status } = useSession();

  if (status === 'authenticated' && session) {
    return <AuthenticatedView session={session} />;
  }

  return (
    <div className="w-full max-w-lg bg-white p-8 shadow-md ring-2 ring-black/5">
      <SigninHeader />
      <SigninProviders />
      <SigninDisclaimer />
    </div>
  );
}
