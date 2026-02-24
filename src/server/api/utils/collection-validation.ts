import { prisma } from '@/server/prisma';

export async function validateRootCategory(slug: string) {
  return await prisma.collection.findFirst({
    where: {
      slug,
      isRoot: true,
      parent: null,
    },
    select: {
      id: true,
      slug: true,
      name: true,
      metaTitle: true,
      metaDescription: true,
    },
  });
}

export async function validateCategoryHierarchy(
  categorySlug: string,
  subcategorySlug?: string,
  itemSlug?: string,
) {
  const category = await validateRootCategory(categorySlug);
  if (!category) return null;

  if (!subcategorySlug) {
    return { category, subcategory: null, item: null };
  }

  const subcategory = await prisma.collection.findFirst({
    where: {
      slug: subcategorySlug,
      parentId: category.id,
    },
    select: {
      id: true,
      slug: true,
      name: true,
      metaTitle: true,
      metaDescription: true,
    },
  });

  if (!subcategory) return null;

  if (!itemSlug) {
    return { category, subcategory, item: null };
  }

  const item = await prisma.collection.findFirst({
    where: {
      slug: itemSlug,
      parentId: subcategory.id,
    },
    select: {
      id: true,
      slug: true,
      name: true,
      metaTitle: true,
      metaDescription: true,
    },
  });

  if (!item) return null;

  return { category, subcategory, item };
}
