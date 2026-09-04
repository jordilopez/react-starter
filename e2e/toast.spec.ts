import { test, expect } from '@playwright/test';

const STORYBOOK_URL = 'http://localhost:6007';

test.describe('Toast (Storybook)', () => {
  test('default story renders a modal dialog with c-toast class', async ({
    page,
  }) => {
    await page.goto(
      `${STORYBOOK_URL}/iframe.html?id=components-toast--default&viewMode=story`,
    );
    const dialog = page.locator('#storybook-root dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveClass(/c-toast/);
    await expect(dialog).toContainText('Default toast');

    const closeButton = dialog.getByRole('button', { name: /close toast/i });
    await expect(closeButton).toBeVisible();
    await closeButton.click();
    await expect(dialog).toBeHidden();
  });

  test('auto-close story dismisses itself after the configured duration', async ({
    page,
  }) => {
    await page.goto(
      `${STORYBOOK_URL}/iframe.html?id=components-toast--auto-close&viewMode=story`,
    );
    const dialog = page.locator('#storybook-root dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toBeHidden({ timeout: 5_000 });
  });
});
