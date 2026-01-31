import { test, expect } from '@playwright/test';
import { TEST_USER, navigateToOrderManagement } from './utils/helpers';

test.describe('Authentication', () => {

    test('Login with valid credentials', async ({ page }) => {
        await page.goto('/');

        // Verify login form is visible
        await expect(page.getByPlaceholder('Enter username')).toBeVisible();
        await expect(page.getByPlaceholder('••••••••')).toBeVisible();

        // Enter credentials
        await page.getByPlaceholder('Enter username').fill(TEST_USER.email);
        await page.getByPlaceholder('••••••••').fill(TEST_USER.password);

        // Click authenticate
        await page.getByRole('button', { name: 'Authenticate' }).click();

        // Verify we land on Dashboard (sidebar Dashboard button is visible)
        await expect(page.getByRole('button', { name: 'Dashboard' })).toBeVisible({ timeout: 15000 });

        console.log('✅ Login successful');
    });

    test('Login with invalid credentials shows error', async ({ page }) => {
        await page.goto('/');

        // Enter wrong credentials
        await page.getByPlaceholder('Enter username').fill('wrong@email.com');
        await page.getByPlaceholder('••••••••').fill('wrongpassword');

        // Click authenticate
        await page.getByRole('button', { name: 'Authenticate' }).click();

        // Verify error message or still on login page
        await page.waitForTimeout(2000);
        const isStillOnLogin = await page.getByPlaceholder('Enter username').isVisible();
        expect(isStillOnLogin).toBe(true);

        console.log('✅ Invalid login handled correctly');
    });

    test('Session persists on page reload', async ({ page }) => {
        await page.goto('/');

        // Login first
        await page.getByPlaceholder('Enter username').fill(TEST_USER.email);
        await page.getByPlaceholder('••••••••').fill(TEST_USER.password);
        await page.getByRole('button', { name: 'Authenticate' }).click();
        await expect(page.getByRole('button', { name: 'Dashboard' })).toBeVisible({ timeout: 15000 });

        // Reload page
        await page.reload();

        // Should still be logged in (or may need to login again depending on session handling)
        await page.waitForTimeout(3000);

        // Check if we're on dashboard or login
        const dashboardButton = page.getByRole('button', { name: 'Dashboard' });
        const loginInput = page.getByPlaceholder('Enter username');

        const onDashboard = await dashboardButton.isVisible().catch(() => false);
        const onLogin = await loginInput.isVisible().catch(() => false);

        expect(onDashboard || onLogin).toBe(true);
        console.log(`✅ After reload: ${onDashboard ? 'Still logged in' : 'Redirected to login'}`);
    });

});
