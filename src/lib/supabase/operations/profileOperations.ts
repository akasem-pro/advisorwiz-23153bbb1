
import { supabase } from '../../../integrations/supabase/client';
import { handleSupabaseError } from '../utils/errorHandling';
import { DataResult } from '../types/dataTypes';
import { validateData } from '../utils/errorHandling';
import { saveToCache, getFromCache, CACHE_KEYS } from '../utils/cacheUtils';
import { trackPerformance } from '../types/dataTypes';

// Profile operations
export const getProfile = async (userId: string, useCache: boolean = true): Promise<DataResult<any>> => {
  const startTime = performance.now();
  const functionName = 'getProfile';
  
  try {
    // Try cache first if requested and online
    if (useCache && navigator.onLine) {
      const cachedData = getFromCache(`${CACHE_KEYS.PROFILES}_${userId}`);
      if (cachedData) {
        trackPerformance(functionName, performance.now() - startTime, 1);
        return { data: cachedData, error: null, isFromCache: true };
      }
    }
    
    // Fetch from Supabase
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) {
      throw error;
    }
    
    // Save to cache if successful
    if (data && navigator.onLine) {
      saveToCache(`${CACHE_KEYS.PROFILES}_${userId}`, data);
    }
    
    trackPerformance(functionName, performance.now() - startTime, 1);
    return { data, error: null, isFromCache: false };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to fetch profile');
    trackPerformance(functionName, performance.now() - startTime, 0);
    
    // Get from cache as fallback if we're offline
    if (!navigator.onLine) {
      const cachedData = getFromCache(`${CACHE_KEYS.PROFILES}_${userId}`);
      if (cachedData) {
        return { data: cachedData, error: 'Using cached data (offline)', isFromCache: true };
      }
    }
    
    return { data: null, error: errorMessage, isFromCache: false };
  }
};

export const updateProfile = async (userId: string, profileData: any, schema?: any): Promise<DataResult<any>> => {
  const startTime = performance.now();
  const functionName = 'updateProfile';
  
  try {
    // Validate data if schema provided
    if (schema) {
      const validation = validateData(profileData, schema);
      if (!validation.valid) {
        const errorMsg = validation.errors?.join(', ') || 'Invalid profile data';
        return { data: null, error: errorMsg, isFromCache: false };
      }
    }
    
    // Update in Supabase
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    // Update cache
    if (data && navigator.onLine) {
      const existingCache = getFromCache<any>(`${CACHE_KEYS.PROFILES}_${userId}`);
      if (existingCache) {
        // Ensure both objects exist before spreading
        const mergedData = { ...(existingCache || {}), ...(data || {}) };
        saveToCache(`${CACHE_KEYS.PROFILES}_${userId}`, mergedData);
      } else {
        saveToCache(`${CACHE_KEYS.PROFILES}_${userId}`, data);
      }
    }
    
    trackPerformance(functionName, performance.now() - startTime, 1);
    return { data, error: null, isFromCache: false };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to update profile');
    trackPerformance(functionName, performance.now() - startTime, 0);
    return { data: null, error: errorMessage, isFromCache: false };
  }
};
