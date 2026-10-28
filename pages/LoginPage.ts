import { Page, Locator } from '@playwright/test';

/**
 * Login Page Object
 * Contains locators for the login functionality
 * These are specific to the login page and used across the application
 */
export class LoginPage {
  // Login form locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessageAlert: Locator;

  constructor(private _page: Page) {
    console.log('LoginPage loaded');
    // Role-based locators from codegen steps
    this.usernameInput = this._page.getByRole('textbox', { name: 'Username or email address' });
    this.passwordInput = this._page.getByRole('textbox', { name: 'Password Required' });
    this.loginButton = this._page.getByRole('button', { name: 'Log in' });
    this.errorMessageAlert = this._page.getByRole('alert');
  }

  get page() {
    return this._page;
  }
}
