import { Locator, Page } from '@playwright/test';

export class Header {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get youTubeIcon(): Locator { return this.page.locator('#logo-icon'); }
    get hamburgerMenu(): Locator { return this.page.locator('#guide-button');}
    
    async clickYouTubeIcon(): Promise<void> {
        await this.youTubeIcon.click();
    }
}