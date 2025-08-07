import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: /.*\.spec\.ts/,
  // configuracion del reporter
  reporter: [
    ['html', { outputFolder: 'playwright-report' }]
  ],
  use: {
    headless: false,
    // viewport: { width: 1280, height: 720 },
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    baseURL: 'https://ecommerce-playground.lambdatest.io/',
    screenshot: 'only-on-failure',
    video: 'on',
    trace: 'on'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'safari',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'] },
    }
  ]
});