import { Locator, Page } from "@playwright/test";

export class Loginpage {

    private readonly usernameInput: Locator
    private readonly passwordInput: Locator
    private readonly loginButton: Locator
    
    constructor(page: Page){
        this.usernameInput = page.getByRole("textbox", {name: "Username"});
        this.passwordInput = page.getByRole("textbox", {name: "Password"});
        this.loginButton = page.getByRole("button", {name: "Login"});
    }

    async fill(input: Locator, text: string) {
        await input.fill(text);
    }

    async clickOn(input: Locator, ) {
        await input.click();
    }

    async loginWithCredentials(username: string, password: string){
        await this.fill(this.usernameInput, username);
        await this.fill(this.passwordInput, password);
        await this.clickOn(this.loginButton);
    }

}