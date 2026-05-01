import { Locator, Page } from "@playwright/test"

class QuickViewComponent {
    readonly modal: Locator;
    readonly closeButton: Locator;
    readonly modalContent: Locator;
    readonly addToCartButton: Locator;
    readonly loader: Locator;

    constructor(page: Page) {
        this.modal = page.locator('#quick-view.modal');
        this.closeButton = this.modal.locator('.close, .mz-modal-close, [data-dismiss="modal"]');
        this.modalContent = this.modal.locator('.modal-body');
        this.addToCartButton = this.modal.locator('button[onclick*="cart.add"]');
        this.loader = this.modal.locator('.loader-spinner');
    }

    async isModalVisible(): Promise<boolean> {
        return this.modal.isVisible();
    }

    async waitForModal(timeout: number = 5000): Promise<boolean> {
        try {
            await this.modal.waitFor({ state: 'visible', timeout });
            return true;
        } catch {
            return false;
        }
    }

    async waitForContentLoaded(timeout: number = 10000): Promise<void> {
        await this.modalContent.waitFor({ state: 'visible', timeout }).catch(() => {});
    }

    async closeModal() {
        await this.closeButton.first().click({ force: true });
    }

    async getModalTitle(): Promise<string> {
        return this.modal.locator('.modal-title, h4, h5').first().textContent() || '';
    }

    async hasAddToCartInModal(): Promise<boolean> {
        return this.addToCartButton.isVisible();
    }

    async addToCartFromModal() {
        await this.addToCartButton.first().click({ force: true });
    }
}

export default QuickViewComponent
