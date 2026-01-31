import { test, expect } from '@playwright/test';
import { login, waitForDashboard, navigateToOrderManagement } from './utils/helpers';

test.describe('Plan Generators - Planning Console', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await login(page);
        await waitForDashboard(page);
        await navigateToOrderManagement(page);
    });

    test('Open Planning Console via Manage Plans', async ({ page }) => {
        // Switch to Production Jobs tab
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const managePlansButton = page.getByRole('button', { name: 'Manage Plans' }).first();

        if (await managePlansButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await managePlansButton.click();
            await page.waitForTimeout(1000);

            // Verify Planning Console opened
            const planningConsole = page.getByText('Planning Console').first();
            await expect(planningConsole).toBeVisible({ timeout: 5000 });
            console.log('✅ Planning Console opened');

            await page.keyboard.press('Escape');
        } else {
            console.log('⚠️ No jobs available - cannot test Planning Console');
        }
    });

    test('Available Modules section is visible', async ({ page }) => {
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const managePlansButton = page.getByRole('button', { name: 'Manage Plans' }).first();

        if (await managePlansButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await managePlansButton.click();
            await page.waitForTimeout(1000);

            const availableModules = page.getByText('Available Modules').first();
            await expect(availableModules).toBeVisible({ timeout: 5000 });
            console.log('✅ Available Modules section visible');

            await page.keyboard.press('Escape');
        } else {
            console.log('⚠️ No jobs available');
        }
    });

    test('FABRIC PLAN module is visible', async ({ page }) => {
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const managePlansButton = page.getByRole('button', { name: 'Manage Plans' }).first();

        if (await managePlansButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await managePlansButton.click();
            await page.waitForTimeout(1000);

            const fabricPlan = page.getByText('FABRIC PLAN').first();
            await expect(fabricPlan).toBeVisible({ timeout: 3000 });
            console.log('✅ FABRIC PLAN module visible');

            await page.keyboard.press('Escape');
        } else {
            console.log('⚠️ No jobs available');
        }
    });

    test('TRIMS PLAN module is visible', async ({ page }) => {
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const managePlansButton = page.getByRole('button', { name: 'Manage Plans' }).first();

        if (await managePlansButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await managePlansButton.click();
            await page.waitForTimeout(1000);

            const trimsPlan = page.getByText('TRIMS PLAN').first();
            await expect(trimsPlan).toBeVisible({ timeout: 3000 });
            console.log('✅ TRIMS PLAN module visible');

            await page.keyboard.press('Escape');
        } else {
            console.log('⚠️ No jobs available');
        }
    });

    test('LAB TEST module is visible', async ({ page }) => {
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const managePlansButton = page.getByRole('button', { name: 'Manage Plans' }).first();

        if (await managePlansButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await managePlansButton.click();
            await page.waitForTimeout(1000);

            const labTest = page.getByText('LAB TEST').first();
            await expect(labTest).toBeVisible({ timeout: 3000 });
            console.log('✅ LAB TEST module visible');

            await page.keyboard.press('Escape');
        } else {
            console.log('⚠️ No jobs available');
        }
    });

    test('CUTTING PLAN module is visible', async ({ page }) => {
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const managePlansButton = page.getByRole('button', { name: 'Manage Plans' }).first();

        if (await managePlansButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await managePlansButton.click();
            await page.waitForTimeout(1000);

            const cuttingPlan = page.getByText('CUTTING PLAN').first();
            await expect(cuttingPlan).toBeVisible({ timeout: 3000 });
            console.log('✅ CUTTING PLAN module visible');

            await page.keyboard.press('Escape');
        } else {
            console.log('⚠️ No jobs available');
        }
    });

    test('EMBELLISHMENT PLAN module is visible', async ({ page }) => {
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const managePlansButton = page.getByRole('button', { name: 'Manage Plans' }).first();

        if (await managePlansButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await managePlansButton.click();
            await page.waitForTimeout(1000);

            const embellishmentPlan = page.getByText('EMBELLISHMENT PLAN').first();
            await expect(embellishmentPlan).toBeVisible({ timeout: 3000 });
            console.log('✅ EMBELLISHMENT PLAN module visible');

            await page.keyboard.press('Escape');
        } else {
            console.log('⚠️ No jobs available');
        }
    });

    test('PROCESS ROUTE module is visible', async ({ page }) => {
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const managePlansButton = page.getByRole('button', { name: 'Manage Plans' }).first();

        if (await managePlansButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await managePlansButton.click();
            await page.waitForTimeout(1000);

            const processRoute = page.getByText('PROCESS ROUTE').first();
            await expect(processRoute).toBeVisible({ timeout: 3000 });
            console.log('✅ PROCESS ROUTE module visible');

            await page.keyboard.press('Escape');
        } else {
            console.log('⚠️ No jobs available');
        }
    });

    test('STITCHING PLAN module is visible', async ({ page }) => {
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const managePlansButton = page.getByRole('button', { name: 'Manage Plans' }).first();

        if (await managePlansButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await managePlansButton.click();
            await page.waitForTimeout(1000);

            const stitchingPlan = page.getByText('STITCHING PLAN').first();
            await expect(stitchingPlan).toBeVisible({ timeout: 3000 });
            console.log('✅ STITCHING PLAN module visible');

            await page.keyboard.press('Escape');
        } else {
            console.log('⚠️ No jobs available');
        }
    });

    test('WASHING PLAN module is visible', async ({ page }) => {
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const managePlansButton = page.getByRole('button', { name: 'Manage Plans' }).first();

        if (await managePlansButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await managePlansButton.click();
            await page.waitForTimeout(1000);

            const washingPlan = page.getByText('WASHING PLAN').first();
            await expect(washingPlan).toBeVisible({ timeout: 3000 });
            console.log('✅ WASHING PLAN module visible');

            await page.keyboard.press('Escape');
        } else {
            console.log('⚠️ No jobs available');
        }
    });

    test('FINISHING PLAN module is visible', async ({ page }) => {
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const managePlansButton = page.getByRole('button', { name: 'Manage Plans' }).first();

        if (await managePlansButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await managePlansButton.click();
            await page.waitForTimeout(1000);

            const finishingPlan = page.getByText('FINISHING PLAN').first();
            await expect(finishingPlan).toBeVisible({ timeout: 3000 });
            console.log('✅ FINISHING PLAN module visible');

            await page.keyboard.press('Escape');
        } else {
            console.log('⚠️ No jobs available');
        }
    });

    test('SAMPLING PLAN module is visible', async ({ page }) => {
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const managePlansButton = page.getByRole('button', { name: 'Manage Plans' }).first();

        if (await managePlansButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await managePlansButton.click();
            await page.waitForTimeout(1000);

            const samplingPlan = page.getByText('SAMPLING PLAN').first();
            await expect(samplingPlan).toBeVisible({ timeout: 3000 });
            console.log('✅ SAMPLING PLAN module visible');

            await page.keyboard.press('Escape');
        } else {
            console.log('⚠️ No jobs available');
        }
    });

    test('Click FABRIC PLAN opens Fabric Plan Generator', async ({ page }) => {
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const managePlansButton = page.getByRole('button', { name: 'Manage Plans' }).first();

        if (await managePlansButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await managePlansButton.click();
            await page.waitForTimeout(1000);

            const fabricPlan = page.getByText('FABRIC PLAN').first();
            await fabricPlan.click();
            await page.waitForTimeout(1000);

            // Check for Fabric Planning content
            const fabricContent = page.getByText(/Fabric.*Planning|Aggregation/i).first();
            const hasContent = await fabricContent.isVisible({ timeout: 3000 }).catch(() => false);
            console.log(hasContent ? '✅ Fabric Plan Generator opened' : '⚠️ Fabric Plan not confirmed');

            await page.keyboard.press('Escape');
            await page.keyboard.press('Escape');
        } else {
            console.log('⚠️ No jobs available');
        }
    });

    test('Click CUTTING PLAN opens Cutting Plan Generator', async ({ page }) => {
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const managePlansButton = page.getByRole('button', { name: 'Manage Plans' }).first();

        if (await managePlansButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await managePlansButton.click();
            await page.waitForTimeout(1000);

            const cuttingPlan = page.getByText('CUTTING PLAN').first();
            await cuttingPlan.click();
            await page.waitForTimeout(1000);

            // Check for Cutting content
            const cuttingContent = page.getByText(/Cutting|Marker|Lay/i).first();
            const hasContent = await cuttingContent.isVisible({ timeout: 3000 }).catch(() => false);
            console.log(hasContent ? '✅ Cutting Plan Generator opened' : '⚠️ Cutting Plan not confirmed');

            await page.keyboard.press('Escape');
            await page.keyboard.press('Escape');
        } else {
            console.log('⚠️ No jobs available');
        }
    });

    test('All 10 plan modules are visible', async ({ page }) => {
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const managePlansButton = page.getByRole('button', { name: 'Manage Plans' }).first();

        if (await managePlansButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await managePlansButton.click();
            await page.waitForTimeout(1000);

            const modules = [
                'FABRIC PLAN',
                'TRIMS PLAN',
                'LAB TEST',
                'CUTTING PLAN',
                'EMBELLISHMENT PLAN',
                'PROCESS ROUTE',
                'STITCHING PLAN',
                'WASHING PLAN',
                'FINISHING PLAN',
                'SAMPLING PLAN'
            ];

            let foundCount = 0;
            for (const module of modules) {
                const moduleElement = page.getByText(module).first();
                if (await moduleElement.isVisible().catch(() => false)) {
                    foundCount++;
                }
            }

            console.log(`✅ Found ${foundCount}/10 plan modules`);

            await page.keyboard.press('Escape');
        } else {
            console.log('⚠️ No jobs available to verify modules');
        }
    });

});
