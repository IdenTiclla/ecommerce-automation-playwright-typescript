import { test, expect } from "../../../fixtures/baseTest";

test.describe("Main Slider Component Tests", () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigateToHomePage();
    });

    test("Verify main slider is visible", async ({ homePage }) => {
        await expect(homePage.mainSlider.container).toBeVisible();
    });

    test("Verify navigation using slider indicators (dots)", async ({ homePage }) => {
        // Click on the second indicator
        await homePage.mainSlider.clickOnIndicator(1);
        
        // Check if the active slide index is 1
        const activeIndex = await homePage.mainSlider.getActiveSlideIndex();
        expect(activeIndex).toBe(1);
    });

    test("Verify navigation using next and previous buttons", async ({ homePage }) => {
        // Initial state
        const initialIndex = await homePage.mainSlider.getActiveSlideIndex();
        
        // Click next
        await homePage.mainSlider.clickNext();
        await homePage.page.waitForTimeout(2000); // Wait for transition to complete
        
        const newIndex = await homePage.mainSlider.getActiveSlideIndex();
        expect(newIndex).not.toBe(initialIndex);

        // Click previous
        await homePage.mainSlider.clickPrev();
        await homePage.page.waitForTimeout(2000); // Wait for transition to complete
        
        const backIndex = await homePage.mainSlider.getActiveSlideIndex();
        expect(backIndex).toBe(initialIndex);
    });

    test("Verify active slide contains content (image or link)", async ({ homePage }) => {
        await expect(homePage.mainSlider.activeSlide).toBeVisible();
        
        // Check for image or link inside the active slide
        const hasImage = await homePage.mainSlider.activeSlide.locator('img').count();
        const hasLink = await homePage.mainSlider.activeSlide.locator('a').count();
        
        expect(hasImage + hasLink).toBeGreaterThan(0);
    });
});
