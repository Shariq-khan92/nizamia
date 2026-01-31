import { test, expect } from '@playwright/test';
import { login, navigateToOrderManagement } from './utils/helpers';

test('Order Creation with Size Groups and BOM', async ({ page }) => {
    // Navigate to App
    await page.goto('/');

    // --- LOGIN IF REQUIRED ---
    const usernameInput = page.getByPlaceholder('Enter username');
    if (await usernameInput.isVisible()) {
        console.log('Login required. logging in...');
        await usernameInput.fill('admin@nizamia.com');
        await page.getByPlaceholder('••••••••').fill('admin123');
        await page.getByRole('button', { name: 'Authenticate' }).click();
        await expect(page.getByRole('button', { name: 'Dashboard' })).toBeVisible({ timeout: 15000 });
    }

    // Navigate to Order Management
    await navigateToOrderManagement(page);

    // Generate unique IDs
    const PO_NUMBER = `PO-${Date.now()}`;
    const STYLE_NUMBER = `STYLE-${Date.now()}`;

    // --- CREATE ORDER ---
    console.log('Waiting for Dashboard...');
    await expect(page.getByRole('button', { name: 'New Order' })).toBeVisible({ timeout: 20000 });
    await page.waitForTimeout(3000); // Wait for data to load

    console.log('Creating Order...');
    await page.getByRole('button', { name: 'New Order' }).click();

    // Fill General Info
    console.log('Filling General Info...');
    await page.fill('input[name="poNumber"]', PO_NUMBER);
    await page.fill('input[name="styleNumber"]', STYLE_NUMBER);
    await page.selectOption('select[name="buyerName"]', { label: 'Test Buyer' });

    // --- ADD SIZE GROUP ---
    console.log('Adding Size Group...');
    await page.getByRole('button', { name: 'Add New Size Group' }).click();
    await page.waitForTimeout(500);

    // Fill in quantity for sizes (default: 30, 32, 34, 36)
    console.log('Filling Quantity Matrix...');
    const quantityInputs = page.locator('table input[type="number"]');
    await quantityInputs.first().fill('100');
    await quantityInputs.nth(1).fill('150');
    await quantityInputs.nth(2).fill('200');
    await quantityInputs.nth(3).fill('50');

    // Go to BOM Tab
    console.log('Going to BOM Tab...');
    await page.getByRole('button', { name: 'BOM' }).last().click();

    // Add Fabric Item
    console.log('Adding Fabric Item...');
    const fabricSection = page.locator('.bg-white', { has: page.locator('h3', { hasText: 'Fabric' }) }).first();
    await fabricSection.getByRole('button', { name: 'Add Item' }).first().click();

    // Fill BOM Row
    await page.fill('input[placeholder="Material Name"]', 'Cotton Jersey 180GSM');
    await page.fill('input[placeholder="0.00"]', '1.5');
    await page.waitForTimeout(1000);

    // Navigate to Finalize tab
    console.log('Going to Finalize Tab...');
    await page.getByRole('button', { name: 'Finalize' }).click();
    await page.waitForTimeout(500);

    // Save Order
    console.log('Saving Order...');
    await page.getByRole('button', { name: 'Confirm & Release PO' }).click();

    // Wait for modal to close
    console.log('Waiting for modal to close...');
    await expect(page.getByRole('button', { name: 'New Order' })).toBeVisible({ timeout: 10000 });

    console.log('✅ Order creation with size groups completed!');
    console.log(`📝 PO Number: ${PO_NUMBER}`);
    console.log(`📝 Style Number: ${STYLE_NUMBER}`);
    console.log(`📝 Total Quantity: 500 (100+150+200+50)`);
});
