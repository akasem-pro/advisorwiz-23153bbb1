
import { supabase } from '../../../integrations/supabase/client';
import { handleSupabaseError } from '../utils/errorHandling';
import { DataResult } from '../types/dataTypes';
import { saveToCache, getFromCache, CACHE_KEYS } from '../utils/cacheUtils';
import { trackPerformance } from '../types/dataTypes';

// Compatibility scores operations
export const getCompatibilityScores = async (
  userType: 'consumer' | 'advisor', 
  userId: string,
  limit: number = 10,
  useCache: boolean = true
): Promise<DataResult<any[]>> => {
  const startTime = performance.now();
  const functionName = 'getCompatibilityScores';
  const cacheKey = `${CACHE_KEYS.MATCHES}_${userType}_${userId}_${limit}`;
  
  try {
    // Try cache first if requested
    if (useCache && navigator.onLine) {
      const cachedData = getFromCache<any[]>(cacheKey);
      if (cachedData) {
        return { data: cachedData, error: null, isFromCache: true };
      }
    }
    
    // Build query based on user type
    let query;
    
    if (userType === 'consumer') {
      query = supabase
        .from('compatibility_scores')
        .select(`
          score, match_explanations,
          advisor:advisor_id(
            id, 
            profiles!inner(first_name, last_name, avatar_url, city, state, country)
          )
        `)
        .eq('consumer_id', userId)
        .order('score', { ascending: false })
        .limit(limit);
    } else {
      query = supabase
        .from('compatibility_scores')
        .select(`
          score, match_explanations,
          consumer:consumer_id(
            id, 
            profiles!inner(first_name, last_name, avatar_url, city, state, country)
          )
        `)
        .eq('advisor_id', userId)
        .order('score', { ascending: false })
        .limit(limit);
    }
    
    // Execute query
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    // Transform data
    const transformedData = data.map(item => {
      const targetProfile = userType === 'consumer' ? item.advisor : item.consumer;
      const profileInfo = targetProfile.profiles;
      
      return {
        id: targetProfile.id,
        score: item.score,
        explanations: item.match_explanations || [],
        name: `${profileInfo.first_name} ${profileInfo.last_name}`,
        profilePicture: profileInfo.avatar_url,
        location: {
          city: profileInfo.city || '',
          state: profileInfo.state || '',
          country: profileInfo.country || 'US'
        }
      };
    });
    
    // Save to cache if successful
    if (transformedData && navigator.onLine) {
      saveToCache(cacheKey, transformedData);
    }
    
    trackPerformance(functionName, performance.now() - startTime, transformedData.length);
    return { data: transformedData, error: null, isFromCache: false };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to fetch compatibility scores');
    trackPerformance(functionName, performance.now() - startTime, 0);
    
    // Get from cache as fallback if we're offline
    if (!navigator.onLine) {
      const cachedData = getFromCache<any[]>(cacheKey);
      if (cachedData) {
        return { data: cachedData, error: 'Using cached data (offline)', isFromCache: true };
      }
    }
    
    // Return empty array instead of empty object to fix TS error
    return { data: [] as any[], error: errorMessage, isFromCache: false };
  }
};
