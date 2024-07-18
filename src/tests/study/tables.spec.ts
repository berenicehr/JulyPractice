import { test, expect } from "@playwright/test"

test("Working with a table", async ({ page }) => {

    await page.goto("https://cosmocode.io/automation-practice-webtable/");

    // Primer paso, localiza el contenedor de la tabla
    const tableContainer = await page.locator("table#countries");
    // Paso 1: Identifica todas las filas
    const rows = await tableContainer.locator("tr").all();
    const row1 = rows.at(1);
    const countryName = await row1?.locator('//td[2]').innerText();
    const countryCapital = await row1?.locator('//td[3]').innerText();
    const countryCurrency = await row1?.locator('//td[4]').innerText();
    // Paso 3 crea un array vacio para colocar los objetos de la tabla. 
    // Usa una interfaz para definir las propiedades necesarias de cada objeto
    const countries: Country[] = [];

    //Paso 4: Itera sobre cada fila y coloca sobre una variable vacia el objeto con las propiedades correspondientes de cada iteracion
    // esto añadira varios objetos sobre el array de country. 
    for (let row of rows) {
        let country: Country = {
            name: await row.locator("//td[2]").innerText(),
            capital: await row.locator("//td[3]").innerText(),
            currency: await row.locator("//td[4]").innerText(),
            primaryLanguage: await row.locator("//td[5]").innerText(),
        }
        countries.push(country);
    }
    // Para observar el contenido de countries y ver los objetos añadidos.
    // for (let country of countries) {
    //     console.log(country)
    // }

    // Filtrar informacion con el array con los objetos ordenados
    const countryWherePeopleSpeakPortuguese = countries.filter(country => country.primaryLanguage === "Portuguese")
    console.log(countryWherePeopleSpeakPortuguese);

    interface Country {
        name: string,
        capital: string,
        currency: string,
        primaryLanguage: string
    }


})