import { Page } from '@playwright/test';

/**
 * Login Page Object
 * Represents the login page of the application
 * Contains locators for the login functionality
 */
export class LoginPage {
  constructor(private page: Page) {}

  // Locators
  get usernameInput() {
    return this.page.locator('#username');
  }

  get passwordInput() {
    return this.page.locator('#password');
  }

  get loginButton() {
    return this.page.locator('button[type="submit"]');
  }

  get errorMessage() {
    return this.page.locator('.error-message');
  }

  get forgotPasswordLink() {
    return this.page.locator('a[href*="forgot-password"]');
  }
}
