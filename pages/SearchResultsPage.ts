import { Page, Locator } from "@playwright/test";
import BasePage from "./BasePage";
import SearchComponent from "../components/SearchComponent";

class SearchResultsPage extends BasePage {
    readonly searchComponent: SearchComponent;
    readonly store_logo: Locator;

    // Search results page elements
    readonly page_heading: Locator;
    readonly breadcrumb: Locator;
    readonly no_results_message: Locator;
    readonly showing_results_text: Locator;
    readonly product_cards: Locator;
    readonly product_names: Locator;
    readonly product_prices: Locator;

    // Search criteria section
    readonly search_criteria_input: Locator;
    readonly search_criteria_category: Locator;
    readonly search_in_subcategories_checkbox: Locator;
    readonly search_in_descriptions_checkbox: Locator;
    readonly search_criteria_button: Locator;

    // Sort and display controls
    readonly sort_by_select: Locator;
    readonly show_select: Locator;

    constructor(page: Page) {
        super(page);

        // components
        this.searchComponent = new SearchComponent(page);
        this.store_logo = page.getByAltText("Poco Electro");

        // Search results page elements
        this.page_heading = page.locator("h1");
        this.breadcrumb = page.getByRole("navigation", { name: "breadcrumb" });
        this.no_results_message = page.getByText("There is no product that matches the search criteria.");
        this.showing_results_text = page.getByText(/Showing \d+ to \d+ of \d+/);
        this.product_cards = page.locator(".product-thumb");
        this.product_names = page.locator(".caption h4 a");
        this.product_prices = page.locator(".price-new");

        // Search criteria section (on search results page)
        this.search_criteria_input = page.getByPlaceholder("Keywords");
        this.search_criteria_category = page.getByRole("combobox").first();
        this.search_in_subcategories_checkbox = page.getByRole("checkbox", { name: "Search in subcategories" });
        this.search_in_descriptions_checkbox = page.getByRole("checkbox", { name: "Search in product descriptions" });
        this.search_criteria_button = page.locator("#button-search");

        // Sort and display controls
        this.sort_by_select = page.getByRole("combobox", { name: "Sort By:" });
        this.show_select = page.getByRole("combobox", { name: "Show:" });
    }

    async getProductCount(): Promise<number> {
        return this.product_cards.count();
    }

    async getProductNames(): Promise<string[]> {
        return this.product_names.allInnerTexts();
    }

    async clickOnProduct(index: number) {
        await this.product_names.nth(index).click();
    }

    async sortBy(option: string) {
        await this.sort_by_select.selectOption({ label: option });
    }

    async setShowCount(count: string) {
        await this.show_select.selectOption({ label: count });
    }

    async refineSearchWithCriteria(keyword: string) {
        await this.search_criteria_input.fill(keyword);
        await this.search_criteria_button.click();
    }
}

export default SearchResultsPage;
