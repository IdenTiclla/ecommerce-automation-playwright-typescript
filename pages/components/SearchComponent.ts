import { Locator, Page } from "@playwright/test"

class SearchComponent {
    readonly search_input: Locator;
    readonly search_button: Locator;
    readonly category_dropdown: Locator;
    readonly suggestions_list: Locator;

    constructor(page: Page) {
        this.search_input = page.getByPlaceholder("Search For Products").filter({ visible: true });
        this.search_button = page.getByRole("button", { name: "search" }).filter({ visible: true });
        this.category_dropdown = page.locator(".search-input-group .dropdown-toggle").filter({ visible: true });
        this.suggestions_list = page.locator(".search-input-group .dropdown-menu.autocomplete").filter({ visible: true });
    }


    async searchForProduct(productName: string) {
        await this.search_input.fill(productName);
        await this.search_button.click();
    }

    async typeInSearchInput(text: string) {
        await this.search_input.pressSequentially(text, { delay: 100 });
    }

    async selectCategory(category: string) {
        await this.category_dropdown.click();
        await this.search_input.page().locator(".search-input-group .dropdown-item").filter({ hasText: category }).first().click();
    }

    async getSuggestions() {
        return this.suggestions_list.locator("li");
    }

    async clickOnSuggestion(index: number) {
        await this.suggestions_list.locator("li").nth(index).locator("a").first().click();
    }
}

export default SearchComponent;