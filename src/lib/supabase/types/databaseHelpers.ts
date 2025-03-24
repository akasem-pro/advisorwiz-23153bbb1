
import { PostgrestError, PostgrestSingleResponse } from '@supabase/supabase-js';
import { Database } from '../../../integrations/supabase/types';

// Type for table rows
export type Tables = Database['public']['Tables'];

// Helper type to get Row type
export type TableRow<T extends keyof Tables> = Tables[T]['Row'];

// Helper type to get Insert type
export type TableInsert<T extends keyof Tables> = Tables[T]['Insert'];

// Helper type to get Update type
export type TableUpdate<T extends keyof Tables> = Tables[T]['Update'];

// Helper function to handle Supabase response and extract data safely
export function extractData<T>(response: PostgrestSingleResponse<T>): T | null {
  if (response.error) {
    console.error('Supabase query error:', response.error.message);
    return null;
  }
  return response.data;
}

// Helper to safely access properties from potentially undefined objects
export function safeGet<T, K extends keyof T>(obj: T | null | undefined, key: K): T[K] | undefined {
  return obj ? obj[key] : undefined;
}

// Type guard to check if a response has an error
export function hasError(response: { error: PostgrestError | null }): boolean {
  return !!response.error;
}

// Helper function to process an array response safely
export function processArrayResponse<T>(
  response: PostgrestSingleResponse<T[]>
): T[] {
  if (response.error) {
    console.error('Supabase query error:', response.error.message);
    return [];
  }
  return response.data || [];
}

// Helper to ensure we have valid data before accessing properties
export function ensureData<T>(data: T | null): asserts data is T {
  if (!data) {
    throw new Error('Data is null or undefined');
  }
}
