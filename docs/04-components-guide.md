# Components Guide

## What is a Component?

A Component is a reusable UI widget that appears across multiple pages. Unlike Page Objects which represent an entire page, Components represent a self-contained piece of UI (e.g., a search bar, a navigation menu, a slider).

## Directory Structure

```
pages/components/
├── SearchComponent.ts       # Search bar widget
└── MainSliderComponent.ts   # Carousel/slider widget
```

## Why Components?

The search bar, for example, appears on the home page, login page, and search results page. Without the Component pattern, you would duplicate the same locators and methods in every Page Object.

**Before (duplication):**
```typescript
// In HomePage
this.search_input = page.getByPlaceholder("Search For Products");
async searchForProduct(name) { ... }

// In LoginPage
this.search_input = page.getByPlaceholder("Search For Products");
async searchForProduct(name) { ... }
```

**After (component):**
```typescript
// In HomePage
this.searchComponent = new SearchComponent(page);

// In LoginPage
this.searchComponent = new SearchComponent(page);
```

## Creating a New Component

### Template

```typescript
import { Locator, Page } from "@playwright/test"

class YourComponent {
    readonly some_element: Locator;
    readonly another_element: Locator;

    constructor(page: Page) {
        this.some_element = page.getByRole("button", { name: "Action" });
        this.another_element = page.locator(".some-widget .item");
    }

    async performAction(param: string) {
        await this.some_element.click();
    }

    async getData(): Promise<string> {
        return this.another_element.innerText();
    }
}

export default YourComponent;
```

### Rules for Components

1. **Accept only `Page` in the constructor**: Components receive the Playwright `Page` object
2. **Do NOT extend BasePage**: Components are not pages; they are standalone widgets
3. **All locators are `readonly`**: Initialize in the constructor
4. **Use `this.search_input.page()`** to access the page from a locator if needed (see `SearchComponent.selectCategory`)
5. **Export as default**: `export default YourComponent`
6. **Self-contained**: A component should not import or depend on other page objects

## Using Components in Page Objects

In the Page Object's constructor, instantiate the component:

```typescript
import SearchComponent from "./components/SearchComponent";

class HomePage extends BasePage {
    readonly searchComponent: SearchComponent;

    constructor(page: Page) {
        super(page);
        this.searchComponent = new SearchComponent(page);
    }
}
```

In tests, access the component through the page object:

```typescript
await homePage.searchComponent.searchForProduct("iPhone");
```

## Existing Components Reference

### SearchComponent (`pages/components/SearchComponent.ts`)

Represents the search bar widget that appears in the site header across all pages.

| Property | Type | Selector Strategy | Description |
| :--- | :--- | :--- | :--- |
| `search_input` | `Locator` | `getByPlaceholder` + visible filter | Search text input |
| `search_button` | `Locator` | `getByRole("button")` + visible filter | Search submit button |
| `category_dropdown` | `Locator` | CSS + visible filter | Category selector dropdown |
| `suggestions_list` | `Locator` | CSS + visible filter | Autocomplete suggestions dropdown |

| Method | Parameters | Returns | Description |
| :--- | :--- | :--- | :--- |
| `searchForProduct(productName)` | `string` | `void` | Fills search input and clicks search |
| `typeInSearchInput(text)` | `string` | `void` | Types text character-by-character with delay (triggers autocomplete) |
| `selectCategory(category)` | `string` | `void` | Opens dropdown and selects a category by name |
| `getSuggestions()` | - | `Locator` | Returns the suggestion list items |
| `clickOnSuggestion(index)` | `number` | `void` | Clicks on a suggestion by index |

**Used in**: `HomePage`, `LoginPage`, `SearchResultsPage`

### MainSliderComponent (`pages/components/MainSliderComponent.ts`)

Represents the main carousel/slider on the home page.

| Property | Type | Selector Strategy | Description |
| :--- | :--- | :--- | :--- |
| `container` | `Locator` | CSS (`#mz-carousel-218380`) | Slider container element |
| `nextButton` | `Locator` | CSS (scoped to container) | Next slide button |
| `prevButton` | `Locator` | CSS (scoped to container) | Previous slide button |
| `indicators` | `Locator` | CSS (scoped to container) | Slide indicator dots |
| `activeSlide` | `Locator` | CSS (scoped to container) | Currently active slide |

| Method | Parameters | Returns | Description |
| :--- | :--- | :--- | :--- |
| `clickNext()` | - | `void` | Scrolls into view and clicks next (force click) |
| `clickPrev()` | - | `void` | Scrolls into view and clicks previous (force click) |
| `clickOnIndicator(index)` | `number` | `void` | Clicks a specific indicator dot |
| `getActiveSlideIndex()` | - | `Promise<number>` | Returns the index of the currently active slide (-1 if none found) |

**Used in**: `HomePage`

## When to Create a Component vs. Keep It in a Page Object

**Create a Component when:**
- The UI widget appears on **more than one page**
- The widget has **complex interactions** that warrant their own class
- The widget is **self-contained** with its own boundary

**Keep it in the Page Object when:**
- The element is **unique to a single page**
- The element has **few locators** (1-2) and simple interactions
- There is no reuse potential across pages

## Best Practices

1. **Scope locators carefully**: When a component exists in the page header, use `.filter({ visible: true })` to avoid matching hidden instances
2. **Handle overlapping elements**: Use `{ force: true }` when elements may be partially obscured (e.g., sliders behind other content)
3. **Scroll into view first**: For components below the fold, call `scrollIntoViewIfNeeded()` before interacting
4. **Keep components focused**: A component should handle one UI concern (search, navigation, slider) rather than multiple unrelated elements
5. **Use the page reference from locators**: If you need the page object inside a component method, access it via `this.some_locator.page()` rather than storing a separate page reference
