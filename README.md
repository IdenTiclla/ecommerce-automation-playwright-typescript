# 🎭 Playwright TypeScript - E-commerce Testing Suite

[![Playwright](https://img.shields.io/badge/Playwright-1.54.2-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)](https://github.com/)

A robust and scalable automated testing suite developed with **Playwright** and **TypeScript** to validate the functional integrity of an e-commerce platform.

---

## 🌟 Key Features

This project implements comprehensive coverage for critical user flows using automation best practices:

- **Testing Strategy**:
  - ✅ **Authentication Flows**: Robust login with positive and negative validation.
  - ✅ **Account Management**: New user registration with detailed assertions.
  - ✅ **Product Exploration**: Advanced search and navigation on the homepage.
  - ✅ **Interactive Components**: Validation of UI elements like sliders and carousels.
- **Software Architecture**:
  - 🏗️ **Page Object Model (POM)**: Clear separation between business logic and locators.
  - 🔌 **Custom Fixtures**: Abstractions to simplify test setup.
  - 🛠️ **Utility Helpers**: Auxiliary functions for data manipulation and waits.

---

## 🛠️ Tech Stack

| Tool | Purpose |
| :--- | :--- |
| **Playwright** | Cross-browser automation engine |
| **TypeScript** | Static typing for safer and more maintainable code |
| **Node.js** | JavaScript runtime environment |
| **Dotenv** | Secure environment variable management |

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** (v18.0 or higher recommended)
- **npm** (v9.0 or higher)

### 2. Installation
```bash
# Install all dependencies
npm install

# Install required browsers for Playwright
npx playwright install
```

### 3. Environment Variables Configuration
Create a `.env` file in the project root (refer to `.env.example`) with the following variables for the tests to run correctly:

```env
VALID_EMAIL=your_email@gmail.com
VALID_PASSWORD=your_password
INVALID_EMAIL=invalid_email@test.com
INVALID_PASSWORD=incorrect_password
```

---

## 📖 Running Tests

The project includes several scripts configured in `package.json` for easy testing:

| Command | Action |
| :--- | :--- |
| `npm test` | Runs all tests in *headless* mode |
| `npm run test:ui` | Opens the Playwright UI (interactive) |
| `npm run test:headed` | Runs tests showing the browser |
| `npm run test:debug` | Starts the Playwright debugger |
| `npm run test:chrome` | Runs tests specifically in Chromium |
| `npm run test:report` | Shows the last generated HTML report |

---

## 📁 Project Structure

```bash
.
├── components/          # Shared components across pages
│   ├── MainSliderComponent.ts
│   └── SearchComponent.ts
├── fixtures/            # Custom test configurations
│   └── baseTest.ts
├── pages/               # Page Object Model (Page logic)
│   ├── BasePage.ts      # Common abstraction
│   ├── homePage.ts
│   ├── LoginPage.ts
│   └── RegisterPage.ts
├── tests/               # Test Suite (.spec.ts)
│   ├── api/             # API Tests (In progress)
│   └── ui/              # UI Tests
│       ├── auth/        # Login and Registration
│       └── home_page/   # Navigation, Search, and Sliders
├── utils/               # Helper functions and constants
│   └── helpers.ts
├── playwright.config.ts # Global framework configuration
└── .env                 # Secrets and credentials (Git ignored)
```

---

## 📊 Reporting and Observability

The project is configured to generate data-rich reports after each execution:

- **HTML Report**: Detailed interactive report.
- **Videos**: Full recording of each test execution.
- **Traces**: Step-by-step analysis of every action (excellent for debugging).
- **Screenshots**: Automatic captures on failure.

To view the results, run: `npm run test:report`

---

## 👤 Author

Developed as a professional practice project using **Playwright**.

---

## 📄 License

This project is licensed under the [ISC](https://opensource.org/licenses/ISC) license.
