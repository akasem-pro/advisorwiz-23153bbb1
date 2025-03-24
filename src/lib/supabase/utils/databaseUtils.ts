
import { supabase } from '../../../integrations/supabase/client';
import { TableInsert, TableRow, TableUpdate } from '../types/databaseHelpers';
import { toast } from 'sonner';

/**
 * Generic function to insert data into a table with proper typing
 */
export async function insertData<T extends keyof Database['public']['Tables']>(
  table: T,
  data: TableInsert<T>,
  options?: { toastSuccess?: boolean; toastError?: boolean; }
) {
  try {
    const response = await supabase
      .from(table)
      .insert(data);
    
    if (response.error) {
      console.error(`Error inserting into ${table}:`, response.error);
      if (options?.toastError !== false) {
        toast.error(`Failed to save data: ${response.error.message}`);
      }
      return { success: false, error: response.error };
    }
    
    if (options?.toastSuccess) {
      toast.success('Data saved successfully');
    }
    
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`Error in insertData for ${table}:`, error);
    if (options?.toastError !== false) {
      toast.error('An unexpected error occurred');
    }
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error('Unknown error') 
    };
  }
}

/**
 * Generic function to update data in a table with proper typing
 */
export async function updateData<T extends keyof Database['public']['Tables']>(
  table: T,
  data: TableUpdate<T>,
  match: { column: string; value: any },
  options?: { toastSuccess?: boolean; toastError?: boolean; }
) {
  try {
    const response = await supabase
      .from(table)
      .update(data)
      .eq(match.column, match.value);
    
    if (response.error) {
      console.error(`Error updating ${table}:`, response.error);
      if (options?.toastError !== false) {
        toast.error(`Failed to update data: ${response.error.message}`);
      }
      return { success: false, error: response.error };
    }
    
    if (options?.toastSuccess) {
      toast.success('Data updated successfully');
    }
    
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`Error in updateData for ${table}:`, error);
    if (options?.toastError !== false) {
      toast.error('An unexpected error occurred');
    }
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error('Unknown error') 
    };
  }
}

/**
 * Generic function to fetch data from a table with proper typing
 */
export async function fetchData<T extends keyof Database['public']['Tables']>(
  table: T,
  options?: {
    select?: string;
    match?: { column: string; value: any };
    matches?: Array<{ column: string; value: any }>;
    order?: { column: string; ascending?: boolean };
    limit?: number;
    single?: boolean;
  }
) {
  try {
    let query = supabase
      .from(table)
      .select(options?.select || '*');
    
    // Apply filters
    if (options?.match) {
      query = query.eq(options.match.column, options.match.value);
    }
    
    if (options?.matches) {
      for (const match of options.matches) {
        query = query.eq(match.column, match.value);
      }
    }
    
    // Apply ordering
    if (options?.order) {
      query = query.order(options.order.column, { 
        ascending: options.order.ascending ?? true 
      });
    }
    
    // Apply limit
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    
    // Execute as single or multiple
    const response = options?.single 
      ? await query.single() 
      : await query;
    
    if (response.error) {
      console.error(`Error fetching from ${table}:`, response.error);
      return { success: false, error: response.error, data: null };
    }
    
    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error(`Error in fetchData for ${table}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error('Unknown error'),
      data: null
    };
  }
}

// Import type for TypeScript context
import { Database } from '../../../integrations/supabase/types';
