import { Locator, Page } from "@playwright/test"

class ShopByCategoryComponent {
    private page: Page
    readonly shopByCategoryLink: Locator
    readonly categoryMenu: Locator
    readonly categoryItems: Locator

    constructor(page: Page) {
        this.page = page
        this.shopByCategoryLink = page.getByRole('button', { name: 'Shop by Category' })
        this.categoryMenu = page.locator('nav.navbar-light.bg-default.vertical')
        this.categoryItems = this.categoryMenu.locator('.nav-item .nav-link')
    }

    async clickShopByCategory() {
        await this.shopByCategoryLink.click()
    }

    async getVisibleCategoryNames(): Promise<string[]> {
        const count = await this.categoryItems.count()
        const names: string[] = []
        for (let i = 0; i < count; i++) {
            const title = this.categoryItems.nth(i).locator('.title')
            const text = await title.textContent()
            if (text) {
                names.push(text.trim())
            }
        }
        return names
    }

    async clickCategoryByName(name: string) {
        await this.clickShopByCategory()
        const link = this.categoryMenu.locator('.nav-link', { hasText: name }).first()
        await link.click({ force: true })
    }

    async getCategoryItemCount(): Promise<number> {
        return this.categoryItems.count()
    }

    async getPageUrl(): Promise<string> {
        return this.page.url()
    }
}

export default ShopByCategoryComponent
