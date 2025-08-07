import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/homePage";   
import { test, expect} from "@playwright/test";


test("Check the labels on the register page", async ({page}) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigateToRegisterPage();
    expect(registerPage.labels).toContainText([
        "First Name",
        "Last Name",
        "E-Mail",
        "Telephone",
        "Password",
        "Password Confirm",
        "Subscribe",
        "Yes",
        "No"
    ])
})

test("Register a new user", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const homePage = new HomePage(page);

    await homePage.navigateToHomePage();
    await homePage.clickOnMyAccount();
    await registerPage.navigateToRegisterPage();
    const expectedTitle: string = "Register Account";
    const actualTitle: string = await homePage.getPageTitle();
    expect(actualTitle).toBe(expectedTitle);

    const firstName: string = "John";
    const lastName: string = "Doe";
    // generate a random email
    const email: string = "john.doe104@example.com"   
    
    const telephone: string = "1234567890";
    const password: string = "Password123";
    const passwordConfirm: string = "Password123";
    const subscribe: boolean = true;
    const agree: boolean = true;

    await registerPage.fillRegisterForm(firstName, lastName, email, telephone, password, passwordConfirm, subscribe, agree);
    await expect(page.getByText('Your Account Has Been Created!')).toBeVisible(); 

})