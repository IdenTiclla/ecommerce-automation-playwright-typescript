# Automation Scripts (Tests) Guide

## Overview

Tests are located in the `tests/` directory, organized by type and feature area. All tests use the custom fixtures defined in `fixtures/baseTest.ts`.

## Directory Structure

```
tests/
└── ui/
    ├── auth/
    │   ├── login-page.spec.ts      # Login tests
    │   └── register-page.spec.ts   # Registration tests
    └── home_page/
        ├── home-page.spec.ts       # Home page tests
        ├── search.spec.ts          # Search functionality tests
        └── slider.spec.ts          # Slider component tests
```

## Writing a New Test

### Template

```typescript
import { test, expect } from "../../fixtures/baseTest"

test.describe("Feature Name", () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.navigateToHomePage();
    });

    test("Test description", async ({ page, homePage, loginPage }) => {
        // Arrange - set up preconditions

        // Act - perform actions

        // Assert - verify results
    });
});
```

### Step-by-step

1. **Create the file** at `tests/ui/<category>/<feature>.spec.ts`
2. **Import fixtures**: Always import from `../../fixtures/baseTest`, not directly from `@playwright/test`
3. **Use `test.describe`** to group related tests
4. **Use `test.beforeEach`** for common setup (navigation, etc.)
5. **Write tests using the Arrange-Act-Assert pattern**
6. **Use available fixtures** (page objects) instead of creating them manually

## Importing Fixtures

**CORRECT** - Import from custom fixtures:
```typescript
import { test, expect } from "../../fixtures/baseTest"
```

**INCORRECT** - Do not import directly from Playwright (you lose page object injection):
```typescript
import { test, expect } from "@playwright/test"
```

## Available Test Fixtures

The following page objects are available as test parameters via `baseTest.ts`:

| Fixture | Type | Description |
| :--- | :--- | :--- |
| `page` | `Page` | Playwright's built-in page object |
| `homePage` | `HomePage` | Home page object |
| `loginPage` | `LoginPage` | Login page object |
| `registerPage` | `RegisterPage` | Registration page object |
| `searchResultsPage` | `SearchResultsPage` | Search results page object |

Usage:
```typescript
test("My test", async ({ page, homePage, loginPage }) => {
    // All three fixtures are automatically instantiated
});
```

## Using Helper Functions

Import from `utils/helpers.ts` for fake data generation:

```typescript
import {
    generateFakeUsername,
    generateFakeLastname,
    generateFakeEmail,
    generateFakePassword,
    generateFakePhoneNumber
} from "../../utils/helpers";
```

| Helper | Returns | Example Output |
| :--- | :--- | :--- |
| `generateFakeUsername()` | `string` | `user_k8j2n4m1p` |
| `generateFakeLastname()` | `string` | `Doe482` |
| `generateFakeEmail()` | `string` | `testuser_a3b7c9x2@example.com` |
| `generateFakePassword()` | `string` | `testpassword_m4n8p2q6` |
| `generateFakePhoneNumber()` | `string` | `8392746150` |

## Assertion Patterns

### Visibility assertions
```typescript
await expect(locator).toBeVisible();
await expect(locator).toBeEnabled();
```

### Text assertions
```typescript
expect(stringValue).toBe("Expected Text");
await expect(locator).toContainText("partial text");
await expect(locator).toHaveText("exact text");
```

### URL assertions
```typescript
expect(page.url()).toBe("https://full-url.com/");
await expect(page).toHaveURL(/regex-pattern/);
await expect(page).toHaveURL("exact-url");
```

### Attribute assertions
```typescript
await expect(locator).toHaveAttribute("src", "https://...");
await expect(locator).toHaveAttribute("aria-expanded", "true");
```

### Value assertions
```typescript
await expect(locator).toHaveValue("input value");
expect(await locator.inputValue()).toBe("");
```

### Count/length assertions
```typescript
const count = await locator.count();
expect(count).toBeGreaterThan(0);
expect(array.length).toBeGreaterThan(0);
```

### Iterative assertions
```typescript
for (const name of productNames) {
    expect(name.toLowerCase()).toContain("iphone");
}
```

## Test Organization Patterns

### Standalone tests
Use when tests are independent and don't share setup:
```typescript
test("Verify dummy website message", async ({ page, homePage }) => {
    await homePage.navigateToHomePage();
    // assertions...
});
```

### Grouped tests with shared setup
Use `test.describe` + `test.beforeEach` for related tests:
```typescript
test.describe("Search Component Tests", () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigateToHomePage();
    });

    test("Verify search for a valid product", async ({ homePage, searchResultsPage }) => {
        // homePage is already navigated
    });
});
```

### Multi-page test flows
Some tests navigate across pages in a single flow:
```typescript
test("Register a new user", async ({ page, homePage, registerPage }) => {
    await homePage.navigateToHomePage();
    await homePage.clickOnMyAccount();
    await registerPage.navigateToRegisterPage();
    // fill and assert...
});
```

## Environment Variables in Tests

Access `.env` variables via `process.env`:

```typescript
await loginPage.fillEmail(process.env.VALID_EMAIL);
await loginPage.fillPassword(process.env.VALID_PASSWORD);
```

## Test Naming Conventions

- Start test names with **"Verify"**: `"Verify search for a valid product"`
- Be descriptive and specific: `"Verify that the logo has the correct src and alt attribute on home page"`
- Include the feature area: `"Verify search results page has sort by options"`

## Existing Test Suites Reference

### Home Page Tests (`tests/ui/home_page/home-page.spec.ts`)

6 tests covering:
- Dummy message verification
- Page title validation
- Page URL validation
- Store logo visibility, clickability, and attribute checks

### Search Tests (`tests/ui/home_page/search.spec.ts`)

26 tests organized in a `test.describe` block covering:
- Valid/empty/special character searches
- Search suggestions and autocomplete
- Category dropdown functionality
- Search result refinement
- Search persistence after refresh
- Sort and display controls on results page
- Logo navigation from search results

### Slider Tests (`tests/ui/home_page/slider.spec.ts`)

4 tests covering:
- Slider visibility
- Indicator (dot) navigation
- Next/previous button navigation
- Active slide content verification

### Login Tests (`tests/ui/auth/login-page.spec.ts`)

3 tests covering:
- Valid credential login
- Invalid credential login with error message
- Search functionality from login page

### Register Tests (`tests/ui/auth/register-page.spec.ts`)

2 tests covering:
- Form label verification
- Full registration flow with generated fake data

## Best Practices

1. **Always use custom fixtures**: Import from `baseTest`, not directly from `@playwright/test`
2. **Use Arrange-Act-Assert**: Structure tests clearly with these three sections
3. **One assertion per concept**: Don't overload a test; focus on one behavior
4. **Use `test.describe`** for grouping related tests with shared setup
5. **Use `test.beforeEach`** for navigation and common setup rather than repeating in every test
6. **Generate fake data** using `utils/helpers.ts` for registration and form-filling tests
7. **Use environment variables** for credentials, never hardcode them
8. **Test both positive and negative scenarios**: Valid inputs AND invalid inputs
9. **Assert on the result**: After an action, always assert the expected outcome
10. **Keep tests independent**: Each test should be able to run alone without depending on another test's state
