import { Locator, Page } from "@playwright/test";

class MainSliderComponent {
    readonly container: Locator;
    readonly nextButton: Locator;
    readonly prevButton: Locator;
    readonly indicators: Locator;
    readonly activeSlide: Locator;

    constructor(page: Page) {
        this.container = page.locator('#mz-carousel-218380');
        this.nextButton = this.container.locator('.carousel-control-next');
        this.prevButton = this.container.locator('.carousel-control-prev');
        this.indicators = this.container.locator('.carousel-indicators li');
        this.activeSlide = this.container.locator('.carousel-item.active');
    }

    async clickNext() {
        await this.nextButton.scrollIntoViewIfNeeded();
        await this.nextButton.click({ force: true });
    }

    async clickPrev() {
        await this.prevButton.scrollIntoViewIfNeeded();
        await this.prevButton.click({ force: true });
    }

    async clickOnIndicator(index: number) {
        await this.indicators.nth(index).scrollIntoViewIfNeeded();
        await this.indicators.nth(index).click({ force: true });
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
