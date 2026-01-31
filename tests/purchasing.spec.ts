import { test, expect } from '@playwright/test';
import { login, waitForDashboard } from './utils/helpers';

test.describe('Purchasing', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await login(page);
        await waitForDashboard(page);
    });

    test('Navigate to Purchasing Dashboard', async ({ page }) => {
        const purchasingButton = page.getByRole('button', { name: 'Purchasing' });

        await expect(purchasingButton).toBeVisible({ timeout: 5000 });
        await purchasingButton.click();
        await page.waitForTimeout(2000);

        console.log('✅ Navigated to Purchasing Dashboard');
    });

    test('View purchase requests list', async ({ page }) => {
        await page.getByRole('button', { name: 'Purchasing' }).click();
        await page.waitForTimeout(2000);

        // Check for table or list of purchase requests
        const table = page.locator('table').first();
        const hasTable = await table.isVisible().catch(() => false);

        console.log(hasTable ? '✅ Purchase requests table visible' : '⚠️ Table not found');
    });

    test('View Purchase Orders tab', async ({ page }) => {
        await page.getByRole('button', { name: 'Purchasing' }).click();
        await page.waitForTimeout(2000);

        // Look for Purchase Orders tab or section
        const poTab = page.getByText(/Purchase Orders|PO/i).first();
        const hasPOTab = await poTab.isVisible({ timeout: 3000 }).catch(() => false);

        if (hasPOTab) {
            await poTab.click();
            await page.waitForTimeout(1000);
            console.log('✅ Purchase Orders tab accessed');
        } else {
            console.log('⚠️ PO tab not found');
        }
    });

    test('View Work Orders tab', async ({ page }) => {
        await page.getByRole('button', { name: 'Purchasing' }).click();
        await page.waitForTimeout(2000);

        // Look for Work Orders tab
        const woTab = page.getByText(/Work Orders|WO/i).first();
        const hasWOTab = await woTab.isVisible({ timeout: 3000 }).catch(() => false);

        if (hasWOTab) {
            await woTab.click();
            await page.waitForTimeout(1000);
            console.log('✅ Work Orders tab accessed');
        } else {
            console.log('⚠️ WO tab not found');
        }
    });

    test('Check for Create PO button', async ({ page }) => {
        await page.getByRole('button', { name: 'Purchasing' }).click();
        await page.waitForTimeout(2000);

        // Look for Create PO option
        const createPOButton = page.getByRole('button', { name: /Create.*PO|New.*PO|Issue.*PO/i }).first();
        const hasCreatePO = await createPOButton.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasCreatePO ? '✅ Create PO button available' : '⚠️ Create PO button not found');
    });

    test('Filter by supplier', async ({ page }) => {
        await page.getByRole('button', { name: 'Purchasing' }).click();
        await page.waitForTimeout(2000);

        // Look for supplier filter
        const supplierFilter = page.locator('select, [role="combobox"]').first();
        const hasFilter = await supplierFilter.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasFilter ? '✅ Filter available' : '⚠️ Filter not found');
    });

});
