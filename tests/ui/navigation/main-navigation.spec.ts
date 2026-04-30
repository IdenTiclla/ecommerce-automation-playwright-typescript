import { test, expect } from "../../../fixtures/baseTest"

test.describe("Main Navigation", () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.navigateToHomePage()
    })

    test.describe("Horizontal Navigation Bar - Visibility", () => {

        test("Verify all main navigation links are visible", async ({ mainNavigation }) => {
            await expect(mainNavigation.homeLink).toBeVisible()
            await expect(mainNavigation.specialLink).toBeVisible()
            await expect(mainNavigation.blogLink).toBeVisible()
            await expect(mainNavigation.megaMenuLink).toBeVisible()
            await expect(mainNavigation.addonsLink).toBeVisible()
            await expect(mainNavigation.myAccountLink).toBeVisible()
        })

        test("Verify horizontal navigation bar is visible", async ({ mainNavigation }) => {
            await expect(mainNavigation.horizontalNav).toBeVisible()
        })
    })

    test.describe("Home Navigation", () => {

        test("Navigate to Home page via nav link", async ({ mainNavigation }) => {
            await mainNavigation.clickHome()

            const url = await mainNavigation.getPageUrl()
            const title = await mainNavigation.getPageTitle()
            expect(url).toContain("route=common/home")
            expect(title).toBe("Your Store")
        })

        test("Home link has correct href", async ({ mainNavigation }) => {
            const href = await mainNavigation.getHomeHref()
            expect(href).toContain("route=common/home")
        })
    })

    test.describe("Special Navigation", () => {

        test("Navigate to Special offers page via nav link", async ({ mainNavigation }) => {
            await mainNavigation.clickSpecial()

            const url = await mainNavigation.getPageUrl()
            const title = await mainNavigation.getPageTitle()
            expect(url).toContain("route=product/special")
            expect(title).toBe("Special Offers")
        })

        test("Special link has correct href", async ({ mainNavigation }) => {
            const href = await mainNavigation.getSpecialHref()
            expect(href).toContain("route=product/special")
        })

        test("Special link shows Hot badge", async ({ mainNavigation }) => {
            await expect(mainNavigation.specialBadge).toBeVisible()
            await expect(mainNavigation.specialBadge).toHaveText("Hot")
        })
    })

    test.describe("Blog Navigation", () => {

        test("Navigate to Blog page via nav link", async ({ mainNavigation }) => {
            await mainNavigation.clickBlog()

            const url = await mainNavigation.getPageUrl()
            const title = await mainNavigation.getPageTitle()
            expect(url).toContain("route=extension/maza/blog/home")
            expect(title).toContain("Blog")
        })

        test("Blog link has correct href", async ({ mainNavigation }) => {
            const href = await mainNavigation.getBlogHref()
            expect(href).toContain("route=extension/maza/blog/home")
        })
    })

    test.describe("Mega Menu Navigation", () => {

        test("Mega Menu link is a dropdown toggle", async ({ mainNavigation }) => {
            const isToggle = await mainNavigation.isMegaMenuToggle()
            expect(isToggle).toBe(true)
        })

        test("Mega Menu dropdown shows on hover with category columns", async ({ mainNavigation }) => {
            const isVisible = await mainNavigation.isMegaMenuDropdownVisible()
            expect(isVisible).toBe(true)
        })

        test("Mega Menu displays category columns", async ({ mainNavigation }) => {
            const titles = await mainNavigation.getMegaMenuColumnTitles()
            expect(titles.length).toBeGreaterThan(0)
        })

        test("Mega Menu main link navigates to About Us page", async ({ mainNavigation }) => {
            await mainNavigation.clickMegaMenu()

            const url = await mainNavigation.getPageUrl()
            const title = await mainNavigation.getPageTitle()
            expect(url).toContain("information_id=4")
            expect(title).toBe("About Us")
        })
    })

    test.describe("AddOns Navigation", () => {

        test("AddOns link is a dropdown toggle", async ({ mainNavigation }) => {
            const isToggle = await mainNavigation.isAddonsToggle()
            expect(isToggle).toBe(true)
        })

        test("AddOns dropdown shows sub-items on hover", async ({ mainNavigation }) => {
            const subItems = await mainNavigation.getAddOnsSubItems()
            expect(subItems).toContain("Modules")
            expect(subItems).toContain("Designs")
            expect(subItems).toContain("Widgets")
        })

        test("Navigate to Modules via AddOns dropdown", async ({ mainNavigation }) => {
            await mainNavigation.clickAddOnsSubItem("Modules")

            const url = await mainNavigation.getPageUrl()
            const title = await mainNavigation.getPageTitle()
            expect(url).toContain("page_id=10")
            expect(title).toBe("Available Modules")
        })

        test("Navigate to Designs via AddOns dropdown", async ({ mainNavigation }) => {
            await mainNavigation.clickAddOnsSubItem("Designs")

            const url = await mainNavigation.getPageUrl()
            const title = await mainNavigation.getPageTitle()
            expect(url).toContain("page_id=11")
            expect(title).toBe("Designs")
        })

        test("Navigate to Widgets via AddOns dropdown", async ({ mainNavigation }) => {
            await mainNavigation.clickAddOnsSubItem("Widgets")

            const url = await mainNavigation.getPageUrl()
            const title = await mainNavigation.getPageTitle()
            expect(url).toContain("page_id=9")
            expect(title).toContain("Available Widgets")
        })

        test("AddOns link shows Featured badge", async ({ mainNavigation }) => {
            await expect(mainNavigation.addonsBadge).toBeVisible()
            await expect(mainNavigation.addonsBadge).toHaveText("Featured")
        })
    })

    test.describe("My Account Navigation", () => {

        test("My account link is a dropdown toggle", async ({ mainNavigation }) => {
            const isToggle = await mainNavigation.isMyAccountToggle()
            expect(isToggle).toBe(true)
        })

        test("My account dropdown shows Login and Register options", async ({ mainNavigation }) => {
            const subItems = await mainNavigation.getMyAccountSubItems()
            expect(subItems).toContain("Login")
            expect(subItems).toContain("Register")
        })

        test("Navigate to Login page via My Account dropdown", async ({ mainNavigation }) => {
            await mainNavigation.clickMyAccountSubItem("Login")

            const url = await mainNavigation.getPageUrl()
            const title = await mainNavigation.getPageTitle()
            expect(url).toContain("route=account/login")
            expect(title).toBe("Account Login")
        })

        test("Navigate to Register page via My Account dropdown", async ({ mainNavigation }) => {
            await mainNavigation.clickMyAccountSubItem("Register")

            const url = await mainNavigation.getPageUrl()
            const title = await mainNavigation.getPageTitle()
            expect(url).toContain("route=account/register")
            expect(title).toBe("Register Account")
        })

        test("My account main link navigates to account page", async ({ mainNavigation }) => {
            await mainNavigation.clickMyAccount()

            const url = await mainNavigation.getPageUrl()
            expect(url).toContain("route=account")
        })
    })

    test.describe("Shop by Category Navigation", () => {

        test("Shop by Category link is visible", async ({ shopByCategory }) => {
            await expect(shopByCategory.shopByCategoryLink).toBeVisible()
        })

        test("Shop by Category displays category items", async ({ shopByCategory }) => {
            const count = await shopByCategory.getCategoryItemCount()
            expect(count).toBeGreaterThan(0)
        })

        test("Shop by Category shows expected categories", async ({ shopByCategory }) => {
            const names = await shopByCategory.getVisibleCategoryNames()
            expect(names).toContain("Components")
            expect(names).toContain("Cameras")
            expect(names).toContain("Software")
            expect(names).toContain("Laptops & Notebooks")
        })

        test("Navigate to Components category via Shop by Category", async ({ shopByCategory }) => {
            await shopByCategory.clickCategoryByName("Components")

            const url = await shopByCategory.getPageUrl()
            expect(url).toContain("path=25")
        })

        test("Navigate to Cameras category via Shop by Category", async ({ shopByCategory }) => {
            await shopByCategory.clickCategoryByName("Cameras")

            const url = await shopByCategory.getPageUrl()
            expect(url).toContain("path=33")
        })

        test("Navigate to Laptops & Notebooks category via Shop by Category", async ({ shopByCategory }) => {
            await shopByCategory.clickCategoryByName("Laptops & Notebooks")

            const url = await shopByCategory.getPageUrl()
            expect(url).toContain("path=18")
        })
    })

    test.describe("Navigation Consistency", () => {

        test("All main nav links are present and count is correct", async ({ mainNavigation }) => {
            const count = await mainNavigation.getNavLinkCount()
            expect(count).toBe(6)
        })

        test("Navigation persists after navigating between pages", async ({ mainNavigation }) => {
            await mainNavigation.clickSpecial()
            const specialUrl = await mainNavigation.getPageUrl()
            expect(specialUrl).toContain("route=product/special")

            await expect(mainNavigation.horizontalNav).toBeVisible()
            await expect(mainNavigation.homeLink).toBeVisible()

            await mainNavigation.clickHome()
            const homeUrl = await mainNavigation.getPageUrl()
            expect(homeUrl).toContain("route=common/home")
        })
    })
})
