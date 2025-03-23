
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

export type TooltipContent = {
  id: string;
  section_key: string;
  title: string;
  description: string;
};

export const useTooltipContent = (sectionKey?: string) => {
  const [tooltipContent, setTooltipContent] = useState<TooltipContent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTooltipContent = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        let query = supabase.from('tooltip_content').select('*');
        
        // If a specific section key is provided, filter for that key
        if (sectionKey) {
          query = query.eq('section_key', sectionKey);
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        setTooltipContent(data as TooltipContent[]);
      } catch (err: any) {
        console.error('Error fetching tooltip content:', err);
        setError(err.message || 'Failed to load tooltip content');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTooltipContent();
  }, [sectionKey]);
  
  // Get a specific tooltip by section_key
  const getTooltipByKey = (key: string): TooltipContent | undefined => {
    return tooltipContent.find(tooltip => tooltip.section_key === key);
  };
  
  return {
    tooltipContent,
    isLoading,
    error,
    getTooltipByKey
  };
};
