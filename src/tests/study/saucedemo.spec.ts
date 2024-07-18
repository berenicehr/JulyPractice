import {test, expect} from "@playwright/test"
import { Loginpage } from "../../po/pages/loginpage";

test("Saucedemo Practice", async({page}) => {
    // await page.goto("https://www.saucedemo.com/");
    await page.goto(process.env.URL);


    const loginPage = new Loginpage(page);
    await loginPage.loginWithCredentials("standard_user", "secret_sauce");
  
    //NEEDS TO BE UPDATED WITH POM STRUCTURE

    const itemsContainer = await page.locator("#inventory_container .inventory_item").all();
    // Para seleccionar un indice aleatorio
    const randomIndex = Math.floor(Math.random() * itemsContainer.length)

    const randomItem = itemsContainer[randomIndex];
    const expectedDescription = await randomItem.locator(".inventory_item_desc").innerText();
    const expectedName = await randomItem.locator(".inventory_item_name").innerText();
    const expectedPrice = await randomItem.locator(".inventory_item_price").innerText();

    console.log(`Price is ${expectedPrice} for ${expectedName}, more info: ${expectedDescription}`)
    await randomItem.getByRole("button", {name: "Add to cart"}).click(); 

    const shoppingIcon = await page.locator(".shopping_cart_link");
    await shoppingIcon.click();

    const checkoutButtton = await page.getByRole("button", { name: "Checkout"});
    await expect(checkoutButtton).toBeVisible();

    const actualDescription = await page.locator(".inventory_item_desc").innerText();
    const actualName = await page.locator(".inventory_item_name").innerText();
    const actualPrice = await page.locator(".inventory_item_price").innerText();

    expect(expectedDescription).toEqual(actualDescription);
    expect(expectedName).toEqual(actualName);
    expect(expectedPrice).toEqual(actualPrice);
    
    await checkoutButtton.click();
    const firstnameInput = await page.locator('[data-test="firstName"]');
    const lastnameInput = await page.locator('[data-test="lastName"]');
    const zipInput = await page.getByRole("textbox", {name: "Zip/Postal Code"}); 
    const continueButton = await page.getByRole("button", {name: "Continue"});

    await firstnameInput.fill("Berenice");
    await lastnameInput.fill("Huerta");
    await zipInput.fill("06100");
    await continueButton.click();

    const finishButton = await page.getByRole("button", {name: "Finish"});
    await finishButton.click();

    const thanksHeading = await page.getByRole("heading", {name: "Thank you for your order!"});
    await expect(thanksHeading).toBeVisible();
});
