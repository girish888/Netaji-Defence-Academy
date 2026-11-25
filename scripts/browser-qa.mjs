import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

await mkdir('artifacts', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage();
const errors = [];
const results = [];
page.on('pageerror', (error) => errors.push(error.message));
const routes = [
  '/',
  '/about',
  '/courses',
  '/courses-poster',
  '/courses/others',
  '/training',
  '/achievements',
  '/gallery',
  '/hostel',
  '/notifications',
  '/registration',
  '/contact',
];

try {
  for (const width of [320, 375, 390, 430, 768, 1024, 1366, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      const response = await page.goto(`http://127.0.0.1:4173${route}`, {
        waitUntil: 'networkidle',
      });
      assert.equal(response.status(), 200);
      assert.equal(await page.locator('h1').count(), 1);
      assert.ok(await page.locator('meta[name="description"]').getAttribute('content'));
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} overflows at ${width}px`,
      );
      for (const image of await page.locator('img').all()) {
        await image.evaluate((node) => {
          node.loading = 'eager';
          node.scrollIntoView({ block: 'center' });
        });
        await page.waitForTimeout(100);
        assert.ok(
          await image.evaluate((node) => node.complete && node.naturalWidth > 0),
          `Broken image on ${route}`,
        );
      }
      results.push({ route, width, status: 'PASS' });
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('a[href="/gallery"]').last().click();
  await page.getByRole('button', { name: 'Classrooms', exact: true }).click();
  assert.equal(await page.locator('.gallery-item').count(), 1);
  await page.locator('.gallery-item').click();
  assert.equal(await page.locator('dialog').evaluate((node) => node.open), true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('dialog').evaluate((node) => node.open), false);
  await page.getByRole('button', { name: 'Hostel', exact: true }).click();
  await page.getByText('Photographs coming soon.').waitFor();
  await page.goto('http://127.0.0.1:4173/registration');
  await page.getByRole('button', { name: 'Review registration enquiry' }).click();
  assert.equal(await page.locator('.review-panel').count(), 0);
  const values = {
    'Full Name': 'Synthetic test user',
    'Father’s Full Name': 'Synthetic test parent',
    'Mobile Number': '9999999999',
    'Date of Birth': '2006-01-01',
    'Educational Qualification': 'Class 12',
    Profession: 'Student',
    'Email ID': 'test@example.invalid',
    District: 'Test district',
  };
  for (const [name, value] of Object.entries(values)) {
    await page.locator(`input[name="${name}"]`).fill(value);
  }
  await page.locator('select[name="State"]').selectOption({ index: 1 });
  await page
    .locator('select[name="Preferred Course"]')
    .selectOption({ label: 'NDA Training' });
  await page
    .locator('select[name="Gender"]')
    .selectOption({ label: 'Prefer not to say' });
  await page.locator('select[name="Hostel Required"]').selectOption('No');
  await page.locator('textarea').fill('తెలుగు + हिंदी? & test');
  await page.locator('input[name="consent"]').check();
  await page.getByRole('button', { name: 'Review registration enquiry' }).click();
  await page.getByRole('heading', { name: 'Review your enquiry', level: 2 }).waitFor();
  assert.ok(
    (await page.locator('.review-panel pre').textContent()).includes(
      'తెలుగు + हिंदी? & test',
    ),
  );
  assert.equal(await page.locator('a[href^="https://wa.me/"]').count(), 0);
  assert.equal(await page.evaluate(() => localStorage.length), 0);
  assert.equal(page.url(), 'http://127.0.0.1:4173/registration');
  await page.goto('http://127.0.0.1:4173/notifications');
  await page.getByPlaceholder('Search recruitment notices…').fill('test search');
  await page.getByText('Verified updates will appear here.').waitFor();
  const missing = await page.goto('http://127.0.0.1:4173/does-not-exist');
  assert.equal(missing.status(), 404);
  await page.getByRole('heading', { name: 'Page not found' }).waitFor();
  await page.setViewportSize({ width: 1366, height: 1000 });
  await page.goto('http://127.0.0.1:4173/');
  await page.screenshot({ path: 'artifacts/home-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'artifacts/home-mobile.png', fullPage: true });
  assert.deepEqual(errors, []);
  results.push({
    interactions:
      'Menu, filters, lightbox Escape, required form fields, message review, privacy, missing contact safety, 404',
    status: 'PASS',
  });
} finally {
  await writeFile(
    'artifacts/browser-qa.json',
    JSON.stringify({ results, errors }, null, 2),
  );
  await browser.close();
}
console.log(`Passed ${results.length} browser checks.`);
