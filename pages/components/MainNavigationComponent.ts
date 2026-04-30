import { Locator, Page } from "@playwright/test"

class MainNavigationComponent {
    private page: Page
    readonly horizontalNav: Locator
    readonly homeLink: Locator
    readonly specialLink: Locator
    readonly specialBadge: Locator
    readonly blogLink: Locator
    readonly megaMenuLink: Locator
    readonly megaMenuDropdown: Locator
    readonly addonsLink: Locator
    readonly addonsBadge: Locator
    readonly addonsDropdown: Locator
    readonly myAccountLink: Locator
    readonly myAccountDropdown: Locator

    constructor(page: Page) {
        this.page = page
        this.horizontalNav = page.locator('nav.navbar-expand-sm.horizontal')
        this.homeLink = this.horizontalNav.locator('.nav-link').filter({ has: page.locator('.title', { hasText: 'Home' }) }).first()
        this.specialLink = this.horizontalNav.locator('.nav-link', { hasText: 'Special' }).first()
        this.specialBadge = this.specialLink.locator('.badge')
        this.blogLink = this.horizontalNav.locator('.nav-link', { hasText: 'Blog' }).first()
        this.megaMenuLink = this.horizontalNav.locator('.nav-link.dropdown-toggle', { hasText: 'Mega Menu' }).first()
        this.megaMenuDropdown = this.horizontalNav.locator('.mega-menu-content')
        this.addonsLink = this.horizontalNav.locator('.nav-link.dropdown-toggle', { hasText: 'AddOns' }).first()
        this.addonsBadge = this.addonsLink.locator('.badge')
        this.addonsDropdown = this.addonsLink.locator('..').locator('> .dropdown-menu')
        this.myAccountLink = this.horizontalNav.locator('.nav-link.dropdown-toggle', { hasText: 'My account' }).first()
        this.myAccountDropdown = this.myAccountLink.locator('..').locator('> .dropdown-menu')
    }

    async clickHome() {
        await this.homeLink.click()
    }

    async clickSpecial() {
        await this.specialLink.click()
    }

    async clickBlog() {
        await this.blogLink.click()
    }

    async clickMegaMenu() {
        await this.megaMenuLink.click()
    }

    async hoverMegaMenu() {
        await this.megaMenuLink.hover()
    }

    async hoverAddOns() {
        await this.addonsLink.hover()
    }

    async clickAddOnsSubItem(name: string) {
        await this.hoverAddOns()
        await this.addonsDropdown.locator('.dropdown-item', { hasText: name }).click()
    }

    async clickMyAccount() {
        await this.myAccountLink.click()
    }

    async hoverMyAccount() {
        await this.myAccountLink.hover()
    }

    async clickMyAccountSubItem(name: string) {
        await this.hoverMyAccount()
        await this.myAccountDropdown.locator('.dropdown-item', { hasText: name }).click()
    }

    async getPageUrl(): Promise<string> {
        return this.page.url()
    }

    async getPageTitle(): Promise<string> {
        return this.page.title()
    }

    async getHomeHref(): Promise<string | null> {
        return this.homeLink.getAttribute('href')
    }

    async getSpecialHref(): Promise<string | null> {
        return this.specialLink.getAttribute('href')
    }

    async getBlogHref(): Promise<string | null> {
        return this.blogLink.getAttribute('href')
    }

    async isMegaMenuToggle(): Promise<boolean> {
        const className = await this.megaMenuLink.getAttribute('class') || ''
        return className.includes('dropdown-toggle')
    }

    async isAddonsToggle(): Promise<boolean> {
        const className = await this.addonsLink.getAttribute('class') || ''
        return className.includes('dropdown-toggle')
    }

    async isMyAccountToggle(): Promise<boolean> {
        const className = await this.myAccountLink.getAttribute('class') || ''
        return className.includes('dropdown-toggle')
    }

    async isMegaMenuDropdownVisible(): Promise<boolean> {
        await this.hoverMegaMenu()
        return this.megaMenuDropdown.isVisible()
    }

    async getAddOnsSubItems(): Promise<string[]> {
        await this.hoverAddOns()
        const items = this.addonsDropdown.locator('.dropdown-item')
        const count = await items.count()
        const names: string[] = []
        for (let i = 0; i < count; i++) {
            const text = await items.nth(i).textContent()
            if (text) names.push(text.trim())
        }
        return names
    }

    async getMyAccountSubItems(): Promise<string[]> {
        await this.hoverMyAccount()
        const items = this.myAccountDropdown.locator('.dropdown-item')
        const count = await items.count()
        const names: string[] = []
        for (let i = 0; i < count; i++) {
            const text = await items.nth(i).textContent()
            if (text) names.push(text.trim())
        }
        return names
    }

    async getMegaMenuColumnTitles(): Promise<string[]> {
        await this.hoverMegaMenu()
        const titles = this.megaMenuDropdown.locator('.design-title')
        const count = await titles.count()
        const names: string[] = []
        for (let i = 0; i < count; i++) {
            const text = await titles.nth(i).textContent()
            if (text) names.push(text.trim())
        }
        return names
    }

    async getNavLinkCount(): Promise<number> {
        const links = this.horizontalNav.locator(':scope > div > .navbar-nav > .nav-item > .nav-link')
        return links.count()
    }
}

export default MainNavigationComponent
