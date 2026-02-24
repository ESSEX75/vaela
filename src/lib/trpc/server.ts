import { appRouter } from '@/server/api/root';
import { createInnerTRPCContext } from '@/server/api/trpc';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/server/auth';
import { cache } from 'react';

export const createRSCCaller = cache(async () => {
  const session = await getServerSession(authOptions);

  const ctx = createInnerTRPCContext({
    session,
  });

  return appRouter.createCaller(ctx);
});
