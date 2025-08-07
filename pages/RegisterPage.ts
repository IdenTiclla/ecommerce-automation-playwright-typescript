import { Locator, Page } from "@playwright/test";

class RegisterPage {
    private url: string = "https://ecommerce-playground.lambdatest.io/index.php?route=account/register";
    private page: Page;

    public firstNameInput: Locator;
    public lastNameInput: Locator;
    public emailInput: Locator;
    public telephoneInput: Locator;
    public passwordInput: Locator;
    public passwordConfirmInput: Locator;
    public subscribeInput: Locator;
    public agreeInput: Locator;
    public continueButton: Locator;

    public labels: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = this.page.locator('input[name="firstname"]');
        this.lastNameInput = this.page.locator('input[name="lastname"]');
        this.emailInput = this.page.locator('input[name="email"]');
        this.telephoneInput = this.page.locator('input[name="telephone"]');
        this.passwordInput = this.page.locator('input[name="password"]');
        this.passwordConfirmInput = this.page.locator('input[name="confirm"]');
        this.subscribeInput = this.page.locator('input[name="newsletter"]');
        this.agreeInput = this.page.locator('input[name="agree"]');
        this.continueButton = this.page.locator('input[type="submit"][value="Continue"]');
        this.labels = this.page.locator('div.form-group label');
    }

    async navigateToRegisterPage() {
        await this.page.goto(this.url);
    }


    async fillRegisterForm(
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        password: string,
        passwordConfirm: string,
        subscribe: boolean,
        agree: boolean) 
    {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.telephoneInput.fill(telephone);
        await this.passwordInput.fill(password);
        await this.passwordConfirmInput.fill(passwordConfirm);
        await this.subscribeInput.nth(subscribe ? 0 : 1).click({
            force: true
        });
        if (agree) {
            await this.agreeInput.click({
                force: true
            });
        }
        await this.continueButton.click();
    }
}

export default RegisterPage;