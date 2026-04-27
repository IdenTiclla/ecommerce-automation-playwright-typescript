import {test as base} from "@playwright/test"
import HomePage from "../pages/homePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage"

type MyFixtures = {
    homePage: HomePage
    loginPage: LoginPage
    registerPage: RegisterPage
}

export const test = base.extend<MyFixtures>({

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    registerPage: async ({ page }, use) => {
        const registerPage = new RegisterPage(page);
        await use(registerPage);
    }

});

export { expect } from "@playwright/test";