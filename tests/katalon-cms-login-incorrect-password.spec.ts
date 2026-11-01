import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CommonPage } from '../pages/CommonPage';
import { LoginPage } from '../pages/LoginPage';
import { click, fill, waitForVisible } from '../helpers/genericHelper';
import { csvRead } from '../helpers/csvReader';

/**
 * Katalon CMS Login Incorrect Password Test Suite
 * Tests for the login functionality with incorrect password on Katalon CMS demo site
 */

test.describe('Katalon CMS Login Incorrect Password Tests', () => {

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

  test('should display error message with incorrect password', async ({ page }) => {
  
    const testIdentifier = 'abc102';

    // Read test data from CSV file
    const testData = csvRead(testIdentifier, './test-data/data.csv');

    // Test credentials from CSV
    const USERNAME = testData[0];
    const PASSWORD = testData[1];
    
    // Step 1: Navigate to the application
    await page.goto('/');

    // Step 2: Click the My Account link
    await click(commonPage.myAccountLink);

    // Step 3: Click on username and enter the username
    await click(loginPage.usernameInput);
    await fill(loginPage.usernameInput, USERNAME);

    // Step 4: Click on password and enter the password
    await click(loginPage.passwordInput);
    await fill(loginPage.passwordInput, PASSWORD);

    // Step 5: Click on the login button
    await click(loginPage.loginButton);

    // Step 6: Verify that the error message is displayed
    await waitForVisible(loginPage.errorMessageAlert);
    await expect(loginPage.errorMessageAlert).toContainText('Error: The password you entered for the username customer is incorrect. Lost your password?');
  });
});
