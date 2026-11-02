import {test as base, expect, Page} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CommonPage } from '../pages/CommonPage';
import { LoginPage } from '../pages/LoginPage';
import { click, fill } from '../helpers/genericHelper';

type fixture = {
    login: Page
}
export const test = base.extend<fixture>({
    login: async({page}, use) => {
        // Setup
        console.log('Setting up login...');
        
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

        // Use the fixture
        await use(page);
        
        // Teardown
        console.log('Tearing down login...');
    }
});

export { expect };