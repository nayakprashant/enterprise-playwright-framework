import { Page, Locator } from '@playwright/test';

/**
 * Home Page Object
 * Represents the home/dashboard page of the application
 * Contains locators for dashboard functionality
 */
export class HomePage {
  // Locators for dashboard functionality
  readonly dashboardLink: Locator;
  readonly userName: Locator;
  readonly logoutLink: Locator;

  constructor(private _page: Page) {
    console.log('HomePage loaded');
    // XPath locators for dashboard elements
    this.dashboardLink = this._page.locator('//*[@id="post-10"]/div/div/nav/ul/li[1]/a');
    this.userName = this._page.locator('//*[@id="post-10"]/div/div/div/p[1]/strong[1]');
    this.logoutLink = this._page.locator('//*[@id="post-10"]/div/div/div/p[1]/a');
  }

  get page() {
    return this._page;
  }
}
