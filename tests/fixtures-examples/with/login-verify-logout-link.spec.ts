import { HomePage } from '../../../pages/HomePage'; 
import { isVisible } from '../../../helpers/genericHelper';
import { test, expect} from '../../../fixtures/myFixture';

test('verify logout link', async ({ login }) => {

    const homePage = new HomePage(login);
    // Verify logout link is visible
    await expect(await isVisible(homePage.logoutLink)).toBe(true);
});