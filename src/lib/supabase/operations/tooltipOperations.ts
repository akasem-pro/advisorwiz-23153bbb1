
import { supabase } from '../../../integrations/supabase/client';
import { DataResult } from '../types/dataTypes';
import { TooltipContent } from '../../../hooks/useTooltipContent';

/**
 * Retrieve all tooltip content
 */
export const getTooltips = async (useCache = true): Promise<DataResult<TooltipContent[]>> => {
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
                id: item.id.toString(),
                content: item.description || '' // Map description to content for compatibility
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
      id: item.id.toString(), // Ensure ID is a string to match our interface
      section_key: item.section_key,
      title: item.title,
      content: item.description || '', // Use description as content for compatibility
      description: item.description || '',
      created_at: item.created_at
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
};

/**
 * Retrieve tooltip content by section key
 */
export const getTooltipByKey = async (sectionKey: string, useCache = true): Promise<DataResult<TooltipContent>> => {
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
                id: parsed.data.id.toString(), // Ensure ID is a string
                content: parsed.data.description || '', // Map description to content for compatibility
                description: parsed.data.description || ''
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
      id: data.id.toString(), // Ensure ID is a string
      section_key: data.section_key,
      title: data.title,
      content: data.description || '', // Use description as content for compatibility
      description: data.description || '',
      created_at: data.created_at
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
};
