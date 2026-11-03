import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route('http://127.0.0.1:4173/', async (route) => {
    const response = await route.fetch();
    const html = (await response.text())
      .replace('data-admissions-year="2026–27"', 'data-admissions-year="2025–26"')
      .replaceAll('class="admissions-year">2026–27', 'class="admissions-year">2025–26');
    await route.fulfill({ response, body: html });
  });
  await page.goto('http://127.0.0.1:4173/');
  await page.waitForFunction(() =>
    [...document.querySelectorAll('.admissions-year')].every(
      (element) => element.textContent === '2026–27',
    ),
  );
  assert.deepEqual(errors, []);
  const data = await page.request.get('http://127.0.0.1:4173/notifications.json');
  assert.equal(data.status(), 200);
  assert.deepEqual((await data.json()).notices, []);
  console.log(
    'PASS: stale prerendered admissions year updates without hydration errors; public notice JSON loads.',
  );
} finally {
  await browser.close();
}
