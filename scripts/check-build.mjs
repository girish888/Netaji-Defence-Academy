import { readFile, stat } from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';

const routes = [
  '/',
  '/about',
  '/courses',
  '/courses/others',
  '/training',
  '/achievements',
  '/gallery',
  '/hostel',
  '/notifications',
  '/registration',
  '/contact',
];
const titles = new Set();
const publicBase = (process.env.PUBLIC_BASE || '').replace(/\/+$/, '');
for (const route of routes) {
  const html = await readFile(`dist${route === '/' ? '' : route}/index.html`, 'utf8');
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${route}: one h1`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `${route}: unique title`);
  titles.add(title);
  assert.match(html, /name="description" content="[^"]+"/);
  assert.ok(!html.includes('noindex'));
  const schema = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1];
  assert.ok(schema);
  assert.equal(JSON.parse(schema)['@type'], 'EducationalOrganization');
  for (const [, asset] of html.matchAll(/(?:src|href)="(\/[^"#?]*)/g)) {
    const clean = asset.split('?')[0];
    const localPath =
      publicBase && (clean === publicBase || clean.startsWith(`${publicBase}/`))
        ? clean.slice(publicBase.length) || '/'
        : clean;
    let target = path.join('dist', localPath.replace(/^\/+/, ''));
    try {
      if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
    } catch {
      throw new Error(`Broken internal path ${asset} on ${route}`);
    }
    await stat(target);
  }
}
assert.ok(!(await readFile('dist/_headers', 'utf8')).includes('PLACEHOLDER'));
console.log(
  'PASS: prerendered pages, headings, titles, descriptions, JSON-LD, internal links, image paths and generated CSP.',
);
