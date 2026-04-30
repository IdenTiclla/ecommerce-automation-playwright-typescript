# Page Objects Guide

## What is a Page Object?

A Page Object is a class that represents a single page of the web application. It encapsulates all locators and interactions for that page in one place, keeping tests clean and maintainable.

## Directory Structure

```
pages/
├── components/           # Reusable widgets
├── BasePage.ts           # Abstract base class
├── homePage.ts           # Home page object
├── LoginPage.ts          # Login page object
├── RegisterPage.ts       # Registration page object
└── SearchResultsPage.ts  # Search results page object
```

## BasePage - The Foundation

All page objects that represent a full page should extend `BasePage`. It provides shared functionality.

**File**: `pages/BasePage.ts`

```typescript
import { Page } from "@playwright/test"

class BasePage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    waitForPageLoad(timeout: number = 10000) {
        this.page.waitForLoadState('networkidle', { timeout })
    }

    getPageTitle(): Promise<string> {
        return this.page.title()
    }

    getPageUrl(): string {
        return this.page.url()
    }
}

export default BasePage
```

### What BasePage provides:
- `page` reference accessible to all child pages
- `waitForPageLoad()` for synchronization
- `getPageTitle()` for title assertions
- `getPageUrl()` for URL assertions

## Creating a New Page Object

### Step-by-step

1. **Create the file** at `pages/YourPageName.ts`
2. **Import dependencies**: `Page`, `Locator`, `BasePage`, any components
3. **Extend BasePage** (or create a standalone class if the page doesn't need base functionality)
4. **Define locators** as `readonly` properties in the constructor
5. **Define action methods** for user interactions
6. **Export as default**

### Template - Page extending BasePage

```typescript
import { Page, Locator } from "@playwright/test";
import BasePage from "./BasePage";
import SomeComponent from "./components/SomeComponent";

class YourPage extends BasePage {
    public url: string = process.env.BASE_URL + "/your-path";

    readonly some_element: Locator;
    readonly some_component: SomeComponent;

    constructor(page: Page) {
        super(page);

        this.some_component = new SomeComponent(page);
        this.some_element = page.getByRole("heading", { name: "Your Page" });
    }

    async navigateToYourPage() {
        await this.page.goto(this.url);
    }

    async someAction(param: string) {
        await this.some_element.fill(param);
    }

    async getSomeData(): Promise<string> {
        return this.some_element.innerText();
    }
}

export default YourPage;
```

### Template - Standalone page (no BasePage)

```typescript
import { Page, Locator } from "@playwright/test";

class YourPage {
    private page: Page;
    private url: string = "https://example.com/your-path";

    readonly some_element: Locator;

    constructor(page: Page) {
        this.page = page;
        this.some_element = page.locator(".some-selector");
    }

    async navigateToYourPage() {
        await this.page.goto(this.url);
    }
}

export default YourPage;
```

## Existing Page Objects Reference

### HomePage (`pages/homePage.ts`)

**Extends**: `BasePage`
**URL**: `process.env.BASE_URL`

| Property | Type | Description |
| :--- | :--- | :--- |
| `searchComponent` | `SearchComponent` | Search bar widget |
| `mainSlider` | `MainSliderComponent` | Carousel slider widget |
| `store_logo` | `Locator` | Store logo image |
| `dummy_message` | `Locator` | Dummy website message text |

| Method | Returns | Description |
| :--- | :--- | :--- |
| `navigateToHomePage()` | `void` | Navigates to `/` |
| `clickOnMyAccount()` | `void` | Clicks "My account" button |
| `getPageTitle()` | `Promise<string>` | Returns page title |
| `getThisDummyMessage()` | `Promise<string>` | Returns the dummy message text |

### LoginPage (`pages/LoginPage.ts`)

**Standalone** (does not extend BasePage)
**URL**: `https://ecommerce-playground.lambdatest.io/index.php?route=account/login`

| Property | Type | Description |
| :--- | :--- | :--- |
| `searchComponent` | `SearchComponent` | Search bar widget |

| Method | Returns | Description |
| :--- | :--- | :--- |
| `navigateToLoginPage()` | `void` | Navigates to login URL |
| `fillEmail(email)` | `void` | Fills the email input |
| `fillPassword(password)` | `void` | Fills the password input |
| `clickOnLoginButton()` | `void` | Clicks the Login button |

### RegisterPage (`pages/RegisterPage.ts`)

**Standalone** (does not extend BasePage)
**URL**: `https://ecommerce-playground.lambdatest.io/index.php?route=account/register`

| Property | Type | Description |
| :--- | :--- | :--- |
| `firstNameInput` | `Locator` | First name input |
| `lastNameInput` | `Locator` | Last name input |
| `emailInput` | `Locator` | Email input |
| `telephoneInput` | `Locator` | Telephone input |
| `passwordInput` | `Locator` | Password input |
| `passwordConfirmInput` | `Locator` | Password confirmation input |
| `subscribeInput` | `Locator` | Newsletter subscription radio |
| `agreeInput` | `Locator` | Terms agreement checkbox |
| `continueButton` | `Locator` | Continue/submit button |
| `labels` | `Locator` | All form labels |

| Method | Returns | Description |
| :--- | :--- | :--- |
| `navigateToRegisterPage()` | `void` | Navigates to register URL |
| `fillRegisterForm(...)` | `void` | Fills the entire registration form and submits |

### SearchResultsPage (`pages/SearchResultsPage.ts`)

**Extends**: `BasePage`

| Property | Type | Description |
| :--- | :--- | :--- |
| `searchComponent` | `SearchComponent` | Search bar widget |
| `store_logo` | `Locator` | Store logo image |
| `page_heading` | `Locator` | H1 heading |
| `breadcrumb` | `Locator` | Breadcrumb navigation |
| `no_results_message` | `Locator` | "No results" message |
| `showing_results_text` | `Locator` | "Showing X to Y of Z" text |
| `product_cards` | `Locator` | All product card elements |
| `product_names` | `Locator` | Product name links |
| `product_prices` | `Locator` | Product price elements |
| `search_criteria_input` | `Locator` | Search keyword input on results page |
| `sort_by_select` | `Locator` | Sort dropdown |
| `show_select` | `Locator` | Show count dropdown |

| Method | Returns | Description |
| :--- | :--- | :--- |
| `getProductCount()` | `Promise<number>` | Returns number of product cards |
| `getProductNames()` | `Promise<string[]>` | Returns all product names |
| `clickOnProduct(index)` | `void` | Clicks product at given index |
| `sortBy(option)` | `void` | Selects a sort option |
| `setShowCount(count)` | `void` | Selects items per page |
| `refineSearchWithCriteria(keyword)` | `void` | Refines search from the results page |

## Best Practices

1. **One page per file**: Each page gets its own class file
2. **Compose components**: Include component instances as properties when the page contains reusable widgets
3. **Keep locators in the constructor**: Initialize all locators in the constructor, not in methods
4. **Use `readonly` for locators**: Locators should not be reassigned after construction
5. **Hide the `page` reference**: Make `page` private unless child classes need it (use `protected` or `public` as needed)
6. **Return values, not assertions**: Page methods should return data; let tests handle assertions
7. **URL as a property**: Store the page URL as a class property for easy navigation
8. **Zero locators in tests**: Never use `.locator()`, `.getBy...()`, CSS selectors, or XPath inside `.spec.ts` files. All selectors must live in Page Object classes
9. **No raw `page` in tests**: Expose `getPageUrl()` and `getPageTitle()` methods so tests never call `page.toHaveURL()` or `page.toHaveTitle()` directly
10. **Child elements as properties**: If a child element needs verification (e.g. a badge inside a link), create a dedicated property (e.g. `this.specialBadge`) rather than using `.locator()` in the test
11. **Attribute and class checks as methods**: Expose methods like `getHomeHref()` or `isDropdownToggle()` instead of using `.toHaveAttribute()` or `.toHaveClass()` directly on exposed locators in tests
