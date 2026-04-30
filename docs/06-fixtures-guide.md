# Custom Fixtures Guide

## What are Fixtures?

Playwright fixtures are a dependency injection mechanism. They allow you to declare what your tests need (page objects, data, configurations) and have them automatically instantiated before each test and cleaned up after.

## File Location

```
fixtures/
└── baseTest.ts    # Custom fixture definitions
```

## Current Fixture Setup

**File**: `fixtures/baseTest.ts`

```typescript
import { test as base } from "@playwright/test"
import HomePage from "../pages/homePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import SearchResultsPage from "../pages/SearchResultsPage";

type MyFixtures = {
    homePage: HomePage
    loginPage: LoginPage
    registerPage: RegisterPage
    searchResultsPage: SearchResultsPage
}

export const test = base.extend<MyFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    registerPage: async ({ page }, use) => {
        const registerPage = new RegisterPage(page);
        await use(registerPage);
    },
    searchResultsPage: async ({ page }, use) => {
        const searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
    }
});

export { expect } from "@playwright/test";
```

## How It Works

1. **`test as base`**: We rename Playwright's built-in `test` to `base` so we can extend it
2. **`MyFixtures` type**: Defines the shape of our custom fixtures for TypeScript type checking
3. **`base.extend<MyFixtures>(...)`**: Creates a new `test` function with our custom fixtures
4. **Each fixture**: Receives `{ page }` from Playwright, creates the page object, and passes it via `use()`
5. **Re-export `expect`**: So tests don't need a separate import from `@playwright/test`

## Adding a New Fixture

When you create a new Page Object, register it as a fixture:

1. **Import the page object** in `baseTest.ts`
2. **Add it to the `MyFixtures` type**
3. **Add the fixture definition** in `base.extend()`

### Example: Adding an `AccountPage` fixture

```typescript
import AccountPage from "../pages/AccountPage";

type MyFixtures = {
    homePage: HomePage
    loginPage: LoginPage
    registerPage: RegisterPage
    searchResultsPage: SearchResultsPage
    accountPage: AccountPage              // 1. Add to type
}

export const test = base.extend<MyFixtures>({
    // ...existing fixtures...

    accountPage: async ({ page }, use) => {  // 2. Add definition
        const accountPage = new AccountPage(page);
        await use(accountPage);
    }
});
```

Then use it in tests:
```typescript
test("My account page test", async ({ accountPage }) => {
    await accountPage.navigateToAccountPage();
});
```

## Why Use Custom Fixtures?

| Without Fixtures | With Fixtures |
| :--- | :--- |
| `const loginPage = new LoginPage(page);` in every test | `async ({ loginPage }) =>` - automatic injection |
| Manual instantiation repeated across files | Single definition in `baseTest.ts` |
| Easy to forget initialization | TypeScript enforces fixture availability |
| Hard to add setup/teardown per page object | Can add before/after logic in fixture |

## Best Practices

1. **Always import from `baseTest`**: Tests should use `import { test, expect } from "../../fixtures/baseTest"`
2. **One fixture per page object**: Each page object gets its own fixture entry
3. **Keep fixtures simple**: Just instantiate the page object and pass it via `use()`
4. **Re-export `expect`**: Always re-export `expect` so tests only need one import line
5. **Don't duplicate `page` access**: The `page` fixture is still available alongside custom fixtures
6. **Add fixtures as needed**: Not every page needs a fixture - only pages used in tests
