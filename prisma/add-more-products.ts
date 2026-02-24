import 'dotenv/config';
import { PrismaClient, ProductSize, ProductColor } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Настройка подключения (совпадает с основным seed.ts)
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Утилиты для генерации
const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomFloat = (min: number, max: number) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(2));

const getRandomElement = <T>(arr: T[] | readonly T[]): T =>
  arr[getRandomInt(0, arr.length - 1)];

const getRandomElements = <T>(arr: T[] | readonly T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Данные для генерации
const productAdjectives = [
  { en: 'Premium', ru: 'Премиум' },
  { en: 'Vintage', ru: 'Винтажный' },
  { en: 'Classic', ru: 'Классический' },
  { en: 'Modern', ru: 'Современный' },
  { en: 'Stylish', ru: 'Стильный' },
  { en: 'Comfortable', ru: 'Удобный' },
  { en: 'Lightweight', ru: 'Легкий' },
  { en: 'Durable', ru: 'Прочный' },
  { en: 'Elegant', ru: 'Элегантный' },
  { en: 'Sporty', ru: 'Спортивный' },
];
const productTypes = [
  { en: 'T-Shirt', ru: 'Футболка' },
  { en: 'Jacket', ru: 'Куртка' },
  { en: 'Sneakers', ru: 'Кроссовки' },
  { en: 'Sweater', ru: 'Свитер' },
  { en: 'Shorts', ru: 'Шорты' },
  { en: 'Jeans', ru: 'Джинсы' },
  { en: 'Backpack', ru: 'Рюкзак' },
  { en: 'Cap', ru: 'Кепка' },
  { en: 'Coat', ru: 'Пальто' },
  { en: 'Hoodie', ru: 'Толстовка' },
];
const colors = [
  { en: 'Black', ru: 'Черный' },
  { en: 'White', ru: 'Белый' },
  { en: 'Gray', ru: 'Серый' },
  { en: 'Blue', ru: 'Синий' },
  { en: 'Red', ru: 'Красный' },
  { en: 'Green', ru: 'Зеленый' },
  { en: 'Yellow', ru: 'Желтый' },
  { en: 'Pink', ru: 'Розовый' },
  { en: 'Purple', ru: 'Фиолетовый' },
  { en: 'Navy', ru: 'Темно-синий' },
];

const descriptions = [
  {
    en: 'Perfect for everyday wear with superior comfort and style. Made from high-quality materials.',
    ru: 'Идеально подходит для повседневного использования с непревзойденным комфортом и стилем. Сделано из высококачественных материалов.',
  },
  {
    en: 'Designed with premium materials for long-lasting durability. A must-have addition to your wardrobe.',
    ru: 'Разработано из премиальных материалов для долговечности. Обязательное дополнение к вашему гардеробу.',
  },
  {
    en: 'A versatile piece that complements any wardrobe. Suitable for both casual and formal occasions.',
    ru: 'Универсальная вещь, которая дополнит любой гардероб. Подходит как для повседневных, так и для формальных случаев.',
  },
  {
    en: 'Crafted with attention to detail and modern aesthetics. Features innovative design elements.',
    ru: 'Создано с вниманием к деталям и современной эстетикой. Содержит инновационные элементы дизайна.',
  },
];

const allSizes = Object.values(ProductSize);
const allColors = Object.values(ProductColor);

async function generateProducts(count: number) {
  console.log(`\n🎨 Generating ${count} additional products...\n`);

  const collections = await prisma.collection.findMany();
  if (collections.length === 0) {
    console.error('❌ No collections found! Run main seed first.');
    return;
  }

  let successCount = 0;

  for (let i = 0; i < count; i++) {
    const adj = getRandomElement(productAdjectives);
    const color = getRandomElement(colors);
    const type = getRandomElement(productTypes);
    const nameEn = `${adj.en} ${color.en} ${type.en}`;
    const nameRu = `${adj.ru} ${color.ru} ${type.ru}`;

    const slug = `${nameEn.toLowerCase().replace(/ /g, '-')}-${getRandomInt(1000, 9999)}`;
    const description = getRandomElement(descriptions);

    const realImagePrefixes = Array.from(
      { length: 12 },
      (_, i) => `product${i + 1}`,
    );

    const images = Array.from({ length: getRandomInt(2, 4) }, () => {
      const prefix = getRandomElement(realImagePrefixes);
      const num = getRandomInt(1, 4);
      const ext = prefix === 'product1' ? 'jpg' : 'avif';
      return {
        imageURL: `/assets/products/${prefix}-${num}.${ext}`,
        imageBlur:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgFBgcGBQgHBgcJCAgJDBMMDAsLDBgREg4THBgdHRsYGxofIywlHyEqIRobJjQnKi4vMTIxHiU2OjYwOiwwMTD/2wBDAQgJCQwKDBcMDBcwIBsgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDD/wAARCAANAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABQb/xAAhEAACAgEEAgMAAAAAAAAAAAABAgMEBREAEhMhMUFRYf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMEwAAAhEDEQA/ACuPuae9bTxxarbVPCu37VJ05a7Qhu5IUGTLexjJAxj1+dbVTkS5UhtV3DQzosiH6pGR/DqPm5Y8Kz7j39qnPPaMxnZ2sMA7Fy3kDAPk4/QA09o7FBRpQVK1q4sNeNYo16o8KowB6+DQf//Z',
      };
    });

    try {
      await prisma.product.create({
        data: {
          name: { en: nameEn, ru: nameRu },
          slug,
          description: { en: description.en, ru: description.ru },
          price: getRandomFloat(20, 300),
          rate: getRandomFloat(3.5, 5.0),
          published: true,
          sizes: getRandomElements(allSizes, getRandomInt(2, 4)),
          colors: getRandomElements(allColors, getRandomInt(1, 3)),
          collectionId: getRandomElement(collections).id,
          images: { createMany: { data: images } },
        },
      });
      successCount++;
      if (successCount % 10 === 0)
        console.log(`✅ Progress: ${successCount}/${count}...`);
    } catch (e) {
      console.error(
        `❌ Error creating product ${name}:`,
        e instanceof Error ? e.message : e,
      );
    }
  }

  console.log(`\n✨ Success! Created ${successCount} products.\n`);
}

async function main() {
  const existing = await prisma.product.count();
  console.log(`📊 Current products: ${existing}`);

  await generateProducts(30);

  const total = await prisma.product.count();
  console.log(`📈 Total products now: ${total}`);
}

main()
  .catch(e => {
    console.error('❌ Fatal Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
