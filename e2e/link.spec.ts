import { test, expect } from '@playwright/test';

const STORYBOOK_URL = 'http://localhost:6007';

test.describe('Link (Storybook)', () => {
  test('default story renders a native link with c-link class', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-link--default&viewMode=story`);
    const link = page.locator('#storybook-root a');
    await expect(link).toBeVisible();
    await expect(link).toHaveText('Default Link');
    await expect(link).toHaveClass(/c-link/);
    await expect(link).toHaveAttribute('href', 'https://example.com');
    await expect(link).toBeEnabled();
  });

  test('disabled story renders a disabled link', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-link--disabled&viewMode=story`);
    const link = page.locator('#storybook-root a');
    await expect(link).toBeVisible();
    await expect(link).toHaveText('Disabled');
    await expect(link).toHaveAttribute('aria-disabled', 'true');
    await expect(link).not.toHaveAttribute('href');
  });

  test('new tab story sets target and rel', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-link--new-tab&viewMode=story`);
    const link = page.locator('#storybook-root a');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

test.describe('Link (App)', () => {
  test('renders the demo link with the c-link class', async ({ page }) => {
    await page.goto('/');
    const link = page.getByRole('link', { name: /read the docs/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveClass(/c-link/);
    await expect(link).toHaveAttribute('href', '/docs');
  });

  test('demo link navigates to its href', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /read the docs/i }).click();
    await expect(page).toHaveURL(/\/docs$/);
  });
});
