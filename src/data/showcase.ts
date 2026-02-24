import { Prisma, ShowcaseType } from '@prisma/client';

export const showcases: Prisma.ShowcaseCreateInput[] = [
  {
    collection: {
      connect: { id: 1 },
    },
    title: { en: "Women's Clothing", ru: 'Женская одежда' },
    description: {
      en: "Refresh your daily rotation with our women’s clothing range. With the freshest styles available all in one place, you can expect everyday basics, like women's tops and skirts, as well as must-have knitwear and cosy loungewear for downtime days. Plans to go out? Our women's dresses line up mini, midi and maxi styles that were made for summer evenings, while our stylish jeans and trousers offer something to flatter every silhouette. Solve your wardrobe woes on busy days with cool co-ords, and wrap up to stay warm in our women's jackets and coats when extra layers are required. Finish off your favourite new looks with an array of trendy accessories, and don’t forget to scroll for statement footwear in our women's shoes range.",
      ru: 'Обновите свой гардероб с нашей линейкой женской одежды. Самые свежие стили собраны в одном месте: от базовых вещей, таких как топы и юбки, до незаменимого трикотажа и уютной одежды для отдыха. Планируете выход в свет? В нашей коллекции платьев представлены модели мини, миди и макси, созданные для летних вечеров, а стильные джинсы и брюки подчеркнут любой силуэт. Решите проблему "нечего надеть" в загруженные дни с помощью стильных комплектов, а в прохладную погоду выберите наши куртки и пальто. Дополните образ трендовыми аксессуарами и не забудьте заглянуть в раздел женской обуви.',
    },
    productsTitle: { en: 'New In', ru: 'Новинки' },
    showcaseCollections: {
      create: [
        {
          collection: { connect: { id: 13 } },
          type: ShowcaseType.HERO,
          sortOrder: 0,
          title: { en: 'New Arrivals', ru: 'Новые поступления' },
          image: '/assets/showcase/women/showcase-3.mp4',
        },
        {
          collection: { connect: { id: 14 } },
          type: ShowcaseType.PRIMARY,
          sortOrder: 1,
          title: { en: 'All Ways Denim', ru: 'Вечный деним' },
          image: '/assets/showcase/women/showcase-1.avif',
        },
        {
          collection: { connect: { id: 15 } },
          type: ShowcaseType.PRIMARY,
          sortOrder: 2,
          title: { en: 'Denim & Essentials', ru: 'Деним и база' },
          image: '/assets/showcase/women/showcase-2.avif',
        },
        {
          collection: { connect: { id: 16 } },
          type: ShowcaseType.SECONDARY,
          sortOrder: 1,
          title: { en: 'Dresses', ru: 'Платья' },
          image: '/assets/showcase/women/showcase-4.avif',
        },
        {
          collection: { connect: { id: 17 } },
          type: ShowcaseType.SECONDARY,
          sortOrder: 2,
          title: { en: 'Skirts', ru: 'Юбки' },
          image: '/assets/showcase/women/showcase-5.avif',
        },
        {
          collection: { connect: { id: 12 } },
          type: ShowcaseType.SECONDARY,
          sortOrder: 3,
          title: { en: 'Tops & T-Shirts', ru: 'Топы и футболки' },
          image: '/assets/showcase/women/showcase-6.avif',
        },
        {
          collection: { connect: { id: 11 } },
          type: ShowcaseType.SECONDARY,
          sortOrder: 4,
          title: { en: 'Cardigans', ru: 'Кардиганы' },
          image: '/assets/showcase/women/showcase-7.avif',
        },
      ],
    },
    showcaseProducts: {
      create: [
        {
          product: { connect: { id: 1 } },
          sortOrder: 1,
        },
        {
          product: { connect: { id: 2 } },
          sortOrder: 2,
        },
        {
          product: { connect: { id: 3 } },
          sortOrder: 3,
        },
        {
          product: { connect: { id: 4 } },
          sortOrder: 4,
        },
        {
          product: { connect: { id: 5 } },
          sortOrder: 5,
        },
        {
          product: { connect: { id: 6 } },
          sortOrder: 6,
        },
        {
          product: { connect: { id: 7 } },
          sortOrder: 7,
        },
        {
          product: { connect: { id: 8 } },
          sortOrder: 8,
        },
        {
          product: { connect: { id: 9 } },
          sortOrder: 9,
        },
        {
          product: { connect: { id: 10 } },
          sortOrder: 10,
        },
        {
          product: { connect: { id: 11 } },
          sortOrder: 11,
        },
        {
          product: { connect: { id: 12 } },
          sortOrder: 12,
        },
      ],
    },
  },
];
