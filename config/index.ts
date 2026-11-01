/**
 * Environment configuration interface
 * Defines all possible configuration fields for any environment
 */
export interface EnvironmentConfig {
  baseUrl: string;
  apiUrl: string;
  defaultTimeout: number;
  testTimeout: number;
  globalTimeout: number;
  [key: string]: any; // Allow additional environment-specific properties
}

/**
 * Import environment configurations
 */
import { qaConfig } from './qa.env';
import { stagingConfig } from './staging.env';
import { ciConfig } from './ci.env';

/**
 * Environment configurations mapping
 */
const environments: Record<string, EnvironmentConfig> = {
  qa: qaConfig,
  staging: stagingConfig,
  ci: ciConfig,
};

/**
 * Current loaded configuration
 */
let currentConfig: EnvironmentConfig;

/**
 * Load configuration for the specified environment
 * @param envName - Name of the environment (e.g., 'qa', 'staging', 'ci')
 * @returns The environment configuration
 * @throws Error if environment is not found
 */
export function loadConfig(envName: string): EnvironmentConfig {
  const config = environments[envName];
  
  if (!config) {
    throw new Error(
      `Environment '${envName}' not found. Available environments: ${Object.keys(environments).join(', ')}`
    );
  }

  // Validate required fields
  const requiredFields: (keyof EnvironmentConfig)[] = ['baseUrl', 'apiUrl', 'defaultTimeout', 'testTimeout', 'globalTimeout'];
  for (const field of requiredFields) {
    if (config[field] === undefined || config[field] === null) {
      throw new Error(`Required field '${field}' is missing in environment '${envName}'`);
    }
  }

  currentConfig = config;
  console.log('Config loaded:', config);
  return config;
}

/**
 * Get the current loaded configuration
 * @returns The current environment configuration
 * @throws Error if config has not been loaded yet
 */
export function getConfig(): EnvironmentConfig {
  if (!currentConfig) {
    throw new Error('Configuration has not been loaded. Call loadConfig() first.');
  }
  return currentConfig;
}

/**
 * Export the current config as a default export for convenience
 */
export { currentConfig as config };
