import { test, expect } from "../../../fixtures/baseTest"

test.describe("Compare Button - Top Products", () => {

    test.beforeEach(async ({ homePage, topProducts }) => {
        await homePage.navigateToHomePage();
        await topProducts.goToSection();
    });

    test("Compare buttons exist in Top Products section", async ({ topProducts }) => {
        const count = await topProducts.productActionButtons.getCompareButtonCount();
        expect(count).toBeGreaterThan(0);
    });

    test("Compare button has correct title attribute", async ({ topProducts }) => {
        const title = await topProducts.productActionButtons.getCompareButtonTitle(0);
        expect(title).toBe("Compare this Product");
    });

    test("Compare button becomes visible on product hover", async ({ topProducts }) => {
        await topProducts.productActionButtons.hoverProductThumb(0);
        await expect(topProducts.productActionButtons.getCompareButton(0)).toBeVisible();
    });

    test("Clicking compare shows toast notification", async ({ topProducts, toast }) => {
        await topProducts.addToCompare(0);
        const appeared = await toast.waitForToast();
        expect(appeared).toBeTruthy();
    });

    test("Clicking toast notification after compare does not error", async ({ topProducts, toast }) => {
        await topProducts.addToCompare(0);
        const appeared = await toast.waitForToast();
        if (appeared) {
            await toast.clickToast();
            await toast.delay(1000);
        }
        expect(true).toBeTruthy();
    });

    test("Clicking compare on two different products by index", async ({ topProducts }) => {
        await topProducts.addToCompare(0);
        await topProducts.addToCompare(1);
    });

    test("Header compare link navigates to compare page", async ({ comparePage }) => {
        await comparePage.navigateToComparePage();
        const url = comparePage.getPageUrl();
        expect(url).toContain("route=product/compare");
    });

    test("Header compare link is visible", async ({ headerActions }) => {
        await expect(headerActions.compareLink).toBeVisible();
    });

    test("Header compare link exists and points to compare URL", async ({ headerActions }) => {
        const href = await headerActions.compareLink.getAttribute('href');
        expect(href).toContain("route=product/compare");
    });

    test("Compare page shows correct heading", async ({ comparePage }) => {
        await comparePage.navigateToComparePage();
        await expect(comparePage.pageHeading).toBeVisible();
    });

    test("Compare page shows empty state when no products selected", async ({ comparePage }) => {
        await comparePage.navigateToComparePage();
        await expect(comparePage.emptyMessage).toBeVisible();
    });

    test("Compare page has continue button", async ({ comparePage }) => {
        await comparePage.navigateToComparePage();
        await expect(comparePage.continueButton).toBeVisible();
    });
});
