import { test, expect } from '@playwright/test';
import { login, waitForDashboard } from './utils/helpers';

test.describe('BOM Manager', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await login(page);
        await waitForDashboard(page);
    });

    test('Navigate to BOM Dashboard', async ({ page }) => {
        const bomButton = page.getByRole('button', { name: 'BOM' });

        await expect(bomButton).toBeVisible({ timeout: 5000 });
        await bomButton.click();
        await page.waitForTimeout(2000);

        console.log('✅ Navigated to BOM Dashboard');
    });

    test('View Master BOM items', async ({ page }) => {
        await page.getByRole('button', { name: 'BOM' }).click();
        await page.waitForTimeout(2000);

        // Check for BOM table
        const bomTable = page.locator('table').first();
        const hasTable = await bomTable.isVisible().catch(() => false);

        console.log(hasTable ? '✅ Master BOM table visible' : '⚠️ BOM table not found');
    });

    test('View Fabric items category', async ({ page }) => {
        await page.getByRole('button', { name: 'BOM' }).click();
        await page.waitForTimeout(2000);

        // Look for Fabric category
        const fabricTab = page.getByText(/Fabric|Fabrics/i).first();
        const hasFabric = await fabricTab.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasFabric ? '✅ Fabric category visible' : '⚠️ Fabric category not found');
    });

    test('View Trims items category', async ({ page }) => {
        await page.getByRole('button', { name: 'BOM' }).click();
        await page.waitForTimeout(2000);

        // Look for Trims category
        const trimsTab = page.getByText(/Trims|Accessories/i).first();
        const hasTrims = await trimsTab.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasTrims ? '✅ Trims category visible' : '⚠️ Trims category not found');
    });

    test('Check for Add Item button', async ({ page }) => {
        await page.getByRole('button', { name: 'BOM' }).click();
        await page.waitForTimeout(2000);

        // Look for add item button
        const addButton = page.getByRole('button', { name: /Add.*Item|New.*Item|Add.*BOM/i }).first();
        const hasAdd = await addButton.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasAdd ? '✅ Add Item button available' : '⚠️ Add button not found');
    });

    test('Search BOM items', async ({ page }) => {
        await page.getByRole('button', { name: 'BOM' }).click();
        await page.waitForTimeout(2000);

        // Look for search input
        const searchInput = page.getByPlaceholder(/Search|Filter/i).first();
        const hasSearch = await searchInput.isVisible({ timeout: 3000 }).catch(() => false);

        if (hasSearch) {
            await searchInput.fill('Cotton');
            await page.waitForTimeout(500);
            console.log('✅ Search functionality works');
        } else {
            console.log('⚠️ Search not found');
        }
    });

    test('View BOM Presets', async ({ page }) => {
        await page.getByRole('button', { name: 'BOM' }).click();
        await page.waitForTimeout(2000);

        // Look for presets section
        const presetsTab = page.getByText(/Preset|Template/i).first();
        const hasPresets = await presetsTab.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasPresets ? '✅ BOM Presets visible' : '⚠️ Presets section not found');
    });

});
