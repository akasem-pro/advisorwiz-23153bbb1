
import { supabase } from '../../../integrations/supabase/client';
import { handleSupabaseError } from '../utils/errorHandling';
import { DataResult } from '../types/dataTypes';
import { saveToCache, getFromCache, CACHE_KEYS } from '../utils/cacheUtils';
import { trackPerformance } from '../types/dataTypes';
import { CompatibilityScore } from '../../../types/compatibilityTypes';

/**
 * Fetches compatibility scores for a given user.
 * @param userType - 'consumer' or 'advisor'
 * @param userId - The ID of the user.
 * @param limit - The maximum number of scores to return.
 * @param useCache - Whether to use cached data if available.
 */
export const getCompatibilityScores = async (
  userType: 'consumer' | 'advisor',
  userId: string,
  limit: number = 10,
  useCache: boolean = true
): Promise<DataResult<CompatibilityScore[]>> => {
  const startTime = performance.now();
  const functionName = 'getCompatibilityScores';

  try {
    // Try cache first if requested and online
    if (useCache && navigator.onLine) {
      const cachedData = getFromCache<CompatibilityScore[]>(CACHE_KEYS.COMPATIBILITY_SCORES);
      if (cachedData) {
        trackPerformance(functionName, performance.now() - startTime, 1);
        return { data: cachedData, error: null, isFromCache: true };
      }
    }

    let query = supabase
      .from('compatibility_scores')
      .select('*');
      
    // Apply filter based on user type
    if (userType === 'consumer') {
      query = query.eq('consumer_id', userId);
    } else {
      query = query.eq('advisor_id', userId);
    }
    
    // Apply order and limit
    query = query.order('score', { ascending: false }).limit(limit);

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    // Save to cache if successful
    if (data && navigator.onLine) {
      saveToCache(CACHE_KEYS.COMPATIBILITY_SCORES, data);
    }

    trackPerformance(functionName, performance.now() - startTime, 1);
    return { data: data as CompatibilityScore[], error: null, isFromCache: false };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to fetch compatibility scores');
    trackPerformance(functionName, performance.now() - startTime, 0);

    // Get from cache as fallback if we're offline
    if (!navigator.onLine) {
      const cachedData = getFromCache<CompatibilityScore[]>(CACHE_KEYS.COMPATIBILITY_SCORES);
      if (cachedData) {
        return { data: cachedData, error: 'Using cached data (offline)', isFromCache: true };
      }
    }

    return { data: null, error: errorMessage, isFromCache: false };
  }
};
