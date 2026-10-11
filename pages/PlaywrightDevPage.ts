import { Page, Locator } from '@playwright/test';

/**
 * Playwright.dev Page Object
 * Represents the Playwright documentation website
 * Contains locators for common elements on playwright.dev
 */
export class PlaywrightDevPage {
  // Locators
  readonly docsLink: Locator;
  readonly mcpLink: Locator;
  readonly cliLink: Locator;
  readonly apiLink: Locator;
  readonly getStartedLink: Locator;
  readonly searchButton: Locator;
  readonly githubLink: Locator;
  readonly discordLink: Locator;
  readonly heading: Locator;

  constructor(private _page: Page) {
    this.docsLink = this._page.getByRole('link', { name: 'Docs' });
    this.mcpLink = this._page.getByRole('link', { name: 'MCP' });
    this.cliLink = this._page.getByRole('link', { name: 'CLI' });
    this.apiLink = this._page.getByRole('link', { name: 'API' });
    this.getStartedLink = this._page.getByRole('link', { name: 'Get started' });
    this.searchButton = this._page.getByRole('button', { name: 'Search' });
    this.githubLink = this._page.getByRole('link', { name: 'GitHub repository' });
    this.discordLink = this._page.getByRole('link', { name: 'Discord server' });
    this.heading = this._page.getByRole('heading');
  }

  get page() {
    return this._page;
  }
}
