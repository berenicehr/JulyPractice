import {test, expect} from "@playwright/test";

test.describe("Basic Navigation", () => {
    test.use({storageState: 'state.json'})

    test.beforeEach( async({page}) => {
        await page.goto('https://www.epam.com/');
    })

    test('should open https://www.epam.com/ page', async ({ page }) => {
        await expect(page).toHaveTitle('EPAM | Software Engineering & Product Development Services  ')
      });
    
})