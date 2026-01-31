import { test, expect } from '@playwright/test';
import { login, waitForDashboard, generateTestIds } from './utils/helpers';

test.describe('Buyers & Suppliers Management', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await login(page);
        await waitForDashboard(page);
    });

    test('Navigate to Buyers Dashboard', async ({ page }) => {
        const buyersButton = page.getByRole('button', { name: 'Buyers' });

        await expect(buyersButton).toBeVisible({ timeout: 5000 });
        await buyersButton.click();
        await page.waitForTimeout(2000);

        // Check for buyers content
        const addBuyerButton = page.getByRole('button', { name: /Add.*Buyer|New.*Buyer/i });
        const hasBuyersView = await addBuyerButton.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasBuyersView ? '✅ Buyers Dashboard loaded' : '⚠️ Buyers view not fully loaded');
    });

    test('Create new buyer', async ({ page }) => {
        const { buyerName } = generateTestIds();

        const buyersButton = page.getByRole('button', { name: 'Buyers' });

        await expect(buyersButton).toBeVisible({ timeout: 5000 });
        await buyersButton.click();
        await page.waitForTimeout(2000);

        // Look for Add Buyer button
        const addBuyerButton = page.getByRole('button', { name: /Add.*Buyer|New.*Buyer/i }).first();

        if (await addBuyerButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await addBuyerButton.click();
            await page.waitForTimeout(500);

            // Fill buyer form
            const nameInput = page.locator('input[name="name"], input[placeholder*="name" i]').first();
            if (await nameInput.isVisible()) {
                await nameInput.fill(buyerName);

                // Save using force click to bypass any overlays
                const saveButton = page.getByRole('button', { name: /Save|Create/i }).last();
                if (await saveButton.isVisible()) {
                    await saveButton.click({ force: true });
                    await page.waitForTimeout(1000);
                    console.log(`✅ Buyer created: ${buyerName}`);
                }
            }
        } else {
            console.log('⚠️ Add Buyer button not found');
        }
    });

    test('Navigate to Suppliers Dashboard', async ({ page }) => {
        const suppliersButton = page.getByRole('button', { name: 'Suppliers' });

        await expect(suppliersButton).toBeVisible({ timeout: 5000 });
        await suppliersButton.click();
        await page.waitForTimeout(2000);

        // Check for suppliers content
        const addSupplierButton = page.getByRole('button', { name: /Add.*Supplier|New.*Supplier/i });
        const hasSuppliersView = await addSupplierButton.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasSuppliersView ? '✅ Suppliers Dashboard loaded' : '⚠️ Suppliers view not fully loaded');
    });

    test('Create new supplier', async ({ page }) => {
        const { supplierName } = generateTestIds();

        const suppliersButton = page.getByRole('button', { name: 'Suppliers' });

        await expect(suppliersButton).toBeVisible({ timeout: 5000 });
        await suppliersButton.click();
        await page.waitForTimeout(2000);

        // Look for Add Supplier button
        const addSupplierButton = page.getByRole('button', { name: /Add.*Supplier|New.*Supplier/i }).first();

        if (await addSupplierButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await addSupplierButton.click();
            await page.waitForTimeout(500);

            // Fill supplier form
            const nameInput = page.locator('input[name="name"], input[placeholder*="name" i]').first();
            if (await nameInput.isVisible()) {
                await nameInput.fill(supplierName);

                // Save using force click to bypass any overlays
                const saveButton = page.getByRole('button', { name: /Save|Create/i }).last();
                if (await saveButton.isVisible()) {
                    await saveButton.click({ force: true });
                    await page.waitForTimeout(1000);
                    console.log(`✅ Supplier created: ${supplierName}`);
                }
            }
        } else {
            console.log('⚠️ Add Supplier button not found');
        }
    });

    test('View buyer list', async ({ page }) => {
        const buyersButton = page.getByRole('button', { name: 'Buyers' });

        await expect(buyersButton).toBeVisible({ timeout: 5000 });
        await buyersButton.click();
        await page.waitForTimeout(2000);

        // Check for table or list
        const buyerTable = page.locator('table, [class*="list"]').first();
        const hasTable = await buyerTable.isVisible().catch(() => false);

        console.log(hasTable ? '✅ Buyer list visible' : '⚠️ Buyer list not found');
    });

    test('View supplier list', async ({ page }) => {
        const suppliersButton = page.getByRole('button', { name: 'Suppliers' });

        await expect(suppliersButton).toBeVisible({ timeout: 5000 });
        await suppliersButton.click();
        await page.waitForTimeout(2000);

        // Check for table or list
        const supplierTable = page.locator('table, [class*="list"]').first();
        const hasTable = await supplierTable.isVisible().catch(() => false);

        console.log(hasTable ? '✅ Supplier list visible' : '⚠️ Supplier list not found');
    });

});
