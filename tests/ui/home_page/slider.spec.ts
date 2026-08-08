import { test, expect } from "../../../fixtures/baseTest";

test.describe("Main Slider Component Tests", () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigateToHomePage();
        await homePage.mainSlider.waitForReady();
    });

    test("Verify main slider and its controls are available", async ({ homePage }) => {
        await expect(homePage.mainSlider.container).toBeVisible();
        await expect(homePage.mainSlider.nextButton).toBeAttached();
        await expect(homePage.mainSlider.prevButton).toBeAttached();

        const slideCount = await homePage.mainSlider.getSlideCount();
        expect(slideCount).toBeGreaterThan(1);
    });

    test("Verify navigation using slider indicators (dots)", async ({ homePage }) => {
        // Click on the second indicator
        await homePage.mainSlider.clickOnIndicator(1);
        await homePage.mainSlider.waitForActiveSlide(1);

        expect(await homePage.mainSlider.getActiveSlideIndex()).toBe(1);
    });

    test("Verify navigation using next and previous buttons", async ({ homePage }) => {
        const initialIndex = await homePage.mainSlider.getActiveSlideIndex();
        const slideCount = await homePage.mainSlider.getSlideCount();
        const expectedNextIndex = (initialIndex + 1) % slideCount;

        await homePage.mainSlider.clickNext();
        await homePage.mainSlider.waitForActiveSlide(expectedNextIndex);
        expect(await homePage.mainSlider.getActiveSlideIndex()).toBe(expectedNextIndex);

        await homePage.mainSlider.clickPrev();
        await homePage.mainSlider.waitForActiveSlide(initialIndex);
        expect(await homePage.mainSlider.getActiveSlideIndex()).toBe(initialIndex);
    });

    test("Verify active slide contains content (image or link)", async ({ homePage }) => {
        await expect(homePage.mainSlider.activeSlide).toBeVisible();
        
        await expect(homePage.mainSlider.activeSlideImage).toBeVisible();
        await expect(homePage.mainSlider.activeSlideLink).toBeVisible();
    });

    test("Verify indicators and slides have the same count", async ({ homePage }) => {
        const slideCount = await homePage.mainSlider.getSlideCount();
        const indicatorCount = await homePage.mainSlider.getIndicatorCount();

        expect(indicatorCount).toBe(slideCount);
    });

    test("Verify every indicator selects its corresponding slide", async ({ homePage }) => {
        const indicatorCount = await homePage.mainSlider.getIndicatorCount();

        for (let index = 0; index < indicatorCount; index++) {
            await homePage.mainSlider.clickOnIndicator(index);
            await homePage.mainSlider.waitForActiveSlide(index);
            expect(await homePage.mainSlider.getActiveSlideIndex()).toBe(index);
        }
    });

    test("Verify next navigation wraps from the last slide to the first", async ({ homePage }) => {
        const lastIndex = (await homePage.mainSlider.getSlideCount()) - 1;

        await homePage.mainSlider.clickOnIndicator(lastIndex);
        await homePage.mainSlider.waitForActiveSlide(lastIndex);
        await homePage.mainSlider.clickNext();
        await homePage.mainSlider.waitForActiveSlide(0);

        expect(await homePage.mainSlider.getActiveSlideIndex()).toBe(0);
    });

    test("Verify previous navigation wraps from the first slide to the last", async ({ homePage }) => {
        const lastIndex = (await homePage.mainSlider.getSlideCount()) - 1;

        await homePage.mainSlider.clickOnIndicator(0);
        await homePage.mainSlider.waitForActiveSlide(0);
        await homePage.mainSlider.clickPrev();
        await homePage.mainSlider.waitForActiveSlide(lastIndex);

        expect(await homePage.mainSlider.getActiveSlideIndex()).toBe(lastIndex);
    });

    test("Verify active slide link points to a product", async ({ homePage }) => {
        const linkHref = await homePage.mainSlider.getActiveSlideLinkHref();

        expect(linkHref).toContain("route=product/");
    });

    test("Verify only one indicator is active at a time", async ({ homePage }) => {
        await homePage.mainSlider.clickOnIndicator(1);
        await homePage.mainSlider.waitForActiveSlide(1);

        expect(await homePage.mainSlider.getActiveIndicatorCount()).toBe(1);
    });
});
