import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🔍 Экспорт данных товаров из БД...');

  const products = await prisma.product.findMany({
    include: {
      images: {
        select: {
          imageURL: true,
          imageBlur: true,
        },
      },
    },
    orderBy: { id: 'asc' },
  });

  const mappedProducts = products.map(p => ({
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: p.price,
    rate: p.rate,
    published: p.published,
    colors: p.colors,
    sizes: p.sizes,
    collection: {
      connect: { id: p.collectionId },
    },
    images: {
      createMany: {
        data: p.images,
      },
    },
  }));

  const outputDir = path.join(process.cwd(), 'src/data');
  const outputPath = path.join(outputDir, 'products_dump.ts');

  const fileContent = `import { Prisma } from '@prisma/client';

export const products: Prisma.ProductCreateInput[] = ${JSON.stringify(mappedProducts, null, 2)};
`;

  fs.writeFileSync(outputPath, fileContent);

  console.log(`✅ Товары успешно экспортированы в ${outputPath}`);
}

main()
  .catch(e => {
    console.error('❌ Ошибка при экспорте:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
