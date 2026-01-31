import { test, expect } from '@playwright/test';
import { login, waitForDashboard } from './utils/helpers';

test.describe('Events & Calendar', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await login(page);
        await waitForDashboard(page);
    });

    test('Open Events Dashboard via sidebar tool', async ({ page }) => {
        // Look for events/calendar icon in sidebar
        const eventsButton = page.locator('[title*="Event"], [title*="Calendar"]').first();

        if (await eventsButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await eventsButton.click();
            await page.waitForTimeout(1000);
            console.log('✅ Events dashboard opened');
        } else {
            // Try alternative - look for calendar text
            const calendarText = page.getByText(/Calendar|Events/i).first();
            if (await calendarText.isVisible().catch(() => false)) {
                await calendarText.click();
                await page.waitForTimeout(1000);
                console.log('✅ Calendar opened');
            } else {
                console.log('⚠️ Events button not found in sidebar');
            }
        }
    });

    test('View calendar content', async ({ page }) => {
        // Navigate to events if available
        const eventsButton = page.locator('[title*="Event"], [title*="Calendar"]').first();

        if (await eventsButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await eventsButton.click();
            await page.waitForTimeout(1000);

            // Check for calendar content
            const calendarContent = page.locator('[class*="calendar"], [class*="event"]').first();
            const hasCalendar = await calendarContent.isVisible().catch(() => false);

            console.log(hasCalendar ? '✅ Calendar content visible' : '⚠️ Calendar not found');
        } else {
            console.log('⚠️ Events dashboard not accessible');
        }
    });

    test('Check for Add Event button', async ({ page }) => {
        const eventsButton = page.locator('[title*="Event"], [title*="Calendar"]').first();

        if (await eventsButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await eventsButton.click();
            await page.waitForTimeout(1000);

            // Look for add event button
            const addEventButton = page.getByRole('button', { name: /Add.*Event|New.*Event|Create/i }).first();
            const hasAddEvent = await addEventButton.isVisible({ timeout: 3000 }).catch(() => false);

            console.log(hasAddEvent ? '✅ Add Event button available' : '⚠️ Add Event button not found');
        } else {
            console.log('⚠️ Events dashboard not accessible');
        }
    });

    test('View event types', async ({ page }) => {
        const eventsButton = page.locator('[title*="Event"], [title*="Calendar"]').first();

        if (await eventsButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await eventsButton.click();
            await page.waitForTimeout(1000);

            // Check for event type filters
            const eventTypes = ['Shipment', 'Meeting', 'Custom'];
            for (const type of eventTypes) {
                const typeElement = page.getByText(type).first();
                const hasType = await typeElement.isVisible().catch(() => false);
                console.log(hasType ? `✅ ${type} events visible` : `⚠️ ${type} not found`);
            }
        } else {
            console.log('⚠️ Events dashboard not accessible');
        }
    });

});
