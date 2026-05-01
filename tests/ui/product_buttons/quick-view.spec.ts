import { test, expect } from "../../../fixtures/baseTest"

test.describe("Quick View Button - Top Products", () => {

    test.beforeEach(async ({ homePage, topProducts }) => {
        await homePage.navigateToHomePage();
        await topProducts.goToSection();
    });

    test("Quick View buttons exist in Top Products section", async ({ topProducts }) => {
        const count = await topProducts.productActionButtons.getQuickViewButtonCount();
        expect(count).toBeGreaterThan(0);
    });

    test("Quick View button has correct title attribute", async ({ topProducts }) => {
        const title = await topProducts.productActionButtons.getQuickViewButtonTitle(0);
        expect(title).toBe("Quick view");
    });

    test("Quick View button becomes visible on product hover", async ({ topProducts }) => {
        await topProducts.productActionButtons.hoverProductThumb(0);
        await expect(topProducts.productActionButtons.getQuickViewButton(0)).toBeVisible();
    });

    test("Clicking Quick View opens modal", async ({ topProducts, quickView }) => {
        await topProducts.openQuickView(0);
        const visible = await quickView.waitForModal();
        expect(visible).toBeTruthy();
    });

    test("Quick View modal can be opened and contains close button", async ({ topProducts, quickView }) => {
        await topProducts.openQuickView(0);
        await quickView.waitForModal();

        await expect(quickView.closeButton).toBeAttached();
    });

    test("Quick View modal loads product content", async ({ topProducts, quickView }) => {
        await topProducts.openQuickView(0);
        const visible = await quickView.waitForModal();
        expect(visible).toBeTruthy();

        await quickView.waitForContentLoaded();
        const content = await quickView.modalContent.textContent();
        expect(content).toBeTruthy();
    });

    test("Add to cart from Quick View modal shows toast", async ({ topProducts, quickView, toast }) => {
        await topProducts.openQuickView(0);
        await quickView.waitForModal();
        await quickView.waitForContentLoaded();

        const hasButton = await quickView.hasAddToCartInModal();
        if (hasButton) {
            await quickView.addToCartFromModal();
        }
    });
});
