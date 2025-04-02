/**
 * Cache configuration parameters
 * 
 * This module centralizes all cache-related configuration values,
 * making them easier to adjust and document.
 */

// Cache expiration time (in milliseconds)
export const CACHE_EXPIRATION_MS = 10 * 60 * 1000; // 10 minutes

// Cache maintenance intervals and thresholds
export const CACHE_CONFIG = {
  // How often to check for stale entries (1 hour)
  CLEANUP_INTERVAL_MS: 60 * 60 * 1000,
  
  // Maximum number of entries before auto-cleanup triggers
  AUTO_CLEANUP_SIZE: 3000,
  
  // Hard limit on cache size to prevent memory leaks
  MAX_SIZE: 5000,
  
  // Default TTL for cached entries (10 minutes)
  EXPIRATION_MS: 10 * 60 * 1000,
  
  // Maximum items in local memory cache
  MAX_ITEMS: 1000,
  
  // How many entries to keep when pruning (% of MAX_SIZE)
  PRUNE_KEEP_RATIO: 0.8,
};

// Cache keys for different data types
export const CACHE_KEYS = {
  COMPATIBILITY: 'compatibility',
  MATCH_EXPLANATIONS: 'match_explanations',
  TOP_MATCHES: 'top_matches',
  BATCH_RESULTS: 'batch_results',
};

// Settings for adaptive cache behavior
export const ADAPTIVE_CACHE_CONFIG = {
  // Enable/disable adaptive cache sizing based on device
  ENABLED: true,
  
  // Reduce cache size on mobile devices
  MOBILE_SIZE_MULTIPLIER: 0.5,
  
  // Shorter TTL for low-memory environments
  LOW_MEMORY_TTL_MS: 2 * 60 * 1000, // 2 minutes
};
