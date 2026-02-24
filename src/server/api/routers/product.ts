import { z } from 'zod';
import { Prisma, ProductColor, ProductSize } from '@prisma/client';
import { publicProcedure, createTRPCRouter } from '../trpc';
import { defaultCollectionSelect } from './collection';

const defaultProductSelect = Prisma.validator<Prisma.ProductSelect>()({
  id: true,
  slug: true,
  name: true,
  description: true,
  sizes: true,
  colors: true,
  price: true,
  rate: true,
  images: {
    select: {
      imageURL: true,
      imageBlur: true,
    },
  },
  collection: {
    select: defaultCollectionSelect,
  },
});

export const productRouter = createTRPCRouter({
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.product.findUnique({
        where: { slug: input.slug },
        select: defaultProductSelect,
      });
    }),

  getByIds: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .query(async ({ input, ctx }) => {
      const { ids } = input;
      if (!ids.length) return [];

      return await ctx.prisma.product.findMany({
        where: {
          id: {
            in: ids.map(id => parseInt(id, 10)).filter(n => !isNaN(n)),
          },
        },
        select: defaultProductSelect,
      });
    }),

  all: publicProcedure
    .input(
      z.object({
        collectionId: z.number().optional(),
        page: z.number().optional(),
        rate: z.number().optional(),
        gte: z.number().optional(),
        lte: z.number().optional(),
        sizes: z.nativeEnum(ProductSize).array().optional(),
        colors: z.nativeEnum(ProductColor).array().optional(),
        query: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const {
        collectionId,
        page = 1,
        rate = 0,
        gte = 0,
        lte = 1000000,
        sizes = [],
        colors = [],
        query = '',
      } = input;

      const take = 12;
      const skip = take * (page - 1);

      const where: Prisma.ProductWhereInput = {
        published: true,
        rate: rate ? { gte: rate } : undefined,
        price: { gte, lte },
        sizes: sizes.length > 0 ? { hasSome: sizes } : undefined,
        colors: colors.length > 0 ? { hasSome: colors } : undefined,
        OR: query
          ? [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ]
          : undefined,
      };

      if (collectionId) {
        const collection = await ctx.prisma.collection.findUnique({
          where: { id: collectionId },
          select: {
            id: true,
            _count: { select: { children: true } },
          },
        });

        if (collection) {
          if (collection._count.children > 0) {
            where.collection = { parentId: collection.id };
          } else {
            where.collectionId = collection.id;
          }
        }
      }

      const [products, totalCount] = await ctx.prisma.$transaction([
        ctx.prisma.product.findMany({
          select: defaultProductSelect,
          where,
          orderBy: { id: 'asc' },
          take,
          skip,
        }),
        ctx.prisma.product.count({ where }),
      ]);

      return {
        products,
        totalCount,
      };
    }),
});
