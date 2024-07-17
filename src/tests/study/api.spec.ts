import {test, expect} from "@playwright/test";

test.describe('API positive tests', () => {
    test("Making a get call", async ({ page }) => {
        const response = await page.evaluate(async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            return res.status;
        });

        expect(response).toBe(200);
    });

    // fetch and axios can be used but also througha fixture request you can make api calls.
    

})