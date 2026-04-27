import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  testMatch: /.*\.spec\.ts/,
  // configuracion del reporter
  reporter: [
    ['html', { outputFolder: 'playwright-report' }]
  ],
  use: {
    headless: true,
    // viewport: { width: 1280, height: 720 },
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure',
    video: 'on',
    trace: 'on'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'safari',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // {
    //   name: 'edge',
    //   use: { ...devices['Desktop Edge'] },
    // }
  ]
});