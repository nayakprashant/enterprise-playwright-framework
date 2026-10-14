import { Locator } from '@playwright/test';
import { getConfig } from '../config';

/**
 * Generic Helper Functions
 * Lightweight wrappers around commonly used Playwright interactions
 * All functions accept an optional timeout parameter that overrides the framework default
 */

/**
 * Click on a locator
 * @param locator - Playwright Locator
 * @param timeout - Optional timeout in milliseconds (defaults to framework config)
 */
export async function click(locator: Locator, timeout?: number): Promise<void> {
  console.log(`Clicking on element: ${locator.toString()}`);
  const actualTimeout = timeout ?? getConfig().defaultTimeout;
  await locator.click({ timeout: actualTimeout });
}

/**
 * Fill text into an input field
 * @param locator - Playwright Locator
 * @param text - Text to fill
 * @param timeout - Optional timeout in milliseconds (defaults to framework config)
 */
export async function fill(locator: Locator, text: string, timeout?: number): Promise<void> {
  console.log(`Filling text into element: ${locator.toString()}, text: ${text}`);
  const actualTimeout = timeout ?? getConfig().defaultTimeout;
  await locator.fill(text, { timeout: actualTimeout });
}

/**
 * Get text content from a locator
 * @param locator - Playwright Locator
 * @param timeout - Optional timeout in milliseconds (defaults to framework config)
 * @returns Text content of the element
 */
export async function getText(locator: Locator, timeout?: number): Promise<string> {
  console.log(`Getting text from element: ${locator.toString()}`);
  const actualTimeout = timeout ?? getConfig().defaultTimeout;
  return await locator.textContent({ timeout: actualTimeout }) || '';
}

/**
 * Check if a locator is visible
 * @param locator - Playwright Locator
 * @param timeout - Optional timeout in milliseconds (defaults to framework config)
 * @returns True if visible, false otherwise
 */
export async function isVisible(locator: Locator, timeout?: number): Promise<boolean> {
  console.log(`Checking if element is visible: ${locator.toString()}`);
  const actualTimeout = timeout ?? getConfig().defaultTimeout;
  return await locator.isVisible({ timeout: actualTimeout });
}

/**
 * Wait for a locator to be visible
 * @param locator - Playwright Locator
 * @param timeout - Optional timeout in milliseconds (defaults to framework config)
 */
export async function waitForVisible(locator: Locator, timeout?: number): Promise<void> {
  console.log(`Waiting for element to be visible: ${locator.toString()}`);
  const actualTimeout = timeout ?? getConfig().defaultTimeout;
  await locator.waitFor({ state: 'visible', timeout: actualTimeout });
}

/**
 * Wait for a locator to be hidden
 * @param locator - Playwright Locator
 * @param timeout - Optional timeout in milliseconds (defaults to framework config)
 */
export async function waitForHidden(locator: Locator, timeout?: number): Promise<void> {
  console.log(`Waiting for element to be hidden: ${locator.toString()}`);
  const actualTimeout = timeout ?? getConfig().defaultTimeout;
  await locator.waitFor({ state: 'hidden', timeout: actualTimeout });
}

/**
 * Check if a locator is enabled
 * @param locator - Playwright Locator
 * @param timeout - Optional timeout in milliseconds (defaults to framework config)
 * @returns True if enabled, false otherwise
 */
export async function isEnabled(locator: Locator, timeout?: number): Promise<boolean> {
  console.log(`Checking if element is enabled: ${locator.toString()}`);
  const actualTimeout = timeout ?? getConfig().defaultTimeout;
  return await locator.isEnabled({ timeout: actualTimeout });
}

/**
 * Select an option from a dropdown
 * @param locator - Playwright Locator
 * @param value - Value to select
 * @param timeout - Optional timeout in milliseconds (defaults to framework config)
 */
export async function selectOption(locator: Locator, value: string, timeout?: number): Promise<void> {
  console.log(`Selecting option from element: ${locator.toString()}, value: ${value}`);
  const actualTimeout = timeout ?? getConfig().defaultTimeout;
  await locator.selectOption(value, { timeout: actualTimeout });
}

/**
 * Get attribute value from a locator
 * @param locator - Playwright Locator
 * @param attributeName - Name of the attribute
 * @param timeout - Optional timeout in milliseconds (defaults to framework config)
 * @returns Attribute value
 */
export async function getAttribute(locator: Locator, attributeName: string, timeout?: number): Promise<string | null> {
  console.log(`Getting attribute from element: ${locator.toString()}, attribute: ${attributeName}`);
  const actualTimeout = timeout ?? getConfig().defaultTimeout;
  return await locator.getAttribute(attributeName, { timeout: actualTimeout });
}

/**
 * Hover over a locator
 * @param locator - Playwright Locator
 * @param timeout - Optional timeout in milliseconds (defaults to framework config)
 */
export async function hover(locator: Locator, timeout?: number): Promise<void> {
  console.log(`Hovering over element: ${locator.toString()}`);
  const actualTimeout = timeout ?? getConfig().defaultTimeout;
  await locator.hover({ timeout: actualTimeout });
}

/**
 * Check a checkbox
 * @param locator - Playwright Locator
 * @param timeout - Optional timeout in milliseconds (defaults to framework config)
 */
export async function check(locator: Locator, timeout?: number): Promise<void> {
  console.log(`Checking checkbox: ${locator.toString()}`);
  const actualTimeout = timeout ?? getConfig().defaultTimeout;
  await locator.check({ timeout: actualTimeout });
}

/**
 * Uncheck a checkbox
 * @param locator - Playwright Locator
 * @param timeout - Optional timeout in milliseconds (defaults to framework config)
 */
export async function uncheck(locator: Locator, timeout?: number): Promise<void> {
  console.log(`Unchecking checkbox: ${locator.toString()}`);
  const actualTimeout = timeout ?? getConfig().defaultTimeout;
  await locator.uncheck({ timeout: actualTimeout });
}
