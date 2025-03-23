
import { supabase } from '../../../integrations/supabase/client';
import { DataResult } from '../core/types';
import { handleSupabaseError } from '../core/errorHandling';
import { saveToCache, getFromCache } from '../core/cacheUtils';
import { CACHE_KEYS } from '../core/types';
import { trackPerformance } from '../../../utils/performance/core';

// Appointments operations
export const getAppointments = async (userId: string, useCache: boolean = true): Promise<DataResult<any[]>> => {
  const startTime = performance.now();
  const functionName = 'getAppointments';
  const cacheKey = `${CACHE_KEYS.APPOINTMENTS}_${userId}`;
  
  try {
    // Try cache first if requested
    if (useCache && navigator.onLine) {
      const cachedData = getFromCache(cacheKey);
      if (cachedData) {
        return { data: cachedData, error: null, isFromCache: true };
      }
    }
    
    // Fetch from Supabase
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        advisor:advisor_id(
          profiles!inner(first_name, last_name, avatar_url)
        ),
        consumer:consumer_id(
          profiles!inner(first_name, last_name, avatar_url)
        )
      `)
      .or(`advisor_id.eq.${userId},consumer_id.eq.${userId}`)
      .order('scheduled_start', { ascending: true });
    
    if (error) {
      throw error;
    }
    
    // Save to cache if successful
    if (data && navigator.onLine) {
      saveToCache(cacheKey, data);
    }
    
    trackPerformance(functionName, performance.now() - startTime, data.length);
    return { data, error: null, isFromCache: false };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to fetch appointments');
    trackPerformance(functionName, performance.now() - startTime, 0);
    
    // Get from cache as fallback if we're offline
    if (!navigator.onLine) {
      const cachedData = getFromCache(cacheKey);
      if (cachedData) {
        return { data: cachedData, error: 'Using cached data (offline)', isFromCache: true };
      }
    }
    
    return { data: [] as any[], error: errorMessage, isFromCache: false };
  }
};
