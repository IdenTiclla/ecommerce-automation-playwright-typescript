import { test, expect } from "../../../fixtures/baseTest"


test("Login with valid credentials", async ({ page, loginPage, homePage}) => {

  await homePage.navigateToHomePage();
  await homePage.clickOnMyAccount();
  await loginPage.fillEmail(process.env.VALID_EMAIL);
  await loginPage.fillPassword(process.env.VALID_PASSWORD);
  await loginPage.clickOnLoginButton();

  await expect(page.getByRole('heading', { name: 'My Account' })).toBeVisible();

})

test("Login with invalid credentials", async ({ page, homePage, loginPage }) => {

  const randomEmail: string = `user${Math.floor(Math.random() * 1000)}@example.com`;
  const randomPassword: string = `Password${Math.floor(Math.random() * 1000)}`;

  await homePage.navigateToHomePage();
  await homePage.clickOnMyAccount();
  await loginPage.fillEmail(randomEmail);
  await loginPage.fillPassword(randomPassword);
  await loginPage.clickOnLoginButton();
  await expect(page.getByText('Warning: No match for E-Mail Address and/or Password.')).toBeVisible();
})

test("Test search functionality from login page", async({homePage, loginPage, page}) => {
  await homePage.navigateToHomePage();
  await homePage.clickOnMyAccount();
  await loginPage.searchComponent.searchForProduct("MacBook");

  expect(page.url()).toContain("search=MacBook");

})
