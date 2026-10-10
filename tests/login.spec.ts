import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { click, getText, isVisible } from '../helpers/genericHelper';

/**
 * Framework Demonstration Test Suite
 * Demonstrates the use of page objects (locators only) and helper functions
 * Using playwright.dev for demonstration
 */

test.describe('Framework Demonstration', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/');
  });

  test('should navigate to playwright.dev', async ({ page }) => {
    // Verify we're on the homepage
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('should interact with page elements', async ({ page }) => {
    // Demonstrate helper functions with playwright.dev elements
    const getStartedLink = page.getByRole('link', { name: 'Get started' });
    
    // Verify element is visible
    await expect(await isVisible(getStartedLink)).toBe(true);
    
    // Click the link using helper function
    await click(getStartedLink);
    
    // Verify navigation
    await expect(page).toHaveURL(/.*docs/);
  });

  test('should demonstrate helper functions', async ({ page }) => {
    // Click get started to navigate to docs
    const getStartedLink = page.getByRole('link', { name: 'Get started' });
    await click(getStartedLink);
    
    // Get and verify heading text
    const heading = page.getByRole('heading', { name: 'Installation' });
    const headingText = await getText(heading);
    expect(headingText).toContain('Installation');
    
    // Verify element is visible
    await expect(await isVisible(heading)).toBe(true);
  });
});
