import { Locator, Page } from "@playwright/test"

class HeaderActionsComponent {
    readonly compareLink: Locator;
    readonly wishlistLink: Locator;
    readonly cartLink: Locator;
    readonly cartCounter: Locator;
    readonly compareCounter: Locator;
    readonly wishlistCounter: Locator;

    constructor(page: Page) {
        this.compareLink = page.locator('a[href*="product/compare"].icon-left').first();
        this.wishlistLink = page.locator('a[href*="account/wishlist"].icon-left').first();
        this.cartLink = page.locator('a.cart[href*="cart-total-drawer"]').first();
        this.cartCounter = this.cartLink.locator('.cart-items');
        this.compareCounter = page.locator('.compare-total');
        this.wishlistCounter = page.locator('#wishlist-total span');
    }

    async clickCompareLink() {
        await this.compareLink.click({ force: true });
    }

    async clickWishlistLink() {
        await this.wishlistLink.click({ force: true });
    }

    async clickCartLink() {
        await this.cartLink.click({ force: true });
    }

    async getCartCounterText(): Promise<string> {
        return this.cartLink.textContent() || '';
    }

    async getCompareCounterText(): Promise<string> {
        return this.compareCounter.textContent() || '';
    }

    async getWishlistCounterText(): Promise<string> {
        return this.wishlistCounter.textContent() || '';
    }

    async isCartCounterVisible(): Promise<boolean> {
        return this.cartCounter.isVisible();
    }

    async isCompareLinkVisible(): Promise<boolean> {
        return this.compareLink.isVisible();
    }

    async isWishlistLinkVisible(): Promise<boolean> {
        return this.wishlistLink.isVisible();
    }

    async isCartLinkVisible(): Promise<boolean> {
        return this.cartLink.isVisible();
    }
}

export default HeaderActionsComponent
