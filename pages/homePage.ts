import { Page } from "@playwright/test";
import BasePage from "./BasePage";

class HomePage extends BasePage {
    public url: string = "https://ecommerce-playground.lambdatest.io/";
    // private page: Page;

    constructor(page: Page) {
        super(page);
    }

    async navigateToHomePage() {
        await this.page.goto(this.url);
    }

    async clickOnMyAccount() {
        await this.page.getByRole('button', { name: ' My account' }).click();
    }

    
    
}

export default HomePage;