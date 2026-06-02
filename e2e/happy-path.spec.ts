import { expect, test } from '@playwright/test';

test('start check-ins, get a cue, release it', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  const heading = page.getByRole('heading', { name: /holding tension/ });
  await expect(heading).toBeVisible();
  await expect(heading).toHaveCSS('opacity', '1');

  await page.getByRole('button', { name: 'every 10m' }).click();
  await page.getByRole('button', { name: 'Start check-ins' }).click();
  await expect(page.getByRole('heading', { name: 'Carry on.' })).toBeVisible();

  await page.clock.runFor(10 * 60 * 1000);
  await page.getByRole('button', { name: 'Released' }).click();
  await expect(page.getByText(/releases so far/)).toBeVisible();
});
