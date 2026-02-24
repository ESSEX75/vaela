import { PrismaClient, ShowcaseType } from '@prisma/client';
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
  console.log('🔍 Экспорт данных витрин из БД...');

  const showcases = await prisma.showcase.findMany({
    include: {
      showcaseCollections: {
        orderBy: { sortOrder: 'asc' },
      },
      showcaseProducts: {
        orderBy: { sortOrder: 'asc' },
      },
    },
  });

  const mappedShowcases = showcases.map(s => ({
    collection: {
      connect: { id: s.collectionId },
    },
    title: s.title,
    description: s.description,
    productsTitle: s.productsTitle,
    showcaseCollections: {
      create: s.showcaseCollections.map(sc => ({
        collection: { connect: { id: sc.collectionId } },
        type: sc.type,
        sortOrder: sc.sortOrder,
        title: sc.title,
        image: sc.image,
      })),
    },
    showcaseProducts: {
      create: s.showcaseProducts.map(sp => ({
        product: { connect: { id: sp.productId } },
        sortOrder: sp.sortOrder,
      })),
    },
  }));

  const outputDir = path.join(process.cwd(), 'src/data');
  const outputPath = path.join(outputDir, 'showcase_dump.ts');

  const fileContent = `import { Prisma, ShowcaseType } from '@prisma/client';

export const showcases: Prisma.ShowcaseCreateInput[] = ${JSON.stringify(mappedShowcases, null, 2)};
`;

  fs.writeFileSync(outputPath, fileContent);

  console.log(`✅ Данные успешно экспортированы в ${outputPath}`);
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
