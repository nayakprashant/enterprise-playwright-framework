import {test, expect} from '@playwright/test';

test('page fixture', async ({page}) => {
       
    await page.goto('https://example.com');
    await expect(page).toHaveTitle('Example Domain');
    await page.waitForTimeout(5000);
    
});
