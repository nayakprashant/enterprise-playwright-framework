import { Page, Locator } from '@playwright/test';

/**
 * Katalon CMS Page Object
 * Represents the Katalon CMS demo website
 * Contains locators for the login functionality
 */
export class KatalonCmsPage {
  // Locators using exact selectors from manual test case
  readonly myAccountLink: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly dashboardLink: Locator;
  readonly userName: Locator;
  readonly logoutLink: Locator;
  // Locators from codegen steps (role-based selectors)
  readonly myAccountLinkRole: Locator;
  readonly usernameInputRole: Locator;
  readonly passwordInputRole: Locator;
  readonly loginButtonRole: Locator;
  readonly errorMessageAlert: Locator;

  constructor(private _page: Page) {
    // Exact locators from manual test case
    this.myAccountLink = this._page.locator('//*[@id="primary-menu"]/ul/li[3]/a');
    this.usernameInput = this._page.locator('#username');
    this.passwordInput = this._page.locator('#password');
    this.loginButton = this._page.locator('//*[@id="post-10"]/div/div/form/p[3]/button');
    this.dashboardLink = this._page.locator('//*[@id="post-10"]/div/div/nav/ul/li[1]/a');
    this.userName = this._page.locator('//*[@id="post-10"]/div/div/div/p[1]/strong[1]');
    this.logoutLink = this._page.locator('//*[@id="post-10"]/div/div/div/p[1]/a');
    // Locators from codegen steps (role-based selectors)
    this.myAccountLinkRole = this._page.getByRole('link', { name: 'My account' });
    this.usernameInputRole = this._page.getByRole('textbox', { name: 'Username or email address' });
    this.passwordInputRole = this._page.getByRole('textbox', { name: 'Password Required' });
    this.loginButtonRole = this._page.getByRole('button', { name: 'Log in' });
    this.errorMessageAlert = this._page.getByRole('alert');
  }

  get page() {
    return this._page;
  }
}
