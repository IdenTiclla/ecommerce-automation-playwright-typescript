import { test, expect } from "../../../fixtures/baseTest"


test("Verify dummy website message", async({page, homePage}) => {
    await homePage.navigateToHomePage();

    const dummyMessage: string = await homePage.getThisDummyMessage();
    const dummyMessage2: string = await homePage.dummy_message_loc2.innerText();
    
    expect(await homePage.getPageTitle()).toBe("Your Store");
    expect(homePage.page).toHaveTitle("Your Store")
    expect(dummyMessage).toBe("This is a dummy website for Web Automation Testing");
    expect(dummyMessage2).toBe("This is a dummy website for Web Automation Testing");
})


test("Verify home page title", async({page, homePage}) => {
    await homePage.navigateToHomePage();

    const page_title: string = await homePage.getPageTitle()
    expect(page_title).toBe("Your Store");
})

test("Verify home page url", async({page, homePage}) => {
    await homePage.navigateToHomePage();

    const page_url: string = homePage.getPageUrl();
    expect(page_url).toBe("https://ecommerce-playground.lambdatest.io/");
    expect(homePage.page).toHaveURL(/ecommerce-playground/);
})

test("Verify store logo is visible on home page", async({page, homePage}) => {
    await homePage.navigateToHomePage();
    
    await expect(homePage.store_logo).toBeVisible();
})

test("Verify that the logo is clickable on home page", async({page, homePage}) => {
    await homePage.navigateToHomePage();
    
    await expect(homePage.store_logo).toBeEnabled();
})

test("Verify that the logo has the correct src and alt attribute on home page", async({page, homePage}) => {
    await homePage.navigateToHomePage();

    expect(homePage.store_logo).toHaveAttribute("src", "https://ecommerce-playground.lambdatest.io/image/catalog/maza/svg/image2vector.svg")
    expect(homePage.store_logo).toHaveAttribute("alt", "Poco Electro")
})


test("Verify search for a product from home page", async({page, homePage}) => {
    await homePage.navigateToHomePage();

    await homePage.searchComponent.searchForProduct("iPhone");
    expect(page.url()).toContain("search=iPhone")
})

test("Verify home redirection after clicking on home page logo", async({page, homePage}) => {
    await homePage.navigateToHomePage();

    await homePage.searchComponent.searchForProduct("iPhone");
    expect(page.url()).toContain("search=iPhone")

    await homePage.store_logo.click();
    expect(page.url()).toBe("https://ecommerce-playground.lambdatest.io/index.php?route=common/home");
})