import { Locator, Page } from "@playwright/test"

class ProductActionButtons {
    readonly cartButtons: Locator;
    readonly wishlistButtons: Locator;
    readonly compareButtons: Locator;
    readonly quickViewButtons: Locator;
    readonly productThumbs: Locator;
    readonly productThumbTops: Locator;

    constructor(container: Page | Locator) {
        this.cartButtons = container.locator('button[onclick*="cart.add"]');
        this.wishlistButtons = container.locator('button[onclick*="wishlist.add"]');
        this.compareButtons = container.locator('button[onclick*="compare.add"]');
        this.quickViewButtons = container.locator('button[onclick*="mz_quick_view.show"]');
        this.productThumbs = container.locator('.product-thumb');
        this.productThumbTops = container.locator('.product-thumb-top');
    }

    getCartButton(index: number = 0): Locator {
        return this.cartButtons.nth(index);
    }

    getWishlistButton(index: number = 0): Locator {
        return this.wishlistButtons.nth(index);
    }

    getCompareButton(index: number = 0): Locator {
        return this.compareButtons.nth(index);
    }

    getQuickViewButton(index: number = 0): Locator {
        return this.quickViewButtons.nth(index);
    }

    async isCartButtonVisible(index: number = 0): Promise<boolean> {
        return this.getCartButton(index).isVisible();
    }

    async isWishlistButtonVisible(index: number = 0): Promise<boolean> {
        return this.getWishlistButton(index).isVisible();
    }

    async isCompareButtonVisible(index: number = 0): Promise<boolean> {
        return this.getCompareButton(index).isVisible();
    }

    async isQuickViewButtonVisible(index: number = 0): Promise<boolean> {
        return this.getQuickViewButton(index).isVisible();
    }

    async addToCart(index: number = 0) {
        const btn = this.getCartButton(index);
        await btn.dispatchEvent('click');
    }

    async addToWishlist(index: number = 0) {
        const btn = this.getWishlistButton(index);
        await btn.dispatchEvent('click');
    }

    async addToCompare(index: number = 0) {
        const btn = this.getCompareButton(index);
        await btn.dispatchEvent('click');
    }

    async openQuickView(index: number = 0) {
        const btn = this.getQuickViewButton(index);
        await btn.dispatchEvent('click');
    }

    async hoverProductThumb(index: number = 0) {
        await this.productThumbTops.nth(index).scrollIntoViewIfNeeded();
        await this.productThumbTops.nth(index).hover();
    }

    async getCartButtonTitle(index: number = 0): Promise<string | null> {
        return this.getCartButton(index).getAttribute('title');
    }

    async getWishlistButtonTitle(index: number = 0): Promise<string | null> {
        return this.getWishlistButton(index).getAttribute('title');
    }

    async getCompareButtonTitle(index: number = 0): Promise<string | null> {
        return this.getCompareButton(index).getAttribute('title');
    }

    async getQuickViewButtonTitle(index: number = 0): Promise<string | null> {
        return this.getQuickViewButton(index).getAttribute('title');
    }

    async isProductCompared(index: number = 0): Promise<boolean> {
        const cls = await this.getCompareButton(index).getAttribute('class');
        return cls?.includes('compared') ?? false;
    }

    async isProductWished(index: number = 0): Promise<boolean> {
        const cls = await this.getWishlistButton(index).getAttribute('class');
        return cls?.includes('wished') ?? false;
    }

    async getCartButtonCount(): Promise<number> {
        return this.cartButtons.count();
    }

    async getWishlistButtonCount(): Promise<number> {
        return this.wishlistButtons.count();
    }

    async getCompareButtonCount(): Promise<number> {
        return this.compareButtons.count();
    }

    async getQuickViewButtonCount(): Promise<number> {
        return this.quickViewButtons.count();
    }
}

export default ProductActionButtons
