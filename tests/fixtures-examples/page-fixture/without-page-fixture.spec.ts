import {test, expect, Page, Browser, chromium} from '@playwright/test';

test('without page fixture', async ({}) => {
    
    let browser: Browser;
    let page: Page;
    browser = await chromium.launch();
    page = await browser.newPage();
    
    await page.goto('https://example.com');
    await expect(page).toHaveTitle('Example Domain');
    await page.waitForTimeout(5000);
    
    await browser.close();
    
});
