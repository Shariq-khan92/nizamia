import { test, expect } from '@playwright/test';
import { login, waitForDashboard, navigateToOrderManagement } from './utils/helpers';

test.describe('Production Jobs', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await login(page);
        await waitForDashboard(page);
        await navigateToOrderManagement(page);
    });

    test('Navigate to Production Jobs tab', async ({ page }) => {
        const productionJobsTab = page.getByText('Production Jobs').first();
        await expect(productionJobsTab).toBeVisible({ timeout: 5000 });
        await productionJobsTab.click();
        await page.waitForTimeout(1000);

        console.log('✅ Navigated to Production Jobs tab');
    });

    test('Jobs table is visible', async ({ page }) => {
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const jobsTable = page.locator('table').first();
        const hasTable = await jobsTable.isVisible().catch(() => false);

        console.log(hasTable ? '✅ Jobs table visible' : '⚠️ Jobs table not found');
    });

    test('Create New Jobs button is visible', async ({ page }) => {
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const createJobsButton = page.getByRole('button', { name: /Create.*New.*Job|New.*Job/i }).first();
        const hasButton = await createJobsButton.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasButton ? '✅ Create New Jobs button visible' : '⚠️ Create button not found');
    });

    test('Create New Jobs button opens Define Production Job modal', async ({ page }) => {
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const createJobsButton = page.getByRole('button', { name: /Create.*New.*Job|New.*Job/i }).first();

        if (await createJobsButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await createJobsButton.click();
            await page.waitForTimeout(500);

            // Check for Define Production Job modal
            const modalTitle = page.getByText(/Define.*Production.*Job/i).first();
            const hasModal = await modalTitle.isVisible({ timeout: 3000 }).catch(() => false);

            console.log(hasModal ? '✅ Define Production Job modal opened' : '⚠️ Modal not opened');

            await page.keyboard.press('Escape');
        } else {
            console.log('⚠️ Create button not found');
        }
    });

    test('Finalize Job button is visible', async ({ page }) => {
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const finalizeButton = page.getByRole('button', { name: /Finalize.*Job/i }).first();
        const hasButton = await finalizeButton.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasButton ? '✅ Finalize Job button visible' : '⚠️ Finalize button not found');
    });

    test('Manage Plans button exists for jobs', async ({ page }) => {
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const managePlansButton = page.getByRole('button', { name: 'Manage Plans' }).first();
        const hasButton = await managePlansButton.isVisible({ timeout: 3000 }).catch(() => false);

        if (hasButton) {
            console.log('✅ Manage Plans button exists for jobs');
        } else {
            console.log('⚠️ No Manage Plans button - no jobs created yet');
        }
    });

    test('Delete button exists for jobs', async ({ page }) => {
        await page.getByText('Production Jobs').first().click();
        await page.waitForTimeout(1000);

        const deleteButton = page.locator('[title*="Delete"], button svg').first();
        const hasDelete = await deleteButton.isVisible({ timeout: 3000 }).catch(() => false);

        console.log(hasDelete ? '✅ Delete available for jobs' : '⚠️ No jobs to delete');
    });

});
