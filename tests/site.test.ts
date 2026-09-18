import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://guitarapp-alpha.vercel.app/');
  await expect(page).toHaveTitle(/Guitar/);
});

test.describe('navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://guitarapp-alpha.vercel.app/');
  });

  test('main navigation', async ({ page }) => {
    await expect(page).toHaveURL('https://guitarapp-alpha.vercel.app/');
  });
});
