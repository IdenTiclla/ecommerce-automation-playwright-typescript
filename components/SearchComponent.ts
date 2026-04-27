import { Locator, Page } from "@playwright/test"

class SearchComponent {
    readonly search_input: Locator;
    readonly search_button: Locator;
   
    constructor(page: Page) {
        this.search_input = page.getByPlaceholder("Search For Products").nth(0);
        this.search_button = page.getByRole("button", { name: "search"})
    }


    async searchForProduct(productName: string) {
        await this.search_input.fill(productName);
        await this.search_button.click();
    }
}

export default SearchComponent;