
/**
 * Analytics Configuration
 * Centralized configuration for the analytics system
 */
import { AnalyticsConfig } from './types';

// Default configuration
export const DEFAULT_CONFIG: AnalyticsConfig = {
  batchSize: 10,
  batchIntervalMs: 2000,
  samplingRate: 1.0, // Track everything by default
  errorSamplingRate: 1.0, // Track all errors
  debug: process.env.NODE_ENV === 'development'
};

// The current configuration
let currentConfig: AnalyticsConfig = { ...DEFAULT_CONFIG };

/**
 * Get the current analytics configuration
 */
export const getConfig = (): AnalyticsConfig => {
  return { ...currentConfig };
};

/**
 * Update the analytics configuration
 */
export const updateConfig = (newConfig: Partial<AnalyticsConfig>): AnalyticsConfig => {
  currentConfig = { ...currentConfig, ...newConfig };
  
  // Debug logging
  if (currentConfig.debug) {
    console.log('[Analytics] Configuration updated:', currentConfig);
  }
  
  return { ...currentConfig };
};
