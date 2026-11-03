import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
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
    const response = await page.goto(`http://127.0.0.1:4173${route}`);
    assert.equal(response.status(), 200);
    assert.equal(await page.locator('h1').count(), 1);
  }
  console.log('PASS: Microsoft Edge direct loading of all 10 routes.');
} finally {
  await browser.close();
}
