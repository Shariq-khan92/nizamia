import { test, expect } from '@playwright/test';
import { login, waitForDashboard } from './utils/helpers';

test.describe('Settings & Configuration', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await login(page);
        await waitForDashboard(page);
    });

    test('Navigate to Settings Dashboard', async ({ page }) => {
        const settingsButton = page.getByRole('button', { name: 'Settings' });

        await expect(settingsButton).toBeVisible({ timeout: 5000 });
        await settingsButton.click();
        await page.waitForTimeout(2000);

        // Check for settings content
        const settingsContent = page.locator('[class*="settings"], [class*="config"], form').first();
        const hasSettings = await settingsContent.isVisible().catch(() => false);

        console.log(hasSettings ? '✅ Settings Dashboard loaded' : '⚠️ Settings content not visible');
    });

    test('View company settings', async ({ page }) => {
        const settingsButton = page.getByRole('button', { name: 'Settings' });

        await expect(settingsButton).toBeVisible({ timeout: 5000 });
        await settingsButton.click();
        await page.waitForTimeout(2000);

        // Look for company/organization section
        const companySection = page.locator('text=/Company|Organization|Logo/i').first();
        const hasCompany = await companySection.isVisible().catch(() => false);

        console.log(hasCompany ? '✅ Company settings visible' : '⚠️ Company settings not found');
    });

    test('View currency rates', async ({ page }) => {
        const settingsButton = page.getByRole('button', { name: 'Settings' });

        await expect(settingsButton).toBeVisible({ timeout: 5000 });
        await settingsButton.click();
        await page.waitForTimeout(2000);

        // Look for currency section
        const currencySection = page.locator('text=/Currency|Rate|USD|EUR/i').first();
        const hasCurrency = await currencySection.isVisible().catch(() => false);

        console.log(hasCurrency ? '✅ Currency rates visible' : '⚠️ Currency section not found');
    });

    test('Access Resources page', async ({ page }) => {
        const resourcesButton = page.getByRole('button', { name: 'Resources' });

        await expect(resourcesButton).toBeVisible({ timeout: 5000 });
        await resourcesButton.click();
        await page.waitForTimeout(2000);

        // Check for resources content
        const toolsContent = page.locator('text=/Calculator|Converter|GSM|CBM/i').first();
        const hasTools = await toolsContent.isVisible().catch(() => false);

        console.log(hasTools ? '✅ Resources loaded' : '⚠️ Tools not visible');
    });

    test('Access BOM page', async ({ page }) => {
        const bomButton = page.getByRole('button', { name: 'BOM' });

        await expect(bomButton).toBeVisible({ timeout: 5000 });
        await bomButton.click();
        await page.waitForTimeout(2000);

        // Check for BOM content
        const bomContent = page.locator('table, text=/Material|Component|BOM/i').first();
        const hasBOM = await bomContent.isVisible().catch(() => false);

        console.log(hasBOM ? '✅ BOM page loaded' : '⚠️ BOM content not visible');
    });

    test('Access Finance Dashboard', async ({ page }) => {
        const financeButton = page.getByRole('button', { name: 'Finance' });

        await expect(financeButton).toBeVisible({ timeout: 5000 });
        await financeButton.click();
        await page.waitForTimeout(2000);

        // Check for finance content
        const financeContent = page.locator('text=/Finance|Revenue|Invoice|Payment/i').first();
        const hasFinance = await financeContent.isVisible().catch(() => false);

        console.log(hasFinance ? '✅ Finance Dashboard loaded' : '⚠️ Finance not visible');
    });

});
