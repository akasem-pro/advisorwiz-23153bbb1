
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
      fetch: (url: RequestInfo | URL, options: RequestInit = {}): Promise<Response> => {
        // We need to implement timeout using AbortController
        // because fetch doesn't natively support timeout option
        return new Promise((resolve, reject) => {
          const controller = new AbortController();
          const { signal } = controller;
          
          // Set a timeout of 30 seconds
          const timeoutId = setTimeout(() => {
            controller.abort();
            reject(new Error('Request timeout'));
          }, 30000);
          
          fetch(url, { ...options, signal })
            .then(response => {
              clearTimeout(timeoutId);
              resolve(response);
            })
            .catch(error => {
              clearTimeout(timeoutId);
              reject(error);
            });
        }) as Promise<Response>; // Type assertion to ensure Promise<Response> is returned
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
      // Short timeout for quick failure using AbortSignal
      signal: AbortSignal.timeout(5000)
    });
    
    return response.ok;
  } catch (error) {
    console.error("Supabase connection check failed:", error);
    return false;
  }
};
