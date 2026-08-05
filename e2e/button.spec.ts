import { test, expect } from '@playwright/test';

const STORYBOOK_URL = 'http://localhost:6007';

test.describe('Button (Storybook)', () => {
  test('default story renders a native button with c-button class', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-button--default&viewMode=story`);
    const button = page.locator('#storybook-root button');
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Default Button');
    await expect(button).toHaveClass(/c-button/);
    await expect(button).toBeEnabled();
  });

  test('disabled story renders a disabled button', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-button--disabled&viewMode=story`);
    const button = page.locator('#storybook-root button');
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Disabled');
    await expect(button).toBeDisabled();
  });
});
