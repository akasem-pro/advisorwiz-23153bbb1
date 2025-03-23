
import { supabase } from '../../../integrations/supabase/client';
import { DataResult } from '../core/types';
import { handleSupabaseError } from '../core/errorHandling';
import { saveToCache, getFromCache } from '../core/cacheUtils';
import { CACHE_KEYS } from '../core/types';
import { trackPerformance } from '../../../utils/performance/core';

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
    
    return { data: [] as any[], error: errorMessage, isFromCache: false };
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
