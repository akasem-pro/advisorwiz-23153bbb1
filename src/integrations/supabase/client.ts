
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export const SUPABASE_URL = "https://gkymvotqrdecjjymmmef.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdreW12b3RxcmRlY2pqeW1tbWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NzA5NTIsImV4cCI6MjA1NzA0Njk1Mn0.j7Os6vxWOT35pC3rLiDuMuDty7VJTWvw7khbZpPLijY";

// Create a Supabase client with proper configuration
export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: localStorage
    },
    global: {
      headers: {
        'x-application-name': 'advisorwiz',
        'Cache-Control': 'no-cache'
      }
    },
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    }
  }
);

// Simplified connection checker that defaults to "online" for better user experience
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    // Check if browser is online first
    if (!navigator.onLine) {
      return false;
    }
    
    // Default to true to avoid blocking authentication
    return true;
  } catch (error) {
    console.error("Supabase connection check failed:", error);
    // Default to true to prevent blocking auth functionality
    return true;
  }
};
