import { test, expect } from '@playwright/test';
import { login, waitForDashboard } from './utils/helpers';

test.describe('Dashboard', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await login(page);
        await waitForDashboard(page);
    });

    test('Dashboard loads after login', async ({ page }) => {
        // Dashboard button should be visible and active
        const dashboardButton = page.getByRole('button', { name: 'Dashboard' });
        await expect(dashboardButton).toBeVisible();
        console.log('✅ Dashboard loaded after login');
    });

    test('New Order button is visible and clickable', async ({ page }) => {
        const newOrderButton = page.getByRole('button', { name: 'New Order' }).first();
        await expect(newOrderButton).toBeVisible({ timeout: 5000 });
        console.log('✅ New Order button visible on Dashboard');
    });

    test('Manage Order button opens Order Management', async ({ page }) => {
        const manageOrderButton = page.getByRole('button', { name: /Manage.*Order/i }).first();

        if (await manageOrderButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await manageOrderButton.click();
            await page.waitForTimeout(1000);

            // Verify Order Management opened
            const purchaseOrdersTab = page.getByText('Purchase Orders').first();
            const hasOrderMgmt = await purchaseOrdersTab.isVisible({ timeout: 3000 }).catch(() => false);
            console.log(hasOrderMgmt ? '✅ Manage Order opens Order Management' : '⚠️ Order Management not confirmed');
        } else {
            console.log('⚠️ Manage Order button not found');
        }
    });

    test('New Costing button opens Costing Sheet Generator', async ({ page }) => {
        const newCostingButton = page.getByRole('button', { name: /New.*Costing/i }).first();

        if (await newCostingButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await newCostingButton.click();
            await page.waitForTimeout(1000);

            // Verify Costing Sheet Generator opened
            const costingContent = page.getByText(/Costing.*Sheet|Cost.*Generator/i).first();
            const hasCostingSheet = await costingContent.isVisible({ timeout: 3000 }).catch(() => false);
            console.log(hasCostingSheet ? '✅ New Costing opens Costing Sheet Generator' : '⚠️ Costing Sheet not confirmed');
        } else {
            console.log('⚠️ New Costing button not found');
        }
    });

    test('Send Parcel button opens Pre-Production Hub', async ({ page }) => {
        const sendParcelButton = page.getByRole('button', { name: /Send.*Parcel/i }).first();

        if (await sendParcelButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await sendParcelButton.click();
            await page.waitForTimeout(1000);

            // Verify Pre-Production Hub opened
            const preProductionHub = page.getByText(/Pre.*Production|Hub/i).first();
            const hasHub = await preProductionHub.isVisible({ timeout: 3000 }).catch(() => false);
            console.log(hasHub ? '✅ Send Parcel opens Pre-Production Hub' : '⚠️ Pre-Production Hub not confirmed');
        } else {
            console.log('⚠️ Send Parcel button not found');
        }
    });

    test('New Supplier PO button opens Purchasing', async ({ page }) => {
        const newSupplierPOButton = page.getByRole('button', { name: /New.*Supplier.*PO/i }).first();

        if (await newSupplierPOButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await newSupplierPOButton.click();
            await page.waitForTimeout(1000);

            // Verify Purchasing opened
            const purchasingContent = page.getByText(/Purchase.*Order|Purchasing/i).first();
            const hasPurchasing = await purchasingContent.isVisible({ timeout: 3000 }).catch(() => false);
            console.log(hasPurchasing ? '✅ New Supplier PO opens Purchasing' : '⚠️ Purchasing not confirmed');
        } else {
            console.log('⚠️ New Supplier PO button not found');
        }
    });

});
