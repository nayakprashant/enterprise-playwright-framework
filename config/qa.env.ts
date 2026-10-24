import { EnvironmentConfig } from './index';

/**
 * QA Environment Configuration
 */
export const qaConfig: EnvironmentConfig = {
  baseUrl: 'https://cms.demo.katalon.com',
  apiUrl: 'https://api-qa.example.com',
  defaultTimeout: 30000,
  testTimeout: 120000,
  globalTimeout: 60000,
};
