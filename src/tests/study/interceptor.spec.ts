import {test, expect} from "@playwright/test"
import { Loginpage } from "../../po/pages/loginpage";

test("Interceptor usage", async({page}) => {

    // Agilizar la ejecucion de un test, removiendo la carga de ciertos elementos
    // En llamados api, no es necesario la carga de las imagenes 
    
    await page.on("request", req => {
        console.log(req.url());
    })
    
    await page.route("https://www.saucedemo.com/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg", 
        (route) => route.abort())
    
    //Evitar cargas por tipo
    
    await page.route("**/*.{png,jpg,jpeg,svg}", 
            (route) => route.abort())

    // Para evitar la carga de ciertas imagenes

    await page.goto("https://www.saucedemo.com/");
    
    const loginPage = new Loginpage(page);
    await loginPage.loginWithCredentials("standard_user", "secret_sauce");

     // Crear screenshot de pantalla y guardarla con nombre y localizacion 

    await page.screenshot({path: "intercepted.png", fullPage: true})
}) 