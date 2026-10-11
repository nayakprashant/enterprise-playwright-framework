import { test, expect } from '@playwright/test';
import { PlaywrightDevPage } from '../pages/PlaywrightDevPage';
import { click, getText, isVisible } from '../helpers/genericHelper';

/**
 * Playwright.dev Test Suite
 * Tests for the Playwright documentation website using page objects and helper functions
 */

test.describe('Playwright.dev Tests', () => {
  let playwrightDevPage: PlaywrightDevPage;

  test.beforeEach(async ({ page }) => {
    playwrightDevPage = new PlaywrightDevPage(page);
    await page.goto('/');
  });

  test('should display homepage elements', async () => {
    // Verify navigation links are visible
    await expect(await isVisible(playwrightDevPage.docsLink)).toBe(true);
    await expect(await isVisible(playwrightDevPage.mcpLink)).toBe(true);
    await expect(await isVisible(playwrightDevPage.cliLink)).toBe(true);
    await expect(await isVisible(playwrightDevPage.apiLink)).toBe(true);
    
    // Verify search button is visible
    await expect(await isVisible(playwrightDevPage.searchButton)).toBe(true);
    
    // Verify social links are visible
    await expect(await isVisible(playwrightDevPage.githubLink)).toBe(true);
    await expect(await isVisible(playwrightDevPage.discordLink)).toBe(true);
  });

  test('should navigate to docs', async () => {
    // Click on Docs link
    await click(playwrightDevPage.docsLink);
    
    // Verify navigation to docs page
    await expect(playwrightDevPage.page).toHaveURL(/.*docs/);
  });

  test('should navigate to MCP docs', async () => {
    // Click on MCP link
    await click(playwrightDevPage.mcpLink);
    
    // Verify navigation to MCP page
    await expect(playwrightDevPage.page).toHaveURL(/.*mcp/);
  });

  test('should navigate to CLI docs', async () => {
    // Click on CLI link
    await click(playwrightDevPage.cliLink);
    
    // Verify navigation to CLI page
    await expect(playwrightDevPage.page).toHaveURL(/.*agent-cli/);
  });

  test('should navigate to API docs', async () => {
    // Click on API link
    await click(playwrightDevPage.apiLink);
    
    // Verify navigation to API page
    await expect(playwrightDevPage.page).toHaveURL(/.*api/);
  });

  test('should navigate to GitHub repository', async () => {
    // Click on GitHub link
    await click(playwrightDevPage.githubLink);
    
    // Verify navigation to GitHub
    await expect(playwrightDevPage.page).toHaveURL(/github.com/);
  });

  test('should navigate to Discord server', async () => {
    // Click on Discord link
    await click(playwrightDevPage.discordLink);
    
    // Verify navigation to Discord
    await expect(playwrightDevPage.page).toHaveURL(/discord/);
  });

  test('should verify page title', async () => {
    // Verify page title contains Playwright
    await expect(playwrightDevPage.page).toHaveTitle(/Playwright/);
  });
});
