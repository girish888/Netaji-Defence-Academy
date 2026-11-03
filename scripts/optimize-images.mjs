import sharp from 'sharp';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

await mkdir('public/images/optimized', { recursive: true });
const inventory = [];
for (const name of ['1000667288', '1000666717']) {
  const original = `public/images/originals/${name}.jpg`;
  const bytes = await readFile(original);
  const metadata = await sharp(bytes).metadata();
  await sharp(bytes)
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(`public/images/optimized/${name}.webp`);
  inventory.push({
    original,
    sha256: createHash('sha256').update(bytes).digest('hex'),
    bytes: bytes.length,
    width: metadata.width,
    height: metadata.height,
    optimized: `public/images/optimized/${name}.webp`,
  });
}
await writeFile('ASSET-INVENTORY.json', JSON.stringify(inventory, null, 2) + '\n');
console.log('Preserved both originals and generated separate WebP copies.');
