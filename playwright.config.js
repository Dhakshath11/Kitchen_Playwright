// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true, //Enable or Disable Parallel Execution
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [

    // ---- For LOCAL EXECUTION ----
    /**{
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/

    // ---- For LAMBDA TEST EXECUTION ----
    // name in the format: browserName:browserVersion:platform@lambdatest
    // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    // Use additional configuration options provided by Playwright if required: https://playwright.dev/docs/api/class-testconfig
    {
      name: 'chrome:latest:MacOS Ventura@lambdatest',
      use: {
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'chrome:latest:Windows 11@lambdatest',
      use: {
        viewport: { width: 1280, height: 720 }
      }
    },
    {
      name: 'MicrosoftEdge:109:MacOS Ventura@lambdatest',
      use: {
        ...devices['iPhone 12 Pro Max']
      }
    },
    {
      name: 'pw-firefox:latest:Windows 10@lambdatest',
      use: {
        viewport: { width: 1280, height: 720 }
      }
    },
    {
      name: 'pw-webkit:latest:MacOS Ventura@lambdatest',
      use: {
        viewport: { width: 1920, height: 1080 }
      }
    }
  ],
  timeout: 60000, // Test Timeout
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 5000,
  },
});

// All Run >> Command : npx playwright test tests/page_test.spec.js --config playwright.config.js
// Specific Run >> Command : npx playwright test --project=chrome:latest:MacOS Ventura@lambdatest tests/page_test.spec.js --config playwright.config.js
// Specific Run >> Command : npx playwright test --project=chrome:latest:Windows 11@lambdatest tests/page_test.spec.js --config playwright.config.js
// Specific Run >> Command : npx playwright test --project=MicrosoftEdge:109:MacOS Ventura@lambdatest tests/page_test.spec.js --config playwright.config.js
// Local Run >> Command : npx playwright test --project=chromium tests/page_test.spec.js --config playwright.config.js