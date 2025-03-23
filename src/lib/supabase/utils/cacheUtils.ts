
// Cache constants
export const CACHE_KEYS = {
  PROFILES: 'cache_profiles',
  ADVISORS: 'cache_advisors',
  CONSUMERS: 'cache_consumers',
  MATCHES: 'cache_matches',
  APPOINTMENTS: 'cache_appointments',
  CHATS: 'cache_chats',
};

// Cache utility functions
export const saveToCache = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

export const getFromCache = <T>(key: string, maxAge: number = 5 * 60 * 1000): T | null => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const parsedCache = JSON.parse(cached);
    const isExpired = Date.now() - parsedCache.timestamp > maxAge;
    
    return isExpired ? null : parsedCache.data as T;
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
};

export const clearCache = (key?: string): void => {
  if (key) {
    localStorage.removeItem(key);
  } else {
    // Clear all cache keys
    Object.values(CACHE_KEYS).forEach(cacheKey => {
      localStorage.removeItem(cacheKey);
    });
  }
};

// Utility function to invalidate specific cache keys
export const invalidateCache = (key: string): void => {
  clearCache(key);
};

// Utility function to invalidate all cache
export const invalidateAllCache = (): void => {
  clearCache();
};
