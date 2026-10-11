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

  constructor(private _page: Page) {
    // Exact locators from manual test case
    this.myAccountLink = this._page.locator('//*[@id="primary-menu"]/ul/li[3]/a');
    this.usernameInput = this._page.locator('#username');
    this.passwordInput = this._page.locator('#password');
    this.loginButton = this._page.locator('//*[@id="post-10"]/div/div/form/p[3]/button');
    this.dashboardLink = this._page.locator('//*[@id="post-10"]/div/div/nav/ul/li[1]/a');
    this.userName = this._page.locator('//*[@id="post-10"]/div/div/div/p[1]/strong[1]');
    this.logoutLink = this._page.locator('//*[@id="post-10"]/div/div/div/p[1]/a');
  }

  get page() {
    return this._page;
  }
}
