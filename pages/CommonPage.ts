import { Page, Locator } from '@playwright/test';

/**
 * Common Page Object
 * Contains locators that are common across all pages in the application
 * These are shared elements like navigation links, headers, footers, etc.
 */
export class CommonPage {
  // Common locators used across multiple pages
  readonly myAccountLink: Locator;

  constructor(private _page: Page) {
    console.log('CommonPage loaded');
    // Common navigation elements
    this.myAccountLink = this._page.getByRole('link', { name: 'My account' });
  }

  get page() {
    return this._page;
  }
}
