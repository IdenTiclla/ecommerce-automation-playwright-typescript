import { test, expect } from "../../../fixtures/baseTest"

test.describe("Search Component Tests", () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.navigateToHomePage();
    });

    test("Verify search for a valid product", async ({ homePage, searchResultsPage }) => {
        await homePage.searchComponent.searchForProduct("iPhone");
        await expect(searchResultsPage.page_heading).toContainText("Search - iPhone");
        await expect(searchResultsPage.showing_results_text).toBeVisible();
    });

    test("Verify search with empty input", async ({ page, homePage }) => {
        await homePage.searchComponent.searchForProduct("");
        expect(page.url()).toContain("search=");
    });

    test("Verify search with special characters", async ({ homePage, searchResultsPage }) => {
        const specialChars = "!@#$%^&*()";
        await homePage.searchComponent.searchForProduct(specialChars);
        await expect(searchResultsPage.no_results_message).toBeVisible();
    });

    test("Verify search suggestions appear when typing", async ({ homePage }) => {
        await homePage.searchComponent.typeInSearchInput("MacBook");
        await expect(homePage.searchComponent.suggestions_list).toBeVisible();
        const suggestions = await homePage.searchComponent.getSuggestions();
        expect(await suggestions.count()).toBeGreaterThan(0);
    });

    test("Verify clicking on a search suggestion navigates to product page", async ({ page, homePage }) => {
        await homePage.searchComponent.typeInSearchInput("iPhone");
        await expect(homePage.searchComponent.suggestions_list).toBeVisible();
        await homePage.searchComponent.clickOnSuggestion(0);
        await expect(page).toHaveURL(/product_id=/);
    });

    test("Verify search results for a non-existent product", async ({ homePage, searchResultsPage }) => {
        await homePage.searchComponent.searchForProduct("NonExistentProduct123");
        await expect(searchResultsPage.no_results_message).toBeVisible();
        await expect(searchResultsPage.no_results_message).toHaveText("There is no product that matches the search criteria.");
    });

    test("Verify search with a specific category", async ({ page, homePage }) => {
        await homePage.searchComponent.typeInSearchInput("Canon");
        await homePage.searchComponent.search_button.click();
        expect(page.url()).toContain("search=Canon");
    });

    test("Verify search results count is displayed", async ({ homePage, searchResultsPage }) => {
        await homePage.searchComponent.searchForProduct("Apple");
        await expect(searchResultsPage.product_cards.first()).toBeVisible();
        const count = await searchResultsPage.getProductCount();
        expect(count).toBeGreaterThan(0);
    });

    test("Verify clearing search input", async ({ homePage }) => {
        await homePage.searchComponent.typeInSearchInput("iPhone");
        await homePage.searchComponent.search_input.clear();
        expect(await homePage.searchComponent.search_input.inputValue()).toBe("");
    });

    test("Verify search persistence after refresh", async ({ page, homePage, searchResultsPage }) => {
        await homePage.searchComponent.searchForProduct("HTC");
        await page.reload();
        expect(page.url()).toContain("search=HTC");
        await expect(searchResultsPage.page_heading).toContainText("Search - HTC");
    });

    test("Verify search results page shows product names", async ({ homePage, searchResultsPage }) => {
        await homePage.searchComponent.searchForProduct("iPhone");
        await expect(searchResultsPage.product_cards.first()).toBeVisible();
        const productNames = await searchResultsPage.getProductNames();
        expect(productNames.length).toBeGreaterThan(0);
        for (const name of productNames) {
            expect(name.toLowerCase()).toContain("iphone");
        }
    });


    test("Verify home redirection after clicking on logo from search results", async ({ page, homePage, searchResultsPage }) => {
        await homePage.searchComponent.searchForProduct("iPhone");
        await expect(searchResultsPage.page_heading).toContainText("Search - iPhone");

        await searchResultsPage.store_logo.click();
        expect(page.url()).toBe("https://ecommerce-playground.lambdatest.io/index.php?route=common/home");
    });

    test("Verify search results page has sort by options", async ({ homePage, searchResultsPage }) => {
        await homePage.searchComponent.searchForProduct("iPhone");
        await expect(searchResultsPage.sort_by_select).toBeVisible();
    });

    test("Verify search results page has show count options", async ({ homePage, searchResultsPage }) => {
        await homePage.searchComponent.searchForProduct("iPhone");
        await expect(searchResultsPage.show_select).toBeVisible();
    });

    test("Verify clicking on a product navigates to product page", async ({ page, homePage, searchResultsPage }) => {
        await homePage.searchComponent.searchForProduct("iPhone");
        await searchResultsPage.clickOnProduct(0);
        await expect(page).toHaveURL(/product_id=/);
    });

    test("Verify search criteria input retains search term", async ({ homePage, searchResultsPage }) => {
        await homePage.searchComponent.searchForProduct("Canon");
        await expect(searchResultsPage.search_criteria_input).toHaveValue("Canon");
    });

    test("Verify refining search from results page", async ({ homePage, searchResultsPage }) => {
        await homePage.searchComponent.searchForProduct("iPhone");
        await expect(searchResultsPage.page_heading).toContainText("Search - iPhone");

        await searchResultsPage.refineSearchWithCriteria("Canon");
        await expect(searchResultsPage.page_heading).toContainText("Search - Canon");
    });

    test("Verify category dropdown expands on click", async ({ homePage }) => {
        await homePage.searchComponent.category_dropdown.click();
        await expect(homePage.searchComponent.category_dropdown).toHaveAttribute("aria-expanded", "true");
    });

    test("Verify all categories are present in the dropdown", async ({ homePage }) => {
        await homePage.searchComponent.category_dropdown.click();
        const categories = ["Desktops", "Laptops", "Components", "Tablets", "Software", "Phones & PDAs", "Cameras", "MP3 Players"];
        for (const category of categories) {
            await expect(homePage.page.locator(".search-input-group .dropdown-item").filter({ hasText: category }).first()).toBeVisible();
        }
    });

    test("Verify default category is 'All Categories'", async ({ homePage }) => {
        await expect(homePage.searchComponent.category_dropdown).toContainText("All Categories");
    });

    test("Verify selecting a category updates the dropdown text", async ({ homePage }) => {
        await homePage.searchComponent.selectCategory("Laptops");
        await expect(homePage.searchComponent.category_dropdown).toContainText("Laptops");
    });

    test("Verify search within 'Desktops' category", async ({ page, homePage }) => {
        await homePage.searchComponent.selectCategory("Desktops");
        await homePage.searchComponent.searchForProduct("Sony");
        expect(page.url()).toContain("category_id=");
        expect(page.url()).toContain("search=Sony");
    });

    test("Verify search within 'Components' category", async ({ page, homePage }) => {
        await homePage.searchComponent.selectCategory("Components");
        await homePage.searchComponent.searchForProduct("Monitor");
        expect(page.url()).toContain("category_id=");
    });

    test("Verify search within 'Tablets' category with no results", async ({ homePage, searchResultsPage }) => {
        await homePage.searchComponent.selectCategory("Tablets");
        await homePage.searchComponent.searchForProduct("DefinitelyNotATablet123");
        await expect(searchResultsPage.no_results_message).toBeVisible();
    });

    test("Verify category selection persists after search", async ({ homePage }) => {
        await homePage.searchComponent.selectCategory("Software");
        await homePage.searchComponent.searchForProduct("Test");
        await expect(homePage.searchComponent.category_dropdown).toContainText("Software");
    });

    test("Verify resetting category to 'All Categories'", async ({ homePage }) => {
        await homePage.searchComponent.selectCategory("Cameras");
        await homePage.searchComponent.selectCategory("All Categories");
        await expect(homePage.searchComponent.category_dropdown).toContainText("All Categories");
    });

    test("Verify category dropdown closes when clicking outside", async ({ page, homePage }) => {
        await homePage.searchComponent.category_dropdown.click();
        await expect(homePage.searchComponent.category_dropdown).toHaveAttribute("aria-expanded", "true");
        await page.click("body", { position: { x: 0, y: 0 } });
        await expect(homePage.searchComponent.category_dropdown).toHaveAttribute("aria-expanded", "false");
    });

});
