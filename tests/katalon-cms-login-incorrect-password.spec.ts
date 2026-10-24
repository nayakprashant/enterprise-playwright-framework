import { test, expect } from '@playwright/test';
import { KatalonCmsPage } from '../pages/KatalonCmsPage';
import { click, fill, waitForVisible } from '../helpers/genericHelper';
import { csvRead } from '../helpers/csvReader';

/**
 * Katalon CMS Login Incorrect Password Test Suite
 * Tests for the login functionality with incorrect password on Katalon CMS demo site
 */

test.describe('Katalon CMS Login Incorrect Password Tests', () => {

  const testIdentifier = 'abc102';
  let katalonCmsPage: KatalonCmsPage;

  // Read test data from CSV file
  const testData = csvRead(testIdentifier, './test-data/data.csv');

  // Test credentials from CSV
  const USERNAME = testData[0];
  const PASSWORD = testData[1];

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

  test('should display error message with incorrect password', async ({ page }) => {
    // Step 1: Navigate to the application
    await page.goto('/');

    // Step 2: Click the My Account link
    await click(katalonCmsPage.myAccountLinkRole);

    // Step 3: Click on username and enter the username
    await click(katalonCmsPage.usernameInputRole);
    await fill(katalonCmsPage.usernameInputRole, USERNAME);

    // Step 4: Click on password and enter the password
    await click(katalonCmsPage.passwordInputRole);
    await fill(katalonCmsPage.passwordInputRole, PASSWORD);

    // Step 5: Click on the login button
    await click(katalonCmsPage.loginButtonRole);

    // Step 6: Verify that the error message is displayed
    await waitForVisible(katalonCmsPage.errorMessageAlert);
    await expect(katalonCmsPage.errorMessageAlert).toContainText('Error: The password you entered for the username customer is incorrect. Lost your password?');
  });
});
