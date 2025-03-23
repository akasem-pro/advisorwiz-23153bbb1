
import { supabase } from '../../../integrations/supabase/client';
import { handleSupabaseError } from '../utils/errorHandling';
import { DataResult } from '../types/dataTypes';
import { saveToCache, getFromCache, CACHE_KEYS } from '../utils/cacheUtils';
import { trackPerformance } from '../types/dataTypes';

// Advisor profile operations
export const getAdvisorProfiles = async (limit: number = 10, filters: any = {}, useCache: boolean = true): Promise<DataResult<any[]>> => {
  const startTime = performance.now();
  const functionName = 'getAdvisorProfiles';
  const cacheKey = `${CACHE_KEYS.ADVISORS}_${limit}_${JSON.stringify(filters)}`;
  
  try {
    // Try cache first if requested
    if (useCache && navigator.onLine) {
      const cachedData = getFromCache<any[]>(cacheKey);
      if (cachedData) {
        return { data: cachedData, error: null, isFromCache: true };
      }
    }
    
    // Build query
    let query = supabase
      .from('advisor_profiles')
      .select(`
        *,
        profiles!inner(id, first_name, last_name, avatar_url, city, state, country, online_status, last_online)
      `)
      .limit(limit);
    
    // Apply filters
    if (filters.expertise && filters.expertise.length > 0) {
      query = query.contains('expertise', filters.expertise);
    }
    
    if (filters.yearsOfExperience) {
      query = query.gte('years_of_experience', filters.yearsOfExperience);
    }
    
    if (filters.location && filters.location.state) {
      query = query.eq('profiles.state', filters.location.state);
    }
    
    // Execute query
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    // Transform data to match application model
    const transformedData = data.map(advisor => ({
      id: advisor.id,
      name: `${advisor.profiles.first_name} ${advisor.profiles.last_name}`,
      organization: advisor.organization || '',
      isAccredited: advisor.is_accredited || false,
      website: advisor.website || '',
      languages: advisor.languages || [],
      pricing: {
        hourlyRate: advisor.hourly_rate,
        portfolioFee: advisor.portfolio_fee
      },
      assetsUnderManagement: advisor.assets_under_management || 0,
      expertise: advisor.expertise || [],
      yearsOfExperience: advisor.years_of_experience || 0,
      averageRating: advisor.average_rating || 0,
      ratingCount: advisor.rating_count || 0,
      biography: advisor.biography || '',
      certifications: advisor.certifications || [],
      location: {
        city: advisor.profiles.city || '',
        state: advisor.profiles.state || '',
        country: advisor.profiles.country || 'US'
      },
      profilePicture: advisor.profiles.avatar_url,
      onlineStatus: advisor.profiles.online_status || 'offline',
      lastOnline: advisor.profiles.last_online || new Date().toISOString(),
    }));
    
    // Save to cache if successful
    if (transformedData && navigator.onLine) {
      saveToCache(cacheKey, transformedData);
    }
    
    trackPerformance(functionName, performance.now() - startTime, transformedData.length);
    return { data: transformedData, error: null, isFromCache: false };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to fetch advisor profiles');
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
