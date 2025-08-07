import { Page } from "@playwright/test"

class BasePage {

    page: Page
    constructor(page: Page) {
        this.page = page
    }

    waitForPageLoad(timeout: number = 10000) {
        this.page.waitForLoadState('networkidle', { timeout })
    }

    getPageTitle(): Promise<string> {
        return this.page.title()
    }

    getPageUrl(): string {
        return this.page.url()
    }


}

export default BasePage