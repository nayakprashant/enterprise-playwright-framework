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
├── test-data/       # Test data files (CSV, JSON, etc.)
├── ai_prompts/      # AI prompt templates for test generation
├── .gitignore       # Git ignore file
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

- **PlaywrightDevPage.ts** - Page object for Playwright documentation website
- **KatalonCmsPage.ts** - Page object for Katalon CMS demo site

### Creating a New Page Object

1. Create a new file in the `pages/` folder
2. Create a class that accepts a `Page` object in the constructor
3. Define locators as readonly properties and initialize them in the constructor
4. Add a public getter for the page object if needed for assertions

Example:

```typescript
import { Page, Locator } from '@playwright/test';

export class HomePage {
  // Locators
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(private _page: Page) {
    this.searchInput = this._page.locator('#search');
    this.searchButton = this._page.locator('button[type="submit"]');
  }

  get page() {
    return this._page;
  }
}
```

**Note:** Locators are accessed as `objectName.memberName` from test files (e.g., `homePage.searchInput`).

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

**Logging:** All helper functions include automatic logging that outputs the locator information and relevant parameters to the console for debugging purposes.

### CSV Reader Helper

The framework includes a CSV reader helper located in `helpers/csvReader.ts` for reading test data from CSV files:

- `csvRead(testIdentifier, testdataFilePath)` - Reads test data from a CSV file based on a test identifier
  - Returns an array of values from the matching row (excluding the test identifier)
  - First column should contain the test identifier
  - Remaining columns contain the test data values

Example CSV format:
```csv
testIdentifier,username,password,expectedUserName
abc101,customer,password123,hazela1
```

Usage in tests:
```typescript
import { csvRead } from '../helpers/csvReader';

const testData = csvRead('abc101', './test-data/data.csv');
const username = testData[0];
const password = testData[1];
const expectedUserName = testData[2];
```

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
5. Access locators as `objectName.memberName` from page objects
6. Use test hooks for setup and teardown operations

### Test Hooks

Playwright supports the following test hooks:

- `test.beforeAll()` - Runs once before all tests in the describe block
- `test.afterAll()` - Runs once after all tests in the describe block
- `test.beforeEach()` - Runs before each test
- `test.afterEach()` - Runs after each test

Example:
```typescript
test.describe('Test Suite', () => {
  test.beforeAll(async () => {
    console.log('Inside beforeAll hook');
  });

  test.afterAll(async () => {
    console.log('Inside afterAll hook');
  });

  test.beforeEach(async ({ page }) => {
    console.log('Inside beforeEach hook');
    // Setup before each test
  });

  test.afterEach(async () => {
    console.log('Inside afterEach hook');
    // Cleanup after each test
  });

  test('example test', async ({ page }) => {
    // Test implementation
  });
});
```

Example:

```typescript
import { test, expect } from '@playwright/test';
import { PlaywrightDevPage } from '../pages/PlaywrightDevPage';
import { click, isVisible } from '../helpers/genericHelper';

test('should navigate to docs', async ({ page }) => {
  const playwrightDevPage = new PlaywrightDevPage(page);
  await page.goto('/');

  await expect(await isVisible(playwrightDevPage.docsLink)).toBe(true);
  await click(playwrightDevPage.docsLink);

  await expect(page).toHaveURL(/.*docs/);
});
```

### Using Test Data from CSV

Tests can read data from CSV files using the csvReader helper:

```typescript
import { test, expect } from '@playwright/test';
import { KatalonCmsPage } from '../pages/KatalonCmsPage';
import { click, fill, getText, isVisible, waitForVisible } from '../helpers/genericHelper';
import { csvRead } from '../helpers/csvReader';

test.describe('Login Tests', () => {
  const testIdentifier = 'abc101';
  const testData = csvRead(testIdentifier, './test-data/data.csv');

  const USERNAME = testData[0];
  const PASSWORD = testData[1];
  const EXPECTED_USER_NAME = testData[2];

  test('should login successfully', async ({ page }) => {
    const katalonCmsPage = new KatalonCmsPage(page);
    await page.goto('https://example.com/login');

    await fill(katalonCmsPage.usernameInput, USERNAME);
    await fill(katalonCmsPage.passwordInput, PASSWORD);
    await click(katalonCmsPage.loginButton);

    const actualUserName = await getText(katalonCmsPage.userName);
    expect(actualUserName).toBe(EXPECTED_USER_NAME);
  });
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
npx playwright test playwright-dev.spec.ts
npx playwright test katalon-cms-login.spec.ts

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
- **Automatic logging**: Helper functions include console logging for debugging and traceability
- **Consistent pattern**: Locators accessed as `objectName.memberName` for uniform usage
- **Test data externalization**: Test data stored in external files (CSV) rather than hardcoded
- **Test hooks**: Proper use of beforeAll, afterAll, beforeEach, afterEach for setup and teardown

## Test Data Management

Test data files are stored in the `test-data/` folder. The framework supports CSV files for test data management:

- **data.csv** - Contains test data with identifiers for easy lookup
- CSV format: First column is the test identifier, remaining columns are data values
- Use the `csvRead` helper to retrieve data based on test identifier

## AI Prompts

AI prompt templates are stored in the `ai_prompts/` folder for generating tests using AI assistants:

- **1.0.2.md** - Template for automating login flow with existing framework
- **1.0.3.md** - Template for automating test cases using enhanced codegen steps and existing framework
- Prompts include detailed instructions for framework inspection, test implementation, and validation

### Using the 1.0.3.md Prompt

The 1.0.3.md prompt is designed to automate test cases using manual test case Excel files and Playwright codegen recorded steps. It intelligently reuses the existing framework structure and conventions.

#### Preparation Steps

Before using the 1.0.3.md prompt, ensure you have the following prepared:

1. **Manual Test Case Excel File**
   - Create or obtain an Excel file containing the manual test case
   - The file should include: step numbers, descriptions, expected results, and locator information (if available)
   - Place this file in the appropriate test case folder (e.g., `test-cases/01-login-incorrect-password-check/Manual Test Case.xlsx`)

2. **Enhanced Codegen Steps**
   - Run Playwright codegen to record the test steps:
     ```bash
     npx playwright codegen https://your-application-url.com/
     ```
   - Save the generated code to a text file (e.g., `codegen.txt`)
   - Optionally enhance the codegen with comments for clarity (the prompt can work with or without comments)
   - Place this file in the same folder as the Excel file

3. **Configuration Setup**
   - Ensure the `baseUrl` in the appropriate environment config file (e.g., `config/qa.env.ts`) is set to your application URL
   - Verify that timeout values are appropriate for your application

4. **Test Data (Optional)**
   - If your test requires test data (username, password, etc.), prepare a CSV file in the `test-data/` folder
   - Format: `testIdentifier,column1,column2,...`
   - Example:
     ```csv
     abc101,customer,password123
     abc102,customer,incorrectPassword
     ```

5. **Page Object Check**
   - The prompt will automatically check for existing page objects in the `pages/` folder
   - If a page object exists, it will reuse it and add new locators if needed
   - If a page object doesn't exist, it will create one following the framework's pattern

#### Using the Prompt

1. Provide the AI assistant with:
   - The 1.0.3.md prompt content
   - The path to your manual test case Excel file
   - The path to your codegen.txt file

2. The AI will:
   - Inspect the existing framework structure
   - Identify existing page objects and their locators
   - Add new locators to existing page objects or create new ones as needed
   - Create a test file following the framework's conventions
   - Use helper functions from `genericHelper.ts`
   - Implement appropriate assertions
   - Follow the exact selectors from the codegen steps

3. After implementation:
   - Review the generated test file
   - Run the test to verify it works
   - If selectors from codegen don't work, the AI will report the failure (per prompt requirements)
   - Update configuration or test data as needed

#### Example Workflow

```bash
# 1. Create test case folder
mkdir -p test-cases/01-login-incorrect-password-check

# 2. Record test steps with codegen
npx playwright codegen https://cms.demo.katalon.com/

# 3. Save the generated code to codegen.txt in the test case folder

# 4. Place your Manual Test Case.xlsx in the same folder

# 5. If needed, add test data to test-data/data.csv
echo "abc102,customer,incorrectPassword" >> test-data/data.csv

# 6. Provide the prompt, Excel file, and codegen.txt to the AI assistant

# 7. Run the generated test
npx playwright test tests/katalon-cms-login-incorrect-password.spec.ts
```

#### Key Features of 1.0.3.md Prompt

- **Framework Awareness**: Inspects and reuses existing framework structure
- **Page Object Management**: Intelligently reuses existing page objects or creates new ones
- **Locator Accuracy**: Uses exact selectors from codegen (reports failures if they don't work)
- **Helper Function Integration**: Uses framework's helper functions for interactions
- **Test Data Support**: Can read test data from CSV files
- **Configuration Integration**: Uses framework's configuration system
- **Consistent Patterns**: Follows the framework's coding conventions and test structure

## Future Enhancements

The framework is designed to accommodate future features:

- API testing helpers
- Database integration utilities
- Custom test execution strategies
- Enhanced reporting
- AI-powered test generation
- Test data management (additional formats: JSON, YAML)
- Parallel execution strategies
