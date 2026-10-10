# Enterprise Playwright Framework

A scalable and maintainable Playwright automation framework built with TypeScript.

## Architecture

This framework follows a clean architecture with clear separation of concerns:

```
enterprise-playwright-framework/
├── config/          # Environment-specific configurations
├── pages/           # Page objects representing application pages
├── helpers/         # Generic helper functions for Playwright interactions
├── tests/           # Test files
└── playwright.config.ts  # Playwright configuration
```

## Configuration

### Environment Configurations

The framework supports multiple environments through the `config/` folder:

- `qa.env.ts` - QA environment
- `staging.env.ts` - Staging environment
- `ci.env.ts` - CI environment

Each environment configuration can define:
- `baseUrl` - Base URL for the application
- `apiUrl` - API base URL
- `defaultTimeout` - Default timeout for element interactions
- `testTimeout` - Maximum timeout for test execution
- `globalTimeout` - Global timeout for test suite
- Additional environment-specific properties

### Running Tests on Different Environments

Set the `TEST_ENV` environment variable before running tests:

```bash
# Run tests on QA environment (default)
npx playwright test

# Run tests on Staging environment
TEST_ENV=staging npx playwright test

# Run tests on CI environment
TEST_ENV=ci npx playwright test
```

## Page Objects

Page objects are located in the `pages/` folder and contain only locators for application pages:

- **LoginPage.ts** - Example page object for login functionality

### Creating a New Page Object

1. Create a new file in the `pages/` folder
2. Create a class that accepts a `Page` object in the constructor
3. Define locators as public properties

Example:

```typescript
import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  searchInput = this.page.locator('#search');
  searchButton = this.page.locator('button[type="submit"]');
}
```

## Helpers

Generic helper functions are located in the `helpers/genericHelper.ts` file.

These provide lightweight wrappers around common Playwright interactions:

- `click(locator, timeout?)` - Click on an element
- `fill(locator, text, timeout?)` - Fill text into an input
- `getText(locator, timeout?)` - Get text content
- `isVisible(locator, timeout?)` - Check if element is visible
- `waitForVisible(locator, timeout?)` - Wait for element to be visible
- `waitForHidden(locator, timeout?)` - Wait for element to be hidden
- `isEnabled(locator, timeout?)` - Check if element is enabled
- `selectOption(locator, value, timeout?)` - Select dropdown option
- `getAttribute(locator, attributeName, timeout?)` - Get attribute value
- `hover(locator, timeout?)` - Hover over element
- `check(locator, timeout?)` - Check a checkbox
- `uncheck(locator, timeout?)` - Uncheck a checkbox

### Timeout Override

All helper functions accept an optional `timeout` parameter:

```typescript
// Use framework default timeout
await click(button);

// Override with custom timeout
await click(button, 10000);
```

## Writing Tests

Tests are located in the `tests/` folder and should:

1. Import page objects to access locators
2. Import helper functions for interactions
3. Focus on business scenarios and assertions
4. Avoid hardcoding environment-specific values

Example:

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { click, fill } from '../helpers/genericHelper';

test('should login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/login');
  
  await fill(loginPage.usernameInput, 'testuser@example.com');
  await fill(loginPage.passwordInput, 'password123');
  await click(loginPage.loginButton);
  
  await expect(page).toHaveURL('/dashboard');
});
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in UI mode
npx playwright test --ui

# Run tests in debug mode
npx playwright test --debug

# Run specific test file
npx playwright test login.spec.ts

# Run tests on specific browser
npx playwright test --project=chromium
```

## Adding a New Environment

1. Create a new configuration file in `config/` (e.g., `prod.env.ts`)
2. Export a configuration object implementing `EnvironmentConfig`
3. Import and add it to the `environments` mapping in `config/index.ts`

Example:

```typescript
// config/prod.env.ts
import { EnvironmentConfig } from './index';

export const prodConfig: EnvironmentConfig = {
  baseUrl: 'https://example.com',
  apiUrl: 'https://api.example.com',
  defaultTimeout: 5000,
  testTimeout: 30000,
  globalTimeout: 60000,
};
```

```typescript
// config/index.ts
import { prodConfig } from './prod.env';

const environments: Record<string, EnvironmentConfig> = {
  qa: qaConfig,
  staging: stagingConfig,
  ci: ciConfig,
  prod: prodConfig,  // Add this line
};
```

## Framework Principles

- **Clear separation**: Test logic, page objects (locators), configuration, and utilities are separated
- **Minimal abstraction**: Helpers are lightweight wrappers around Playwright's native functionality
- **Readability**: Tests focus on business scenarios using helper functions
- **Extensibility**: Easy to add new features (API testing, database integration, etc.)
- **No hardcoding**: Environment-specific values are in configuration files
- **TypeScript best practices**: Strong typing throughout the framework
- **Page objects as locators**: Page objects contain only locators, not action methods

## Future Enhancements

The framework is designed to accommodate future features:

- API testing helpers
- Database integration utilities
- Custom test execution strategies
- Enhanced reporting
- AI-powered test generation
- Test data management
- Parallel execution strategies
