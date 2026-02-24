'use client';

import { SigninHeader } from './features/SigninHeader';
import { SigninProviders } from './features/SigninProviders';
import { SigninDisclaimer } from './features/SigninDisclaimer';

export function SigninForm() {
  return (
    <div className="w-full max-w-lg bg-white p-8 shadow-md ring-2 ring-black/5">
      <SigninHeader />
      <SigninProviders />
      <SigninDisclaimer />
    </div>
  );
}
