import { Page, expect } from '@playwright/test';

/**
 * Shared test utilities for E2E tests
 */

// Test credentials
export const TEST_USER = {
    email: 'admin@nizamia.com',
    password: 'admin123'
};

/**
 * Login to the application if not already logged in
 * After login, the app lands on Dashboard (not Order Management)
 */
export async function login(page: Page): Promise<void> {
    const usernameInput = page.getByPlaceholder('Enter username');
    if (await usernameInput.isVisible({ timeout: 2000 }).catch(() => false)) {
        console.log('Login form detected, logging in...');
        await usernameInput.fill(TEST_USER.email);
        await page.getByPlaceholder('••••••••').fill(TEST_USER.password);
        await page.getByRole('button', { name: 'Authenticate' }).click();

        // Wait for sidebar to appear (indicates successful login)
        // The sidebar has "Dashboard" button which is always visible after login
        await expect(page.getByRole('button', { name: 'Dashboard' })).toBeVisible({ timeout: 15000 });
        console.log('Login successful, on Dashboard');
    }
}

/**
 * Navigate to Order Management and wait for it to load
 */
export async function navigateToOrderManagement(page: Page): Promise<void> {
    await page.getByRole('button', { name: 'Order Management' }).click();
    await expect(page.getByRole('button', { name: 'New Order' })).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(1000); // Allow data to load
}

/**
 * Wait for the main dashboard to fully load (Dashboard view, not Order Management)
 */
export async function waitForDashboard(page: Page): Promise<void> {
    await expect(page.getByRole('button', { name: 'Dashboard' })).toBeVisible({ timeout: 20000 });
    await page.waitForTimeout(1000); // Allow data to load
}

/**
 * Navigate to Order Management and wait for New Order button
 */
export async function waitForOrderManagement(page: Page): Promise<void> {
    await navigateToOrderManagement(page);
    await page.waitForTimeout(1000); // Allow data to load
}

/**
 * Generate unique test identifiers
 */
export function generateTestIds() {
    const timestamp = Date.now();
    return {
        poNumber: `PO-TEST-${timestamp}`,
        styleNumber: `STYLE-TEST-${timestamp}`,
        jobName: `JOB-TEST-${timestamp}`,
        buyerName: `Buyer-TEST-${timestamp}`,
        supplierName: `Supplier-TEST-${timestamp}`
    };
}

/**
 * Create a basic order with size groups
 */
export async function createBasicOrder(page: Page, poNumber: string, styleNumber: string): Promise<void> {
    // Ensure we're on Order Management
    await navigateToOrderManagement(page);

    // Open new order modal
    await page.getByRole('button', { name: 'New Order' }).click();

    // Fill General Info
    await page.fill('input[name="poNumber"]', poNumber);
    await page.fill('input[name="styleNumber"]', styleNumber);
    await page.selectOption('select[name="buyerName"]', { label: 'Test Buyer' });

    // Add Size Group with quantities
    await page.getByRole('button', { name: 'Add New Size Group' }).click();
    await page.waitForTimeout(500);

    const quantityInputs = page.locator('table input[type="number"]');
    await quantityInputs.first().fill('100');
    await quantityInputs.nth(1).fill('150');
    await quantityInputs.nth(2).fill('200');
    await quantityInputs.nth(3).fill('50');

    // Go to BOM Tab and add fabric
    await page.getByRole('button', { name: 'BOM' }).last().click();
    const fabricSection = page.locator('.bg-white', { has: page.locator('h3', { hasText: 'Fabric' }) }).first();
    await fabricSection.getByRole('button', { name: 'Add Item' }).first().click();
    await page.fill('input[placeholder="Material Name"]', 'Cotton Jersey 180GSM');
    await page.fill('input[placeholder="0.00"]', '1.5');
    await page.waitForTimeout(500);

    // Save order
    await page.getByRole('button', { name: 'Finalize' }).click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Confirm & Release PO' }).click();

    // Wait for modal to close
    await expect(page.getByRole('button', { name: 'New Order' })).toBeVisible({ timeout: 10000 });
}

/**
 * Navigate to a sidebar section
 */
export async function navigateToSection(page: Page, sectionName: string): Promise<void> {
    await page.getByRole('button', { name: sectionName }).click();
    await page.waitForTimeout(1000);
}
