
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export const SUPABASE_URL = "https://gkymvotqrdecjjymmmef.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdreW12b3RxcmRlY2pqeW1tbWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NzA5NTIsImV4cCI6MjA1NzA0Njk1Mn0.j7Os6vxWOT35pC3rLiDuMuDty7VJTWvw7khbZpPLijY";

// Create a simpler Supabase client with better timeout and retry settings
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
      }
    }
  }
);

// Simplified connection check that only checks Supabase health
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    // First check browser's online status as a quick check
    if (!navigator.onLine) {
      console.log("Browser reports offline");
      return false;
    }
    
    // Simple ping to Supabase with a short timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
    
    try {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_PUBLISHABLE_KEY,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      console.log("Supabase connection test result:", response.status);
      return response.ok;
    } catch (error) {
      clearTimeout(timeoutId);
      console.log("Supabase connection test failed:", error);
      return false; // Connection failed
    }
  } catch (error) {
    console.error("Supabase connection check failed:", error);
    return false;
  }
};
