import { expect, Locator, Page } from "@playwright/test";

class MainSliderComponent {
    readonly container: Locator;
    readonly nextButton: Locator;
    readonly prevButton: Locator;
    readonly indicators: Locator;
    readonly slides: Locator;
    readonly activeSlide: Locator;
    readonly activeSlideImage: Locator;
    readonly activeSlideLink: Locator;

    constructor(page: Page) {
        const mainBannerImage = page.getByAltText('Iphone 11 pro max');
        this.container = mainBannerImage.locator('..').locator('..').locator('..').locator('..');
        this.nextButton = this.container.getByText('Next', { exact: true }).locator('..');
        this.prevButton = this.container.getByText('Previous', { exact: true }).locator('..');
        this.indicators = this.container.getByRole('list').getByRole('listitem');
        this.slides = this.container.getByRole('img');
        this.activeSlideImage = this.slides.filter({ visible: true }).first();
        this.activeSlide = this.activeSlideImage;
        this.activeSlideLink = this.activeSlideImage.locator('..');
    }

    async clickNext() {
        await this.nextButton.scrollIntoViewIfNeeded();
        await this.container.hover();
        await this.nextButton.click();
    }

    async clickPrev() {
        await this.prevButton.scrollIntoViewIfNeeded();
        await this.container.hover();
        await this.prevButton.click();
    }

    async clickOnIndicator(index: number) {
        await this.indicators.nth(index).scrollIntoViewIfNeeded();
        await this.container.hover();
        await this.indicators.nth(index).click();
    }

    async waitForReady() {
        await expect(this.nextButton).toBeAttached();
        await expect(this.indicators.first()).toBeAttached();
    }

    async getSlideCount(): Promise<number> {
        return this.indicators.count();
    }

    async getIndicatorCount(): Promise<number> {
        return this.indicators.count();
    }

    async getActiveIndicatorCount(): Promise<number> {
        const count = await this.indicators.count();
        let activeCount = 0;

        for (let index = 0; index < count; index++) {
            const className = await this.indicators.nth(index).getAttribute('class');
            if (className?.includes('active')) {
                activeCount++;
            }
        }

        return activeCount;
    }

    async getActiveSlideLinkHref(): Promise<string | null> {
        return this.activeSlideLink.getAttribute('href');
    }

    async waitForActiveSlide(index: number) {
        await expect(this.indicators.nth(index)).toHaveClass(/active/);
        await expect(this.activeSlideImage).toBeVisible();
    }

    async getActiveSlideIndex(): Promise<number> {
        const count = await this.indicators.count();
        for (let i = 0; i < count; i++) {
            const className = await this.indicators.nth(i).getAttribute('class');
            if (className && className.includes('active')) {
                return i;
            }
        }
        return -1;
    }
}

export default MainSliderComponent;
