import { HomePage } from '../../../pages/HomePage'; 
import { isVisible } from '../../../helpers/genericHelper';
import { test, expect} from '../../../fixtures/myFixture';

test('verify download link', async ({ login }) => {

    const homePage = new HomePage(login);
    
    // Verify download link is visible
    await expect(await isVisible(homePage.downloadLink)).toBe(true);
});
