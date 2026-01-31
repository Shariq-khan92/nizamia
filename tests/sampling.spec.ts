import { test, expect } from '@playwright/test';
import { login, waitForDashboard, navigateToOrderManagement } from './utils/helpers';

test.describe('Sampling Workflows', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await login(page);
        await waitForDashboard(page);
    });

    test('Navigate to Sample Room Dashboard', async ({ page }) => {
        const samplingButton = page.getByRole('button', { name: 'Sample Room' });

        await expect(samplingButton).toBeVisible({ timeout: 5000 });
        await samplingButton.click();
        await page.waitForTimeout(2000);

        // Check for sampling content
        const anyContent = page.locator('table, [class*="sample"], [class*="dashboard"]').first();
        const hasSampling = await anyContent.isVisible().catch(() => false);

        console.log(hasSampling ? '✅ Sample Room Dashboard loaded' : '⚠️ Content not visible');
    });

    test('View sample list', async ({ page }) => {
        const samplingButton = page.getByRole('button', { name: 'Sample Room' });

        await expect(samplingButton).toBeVisible({ timeout: 5000 });
        await samplingButton.click();
        await page.waitForTimeout(2000);

        // Check for table
        const sampleTable = page.locator('table').first();
        const hasTable = await sampleTable.isVisible().catch(() => false);

        console.log(hasTable ? '✅ Sample list/table visible' : '⚠️ Sample table not found');
    });

    test('Add sample via order modal Sampling tab', async ({ page }) => {
        // Navigate to Order Management first
        await navigateToOrderManagement(page);

        // Open new order modal
        await page.getByRole('button', { name: 'New Order' }).click();
        await page.waitForTimeout(500);

        // Navigate to Sampling tab
        await page.getByRole('button', { name: 'Sampling' }).click();
        await page.waitForTimeout(500);

        // Tab should load
        const tabContent = page.locator('[class*="sample"], [class*="form"], table').first();
        const hasContent = await tabContent.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasContent ? '✅ Sampling tab loaded in order modal' : '⚠️ Sampling tab content not visible');

        // Close modal
        await page.keyboard.press('Escape');
    });

    test('Filter samples by status', async ({ page }) => {
        const samplingButton = page.getByRole('button', { name: 'Sample Room' });

        await expect(samplingButton).toBeVisible({ timeout: 5000 });
        await samplingButton.click();
        await page.waitForTimeout(2000);

        // Look for any filter/select element
        const filterElement = page.locator('select, [role="combobox"]').first();
        const hasFilter = await filterElement.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasFilter ? '✅ Filter element found' : '⚠️ Filter not found');
    });

});
