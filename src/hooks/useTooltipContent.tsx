
import { useState, useEffect } from 'react';
import { useSupabase } from './useSupabase';

export interface TooltipContent {
  id: string;
  section_key: string;
  title: string;
  content: string;
  description: string;
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
      
      // Map the database fields to our interface
      if (data) {
        const mappedData: TooltipContent = {
          id: data.id.toString(),
          section_key: data.section_key,
          title: data.title,
          content: data.description || '',
          description: data.description || '',
          created_at: data.created_at
        };
        setTooltipContent(mappedData);
      } else {
        setTooltipContent(null);
      }
      
      setError(null);
    } catch (err: any) {
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
      
      // Map the database fields to our interface
      if (data && Array.isArray(data)) {
        const mappedData: TooltipContent[] = data.map(item => ({
          id: item.id.toString(),
          section_key: item.section_key,
          title: item.title,
          content: item.description || '',
          description: item.description || '',
          created_at: item.created_at
        }));
        setAllTooltips(mappedData);
      } else {
        setAllTooltips([]);
      }
      
      setError(null);
    } catch (err: any) {
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
