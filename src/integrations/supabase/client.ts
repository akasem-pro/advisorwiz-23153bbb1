
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export const SUPABASE_URL = "https://gkymvotqrdecjjymmmef.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdreW12b3RxcmRlY2pqeW1tbWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NzA5NTIsImV4cCI6MjA1NzA0Njk1Mn0.j7Os6vxWOT35pC3rLiDuMuDty7VJTWvw7khbZpPLijY";

// Create the Supabase client with timeout settings
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
      fetch: (...args) => {
        // Use a fetch with timeout to prevent hanging requests
        const [resource, config] = args;
        const timeoutController = new AbortController();
        const timeoutId = setTimeout(() => timeoutController.abort(), 10000); // 10 second timeout
        
        return fetch(resource, {
          ...config,
          signal: timeoutController.signal
        }).finally(() => {
          clearTimeout(timeoutId);
        });
      }
    }
  }
);

// More reliable connection check function
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    // First check browser's online status
    if (!navigator.onLine) {
      return Promise.resolve(false);
    }
    
    // Try a simple ping to Supabase with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
        method: 'HEAD',
        headers: {
          'apikey': SUPABASE_PUBLISHABLE_KEY,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      clearTimeout(timeoutId);
      console.log("Supabase connection test failed:", error);
      return navigator.onLine; // Fall back to browser online status
    }
  } catch (error) {
    console.error("Supabase connection check failed:", error);
    // Fallback to browser's online status if request fails
    return navigator.onLine;
  }
};
