
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export const SUPABASE_URL = "https://gkymvotqrdecjjymmmef.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdreW12b3RxcmRlY2pqeW1tbWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NzA5NTIsImV4cCI6MjA1NzA0Njk1Mn0.j7Os6vxWOT35pC3rLiDuMuDty7VJTWvw7khbZpPLijY";

// Create a Supabase client with reliable timeout and retry settings
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
        'x-application-name': 'advisorwiz'
      },
      fetch: (url, options = {}) => {
        const requestOptions = {
          ...options,
          timeout: 30000, // 30 second timeout
        };
        return fetch(url, requestOptions);
      }
    }
  }
);

// More reliable connection checker that actually tries to make a lightweight request
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    // Check if browser is online first
    if (!navigator.onLine) {
      return false;
    }
    
    // Make a lightweight request to check actual connectivity
    // Use the health check endpoint (doesn't require auth)
    const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      method: 'HEAD',
      headers: {
        'apikey': SUPABASE_PUBLISHABLE_KEY,
      },
      // Short timeout for quick failure
      signal: AbortSignal.timeout(5000)
    });
    
    return response.ok;
  } catch (error) {
    console.error("Supabase connection check failed:", error);
    return false;
  }
};
