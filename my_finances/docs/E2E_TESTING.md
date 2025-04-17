# End-to-End Testing Guide

This guide explains how to set up and run end-to-end (e2e) tests for the MyFinances application using Playwright.

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Git (for cloning the repository)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RociDelg/Final-exercise---Finances.git
   cd my_finances
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

### Development Mode

To run tests in development mode with UI:
```bash
npm run test:e2e
```

### Headless Mode

To run tests in headless mode:
```bash
npm run test:e2e:headless
```

### Specific Browser

To run tests in a specific browser:
```bash
# Chrome
npx playwright test --project=chromium

# Firefox
npx playwright test --project=firefox

# Safari
npx playwright test --project=webkit
```

### Specific Test File

To run a specific test file:
```bash
npx playwright test tests/e2e/user-registration.spec.ts
```

## Test Structure

The e2e tests are organized in the `tests/e2e` directory. Each feature has its own test file:

- `user-registration.spec.ts`: Tests for user registration flow
- Additional test files will be added for other features

## Test Configuration

The Playwright configuration is defined in `playwright.config.ts`:

- Test directory: `./tests/e2e`
- Timeout: 30 seconds
- Retries: 2 in CI, 0 in development
- Browsers: Chrome, Firefox, and Safari
- Base URL: `http://localhost:3000`
- Screenshots: Only on failure
- HTML reports: Generated after test runs

## Viewing Test Reports

After running tests, you can view the HTML report:
```bash
npx playwright show-report
```

## CI/CD Integration

The e2e tests are configured to run in CI environments with the following settings:
- Forbidden `.only` tests
- 2 retries for failed tests
- Single worker for stability
- Headless mode enabled

## Writing New Tests

When writing new tests:

1. Create a new `.spec.ts` file in the `tests/e2e` directory
2. Use the `test` and `expect` functions from `@playwright/test`
3. Follow the existing test structure and patterns
4. Include appropriate test descriptions and assertions
5. Add screenshots for complex UI interactions

Example test structure:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup code
  });

  test('should do something specific', async ({ page }) => {
    // Test implementation
  });
});
```

## Troubleshooting

Common issues and solutions:

1. **Tests failing in CI but passing locally**
   - Check for timing issues
   - Verify environment variables
   - Ensure proper test isolation

2. **Browser launch failures**
   - Verify browser installation
   - Check system dependencies
   - Clear browser cache

3. **Test timeouts**
   - Increase timeout in config if needed
   - Check for infinite loops
   - Verify proper async/await usage

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Test Generator](https://playwright.dev/docs/auth#generating-tests)
- [Debugging Guide](https://playwright.dev/docs/debug) 