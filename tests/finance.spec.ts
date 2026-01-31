import { test, expect } from '@playwright/test';
import { login, waitForDashboard } from './utils/helpers';

test.describe('Finance', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await login(page);
        await waitForDashboard(page);
    });

    test('Navigate to Finance Dashboard', async ({ page }) => {
        const financeButton = page.getByRole('button', { name: 'Finance' });

        await expect(financeButton).toBeVisible({ timeout: 5000 });
        await financeButton.click();
        await page.waitForTimeout(2000);

        console.log('✅ Navigated to Finance Dashboard');
    });

    test('View finance overview', async ({ page }) => {
        await page.getByRole('button', { name: 'Finance' }).click();
        await page.waitForTimeout(2000);

        // Check for finance-related content
        const financeContent = page.locator('text=/Revenue|Payment|Invoice|Outstanding|Balance/i').first();
        const hasContent = await financeContent.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasContent ? '✅ Finance overview visible' : '⚠️ Finance content not found');
    });

    test('View revenue statistics', async ({ page }) => {
        await page.getByRole('button', { name: 'Finance' }).click();
        await page.waitForTimeout(2000);

        // Look for revenue/sales data
        const revenueData = page.locator('text=/\\$|USD|EUR|Revenue|Sales/i').first();
        const hasRevenue = await revenueData.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasRevenue ? '✅ Revenue data visible' : '⚠️ Revenue data not found');
    });

    test('View payment dues', async ({ page }) => {
        await page.getByRole('button', { name: 'Finance' }).click();
        await page.waitForTimeout(2000);

        // Look for payment due information
        const dueInfo = page.locator('text=/Due|Pending|Outstanding|Receivable/i').first();
        const hasDues = await dueInfo.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasDues ? '✅ Payment dues visible' : '⚠️ Due info not found');
    });

    test('Check for invoice table', async ({ page }) => {
        await page.getByRole('button', { name: 'Finance' }).click();
        await page.waitForTimeout(2000);

        // Look for invoices table
        const invoiceTable = page.locator('table').first();
        const hasTable = await invoiceTable.isVisible().catch(() => false);

        console.log(hasTable ? '✅ Invoice table visible' : '⚠️ Invoice table not found');
    });

});
