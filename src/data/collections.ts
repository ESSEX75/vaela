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
    order: 3,
  },
  {
    id: 4,
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
    order: 4,
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
  {
    id: 18,
    name: { en: "Men's Jackets & Coats", ru: 'Мужские куртки и пальто' },
    slug: 'men-jackets-coats',
    parentId: 2,
    metaTitle: {
      en: "Men's Jackets & Coats",
      ru: 'Мужские куртки и пальто',
    },
    metaDescription: {
      en: "Shop all men's jackets & coats.",
      ru: 'Купить мужские куртки и пальто.',
    },
  },
  {
    id: 19,
    name: { en: "Men's Jeans", ru: 'Мужские джинсы' },
    slug: 'men-jeans',
    parentId: 2,
    metaTitle: {
      en: "Men's Jeans",
      ru: 'Мужские джинсы',
    },
    metaDescription: {
      en: "Shop all men's jeans.",
      ru: 'Купить мужские джинсы.',
    },
  },
  {
    id: 20,
    name: {
      en: 'Gym Hoodies & Sweatshirts For Men',
      ru: 'Спортивные толстовки и свитшоты для мужчин',
    },
    slug: 'gym-hoodies-sweatshirts-for-men',
    parentId: 2,
    metaTitle: {
      en: "Men's Hoodies & Sweatshirts",
      ru: 'Спортивные толстовки и свитшоты для мужчин',
    },
    metaDescription: {
      en: "Shop all men's hoodies & sweatshirts.",
      ru: 'Купить спортивные толстовки и свитшоты для мужчин.',
    },
  },
  {
    id: 21,
    name: {
      en: "Men's Trousers",
      ru: 'Мужские брюки',
    },
    slug: 'men-trousers',
    parentId: 2,
    metaTitle: {
      en: "Men's Trousers",
      ru: 'Мужские брюки',
    },
    metaDescription: {
      en: "Shop all men's trousers.",
      ru: 'Купить мужские брюки.',
    },
  },
  {
    id: 22,
    name: {
      en: 'Living Room Furniture',
      ru: 'Мебель для гостиной',
    },
    slug: 'living-room-furniture',
    parentId: 3,
    metaTitle: {
      en: 'Living Room Furniture',
      ru: 'Мебель для гостиной',
    },
    metaDescription: {
      en: 'Shop all living room furniture.',
      ru: 'Купить мебель для гостиной.',
    },
  },
  {
    id: 23,
    name: {
      en: 'Bathroom Decor',
      ru: 'Аксессуары для ванной',
    },
    slug: 'bathroom-decor',
    parentId: 3,
    metaTitle: {
      en: 'Bathroom Decor',
      ru: 'Аксессуары для ванной',
    },
    metaDescription: {
      en: 'Shop all bathroom decor.',
      ru: 'Купить аксессуары для ванной.',
    },
  },
  {
    id: 24,
    name: {
      en: 'Kitchenware',
      ru: 'Кухонные принадлежности',
    },
    slug: 'kitchenware',
    parentId: 3,
    metaTitle: {
      en: 'Kitchenware',
      ru: 'Кухонные принадлежности',
    },
    metaDescription: {
      en: 'Shop all kitchenware.',
      ru: 'Купить кухонные принадлежности.',
    },
  },
  {
    id: 25,
    name: {
      en: 'Eye Makeup',
      ru: 'Макияж глаз',
    },
    slug: 'eye-makeup',
    parentId: 4,
    metaTitle: {
      en: 'Eye Makeup',
      ru: 'Макияж глаз',
    },
    metaDescription: {
      en: 'Shop all eye makeup.',
      ru: 'Купить макияж глаз.',
    },
  },
  {
    id: 26,
    name: {
      en: 'Fragrance & Perfume',
      ru: 'Аромат и парфюмерия',
    },
    slug: 'fragrance-perfume',
    parentId: 4,
    metaTitle: {
      en: 'Fragrance & Perfume',
      ru: 'Аромат и парфюмерия',
    },
    metaDescription: {
      en: 'Shop all fragrance & perfume.',
      ru: 'Купить аромат и парфюмерию.',
    },
  },
];
