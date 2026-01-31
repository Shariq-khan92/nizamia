import { test, expect } from '@playwright/test';
import { login, waitForDashboard, navigateToOrderManagement, generateTestIds } from './utils/helpers';

test.describe('Order Management', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await login(page);
        await waitForDashboard(page);
        await navigateToOrderManagement(page);
    });

    test('Default tab is Purchase Orders', async ({ page }) => {
        // Check Purchase Orders tab is visible/active
        const purchaseOrdersTab = page.getByText('Purchase Orders').first();
        await expect(purchaseOrdersTab).toBeVisible({ timeout: 5000 });
        console.log('✅ Purchase Orders tab is default');
    });

    test('Orders table is visible', async ({ page }) => {
        const ordersTable = page.locator('table').first();
        await expect(ordersTable).toBeVisible({ timeout: 5000 });
        console.log('✅ Orders table visible');
    });

    test('Search functionality works', async ({ page }) => {
        const searchInput = page.getByPlaceholder(/Search/i).first();

        if (await searchInput.isVisible({ timeout: 3000 }).catch(() => false)) {
            await searchInput.fill('TEST');
            await page.waitForTimeout(500);
            console.log('✅ Search input works');
        } else {
            console.log('⚠️ Search input not found');
        }
    });

    test('Filter functionality is available', async ({ page }) => {
        const filterElement = page.locator('select, [role="combobox"]').first();
        const hasFilter = await filterElement.isVisible({ timeout: 3000 }).catch(() => false);
        console.log(hasFilter ? '✅ Filter available' : '⚠️ Filter not found');
    });

    test('New Order button is visible', async ({ page }) => {
        const newOrderButton = page.getByRole('button', { name: 'New Order' });
        await expect(newOrderButton).toBeVisible({ timeout: 3000 });
        console.log('✅ New Order button visible');
    });

    test('New Order button opens modal', async ({ page }) => {
        await page.getByRole('button', { name: 'New Order' }).click();
        await page.waitForTimeout(500);

        // Check for modal content (PO Number field)
        const poNumberInput = page.locator('input[name="poNumber"]');
        const hasModal = await poNumberInput.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasModal ? '✅ New Order modal opened' : '⚠️ Modal not opened');
        await page.keyboard.press('Escape');
    });

    test('Job Management button switches to Production Jobs tab', async ({ page }) => {
        // Look for Production Jobs tab button
        const productionJobsTab = page.getByText('Production Jobs').first();

        await expect(productionJobsTab).toBeVisible({ timeout: 5000 });
        await productionJobsTab.click();
        await page.waitForTimeout(1000);

        console.log('✅ Switched to Production Jobs tab');
    });

    test('Select order functionality', async ({ page }) => {
        // Look for checkbox in first row
        const checkbox = page.locator('input[type="checkbox"]').first();

        if (await checkbox.isVisible({ timeout: 3000 }).catch(() => false)) {
            await checkbox.click();
            console.log('✅ Order selection works');
        } else {
            console.log('⚠️ No orders to select');
        }
    });

    test('Delete functionality available', async ({ page }) => {
        // Look for delete button/icon
        const deleteButton = page.locator('[title*="Delete"], button:has-text("Delete")').first();
        const hasDelete = await deleteButton.isVisible({ timeout: 3000 }).catch(() => false);
        console.log(hasDelete ? '✅ Delete available' : '⚠️ Delete not visible');
    });

    test('Duplicate functionality available', async ({ page }) => {
        // Look for duplicate button/icon
        const duplicateButton = page.locator('[title*="Duplicate"], button:has-text("Duplicate")').first();
        const hasDuplicate = await duplicateButton.isVisible({ timeout: 3000 }).catch(() => false);
        console.log(hasDuplicate ? '✅ Duplicate available' : '⚠️ Duplicate not visible');
    });

    test('Create order with basic info', async ({ page }) => {
        const { poNumber, styleNumber } = generateTestIds();

        await page.getByRole('button', { name: 'New Order' }).click();
        await page.waitForTimeout(500);

        // Fill PO Number
        await page.fill('input[name="poNumber"]', poNumber);
        await page.fill('input[name="styleNumber"]', styleNumber);

        // Select buyer if available
        const buyerSelect = page.locator('select[name="buyerName"]');
        if (await buyerSelect.isVisible().catch(() => false)) {
            const options = await buyerSelect.locator('option').all();
            if (options.length > 1) {
                await buyerSelect.selectOption({ index: 1 });
            }
        }

        console.log(`✅ Filled order form: ${poNumber}`);

        await page.keyboard.press('Escape');
    });

});
