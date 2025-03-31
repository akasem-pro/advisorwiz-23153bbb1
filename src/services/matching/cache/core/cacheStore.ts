
/**
 * Core cache storage implementation
 * Provides the fundamental caching mechanism with LRU-like behavior
 */

import { CACHE_EXPIRATION_MS } from '../../constants/matchingWeights';

// Core cache entry type
export interface CacheEntry {
  result: { score: number; matchExplanation: string[] };
  timestamp: number;
  hitCount: number;
  lastAccessed: number;
}

// Use Map for better performance with LRU-like approach
const scoreCache = new Map<string, CacheEntry>();

// Performance metrics
let cacheHits = 0;
let cacheMisses = 0;
let lastCacheCleanup = Date.now();

// Cache basic operations
export const getCacheEntry = (key: string): CacheEntry | undefined => {
  return scoreCache.get(key);
};

export const setCacheEntry = (key: string, entry: CacheEntry): void => {
  scoreCache.set(key, entry);
};

export const deleteCacheEntry = (key: string): boolean => {
  return scoreCache.delete(key);
};

export const clearCache = (): void => {
  scoreCache.clear();
  cacheHits = 0;
  cacheMisses = 0;
};

export const getCacheSize = (): number => {
  return scoreCache.size;
};

export const getAllEntries = (): [string, CacheEntry][] => {
  return Array.from(scoreCache.entries());
};

export const incrementCacheHits = (): void => {
  cacheHits++;
};

export const incrementCacheMisses = (): void => {
  cacheMisses++;
};

export const getCacheHits = (): number => {
  return cacheHits;
};

export const getCacheMisses = (): number => {
  return cacheMisses;
};

export const updateLastCleanupTime = (): void => {
  lastCacheCleanup = Date.now();
};

export const getLastCleanupTime = (): number => {
  return lastCacheCleanup;
};

// Check if an entry is expired
export const isEntryExpired = (entry: CacheEntry): boolean => {
  return Date.now() - entry.timestamp > CACHE_EXPIRATION_MS;
};
