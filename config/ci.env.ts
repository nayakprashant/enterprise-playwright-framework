import { EnvironmentConfig } from './index';

/**
 * CI Environment Configuration
 */
export const ciConfig: EnvironmentConfig = {
  baseUrl: 'https://cms.demo.katalon.com',
  apiUrl: 'https://api-ci.example.com',
  defaultTimeout: 30000,
  testTimeout: 120000,
  globalTimeout: 60000,
};
