import { Locator, Page } from "@playwright/test";

export class Homepage{

    public readonly itemsContainer: Locator

    constructor(page: Page){
        this.itemsContainer = page.locator("#inventory_container .inventory_item")
    }
}