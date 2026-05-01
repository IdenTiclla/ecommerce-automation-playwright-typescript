import { Locator, Page } from "@playwright/test"
import ProductActionButtons from "./ProductActionButtons";

class TopProductsComponent {
    readonly sectionHeading: Locator;
    readonly sectionContainer: Locator;
    readonly swiperContainer: Locator;
    readonly productActionButtons: ProductActionButtons;

    constructor(page: Page) {
        this.sectionHeading = page.getByRole('heading', { name: 'Top Products' });
        this.sectionContainer = page.locator('.entry-section.container').filter({ has: this.sectionHeading });
        this.swiperContainer = this.sectionContainer.locator('.swiper');
        this.productActionButtons = new ProductActionButtons(this.sectionContainer);
    }

    async goToSection() {
        await this.sectionContainer.scrollIntoViewIfNeeded();
        await this.waitForSwiperReady();
    }

    async waitForSwiperReady(timeout: number = 10000) {
        await this.swiperContainer.waitFor({ state: 'visible', timeout }).catch(() => { });
        await this.sectionContainer.locator('.product-thumb').first().waitFor({ state: 'visible', timeout }).catch(() => { });
    }

    async addToCart(index: number = 0) {
        await this.goToSection();
        await this.productActionButtons.hoverProductThumb(index);
        await this.productActionButtons.addToCart(index);
    }

    async addToWishlist(index: number = 0) {
        await this.goToSection();
        await this.productActionButtons.hoverProductThumb(index);
        await this.productActionButtons.addToWishlist(index);
    }

    async addToCompare(index: number = 0) {
        await this.goToSection();
        await this.productActionButtons.hoverProductThumb(index);
        await this.productActionButtons.addToCompare(index);
    }

    async openQuickView(index: number = 0) {
        await this.goToSection();
        await this.productActionButtons.hoverProductThumb(index);
        await this.productActionButtons.openQuickView(index);
    }

    async getProductCount(): Promise<number> {
        await this.goToSection();
        return this.productActionButtons.getCartButtonCount();
    }
}

export default TopProductsComponent
