
// Default settings for batching events
export const DEFAULT_BATCH_SIZE = 10;
export const DEFAULT_BATCH_INTERVAL_MS = 2000;

// Configurable settings with defaults
let batchSize = DEFAULT_BATCH_SIZE;
let batchIntervalMs = DEFAULT_BATCH_INTERVAL_MS;

/**
 * Get current analytics config values
 */
export const getConfig = () => ({
  batchSize,
  batchIntervalMs
});

/**
 * Update analytics configuration
 */
export const updateConfig = (config: {
  batchSize?: number;
  batchIntervalMs?: number;
}) => {
  if (config.batchSize) batchSize = config.batchSize;
  if (config.batchIntervalMs) batchIntervalMs = config.batchIntervalMs;
};
