import { EnvironmentConfig } from './index';

/**
 * Staging Environment Configuration
 */
export const stagingConfig: EnvironmentConfig = {
  baseUrl: 'https://staging.example.com',
  apiUrl: 'https://api-staging.example.com',
  defaultTimeout: 10000,
  testTimeout: 60000,
  globalTimeout: 60000,
};
