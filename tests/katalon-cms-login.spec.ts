import { test, expect } from '@playwright/test';
import { KatalonCmsPage } from '../pages/KatalonCmsPage';
import { click, fill, getText, isVisible, waitForVisible } from '../helpers/genericHelper';
import { csvRead } from '../helpers/csvReader';

/**
 * Katalon CMS Login Test Suite
 * Tests for the login functionality on Katalon CMS demo site
 */

test.describe('Katalon CMS Login Tests', () => {

  const testIdentifier = 'abc101';
  let katalonCmsPage: KatalonCmsPage;

  // Read test data from CSV file
  const testData = csvRead(testIdentifier, './test-data/data.csv');

  // Test credentials from CSV
  const USERNAME = testData[0];
  const PASSWORD = testData[1];
  const EXPECTED_USER_NAME = testData[2];

  test.beforeAll(async () => {
    console.log('Inside beforeAll hook');
  });

  test.afterAll(async () => {
    console.log('Inside afterAll hook');
  });

  test.beforeEach(async ({ page }) => {
    console.log('Inside beforeEach hook');
    katalonCmsPage = new KatalonCmsPage(page);
  });

  test.afterEach(async () => {
    console.log('Inside afterEach hook');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // Step 1: Navigate to the application
    await page.goto('/');

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
