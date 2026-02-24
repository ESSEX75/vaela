const fs = require('fs');
const path = require('path');

const womenDir = 'D:/web/PORTFOLIO/vaela-shop/public/assets/products/women';
const targetDir = 'D:/web/PORTFOLIO/vaela-shop/public/assets/products';
const file = 'D:/web/PORTFOLIO/vaela-shop/src/data/products.ts';

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const map = {
  'Frill-trimmed': 'product1',
  'Jumper': 'product2',
  'Merino-wool jumper': 'product3',
  'layered-cardigan': 'product4',
  'Collared-cardigan': 'product5',
  'pima': 'product6',
  'pima-cotton': 'product7',
  'poof-slid': 'product8',
  'jeans': 'product9',
  'flared': 'product10',
  'Lace-look': 'product11',
  'Cotton-blend': 'product12'
};

for (const [key, val] of Object.entries(map)) {
  for (let i = 1; i <= 4; i++) {
    const ext = key === 'Frill-trimmed' ? '.jpg' : '.avif';
    const oldPath = path.join(womenDir, `${key}-${i}${ext}`);
    const newPath = path.join(targetDir, `${val}-${i}${ext}`);
    if (fs.existsSync(oldPath)) fs.renameSync(oldPath, newPath);
  }
}

let content = fs.readFileSync(file, 'utf8');

let frillCount = 1;
content = content.replace(/\/assets\/products\/women\/([a-zA-Z0-9- ]+)-(\d)\.(avif|jpg)/g, (match, name, num, ext) => {
  if (name === 'Frill-trimmed') {
    return `/assets/products/${map[name]}-${frillCount++}.${ext}`;
  }
  if (map[name]) {
    return `/assets/products/${map[name]}-${num}.${ext}`;
  }
  return match;
});

fs.writeFileSync(file, content);

try {
  if (fs.existsSync(womenDir) && fs.readdirSync(womenDir).length === 0) {
    fs.rmdirSync(womenDir);
  }
} catch (e) {}

console.log('Done mapping and updating products.ts');
