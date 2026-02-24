import { Prisma } from '@prisma/client';

export const collections: Prisma.CollectionCreateManyInput[] = [
  // Корневые коллекции (Root Categories)
  {
    id: 1,
    name: { en: 'Women', ru: 'Девушки' },
    slug: 'women',
    isRoot: true,
    parentId: null,
    metaTitle: {
      en: "Women's Collection - Shop All Women's Products",
      ru: 'Женская коллекция — купить женские товары',
    },
    metaDescription: {
      en: "Discover our full range of women's fashion, footwear, and accessories.",
      ru: 'Откройте для себя полный ассортимент женской моды, обуви и аксессуаров.',
    },
    order: 1,
  },
  {
    id: 2,
    name: { en: 'Men', ru: 'Мужчины' },
    slug: 'men',
    isRoot: true,
    parentId: null,
    metaTitle: {
      en: "Men's Collection - Shop All Men's Products",
      ru: 'Мужская коллекция — купить мужские товары',
    },
    metaDescription: {
      en: "Explore our complete collection of men's clothing, shoes, and accessories.",
      ru: 'Изучите нашу полную коллекцию мужской одежды, обуви и аксессуаров.',
    },
    order: 2,
  },
  {
    id: 3,
    name: { en: 'Kids', ru: 'Дети' },
    slug: 'kids',
    isRoot: true,
    parentId: null,
    metaTitle: {
      en: 'Kids Collection - Shop All Kids Products',
      ru: 'Детская коллекция — купить детские товары',
    },
    metaDescription: {
      en: 'Browse our complete selection of kids clothing, shoes, and accessories.',
      ru: 'Посмотрите наш полный выбор детской одежды, обуви и аксессуаров.',
    },
    order: 3,
  },
  {
    id: 4,
    name: { en: 'Home', ru: 'Дом' },
    slug: 'home',
    isRoot: true,
    parentId: null,
    metaTitle: {
      en: 'Home Collection - Shop All Home Products',
      ru: 'Коллекция для дома — купить товары для дома',
    },
    metaDescription: {
      en: 'Find everything for your home including decor, accessories, and more.',
      ru: 'Найдите все для вашего дома, включая декор, аксессуары и многое другое.',
    },
    order: 4,
  },
  {
    id: 5,
    name: { en: 'Beauty', ru: 'Красота' },
    slug: 'beauty',
    isRoot: true,
    parentId: null,
    metaTitle: {
      en: 'Beauty Collection - Shop All Beauty Products',
      ru: 'Коллекция красоты — купить косметику и средства ухода',
    },
    metaDescription: {
      en: 'Explore our beauty collection with cosmetics, skincare, and wellness products.',
      ru: 'Изучите нашу коллекцию красоты с косметикой, средствами для кожи и велнеса.',
    },
    order: 5,
  },

  // Категории второго уровня (Level 1 Categories)
  {
    id: 11,
    name: { en: 'Jumpers & Cardigans', ru: 'Джемперы и кардиганы' },
    slug: 'jumpers-cardigans',
    parentId: 1,
    metaTitle: {
      en: "Women's Jumpers & Cardigans",
      ru: 'Женские джемперы и кардиганы',
    },
    metaDescription: {
      en: "Shop all women's jumpers & cardigans.",
      ru: 'Купить женские джемперы и кардиганы.',
    },
  },
  {
    id: 12,
    name: { en: 'Tops & T-Shirts', ru: 'Топы и футболки' },
    slug: 'tops-t-shirts',
    parentId: 1,
    metaTitle: { en: "Women's Tops & T-Shirts", ru: 'Женские топы и футболки' },
    metaDescription: {
      en: "Shop all women's tops & t-shirts.",
      ru: 'Купить женские топы и футболки.',
    },
  },
  {
    id: 13,
    name: { en: 'Jackets & Coats', ru: 'Куртки и пальто' },
    slug: 'jackets-coats',
    parentId: 1,
    metaTitle: { en: "Women's Jackets & Coats", ru: 'Женские куртки и пальто' },
    metaDescription: {
      en: "Shop all women's jackets & coats.",
      ru: 'Купить женские куртки и пальто.',
    },
  },
  {
    id: 14,
    name: { en: 'Jeans', ru: 'Джинсы' },
    slug: 'jeans',
    parentId: 1,
    metaTitle: { en: "Women's Jeans", ru: 'Женские джинсы' },
    metaDescription: {
      en: "Shop all women's jeans.",
      ru: 'Купить женские джинсы.',
    },
  },
  {
    id: 15,
    name: { en: 'Dresses', ru: 'Платья' },
    slug: 'dresses',
    parentId: 1,
    metaTitle: { en: "Women's Dresses", ru: 'Женские платья' },
    metaDescription: {
      en: "Shop all women's dresses.",
      ru: 'Купить женские платья.',
    },
  },
  {
    id: 16,
    name: { en: 'Trousers', ru: 'Брюки' },
    slug: 'trousers',
    parentId: 1,
    metaTitle: { en: "Women's Trousers", ru: 'Женские брюки' },
    metaDescription: {
      en: "Shop all women's trousers.",
      ru: 'Купить женские брюки.',
    },
  },
  {
    id: 17,
    name: { en: 'Shirts & Blouses', ru: 'Рубашки и блузки' },
    slug: 'shirts-blouses',
    parentId: 1,
    metaTitle: {
      en: "Women's Shirts & Blouses",
      ru: 'Женские рубашки и блузки',
    },
    metaDescription: {
      en: "Shop all women's shirts & blouses.",
      ru: 'Купить женские рубашки и блузки.',
    },
  },
];
