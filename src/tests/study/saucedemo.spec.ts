import {test} from "@playwright/test"

test("Saucedemo Practice", async({page}) => {
    await page.goto("https://www.saucedemo.com/");
    const usernameInput = await page.getByRole("textbox", {name: "Username"});
    const passwordInput = await page.getByRole("textbox", {name: "Password"});
    const loginButton = await page.getByRole("button", {name: "Login"}); 
    await usernameInput.fill("standard_user");
    await passwordInput.fill("secret_sauce");
    await loginButton.click();
    
    await page.pause();
    const itemsContainer = await page.locator("#inventory_container .inventory_item").all();
    // Para seleccionar un indice aleatorio
    const randomIndex = Math.floor(Math.random() * itemsContainer.length)

    const randomItem = itemsContainer[randomIndex];

})