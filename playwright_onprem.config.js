// @ts-check
import { defineConfig } from '@playwright/test';
import cp from 'child_process';

const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

// Read credentials from environment
const LT_USERNAME = process.env.LT_USERNAME;
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY;

// Helper to build encoded capabilities
function getWSEndpoint(projectName, testName = 'Playwright Test') {
  const [browserName, browserVersion, platform] = projectName.split(':');
  const capabilities = {
    browserName: browserName || 'Chrome',
    browserVersion: browserVersion || 'latest',
    'LT:Options': {
      platform: platform || 'Windows 10',
      build: 'Playwright HyperExecute Build',
      name: testName,
      user: LT_USERNAME,
      accessKey: LT_ACCESS_KEY,
      network: true,
      video: true,
      console: true,
      tunnel: false,
      tunnelName: '',
      geoLocation: '',
      playwrightClientVersion,
    }
  };

  const encodedCaps = encodeURIComponent(JSON.stringify(capabilities));
  return `wss://cdp.lambdatest.com/playwright?capabilities=${encodedCaps}`;
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [['html', { open: 'never' }]],

  use: {
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chrome:latest:MacOS Ventura@lambdatest',
      use: {
        connectOptions: {
          wsEndpoint: getWSEndpoint('chrome:latest:MacOS Ventura', 'Playwright Test')
        },
        viewport: { width: 1920, height: 1080 }
      }
    },
  ],

  timeout: 60000,
  expect: {
    timeout: 5000,
  },
});
