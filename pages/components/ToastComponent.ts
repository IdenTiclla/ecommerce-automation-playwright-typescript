import { Locator, Page } from "@playwright/test"

class ToastComponent {
    readonly container: Locator;
    readonly toast: Locator;

    constructor(page: Page) {
        this.container = page.locator('#notification-box-top');
        this.toast = this.container.locator('.toast');
    }

    async isToastVisible(): Promise<boolean> {
        return this.toast.isVisible();
    }

    async getToastText(): Promise<string> {
        return this.toast.textContent() || '';
    }

    async waitForToast(timeout: number = 5000): Promise<boolean> {
        try {
            await this.toast.first().waitFor({ state: 'visible', timeout });
            return true;
        } catch {
            return false;
        }
    }

    async waitForToastToDisappear(timeout: number = 10000): Promise<void> {
        await this.toast.first().waitFor({ state: 'hidden', timeout }).catch(() => { });
    }

    async toastContainsText(text: string): Promise<boolean> {
        const toastText = await this.getToastText();
        return toastText.includes(text);
    }

    async clickToast() {
        await this.toast.first().scrollIntoViewIfNeeded();
        await this.toast.first().click({ force: true });
    }

    async getToastLink(): Promise<Locator> {
        return this.toast.locator('a').first();
    }

    async clickToastLink() {
        const link = await this.getToastLink();
        await link.click({ force: true });
    }

    async hasToast(): Promise<boolean> {
        const count = await this.toast.count();
        return count > 0;
    }

    async delay(ms: number = 500): Promise<void> {
        await this.toast.page().waitForTimeout(ms);
    }
}

export default ToastComponent
