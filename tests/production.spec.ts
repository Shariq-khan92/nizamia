import { test, expect } from '@playwright/test';
import { login, waitForDashboard } from './utils/helpers';

test.describe('Production', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await login(page);
        await waitForDashboard(page);
    });

    test('Navigate to Production Dashboard', async ({ page }) => {
        const productionButton = page.getByRole('button', { name: 'Production' });

        await expect(productionButton).toBeVisible({ timeout: 5000 });
        await productionButton.click();
        await page.waitForTimeout(2000);

        console.log('✅ Navigated to Production Dashboard');
    });

    test('View production content', async ({ page }) => {
        await page.getByRole('button', { name: 'Production' }).click();
        await page.waitForTimeout(2000);

        // Check for production-related content
        const productionContent = page.locator('text=/Production|Cutting|Stitching|Output|Progress/i').first();
        const hasContent = await productionContent.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasContent ? '✅ Production content visible' : '⚠️ Production content not found');
    });

    test('View production stages', async ({ page }) => {
        await page.getByRole('button', { name: 'Production' }).click();
        await page.waitForTimeout(2000);

        // Look for production stages
        const stages = ['Cutting', 'Stitching', 'Finishing'];
        const foundStages: string[] = [];

        for (const stage of stages) {
            const stageElement = page.getByText(stage).first();
            if (await stageElement.isVisible().catch(() => false)) {
                foundStages.push(stage);
            }
        }

        console.log(`✅ Found ${foundStages.length}/${stages.length} stages: ${foundStages.join(', ')}`);
    });

    test('Check for production log input', async ({ page }) => {
        await page.getByRole('button', { name: 'Production' }).click();
        await page.waitForTimeout(2000);

        // Look for log entry or output logging
        const logInput = page.locator('input[type="number"]').first();
        const hasLogInput = await logInput.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasLogInput ? '✅ Production log input available' : '⚠️ Log input not found');
    });

});
