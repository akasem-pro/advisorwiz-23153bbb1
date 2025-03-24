
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { Database } from '../../../integrations/supabase/types';

// Type for table keys
export type TableName = keyof Database['public']['Tables'];

// Generic type for table rows
export type TableRow<T extends TableName> = Database['public']['Tables'][T]['Row'];

// Generic type for table inserts
export type TableInsert<T extends TableName> = Database['public']['Tables'][T]['Insert'];

// Generic type for table updates
export type TableUpdate<T extends TableName> = Database['public']['Tables'][T]['Update'];

// Function to extract data from Supabase responses
export function extractData<T>(response: PostgrestSingleResponse<T>): T | null {
  if (response.error) {
    console.error('Error in database response:', response.error);
    return null;
  }
  return response.data;
}

// Process array responses with proper typing
export function processArrayResponse<T>(
  response: PostgrestSingleResponse<T[]>
): T[] {
  if (response.error) {
    console.error('Error in database array response:', response.error);
    return [];
  }
  return response.data || [];
}

// Helper to convert database date strings to Date objects
export function dbDateToDate(dateString: string | null): Date | null {
  if (!dateString) return null;
  return new Date(dateString);
}

// Helper to format database values for display
export function formatDatabaseValue(value: any, type: 'date' | 'currency' | 'percentage' | 'number' | 'text' = 'text'): string {
  if (value === null || value === undefined) return '';
  
  switch (type) {
    case 'date':
      return new Date(value).toLocaleDateString();
    case 'currency':
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value));
    case 'percentage':
      return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1 }).format(Number(value) / 100);
    case 'number':
      return new Intl.NumberFormat('en-US').format(Number(value));
    case 'text':
    default:
      return String(value);
  }
}
