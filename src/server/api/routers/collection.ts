import { createTRPCRouter, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { validateCategoryHierarchy } from '../utils/collection-validation';

export const defaultCollectionSelect =
  Prisma.validator<Prisma.CollectionSelect>()({
    id: true,
    name: true,
    slug: true,
    isRoot: true,
    metaTitle: true,
    metaDescription: true,
    order: true,
    children: {
      select: {
        id: true,
        name: true,
        slug: true,
      },
    },
    showcase: {
      select: {
        showcaseCollections: {
          select: {
            title: true,
            sortOrder: true,
            collection: {
              select: {
                id: true,
                slug: true,
                name: true,
              },
            },
          },
          orderBy: { sortOrder: 'asc' },
        },
      },
    },
  });

export const collectionRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.collection.findMany({
      select: defaultCollectionSelect,
      where: { isRoot: true },
      orderBy: { order: 'asc' },
    });
  }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.collection.findUnique({
        where: { slug: input.slug },
        select: {
          ...defaultCollectionSelect,
          parent: {
            select: {
              id: true,
              slug: true,
              name: true,
            },
          },
          showcase: {
            select: {
              productsTitle: true,
              title: true,
              description: true,
              showcaseCollections: {
                select: {
                  type: true,
                  title: true,
                  sortOrder: true,
                  image: true,
                  collection: {
                    select: {
                      id: true,
                      name: true,
                      slug: true,
                      metaDescription: true,
                    },
                  },
                },
                orderBy: { sortOrder: 'asc' },
              },
              showcaseProducts: {
                select: {
                  sortOrder: true,
                  product: {
                    select: {
                      id: true,
                      name: true,
                      slug: true,
                      price: true,
                      rate: true,
                      images: {
                        select: {
                          imageURL: true,
                          imageBlur: true,
                        },
                        take: 4,
                      },
                      collection: {
                        select: {
                          slug: true,
                        },
                      },
                    },
                  },
                },
                orderBy: { sortOrder: 'asc' },
                take: 12,
              },
            },
          },
        },
      });
    }),

  getHierarchy: publicProcedure
    .input(
      z.object({
        gender: z.string(),
        category: z.string().optional(),
        subCategory: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      return await validateCategoryHierarchy(
        input.gender,
        input.category,
        input.subCategory,
      );
    }),
});
