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
  {
    collection: {
      connect: { id: 2 },
    },
    title: { en: "Men's Clothing", ru: 'Мужская одежда' },
    description: {
      en: "Check out all the freshest styles your wardrobe needs in our men’s clothing range. You’ll find a roundup of everyday essentials, including tops and T-Shirts, as well as comfy lounge sets and underwear. Formal event coming up? Scroll no further than our men’s blazers and suits for the sharpest looks and nail the dress code. When it comes to men's trousers, there’s chinos, joggers and cargo styles in all the staple colours. Dreaming of denim? Our men's jeans offer a range of fits to suit your style, including skinny, straight and tapered, to name just a few. Wear yours with a trendy oversized shirt or a classic denim number from our men's shirts edit. And when it comes to chilly weather, our men's jackets and coats have you covered – we’ve got puffer jackets and trench coats, as well as leather jackets and bomber jackets in year-round colours.",
      ru: 'Откройте для себя самые актуальные модели для вашего гардероба в нашей коллекции мужской одежды. Здесь вы найдете все самое необходимое на каждый день: от топов и футболок до удобных комплектов для отдыха и нижнего белья. Предстоит важное мероприятие? Наши мужские пиджаки и костюмы помогут создать безупречный образ и соответствовать дресс-коду. В разделе мужских брюк представлены чиносы, джоггеры и карго всех основных цветов. Мечтаете о дениме? В нашей коллекции мужских джинсов вы найдете модели на любой вкус: скинни, прямые, зауженные и другие. Сочетайте их с модными оверсайз-рубашками или классическими джинсовыми моделями из нашей подборки. А для прохладной погоды у нас есть мужские куртки и пальто: пуховики, тренчи, кожаные и бомберы на любой сезон.',
    },
    productsTitle: { en: 'New In', ru: 'Новинки' },
    showcaseCollections: {
      create: [
        {
          collection: { connect: { id: 20 } },
          type: ShowcaseType.PRIMARY,
          sortOrder: 1,
          title: {
            en: 'Gym Hoodies & Sweatshirts For Men',
            ru: 'Спортивные толстовки и свитшоты для мужчин',
          },
          image: '/assets/showcase/men/showcase-1.mp4',
        },
        {
          collection: { connect: { id: 18 } },
          type: ShowcaseType.PRIMARY,
          sortOrder: 2,
          title: { en: "Men's Jackets & Coats", ru: 'Мужские куртки и пальто' },
          image: '/assets/showcase/men/showcase-2.avif',
        },
        {
          collection: { connect: { id: 19 } },
          type: ShowcaseType.SECONDARY,
          sortOrder: 1,
          title: { en: "Men's Jeans", ru: 'Мужские джинсы' },
          image: '/assets/showcase/men/showcase-3.avif',
        },
        {
          collection: { connect: { id: 21 } },
          type: ShowcaseType.SECONDARY,
          sortOrder: 2,
          title: {
            en: "Men's Trousers",
            ru: 'Мужские брюки',
          },
          image: '/assets/showcase/men/showcase-4.avif',
        },
      ],
    },
    showcaseProducts: {
      create: [
        {
          product: { connect: { id: 13 } },
          sortOrder: 1,
        },
        {
          product: { connect: { id: 14 } },
          sortOrder: 2,
        },
        {
          product: { connect: { id: 15 } },
          sortOrder: 3,
        },
        {
          product: { connect: { id: 16 } },
          sortOrder: 4,
        },
        {
          product: { connect: { id: 17 } },
          sortOrder: 5,
        },
        {
          product: { connect: { id: 18 } },
          sortOrder: 6,
        },
        {
          product: { connect: { id: 19 } },
          sortOrder: 7,
        },
        {
          product: { connect: { id: 20 } },
          sortOrder: 8,
        },
        {
          product: { connect: { id: 21 } },
          sortOrder: 9,
        },
        {
          product: { connect: { id: 22 } },
          sortOrder: 10,
        },
        {
          product: { connect: { id: 23 } },
          sortOrder: 11,
        },
        {
          product: { connect: { id: 24 } },
          sortOrder: 12,
        },
      ],
    },
  },
  {
    collection: {
      connect: { id: 3 },
    },
    title: { en: 'Home Décor', ru: 'Декор для дома' },
    description: {
      en: 'Level up your interior aesthetics with our home décor range. Whether you’ve moved into a new home, or you want to breathe new life into your existing living space, our collection has every room in the house covered. Our furniture edit offers stunning side tables and comfy lounge chairs, plus there’s an array of chic lighting to create a calming ambience. Looking for those finishing touches? Check out our beautiful bed linen, and top it off by scrolling for decorative cushions and cushion covers, or create textured layers with blankets and throws. When it comes to decorations, add scented candles to your bathroom, give your favourite plants a place to call home in our chic plant pots, or experiment with wall hangings and elegant glassware. Whether your preferred style is minimalistic or bold, we’ve got something to suit every taste in our home décor range.',
      ru: 'Повысьте эстетику вашего интерьера с помощью нашего ассортимента товаров для дома. Независимо от того, переехали ли вы в новый дом или хотите освежить свое жилое пространство, наша коллекция охватывает все комнаты. Наша мебель включает в себя стильные приставные столики и удобные кресла, а также множество элегантных светильников для создания расслабляющей атмосферы. Ищете завершающие штрихи? Ознакомьтесь с нашим красивым постельным бельем и дополните образ декоративными подушками и наволочками или создайте уютные многослойные композиции с помощью пледов и покрывал. В разделе декора вы найдете ароматические свечи для ванной, стильные кашпо для ваших любимых растений или экспериментируйте с настенными панно и элегантной посудой. Предпочитаете ли вы минимализм или смелые решения, у нас найдется что-то на любой вкус в нашем ассортименте товаров для дома.',
    },
    productsTitle: { en: 'New In', ru: 'Новинки' },
    showcaseCollections: {
      create: [
        {
          collection: { connect: { id: 24 } },
          type: ShowcaseType.HERO,
          sortOrder: 1,
          title: {
            en: 'Kitchen essentials',
            ru: 'Кухонные принадлежности',
          },
          image: '/assets/showcase/home/showcase-1.avif',
        },
        {
          collection: { connect: { id: 23 } },
          type: ShowcaseType.PRIMARY,
          sortOrder: 1,
          title: {
            en: 'Bathroom Décor',
            ru: 'Аксессуары для ванной',
          },
          image: '/assets/showcase/home/showcase-2.avif',
        },
        {
          collection: { connect: { id: 22 } },
          type: ShowcaseType.PRIMARY,
          sortOrder: 2,
          title: {
            en: 'Living Room Furniture',
            ru: 'Мебель для гостиной',
          },
          image: '/assets/showcase/home/showcase-3.avif',
        },
      ],
    },
    showcaseProducts: {
      create: [
        {
          product: { connect: { id: 27 } },
          sortOrder: 1,
        },
        {
          product: { connect: { id: 28 } },
          sortOrder: 2,
        },
        {
          product: { connect: { id: 29 } },
          sortOrder: 3,
        },
        {
          product: { connect: { id: 30 } },
          sortOrder: 4,
        },
        {
          product: { connect: { id: 31 } },
          sortOrder: 5,
        },
        {
          product: { connect: { id: 32 } },
          sortOrder: 6,
        },
      ],
    },
  },
  {
    collection: {
      connect: { id: 4 },
    },
    productsTitle: { en: 'New In', ru: 'Новинки' },
    showcaseCollections: {
      create: [
        {
          collection: { connect: { id: 25 } },
          type: ShowcaseType.PRIMARY,
          sortOrder: 1,
          title: {
            en: 'Eye Makeup',
            ru: 'Макияж глаз',
          },
          image: '/assets/showcase/beauty/showcase-1.avif',
        },
        {
          collection: { connect: { id: 26 } },
          type: ShowcaseType.PRIMARY,
          sortOrder: 2,
          title: {
            en: 'Fragrance & Perfume',
            ru: 'Аромат и парфюмерия',
          },
          image: '/assets/showcase/beauty/showcase-2.avif',
        },
      ],
    },
    showcaseProducts: {
      create: [
        {
          product: { connect: { id: 27 } },
          sortOrder: 1,
        },
        {
          product: { connect: { id: 28 } },
          sortOrder: 2,
        },
        {
          product: { connect: { id: 29 } },
          sortOrder: 3,
        },
        {
          product: { connect: { id: 30 } },
          sortOrder: 4,
        },
        {
          product: { connect: { id: 31 } },
          sortOrder: 5,
        },
        {
          product: { connect: { id: 32 } },
          sortOrder: 6,
        },
      ],
    },
  },
];
