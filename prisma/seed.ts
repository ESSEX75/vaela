import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { collections } from '../src/data/collections';
import { products } from '../src/data/products';
import { showcases } from '../src/data/showcase';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🚀 1. Начинается наполнение базы данных...');

  console.log('📁 2. Наполнение коллекций...');
  for (const c of collections) {
    try {
      await prisma.collection.upsert({
        where: { id: c.id },
        update: {},
        create: c,
      });
    } catch (e) {
      console.error(`❌ Ошибка при создании коллекции ${c.name}:`, e);
    }
  }

  console.log('📦 3. Наполнение продуктов...');
  for (const p of products) {
    try {
      await prisma.product.create({
        data: p,
      });
    } catch (e) {
      console.error(`❌ Ошибка при создании продукта ${p.name}:`, e);
    }
  }

  console.log('🏠 4. Наполнение витрин...');

  await prisma.showcase.deleteMany();

  for (const showcase of showcases) {
    try {
      await prisma.showcase.create({
        data: showcase,
      });
      console.log(
        `✅ Создана витрина для коллекции ID: ${showcase.collection?.connect?.id}`,
      );
    } catch (error) {
      console.error(`❌ Ошибка при создании витрины:`, error);
    }
  }

  console.log('🏁 Наполнение завершено успешно.');

  const collectionsCount = await prisma.collection.count();
  const productsCount = await prisma.product.count();
  const showcaseCount = await prisma.showcase.count();

  console.log(`📊 Итоги в базе данных:`);
  console.log(`   Коллекции: ${collectionsCount}`);
  console.log(`   Продукты: ${productsCount}`);
  console.log(`   Витрины: ${showcaseCount}`);
}

main()
  .catch(e => {
    console.error('\n❌ Критическая ошибка:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
