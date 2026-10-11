import { test, expect } from '@playwright/test';
import { KatalonCmsPage } from '../pages/KatalonCmsPage';
import { click, fill, getText, isVisible, waitForVisible } from '../helpers/genericHelper';

/**
 * Katalon CMS Login Test Suite
 * Tests for the login functionality on Katalon CMS demo site
 */

test.describe('Katalon CMS Login Tests', () => {
  let katalonCmsPage: KatalonCmsPage;

  // Test credentials - kept local to test file per framework conventions
  const USERNAME = 'customer';
  const PASSWORD = '123456'; // This should be replaced with actual password when available
  const EXPECTED_USER_NAME = 'hazela1';

  test.beforeEach(async ({ page }) => {
    katalonCmsPage = new KatalonCmsPage(page);
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // Step 1: Navigate to the application
    await page.goto('https://cms.demo.katalon.com/');

    // Step 2: Click the My Account link
    await click(katalonCmsPage.myAccountLink);

    // Step 3: Enter username
    await fill(katalonCmsPage.usernameInput, USERNAME);

    // Step 4: Enter password
    await fill(katalonCmsPage.passwordInput, PASSWORD);

    // Step 5: Click the Login button
    await click(katalonCmsPage.loginButton);

    // Step 6: Verify successful login
    // Wait for dashboard link to be visible
    await waitForVisible(katalonCmsPage.dashboardLink);

    // Verify dashboard link is present
    await expect(await isVisible(katalonCmsPage.dashboardLink)).toBe(true);

    // Verify user name is displayed as "hazela1"
    const actualUserName = await getText(katalonCmsPage.userName);
    expect(actualUserName).toBe(EXPECTED_USER_NAME);

    // Verify logout link is present
    await expect(await isVisible(katalonCmsPage.logoutLink)).toBe(true);
  });
});
