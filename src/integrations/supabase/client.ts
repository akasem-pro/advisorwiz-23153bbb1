
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
        // Use a more reliable fetch configuration
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // Increase timeout to 15 seconds
        
        // Clone options to avoid mutation and ensure signal is set
        const fetchOptions = {
          ...options,
          signal: controller.signal
        };
        
        return fetch(url, fetchOptions)
          .then(response => {
            clearTimeout(timeoutId);
            return response;
          })
          .catch(error => {
            clearTimeout(timeoutId);
            console.error(`Fetch error for ${url}:`, error);
            throw error;
          });
      }
    }
  }
);

// Improved connection check function with multiple fallbacks
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    // First check browser's online status
    if (!navigator.onLine) {
      console.log("Browser reports offline status");
      return false;
    }
    
    // Try multiple endpoints to verify connectivity
    const endpoints = [
      // Try Supabase health check first (most accurate)
      {
        url: `${SUPABASE_URL}/auth/v1/`,
        options: {
          method: 'HEAD',
          headers: {
            'apikey': SUPABASE_PUBLISHABLE_KEY,
            'Content-Type': 'application/json'
          },
          timeout: 5000
        }
      },
      // Fallback to reliable public endpoints
      {
        url: 'https://www.cloudflare.com/cdn-cgi/trace',
        options: { method: 'HEAD', timeout: 5000 }
      },
      {
        url: 'https://httpbin.org/get',
        options: { method: 'HEAD', timeout: 5000 }
      }
    ];
    
    // Try each endpoint until one works
    for (const endpoint of endpoints) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), endpoint.options.timeout);
        
        const response = await fetch(endpoint.url, {
          ...endpoint.options,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          console.log(`Connection test succeeded with ${endpoint.url}`);
          return true;
        }
      } catch (error) {
        console.log(`Connection test failed for ${endpoint.url}:`, error);
        // Continue to the next endpoint
      }
    }
    
    // If we get here, all connection attempts failed
    console.log("All connection tests failed");
    return false;
  } catch (error) {
    console.error("Connection check failed:", error);
    return false;
  }
};
