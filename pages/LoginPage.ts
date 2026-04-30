import { Page } from "@playwright/test";
import SearchComponent from "./components/SearchComponent";

class LoginPage {
    private page: Page;
    public url: string = "https://ecommerce-playground.lambdatest.io/index.php?route=account/login";
    readonly searchComponent: SearchComponent;
    
    constructor(page: Page) {
        this.page = page;
        this.searchComponent = new SearchComponent(this.page);
    }

    async navigateToLoginPage() {
        await this.page.goto(this.url);
    }

    async fillEmail(email: string) {
        await this.page.getByRole('textbox', { name: 'E-Mail Address' }).fill(email);
    }
    
    async fillPassword(password: string) {
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    }

    async clickOnLoginButton() {
        await this.page.getByRole('button', { name: 'Login' }).click()
    }
}

export default LoginPage;