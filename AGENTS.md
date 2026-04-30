# AGENTS.md

## Setup

```bash
npm install
npx playwright install        # required after npm install
```

A `.env` file (see `.env.example`) with `BASE_URL`, `VALID_EMAIL`, `VALID_PASSWORD`, `INVALID_EMAIL`, `INVALID_PASSWORD` is required. Tests reading credentials will fail silently or skip without it. Dotenv is loaded in `playwright.config.ts`, not at test level.

## Commands

```bash
npm test                      # all tests, headless
npm run test:headed           # visible browser
npm run test:chrome           # chromium only (only active project)
npm run test:ui               # interactive Playwright UI
npm run test:debug            # step-through debugger
npm run test:report           # open last HTML report
```

Run a single test file or a single test:
```bash
npx playwright test tests/ui/auth/login-page.spec.ts
npx playwright test -g "Login with valid credentials"
```

There is no lint, typecheck, or formatter configured. No build step — Playwright runs `.ts` natively.

## Architecture

- **Page Object Model (strict POM)**: all page classes live in `pages/` and extend `BasePage`. **Zero locators in test files** — `.locator()`, `.getBy...()`, CSS selectors, and XPath are forbidden inside `.spec.ts` files. All selectors must be encapsulated in the corresponding Page Object class as `readonly` properties or methods. If a child element needs verification (e.g. a badge inside a link), create a dedicated property (e.g. `this.specialBadge`) or a method in the Page Object.
- **No raw `page` in tests**: do NOT use `page.toHaveURL()`, `page.toHaveTitle()`, or any direct `page` assertions inside tests. Instead, expose `getPageUrl()` / `getPageTitle()` methods on the Page Object and assert on the returned values with `expect(url).toContain(...)`.
- **Custom fixtures** (`fixtures/baseTest.ts`) wire page objects into the test context. **Tests must import `test` and `expect` from `../../fixtures/baseTest` (or the correct relative path), not from `@playwright/test` directly.** This is the most common mistake.
- When adding a new page object, it must also be registered in `fixtures/baseTest.ts` or it won't be available in tests.
- Shared UI components (e.g. search, slider, navigation) live under `pages/components/`, not a root `components/` directory.
- Test files use the `*.spec.ts` suffix and live under `tests/` (organized into `tests/ui/` and `tests/api/`).

## Quirks

- Only the **chromium** project is active in `playwright.config.ts`; firefox/safari/edge are commented out.
- Viewport is set to 1920×1080, not the Playwright default.
- Video recording is `on` for every test; traces are `on`; screenshots are `only-on-failure`. Test artifacts accumulate in `test-results/` and `playwright-report/`.
- No `tsconfig.json` exists — the project relies on Playwright's built-in TypeScript support.
