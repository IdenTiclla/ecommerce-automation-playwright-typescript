import { test, expect } from '@playwright/test';
import HomePage  from '../pages/homePage'; 
import LoginPage  from '../pages/LoginPage';

process.loadEnvFile();


test("Login with valid credentials", async ({ page}) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.navigateToHomePage();
  await homePage.clickOnMyAccount();
  await loginPage.fillEmail(process.env.VALID_EMAIL);
  await loginPage.fillPassword(process.env.VALID_PASSWORD);
  await loginPage.clickOnLoginButton();

  await expect(page.getByRole('heading', { name: 'My Account' })).toBeVisible();

})

test("Login with invalid credentials", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.navigateToHomePage();
  await homePage.clickOnMyAccount();
  await loginPage.fillEmail(process.env.INVALID_EMAIL);
  await loginPage.fillPassword(process.env.INVALID_PASSWORD);
  await loginPage.clickOnLoginButton();
  await expect(page.getByText('Warning: No match for E-Mail Address and/or Password.')).toBeVisible();
})