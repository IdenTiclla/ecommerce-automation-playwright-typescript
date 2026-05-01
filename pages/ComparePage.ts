import { Page } from "@playwright/test";
import BasePage from "./BasePage";

class ComparePage extends BasePage {
    public url: string = "https://ecommerce-playground.lambdatest.io/index.php?route=product/compare";

    readonly pageHeading;
    readonly emptyMessage;
    readonly continueButton;

    constructor(page: Page) {
        super(page);

        this.pageHeading = page.getByRole('heading', { name: 'Product Comparison' });
        this.emptyMessage = page.getByText('You have not chosen any products to compare.');
        this.continueButton = page.getByRole('link', { name: 'Continue' });
    }

    async navigateToComparePage() {
        await this.page.goto(this.url);
    }

    async isEmpty(): Promise<boolean> {
        return this.emptyMessage.isVisible();
    }
}

export default ComparePage;
