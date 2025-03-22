
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export const SUPABASE_URL = "https://gkymvotqrdecjjymmmef.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdreW12b3RxcmRlY2pqeW1tbWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NzA5NTIsImV4cCI6MjA1NzA0Njk1Mn0.j7Os6vxWOT35pC3rLiDuMuDty7VJTWvw7khbZpPLijY";

// Create the Supabase client with robust configuration
export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: localStorage,
      flowType: 'implicit' // More reliable flow type for browser-based authentication
    },
    global: {
      headers: {
        'x-application-name': 'advisorwiz'
      },
      // Adding fetch retries for better reliability
      fetch: (url, options) => {
        const fetchWithRetry = async (attempt = 1) => {
          try {
            return await fetch(url, { ...options, cache: 'no-store' });
          } catch (error) {
            if (attempt <= 3) {
              // Wait before retrying (exponential backoff)
              await new Promise(r => setTimeout(r, 1000 * attempt));
              return fetchWithRetry(attempt + 1);
            }
            throw error;
          }
        };
        return fetchWithRetry();
      }
    }
  }
);

// More reliable connection check function
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    // First check browser's online status
    if (!navigator.onLine) {
      return false;
    }
    
    // Try to ping Supabase
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${SUPABASE_URL}/rest/v1/?apikey=${SUPABASE_PUBLISHABLE_KEY}`, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'apikey': SUPABASE_PUBLISHABLE_KEY,
        'cache-control': 'no-store'
      }
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.error("Supabase connection check failed:", error);
    return false;
  }
};
