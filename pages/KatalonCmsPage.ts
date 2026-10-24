import { Page, Locator } from '@playwright/test';

/**
 * Katalon CMS Page Object
 * Represents the Katalon CMS demo website
 * Contains locators for the login functionality
 */
export class KatalonCmsPage {
  // Locators for Katalon CMS login functionality
  readonly myAccountLinkRole: Locator;
  readonly usernameInputRole: Locator;
  readonly passwordInputRole: Locator;
  readonly loginButtonRole: Locator;
  readonly dashboardLink: Locator;
  readonly userName: Locator;
  readonly logoutLink: Locator;
  readonly errorMessageAlert: Locator;

  constructor(private _page: Page) {
    // Role-based locators from codegen steps
    this.myAccountLinkRole = this._page.getByRole('link', { name: 'My account' });
    this.usernameInputRole = this._page.getByRole('textbox', { name: 'Username or email address' });
    this.passwordInputRole = this._page.getByRole('textbox', { name: 'Password Required' });
    this.loginButtonRole = this._page.getByRole('button', { name: 'Log in' });
    this.errorMessageAlert = this._page.getByRole('alert');
    // XPath locators for other elements
    this.dashboardLink = this._page.locator('//*[@id="post-10"]/div/div/nav/ul/li[1]/a');
    this.userName = this._page.locator('//*[@id="post-10"]/div/div/div/p[1]/strong[1]');
    this.logoutLink = this._page.locator('//*[@id="post-10"]/div/div/div/p[1]/a');
  }

  get page() {
    return this._page;
  }
}
