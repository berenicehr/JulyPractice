import { test, expect } from "@playwright/test"
import { Loginpage } from "../../po/pages/loginpage";

test("Interceptor usage", async ({ page }) => {

    // Agilizar la ejecucion de un test, removiendo la carga de ciertos elementos
    // En llamados api, no es necesario la carga de las imagenes 

    await page.on("request", req => { console.log(req.url()); })
    await page.route("https://www.saucedemo.com/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg",
        (route) => route.abort())
    await page.route("**/*.{png,jpg,jpeg,svg}",
        (route) => route.abort())

    await page.goto("https://www.saucedemo.com/");
    const loginPage = new Loginpage(page);
    await loginPage.loginWithCredentials("standard_user", "secret_sauce");
    await page.screenshot({ path: "intercepted.png", fullPage: true })
}) 

test("Interceptor request modified", async ({ page }) => {

    await page.route("https://demoqa.com/BookStore/v1/Books",
        (route) => {
            route.fulfill({
                status: 304,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: `
                {
                    "books": [
                        {
                            "isbn": "9781449325862",
                            "title": "El libro nuevo",
                            "subTitle": "A Working Introduction",
                            "author": "Berenice Huerta Rojas",
                            "publish_date": "2020-06-04T08:48:39.000Z",
                            "publisher": "O'Reilly Media",
                            "pages": 500,
                            "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
                            "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
                        }
                    ]
                }
                `
            })
        })
    
    await page.goto("https://demoqa.com/books")
    await page.pause();
    await page.screenshot({ path: "books.png", fullPage: true })
}) 