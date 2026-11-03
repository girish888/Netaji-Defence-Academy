import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { writeFile } from 'node:fs/promises';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();
const results = [];
try {
  for (const route of [
    '/',
    '/about',
    '/courses',
    '/courses/others',
    '/training',
    '/gallery',
    '/hostel',
    '/notifications',
    '/registration',
    '/contact',
  ]) {
    await page.goto(`http://127.0.0.1:4173${route}`);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    results.push({
      route,
      violations: result.violations.map(({ id, impact, description, nodes }) => ({
        id,
        impact,
        description,
        elements: nodes.map((node) => node.target),
      })),
    });
  }
} finally {
  await browser.close();
  await writeFile('artifacts/accessibility-qa.json', JSON.stringify(results, null, 2));
}
console.log(JSON.stringify(results));
if (results.some((result) => result.violations.length)) process.exitCode = 1;
