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
  console.log('🔍 Экспорт данных коллекций из БД...');

  const collections = await prisma.collection.findMany({
    orderBy: { id: 'asc' },
  });

  const mappedCollections = collections.map(c => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    isRoot: c.isRoot,
    metaTitle: c.metaTitle,
    metaDescription: c.metaDescription,
    order: c.order,
    ...(c.parentId && {
      parent: { connect: { id: c.parentId } },
    }),
  }));

  const outputDir = path.join(process.cwd(), 'src/data');
  const outputPath = path.join(outputDir, 'collections_dump.ts');

  const fileContent = `import { Prisma } from '@prisma/client';

export const collections: (Prisma.CollectionCreateInput & { id: number })[] = ${JSON.stringify(mappedCollections, null, 2)};
`;

  fs.writeFileSync(outputPath, fileContent);

  console.log(`✅ Коллекции успешно экспортированы в ${outputPath}`);
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
