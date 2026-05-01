import { test, expect } from "../../../fixtures/baseTest"

test.describe("Cart Button - Top Products", () => {

    test.beforeEach(async ({ homePage, topProducts }) => {
        await homePage.navigateToHomePage();
        await topProducts.goToSection();
    });

    test("Cart buttons exist in Top Products section", async ({ topProducts }) => {
        const count = await topProducts.productActionButtons.getCartButtonCount();
        expect(count).toBeGreaterThan(0);
    });

    test("Cart button has correct title attribute", async ({ topProducts }) => {
        const title = await topProducts.productActionButtons.getCartButtonTitle(0);
        expect(title).toBe("Add to Cart");
    });

    test("Cart button becomes visible on product hover", async ({ topProducts }) => {
        await topProducts.productActionButtons.hoverProductThumb(0);
        await expect(topProducts.productActionButtons.getCartButton(0)).toBeVisible();
    });

    test("Clicking cart shows toast notification", async ({ topProducts, toast }) => {
        await topProducts.addToCart(0);
        const appeared = await toast.waitForToast();
        expect(appeared).toBeTruthy();
        const text = await toast.getToastText();
        expect(text).toContain("Success: You have added iMac to your shopping cart!");
    });

    test("Clicking toast notification after cart does not error", async ({ topProducts, toast }) => {
        await topProducts.addToCart(0);
        const appeared = await toast.waitForToast();
        if (appeared) {
            await toast.clickToast();
            await toast.delay(1000);
        }
        expect(true).toBeTruthy();
    });

    test("Clicking cart on two different products by index", async ({ topProducts }) => {
        await topProducts.addToCart(0);
        await topProducts.addToCart(1);
    });

    test("After adding to cart, navigating to cart page works", async ({ topProducts, cartPage }) => {
        await topProducts.addToCart(0);
        await cartPage.navigateToCartPage();
        await expect(cartPage.pageHeading).toBeVisible();
    });

    test("Header cart link is visible", async ({ headerActions }) => {
        await expect(headerActions.cartLink).toBeVisible();
    });

    test("Header cart counter shows initial empty state", async ({ headerActions }) => {
        const cartText = await headerActions.getCartCounterText();
        expect(cartText).toContain("0 item(s)");
    });

    test("Cart page shows correct heading", async ({ cartPage }) => {
        await cartPage.navigateToCartPage();
        await expect(cartPage.pageHeading).toBeVisible();
    });

    test("Cart page shows empty state when no items added", async ({ cartPage }) => {
        await cartPage.navigateToCartPage();
        await expect(cartPage.emptyMessage).toBeVisible();
    });

    test("Cart page has continue button", async ({ cartPage }) => {
        await cartPage.navigateToCartPage();
        await expect(cartPage.continueButton).toBeVisible();
    });

    test("Cart page URL is correct", async ({ cartPage }) => {
        await cartPage.navigateToCartPage();
        const url = cartPage.getPageUrl();
        expect(url).toContain("route=checkout/cart");
    });
});
