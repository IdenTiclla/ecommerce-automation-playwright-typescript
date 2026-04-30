# Configuration Guide

## Playwright Configuration

**File**: `playwright.config.ts`

### Full Configuration Breakdown

```typescript
export default defineConfig({
    testDir: './tests',                    // Root test directory
    testMatch: /.*\.spec\.ts/,             // Test file pattern
    reporter: [
        ['html', { outputFolder: 'playwright-report' }]
    ],
    use: {
        headless: true,                    // Run without visible browser
        viewport: { width: 1920, height: 1080 },  // Full HD viewport
        ignoreHTTPSErrors: true,           // Skip SSL certificate errors
        baseURL: process.env.BASE_URL,     // Base URL from .env
        screenshot: 'only-on-failure',     // Capture screenshot on failure
        video: 'on',                       // Record video for all tests
        trace: 'on'                        // Record trace for all tests
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        }
    ]
});
```

### Configuration Options

| Setting | Current Value | Description |
| :--- | :--- | :--- |
| `testDir` | `./tests` | Where test files are located |
| `testMatch` | `/.*\.spec\.ts/` | Only `.spec.ts` files are treated as tests |
| `reporter` | `html` | Generates HTML report in `playwright-report/` |
| `headless` | `true` | Browser runs without UI (faster) |
| `viewport` | `1920x1080` | Full HD screen resolution |
| `ignoreHTTPSErrors` | `true` | Ignores SSL issues |
| `baseURL` | `process.env.BASE_URL` | Enables relative URLs in `page.goto('/')` |
| `screenshot` | `only-on-failure` | Saves screenshot only when a test fails |
| `video` | `on` | Records full video for every test |
| `trace` | `on` | Records detailed trace for debugging |

### Browser Projects

Currently only **Chromium** is active. Others are commented out but available:

```typescript
projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'safari', use: { ...devices['Desktop Safari'] } },
    // { name: 'edge', use: { ...devices['Desktop Edge'] } },
]
```

To enable additional browsers, uncomment the desired project entries.

## Environment Variables

**File**: `.env` (git-ignored, see `.env.example`)

```env
VALID_EMAIL=your_email@gmail.com
VALID_PASSWORD=your_password
INVALID_EMAIL=invalid_email@test.com
INVALID_PASSWORD=incorrect_password
BASE_URL=https://ecommerce-playground.lambdatest.io/
```

| Variable | Required | Used In |
| :--- | :--- | :--- |
| `BASE_URL` | Yes | `playwright.config.ts`, `homePage.ts` |
| `VALID_EMAIL` | Yes | `login-page.spec.ts` |
| `VALID_PASSWORD` | Yes | `login-page.spec.ts` |
| `INVALID_EMAIL` | Optional | Available for negative login tests |
| `INVALID_PASSWORD` | Optional | Available for negative login tests |

## Package Scripts

**File**: `package.json`

| Command | Script | Description |
| :--- | :--- | :--- |
| `npm test` | `npx playwright test` | Run all tests headless |
| `npm run test:ui` | `npx playwright test --ui` | Open Playwright interactive UI |
| `npm run test:headed` | `npx playwright test --headed` | Run with visible browser |
| `npm run test:debug` | `npx playwright test --debug` | Step-through debugger |
| `npm run test:chrome` | `npx playwright test --project=chromium` | Run only Chromium tests |
| `npm run test:report` | `npx playwright show-report` | Open last HTML report |

## Output Artifacts

| Directory | Purpose | Git Status |
| :--- | :--- | :--- |
| `playwright-report/` | HTML test reports | Ignored |
| `test-results/` | Screenshots, videos, traces | Ignored |

## Modifying the Configuration

### Running tests in multiple browsers
Uncomment the desired projects in `playwright.config.ts`:
```typescript
projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
]
```

### Running tests in headed mode
Either use `npm run test:headed` or set `headless: false` in the config.

### Changing viewport size
Modify the `viewport` setting:
```typescript
viewport: { width: 1280, height: 720 }
```

### Adding retries for flaky tests
Add a `retries` property:
```typescript
retries: 2,
```

### Setting test timeout
Add a `timeout` property (default is 30000ms):
```typescript
timeout: 60000,
```

### Running specific test files
```bash
npx playwright test tests/ui/auth/login-page.spec.ts
```

### Running tests by tag
Add tags to tests:
```typescript
test("Login test @smoke", async ({ loginPage }) => { ... });
```
Then run:
```bash
npx playwright test --grep @smoke
```
