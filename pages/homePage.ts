import { Page, Locator } from "@playwright/test";
import BasePage from "./BasePage";
import SearchComponent from "../components/SearchComponent";
import MainSliderComponent from "../components/MainSliderComponent";


class HomePage extends BasePage {
    public url: string = process.env.BASE_URL || "https://ecommerce-playground.lambdatest.io/";
    // private page: Page;
    readonly dummy_message: Locator;
    readonly dummy_message_loc2: Locator;
    readonly store_logo: Locator;
    readonly searchComponent: SearchComponent;
    readonly mainSlider: MainSliderComponent;

    constructor(page: Page) {
        super(page);
        
        // components
        this.searchComponent = new SearchComponent(page);
        this.mainSlider = new MainSliderComponent(page);

        // locators
        this.dummy_message = page.locator("p strong");
        this.dummy_message_loc2 = page.getByText("This is a dummy website for Web Automation Testing");
        this.store_logo = page.getByAltText("Poco Electro")
    }

    async navigateToHomePage() {
        await this.page.goto('/');
    }

    async clickOnMyAccount() {
        await this.page.getByRole('button', { name: ' My account' }).click();
    }


    async getPageTitle(): Promise<string> {
        return this.page.title();
    }

    async getThisDummyMessage(): Promise<string> {
        return this.dummy_message.innerText()
    }
}

export default HomePage;