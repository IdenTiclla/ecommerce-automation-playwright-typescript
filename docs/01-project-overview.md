# Project Overview

## What is this project?

This is a **Playwright + TypeScript** automated testing suite for an e-commerce web application. The application under test is the [LambdaTest E-Commerce Playground](https://ecommerce-playground.lambdatest.io/), a demo site designed for web automation practice.

## Tech Stack

| Tool | Version | Purpose |
| :--- | :--- | :--- |
| **Playwright** | ^1.54.2 | Cross-browser automation engine |
| **TypeScript** | 5.0+ | Static typing for safer, maintainable code |
| **Node.js** | v18.0+ | JavaScript runtime |
| **Dotenv** | ^17.4.2 | Secure environment variable management |

## Architecture Overview

This project follows the **Page Object Model (POM)** pattern with an additional **Component** layer for reusable UI elements shared across pages.

```
Project Architecture
│
├── pages/               Page Objects (POM)
│   ├── BasePage.ts          Abstract base with shared methods
│   ├── homePage.ts          Home page
│   ├── LoginPage.ts         Login page
│   ├── RegisterPage.ts      Registration page
│   └── SearchResultsPage.ts Search results page
│
├── components/          Reusable UI components
│   ├── SearchComponent.ts       Search bar widget
│   └── MainSliderComponent.ts   Carousel/slider widget
│
├── fixtures/            Custom Playwright fixtures
│   └── baseTest.ts          Fixture definitions with page object injection
│
├── tests/               Test suites
│   └── ui/
│       ├── auth/             Login and Registration tests
│       └── home_page/        Home page, Search, Slider tests
│
├── utils/               Helper functions
│   └── helpers.ts           Fake data generators
│
└── playwright.config.ts Global Playwright configuration
```

## Design Patterns

### Page Object Model (POM)
Each page is represented by a class that encapsulates:
- **Locators**: All element selectors as `readonly` properties
- **Actions**: Methods that interact with the page (click, fill, navigate)
- **State queries**: Methods that return data from the page (get title, get text)

### Component Pattern
Reusable UI widgets (search bar, slider) are extracted into separate component classes. Pages compose these components rather than duplicating locators and logic.

### Custom Fixtures
Page objects are instantiated through Playwright's fixture system (`fixtures/baseTest.ts`), providing automatic dependency injection into every test.

## Test Coverage

| Area | Test File | Tests |
| :--- | :--- | :--- |
| Home Page | `tests/ui/home_page/home-page.spec.ts` | Page title, URL, logo, dummy message |
| Search | `tests/ui/home_page/search.spec.ts` | Valid/invalid search, suggestions, categories, refinements |
| Slider | `tests/ui/home_page/slider.spec.ts` | Visibility, navigation (next/prev/indicators), content |
| Login | `tests/ui/auth/login-page.spec.ts` | Valid/invalid credentials, search from login page |
| Register | `tests/ui/auth/register-page.spec.ts` | Label verification, full registration flow |

## Environment Variables

Configured via `.env` (see `.env.example`):

| Variable | Purpose |
| :--- | :--- |
| `BASE_URL` | Base URL of the application under test |
| `VALID_EMAIL` | Email for positive login tests |
| `VALID_PASSWORD` | Password for positive login tests |
| `INVALID_EMAIL` | Email for negative login tests |
| `INVALID_PASSWORD` | Password for negative login tests |
