import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CommonPage } from '../pages/CommonPage';
import { LoginPage } from '../pages/LoginPage';
import { click, fill, getText, isVisible, waitForVisible } from '../helpers/genericHelper';
import { csvRead } from '../helpers/csvReader';

/**
 * Katalon CMS Login Test Suite
 * Tests for the login functionality on Katalon CMS demo site
 */

test.describe('Katalon CMS Login Tests', () => {

  let homePage: HomePage;
  let commonPage: CommonPage;
  let loginPage: LoginPage;

  test.beforeAll(async () => {
    console.log('Inside beforeAll hook');
  });

  test.afterAll(async () => {
    console.log('Inside afterAll hook');
  });

  test.beforeEach(async ({ page }) => {
    console.log('Inside beforeEach hook');
    homePage = new HomePage(page);
    commonPage = new CommonPage(page);
    loginPage = new LoginPage(page);
  });

  test.afterEach(async () => {
    console.log('Inside afterEach hook');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const testIdentifier = 'abc101';

    // Read test data from CSV file
    const testData = csvRead(testIdentifier, './test-data/data.csv');

    // Test credentials from CSV
    const USERNAME = testData[0];
    const PASSWORD = testData[1];
    const EXPECTED_USER_NAME = testData[2];
    
    // Step 1: Navigate to the application
    await page.goto('/');

    // Step 2: Click the My Account link
    await click(commonPage.myAccountLink);

    // Step 3: Enter username
    await fill(loginPage.usernameInput, USERNAME);

    // Step 4: Enter password
    await fill(loginPage.passwordInput, PASSWORD);

    // Step 5: Click the Login button
    await click(loginPage.loginButton);

    // Step 6: Verify successful login
    // Wait for dashboard link to be visible
    await waitForVisible(homePage.dashboardLink);

    // Verify dashboard link is present
    await expect(await isVisible(homePage.dashboardLink)).toBe(true);

    // Verify user name is displayed as "hazela1"
    const actualUserName = await getText(homePage.userName);
    expect(actualUserName).toBe(EXPECTED_USER_NAME);

    // Verify logout link is present
    await expect(await isVisible(homePage.logoutLink)).toBe(true);
  });
});
