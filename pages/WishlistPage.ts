import { Locator, Page } from "@playwright/test";

class WishlistPage {
    private page: Page;
    public url: string = "https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist";

    readonly loginForm: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly registerSection: Locator;
    readonly returningCustomerHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        this.loginForm = page.locator('#content form[action*="login"]');
        this.emailInput = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.registerSection = page.getByText('Register Account');
        this.returningCustomerHeading = page.getByRole('heading', { name: 'Returning Customer' });
    }

    async navigateToWishlistPage() {
        await this.page.goto(this.url);
    }

    async getPageUrl(): Promise<string> {
        return this.page.url();
    }

    async requiresLogin(): Promise<boolean> {
        return this.loginForm.isVisible();
    }
}

export default WishlistPage;
