import { test, expect } from "../../../fixtures/baseTest"

test.describe("Wishlist Button - Top Products", () => {

    test.beforeEach(async ({ homePage, topProducts }) => {
        await homePage.navigateToHomePage();
        await topProducts.goToSection();
    });

    test("Wishlist buttons exist in Top Products section", async ({ topProducts }) => {
        const count = await topProducts.productActionButtons.getWishlistButtonCount();
        expect(count).toBeGreaterThan(0);
    });

    test("Wishlist button has correct title attribute", async ({ topProducts }) => {
        const title = await topProducts.productActionButtons.getWishlistButtonTitle(0);
        expect(title).toBe("Add to Wish List");
    });

    test("Wishlist button becomes visible on product hover", async ({ topProducts }) => {
        await topProducts.productActionButtons.hoverProductThumb(0);
        await expect(topProducts.productActionButtons.getWishlistButton(0)).toBeVisible();
    });

    test("Clicking wishlist shows toast notification", async ({ topProducts, toast }) => {
        await topProducts.addToWishlist(0);
        const appeared = await toast.waitForToast();
        expect(appeared).toBeTruthy();
    });

    test("Clicking toast notification after wishlist does not error", async ({ topProducts, toast }) => {
        await topProducts.addToWishlist(0);
        const appeared = await toast.waitForToast();
        if (appeared) {
            await toast.clickToast();
            await toast.delay(1000);
        }
        expect(true).toBeTruthy();
    });

    test("Clicking wishlist on two different products by index", async ({ topProducts }) => {
        await topProducts.addToWishlist(0);
        await topProducts.addToWishlist(1);
    });

    test("Header wishlist link is visible", async ({ headerActions }) => {
        await expect(headerActions.wishlistLink).toBeVisible();
    });

    test("Wishlist page redirects to login when not authenticated", async ({ wishlistPage }) => {
        await wishlistPage.navigateToWishlistPage();
        const url = await wishlistPage.getPageUrl();
        expect(url).toContain("route=account/login");
    });

    test("Wishlist page requires login when not authenticated", async ({ wishlistPage }) => {
        await wishlistPage.navigateToWishlistPage();
        await expect(wishlistPage.loginForm).toBeVisible();
    });

    test("Wishlist page shows returning customer heading", async ({ wishlistPage }) => {
        await wishlistPage.navigateToWishlistPage();
        await expect(wishlistPage.returningCustomerHeading).toBeVisible();
    });

    test("Wishlist page has email and password inputs for login", async ({ wishlistPage }) => {
        await wishlistPage.navigateToWishlistPage();
        await expect(wishlistPage.emailInput).toBeVisible();
        await expect(wishlistPage.passwordInput).toBeVisible();
        await expect(wishlistPage.loginButton).toBeVisible();
    });
});
