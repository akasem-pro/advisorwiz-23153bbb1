
import { useState, useEffect } from 'react';
import { useSupabase } from './useSupabase';

export interface TooltipContent {
  id: number;
  section_key: string;
  title: string;
  content: string;
  created_at?: string;
}

interface UseTooltipContentProps {
  sectionKey?: string;
  fetchImmediately?: boolean;
}

interface UseTooltipContentResult {
  tooltipContent: TooltipContent | null;
  allTooltips: TooltipContent[];
  isLoading: boolean;
  error: string | null;
  fetchTooltip: (key: string) => Promise<void>;
  fetchAllTooltips: () => Promise<void>;
}

/**
 * Hook to fetch and manage tooltip content
 */
export const useTooltipContent = ({
  sectionKey,
  fetchImmediately = true
}: UseTooltipContentProps = {}): UseTooltipContentResult => {
  const [tooltipContent, setTooltipContent] = useState<TooltipContent | null>(null);
  const [allTooltips, setAllTooltips] = useState<TooltipContent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { getTooltipByKey, getTooltips, isLoading } = useSupabase();
  
  // Fetch specific tooltip if sectionKey is provided
  const fetchTooltip = async (key: string) => {
    try {
      const { data, error } = await getTooltipByKey(key);
      
      if (error) {
        setError(error);
        return;
      }
      
      setTooltipContent(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tooltip content');
      console.error('Error fetching tooltip:', err);
    }
  };
  
  // Fetch all tooltips
  const fetchAllTooltips = async () => {
    try {
      const { data, error } = await getTooltips();
      
      if (error) {
        setError(error);
        return;
      }
      
      setAllTooltips(data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tooltips');
      console.error('Error fetching tooltips:', err);
    }
  };
  
  // Fetch tooltip if sectionKey is provided and fetchImmediately is true
  useEffect(() => {
    if (fetchImmediately && sectionKey) {
      fetchTooltip(sectionKey);
    }
  }, [sectionKey, fetchImmediately]);
  
  return {
    tooltipContent,
    allTooltips,
    isLoading,
    error,
    fetchTooltip,
    fetchAllTooltips
  };
};
