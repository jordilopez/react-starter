import { test, expect } from '@playwright/test';

test.describe('App', () => {
  test('should render the starter page with heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Get started')).toBeVisible();
  });

  test('should increment count on button click', async ({ page }) => {
    await page.goto('/');
    const button = page.getByRole('button', { name: /count is 0/i });
    await button.click();
    await expect(page.getByRole('button', { name: /count is 1/i })).toBeVisible();
  });

  test('should have working documentation links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Documentation')).toBeVisible();
    await expect(page.getByText('Explore Vite')).toBeVisible();
    await expect(page.getByText('Learn more')).toBeVisible();
  });

  test('should have working social links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Connect with us')).toBeVisible();
    await expect(page.getByText('GitHub')).toBeVisible();
    await expect(page.getByText('Discord')).toBeVisible();
  });
});
