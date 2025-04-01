
/**
 * Enhanced memoization utility for expensive function calls
 */

type MemoizeOptions = {
  maxSize?: number;
  ttl?: number; // Time to live in milliseconds
  cacheKeyFn?: (...args: any[]) => string;
};

interface CacheEntry<T> {
  value: T;
  expires: number | null;
  lastAccessed: number;
}

// Define the type for the memoized function with additional properties
export interface MemoizedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T>;
  clearCache: () => void;
  getStats: () => { size: number; keys: string[] };
  removeEntry: (key: string) => boolean;
}

export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  options: MemoizeOptions = {}
): MemoizedFunction<T> {
  const {
    maxSize = 100,
    ttl = null,
    cacheKeyFn = (...args: any[]) => JSON.stringify(args)
  } = options;

  const cache = new Map<string, CacheEntry<ReturnType<T>>>();
  
  // LRU tracking
  const accessOrder: string[] = [];

  const memoized = ((...args: Parameters<T>): ReturnType<T> => {
    const key = cacheKeyFn(...args);
    const now = Date.now();
    
    // Check if we have a valid cached entry
    if (cache.has(key)) {
      const entry = cache.get(key)!;
      
      // Check if the entry is expired
      if (entry.expires !== null && now > entry.expires) {
        cache.delete(key);
        const index = accessOrder.indexOf(key);
        if (index !== -1) accessOrder.splice(index, 1);
      } else {
        // Update access time and promote to most recently used
        entry.lastAccessed = now;
        const index = accessOrder.indexOf(key);
        if (index !== -1) {
          accessOrder.splice(index, 1);
          accessOrder.push(key);
        }
        return entry.value;
      }
    }
    
    // Calculate the value
    const result = fn(...args);
    
    // Store in cache
    cache.set(key, {
      value: result,
      expires: ttl ? now + ttl : null,
      lastAccessed: now
    });
    
    // Add to access order
    accessOrder.push(key);
    
    // Evict oldest entries if we exceed max size
    if (cache.size > maxSize) {
      const oldestKey = accessOrder.shift();
      if (oldestKey) cache.delete(oldestKey);
    }
    
    return result;
  }) as any; // Type as 'any' temporarily to add methods
  
  // Add cache control methods
  memoized.clearCache = () => {
    cache.clear();
    accessOrder.length = 0;
  };
  
  memoized.getStats = () => ({
    size: cache.size,
    keys: Array.from(cache.keys())
  });
  
  memoized.removeEntry = (key: string) => {
    const deleted = cache.delete(key);
    const index = accessOrder.indexOf(key);
    if (index !== -1) accessOrder.splice(index, 1);
    return deleted;
  };
  
  return memoized as MemoizedFunction<T>;
}

/**
 * Creates a stable key for objects regardless of property order
 */
export function createStableKey(obj: Record<string, any>): string {
  const sortedKeys = Object.keys(obj).sort();
  return sortedKeys.map(key => `${key}:${JSON.stringify(obj[key])}`).join('|');
}
