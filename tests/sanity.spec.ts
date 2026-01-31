import { test, expect } from '@playwright/test';
import { login, navigateToOrderManagement } from './utils/helpers';

test('Sanity Check', async ({ page }) => {
    console.log('Navigating to root...');
    await page.goto('/');

    // Handle login if needed
    await login(page);

    // Navigate to Order Management to see New Order button
    await navigateToOrderManagement(page);

    console.log('Checking for New Order button...');
    await expect(page.getByRole('button', { name: 'New Order' })).toBeVisible({ timeout: 10000 });
    console.log('✅ Sanity Passed');
});
