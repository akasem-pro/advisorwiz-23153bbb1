
import { DataResult } from '../lib/supabase/types/dataTypes';
import { TooltipContent } from '../hooks/useTooltipContent';
import { getTooltips, getTooltipByKey } from '../lib/supabase/operations/tooltipOperations';

/**
 * Interface for tooltip service result
 */
export interface TooltipServiceResult<T> {
  data: T;
  error: string | null;
  isLoading: boolean;
}

/**
 * Get all tooltips
 */
export const getAllTooltips = async (
  useCache = true
): Promise<TooltipServiceResult<TooltipContent[]>> => {
  try {
    const result: DataResult<TooltipContent[]> = await getTooltips(useCache);
    
    if (result.error) {
      return {
        data: [],
        error: result.error,
        isLoading: false
      };
    }
    
    return {
      data: result.data || [],
      error: null,
      isLoading: false
    };
  } catch (error: any) {
    return {
      data: [],
      error: error.message || 'Failed to get tooltips',
      isLoading: false
    };
  }
};

/**
 * Get tooltip by section key
 */
export const getTooltipContent = async (
  sectionKey: string,
  useCache = true
): Promise<TooltipServiceResult<TooltipContent | null>> => {
  try {
    const result: DataResult<TooltipContent> = await getTooltipByKey(sectionKey, useCache);
    
    if (result.error) {
      return {
        data: null,
        error: result.error,
        isLoading: false
      };
    }
    
    return {
      data: result.data,
      error: null,
      isLoading: false
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message || `Failed to get tooltip for ${sectionKey}`,
      isLoading: false
    };
  }
};

/**
 * Check if a tooltip exists for a given section key
 */
export const checkTooltipExists = async (
  sectionKey: string,
  useCache = true
): Promise<boolean> => {
  try {
    const result = await getTooltipContent(sectionKey, useCache);
    return !!result.data;
  } catch {
    return false;
  }
};
