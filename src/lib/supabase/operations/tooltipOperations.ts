
import { supabase } from '../../../integrations/supabase/client';
import { DataResult, trackPerformance } from '../types/dataTypes';
import { TooltipContent } from '../../../hooks/useTooltipContent';

/**
 * Retrieve all tooltip content
 */
export const getTooltips = trackPerformance(
  async (useCache = true): Promise<DataResult<TooltipContent[]>> => {
    try {
      // Check cache if enabled
      if (useCache) {
        const cachedData = localStorage.getItem('cache_tooltips');
        if (cachedData) {
          try {
            const parsed = JSON.parse(cachedData);
            const expiry = parsed.expiry || 0;
            
            // Return cached data if not expired
            if (expiry > Date.now()) {
              return {
                data: parsed.data.map((item: any) => ({
                  ...item,
                  content: item.description // Map description to content for compatibility
                })),
                error: null,
                isFromCache: true
              };
            }
          } catch (e) {
            console.warn('Failed to parse cached tooltips');
          }
        }
      }
      
      // Fetch from API
      const { data, error } = await supabase
        .from('tooltip_content')
        .select('*');
      
      if (error) {
        return { data: null, error: error.message, isFromCache: false };
      }
      
      // Map the database fields to our interface
      const mappedData: TooltipContent[] = data.map(item => ({
        ...item,
        content: item.description // Use description as content for compatibility
      }));
      
      // Cache results
      if (useCache && mappedData) {
        const cacheData = {
          data: mappedData,
          expiry: Date.now() + (1000 * 60 * 60) // Cache for 1 hour
        };
        localStorage.setItem('cache_tooltips', JSON.stringify(cacheData));
      }
      
      return { data: mappedData, error: null, isFromCache: false };
    } catch (error: any) {
      return {
        data: null,
        error: error.message || 'Failed to fetch tooltips',
        isFromCache: false
      };
    }
  },
  'getTooltips'
);

/**
 * Retrieve tooltip content by section key
 */
export const getTooltipByKey = trackPerformance(
  async (sectionKey: string, useCache = true): Promise<DataResult<TooltipContent>> => {
    try {
      // Check cache if enabled
      if (useCache) {
        const cachedData = localStorage.getItem(`cache_tooltip_${sectionKey}`);
        if (cachedData) {
          try {
            const parsed = JSON.parse(cachedData);
            const expiry = parsed.expiry || 0;
            
            // Return cached data if not expired
            if (expiry > Date.now()) {
              return {
                data: {
                  ...parsed.data,
                  content: parsed.data.description // Map description to content for compatibility
                },
                error: null,
                isFromCache: true
              };
            }
          } catch (e) {
            console.warn(`Failed to parse cached tooltip for ${sectionKey}`);
          }
        }
      }
      
      // Fetch from API
      const { data, error } = await supabase
        .from('tooltip_content')
        .select('*')
        .eq('section_key', sectionKey)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return { data: null, error: null, isFromCache: false };
        }
        return { data: null, error: error.message, isFromCache: false };
      }
      
      // Map the database fields to our interface
      const mappedData: TooltipContent = {
        ...data,
        content: data.description // Use description as content for compatibility
      };
      
      // Cache results
      if (useCache && mappedData) {
        const cacheData = {
          data: mappedData,
          expiry: Date.now() + (1000 * 60 * 60) // Cache for 1 hour
        };
        localStorage.setItem(`cache_tooltip_${sectionKey}`, JSON.stringify(cacheData));
      }
      
      return { data: mappedData, error: null, isFromCache: false };
    } catch (error: any) {
      return {
        data: null,
        error: error.message || `Failed to fetch tooltip for ${sectionKey}`,
        isFromCache: false
      };
    }
  },
  'getTooltipByKey'
);
