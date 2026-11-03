import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const { createElement } = await import('react');
  const { pages } = await server.ssrLoadModule('/src/data/site.ts');
  const { admissionsYear } = await server.ssrLoadModule('/src/lib/logic.ts');
  const builtYear = admissionsYear();
  const template = await readFile('dist/index.html', 'utf8');
  const publicBase = (process.env.PUBLIC_BASE || '').replace(/\/$/, '');
  const rewriteForBase = (value) => {
    if (!publicBase) return value;
    return value
      .replaceAll('src="/assets/', `src="${publicBase}/assets/`)
      .replaceAll('href="/assets/', `href="${publicBase}/assets/`)
      .replaceAll('src="/images/', `src="${publicBase}/images/`)
      .replaceAll('href="/images/', `href="${publicBase}/images/`)
      .replace(/href="\/(about|courses|training|gallery|hostel|notifications|registration|contact)/g, `href="${publicBase}/$1`)
      .replaceAll('href="/"', `href="${publicBase || ''}/"`);
  };
  if (publicBase) {
    for (const asset of await readdir('dist/assets')) {
      if (!/\.(css|js)$/.test(asset)) continue;
      const assetPath = `dist/assets/${asset}`;
      const contents = await readFile(assetPath, 'utf8');
      await writeFile(assetPath, contents.replaceAll('/images/', `${publicBase}/images/`));
    }
  }
  await writeFile(
    'dist/notifications.json',
    await readFile('src/data/notifications.json'),
  );
  const origin = (process.env.SITE_URL || server.config.env.SITE_URL)?.replace(/\/$/, '');
  if (origin && !/^https:\/\/[^/]+$/.test(origin))
    throw new Error('SITE_URL must be an HTTPS origin.');
  const escape = (value) =>
    value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Netaji Defence Academy',
    slogan: 'Your Dream, Our Mission, One Nation',
    ...(origin ? { url: origin } : {}),
  });
  const jsonLdHash = createHash('sha256').update(jsonLd).digest('base64');
  const headers = await readFile('public/_headers', 'utf8');
  await writeFile(
    'dist/_headers',
    headers.replace('sha256-PLACEHOLDER', `sha256-${jsonLdHash}`),
  );

  for (const page of pages) {
    const title =
      page.path === '/'
        ? 'Netaji Defence Academy | NDA, Army, Navy & Police Training'
        : `${page.label} | Netaji Defence Academy`;
    const canonical = origin
      ? `${origin}${page.path === '/' ? '/' : `${page.path}/`}`
      : '';
    const metadata = [
      ...(page.path === '/'
        ? [
            '<link rel="preload" as="image" href="/images/optimized/1000666717.webp" fetchpriority="high" />',
          ]
        : []),
      `<meta name="description" content="${escape(page.description)}" />`,
      `<meta property="og:title" content="${escape(title)}" />`,
      `<meta property="og:description" content="${escape(page.description)}" />`,
      '<meta property="og:type" content="website" />',
      ...(canonical
        ? [
            `<link rel="canonical" href="${canonical}" />`,
            `<meta property="og:url" content="${canonical}" />`,
            `<meta property="og:image" content="${origin}/images/optimized/1000666717.webp" />`,
          ]
        : []),
      `<script type="application/ld+json">${jsonLd}</script>`,
    ].join('\n');
    const html = rewriteForBase(template
      .replace(
        '<title>Netaji Defence Academy</title>',
        `<title>${escape(title)}</title>\n${metadata}`,
      )
      .replace(
        '<div id="root"></div>',
        `<div id="root" data-admissions-year="${builtYear}">${renderToString(createElement(App, { path: page.path }))}</div>`,
      ));
    const directory = `dist${page.path === '/' ? '' : page.path}`;
    await mkdir(directory, { recursive: true });
    await writeFile(`${directory}/index.html`, html);
  }

  await writeFile(
    'dist/404.html',
    rewriteForBase(template.replace(
      '<div id="root"></div>',
      `<div id="root" data-admissions-year="${builtYear}">${renderToString(createElement(App, { path: '/404' }))}</div>`,
    )),
  );
  await writeFile(
    'dist/robots.txt',
    origin
      ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
      : 'User-agent: *\nAllow: /\n',
  );
  if (origin)
    await writeFile(
      'dist/sitemap.xml',
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((page) => `<url><loc>${origin}${page.path === '/' ? '/' : `${page.path}/`}</loc></url>`).join('\n')}</urlset>`,
    );
  else
    console.warn(
      'SITE_URL is not set: canonical URLs and sitemap are intentionally omitted until the domain is confirmed.',
    );
  console.log(`Prerendered ${pages.length} pages with meaningful HTML.`);
} finally {
  await server.close();
}
