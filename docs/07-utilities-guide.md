# Utilities Guide

## Overview

Utility functions are located in `utils/helpers.ts`. These provide reusable helper functions for common operations like generating fake data.

## Directory Structure

```
utils/
└── helpers.ts    # Fake data generators
```

## Current Helpers

### `generateFakeUsername(): string`

Generates a random username with a `user_` prefix.

```typescript
const username = generateFakeUsername();
// Example: "user_k8j2n4m1p"
```

### `generateFakeLastname(): string`

Generates a random last name with a "Doe" prefix and numeric suffix.

```typescript
const lastname = generateFakeLastname();
// Example: "Doe482"
```

### `generateFakeEmail(): string`

Generates a random email address with `@example.com` domain.

```typescript
const email = generateFakeEmail();
// Example: "testuser_a3b7c9x2@example.com"
```

### `generateFakePassword(): string`

Generates a random password string with a `testpassword_` prefix.

```typescript
const password = generateFakePassword();
// Example: "testpassword_m4n8p2q6"
```

### `generateFakePhoneNumber(): string`

Generates a random 10-digit phone number.

```typescript
const phone = generateFakePhoneNumber();
// Example: "8392746150"
```

## Usage in Tests

```typescript
import {
    generateFakeEmail,
    generateFakePassword,
    generateFakeUsername,
    generateFakeLastname,
    generateFakePhoneNumber
} from "../../../utils/helpers";

test("Register a new user", async ({ registerPage }) => {
    const password = generateFakePassword();
    await registerPage.fillRegisterForm(
        generateFakeUsername(),
        generateFakeLastname(),
        generateFakeEmail(),
        generateFakePhoneNumber(),
        password,
        password,
        true,
        true
    );
});
```

## Adding New Helpers

When adding utility functions to `helpers.ts`:

1. **Export each function**: Use named exports (`export const`)
2. **Add return types**: Always specify the return type (`: string`, `: number`, etc.)
3. **Keep functions pure**: No side effects, no dependencies on external state
4. **Make them generic**: Functions should be reusable across different test scenarios
5. **Use arrow function syntax**: Follow the existing convention `export const fn = (): Type => { }`

### Template for a new helper

```typescript
export const generateFakeString = (prefix: string, length: number): string => {
    return `${prefix}_${Math.random().toString(36).substring(2, 2 + length)}`;
}
```

## Best Practices

1. **Never use fixed test data**: Use helpers to generate unique data each run, avoiding collisions
2. **Store and reuse generated values**: When you need the same value twice (e.g., password and confirmation), generate once and store:
   ```typescript
   const password = generateFakePassword();
   // use password for both fields
   ```
3. **Keep helpers focused**: Each function should do one thing
4. **No external dependencies**: Helpers should only use Node.js built-ins (Math, Date, etc.)
