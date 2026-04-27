import { test, expect} from "../../../fixtures/baseTest"
import { generateFakeEmail, generateFakePassword, generateFakeUsername, generateFakeLastname, generateFakePhoneNumber } from "../../../utils/helpers";

test("Check the labels on the register page", async ({page, registerPage}) => {
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

test("Register a new user", async ({ page, homePage, registerPage }) => {
    await homePage.navigateToHomePage();
    await homePage.clickOnMyAccount();
    await registerPage.navigateToRegisterPage();

    const expectedTitle: string = "Register Account";
    const actualTitle: string = await homePage.getPageTitle();
    expect(actualTitle).toBe(expectedTitle);

    const generatedPassword: string = generateFakePassword();

    const randomFirstname: string = generateFakeUsername();
    const randomLastname: string = generateFakeLastname();
    const randomEmail: string = generateFakeEmail();
    const telephone: string = generateFakePhoneNumber();
    const password: string = generatedPassword;
    const passwordConfirm: string = generatedPassword;
    const subscribe: boolean = true;
    const agree: boolean = true;

    await registerPage.fillRegisterForm(randomFirstname, randomLastname, randomEmail, telephone, password, passwordConfirm, subscribe, agree);
    await expect(page.getByText('Your Account Has Been Created!')).toBeVisible(); 

})