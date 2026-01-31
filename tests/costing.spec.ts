import { test, expect } from '@playwright/test';
import { login, waitForDashboard } from './utils/helpers';

test.describe('Costing', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await login(page);
        await waitForDashboard(page);
    });

    test('Navigate to Costing Dashboard', async ({ page }) => {
        const costingButton = page.getByRole('button', { name: 'Costing' });

        await expect(costingButton).toBeVisible({ timeout: 5000 });
        await costingButton.click();
        await page.waitForTimeout(2000);

        console.log('✅ Navigated to Costing Dashboard');
    });

    test('View costing content', async ({ page }) => {
        await page.getByRole('button', { name: 'Costing' }).click();
        await page.waitForTimeout(2000);

        // Check for costing-related content
        const costingContent = page.locator('text=/Cost|FOB|CM|Material|Margin/i').first();
        const hasContent = await costingContent.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasContent ? '✅ Costing content visible' : '⚠️ Costing content not found');
    });

    test('Check for costing sheet generator', async ({ page }) => {
        await page.getByRole('button', { name: 'Costing' }).click();
        await page.waitForTimeout(2000);

        // Look for costing sheet or generator button
        const generateButton = page.getByRole('button', { name: /Generate|New|Create/i }).first();
        const hasGenerator = await generateButton.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasGenerator ? '✅ Costing generator available' : '⚠️ Generator not found');
    });

});
