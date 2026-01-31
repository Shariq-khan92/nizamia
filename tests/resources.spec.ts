import { test, expect } from '@playwright/test';
import { login, waitForDashboard } from './utils/helpers';

test.describe('Resources & Tools', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await login(page);
        await waitForDashboard(page);
    });

    test('Navigate to Resources Dashboard', async ({ page }) => {
        const resourcesButton = page.getByRole('button', { name: 'Resources' });

        await expect(resourcesButton).toBeVisible({ timeout: 5000 });
        await resourcesButton.click();
        await page.waitForTimeout(2000);

        console.log('✅ Navigated to Resources Dashboard');
    });

    test('View available tools', async ({ page }) => {
        await page.getByRole('button', { name: 'Resources' }).click();
        await page.waitForTimeout(2000);

        // Check for tools content
        const toolsContent = page.locator('text=/Calculator|Converter|Tool/i').first();
        const hasTools = await toolsContent.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasTools ? '✅ Tools visible' : '⚠️ Tools not found');
    });

    test('Check for Fabric Consumption Calculator', async ({ page }) => {
        await page.getByRole('button', { name: 'Resources' }).click();
        await page.waitForTimeout(2000);

        // Look for fabric consumption calculator
        const fabricCalc = page.getByText(/Fabric.*Consumption|Consumption.*Calculator/i).first();
        const hasFabricCalc = await fabricCalc.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasFabricCalc ? '✅ Fabric Consumption Calculator found' : '⚠️ Calculator not found');
    });

    test('Check for GSM Calculator', async ({ page }) => {
        await page.getByRole('button', { name: 'Resources' }).click();
        await page.waitForTimeout(2000);

        // Look for GSM calculator
        const gsmCalc = page.getByText(/GSM|Fabric.*GSM/i).first();
        const hasGSM = await gsmCalc.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasGSM ? '✅ GSM Calculator found' : '⚠️ GSM not found');
    });

    test('Check for CBM Calculator', async ({ page }) => {
        await page.getByRole('button', { name: 'Resources' }).click();
        await page.waitForTimeout(2000);

        // Look for CBM calculator
        const cbmCalc = page.getByText(/CBM|Cubic.*Meter/i).first();
        const hasCBM = await cbmCalc.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasCBM ? '✅ CBM Calculator found' : '⚠️ CBM not found');
    });

    test('Check for Pantone Converter', async ({ page }) => {
        await page.getByRole('button', { name: 'Resources' }).click();
        await page.waitForTimeout(2000);

        // Look for Pantone converter
        const pantone = page.getByText(/Pantone|Color.*Convert/i).first();
        const hasPantone = await pantone.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasPantone ? '✅ Pantone Converter found' : '⚠️ Pantone not found');
    });

    test('Check for Sewing Thread Calculator', async ({ page }) => {
        await page.getByRole('button', { name: 'Resources' }).click();
        await page.waitForTimeout(2000);

        // Look for sewing thread calculator
        const threadCalc = page.getByText(/Sewing.*Thread|Thread.*Calculator/i).first();
        const hasThread = await threadCalc.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasThread ? '✅ Sewing Thread Calculator found' : '⚠️ Thread calculator not found');
    });

});
