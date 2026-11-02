import {test, expect} from '@playwright/test';
import { HomePage } from '../../../pages/HomePage';
import { CommonPage } from '../../../pages/CommonPage';
import { LoginPage } from '../../../pages/LoginPage';
import { click, fill, isVisible } from '../../../helpers/genericHelper';

test('verify download link', async ({ page }) => {
    const homePage = new HomePage(page);
    const commonPage = new CommonPage(page);
    const loginPage = new LoginPage(page);
    
    await page.goto('/');
    
    // Click the My Account link
    await click(commonPage.myAccountLink);

    // Click on username and enter the username
    await click(loginPage.usernameInput);
    await fill(loginPage.usernameInput, 'customer');
    
    // Click on password and enter the password
    await click(loginPage.passwordInput);
    await fill(loginPage.passwordInput, 'crz7mrb.KNG3yxv1fbn');
    
    // Click on the login button
    await click(loginPage.loginButton);
    
    // Verify download link is visible
    await expect(await isVisible(homePage.downloadLink)).toBe(true);
});
