import { EnvironmentConfig } from './index';

/**
 * QA Environment Configuration
 */
export const qaConfig: EnvironmentConfig = {
  baseUrl: 'https://playwright.dev',
  apiUrl: 'https://api-qa.example.com',
  defaultTimeout: 5000,
  testTimeout: 30000,
  globalTimeout: 60000,
};
