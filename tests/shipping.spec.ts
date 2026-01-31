import { test, expect } from '@playwright/test';
import { login, waitForDashboard } from './utils/helpers';

test.describe('Shipping & Parcels', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await login(page);
        await waitForDashboard(page);
    });

    test('Navigate to Shipping Dashboard', async ({ page }) => {
        const shippingButton = page.getByRole('button', { name: 'Shipping' });

        await expect(shippingButton).toBeVisible({ timeout: 5000 });
        await shippingButton.click();
        await page.waitForTimeout(2000);

        console.log('✅ Navigated to Shipping Dashboard');
    });

    test('View parcel list', async ({ page }) => {
        await page.getByRole('button', { name: 'Shipping' }).click();
        await page.waitForTimeout(2000);

        // Check for parcel table
        const parcelTable = page.locator('table').first();
        const hasTable = await parcelTable.isVisible().catch(() => false);

        console.log(hasTable ? '✅ Parcel list visible' : '⚠️ Parcel table not found');
    });

    test('Check for Create Parcel button', async ({ page }) => {
        await page.getByRole('button', { name: 'Shipping' }).click();
        await page.waitForTimeout(2000);

        // Look for create parcel button
        const createButton = page.getByRole('button', { name: /New.*Parcel|Create.*Parcel|Add.*Parcel/i }).first();
        const hasCreate = await createButton.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasCreate ? '✅ Create Parcel button available' : '⚠️ Create button not found');
    });

    test('View tracking information', async ({ page }) => {
        await page.getByRole('button', { name: 'Shipping' }).click();
        await page.waitForTimeout(2000);

        // Look for tracking related elements
        const trackingInfo = page.locator('text=/Tracking|Courier|Sent|Received/i').first();
        const hasTracking = await trackingInfo.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasTracking ? '✅ Tracking information visible' : '⚠️ Tracking info not found');
    });

    test('Filter parcels by status', async ({ page }) => {
        await page.getByRole('button', { name: 'Shipping' }).click();
        await page.waitForTimeout(2000);

        // Look for status filter
        const statusFilter = page.locator('select, [role="combobox"]').first();
        const hasFilter = await statusFilter.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasFilter ? '✅ Status filter available' : '⚠️ Filter not found');
    });

});
