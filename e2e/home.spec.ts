import { test, expect } from '@playwright/test';

test.describe('Safwork App E2E — add & delete', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0ms !important;
          transition-duration: 0ms !important;
        }
      `
    });
  });

  test('dodaje nową ofertę', async ({ page }) => {
    await page.click('button.button__Form');
    const jobName = `TempJob${Date.now()}`;
    await page.fill('input[formControlName=title]', jobName);
    await page.fill('input[formControlName=company]', 'TestCorp');
    await page.fill('input[formControlName=location]', 'Remote');
    await page.click('button.form__button'); 
    await expect(page.getByText('Oferta została dodana 🎉')).toBeVisible();
    await expect(page.getByText(jobName)).toBeVisible();
  });

  test('usuwa wcześniej dodaną ofertę', async ({ page }) => {
    await page.click('button.button__Form');
    const jobName = `DeleteMe${Date.now()}`;
    await page.fill('input[formControlName=title]', jobName);
    await page.fill('input[formControlName=company]', 'DeleteCorp');
    await page.fill('input[formControlName=location]', 'Nowhere');
    await page.click('button.form__button');

    await expect(page.getByText(jobName)).toBeVisible();

    const row = page.locator('tr[mat-row]').filter({ hasText: jobName });
    await row
      .locator('button')
      .filter({ has: page.locator('mat-icon', { hasText: 'delete' }) })
      .click();

    await expect(page.getByText(jobName)).not.toBeVisible();
  });
});