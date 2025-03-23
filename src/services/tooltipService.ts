
import { supabase } from '../integrations/supabase/client';
import { TooltipContent } from '../hooks/useTooltipContent';

export type CreateTooltipParams = {
  section_key: string;
  title: string;
  description: string;
};

export type UpdateTooltipParams = {
  id: string;
  title?: string;
  description?: string;
};

/**
 * Service for managing tooltip content in Supabase
 */
export const tooltipService = {
  /**
   * Fetch all tooltip content
   */
  async getAllTooltips(): Promise<TooltipContent[]> {
    const { data, error } = await supabase
      .from('tooltip_content')
      .select('*');
    
    if (error) {
      console.error('Error fetching tooltips:', error);
      throw new Error('Failed to fetch tooltip content');
    }
    
    return data as TooltipContent[];
  },
  
  /**
   * Fetch a specific tooltip by section key
   */
  async getTooltipByKey(sectionKey: string): Promise<TooltipContent | null> {
    const { data, error } = await supabase
      .from('tooltip_content')
      .select('*')
      .eq('section_key', sectionKey)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Not found
      }
      console.error('Error fetching tooltip:', error);
      throw new Error('Failed to fetch tooltip');
    }
    
    return data as TooltipContent;
  },
  
  /**
   * Create a new tooltip
   */
  async createTooltip(params: CreateTooltipParams): Promise<TooltipContent> {
    const { data, error } = await supabase
      .from('tooltip_content')
      .insert([params])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating tooltip:', error);
      throw new Error('Failed to create tooltip');
    }
    
    return data as TooltipContent;
  },
  
  /**
   * Update an existing tooltip
   */
  async updateTooltip(params: UpdateTooltipParams): Promise<TooltipContent> {
    const { id, ...updateData } = params;
    
    const { data, error } = await supabase
      .from('tooltip_content')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating tooltip:', error);
      throw new Error('Failed to update tooltip');
    }
    
    return data as TooltipContent;
  },
  
  /**
   * Delete a tooltip
   */
  async deleteTooltip(id: string): Promise<void> {
    const { error } = await supabase
      .from('tooltip_content')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting tooltip:', error);
      throw new Error('Failed to delete tooltip');
    }
  }
};
