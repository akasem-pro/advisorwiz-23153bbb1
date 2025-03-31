
// Utilities for managing cache operations

// Function to save data to local storage
export const saveToCache = (key: string, data: any): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

// Function to retrieve data from local storage
export const getFromCache = <T>(key: string): T | null => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData) as T;
  } catch (error) {
    console.error('Error retrieving from cache:', error);
    return null;
  }
};

// Function to remove data from local storage
export const invalidateCache = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error invalidating cache:', error);
  }
};

// Function to clear all cache
export const invalidateAllCache = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error invalidating all cache:', error);
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
