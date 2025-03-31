
/**
 * Optimized cache utilities with improved performance
 */

// Cache configuration
const CACHE_CONFIG = {
  DEFAULT_TTL: 3600 * 1000, // 1 hour in ms
  VERSION: '1.0',
  PREFIX: 'aw_cache:'
};

// Generate a versioned cache key
const buildCacheKey = (key: string): string => {
  return `${CACHE_CONFIG.PREFIX}${CACHE_CONFIG.VERSION}:${key}`;
};

// Function to save data to local storage with TTL
export const saveToCache = (key: string, data: any, ttl?: number): void => {
  try {
    const now = Date.now();
    const item = {
      data,
      expires: now + (ttl || CACHE_CONFIG.DEFAULT_TTL),
      timestamp: now
    };
    
    const serializedData = JSON.stringify(item);
    localStorage.setItem(buildCacheKey(key), serializedData);
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

// Function to retrieve data from local storage with expiration check
export const getFromCache = <T>(key: string): T | null => {
  try {
    const serializedData = localStorage.getItem(buildCacheKey(key));
    if (serializedData === null) {
      return null;
    }
    
    const item = JSON.parse(serializedData);
    
    // Check if item has expired
    if (item.expires && item.expires < Date.now()) {
      localStorage.removeItem(buildCacheKey(key));
      return null;
    }
    
    return item.data as T;
  } catch (error) {
    console.error('Error retrieving from cache:', error);
    return null;
  }
};

// Function to remove data from local storage
export const invalidateCache = (key: string): void => {
  try {
    localStorage.removeItem(buildCacheKey(key));
  } catch (error) {
    console.error('Error invalidating cache:', error);
  }
};

// Function to clear all cache with the current version prefix
export const invalidateAllCache = (): void => {
  try {
    const prefix = CACHE_CONFIG.PREFIX + CACHE_CONFIG.VERSION;
    
    // More efficient way to clear only our app's cache items
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        localStorage.removeItem(key);
      }
    }
  } catch (error) {
    console.error('Error invalidating all cache:', error);
  }
};

// Function to clear expired cache entries
export const clearExpiredCache = (): void => {
  try {
    const now = Date.now();
    const prefix = CACHE_CONFIG.PREFIX + CACHE_CONFIG.VERSION;
    
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        try {
          const item = JSON.parse(localStorage.getItem(key) || '{}');
          if (item.expires && item.expires < now) {
            localStorage.removeItem(key);
          }
        } catch (e) {
          // If item can't be parsed, remove it
          localStorage.removeItem(key);
        }
      }
    }
  } catch (error) {
    console.error('Error clearing expired cache:', error);
  }
};

// Cache keys
export const CACHE_KEYS = {
  PROFILES: 'profiles',
  ADVISOR_PROFILES: 'advisor_profiles',
  CONSUMER_PROFILES: 'consumer_profiles',
  COMPATIBILITY_SCORES: 'compatibility_scores',
  APPOINTMENTS: 'appointments',
  CHATS: 'chats',
  TOOLTIPS: 'tooltips'
};
