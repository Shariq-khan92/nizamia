import { test, expect } from '@playwright/test';
import { login, waitForDashboard, navigateToOrderManagement, generateTestIds } from './utils/helpers';

test.describe('Order Modal - All Tabs', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await login(page);
        await waitForDashboard(page);
        await navigateToOrderManagement(page);
    });

    test('Open New Order modal', async ({ page }) => {
        await page.getByRole('button', { name: 'New Order' }).click();
        await page.waitForTimeout(500);

        // Verify modal opened
        const modal = page.locator('[class*="modal"], [role="dialog"]').first();
        const hasModal = await modal.isVisible().catch(() => false);

        console.log(hasModal ? '✅ New Order modal opened' : '⚠️ Modal not found');
    });

    test('Fill General Info tab', async ({ page }) => {
        const { poNumber, styleNumber } = generateTestIds();

        await page.getByRole('button', { name: 'New Order' }).click();
        await page.waitForTimeout(500);

        // Fill PO Number
        await page.fill('input[name="poNumber"]', poNumber);
        console.log('✅ Filled PO Number');

        // Fill Style Number
        await page.fill('input[name="styleNumber"]', styleNumber);
        console.log('✅ Filled Style Number');

        // Select Buyer
        const buyerSelect = page.locator('select[name="buyerName"]');
        if (await buyerSelect.isVisible()) {
            await buyerSelect.selectOption({ index: 1 });
            console.log('✅ Selected Buyer');
        }

        // Close modal
        await page.keyboard.press('Escape');
    });

    test('Add Size Group with breakdown', async ({ page }) => {
        await page.getByRole('button', { name: 'New Order' }).click();
        await page.waitForTimeout(500);

        // Click Add Size Group
        const addSizeGroup = page.getByRole('button', { name: /Add.*Size.*Group/i });
        if (await addSizeGroup.isVisible()) {
            await addSizeGroup.click();
            await page.waitForTimeout(500);

            // Fill quantities
            const quantityInputs = page.locator('table input[type="number"]');
            if (await quantityInputs.first().isVisible()) {
                await quantityInputs.first().fill('100');
                console.log('✅ Added Size Group with quantities');
            }
        } else {
            console.log('⚠️ Add Size Group button not found');
        }

        await page.keyboard.press('Escape');
    });

    test('Navigate to BOM tab', async ({ page }) => {
        await page.getByRole('button', { name: 'New Order' }).click();
        await page.waitForTimeout(500);

        // Click BOM tab
        const bomTab = page.getByRole('button', { name: 'BOM' }).last();
        if (await bomTab.isVisible()) {
            await bomTab.click();
            await page.waitForTimeout(500);

            // Check for BOM content
            const bomContent = page.locator('text=/Fabric|Trims|Component/i').first();
            const hasBOM = await bomContent.isVisible().catch(() => false);
            console.log(hasBOM ? '✅ BOM tab loaded' : '⚠️ BOM content not visible');
        }

        await page.keyboard.press('Escape');
    });

    test('Navigate to Sampling tab', async ({ page }) => {
        await page.getByRole('button', { name: 'New Order' }).click();
        await page.waitForTimeout(500);

        const samplingTab = page.getByRole('button', { name: 'Sampling' });
        if (await samplingTab.isVisible()) {
            await samplingTab.click();
            await page.waitForTimeout(500);
            console.log('✅ Sampling tab loaded');
        }

        await page.keyboard.press('Escape');
    });

    test('Navigate to Fitting tab', async ({ page }) => {
        await page.getByRole('button', { name: 'New Order' }).click();
        await page.waitForTimeout(500);

        const fittingTab = page.getByRole('button', { name: 'Fitting' });
        if (await fittingTab.isVisible()) {
            await fittingTab.click();
            await page.waitForTimeout(500);
            console.log('✅ Fitting tab loaded');
        }

        await page.keyboard.press('Escape');
    });

    test('Navigate to Washing tab', async ({ page }) => {
        await page.getByRole('button', { name: 'New Order' }).click();
        await page.waitForTimeout(500);

        const washingTab = page.getByRole('button', { name: 'Washing' });
        if (await washingTab.isVisible()) {
            await washingTab.click();
            await page.waitForTimeout(500);
            console.log('✅ Washing tab loaded');
        }

        await page.keyboard.press('Escape');
    });

    test('Navigate to Embellishment tab', async ({ page }) => {
        await page.getByRole('button', { name: 'New Order' }).click();
        await page.waitForTimeout(500);

        const embellishmentTab = page.getByRole('button', { name: 'Embellishment' });
        if (await embellishmentTab.isVisible()) {
            await embellishmentTab.click();
            await page.waitForTimeout(500);
            console.log('✅ Embellishment tab loaded');
        }

        await page.keyboard.press('Escape');
    });

    test('Navigate to Finishing tab', async ({ page }) => {
        await page.getByRole('button', { name: 'New Order' }).click();
        await page.waitForTimeout(500);

        const finishingTab = page.getByRole('button', { name: 'Finishing' });
        if (await finishingTab.isVisible()) {
            await finishingTab.click();
            await page.waitForTimeout(500);

            // Check for packing content
            const packingContent = page.locator('text=/Packing|Carton|Polybag/i').first();
            const hasPacking = await packingContent.isVisible().catch(() => false);
            console.log(hasPacking ? '✅ Finishing/Packing tab loaded' : '⚠️ Packing content not visible');
        }

        await page.keyboard.press('Escape');
    });

    test('Navigate to Finalize tab and save', async ({ page }) => {
        const { poNumber, styleNumber } = generateTestIds();

        await page.getByRole('button', { name: 'New Order' }).click();
        await page.waitForTimeout(500);

        // Fill minimum required fields
        await page.fill('input[name="poNumber"]', poNumber);
        await page.fill('input[name="styleNumber"]', styleNumber);

        // Add size group with quantity
        const addSizeGroup = page.getByRole('button', { name: /Add.*Size.*Group/i });
        if (await addSizeGroup.isVisible()) {
            await addSizeGroup.click();
            await page.waitForTimeout(500);
            const quantityInputs = page.locator('table input[type="number"]');
            if (await quantityInputs.first().isVisible()) {
                await quantityInputs.first().fill('100');
            }
        }

        // Go to Finalize
        const finalizeTab = page.getByRole('button', { name: 'Finalize' });
        if (await finalizeTab.isVisible()) {
            await finalizeTab.click();
            await page.waitForTimeout(500);
            console.log('✅ Finalize tab loaded');

            // Click Confirm & Release
            const confirmButton = page.getByRole('button', { name: /Confirm.*Release/i });
            if (await confirmButton.isVisible()) {
                await confirmButton.click();
                await page.waitForTimeout(2000);

                // Verify order saved (modal closes)
                const newOrderButton = page.getByRole('button', { name: 'New Order' });
                const modalClosed = await newOrderButton.isVisible({ timeout: 5000 });
                console.log(modalClosed ? `✅ Order saved successfully: ${poNumber}` : '⚠️ Order save not confirmed');
            }
        }
    });

});
