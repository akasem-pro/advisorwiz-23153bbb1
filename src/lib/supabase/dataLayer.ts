
import { supabase } from '../../integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { trackPerformance } from '../../utils/performance/core';

/**
 * A centralized data access layer for Supabase operations
 * This provides consistent error handling, logging, and offline support
 */

// Error handling constants
const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  PERMISSION: 'You don\'t have permission to perform this action.',
  NOT_FOUND: 'The requested data could not be found.',
  VALIDATION: 'Invalid data provided.',
  GENERIC: 'An error occurred. Please try again.',
  AUTH: 'Authentication error. Please sign in again.',
};

// Cache constants
const CACHE_KEYS = {
  PROFILES: 'cache_profiles',
  ADVISORS: 'cache_advisors',
  CONSUMERS: 'cache_consumers',
  MATCHES: 'cache_matches',
  APPOINTMENTS: 'cache_appointments',
  CHATS: 'cache_chats',
};

// Cache utility functions
const saveToCache = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

const getFromCache = <T>(key: string, maxAge: number = 5 * 60 * 1000): T | null => {
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

const clearCache = (key?: string): void => {
  if (key) {
    localStorage.removeItem(key);
  } else {
    // Clear all cache keys
    Object.values(CACHE_KEYS).forEach(cacheKey => {
      localStorage.removeItem(cacheKey);
    });
  }
};

// Error handling utility
const handleSupabaseError = (error: any, customMessage?: string): string => {
  console.error('Supabase operation error:', error);
  
  // Determine the type of error
  let errorMessage = customMessage || ERROR_MESSAGES.GENERIC;
  
  if (!navigator.onLine) {
    errorMessage = ERROR_MESSAGES.NETWORK;
  } else if (error?.code === 'PGRST301' || error?.code === '42501') {
    errorMessage = ERROR_MESSAGES.PERMISSION;
  } else if (error?.code === '404' || error?.message?.includes('not found')) {
    errorMessage = ERROR_MESSAGES.NOT_FOUND;
  } else if (error?.code === '23514' || error?.message?.includes('validation')) {
    errorMessage = ERROR_MESSAGES.VALIDATION;
  } else if (error?.message?.includes('auth') || error?.message?.includes('JWT')) {
    errorMessage = ERROR_MESSAGES.AUTH;
  }
  
  return errorMessage;
};

// Data validation utility
const validateData = <T>(data: T, schema: any): { valid: boolean; errors?: string[] } => {
  try {
    if (!schema) return { valid: true };
    
    const result = schema.safeParse(data);
    if (!result.success) {
      return { 
        valid: false, 
        errors: result.error.errors.map((e: any) => `${e.path.join('.')}: ${e.message}`) 
      };
    }
    
    return { valid: true };
  } catch (error) {
    console.error('Validation error:', error);
    return { valid: false, errors: ['Schema validation failed'] };
  }
};

// Specific data functions
interface DataResult<T> {
  data: T | null;
  error: string | null;
  isFromCache: boolean;
}

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
      const existingCache = getFromCache(`${CACHE_KEYS.PROFILES}_${userId}`);
      saveToCache(`${CACHE_KEYS.PROFILES}_${userId}`, { ...existingCache, ...data });
    }
    
    trackPerformance(functionName, performance.now() - startTime, 1);
    return { data, error: null, isFromCache: false };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to update profile');
    trackPerformance(functionName, performance.now() - startTime, 0);
    return { data: null, error: errorMessage, isFromCache: false };
  }
};

// Advisor profile operations
export const getAdvisorProfiles = async (limit: number = 10, filters: any = {}, useCache: boolean = true): Promise<DataResult<any[]>> => {
  const startTime = performance.now();
  const functionName = 'getAdvisorProfiles';
  const cacheKey = `${CACHE_KEYS.ADVISORS}_${limit}_${JSON.stringify(filters)}`;
  
  try {
    // Try cache first if requested
    if (useCache && navigator.onLine) {
      const cachedData = getFromCache(cacheKey);
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
      const cachedData = getFromCache(cacheKey);
      if (cachedData) {
        return { data: cachedData, error: 'Using cached data (offline)', isFromCache: true };
      }
    }
    
    return { data: [], error: errorMessage, isFromCache: false };
  }
};

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
      const cachedData = getFromCache(cacheKey);
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
      const cachedData = getFromCache(cacheKey);
      if (cachedData) {
        return { data: cachedData, error: 'Using cached data (offline)', isFromCache: true };
      }
    }
    
    return { data: [], error: errorMessage, isFromCache: false };
  }
};

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
    
    return { data: [], error: errorMessage, isFromCache: false };
  }
};

// Chat messages operations
export const getChatMessages = async (userId1: string, userId2: string, useCache: boolean = true): Promise<DataResult<any[]>> => {
  const startTime = performance.now();
  const functionName = 'getChatMessages';
  const cacheKey = `${CACHE_KEYS.CHATS}_${[userId1, userId2].sort().join('_')}`;
  
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
      .from('chat_messages')
      .select('*')
      .or(`and(sender_id.eq.${userId1},recipient_id.eq.${userId2}),and(sender_id.eq.${userId2},recipient_id.eq.${userId1})`)
      .order('created_at', { ascending: true });
    
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
    const errorMessage = handleSupabaseError(error, 'Failed to fetch chat messages');
    trackPerformance(functionName, performance.now() - startTime, 0);
    
    // Get from cache as fallback if we're offline
    if (!navigator.onLine) {
      const cachedData = getFromCache(cacheKey);
      if (cachedData) {
        return { data: cachedData, error: 'Using cached data (offline)', isFromCache: true };
      }
    }
    
    return { data: [], error: errorMessage, isFromCache: false };
  }
};

// Realtime subscription utilities
export const subscribeToChats = (userId: string, callback: (payload: any) => void) => {
  return supabase
    .channel('chat_messages')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'chat_messages',
      filter: `recipient_id=eq.${userId}`,
    }, callback)
    .subscribe();
};

export const subscribeToAppointments = (userId: string, callback: (payload: any) => void) => {
  return supabase
    .channel('appointments')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'appointments',
      filter: `or(advisor_id.eq.${userId},consumer_id.eq.${userId})`,
    }, callback)
    .subscribe();
};

// Connection status management
export const setupConnectionListener = () => {
  const handleConnectionChange = () => {
    if (navigator.onLine) {
      toast.success('You are back online!');
      // Could trigger sync of offline changes here
    } else {
      toast.warning('You are offline. Some features may be limited.');
    }
  };

  window.addEventListener('online', handleConnectionChange);
  window.addEventListener('offline', handleConnectionChange);

  return () => {
    window.removeEventListener('online', handleConnectionChange);
    window.removeEventListener('offline', handleConnectionChange);
  };
};

// Sync offline changes when reconnecting
export const syncOfflineChanges = async () => {
  if (!navigator.onLine) return false;
  
  // This would sync any queued changes stored during offline mode
  // Implementation depends on specific requirements
  
  return true;
};

// Cache management utilities
export const invalidateCache = (key: string) => {
  clearCache(key);
};

export const invalidateAllCache = () => {
  clearCache();
};

// Auth specific utilities with the same error handling
export const getCurrentSession = async (): Promise<{ session: Session | null; user: User | null; error: string | null }> => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      throw error;
    }
    
    return { 
      session: data.session, 
      user: data.session?.user || null,
      error: null 
    };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to get current session');
    return { session: null, user: null, error: errorMessage };
  }
};

export const signInWithEmail = async (email: string, password: string): Promise<{ session: Session | null; user: User | null; error: string | null }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    
    if (error) {
      throw error;
    }
    
    return { 
      session: data.session, 
      user: data.user,
      error: null 
    };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to sign in');
    return { session: null, user: null, error: errorMessage };
  }
};

export const signUpWithEmail = async (email: string, password: string): Promise<{ session: Session | null; user: User | null; error: string | null }> => {
  try {
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: window.location.origin + '/auth/callback'
      }
    });
    
    if (error) {
      throw error;
    }
    
    return { 
      session: data.session, 
      user: data.user,
      error: null 
    };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to sign up');
    return { session: null, user: null, error: errorMessage };
  }
};

export const signOut = async (): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
    
    // Clear all cached data on sign out
    invalidateAllCache();
    
    return { error: null };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to sign out');
    return { error: errorMessage };
  }
};
