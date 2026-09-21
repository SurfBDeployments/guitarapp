import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://saasy-orpin.vercel.app/');
  await expect(page).toHaveTitle(/SaaSy/);
});

test.describe('navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://saasy-orpin.vercel.app/');
  });

  test('main navigation', async ({ page }) => {
    await expect(page).toHaveURL('https://saasy-orpin.vercel.app/');
  });
});
