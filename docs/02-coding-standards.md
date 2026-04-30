# Coding Standards

## General Principles

- **Language**: TypeScript (strict mode implied by Playwright)
- **No comments**: Do not add comments in code unless explicitly requested. Code should be self-documenting through clear naming.
- **No emojis**: Avoid emojis in code files.
- **No secrets**: Never hardcode credentials, API keys, or tokens. Use `.env` for all sensitive values.

## Naming Conventions

### Files and Folders

| Type | Convention | Example |
| :--- | :--- | :--- |
| Page Object files | PascalCase | `LoginPage.ts`, `SearchResultsPage.ts` |
| Component files | PascalCase with "Component" suffix | `SearchComponent.ts` |
| Test files | kebab-case with `.spec.ts` suffix | `login-page.spec.ts` |
| Utility files | camelCase | `helpers.ts` |
| Fixture files | camelCase | `baseTest.ts` |
| Config files | kebab-case | `playwright.config.ts` |

### Classes

- Use **PascalCase**: `LoginPage`, `SearchComponent`, `BasePage`
- Export classes as **default exports**: `export default LoginPage`
- Name page classes after the page they represent: `HomePage`, `RegisterPage`

### Properties and Locators

- Use **camelCase** for properties: `search_input`, `store_logo`, `product_cards`
- Use **snake_case** for locator properties (this project's convention): `search_input`, `search_button`, `page_heading`
- Declare locators as **readonly**: `readonly search_input: Locator`
- Declare public properties explicitly when accessed from tests: `public url: string`
- Declare private properties with the `private` keyword when they should not be accessed externally

### Methods

- Use **camelCase**: `navigateToHomePage()`, `fillEmail()`, `searchForProduct()`
- Name navigation methods starting with `navigateTo`: `navigateToLoginPage()`
- Name click methods starting with `clickOn`: `clickOnLoginButton()`
- Name fill methods starting with `fill`: `fillEmail()`, `fillPassword()`
- Name getter methods starting with `get`: `getPageTitle()`, `getProductCount()`
- Name boolean-returning methods starting with `is` or `has`: `isVisible()`, `hasResults()`

### Variables in Tests

- Use **camelCase**: `const dummyMessage`, `const page_title`
- Type annotations are encouraged: `const dummyMessage: string`
- Use descriptive names: `generatedPassword`, `randomEmail`

## Imports

- Import from `@playwright/test`: `Page`, `Locator`, `test`, `expect`
- Import page objects and components using relative paths: `import BasePage from "./BasePage"`
- Import fixtures in tests: `import { test, expect } from "../../../fixtures/baseTest"`
- Import helpers: `import { generateFakeEmail } from "../../../utils/helpers"`

Order of imports:
1. Playwright / framework imports
2. Page objects and components
3. Utility functions

```typescript
import { Page, Locator } from "@playwright/test";
import BasePage from "./BasePage";
import SearchComponent from "./components/SearchComponent";
```

## Locators Strategy

**Priority order** (most to least preferred):

1. **`getByRole`** - Accessible, resilient to DOM changes
   ```typescript
   page.getByRole('button', { name: 'Login' })
   page.getByRole('textbox', { name: 'E-Mail Address' })
   ```

2. **`getByText`** - For text-based assertions
   ```typescript
   page.getByText("There is no product that matches the search criteria.")
   ```

3. **`getByPlaceholder`** - For input fields
   ```typescript
   page.getByPlaceholder("Search For Products")
   ```

4. **`getByAltText`** - For images
   ```typescript
   page.getByAltText("Poco Electro")
   ```

5. **`locator()` with CSS selectors** - Last resort, when no semantic selector is available
   ```typescript
   page.locator("#button-search")
   page.locator(".product-thumb")
   ```

6. **`.filter()`** - Narrow down locators when multiple matches exist
   ```typescript
   page.getByPlaceholder("Search For Products").filter({ visible: true })
   ```

## Strict POM Rule — Zero Locators in Tests

**All locators must be defined inside Page Object classes.** Test files (`.spec.ts`) must NEVER contain `.locator()`, `.getBy...()`, CSS selectors, or XPath.

### What is FORBIDDEN in test files

```typescript
// WRONG — locators in tests
const badge = mainNavigation.specialLink.locator('.badge')
await expect(page).toHaveURL(/route=common\/home/)
await expect(page).toHaveTitle("Your Store")
await expect(mainNavigation.homeLink).toHaveAttribute("href", /route=common\/home/)
await expect(mainNavigation.megaMenuLink).toHaveClass(/dropdown-toggle/)
```

### What is CORRECT

```typescript
// RIGHT — use Page Object properties and methods
await expect(mainNavigation.specialBadge).toBeVisible()
const url = await mainNavigation.getPageUrl()
const title = await mainNavigation.getPageTitle()
expect(url).toContain("route=common/home")
expect(title).toBe("Your Store")

const href = await mainNavigation.getHomeHref()
expect(href).toContain("route=common/home")

const isToggle = await mainNavigation.isMegaMenuToggle()
expect(isToggle).toBe(true)
```

### Rules

1. **Child elements**: If you need to verify a sub-element (e.g. a badge inside a nav link), create a dedicated `readonly` property in the Page Object (e.g. `this.specialBadge = this.specialLink.locator('.badge')`).
2. **URL and Title checks**: Expose `getPageUrl()` and `getPageTitle()` methods on the Page Object or Component. Tests call these methods and assert on the returned strings.
3. **Attribute checks**: Expose getter methods like `getHomeHref()` that return the attribute value, or boolean methods like `isMegaMenuToggle()` for class checks.
4. **Visibility assertions**: It is acceptable to use `expect(pageObject.someProperty).toBeVisible()` as long as `someProperty` is a `readonly` Locator defined in the Page Object constructor.

## Error Handling

- Use Playwright's built-in auto-waiting and assertions rather than manual `try/catch`
- Use `waitForLoadState` in the base page for synchronization
- Avoid `waitForTimeout` except when waiting for animations (e.g., slider transitions)
- Set timeouts on operations that may take longer: `waitForPageLoad(timeout: number = 10000)`

## async/await

- All Playwright interactions are asynchronous; always use `async/await`
- Mark methods as `async` when they contain `await` calls
- Return `Promise<T>` for async methods that return values:
  ```typescript
  async getPageTitle(): Promise<string> {
      return this.page.title();
  }
  ```

## Type Safety

- Always type function parameters and return values
- Use Playwright types: `Page`, `Locator`
- Use TypeScript primitives for data: `string`, `number`, `boolean`
- Define custom types in fixtures:
  ```typescript
  type MyFixtures = {
      homePage: HomePage
      loginPage: LoginPage
  }
  ```

## File Organization Within Classes

Follow this order inside class files:

1. **Imports**
2. **Class declaration**
3. **Properties** (locators first, then components)
4. **Constructor**
5. **Navigation methods**
6. **Action methods** (fill, click, select)
7. **Query methods** (get text, get count)
8. **Export statement**
