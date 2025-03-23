
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
    // Clear all cache keys by iterating localStorage
    // We can't directly import CACHE_KEYS here due to circular dependency
    Object.keys(localStorage).forEach(localKey => {
      if (localKey.startsWith('cache_')) {
        localStorage.removeItem(localKey);
      }
    });
  }
};

// Cache management utilities
export const invalidateCache = (key: string) => {
  clearCache(key);
};

export const invalidateAllCache = () => {
  clearCache();
};
