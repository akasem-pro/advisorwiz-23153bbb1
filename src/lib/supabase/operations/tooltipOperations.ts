
import { supabase } from '../../../integrations/supabase/client';
import { handleSupabaseError } from '../utils/errorHandling';
import { DataResult } from '../types/dataTypes';
import { saveToCache, getFromCache, CACHE_KEYS } from '../utils/cacheUtils';
import { trackPerformance } from '../types/dataTypes';
import { TooltipContent } from '../../../hooks/useTooltipContent';

/**
 * Fetch all tooltips from the database
 */
export const getTooltips = async (useCache: boolean = true): Promise<DataResult<TooltipContent[]>> => {
  const startTime = performance.now();
  const functionName = 'getTooltips';
  
  try {
    // Try cache first if requested and online
    if (useCache && navigator.onLine) {
      const cachedData = getFromCache<TooltipContent[]>(CACHE_KEYS.TOOLTIPS);
      if (cachedData) {
        trackPerformance(functionName, performance.now() - startTime, 1);
        return { data: cachedData, error: null, isFromCache: true };
      }
    }
    
    // Fetch from Supabase
    const { data, error } = await supabase
      .from('tooltip_content')
      .select('*');
    
    if (error) {
      throw error;
    }
    
    // Save to cache if successful
    if (data && navigator.onLine) {
      saveToCache(CACHE_KEYS.TOOLTIPS, data);
    }
    
    trackPerformance(functionName, performance.now() - startTime, 1);
    return { data: data as TooltipContent[], error: null, isFromCache: false };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to fetch tooltips');
    trackPerformance(functionName, performance.now() - startTime, 0);
    
    // Get from cache as fallback if we're offline
    if (!navigator.onLine) {
      const cachedData = getFromCache<TooltipContent[]>(CACHE_KEYS.TOOLTIPS);
      if (cachedData) {
        return { data: cachedData, error: 'Using cached data (offline)', isFromCache: true };
      }
    }
    
    return { data: null, error: errorMessage, isFromCache: false };
  }
};

/**
 * Fetch a specific tooltip by section key
 */
export const getTooltipByKey = async (sectionKey: string, useCache: boolean = true): Promise<DataResult<TooltipContent>> => {
  const startTime = performance.now();
  const functionName = 'getTooltipByKey';
  
  try {
    // Try cache first if requested and online
    if (useCache && navigator.onLine) {
      const cachedData = getFromCache<TooltipContent[]>(CACHE_KEYS.TOOLTIPS);
      if (cachedData) {
        const tooltip = cachedData.find(t => t.section_key === sectionKey);
        if (tooltip) {
          trackPerformance(functionName, performance.now() - startTime, 1);
          return { data: tooltip, error: null, isFromCache: true };
        }
      }
    }
    
    // Fetch from Supabase
    const { data, error } = await supabase
      .from('tooltip_content')
      .select('*')
      .eq('section_key', sectionKey)
      .maybeSingle();
    
    if (error) {
      throw error;
    }
    
    trackPerformance(functionName, performance.now() - startTime, 1);
    return { data: data as TooltipContent, error: null, isFromCache: false };
  } catch (error) {
    const errorMessage = handleSupabaseError(error, 'Failed to fetch tooltip');
    trackPerformance(functionName, performance.now() - startTime, 0);
    return { data: null, error: errorMessage, isFromCache: false };
  }
};
