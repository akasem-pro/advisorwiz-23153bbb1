
/**
 * Analytics Config
 * Manages configuration for the analytics system
 */
import { AnalyticsConfig } from './types';

// Default configuration
export const DEFAULT_CONFIG: AnalyticsConfig = {
  debug: false,
  samplingRate: 1.0, // Track 100% of events by default
  errorSamplingRate: 1.0, // Track 100% of errors by default
  batchSize: 10,
  batchIntervalMs: 2000,
  providersEnabled: ['ga4', 'internal']
};

// Current configuration with defaults
let config: AnalyticsConfig = { ...DEFAULT_CONFIG };

/**
 * Get current analytics configuration
 */
export const getConfig = (): AnalyticsConfig => {
  return { ...config };
};

/**
 * Update analytics configuration
 */
export const updateConfig = (newConfig: Partial<AnalyticsConfig>): void => {
  config = {
    ...config,
    ...newConfig
  };
  
  if (config.debug) {
    console.log('[Analytics] Config updated:', config);
  }
};
