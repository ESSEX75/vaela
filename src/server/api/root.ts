import { createTRPCRouter } from './trpc';
import { collectionRouter } from './routers/collection';
import { productRouter } from './routers/product';

export const appRouter = createTRPCRouter({
  collection: collectionRouter,
  product: productRouter,
});

export type AppRouter = typeof appRouter;
