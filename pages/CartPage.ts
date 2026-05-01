import { Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

class CartPage extends BasePage {
    public url: string = "https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart";

    readonly pageHeading: Locator;
    readonly emptyMessage: Locator;
    readonly continueButton: Locator;
    readonly cartTable: Locator;

    constructor(page: Page) {
        super(page);

        this.pageHeading = page.getByRole('heading', { name: 'Shopping Cart' });
        this.emptyMessage = page.locator('#content').getByText('Your shopping cart is empty!');
        this.continueButton = page.getByRole('link', { name: 'Continue' });
        this.cartTable = page.locator('.table-bordered');
    }

    async navigateToCartPage() {
        await this.page.goto(this.url);
    }

    async isEmpty(): Promise<boolean> {
        return this.emptyMessage.isVisible();
    }
}

export default CartPage;
